// ============================================================
// popup.js - Logique principale de l'interface
//
// Catalogue de catégories et produits
// ============================================================

const CATEGORIES = {
  electromenager: {
    label: 'Électroménager', emoji: '🏠',
    products: [
      { key: 'washing',    label: 'Lave-linge',        emoji: '🫧', available: true  },
      { key: 'dryer',      label: 'Sèche-linge',       emoji: '🌀', available: false },
      { key: 'dishwasher', label: 'Lave-vaisselle',    emoji: '🍽️', available: false },
      { key: 'fridge',     label: 'Réfrigérateur',     emoji: '🧊', available: false },
      { key: 'oven',       label: 'Four',               emoji: '🔥', available: false },
      { key: 'hood',       label: 'Hotte',              emoji: '💨', available: false },
      { key: 'coffee',     label: 'Machine à café',     emoji: '☕', available: false },
      { key: 'airfryer',   label: 'Airfryer',           emoji: '⚡', available: false },
      { key: 'microwave',  label: 'Micro-ondes',        emoji: '📡', available: false },
      { key: 'hob',        label: 'Plaques de cuisson', emoji: '🍳', available: false },
    ]
  },
  maison: {
    label: 'Maison', emoji: '🏡',
    products: [
      { key: 'vacuum', label: 'Aspirateur',          emoji: '🌪️', available: false },
      { key: 'robot',  label: "Robot d'entretien",   emoji: '🤖', available: false },
      { key: 'iron',   label: 'Fer à repasser',      emoji: '👔', available: false },
    ]
  },
  'tv-son': {
    label: 'TV & Son', emoji: '📺',
    products: [
      { key: 'tv',        label: 'Télévision',      emoji: '📺', available: true  },
      { key: 'speaker',   label: 'Enceinte',         emoji: '🔊', available: false },
      { key: 'earphones', label: 'Écouteurs',        emoji: '🎧', available: false },
      { key: 'projector', label: 'Vidéoprojecteur',  emoji: '📽️', available: false },
    ]
  }
};

// ============================================================
//
// Ce fichier est le "chef d'orchestre" de l'extension.
// Il gère :
//   - Les filtres (prix, taille)
//   - Le déclenchement de la comparaison
//   - L'affichage des résultats
//   - La sauvegarde des préférences
// ============================================================

// ------------------------------------------------------------
// État de l'application
// Toutes les données de la session sont stockées ici.
// ------------------------------------------------------------
const AppState = {
  filters: {
    priceMin: 0,
    priceMax: 1500,
    noLimit: false,
    sizeMin: 43,
    sizeMax: 65
  },
  washingFilters: {
    priceMin: 0,
    priceMax: 800,
    noLimit: false,
    installationType: 'all',
    washingFunction: 'all',
    color: 'all',
    capacityMin: 6
  },
  currentCategory: 'tv',
  results: null
};

// ------------------------------------------------------------
// Correspondance pouces → centimètres pour les labels
// ------------------------------------------------------------
const INCH_TO_CM = {
  32: 81, 40: 102, 43: 109, 48: 122, 50: 127,
  55: 139, 58: 147, 65: 165, 70: 177, 75: 190,
  77: 196, 83: 210, 85: 216
};

const AVAILABLE_SIZES = [32, 40, 43, 48, 50, 55, 58, 65, 70, 75, 77, 83, 85];

// ------------------------------------------------------------
// Initialisation : lancée quand la page est prête
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  buildSizeOptions();
  loadSavedFilters();
  bindEvents();
  generateAffiliateSection();
});

// ------------------------------------------------------------
// Construction dynamique des options de taille
// ------------------------------------------------------------
function buildSizeOptions() {
  const sizeMinSelect = document.getElementById('sizeMin');
  const sizeMaxSelect = document.getElementById('sizeMax');

  AVAILABLE_SIZES.forEach(size => {
    const cm = INCH_TO_CM[size] || Math.round(size * 2.54);

    const optMin = document.createElement('option');
    optMin.value = size;
    optMin.textContent = `${size}" (${cm} cm)`;
    if (size === AppState.filters.sizeMin) optMin.selected = true;
    sizeMinSelect.appendChild(optMin);

    const optMax = document.createElement('option');
    optMax.value = size;
    optMax.textContent = `${size}" (${cm} cm)`;
    if (size === AppState.filters.sizeMax) optMax.selected = true;
    sizeMaxSelect.appendChild(optMax);
  });
}

