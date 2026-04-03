// ============================================================
// validate-urls.js — Validateur d'URLs produits avec auto-fallback
//
// Pour chaque produit × enseigne dans product-urls.json :
//   1. Si l'URL est déjà une URL de recherche → on la garde telle quelle
//   2. Sinon → HEAD request pour vérifier que la page existe
//   3. Si 404 / erreur / redirect → remplacement automatique par
//      l'URL de recherche correspondante (fallback)
//
// Le fichier product-urls.json est mis à jour en place si des
// corrections ont été effectuées.
//
// Peut être appelé seul :
//   node scripts/validate-urls.js
// Ou importé depuis update-prices.js :
//   const { validateAndRepairUrls } = require('./validate-urls');
// ============================================================

'use strict';

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

const URLS_FILE    = path.join(__dirname, 'config', 'product-urls.json');
const TIMEOUT_MS   = 8000;   // timeout par requête HEAD
const DELAY_MS     = 400;    // délai entre requêtes pour éviter le rate-limiting

const RETAILERS = ['fnac', 'boulanger', 'darty', 'cdiscount', 'leclerc', 'but', 'electrodepot', 'ubaldi'];

// ============================================================
// Détection des URLs de recherche (pas besoin de valider)
// ============================================================

const SEARCH_PATTERNS = [
  '/SearchResult/', '/recherche', '/recherche?', '/search/10/',
  '?text=', '?q=', '?s=', '?Search=', '/recherche/'
];

function isSearchUrl(url) {
  if (!url) return true;
  return SEARCH_PATTERNS.some(p => url.includes(p));
}

// ============================================================
// Génération des URLs de fallback (recherche)
// ============================================================

function buildSearchUrl(retailer, productName) {
  const e = encodeURIComponent(productName);
  const map = {
    fnac:         `https://www.fnac.com/SearchResult/ResultSet.aspx?Search=${e}`,
    boulanger:    `https://www.boulanger.com/recherche/${e}`,
    darty:        `https://www.darty.com/nav/extra/search?text=${e}`,
    cdiscount:    `https://www.cdiscount.com/search/10/${e}.html`,
    leclerc:      `https://www.e.leclerc/recherche?q=${e}`,
    but:          `https://www.but.fr/recherche?q=${e}`,
    electrodepot: `https://www.electrodepot.fr/recherche?s=${e}`,
    ubaldi:       `https://www.ubaldi.com/recherche/${e}/`,
  };
  return map[retailer] || null;
}

