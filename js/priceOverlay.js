// ============================================================
// priceOverlay.js — Mise à jour des prix en temps réel
//
// Ce script est chargé en premier sur la page.
// Il récupère data/prices.json (mis à jour 3x/jour par GitHub
// Actions) et écrase les prix codés en dur dans les bases de
// données avant tout affichage des résultats.
// ============================================================

(function () {
  'use strict';

  // Timestamp d'affichage de la dernière mise à jour
  var PRICES_URL = 'data/prices.json';

  // Référence globale aux données de prix live
  window.LIVE_PRICES = null;

  // Promise résolue quand les prix sont chargés (ou après timeout)
  window.PRICES_READY = new Promise(function (resolve) {

    // Timeout de sécurité : si le fetch prend trop de temps,
    // on continue avec les prix statiques des bases de données.
    var timeout = setTimeout(function () {
      console.warn('[priceOverlay] Timeout — utilisation des prix statiques.');
      resolve(false);
    }, 5000);

    fetch(PRICES_URL + '?t=' + Date.now())
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        clearTimeout(timeout);

        if (!data || !data.products || Object.keys(data.products).length === 0) {
          // prices.json vide = pas encore initialisé
          resolve(false);
          return;
        }

        window.LIVE_PRICES = data.products;

        // Patcher toutes les bases de données disponibles
        patchDatabase(window.TV_DATABASE);
        patchDatabase(window.WASHING_DATABASE);
        patchDatabase(window.DISHWASHER_DATABASE);
        patchDatabase(window.COFFEE_DATABASE);
        patchDatabase(window.VACUUM_DATABASE);
        patchDatabase(window.IRON_DATABASE);

        // Afficher la date de dernière mise à jour dans l'UI
        updateLastUpdatedBadge(data.lastUpdated);

        resolve(true);
      })
      .catch(function (err) {
        clearTimeout(timeout);
        console.warn('[priceOverlay] Impossible de charger prices.json :', err.message);
        resolve(false);
      });
  });

  // ── Patche une base de données avec les prix live ──────

  function patchDatabase(db) {
    if (!db || !Array.isArray(db)) return;

    db.forEach(function (product) {
      var live = window.LIVE_PRICES[product.id];
      if (!live) return;

      // Mettre à jour les prix par enseigne
      if (live.pricesByRetailer && typeof live.pricesByRetailer === 'object') {
        Object.keys(live.pricesByRetailer).forEach(function (retailer) {
          var price = live.pricesByRetailer[retailer];
          if (price && typeof price === 'number') {
            product.pricesByRetailer[retailer] = price;
          }
        });
      }

      // Prix principal = le plus bas trouvé
      if (typeof live.price === 'number' && live.price > 0) {
        product.price = live.price;
      } else {
        // Recalculer à partir des prix par enseigne
        var allPrices = Object.values(product.pricesByRetailer).filter(function (p) {
          return typeof p === 'number' && p > 0;
        });
        if (allPrices.length > 0) {
          product.price = Math.min.apply(null, allPrices);
        }
      }
    });
  }

  // ── Badge "mis à jour le…" ─────────────────────────────

  function updateLastUpdatedBadge(isoDate) {
    if (!isoDate) return;

    var date = new Date(isoDate);
    var formatted = date.toLocaleDateString('fr-FR', {
      day:    '2-digit',
      month:  'short',
      year:   'numeric',
      hour:   '2-digit',
      minute: '2-digit'
    });

    // Mettre à jour la tagline principale si elle existe
    var tagline = document.querySelector('.app-tool-tagline');
    if (tagline) {
      tagline.textContent = 'Gratuit · Indépendant · Prix mis à jour le ' + formatted;
    }

    // Mettre à jour la section trust si elle existe
    var trustText = document.querySelector('.trust-item p');
    if (trustText && trustText.textContent.includes('actualis')) {
      trustText.textContent = 'Prix actualisés automatiquement 3 fois par jour. Dernière mise à jour : ' + formatted + '.';
    }
  }

})();