// ------------------------------------------------------------
// Attache les événements aux éléments interactifs
// ------------------------------------------------------------
function bindEvents() {
  // Sliders de prix (dual range)
  document.getElementById('priceMin').addEventListener('input', function () { onRangeChange('min'); });
  document.getElementById('priceMax').addEventListener('input', function () { onRangeChange('max'); });

  // Sélecteurs de taille
  document.getElementById('sizeMin').addEventListener('change', onSizeChange);
  document.getElementById('sizeMax').addEventListener('change', onSizeChange);

  // Bouton comparer
  document.getElementById('compareBtn').addEventListener('click', onCompare);

  // Boutons de budget rapide
  document.querySelectorAll('.quick-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var min = parseInt(this.dataset.min);
      var max = parseInt(this.dataset.max);

      document.getElementById('priceMin').value = min;
      document.getElementById('priceMax').value = max;

      AppState.filters.priceMin = min;
      AppState.filters.priceMax = max;
      AppState.filters.noLimit  = max >= 4000;

      updatePriceDisplay();
      updateRangeTrack();

      // Mettre en évidence le bouton sélectionné
      document.querySelectorAll('.quick-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

  // Boutons niveau 1 (grande famille)
  document.querySelectorAll('.cat1-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { onFamilyClick(this); });
  });

  // ---- Filtres lave-linge ----
  document.getElementById('wPriceMin').addEventListener('input', function () { onWashingRangeChange('min'); });
  document.getElementById('wPriceMax').addEventListener('input', function () { onWashingRangeChange('max'); });

  document.querySelectorAll('.washing-quick-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var min = parseInt(this.dataset.min);
      var max = parseInt(this.dataset.max);
      document.getElementById('wPriceMin').value = min;
      document.getElementById('wPriceMax').value = max;
      AppState.washingFilters.priceMin = min;
      AppState.washingFilters.priceMax = max;
      AppState.washingFilters.noLimit  = max >= 4000;
      updateWashingPriceDisplay();
      updateWashingRangeTrack();
      document.querySelectorAll('.washing-quick-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  document.querySelectorAll('#installTypeGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#installTypeGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.washingFilters.installationType = this.dataset.value;
    });
  });

  document.querySelectorAll('#washFunctionGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#washFunctionGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.washingFilters.washingFunction = this.dataset.value;
    });
  });

  document.querySelectorAll('#colorGroup .color-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#colorGroup .color-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.washingFilters.color = this.dataset.value;
    });
  });

  document.getElementById('capacityMin').addEventListener('input', function () {
    AppState.washingFilters.capacityMin = parseInt(this.value);
    document.getElementById('capacityDisplay').textContent = this.value + ' kg minimum';
  });

  document.getElementById('compareWashingBtn').addEventListener('click', onCompareWashing);

  updateWashingRangeTrack();
  updateWashingPriceDisplay();
}

// ------------------------------------------------------------
// Gestion du dual range slider de prix
// ------------------------------------------------------------
function onRangeChange(which) {
  let minVal = parseInt(document.getElementById('priceMin').value);
  let maxVal = parseInt(document.getElementById('priceMax').value);

  // Empêcher que les deux curseurs se croisent
  if (which === 'min' && minVal > maxVal) {
    minVal = maxVal;
    document.getElementById('priceMin').value = minVal;
  }
  if (which === 'max' && maxVal < minVal) {
    maxVal = minVal;
    document.getElementById('priceMax').value = maxVal;
  }

  AppState.filters.priceMin = minVal;
  AppState.filters.priceMax = maxVal;
  AppState.filters.noLimit  = maxVal >= 4000;

  updatePriceDisplay();
  updateRangeTrack();

  // Désactiver le bouton rapide actif (l'utilisateur a personnalisé)
  document.querySelectorAll('.quick-btn').forEach(function (b) {
    b.classList.remove('active');
  });
}

// ------------------------------------------------------------
// Met à jour la barre de remplissage entre les deux curseurs
// ------------------------------------------------------------
function updateRangeTrack() {
  const minInput = document.getElementById('priceMin');
  const maxInput = document.getElementById('priceMax');
  const track    = document.getElementById('rangeTrackFill');
  if (!track) return;

  const rangeMin = parseInt(minInput.min) || 0;
  const rangeMax = parseInt(minInput.max) || 4000;
  const minVal   = parseInt(minInput.value);
  const maxVal   = parseInt(maxInput.value);

  const leftPct  = ((minVal - rangeMin) / (rangeMax - rangeMin)) * 100;
  const rightPct = ((maxVal - rangeMin) / (rangeMax - rangeMin)) * 100;

  track.style.left  = leftPct + '%';
  track.style.width = (rightPct - leftPct) + '%';
}

// ------------------------------------------------------------
// Gestion des changements de taille
// ------------------------------------------------------------
function onSizeChange() {
  let sizeMin = parseInt(document.getElementById('sizeMin').value);
  let sizeMax = parseInt(document.getElementById('sizeMax').value);

  // Empêcher que le minimum soit plus grand que le maximum
  if (sizeMin > sizeMax) {
    document.getElementById('sizeMax').value = sizeMin;
    sizeMax = sizeMin;
  }

  AppState.filters.sizeMin = sizeMin;
  AppState.filters.sizeMax = sizeMax;
}

// ------------------------------------------------------------
// Met à jour l'affichage des valeurs de prix
// ------------------------------------------------------------
function updatePriceDisplay() {
  const minVal = AppState.filters.priceMin;
  const maxVal = AppState.filters.priceMax;

  document.getElementById('priceMinDisplay').textContent =
    minVal.toLocaleString('fr-FR') + ' €';

  document.getElementById('priceMaxDisplay').textContent =
    maxVal >= 4000 ? '4 000 € +' : maxVal.toLocaleString('fr-FR') + ' €';
}

