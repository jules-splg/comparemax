// ============================================================
// update-prices.js — Orchestrateur principal
//
// Récupère les prix en temps réel auprès de chaque enseigne
// et écrit le résultat dans data/prices.json.
//
// Utilisation :
//   node scripts/update-prices.js            → mise à jour réelle
//   node scripts/update-prices.js --dry-run  → simulation sans écriture
// ============================================================

'use strict';

const fs        = require('fs');
const path      = require('path');
const { getAmazonPrices }              = require('./scrapers/amazon');
const { getRetailerPrice }             = require('./scrapers/retailers');
const { validateAndRepairUrls,
        buildAffiliateLinks }          = require('./validate-urls');

const DRY_RUN      = process.argv.includes('--dry-run');
const PRICES_FILE  = path.join(__dirname, '..', 'data', 'prices.json');
const URLS_FILE    = path.join(__dirname, 'config', 'product-urls.json');

// Délai entre deux requêtes pour ne pas surcharger les serveurs
const DELAY_MS     = 1800;  // 1,8 s entre chaque produit × enseigne

// ============================================================
// Utilitaires
// ============================================================

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function loadCurrentPrices() {
  try {
    const raw = fs.readFileSync(PRICES_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { lastUpdated: null, products: {} };
  }
}

function savePrices(data) {
  if (DRY_RUN) {
    console.log('\n[DRY-RUN] prices.json non écrit. Aperçu :');
    console.log(JSON.stringify(data, null, 2).slice(0, 2000) + '\n...');
    return;
  }
  fs.writeFileSync(PRICES_FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`\n✅  prices.json mis à jour (${Object.keys(data.products).length} produits)`);
}

// ============================================================
// Récupération Amazon groupée (PA-API)
// ============================================================

async function fetchAllAmazonPrices(productUrls) {
  // Collecter tous les ASINs configurés
  const asinToId = {};
  for (const [id, retailers] of Object.entries(productUrls)) {
    if (retailers.amazon?.asin) {
      asinToId[retailers.amazon.asin] = id;
    }
  }

  const asins = Object.keys(asinToId);
  if (asins.length === 0) {
    console.log('  ℹ️  Aucun ASIN configuré pour Amazon.');
    return {};
  }

  console.log(`  → Amazon PA-API : ${asins.length} ASINs à interroger…`);

  // L'API Amazon accepte jusqu'à 10 items par requête
  const CHUNK = 10;
  const results = {};

  for (let i = 0; i < asins.length; i += CHUNK) {
    const chunk = asins.slice(i, i + CHUNK);
    try {
      const prices = await getAmazonPrices(chunk);
      for (const [asin, price] of Object.entries(prices)) {
        const productId = asinToId[asin];
        if (productId) results[productId] = price;
      }
    } catch (err) {
      console.warn(`  ⚠️  Amazon chunk [${chunk.join(',')}] : ${err.message}`);
    }
    if (i + CHUNK < asins.length) await sleep(1000);
  }

  return results;
}

// ============================================================
// Récupération des autres enseignes (scraping)
// ============================================================

const RETAILER_NAMES = ['fnac', 'boulanger', 'darty', 'cdiscount', 'leclerc', 'but', 'electrodepot', 'ubaldi'];

async function fetchRetailerPrices(productId, retailers) {
  const prices = {};

  for (const retailer of RETAILER_NAMES) {
    const url = retailers[retailer];
    if (!url) continue;

    try {
      const price = await getRetailerPrice(retailer, url);
      if (price !== null) {
        prices[retailer] = price;
        console.log(`    ✓ ${retailer.padEnd(14)} ${price} €`);
      } else {
        console.log(`    – ${retailer.padEnd(14)} introuvable`);
      }
    } catch (err) {
      console.log(`    ✗ ${retailer.padEnd(14)} erreur: ${err.message.slice(0, 60)}`);
    }

    await sleep(DELAY_MS);
  }

  return prices;
}

// ============================================================
// Programme principal
// ============================================================

async function main() {
  console.log('='.repeat(60));
  console.log(' CompareMax — Mise à jour des prix');
  console.log(' ' + new Date().toISOString());
  if (DRY_RUN) console.log(' MODE : DRY-RUN (aucune écriture)');
  console.log('='.repeat(60));

  // Charger la config des URLs produits
  let productUrls;
  try {
    productUrls = JSON.parse(fs.readFileSync(URLS_FILE, 'utf8'));
  } catch (err) {
    console.error(`\n❌  Impossible de lire ${URLS_FILE} : ${err.message}`);
    process.exit(1);
  }

  const productIds = Object.keys(productUrls);
  console.log(`\n${productIds.length} produits configurés.\n`);

  // ── Étape 0 : Validation et auto-correction des URLs ────────
  console.log('\n── Validation des URLs ───────────────────────────────────');
  const { validated: validatedUrls, totalFixed } = await validateAndRepairUrls(productUrls, { silent: false });
  if (totalFixed > 0 && !DRY_RUN) {
    fs.writeFileSync(URLS_FILE, JSON.stringify(validatedUrls, null, 2) + '\n', 'utf8');
    console.log(`  → ${totalFixed} URL(s) corrigée(s) et sauvegardées dans product-urls.json.`);
    productUrls = validatedUrls;
  } else if (totalFixed > 0 && DRY_RUN) {
    console.log(`  [DRY-RUN] ${totalFixed} URL(s) seraient corrigées (non écrites).`);
    productUrls = validatedUrls;
  } else {
    console.log('  → Toutes les URLs sont valides.');
  }

  // Charger les prix existants (pour conserver les anciens en cas d'échec)
  const existing = loadCurrentPrices();
  const output   = {
    lastUpdated: new Date().toISOString(),
    products:    { ...existing.products }
  };

  // ── Étape 1 : Amazon PA-API (batch, toutes catégories) ──────
  console.log('\n── Amazon PA-API ─────────────────────────────────────────');
  const amazonPrices = await fetchAllAmazonPrices(productUrls);
  for (const [productId, price] of Object.entries(amazonPrices)) {
    if (!output.products[productId]) output.products[productId] = { pricesByRetailer: {} };
    output.products[productId].pricesByRetailer.amazon = price;
  }

  // ── Étape 2 : Autres enseignes (produit par produit) ────────
  console.log('\n── Autres enseignes ──────────────────────────────────────');
  for (const [productId, retailers] of Object.entries(productUrls)) {
    console.log(`\n[${productId}]`);

    const scraped = await fetchRetailerPrices(productId, retailers);

    if (!output.products[productId]) output.products[productId] = { pricesByRetailer: {} };
    Object.assign(output.products[productId].pricesByRetailer, scraped);

    // Prix principal = le plus bas trouvé toutes enseignes confondues
    const allPrices = Object.values(output.products[productId].pricesByRetailer).filter(Boolean);
    if (allPrices.length > 0) {
      output.products[productId].price      = Math.min(...allPrices);
      output.products[productId].updatedAt  = new Date().toISOString();
    }

    // Liens affiliate validés (injectés dans prices.json pour le frontend)
    output.products[productId].affiliateLinks = buildAffiliateLinks(productUrls[productId]);
  }

  // ── Étape 3 : Écriture ──────────────────────────────────────
  savePrices(output);

  // Résumé
  const updated = Object.values(output.products).filter(p => p.updatedAt).length;
  console.log(`\nRésumé : ${updated}/${productIds.length} produits mis à jour.\n`);
}

main().catch(err => {
  console.error('\n❌  Erreur fatale :', err);
  process.exit(1);
});
