// ============================================================
// api.js — Connexion au backend Railway (prix en temps réel)
// ============================================================

const API_BASE = 'https://comparemax-backend-production.up.railway.app';

// Cache en mémoire pour éviter les requêtes répétées (TTL 5 min)
const _priceCache = {};
const CACHE_TTL = 5 * 60 * 1000;

// ------------------------------------------------------------
// Récupère les offres live pour un EAN donné
// Retourne null si offline ou EAN inconnu
// ------------------------------------------------------------
async function fetchLiveOffers(ean) {
  if (!ean) return null;

  const cached = _priceCache[ean];
  if (cached && (Date.now() - cached.ts) < CACHE_TTL) return cached.data;

  try {
    const res = await fetch(`${API_BASE}/offers/${ean}`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const data = await res.json();
    _priceCache[ean] = { ts: Date.now(), data };
    return data;
  } catch {
    return null;
  }
}

// ------------------------------------------------------------
// Enrichit une liste de produits avec les prix live du backend
// Retourne la même liste avec price / pricesByRetailer mis à jour
// ------------------------------------------------------------
async function enrichWithLivePrices(products) {
  if (!products || products.length === 0) return products;

  const promises = products.map(async (p) => {
    if (!p.ean) return p;
    const offers = await fetchLiveOffers(p.ean);
    if (!offers || Object.keys(offers).length === 0) return p;

    const prices = Object.values(offers).map(o => o.price).filter(Boolean);
    const bestPrice = prices.length ? Math.min(...prices) : p.price;

    return {
      ...p,
      price: bestPrice,
      pricesByRetailer: Object.fromEntries(
        Object.entries(offers).map(([retailer, o]) => [retailer, o.price])
      ),
      livePrices: true
    };
  });

  return Promise.all(promises);
}

// ------------------------------------------------------------
// Vérifie si le backend est en ligne
// ------------------------------------------------------------
async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    return res.ok;
  } catch {
    return false;
  }
}