// ------------------------------------------------------------
// Lance la comparaison quand l'utilisateur clique sur le bouton
// ------------------------------------------------------------
function onCompare() {
  // Récupérer les valeurs actuelles des sliders
  AppState.filters.priceMin = parseInt(document.getElementById('priceMin').value) || 0;
  AppState.filters.priceMax = parseInt(document.getElementById('priceMax').value) || 1500;
  AppState.filters.noLimit  = AppState.filters.priceMax >= 4000;
  AppState.filters.sizeMin  = parseInt(document.getElementById('sizeMin').value);
  AppState.filters.sizeMax  = parseInt(document.getElementById('sizeMax').value);

  // Afficher le chargement
  showLoading(true);
  hideResults();

  // Lancer la comparaison (fonctions venant de comparator.js)
  // Utilise setTimeout pour laisser le DOM se mettre à jour (afficher le loading)
  setTimeout(function () {
    const results = runComparison(TV_DATABASE, AppState.filters);
    AppState.results = results;
    showLoading(false);
    renderResults(results);
    saveFilters();
  }, 100);
}

// ------------------------------------------------------------
// Affiche/masque l'animation de chargement
// ------------------------------------------------------------
function showLoading(show) {
  const loader = document.getElementById('loadingState');
  loader.style.display = show ? 'block' : 'none';
}

// ------------------------------------------------------------
// Masque toutes les sections de résultats
// ------------------------------------------------------------
function hideResults() {
  ['sectionSuggestions', 'sectionPremium', 'sectionValue', 'sectionAbove', 'noResultsMsg']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
}

// ------------------------------------------------------------
// Affiche tous les résultats
// ------------------------------------------------------------
function renderResults(results) {
  // Message si aucune TV trouvée
  if (results.totalFound === 0) {
    const txt = document.getElementById('noResultsText');
    if (txt) txt.textContent = 'Aucune télévision trouvée';
    document.getElementById('noResultsMsg').style.display = 'block';
    return;
  }

  // Mettre à jour les titres des sections avec les fourchettes de prix
  updateSectionTitles();

  // Suggestions intelligentes
  if (results.suggestions && results.suggestions.length > 0) {
    renderSuggestions(results.suggestions);
  }

  // Top 5 Premium
  renderTopSection('listPremium', results.premium, 'sectionPremium', 'premium');

  // Top 5 Meilleur rapport qualité/prix
  renderTopSection('listValue', results.value, 'sectionValue', 'value');

  // Top 5 Alternatives au-dessus du budget
  if (!AppState.filters.noLimit) {
    var bestPremium = results.premium && results.premium[0] ? results.premium[0] : null;
    var bestValue   = results.value   && results.value[0]   ? results.value[0]   : null;
    renderTopSection('listAbove', results.aboveBudget, 'sectionAbove', 'above', bestPremium, bestValue);
  }

  // Faire défiler vers les résultats
  document.getElementById('resultsWrapper').scrollIntoView({ behavior: 'smooth' });

  // Égaliser la hauteur de toutes les cartes (aligner sur la plus grande)
  requestAnimationFrame(function () {
    setTimeout(equalizeCardHeights, 50);
  });
}

// ------------------------------------------------------------
// Aligne toutes les cartes TV sur la hauteur de la plus grande
// ------------------------------------------------------------
function equalizeCardHeights() {
  const cards = document.querySelectorAll('.tv-card');
  cards.forEach(c => { c.style.minHeight = ''; });
  let maxH = 0;
  cards.forEach(c => { maxH = Math.max(maxH, c.offsetHeight); });
  if (maxH > 0) cards.forEach(c => { c.style.minHeight = maxH + 'px'; });
}

// ------------------------------------------------------------
// Met à jour les sous-titres des sections avec les vraies fourchettes
// ------------------------------------------------------------
function updateSectionTitles() {
  if (!AppState.filters.noLimit) {
    const pMax = AppState.filters.priceMax;

    document.getElementById('subtitlePremium').textContent =
      `TVs entre ${Math.round(pMax * 0.75)} € et ${pMax} € – les meilleures dans le haut de votre budget`;

    document.getElementById('subtitleValue').textContent =
      `TVs entre ${Math.round(pMax * 0.40)} € et ${Math.round(pMax * 0.75)} € – d'excellentes opportunités`;

    document.getElementById('subtitleAbove').textContent =
      `TVs entre ${pMax} € et ${Math.round(pMax * 1.20)} € – pour ceux qui peuvent s'offrir un peu plus`;
  }
}