// Reconstruit un nom lisible à partir du slug produit
// "samsung-qn85c-55" → "Samsung QN85C 55"
function slugToName(slug) {
  return slug
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

// ============================================================
// Requête HEAD avec suivi de redirects (max 5 sauts)
// ============================================================

function headRequest(url, hops) {
  hops = hops || 0;
  return new Promise(function (resolve) {
    if (hops > 5) return resolve({ ok: false, status: 0 });

    var parsed;
    try { parsed = new URL(url); } catch (_) { return resolve({ ok: false, status: 0 }); }

    var lib = parsed.protocol === 'https:' ? https : http;

    var options = {
      method:   'HEAD',
      hostname: parsed.hostname,
      path:     parsed.pathname + parsed.search,
      headers: {
        'User-Agent':      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9',
      },
      timeout: TIMEOUT_MS,
    };

    var req = lib.request(options, function (res) {
      var status = res.statusCode;
      // Suivre les redirections
      if ([301, 302, 303, 307, 308].indexOf(status) !== -1 && res.headers.location) {
        var next;
        try { next = new URL(res.headers.location, url).href; } catch (_) { return resolve({ ok: false, status: status }); }
        return resolve(headRequest(next, hops + 1));
      }
      resolve({ ok: status >= 200 && status < 400, status: status });
    });

    req.on('error', function () { resolve({ ok: false, status: 0 }); });
    req.on('timeout', function () { req.destroy(); resolve({ ok: false, status: 0 }); });
    req.end();
  });
}

// ============================================================
// Pause
// ============================================================

function sleep(ms) {
  return new Promise(function (r) { setTimeout(r, ms); });
}

// ============================================================
// Validation principale
// ============================================================

/**
 * Valide toutes les URLs d'un objet productUrls.
 * Remplace les URLs cassées par leur équivalent de recherche.
 *
 * @param {Object}  productUrls   - contenu de product-urls.json
 * @param {Object}  options
 * @param {boolean} options.silent - si true, pas de logs
 * @returns {Promise<{ validated: Object, totalFixed: number, totalOk: number, totalSkipped: number }>}
 */
async function validateAndRepairUrls(productUrls, options) {
  var silent = options && options.silent;

  // Deep clone pour ne pas muter l'original
  var result      = JSON.parse(JSON.stringify(productUrls));
  var totalFixed   = 0;
  var totalOk      = 0;
  var totalSkipped = 0;

  for (var productId of Object.keys(productUrls)) {
    var config      = productUrls[productId];
    var productName = slugToName(productId);

    for (var retailer of RETAILERS) {
      var url = config[retailer];
      if (!url) continue;

      // URLs de recherche : valides par définition, on saute
      if (isSearchUrl(url)) {
        totalSkipped++;
        continue;
      }

      // URL exacte → on vérifie
      var res = await headRequest(url);
      await sleep(DELAY_MS);

      if (res.ok) {
        if (!silent) console.log(`  ✓  ${productId.padEnd(35)} ${retailer.padEnd(14)} HTTP ${res.status}`);
        totalOk++;
      } else {
        var fallback = buildSearchUrl(retailer, productName);
        if (!silent) {
          console.log(`  ✗  ${productId.padEnd(35)} ${retailer.padEnd(14)} HTTP ${res.status || 'ERR'} → fallback recherche`);
        }
        if (fallback) {
          result[productId][retailer] = fallback;
        }
        totalFixed++;
      }
    }
  }

  if (!silent) {
    console.log(`\n  Résultat : ${totalOk} ok · ${totalFixed} corrigées · ${totalSkipped} ignorées (URLs recherche)\n`);
  }

  return { validated: result, totalFixed: totalFixed, totalOk: totalOk, totalSkipped: totalSkipped };
}

// ============================================================
// Construction de l'objet affiliateLinks depuis les URLs validées
// (destiné à être injecté dans prices.json)
// ============================================================

/**
 * Pour un produit donné, construit l'objet affiliateLinks
 * à partir des URLs validées (priorité : URL exacte ; sinon search).
 */
function buildAffiliateLinks(productConfig) {
  if (!productConfig) return {};
  var links = {};
  RETAILERS.forEach(function (r) {
    if (productConfig[r]) links[r] = productConfig[r];
  });
  // Amazon — on garde l'URL affiliate avec tag
  if (productConfig.amazon && productConfig.amazon.url) {
    links.amazon = productConfig.amazon.url;
  }
  return links;
}

module.exports = { validateAndRepairUrls, buildAffiliateLinks, isSearchUrl };

// ============================================================
// Point d'entrée direct
// ============================================================

if (require.main === module) {
  (async function () {
    console.log('='.repeat(60));
    console.log(' CompareMax — Validation des URLs produits');
    console.log(' ' + new Date().toISOString());
    console.log('='.repeat(60));

    var productUrls;
    try {
      productUrls = JSON.parse(fs.readFileSync(URLS_FILE, 'utf8'));
    } catch (err) {
      console.error('\n❌  Impossible de lire product-urls.json :', err.message);
      process.exit(1);
    }

    var ids = Object.keys(productUrls);
    console.log(`\n${ids.length} produits à valider...\n`);

    var exactCount = 0;
    ids.forEach(function (id) {
      RETAILERS.forEach(function (r) {
        if (productUrls[id][r] && !isSearchUrl(productUrls[id][r])) exactCount++;
      });
    });

    if (exactCount === 0) {
      console.log('ℹ️  Toutes les URLs sont des URLs de recherche — aucune validation réseau nécessaire.');
      console.log('   Ajoutez des URLs de fiches produit exactes dans product-urls.json pour activer la validation.\n');
      process.exit(0);
    }

    console.log(`${exactCount} URLs exactes à valider (les URLs recherche sont ignorées)...\n`);

    var { validated, totalFixed } = await validateAndRepairUrls(productUrls, { silent: false });

    if (totalFixed > 0) {
      fs.writeFileSync(URLS_FILE, JSON.stringify(validated, null, 2) + '\n', 'utf8');
      console.log(`✅  product-urls.json mis à jour (${totalFixed} URL(s) corrigée(s) → fallback recherche).`);
    } else {
      console.log('✅  Toutes les URLs exactes sont valides, aucune correction nécessaire.');
    }
  })().catch(function (err) {
    console.error('\n❌  Erreur fatale :', err);
    process.exit(1);
  });
}
