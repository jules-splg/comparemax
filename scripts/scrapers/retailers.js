// ============================================================
// scrapers/retailers.js — Scrapers Fnac, Boulanger, Darty…
//
// Stratégie par enseigne :
//   1. Chercher le prix dans les JSON-LD (schema.org/Product)
//   2. Chercher dans les balises meta (og:price:amount)
//   3. Chercher dans les data-attributes injectés par le serveur
//   4. Chercher via les sélecteurs CSS connus
//
// Si le site rend ses prix via JavaScript côté client (SPA pure),
// le prix peut ne pas apparaître dans le HTML initial.
// Dans ce cas la méthode retourne null et le prix précédent est conservé.
// ============================================================

'use strict';

const axios   = require('axios');
const cheerio = require('cheerio');

// En-têtes qui imitent un navigateur pour réduire les blocages
const HEADERS = {
  'User-Agent':      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection':      'keep-alive',
  'Cache-Control':   'no-cache'
};

// ── Utilitaires ────────────────────────────────────────────

/**
 * Télécharge la page et retourne un objet cheerio.
 */
async function fetchPage(url) {
  const response = await axios.get(url, {
    headers:         HEADERS,
    timeout:         20000,
    maxRedirects:    5,
    validateStatus:  s => s < 400
  });
  return cheerio.load(response.data);
}

/**
 * Cherche un prix dans les blocs JSON-LD (schema.org/Product ou Offer).
 */
function priceFromJsonLd($) {
  let found = null;
  $('script[type="application/ld+json"]').each((_, el) => {
    if (found) return;
    try {
      const data = JSON.parse($(el).html());
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        // Product avec offers
        const offer = item.offers || item.Offers;
        if (offer) {
          const price = (Array.isArray(offer) ? offer[0] : offer).price || (Array.isArray(offer) ? offer[0] : offer).Price;
          if (price) { found = parseFloat(String(price).replace(',', '.')); return; }
        }
        // Offer direct
        if (item['@type'] === 'Offer' && item.price) {
          found = parseFloat(String(item.price).replace(',', '.'));
        }
      }
    } catch { /* JSON mal formé */ }
  });
  return found;
}

/**
 * Cherche un prix dans les meta tags Open Graph.
 */
function priceFromMeta($) {
  const val = $('meta[property="product:price:amount"]').attr('content')
           || $('meta[property="og:price:amount"]').attr('content')
           || $('meta[itemprop="price"]').attr('content');
  if (val) return parseFloat(String(val).replace(',', '.'));
  return null;
}

/**
 * Extrait un nombre flottant d'une chaîne de texte (ex: "1 299,99 €" → 1299.99).
 */
function extractPrice(text) {
  if (!text) return null;
  // Supprimer tout sauf chiffres, virgule, point, espace (pour les milliers)
  const cleaned = text.replace(/[^\d,. ]/g, '').trim();
  // Format français : "1 299,99" ou "1299.99"
  const match = cleaned.match(/(\d[\d\s]*)([,.](\d{2}))?/);
  if (!match) return null;
  const integer = match[1].replace(/\s/g, '');
  const decimal = match[3] || '00';
  const price   = parseFloat(`${integer}.${decimal}`);
  return isNaN(price) || price < 1 || price > 99999 ? null : price;
}

/**
 * Essaie plusieurs sélecteurs CSS et retourne le premier prix valide.
 */
function priceFromSelectors($, selectors) {
  for (const sel of selectors) {
    const el = $(sel).first();
    if (el.length) {
      const price = extractPrice(el.text()) || extractPrice(el.attr('content')) || extractPrice(el.attr('data-price'));
      if (price) return price;
    }
  }
  return null;
}

// ── Scrapers par enseigne ─────────────────────────────────

const SCRAPERS = {

  fnac: async (url) => {
    const $ = await fetchPage(url);
    return priceFromJsonLd($)
        || priceFromMeta($)
        || priceFromSelectors($, [
             '.f-priceBox__price',
             '.userPrice',
             '[data-price]',
             '.price-label',
             'span.price'
           ]);
  },

  boulanger: async (url) => {
    const $ = await fetchPage(url);
    return priceFromJsonLd($)
        || priceFromMeta($)
        || priceFromSelectors($, [
             '[data-testid="regular-price"]',
             '[data-testid="product-price"]',
             '.product-price-container .price',
             '.bu-price',
             'p.price'
           ]);
  },

  darty: async (url) => {
    const $ = await fetchPage(url);
    return priceFromJsonLd($)
        || priceFromMeta($)
        || priceFromSelectors($, [
             '.product-price .price-value',
             '[data-testid="price"]',
             '.price__amount',
             'strong.price',
             '.product-main-price'
           ]);
  },

  cdiscount: async (url) => {
    const $ = await fetchPage(url);
    // Cdiscount injecte souvent le prix dans un attribut data-priceinputs
    const dataPrice = $('[data-price]').first().attr('data-price');
    if (dataPrice) return parseFloat(dataPrice);
    return priceFromJsonLd($)
        || priceFromMeta($)
        || priceFromSelectors($, [
             '.price-container .price',
             '#fprice',
             '.jsPriceDrop',
             'span[itemprop="price"]',
             '.price-value'
           ]);
  },

  leclerc: async (url) => {
    const $ = await fetchPage(url);
    return priceFromJsonLd($)
        || priceFromMeta($)
        || priceFromSelectors($, [
             '[data-testid="product-price"]',
             '.price-section .price',
             'span.price-tag',
             '[itemprop="price"]',
             '.price'
           ]);
  },

  but: async (url) => {
    const $ = await fetchPage(url);
    return priceFromJsonLd($)
        || priceFromMeta($)
        || priceFromSelectors($, [
             '.price-value',
             '.product-price__amount',
             '[data-price]',
             '.price-tag',
             'span.price'
           ]);
  },

  electrodepot: async (url) => {
    const $ = await fetchPage(url);
    return priceFromJsonLd($)
        || priceFromMeta($)
        || priceFromSelectors($, [
             '[itemprop="price"]',
             '.product-price .amount',
             '.price-box .price',
             '.current-price',
             '.price'
           ]);
  },

  ubaldi: async (url) => {
    const $ = await fetchPage(url);
    return priceFromJsonLd($)
        || priceFromMeta($)
        || priceFromSelectors($, [
             '[itemprop="price"]',
             '.price-block .price',
             '.product-price',
             'span.selling-price',
             '.price'
           ]);
  }
};

// ── Export principal ───────────────────────────────────────

/**
 * Retourne le prix d'un produit chez une enseigne donnée.
 * @param {string} retailer  'fnac' | 'boulanger' | 'darty' | …
 * @param {string} url       URL directe de la fiche produit
 * @returns {Promise<number|null>}
 */
async function getRetailerPrice(retailer, url) {
  const scraper = SCRAPERS[retailer];
  if (!scraper) {
    console.warn(`  ⚠️  Enseigne inconnue : ${retailer}`);
    return null;
  }
  if (!url || url.startsWith('TODO')) return null;

  const price = await scraper(url);
  return (price && price > 0) ? price : null;
}

module.exports = { getRetailerPrice };