// ------------------------------------------------------------
// Affiche une section (premium / value / above)
// ------------------------------------------------------------
function renderTopSection(listId, tvs, sectionId, type, bestPremium, bestValue) {
  const section = document.getElementById(sectionId);
  const list = document.getElementById(listId);

  if (!tvs || tvs.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';
  list.innerHTML = tvs.map((tv, index) => buildTVCard(tv, index + 1, type, bestPremium, bestValue)).join('');

  // Après insertion, on anime les barres de score
  requestAnimationFrame(function () {
    list.querySelectorAll('.card-score-fill').forEach(function (el) {
      el.style.width = el.dataset.width;
    });
  });
}

// ------------------------------------------------------------
// Construit le HTML d'une carte TV — style "fiche tarifaire"
// ------------------------------------------------------------
function buildTVCard(tv, rank, type, bestPremium, bestValue) {
  const medals  = { 1: '🥇', 2: '🥈', 3: '🥉' };
  const medal   = medals[rank] || '#' + rank;
  const isTop1  = rank === 1;
  const techClass = getTechBadgeClass(tv.technology);

  // Bloc comparatif (uniquement pour la section "au-dessus du budget")
  var comparisonBlock = '';
  if (type === 'above' && (bestPremium || bestValue)) {
    var compRows = [];
    if (bestPremium) {
      var pDiff = tv.price - bestPremium.price;
      var sDiff = parseFloat((tv.score - bestPremium.score).toFixed(1));
      var sCls  = sDiff > 0 ? 'comp-better' : sDiff < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push(
        '<div class="comp-row">' +
          '<span class="comp-label">🏆 <strong>' + bestPremium.displayName + '</strong>' +
          '<em> · n°1 premium</em></span>' +
          '<span class="comp-values">' +
            '<span class="comp-extra-price">+' + pDiff + ' €</span>' +
            '<span class="comp-extra-score ' + sCls + '">' + (sDiff > 0 ? '+' : '') + sDiff + ' pt</span>' +
          '</span>' +
        '</div>'
      );
    }
    if (bestValue) {
      var pDiff2 = tv.price - bestValue.price;
      var sDiff2 = parseFloat((tv.score - bestValue.score).toFixed(1));
      var sCls2  = sDiff2 > 0 ? 'comp-better' : sDiff2 < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push(
        '<div class="comp-row">' +
          '<span class="comp-label">⭐ <strong>' + bestValue.displayName + '</strong>' +
          '<em> · n°1 rapport Q/P</em></span>' +
          '<span class="comp-values">' +
            '<span class="comp-extra-price">+' + pDiff2 + ' €</span>' +
            '<span class="comp-extra-score ' + sCls2 + '">' + (sDiff2 > 0 ? '+' : '') + sDiff2 + ' pt</span>' +
          '</span>' +
        '</div>'
      );
    }
    comparisonBlock =
      '<div class="card-comparison">' +
        '<div class="comp-header">Vs. les meilleures offres dans votre budget</div>' +
        compRows.join('') +
      '</div>';
  }

  // Prix
  const priceBlock = `
    <div class="card-price-block">
      ${tv.hasPromotion && tv.originalPrice
        ? `<span class="card-price-original">${tv.originalPrice} €</span>`
        : ''}
      <span class="card-price-main">${tv.price} <span class="card-price-suffix">€</span></span>
      ${tv.hasPromotion && tv.promotionEndDate
        ? `<span class="card-promo-end">🏷️ ${tv.promotionLabel} — jusqu'au ${formatDate(tv.promotionEndDate)}</span>`
        : tv.hasPromotion
          ? `<span class="card-promo-end">🏷️ ${tv.promotionLabel}</span>`
          : ''}
    </div>
  `;

  // Liste de critères avec coches (style pricing card)
  const features = [
    {
      label: 'Image',
      value: tv.imageScore,
      detail: tv.technology + ' · ' + tv.resolution + ' · ' + tv.refreshRate + ' Hz'
    },
    {
      label: 'Son',
      value: tv.soundScore,
      detail: scoreToLabel(tv.soundScore) + (tv.soundWatts ? ' · ' + tv.soundWatts + ' W' : '')
    },
    {
      label: 'Réparabilité',
      value: tv.repairabilityScore,
      detail: tv.repairabilityScore + '/10 (indice officiel)'
    },
    {
      label: 'Avis clients',
      value: tv.reviewScore,
      detail: tv.reviewCount >= 50
        ? tv.reviewCount.toLocaleString('fr-FR') + ' avis · ' + tv.reviewScore + '/10'
        : 'Pas assez d\'avis'
    },
    {
      label: 'Garantie',
      value: tv.warrantyYears * 2,
      detail: tv.warrantyYears + ' an' + (tv.warrantyYears > 1 ? 's' : '') + ' constructeur'
    }
  ].map(function (f) {
    var iconClass = f.value >= 7 ? 'feat-icon--good' : f.value >= 5 ? 'feat-icon--ok' : 'feat-icon--weak';
    var symbol    = f.value >= 7 ? '✓' : f.value >= 5 ? '~' : '×';
    return `
      <li>
        <span class="feat-icon ${iconClass}">${symbol}</span>
        <span class="feat-text">
          <strong>${f.label}</strong>
          <span> · ${f.detail}</span>
        </span>
      </li>`;
  }).join('');

  // Meilleur prix parmi les revendeurs disponibles
  const bestRetailer = findBestRetailer(tv);
  const ctaLabel = bestRetailer
    ? `Meilleur prix : ${bestRetailer.price} € sur ${bestRetailer.name}`
    : `Voir les offres — ${tv.price} €`;
  const ctaHref = bestRetailer ? bestRetailer.url : '#';

  // Autres revendeurs (sans le meilleur)
  const otherOffers = buildOtherOffers(tv, bestRetailer);
  const otherCount  = otherOffers.count;

  // Score en % pour l'animation de la barre
  const scoreWidth = Math.round((tv.score / 10) * 100);

  return `
    <div class="tv-card-wrapper ${isTop1 ? 'tv-card-wrapper--top' : ''}">
      ${isTop1 ? '<div class="card-top-badge">RECOMMANDÉ</div>' : ''}

      <div class="tv-card tv-card--${type} ${isTop1 ? 'tv-card--rank-1' : ''}">

        <!-- En-tête : rang + technologie + réduction -->
        <div class="card-header">
          <span class="card-rank-emoji">${medal}</span>
          <span class="tech-badge ${techClass}">${tv.technology}</span>
          ${tv.hasPromotion ? `<span class="promo-pill">${tv.promotionLabel}</span>` : ''}
        </div>

        <!-- Nom du modèle -->
        <h3 class="card-name">${tv.displayName}</h3>
        <p class="card-sub">${tv.size_inches}" (${tv.size_cm} cm) · ${tv.resolution} · ${tv.os}</p>

        <!-- Prix -->
        ${priceBlock}

        <!-- Critères -->
        <ul class="card-features">${features}</ul>

        <!-- Comparatif (above only) -->
        ${comparisonBlock}

        <!-- Barre de score global -->
        <div class="card-score-block">
          <div class="card-score-label">
            <span>Score global</span>
            <strong>${tv.score}/10 · ${scoreToLabel(tv.score)}</strong>
          </div>
          <div class="card-score-track">
            <div class="card-score-fill" data-width="${scoreWidth}%" style="width: 0%"></div>
          </div>
        </div>

        <!-- CTA : meilleur prix -->
        <a href="${ctaHref}" target="_blank" class="card-cta">${ctaLabel} →</a>

        <!-- Autres offres -->
        ${otherCount > 0 ? `
          <details class="card-other-offers">
            <summary>Voir ${otherCount} autre${otherCount > 1 ? 's' : ''} offre${otherCount > 1 ? 's' : ''}</summary>
            <div class="other-offers-list">${otherOffers.html}</div>
          </details>
        ` : ''}

      </div>
    </div>
  `;
}

// ------------------------------------------------------------
// Trouve le revendeur avec le prix le plus bas pour une TV
// ------------------------------------------------------------
function findBestRetailer(tv) {
  if (!tv.affiliateLinks || !tv.pricesByRetailer) return null;

  var best = null;
  Object.entries(tv.affiliateLinks).forEach(function (entry) {
    var key = entry[0], url = entry[1];
    if (!url) return;
    var price = tv.pricesByRetailer[key];
    if (price && (!best || price < best.price)) {
      best = { key: key, url: url, price: price, name: (RETAILERS[key] || {}).name || key };
    }
  });
  return best;
}

// ------------------------------------------------------------
// Construit la liste des autres offres revendeurs (sans le meilleur)
// ------------------------------------------------------------
function buildOtherOffers(tv, bestRetailer) {
  if (!tv.affiliateLinks) return { count: 0, html: '' };

  var bestKey = bestRetailer ? bestRetailer.key : null;
  var items   = [];

  Object.entries(tv.affiliateLinks).forEach(function (entry) {
    var key = entry[0], url = entry[1];
    if (!url || key === bestKey) return;
    var retailer = RETAILERS[key];
    if (!retailer) return;
    var price = tv.pricesByRetailer && tv.pricesByRetailer[key];
    items.push({ key: key, url: url, price: price, retailer: retailer });
  });

  // Trier par prix croissant
  items.sort(function (a, b) {
    if (!a.price) return 1;
    if (!b.price) return -1;
    return a.price - b.price;
  });

  var html = items.map(function (it) {
    return `
      <a href="${it.url}" target="_blank"
         class="retailer-btn"
         style="background-color:${it.retailer.bgColor}; color:${it.retailer.textColor};">
        <span class="retailer-name">${it.retailer.shortName || it.retailer.name}</span>
        ${it.price ? `<span class="retailer-price">${it.price} €</span>` : ''}
      </a>`;
  }).join('');

  return { count: items.length, html: html };
}

// ------------------------------------------------------------
// Affiche les suggestions intelligentes
// ------------------------------------------------------------
function renderSuggestions(suggestions) {
  const section = document.getElementById('sectionSuggestions');
  const list = document.getElementById('listSuggestions');

  section.style.display = 'block';

  list.innerHTML = suggestions.map(s => `
    <div class="suggestion-card">
      <div class="suggestion-icon">💡</div>
      <div class="suggestion-content">
        <h4>${s.tv.displayName} — ${s.tv.price} €</h4>
        <p class="suggestion-reasons">
          Pour seulement <strong>${s.extraCost} € de plus (+${s.extraPercent}%)</strong>
          par rapport au <em>${s.comparedTo.displayName}</em> (${s.comparedTo.price} €), vous obtenez :
        </p>
        <ul>
          ${s.reasons.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

// ------------------------------------------------------------
// Popule la section d'information sur l'affiliation
// ------------------------------------------------------------
function generateAffiliateSection() {
  const container = document.getElementById('affiliateContent');
  if (container) {
    // generateAffiliateExplanation() vient de affiliate.js
    container.innerHTML = generateAffiliateExplanation();
  }
}

// ------------------------------------------------------------
// Formatte une date ISO en format lisible (ex: "30 avril 2026")
// ------------------------------------------------------------
function formatDate(isoDate) {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ------------------------------------------------------------
// Sauvegarde les filtres dans le stockage Chrome
// (sera rechargé à la prochaine ouverture de l'extension)
// ------------------------------------------------------------
function saveFilters() {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.set({ tvComparatorFilters: AppState.filters });
  }
}

// ------------------------------------------------------------
// Recharge les filtres sauvegardés depuis le stockage Chrome
// ------------------------------------------------------------
function loadSavedFilters() {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.get('tvComparatorFilters', function (data) {
      if (data.tvComparatorFilters) {
        Object.assign(AppState.filters, data.tvComparatorFilters);
        applyFiltersToDOM();
      }
    });
  } else {
    applyFiltersToDOM();
  }
}

// ------------------------------------------------------------
// Applique les filtres chargés aux éléments du formulaire
// ------------------------------------------------------------
function applyFiltersToDOM() {
  document.getElementById('priceMin').value = AppState.filters.priceMin;
  document.getElementById('priceMax').value = AppState.filters.priceMax;

  // Sélectionner la bonne taille dans les selects
  const sizeMinSelect = document.getElementById('sizeMin');
  const sizeMaxSelect = document.getElementById('sizeMax');
  if (sizeMinSelect) sizeMinSelect.value = AppState.filters.sizeMin;
  if (sizeMaxSelect) sizeMaxSelect.value = AppState.filters.sizeMax;

  updatePriceDisplay();
  updateRangeTrack();
}

// ------------------------------------------------------------
// Gestion du dual range lave-linge
// ------------------------------------------------------------
function onWashingRangeChange(which) {
  let minVal = parseInt(document.getElementById('wPriceMin').value);
  let maxVal = parseInt(document.getElementById('wPriceMax').value);

  if (which === 'min' && minVal > maxVal) {
    minVal = maxVal;
    document.getElementById('wPriceMin').value = minVal;
  }
  if (which === 'max' && maxVal < minVal) {
    maxVal = minVal;
    document.getElementById('wPriceMax').value = maxVal;
  }

  AppState.washingFilters.priceMin = minVal;
  AppState.washingFilters.priceMax = maxVal;
  AppState.washingFilters.noLimit  = maxVal >= 4000;

  updateWashingPriceDisplay();
  updateWashingRangeTrack();
  document.querySelectorAll('.washing-quick-btn').forEach(function (b) { b.classList.remove('active'); });
}

function updateWashingRangeTrack() {
  const minInput = document.getElementById('wPriceMin');
  const maxInput = document.getElementById('wPriceMax');
  const track    = document.getElementById('wRangeTrackFill');
  if (!track) return;
  const rangeMin  = 0, rangeMax = 4000;
  const leftPct   = ((parseInt(minInput.value) - rangeMin) / (rangeMax - rangeMin)) * 100;
  const rightPct  = ((parseInt(maxInput.value) - rangeMin) / (rangeMax - rangeMin)) * 100;
  track.style.left  = leftPct + '%';
  track.style.width = (rightPct - leftPct) + '%';
}

function updateWashingPriceDisplay() {
  const min = AppState.washingFilters.priceMin;
  const max = AppState.washingFilters.priceMax;
  const minEl = document.getElementById('wPriceMinDisplay');
  const maxEl = document.getElementById('wPriceMaxDisplay');
  if (minEl) minEl.textContent = min.toLocaleString('fr-FR') + ' €';
  if (maxEl) maxEl.textContent = max >= 4000 ? '4 000 € +' : max.toLocaleString('fr-FR') + ' €';
}

// ------------------------------------------------------------
// Lance la comparaison lave-linge
// ------------------------------------------------------------
function onCompareWashing() {
  AppState.washingFilters.priceMin = parseInt(document.getElementById('wPriceMin').value) || 0;
  AppState.washingFilters.priceMax = parseInt(document.getElementById('wPriceMax').value) || 800;
  AppState.washingFilters.noLimit  = AppState.washingFilters.priceMax >= 4000;

  showLoading(true);
  hideResults();

  setTimeout(function () {
    const results = runWashingComparison(WASHING_DATABASE, AppState.washingFilters);
    AppState.results = results;
    showLoading(false);
    renderWashingResults(results);
  }, 100);
}

// ------------------------------------------------------------
// Affiche les résultats lave-linge
// ------------------------------------------------------------
function renderWashingResults(results) {
  if (results.totalFound === 0) {
    const noRes = document.getElementById('noResultsMsg');
    const txt   = document.getElementById('noResultsText');
    if (txt) txt.textContent = 'Aucun lave-linge trouvé';
    noRes.style.display = 'block';
    return;
  }

  updateSectionTitles();
  renderTopSectionWashing('listPremium', results.premium, 'sectionPremium', 'premium');
  renderTopSectionWashing('listValue',   results.value,   'sectionValue',   'value');
  if (!AppState.washingFilters.noLimit) {
    var wBestPremium = results.premium && results.premium[0] ? results.premium[0] : null;
    var wBestValue   = results.value   && results.value[0]   ? results.value[0]   : null;
    renderTopSectionWashing('listAbove', results.aboveBudget, 'sectionAbove', 'above', wBestPremium, wBestValue);
  }
  document.getElementById('resultsWrapper').scrollIntoView({ behavior: 'smooth' });
  requestAnimationFrame(function () { setTimeout(equalizeCardHeights, 50); });
}

function renderTopSectionWashing(listId, machines, sectionId, type, bestPremium, bestValue) {
  const section = document.getElementById(sectionId);
  const list    = document.getElementById(listId);
  if (!machines || machines.length === 0) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  list.innerHTML = machines.map(function (m, i) { return buildWashingCard(m, i + 1, type, bestPremium, bestValue); }).join('');
  requestAnimationFrame(function () {
    list.querySelectorAll('.card-score-fill').forEach(function (el) { el.style.width = el.dataset.width; });
  });
}

// ------------------------------------------------------------
// Construit la carte d'un lave-linge
// ------------------------------------------------------------
function buildWashingCard(m, rank, type, bestPremium, bestValue) {
  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
  const medal  = medals[rank] || '#' + rank;
  const isTop1 = rank === 1;

  // Bloc comparatif (uniquement pour la section "au-dessus du budget")
  var comparisonBlock = '';
  if (type === 'above' && (bestPremium || bestValue)) {
    var compRows = [];
    if (bestPremium) {
      var pDiff = m.price - bestPremium.price;
      var sDiff = parseFloat((m.score - bestPremium.score).toFixed(1));
      var sCls  = sDiff > 0 ? 'comp-better' : sDiff < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push(
        '<div class="comp-row">' +
          '<span class="comp-label">🏆 <strong>' + bestPremium.displayName + '</strong>' +
          '<em> · n°1 premium</em></span>' +
          '<span class="comp-values">' +
            '<span class="comp-extra-price">+' + pDiff + ' €</span>' +
            '<span class="comp-extra-score ' + sCls + '">' + (sDiff > 0 ? '+' : '') + sDiff + ' pt</span>' +
          '</span>' +
        '</div>'
      );
    }
    if (bestValue) {
      var pDiff2 = m.price - bestValue.price;
      var sDiff2 = parseFloat((m.score - bestValue.score).toFixed(1));
      var sCls2  = sDiff2 > 0 ? 'comp-better' : sDiff2 < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push(
        '<div class="comp-row">' +
          '<span class="comp-label">⭐ <strong>' + bestValue.displayName + '</strong>' +
          '<em> · n°1 rapport Q/P</em></span>' +
          '<span class="comp-values">' +
            '<span class="comp-extra-price">+' + pDiff2 + ' €</span>' +
            '<span class="comp-extra-score ' + sCls2 + '">' + (sDiff2 > 0 ? '+' : '') + sDiff2 + ' pt</span>' +
          '</span>' +
        '</div>'
      );
    }
    comparisonBlock =
      '<div class="card-comparison">' +
        '<div class="comp-header">Vs. les meilleures offres dans votre budget</div>' +
        compRows.join('') +
      '</div>';
  }

  const funcLabel  = m.function === 'washer-dryer' ? 'Lavant-séchant' : 'Lavant';
  const funcClass  = m.function === 'washer-dryer' ? 'badge-washer-dryer' : 'badge-washer';
  const instLabel  = m.installationType === 'built-in' ? 'Encastrable' : 'Pose libre';
  const instClass  = m.installationType === 'built-in' ? 'badge-builtin' : 'badge-freestanding';

  const energyClass = 'energy-' + m.energyLabel;

  const priceBlock = `
    <div class="card-price-block">
      ${m.hasPromotion && m.originalPrice ? `<span class="card-price-original">${m.originalPrice} €</span>` : ''}
      <span class="card-price-main">${m.price} <span class="card-price-suffix">€</span></span>
      ${m.hasPromotion && m.promotionLabel ? `<span class="card-promo-end">🏷️ ${m.promotionLabel}${m.promotionEndDate ? ' — jusqu\'au ' + formatDate(m.promotionEndDate) : ''}</span>` : ''}
    </div>`;

  const noiseLabel = m.noiseSpin_db < 70 ? 'Très silencieux' : m.noiseSpin_db < 73 ? 'Silencieux' : m.noiseSpin_db < 76 ? 'Correct' : 'Bruyant';
  const noiseVal   = m.noiseSpin_db < 70 ? 9 : m.noiseSpin_db < 73 ? 7 : m.noiseSpin_db < 76 ? 5 : 3;

  const features = [
    { label: 'Énergie',       value: m.energyLabel === 'A' ? 10 : m.energyLabel === 'B' ? 8 : 6, detail: 'Classe ' + m.energyLabel + ' · ' + m.energyConsumption_kwh + ' kWh/100 cycles' },
    { label: 'Silencieux',    value: noiseVal,  detail: noiseLabel + ' · Essorage ' + m.noiseSpin_db + ' dB' },
    { label: 'Essorage',      value: m.spinSpeed_rpm >= 1400 ? 8 : 5, detail: m.spinSpeed_rpm + ' tr/min' },
    { label: 'Programmes',    value: m.programs >= 15 ? 8 : 6, detail: m.programs + ' programmes' },
    { label: 'Connecté',      value: m.connected ? 9 : 4, detail: m.connected ? 'Contrôle via application' : 'Non connecté' },
    { label: 'Réparabilité',  value: m.repairabilityScore, detail: m.repairabilityScore + '/10 (indice officiel)' }
  ].map(function (f) {
    const iconClass = f.value >= 7 ? 'feat-icon--good' : f.value >= 5 ? 'feat-icon--ok' : 'feat-icon--weak';
    const symbol    = f.value >= 7 ? '✓' : f.value >= 5 ? '~' : '×';
    return `<li>
      <span class="feat-icon ${iconClass}">${symbol}</span>
      <span class="feat-text"><strong>${f.label}</strong><span> · ${f.detail}</span></span>
    </li>`;
  }).join('');

  const bestRetailer = findBestRetailer(m);
  const ctaLabel = bestRetailer ? `Meilleur prix : ${bestRetailer.price} € sur ${bestRetailer.name}` : `Voir les offres — ${m.price} €`;
  const ctaHref  = bestRetailer ? bestRetailer.url : '#';
  const otherOffers = buildOtherOffers(m, bestRetailer);
  const scoreWidth  = Math.round((m.score / 10) * 100);

  const capacityInfo = m.function === 'washer-dryer'
    ? `${m.capacity_kg} kg lavage · ${m.dryCapacity_kg} kg séchage`
    : `${m.capacity_kg} kg · ${instLabel}`;

  return `
    <div class="tv-card-wrapper ${isTop1 ? 'tv-card-wrapper--top' : ''}">
      ${isTop1 ? '<div class="card-top-badge">RECOMMANDÉ</div>' : ''}
      <div class="tv-card tv-card--${type} ${isTop1 ? 'tv-card--rank-1' : ''}">

        <div class="card-header">
          <span class="card-rank-emoji">${medal}</span>
          <span class="tech-badge ${funcClass}">${funcLabel}</span>
          <span class="tech-badge ${instClass}">${instLabel}</span>
          <span class="energy-badge ${energyClass}">${m.energyLabel}</span>
          ${m.hasPromotion ? `<span class="promo-pill">${m.promotionLabel}</span>` : ''}
        </div>

        <h3 class="card-name">${m.displayName}</h3>
        <p class="card-sub">${capacityInfo} · ${m.color === 'white' ? 'Blanc' : m.color === 'black' ? 'Noir' : 'Inox/Gris'}</p>

        ${priceBlock}

        <ul class="card-features">${features}</ul>

        ${comparisonBlock}

        <div class="card-score-block">
          <div class="card-score-label">
            <span>Score global</span>
            <strong>${m.score}/10 · ${scoreToLabel(m.score)}</strong>
          </div>
          <div class="card-score-track">
            <div class="card-score-fill" data-width="${scoreWidth}%" style="width:0%"></div>
          </div>
        </div>

        <a href="${ctaHref}" target="_blank" class="card-cta">${ctaLabel} →</a>

        ${otherOffers.count > 0 ? `
          <details class="card-other-offers">
            <summary>Voir ${otherOffers.count} autre${otherOffers.count > 1 ? 's' : ''} offre${otherOffers.count > 1 ? 's' : ''}</summary>
            <div class="other-offers-list">${otherOffers.html}</div>
          </details>` : ''}

      </div>
    </div>`;
}

// ------------------------------------------------------------
// Clic niveau 1 : sélection de la grande famille
// ------------------------------------------------------------
function onFamilyClick(btn) {
  document.querySelectorAll('.cat1-btn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');

  var familyKey = btn.dataset.cat;
  var family    = CATEGORIES[familyKey];
  if (!family) return;

  // Construire le niveau 2
  var level2 = document.getElementById('catLevel2');
  level2.innerHTML = family.products.map(function (p) {
    return '<button class="category-btn' + (p.available ? '' : ' disabled') +
           '" data-category="' + p.key + '"' + (p.available ? '' : ' data-soon="true"') + '>' +
           '<span class="cat-icon">' + p.emoji + '</span> ' + p.label +
           (p.available ? '' : ' <span class="soon-badge">Bientôt</span>') +
           '</button>';
  }).join('');
  level2.style.display = '';

  // Bind click sur chaque bouton produit
  level2.querySelectorAll('.category-btn').forEach(function (b) {
    b.addEventListener('click', function () { onProductClick(this); });
  });

  // Réinitialiser les panels et résultats
  hideResults();
  var noRes = document.getElementById('noResultsMsg');
  if (noRes) noRes.style.display = 'none';
  document.getElementById('filtersTv').style.display      = 'none';
  document.getElementById('filtersWashing').style.display = 'none';
}

// ------------------------------------------------------------
// Clic niveau 2 : sélection du produit
// ------------------------------------------------------------
function onProductClick(btn) {
  if (btn.dataset.soon === 'true') {
    showToast('Cette catégorie arrive bientôt !');
    return;
  }

  document.querySelectorAll('#catLevel2 .category-btn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');

  var product = btn.dataset.category;
  AppState.currentCategory = product;

  var isTv      = product === 'tv';
  var isWashing = product === 'washing';
  document.getElementById('filtersTv').style.display      = isTv      ? '' : 'none';
  document.getElementById('filtersWashing').style.display = isWashing ? '' : 'none';

  hideResults();
  var noRes = document.getElementById('noResultsMsg');
  if (noRes) noRes.style.display = 'none';
}

// ------------------------------------------------------------
// Affiche un message temporaire (toast) en bas de l'écran
// ------------------------------------------------------------
function showToast(message) {
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(function () {
    toast.classList.add('toast--visible');
  });

  setTimeout(function () {
    toast.classList.remove('toast--visible');
    setTimeout(function () { toast.remove(); }, 300);
  }, 2500);
}
