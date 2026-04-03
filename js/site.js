// ============================================================
// site.js - Logique principale du site web
//
// Catalogue de catégories et produits
// ============================================================

const CATEGORIES = {
  electromenager: {
    label: 'Électroménager', emoji: '🏠',
    products: [
      { key: 'washing',    label: 'Lave-linge',        emoji: '🫧', available: true  },
      { key: 'dryer',      label: 'Sèche-linge',       emoji: '🌀', available: false },
      { key: 'dishwasher', label: 'Lave-vaisselle',    emoji: '🍽️', available: true  },
      { key: 'fridge',     label: 'Réfrigérateur',     emoji: '🧊', available: false },
      { key: 'oven',       label: 'Four',               emoji: '🔥', available: false },
      { key: 'hood',       label: 'Hotte',              emoji: '💨', available: false },
      { key: 'coffee',     label: 'Machine à café',     emoji: '☕', available: true  },
      { key: 'airfryer',   label: 'Airfryer',           emoji: '⚡', available: false },
      { key: 'microwave',  label: 'Micro-ondes',        emoji: '♨️', available: false },
      { key: 'hob',        label: 'Plaques de cuisson', emoji: '🍳', available: false },
    ]
  },
  maison: {
    label: 'Maison', emoji: '🏡',
    products: [
      { key: 'vacuum', label: 'Aspirateur',          emoji: '🌪️', available: true  },
      { key: 'robot',  label: 'Aspirateur robot',     emoji: '🤖', available: false },
      { key: 'iron',   label: 'Repassage',            emoji: '👔', available: true  },
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
  dishwasherFilters: {
    priceMin: 0,
    priceMax: 800,
    noLimit: false,
    installationType: 'all',
    cutleryStorage: 'all',
    placeSettingsMin: 7
  },
  coffeeFilters: {
    priceMin: 0,
    priceMax: 800,
    noLimit: false,
    installationType: 'all',
    beanType: 'all',
    milkSystem: null
  },
  vacuumFilters: {
    priceMin: 0,
    priceMax: 600,
    noLimit: false,
    type: 'all',
    withBag: 'all',
    petFriendly: 'all',
    connected: 'all',
    maxWeight: 5,
    minAutonomy: 20,
    autoEmpty: 'all',
    mopFunction: 'all'
  },
  ironFilters: {
    priceMin: 0,
    priceMax: 200,
    noLimit: false,
    type: 'all',
    antiCalcSystem: 'all'
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

  // ---- Filtres lave-vaisselle ----
  document.getElementById('dwPriceMin').addEventListener('input', function () { onDwRangeChange('min'); });
  document.getElementById('dwPriceMax').addEventListener('input', function () { onDwRangeChange('max'); });

  document.querySelectorAll('.dw-quick-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var min = parseInt(this.dataset.min);
      var max = parseInt(this.dataset.max);
      document.getElementById('dwPriceMin').value = min;
      document.getElementById('dwPriceMax').value = max;
      AppState.dishwasherFilters.priceMin = min;
      AppState.dishwasherFilters.priceMax = max;
      AppState.dishwasherFilters.noLimit  = max >= 4000;
      updateDwPriceDisplay();
      updateDwRangeTrack();
      document.querySelectorAll('.dw-quick-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  document.querySelectorAll('#dwInstallTypeGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#dwInstallTypeGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.dishwasherFilters.installationType = this.dataset.value;
    });
  });

  document.querySelectorAll('#dwCutleryGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#dwCutleryGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.dishwasherFilters.cutleryStorage = this.dataset.value;
    });
  });

  document.getElementById('dwPlaceSettings').addEventListener('input', function () {
    AppState.dishwasherFilters.placeSettingsMin = parseInt(this.value);
    document.getElementById('dwPlaceSettingsDisplay').textContent = this.value + ' couverts minimum';
  });

  document.getElementById('compareDishwasherBtn').addEventListener('click', onCompareDishwasher);

  updateDwRangeTrack();
  updateDwPriceDisplay();

  // ---- Filtres machine à café ----
  document.getElementById('cfPriceMin').addEventListener('input', function () { onCfRangeChange('min'); });
  document.getElementById('cfPriceMax').addEventListener('input', function () { onCfRangeChange('max'); });

  document.querySelectorAll('.cf-quick-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var min = parseInt(this.dataset.min);
      var max = parseInt(this.dataset.max);
      document.getElementById('cfPriceMin').value = min;
      document.getElementById('cfPriceMax').value = max;
      AppState.coffeeFilters.priceMin = min;
      AppState.coffeeFilters.priceMax = max;
      AppState.coffeeFilters.noLimit  = max >= 4000;
      updateCfPriceDisplay();
      updateCfRangeTrack();
      document.querySelectorAll('.cf-quick-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  document.querySelectorAll('#cfBeanTypeGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#cfBeanTypeGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.coffeeFilters.beanType = this.dataset.value;
    });
  });

  document.querySelectorAll('#cfInstallTypeGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#cfInstallTypeGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.coffeeFilters.installationType = this.dataset.value;
    });
  });

  document.querySelectorAll('#cfMilkGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#cfMilkGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      var v = this.dataset.value;
      AppState.coffeeFilters.milkSystem = v === 'yes' ? true : v === 'no' ? false : null;
    });
  });

  document.getElementById('compareCoffeeBtn').addEventListener('click', onCompareCoffee);

  updateCfRangeTrack();
  updateCfPriceDisplay();

  // ---- Filtres aspirateur ----
  document.getElementById('vacPriceMin').addEventListener('input', function () { onVacRangeChange('min'); });
  document.getElementById('vacPriceMax').addEventListener('input', function () { onVacRangeChange('max'); });

  document.querySelectorAll('.vac-quick-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var min = parseInt(this.dataset.min), max = parseInt(this.dataset.max);
      document.getElementById('vacPriceMin').value = min;
      document.getElementById('vacPriceMax').value = max;
      AppState.vacuumFilters.priceMin = min;
      AppState.vacuumFilters.priceMax = max;
      AppState.vacuumFilters.noLimit  = max >= 4000;
      updateVacPriceDisplay(); updateVacRangeTrack();
      document.querySelectorAll('.vac-quick-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  document.querySelectorAll('#vacTypeGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#vacTypeGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.vacuumFilters.type = this.dataset.value;
      onVacTypeChange(this.dataset.value);
    });
  });

  document.querySelectorAll('#vacWithBagGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#vacWithBagGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.vacuumFilters.withBag = this.dataset.value;
    });
  });

  document.querySelectorAll('#vacPetGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#vacPetGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.vacuumFilters.petFriendly = this.dataset.value;
    });
  });

  document.getElementById('vacMaxWeight').addEventListener('input', function () {
    AppState.vacuumFilters.maxWeight = parseFloat(this.value);
    document.getElementById('vacWeightDisplay').textContent = this.value + ' kg maximum';
  });

  document.getElementById('vacMinAutonomy').addEventListener('input', function () {
    AppState.vacuumFilters.minAutonomy = parseInt(this.value);
    document.getElementById('vacAutonomyDisplay').textContent = this.value + ' min minimum';
  });

  document.querySelectorAll('#vacAutoEmptyToggle .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#vacAutoEmptyToggle .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.vacuumFilters.autoEmpty = this.dataset.value;
    });
  });

  document.querySelectorAll('#vacMopToggle .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#vacMopToggle .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.vacuumFilters.mopFunction = this.dataset.value;
    });
  });

  document.querySelectorAll('#vacConnectedGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#vacConnectedGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.vacuumFilters.connected = this.dataset.value;
    });
  });

  document.getElementById('compareVacuumBtn').addEventListener('click', onCompareVacuum);
  updateVacRangeTrack(); updateVacPriceDisplay();
  onVacTypeChange('all');

  // ---- Filtres fer à repasser ----
  document.getElementById('ironPriceMin').addEventListener('input', function () { onIronRangeChange('min'); });
  document.getElementById('ironPriceMax').addEventListener('input', function () { onIronRangeChange('max'); });

  document.querySelectorAll('.iron-quick-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var min = parseInt(this.dataset.min), max = parseInt(this.dataset.max);
      document.getElementById('ironPriceMin').value = min;
      document.getElementById('ironPriceMax').value = max;
      AppState.ironFilters.priceMin = min;
      AppState.ironFilters.priceMax = max;
      AppState.ironFilters.noLimit  = max >= 4000;
      updateIronPriceDisplay(); updateIronRangeTrack();
      document.querySelectorAll('.iron-quick-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  document.querySelectorAll('#ironTypeGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#ironTypeGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.ironFilters.type = this.dataset.value;
    });
  });

  document.querySelectorAll('#ironAntiCalcGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#ironAntiCalcGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.ironFilters.antiCalcSystem = this.dataset.value;
    });
  });

  document.getElementById('compareIronBtn').addEventListener('click', onCompareIron);
  updateIronRangeTrack(); updateIronPriceDisplay();
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
// Sauvegarde les filtres dans localStorage
// ------------------------------------------------------------
function saveFilters() {
  try {
    localStorage.setItem('tvComparatorFilters', JSON.stringify(AppState.filters));
  } catch (e) {}
}

// ------------------------------------------------------------
// Recharge les filtres sauvegardés depuis localStorage
// ------------------------------------------------------------
function loadSavedFilters() {
  try {
    var saved = localStorage.getItem('tvComparatorFilters');
    if (saved) {
      Object.assign(AppState.filters, JSON.parse(saved));
    }
  } catch (e) {}
  applyFiltersToDOM();
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

// ============================================================
// ASPIRATEUR — Range, affichage, comparaison, rendu
// ============================================================

function onVacRangeChange(which) {
  var minVal = parseInt(document.getElementById('vacPriceMin').value);
  var maxVal = parseInt(document.getElementById('vacPriceMax').value);
  if (which === 'min' && minVal > maxVal) { minVal = maxVal; document.getElementById('vacPriceMin').value = minVal; }
  if (which === 'max' && maxVal < minVal) { maxVal = minVal; document.getElementById('vacPriceMax').value = maxVal; }
  AppState.vacuumFilters.priceMin = minVal;
  AppState.vacuumFilters.priceMax = maxVal;
  AppState.vacuumFilters.noLimit  = maxVal >= 4000;
  updateVacPriceDisplay(); updateVacRangeTrack();
  document.querySelectorAll('.vac-quick-btn').forEach(function (b) { b.classList.remove('active'); });
}

function updateVacRangeTrack() {
  var track = document.getElementById('vacRangeTrackFill');
  if (!track) return;
  var leftPct  = (parseInt(document.getElementById('vacPriceMin').value) / 4000) * 100;
  var rightPct = (parseInt(document.getElementById('vacPriceMax').value) / 4000) * 100;
  track.style.left = leftPct + '%'; track.style.width = (rightPct - leftPct) + '%';
}

function updateVacPriceDisplay() {
  var min = AppState.vacuumFilters.priceMin, max = AppState.vacuumFilters.priceMax;
  var minEl = document.getElementById('vacPriceMinDisplay'), maxEl = document.getElementById('vacPriceMaxDisplay');
  if (minEl) minEl.textContent = min.toLocaleString('fr-FR') + ' €';
  if (maxEl) maxEl.textContent = max >= 4000 ? '4 000 € +' : max.toLocaleString('fr-FR') + ' €';
}

function onVacTypeChange(vacType) {
  // Type-specific filter groups handled in dedicated category panels
}

function onCompareVacuum() {
  AppState.vacuumFilters.priceMin = parseInt(document.getElementById('vacPriceMin').value) || 0;
  AppState.vacuumFilters.priceMax = parseInt(document.getElementById('vacPriceMax').value) || 600;
  AppState.vacuumFilters.noLimit  = AppState.vacuumFilters.priceMax >= 4000;
  showLoading(true); hideResults();
  setTimeout(function () {
    var results = runVacuumComparison(VACUUM_DATABASE, AppState.vacuumFilters);
    AppState.results = results; showLoading(false);
    renderVacuumResults(results);
  }, 100);
}

function renderVacuumResults(results) {
  if (results.totalFound === 0) {
    var noRes = document.getElementById('noResultsMsg'), txt = document.getElementById('noResultsText');
    if (txt) txt.textContent = 'Aucun aspirateur trouvé';
    noRes.style.display = 'block'; return;
  }
  updateSectionTitles();
  renderTopSectionVacuum('listPremium', results.premium, 'sectionPremium', 'premium');
  renderTopSectionVacuum('listValue',   results.value,   'sectionValue',   'value');
  if (!AppState.vacuumFilters.noLimit) {
    var bestP = results.premium && results.premium[0] ? results.premium[0] : null;
    var bestV = results.value   && results.value[0]   ? results.value[0]   : null;
    renderTopSectionVacuum('listAbove', results.aboveBudget, 'sectionAbove', 'above', bestP, bestV);
  }
  document.getElementById('resultsWrapper').scrollIntoView({ behavior: 'smooth' });
  requestAnimationFrame(function () { setTimeout(equalizeCardHeights, 50); });
}

function renderTopSectionVacuum(listId, items, sectionId, type, bestPremium, bestValue) {
  var section = document.getElementById(sectionId), list = document.getElementById(listId);
  if (!items || items.length === 0) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  list.innerHTML = items.map(function (m, i) { return buildVacuumCard(m, i + 1, type, bestPremium, bestValue); }).join('');
  requestAnimationFrame(function () { list.querySelectorAll('.card-score-fill').forEach(function (el) { el.style.width = el.dataset.width; }); });
}

function buildVacuumCard(m, rank, type, bestPremium, bestValue) {
  var medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
  var medal = medals[rank] || '#' + rank;
  var isTop1 = rank === 1;
  var scoreWidth = Math.round(m.score * 10);

  var comparisonBlock = '';
  if (type === 'above' && (bestPremium || bestValue)) {
    var compRows = [];
    if (bestPremium) {
      var pDiff = m.price - bestPremium.price, sDiff = parseFloat((m.score - bestPremium.score).toFixed(1));
      var sCls = sDiff > 0 ? 'comp-better' : sDiff < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">🏆 <strong>' + bestPremium.displayName + '</strong><em> · n°1 premium</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff + ' €</span><span class="comp-extra-score ' + sCls + '">' + (sDiff > 0 ? '+' : '') + sDiff + ' pt</span></span></div>');
    }
    if (bestValue) {
      var pDiff2 = m.price - bestValue.price, sDiff2 = parseFloat((m.score - bestValue.score).toFixed(1));
      var sCls2 = sDiff2 > 0 ? 'comp-better' : sDiff2 < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">⭐ <strong>' + bestValue.displayName + '</strong><em> · n°1 rapport Q/P</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff2 + ' €</span><span class="comp-extra-score ' + sCls2 + '">' + (sDiff2 > 0 ? '+' : '') + sDiff2 + ' pt</span></span></div>');
    }
    comparisonBlock = '<div class="card-comparison"><div class="comp-header">Comparé aux meilleures options dans votre budget :</div>' + compRows.join('') + '</div>';
  }

  var promoTag = m.hasPromotion ? '<span class="card-promo-tag">' + m.promotionLabel + '</span>' : '';
  var typeLabel = m.type === 'balai' ? '🌪️ Balai sans fil' : m.type === 'robot' ? '🤖 Robot' : '🧹 Traineau';
  var bagLabel  = m.withBag ? '🛍️ Avec sac' : '♻️ Sans sac';

  // Specs selon le type
  var specsHtml = '';
  if (m.type === 'balai') {
    specsHtml = (
      '<div class="spec-item"><span class="spec-label">Puissance</span><span class="spec-value">' + m.suctionPower + ' W</span></div>' +
      '<div class="spec-item"><span class="spec-label">Autonomie</span><span class="spec-value">' + m.batteryLife_min + ' min</span></div>' +
      '<div class="spec-item"><span class="spec-label">Charge</span><span class="spec-value">' + Math.round(m.chargeTime_min / 60 * 10) / 10 + 'h</span></div>' +
      '<div class="spec-item"><span class="spec-label">Poids</span><span class="spec-value">' + m.weight_kg + ' kg</span></div>' +
      '<div class="spec-item"><span class="spec-label">Bruit</span><span class="spec-value">' + m.noiseLevel_db + ' dB</span></div>' +
      '<div class="spec-item"><span class="spec-label">Bac</span><span class="spec-value">' + (m.dustCapacity_ml / 1000).toFixed(1) + ' L</span></div>'
    );
  } else if (m.type === 'robot') {
    specsHtml = (
      '<div class="spec-item"><span class="spec-label">Aspiration</span><span class="spec-value">' + m.suctionPower.toLocaleString('fr-FR') + ' Pa</span></div>' +
      '<div class="spec-item"><span class="spec-label">Surface</span><span class="spec-value">' + m.cleaningArea_sqm + ' m²</span></div>' +
      '<div class="spec-item"><span class="spec-label">Autonomie</span><span class="spec-value">' + m.batteryLife_min + ' min</span></div>' +
      '<div class="spec-item"><span class="spec-label">Bac</span><span class="spec-value">' + m.dustCapacity_ml + ' ml</span></div>' +
      (m.cleanWaterTank_ml ? '<div class="spec-item"><span class="spec-label">Réservoir eau</span><span class="spec-value">' + m.cleanWaterTank_ml + ' ml</span></div>' : '') +
      (m.dirtyWaterTank_ml ? '<div class="spec-item"><span class="spec-label">Eau usée</span><span class="spec-value">' + m.dirtyWaterTank_ml + ' ml</span></div>' : '') +
      '<div class="spec-item"><span class="spec-label">Cartographie</span><span class="spec-value">' + (m.mappingTechnology === 'lidar' ? 'Lidar' : m.mappingTechnology === 'camera' ? 'Caméra' : 'Basique') + '</span></div>'
    );
  } else {
    specsHtml = (
      '<div class="spec-item"><span class="spec-label">Puissance</span><span class="spec-value">' + m.suctionPower + ' W</span></div>' +
      '<div class="spec-item"><span class="spec-label">Bruit</span><span class="spec-value">' + m.noiseLevel_db + ' dB</span></div>' +
      '<div class="spec-item"><span class="spec-label">Poids</span><span class="spec-value">' + m.weight_kg + ' kg</span></div>' +
      (m.bagCapacity_liters ? '<div class="spec-item"><span class="spec-label">Sac</span><span class="spec-value">' + m.bagCapacity_liters + ' L</span></div>' : '<div class="spec-item"><span class="spec-label">Bac</span><span class="spec-value">' + (m.dustCapacity_ml / 1000).toFixed(1) + ' L</span></div>') +
      '<div class="spec-item"><span class="spec-label">Réparabilité</span><span class="spec-value">' + m.repairabilityScore + '/10</span></div>' +
      '<div class="spec-item"><span class="spec-label">Garantie</span><span class="spec-value">' + m.warrantyYears + ' ans</span></div>'
    );
  }

  var links = Object.entries(m.affiliateLinks || {})
    .filter(function (e) { return e[1]; }).slice(0, 5)
    .map(function (e) { return '<a href="' + e[1] + '" target="_blank" rel="noopener" class="retailer-link">' + e[0].charAt(0).toUpperCase() + e[0].slice(1) + '</a>'; }).join('');

  return (
    '<div class="tv-card' + (isTop1 ? ' tv-card--top1' : '') + '">' +
      '<div class="card-header">' +
        '<span class="card-rank">' + medal + '</span>' +
        '<div class="card-title-block">' +
          '<h3 class="card-title">' + m.displayName + '</h3>' +
          '<div class="card-badges">' +
            '<span class="card-badge">' + typeLabel + '</span>' +
            '<span class="card-badge">' + bagLabel + '</span>' +
            (m.petFriendly ? '<span class="card-badge">🐾 Compatible animaux</span>' : '') +
            (m.connected ? '<span class="card-badge">📱 Connecté</span>' : '') +
            (m.autoEmpty ? '<span class="card-badge">🗑️ Vidage auto</span>' : '') +
            (m.mopFunction ? '<span class="card-badge">💧 Lavage sols</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="card-price-block">' + promoTag +
          '<span class="card-price">' + m.price.toLocaleString('fr-FR') + ' €</span>' +
          (m.originalPrice ? '<span class="card-original-price">' + m.originalPrice.toLocaleString('fr-FR') + ' €</span>' : '') +
        '</div>' +
      '</div>' +
      comparisonBlock +
      '<div class="card-score-block"><div class="card-score-label"><span>Score global</span><strong>' + m.score + '/10 · ' + scoreToLabel(m.score) + '</strong></div><div class="card-score-track"><div class="card-score-fill" data-width="' + scoreWidth + '%" style="width:0%"></div></div></div>' +
      '<div class="card-specs">' + specsHtml + '</div>' +
      (links ? '<div class="card-retailers"><span class="retailers-label">Où acheter :</span><div class="retailers-links">' + links + '</div></div>' : '') +
    '</div>'
  );
}

// ============================================================
// FER À REPASSER — Range, affichage, comparaison, rendu
// ============================================================

function onIronRangeChange(which) {
  var minVal = parseInt(document.getElementById('ironPriceMin').value);
  var maxVal = parseInt(document.getElementById('ironPriceMax').value);
  if (which === 'min' && minVal > maxVal) { minVal = maxVal; document.getElementById('ironPriceMin').value = minVal; }
  if (which === 'max' && maxVal < minVal) { maxVal = minVal; document.getElementById('ironPriceMax').value = maxVal; }
  AppState.ironFilters.priceMin = minVal;
  AppState.ironFilters.priceMax = maxVal;
  AppState.ironFilters.noLimit  = maxVal >= 4000;
  updateIronPriceDisplay(); updateIronRangeTrack();
  document.querySelectorAll('.iron-quick-btn').forEach(function (b) { b.classList.remove('active'); });
}

function updateIronRangeTrack() {
  var track = document.getElementById('ironRangeTrackFill');
  if (!track) return;
  var leftPct  = (parseInt(document.getElementById('ironPriceMin').value) / 4000) * 100;
  var rightPct = (parseInt(document.getElementById('ironPriceMax').value) / 4000) * 100;
  track.style.left = leftPct + '%'; track.style.width = (rightPct - leftPct) + '%';
}

function updateIronPriceDisplay() {
  var min = AppState.ironFilters.priceMin, max = AppState.ironFilters.priceMax;
  var minEl = document.getElementById('ironPriceMinDisplay'), maxEl = document.getElementById('ironPriceMaxDisplay');
  if (minEl) minEl.textContent = min.toLocaleString('fr-FR') + ' €';
  if (maxEl) maxEl.textContent = max >= 4000 ? '4 000 € +' : max.toLocaleString('fr-FR') + ' €';
}

function onCompareIron() {
  AppState.ironFilters.priceMin = parseInt(document.getElementById('ironPriceMin').value) || 0;
  AppState.ironFilters.priceMax = parseInt(document.getElementById('ironPriceMax').value) || 200;
  AppState.ironFilters.noLimit  = AppState.ironFilters.priceMax >= 4000;
  showLoading(true); hideResults();
  setTimeout(function () {
    var results = runIronComparison(IRON_DATABASE, AppState.ironFilters);
    AppState.results = results; showLoading(false);
    renderIronResults(results);
  }, 100);
}

function renderIronResults(results) {
  if (results.totalFound === 0) {
    var noRes = document.getElementById('noResultsMsg'), txt = document.getElementById('noResultsText');
    if (txt) txt.textContent = 'Aucun fer à repasser trouvé';
    noRes.style.display = 'block'; return;
  }
  updateSectionTitles();
  renderTopSectionIron('listPremium', results.premium, 'sectionPremium', 'premium');
  renderTopSectionIron('listValue',   results.value,   'sectionValue',   'value');
  if (!AppState.ironFilters.noLimit) {
    var bestP = results.premium && results.premium[0] ? results.premium[0] : null;
    var bestV = results.value   && results.value[0]   ? results.value[0]   : null;
    renderTopSectionIron('listAbove', results.aboveBudget, 'sectionAbove', 'above', bestP, bestV);
  }
  document.getElementById('resultsWrapper').scrollIntoView({ behavior: 'smooth' });
  requestAnimationFrame(function () { setTimeout(equalizeCardHeights, 50); });
}

function renderTopSectionIron(listId, items, sectionId, type, bestPremium, bestValue) {
  var section = document.getElementById(sectionId), list = document.getElementById(listId);
  if (!items || items.length === 0) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  list.innerHTML = items.map(function (m, i) { return buildIronCard(m, i + 1, type, bestPremium, bestValue); }).join('');
  requestAnimationFrame(function () { list.querySelectorAll('.card-score-fill').forEach(function (el) { el.style.width = el.dataset.width; }); });
}

function buildIronCard(m, rank, type, bestPremium, bestValue) {
  var medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
  var medal = medals[rank] || '#' + rank;
  var isTop1 = rank === 1;
  var scoreWidth = Math.round(m.score * 10);

  var comparisonBlock = '';
  if (type === 'above' && (bestPremium || bestValue)) {
    var compRows = [];
    if (bestPremium) {
      var pDiff = m.price - bestPremium.price, sDiff = parseFloat((m.score - bestPremium.score).toFixed(1));
      var sCls = sDiff > 0 ? 'comp-better' : sDiff < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">🏆 <strong>' + bestPremium.displayName + '</strong><em> · n°1 premium</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff + ' €</span><span class="comp-extra-score ' + sCls + '">' + (sDiff > 0 ? '+' : '') + sDiff + ' pt</span></span></div>');
    }
    if (bestValue) {
      var pDiff2 = m.price - bestValue.price, sDiff2 = parseFloat((m.score - bestValue.score).toFixed(1));
      var sCls2 = sDiff2 > 0 ? 'comp-better' : sDiff2 < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">⭐ <strong>' + bestValue.displayName + '</strong><em> · n°1 rapport Q/P</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff2 + ' €</span><span class="comp-extra-score ' + sCls2 + '">' + (sDiff2 > 0 ? '+' : '') + sDiff2 + ' pt</span></span></div>');
    }
    comparisonBlock = '<div class="card-comparison"><div class="comp-header">Comparé aux meilleures options dans votre budget :</div>' + compRows.join('') + '</div>';
  }

  var promoTag  = m.hasPromotion ? '<span class="card-promo-tag">' + m.promotionLabel + '</span>' : '';
  var typeLabel = m.type === 'steam-station' ? '♨️ Centrale vapeur' : '♨️ Fer à repasser';
  var soleplateLabels = { stainless: 'Semelle inox', ceramic: 'Semelle céramique', titanium: 'Semelle titane', airglide: 'Semelle Airglide', calcor: 'Semelle Calcor' };
  var antiCalcLabels  = { removable: 'Anti-calc amovible', automatic: 'Anti-calc automatique', filter: 'Filtre anti-calc' };

  var links = Object.entries(m.affiliateLinks || {})
    .filter(function (e) { return e[1]; }).slice(0, 5)
    .map(function (e) { return '<a href="' + e[1] + '" target="_blank" rel="noopener" class="retailer-link">' + e[0].charAt(0).toUpperCase() + e[0].slice(1) + '</a>'; }).join('');

  return (
    '<div class="tv-card' + (isTop1 ? ' tv-card--top1' : '') + '">' +
      '<div class="card-header">' +
        '<span class="card-rank">' + medal + '</span>' +
        '<div class="card-title-block">' +
          '<h3 class="card-title">' + m.displayName + '</h3>' +
          '<div class="card-badges">' +
            '<span class="card-badge">' + typeLabel + '</span>' +
            '<span class="card-badge">⚡ ' + m.power_w + ' W</span>' +
            (m.antiCalcSystem ? '<span class="card-badge">🧪 ' + (antiCalcLabels[m.antiCalcType] || 'Anti-calcaire') + '</span>' : '') +
            (m.soleplateMaterial ? '<span class="card-badge">🔲 ' + (soleplateLabels[m.soleplateMaterial] || m.soleplateMaterial) + '</span>' : '') +
            (m.verticalSteam ? '<span class="card-badge">👔 Vapeur verticale</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="card-price-block">' + promoTag +
          '<span class="card-price">' + m.price.toLocaleString('fr-FR') + ' €</span>' +
          (m.originalPrice ? '<span class="card-original-price">' + m.originalPrice.toLocaleString('fr-FR') + ' €</span>' : '') +
        '</div>' +
      '</div>' +
      comparisonBlock +
      '<div class="card-score-block"><div class="card-score-label"><span>Score global</span><strong>' + m.score + '/10 · ' + scoreToLabel(m.score) + '</strong></div><div class="card-score-track"><div class="card-score-fill" data-width="' + scoreWidth + '%" style="width:0%"></div></div></div>' +
      '<div class="card-specs">' +
        '<div class="spec-item"><span class="spec-label">Débit vapeur</span><span class="spec-value">' + m.steamFlow_g_min + ' g/min</span></div>' +
        '<div class="spec-item"><span class="spec-label">Coup de vapeur</span><span class="spec-value">' + m.steamBoost_g_min + ' g/min</span></div>' +
        '<div class="spec-item"><span class="spec-label">Réservoir</span><span class="spec-value">' + m.waterTank_ml + ' ml</span></div>' +
        (m.pressure_bar > 0 ? '<div class="spec-item"><span class="spec-label">Pression</span><span class="spec-value">' + m.pressure_bar + ' bar</span></div>' : '') +
        '<div class="spec-item"><span class="spec-label">Puissance</span><span class="spec-value">' + m.power_w + ' W</span></div>' +
        '<div class="spec-item"><span class="spec-label">Arrêt auto</span><span class="spec-value">' + (m.autoOff ? 'Oui' : 'Non') + '</span></div>' +
      '</div>' +
      (links ? '<div class="card-retailers"><span class="retailers-label">Où acheter :</span><div class="retailers-links">' + links + '</div></div>' : '') +
    '</div>'
  );
}

// ============================================================
// LAVE-VAISSELLE — Range, affichage, comparaison, rendu
// ============================================================

function onDwRangeChange(which) {
  var minVal = parseInt(document.getElementById('dwPriceMin').value);
  var maxVal = parseInt(document.getElementById('dwPriceMax').value);
  if (which === 'min' && minVal > maxVal) { minVal = maxVal; document.getElementById('dwPriceMin').value = minVal; }
  if (which === 'max' && maxVal < minVal) { maxVal = minVal; document.getElementById('dwPriceMax').value = maxVal; }
  AppState.dishwasherFilters.priceMin = minVal;
  AppState.dishwasherFilters.priceMax = maxVal;
  AppState.dishwasherFilters.noLimit  = maxVal >= 4000;
  updateDwPriceDisplay();
  updateDwRangeTrack();
  document.querySelectorAll('.dw-quick-btn').forEach(function (b) { b.classList.remove('active'); });
}

function updateDwRangeTrack() {
  var minInput = document.getElementById('dwPriceMin');
  var maxInput = document.getElementById('dwPriceMax');
  var track    = document.getElementById('dwRangeTrackFill');
  if (!track) return;
  var leftPct  = ((parseInt(minInput.value)) / 4000) * 100;
  var rightPct = ((parseInt(maxInput.value)) / 4000) * 100;
  track.style.left  = leftPct + '%';
  track.style.width = (rightPct - leftPct) + '%';
}

function updateDwPriceDisplay() {
  var min = AppState.dishwasherFilters.priceMin;
  var max = AppState.dishwasherFilters.priceMax;
  var minEl = document.getElementById('dwPriceMinDisplay');
  var maxEl = document.getElementById('dwPriceMaxDisplay');
  if (minEl) minEl.textContent = min.toLocaleString('fr-FR') + ' €';
  if (maxEl) maxEl.textContent = max >= 4000 ? '4 000 € +' : max.toLocaleString('fr-FR') + ' €';
}

function onCompareDishwasher() {
  AppState.dishwasherFilters.priceMin = parseInt(document.getElementById('dwPriceMin').value) || 0;
  AppState.dishwasherFilters.priceMax = parseInt(document.getElementById('dwPriceMax').value) || 800;
  AppState.dishwasherFilters.noLimit  = AppState.dishwasherFilters.priceMax >= 4000;

  showLoading(true);
  hideResults();

  setTimeout(function () {
    var results = runDishwasherComparison(DISHWASHER_DATABASE, AppState.dishwasherFilters);
    AppState.results = results;
    showLoading(false);
    renderDishwasherResults(results);
  }, 100);
}

function renderDishwasherResults(results) {
  if (results.totalFound === 0) {
    var noRes = document.getElementById('noResultsMsg');
    var txt   = document.getElementById('noResultsText');
    if (txt) txt.textContent = 'Aucun lave-vaisselle trouvé';
    noRes.style.display = 'block';
    return;
  }
  updateSectionTitles();
  renderTopSectionDishwasher('listPremium', results.premium, 'sectionPremium', 'premium');
  renderTopSectionDishwasher('listValue',   results.value,   'sectionValue',   'value');
  if (!AppState.dishwasherFilters.noLimit) {
    var bestP = results.premium && results.premium[0] ? results.premium[0] : null;
    var bestV = results.value   && results.value[0]   ? results.value[0]   : null;
    renderTopSectionDishwasher('listAbove', results.aboveBudget, 'sectionAbove', 'above', bestP, bestV);
  }
  document.getElementById('resultsWrapper').scrollIntoView({ behavior: 'smooth' });
  requestAnimationFrame(function () { setTimeout(equalizeCardHeights, 50); });
}

function renderTopSectionDishwasher(listId, items, sectionId, type, bestPremium, bestValue) {
  var section = document.getElementById(sectionId);
  var list    = document.getElementById(listId);
  if (!items || items.length === 0) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  list.innerHTML = items.map(function (m, i) { return buildDishwasherCard(m, i + 1, type, bestPremium, bestValue); }).join('');
  requestAnimationFrame(function () {
    list.querySelectorAll('.card-score-fill').forEach(function (el) { el.style.width = el.dataset.width; });
  });
}

function buildDishwasherCard(m, rank, type, bestPremium, bestValue) {
  var medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
  var medal  = medals[rank] || '#' + rank;
  var isTop1 = rank === 1;
  var scoreWidth = Math.round(m.score * 10);

  var comparisonBlock = '';
  if (type === 'above' && (bestPremium || bestValue)) {
    var compRows = [];
    if (bestPremium) {
      var pDiff = m.price - bestPremium.price;
      var sDiff = parseFloat((m.score - bestPremium.score).toFixed(1));
      var sCls  = sDiff > 0 ? 'comp-better' : sDiff < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">🏆 <strong>' + bestPremium.displayName + '</strong><em> · n°1 premium</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff + ' €</span><span class="comp-extra-score ' + sCls + '">' + (sDiff > 0 ? '+' : '') + sDiff + ' pt</span></span></div>');
    }
    if (bestValue) {
      var pDiff2 = m.price - bestValue.price;
      var sDiff2 = parseFloat((m.score - bestValue.score).toFixed(1));
      var sCls2  = sDiff2 > 0 ? 'comp-better' : sDiff2 < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">⭐ <strong>' + bestValue.displayName + '</strong><em> · n°1 rapport Q/P</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff2 + ' €</span><span class="comp-extra-score ' + sCls2 + '">' + (sDiff2 > 0 ? '+' : '') + sDiff2 + ' pt</span></span></div>');
    }
    comparisonBlock = '<div class="card-comparison"><div class="comp-header">Comparé aux meilleures options dans votre budget :</div>' + compRows.join('') + '</div>';
  }

  var promoTag = m.hasPromotion ? '<span class="card-promo-tag">' + m.promotionLabel + '</span>' : '';
  var cutleryLabel = m.cutleryStorage === 'drawer' ? '🍴 Tiroir à couverts' : '🍴 Panier à couverts';
  var installLabel = m.installationType === 'built-in' ? '🔧 Encastrable' : '🔧 Pose libre';

  var links = Object.entries(m.affiliateLinks || {})
    .filter(function (e) { return e[1]; })
    .slice(0, 5)
    .map(function (e) { return '<a href="' + e[1] + '" target="_blank" rel="noopener" class="retailer-link">' + e[0].charAt(0).toUpperCase() + e[0].slice(1) + '</a>'; })
    .join('');

  return (
    '<div class="tv-card' + (isTop1 ? ' tv-card--top1' : '') + '">' +
      '<div class="card-header">' +
        '<span class="card-rank">' + medal + '</span>' +
        '<div class="card-title-block">' +
          '<h3 class="card-title">' + m.displayName + '</h3>' +
          '<div class="card-badges">' +
            '<span class="card-badge">' + installLabel + '</span>' +
            '<span class="card-badge">' + cutleryLabel + '</span>' +
            '<span class="card-badge">🍽️ ' + m.placeSettings + ' couverts</span>' +
            '<span class="card-badge">⚡ Classe ' + m.energyLabel + '</span>' +
            '<span class="card-badge">🔇 ' + m.noiseLevel_db + ' dB</span>' +
          '</div>' +
        '</div>' +
        '<div class="card-price-block">' +
          promoTag +
          '<span class="card-price">' + m.price.toLocaleString('fr-FR') + ' €</span>' +
          (m.originalPrice ? '<span class="card-original-price">' + m.originalPrice.toLocaleString('fr-FR') + ' €</span>' : '') +
        '</div>' +
      '</div>' +
      comparisonBlock +
      '<div class="card-score-block">' +
        '<div class="card-score-label"><span>Score global</span><strong>' + m.score + '/10 · ' + scoreToLabel(m.score) + '</strong></div>' +
        '<div class="card-score-track"><div class="card-score-fill" data-width="' + scoreWidth + '%" style="width:0%"></div></div>' +
      '</div>' +
      '<div class="card-specs">' +
        '<div class="spec-item"><span class="spec-label">Eau</span><span class="spec-value">' + m.waterConsumption_liters + ' L/cycle</span></div>' +
        '<div class="spec-item"><span class="spec-label">Programmes</span><span class="spec-value">' + m.programs + '</span></div>' +
        '<div class="spec-item"><span class="spec-label">Départ diff.</span><span class="spec-value">' + (m.delayStart_hours ? m.delayStart_hours + 'h' : 'Non') + '</span></div>' +
        '<div class="spec-item"><span class="spec-label">Réparabilité</span><span class="spec-value">' + m.repairabilityScore + '/10</span></div>' +
        '<div class="spec-item"><span class="spec-label">Connecté</span><span class="spec-value">' + (m.connected ? 'Oui' : 'Non') + '</span></div>' +
        '<div class="spec-item"><span class="spec-label">Garantie</span><span class="spec-value">' + m.warrantyYears + ' ans</span></div>' +
      '</div>' +
      (links ? '<div class="card-retailers"><span class="retailers-label">Où acheter :</span><div class="retailers-links">' + links + '</div></div>' : '') +
    '</div>'
  );
}

// ============================================================
// MACHINE À CAFÉ — Range, affichage, comparaison, rendu
// ============================================================

function onCfRangeChange(which) {
  var minVal = parseInt(document.getElementById('cfPriceMin').value);
  var maxVal = parseInt(document.getElementById('cfPriceMax').value);
  if (which === 'min' && minVal > maxVal) { minVal = maxVal; document.getElementById('cfPriceMin').value = minVal; }
  if (which === 'max' && maxVal < minVal) { maxVal = minVal; document.getElementById('cfPriceMax').value = maxVal; }
  AppState.coffeeFilters.priceMin = minVal;
  AppState.coffeeFilters.priceMax = maxVal;
  AppState.coffeeFilters.noLimit  = maxVal >= 4000;
  updateCfPriceDisplay();
  updateCfRangeTrack();
  document.querySelectorAll('.cf-quick-btn').forEach(function (b) { b.classList.remove('active'); });
}

function updateCfRangeTrack() {
  var minInput = document.getElementById('cfPriceMin');
  var maxInput = document.getElementById('cfPriceMax');
  var track    = document.getElementById('cfRangeTrackFill');
  if (!track) return;
  var leftPct  = ((parseInt(minInput.value)) / 4000) * 100;
  var rightPct = ((parseInt(maxInput.value)) / 4000) * 100;
  track.style.left  = leftPct + '%';
  track.style.width = (rightPct - leftPct) + '%';
}

function updateCfPriceDisplay() {
  var min = AppState.coffeeFilters.priceMin;
  var max = AppState.coffeeFilters.priceMax;
  var minEl = document.getElementById('cfPriceMinDisplay');
  var maxEl = document.getElementById('cfPriceMaxDisplay');
  if (minEl) minEl.textContent = min.toLocaleString('fr-FR') + ' €';
  if (maxEl) maxEl.textContent = max >= 4000 ? '4 000 € +' : max.toLocaleString('fr-FR') + ' €';
}

function onCompareCoffee() {
  AppState.coffeeFilters.priceMin = parseInt(document.getElementById('cfPriceMin').value) || 0;
  AppState.coffeeFilters.priceMax = parseInt(document.getElementById('cfPriceMax').value) || 800;
  AppState.coffeeFilters.noLimit  = AppState.coffeeFilters.priceMax >= 4000;

  showLoading(true);
  hideResults();

  setTimeout(function () {
    var results = runCoffeeComparison(COFFEE_DATABASE, AppState.coffeeFilters);
    AppState.results = results;
    showLoading(false);
    renderCoffeeResults(results);
  }, 100);
}

function renderCoffeeResults(results) {
  if (results.totalFound === 0) {
    var noRes = document.getElementById('noResultsMsg');
    var txt   = document.getElementById('noResultsText');
    if (txt) txt.textContent = 'Aucune machine à café trouvée';
    noRes.style.display = 'block';
    return;
  }
  updateSectionTitles();
  renderTopSectionCoffee('listPremium', results.premium, 'sectionPremium', 'premium');
  renderTopSectionCoffee('listValue',   results.value,   'sectionValue',   'value');
  if (!AppState.coffeeFilters.noLimit) {
    var bestP = results.premium && results.premium[0] ? results.premium[0] : null;
    var bestV = results.value   && results.value[0]   ? results.value[0]   : null;
    renderTopSectionCoffee('listAbove', results.aboveBudget, 'sectionAbove', 'above', bestP, bestV);
  }
  document.getElementById('resultsWrapper').scrollIntoView({ behavior: 'smooth' });
  requestAnimationFrame(function () { setTimeout(equalizeCardHeights, 50); });
}

function renderTopSectionCoffee(listId, items, sectionId, type, bestPremium, bestValue) {
  var section = document.getElementById(sectionId);
  var list    = document.getElementById(listId);
  if (!items || items.length === 0) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  list.innerHTML = items.map(function (m, i) { return buildCoffeeCard(m, i + 1, type, bestPremium, bestValue); }).join('');
  requestAnimationFrame(function () {
    list.querySelectorAll('.card-score-fill').forEach(function (el) { el.style.width = el.dataset.width; });
  });
}

function buildCoffeeCard(m, rank, type, bestPremium, bestValue) {
  var medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
  var medal  = medals[rank] || '#' + rank;
  var isTop1 = rank === 1;
  var scoreWidth = Math.round(m.score * 10);

  var comparisonBlock = '';
  if (type === 'above' && (bestPremium || bestValue)) {
    var compRows = [];
    if (bestPremium) {
      var pDiff = m.price - bestPremium.price;
      var sDiff = parseFloat((m.score - bestPremium.score).toFixed(1));
      var sCls  = sDiff > 0 ? 'comp-better' : sDiff < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">🏆 <strong>' + bestPremium.displayName + '</strong><em> · n°1 premium</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff + ' €</span><span class="comp-extra-score ' + sCls + '">' + (sDiff > 0 ? '+' : '') + sDiff + ' pt</span></span></div>');
    }
    if (bestValue) {
      var pDiff2 = m.price - bestValue.price;
      var sDiff2 = parseFloat((m.score - bestValue.score).toFixed(1));
      var sCls2  = sDiff2 > 0 ? 'comp-better' : sDiff2 < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">⭐ <strong>' + bestValue.displayName + '</strong><em> · n°1 rapport Q/P</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff2 + ' €</span><span class="comp-extra-score ' + sCls2 + '">' + (sDiff2 > 0 ? '+' : '') + sDiff2 + ' pt</span></span></div>');
    }
    comparisonBlock = '<div class="card-comparison"><div class="comp-header">Comparé aux meilleures options dans votre budget :</div>' + compRows.join('') + '</div>';
  }

  var promoTag   = m.hasPromotion ? '<span class="card-promo-tag">' + m.promotionLabel + '</span>' : '';
  var beanLabel  = m.beanType === 'grains' ? '☕ À grains' : '💊 À capsules';
  var milkLabel  = m.milkSystemType === 'automatic' ? '🥛 Lait automatique' : m.milkSystemType === 'manual' ? '🥛 Lait manuel' : '🚫 Sans lait';
  var installLabel = m.installationType === 'built-in' ? '🔧 Encastrable' : '🔧 Pose libre';

  var links = Object.entries(m.affiliateLinks || {})
    .filter(function (e) { return e[1]; })
    .slice(0, 5)
    .map(function (e) { return '<a href="' + e[1] + '" target="_blank" rel="noopener" class="retailer-link">' + e[0].charAt(0).toUpperCase() + e[0].slice(1) + '</a>'; })
    .join('');

  return (
    '<div class="tv-card' + (isTop1 ? ' tv-card--top1' : '') + '">' +
      '<div class="card-header">' +
        '<span class="card-rank">' + medal + '</span>' +
        '<div class="card-title-block">' +
          '<h3 class="card-title">' + m.displayName + '</h3>' +
          '<div class="card-badges">' +
            '<span class="card-badge">' + beanLabel + '</span>' +
            '<span class="card-badge">' + milkLabel + '</span>' +
            '<span class="card-badge">' + installLabel + '</span>' +
            '<span class="card-badge">💧 ' + m.waterTank_ml + ' ml</span>' +
          '</div>' +
        '</div>' +
        '<div class="card-price-block">' +
          promoTag +
          '<span class="card-price">' + m.price.toLocaleString('fr-FR') + ' €</span>' +
          (m.originalPrice ? '<span class="card-original-price">' + m.originalPrice.toLocaleString('fr-FR') + ' €</span>' : '') +
        '</div>' +
      '</div>' +
      comparisonBlock +
      '<div class="card-score-block">' +
        '<div class="card-score-label"><span>Score global</span><strong>' + m.score + '/10 · ' + scoreToLabel(m.score) + '</strong></div>' +
        '<div class="card-score-track"><div class="card-score-fill" data-width="' + scoreWidth + '%" style="width:0%"></div></div>' +
      '</div>' +
      '<div class="card-specs">' +
        '<div class="spec-item"><span class="spec-label">Pression</span><span class="spec-value">' + m.pressure_bar + ' bars</span></div>' +
        '<div class="spec-item"><span class="spec-label">Programmes</span><span class="spec-value">' + m.programs + '</span></div>' +
        (m.beanContainer_g ? '<div class="spec-item"><span class="spec-label">Réservoir grains</span><span class="spec-value">' + m.beanContainer_g + ' g</span></div>' : '') +
        '<div class="spec-item"><span class="spec-label">Connecté</span><span class="spec-value">' + (m.connected ? 'Oui' : 'Non') + '</span></div>' +
        '<div class="spec-item"><span class="spec-label">Réparabilité</span><span class="spec-value">' + m.repairabilityScore + '/10</span></div>' +
        '<div class="spec-item"><span class="spec-label">Garantie</span><span class="spec-value">' + m.warrantyYears + ' ans</span></div>' +
      '</div>' +
      (links ? '<div class="card-retailers"><span class="retailers-label">Où acheter :</span><div class="retailers-links">' + links + '</div></div>' : '') +
    '</div>'
  );
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
  level2.style.display = 'flex';

  // Bind click sur chaque bouton produit
  level2.querySelectorAll('.category-btn').forEach(function (b) {
    b.addEventListener('click', function () { onProductClick(this); });
  });

  // Réinitialiser les panels et résultats
  hideResults();
  var noRes = document.getElementById('noResultsMsg');
  if (noRes) noRes.style.display = 'none';
  ['filtersTv','filtersWashing','filtersDishwasher','filtersCoffee','filtersVacuum','filtersIron'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
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

  var isTv          = product === 'tv';
  var isWashing     = product === 'washing';
  var isDishwasher  = product === 'dishwasher';
  var isCoffee      = product === 'coffee';
  var isVacuum      = product === 'vacuum';
  var isIron        = product === 'iron';
  document.getElementById('filtersTv').style.display          = isTv         ? '' : 'none';
  document.getElementById('filtersWashing').style.display     = isWashing    ? '' : 'none';
  document.getElementById('filtersDishwasher').style.display  = isDishwasher ? '' : 'none';
  document.getElementById('filtersCoffee').style.display      = isCoffee     ? '' : 'none';
  document.getElementById('filtersVacuum').style.display      = isVacuum     ? '' : 'none';
  document.getElementById('filtersIron').style.display        = isIron       ? '' : 'none';

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

// ------------------------------------------------------------
// Ouvre directement une catégorie depuis les accès rapides
// ------------------------------------------------------------
function openCategory(familyKey, productKey) {
  var btn1 = document.querySelector('.cat1-btn[data-cat="' + familyKey + '"]');
  if (btn1) {
    onFamilyClick(btn1);
    document.querySelectorAll('.cat1-btn').forEach(function (b) { b.classList.remove('active'); });
    btn1.classList.add('active');
  }
  setTimeout(function () {
    var btn2 = document.querySelector('#catLevel2 .category-btn[data-category="' + productKey + '"]');
    if (btn2 && btn2.dataset.soon !== 'true') {
      onProductClick(btn2);
      document.querySelectorAll('#catLevel2 .category-btn').forEach(function (b) { b.classList.remove('active'); });
      btn2.classList.add('active');
    }
  }, 50);
}

// ============================================================
// AUTH SYSTEM (localStorage — pas de backend)
// ============================================================

var AUTH = {
  // Génère un code à 6 chiffres
  generateCode: function () {
    return String(Math.floor(100000 + Math.random() * 900000));
  },

  // Retourne l'utilisateur actuellement connecté ou null
  currentUser: function () {
    try { return JSON.parse(localStorage.getItem('cm_session')); } catch (e) { return null; }
  },

  // Retourne tous les comptes enregistrés
  allUsers: function () {
    try { return JSON.parse(localStorage.getItem('cm_users')) || {}; } catch (e) { return {}; }
  },

  saveUsers: function (users) {
    localStorage.setItem('cm_users', JSON.stringify(users));
  },

  // Crée un compte (non vérifié)
  register: function (name, email, password) {
    var users = this.allUsers();
    if (users[email]) return { error: 'Un compte existe déjà avec cette adresse.' };
    var code = this.generateCode();
    users[email] = { name: name, email: email, password: password, verified: false, verifyCode: code, favorites: [], history: [] };
    this.saveUsers(users);
    return { ok: true, code: code };
  },

  // Vérifie le code e-mail
  verify: function (email, code) {
    var users = this.allUsers();
    var u = users[email];
    if (!u) return { error: 'Compte introuvable.' };
    if (u.verifyCode !== code.trim()) return { error: 'Code incorrect. Réessayez.' };
    u.verified = true;
    u.verifyCode = null;
    users[email] = u;
    this.saveUsers(users);
    // Créer la session
    var session = { name: u.name, email: u.email };
    localStorage.setItem('cm_session', JSON.stringify(session));
    return { ok: true, user: session };
  },

  // Connexion
  login: function (email, password) {
    var users = this.allUsers();
    var u = users[email];
    if (!u) return { error: 'Aucun compte trouvé avec cette adresse.' };
    if (u.password !== password) return { error: 'Mot de passe incorrect.' };
    if (!u.verified) return { error: 'Veuillez vérifier votre adresse e-mail avant de vous connecter.' };
    var session = { name: u.name, email: u.email };
    localStorage.setItem('cm_session', JSON.stringify(session));
    return { ok: true, user: session };
  },

  // Déconnexion
  logout: function () {
    localStorage.removeItem('cm_session');
  },

  // Renvoyer le code
  resend: function (email) {
    var users = this.allUsers();
    if (!users[email]) return null;
    var code = this.generateCode();
    users[email].verifyCode = code;
    this.saveUsers(users);
    return code;
  },

  // Sauvegarder une recherche
  saveSearch: function (query) {
    var session = this.currentUser();
    if (!session) return;
    var users = this.allUsers();
    var u = users[session.email];
    if (!u) return;
    u.history = u.history || [];
    // Eviter les doublons
    u.history = u.history.filter(function (h) { return JSON.stringify(h) !== JSON.stringify(query); });
    u.history.unshift(query);
    if (u.history.length > 20) u.history = u.history.slice(0, 20);
    users[session.email] = u;
    this.saveUsers(users);
    updateAccountBadges();
  },

  getHistory: function () {
    var session = this.currentUser();
    if (!session) return [];
    var users = this.allUsers();
    var u = users[session.email];
    return u ? (u.history || []) : [];
  },

  getFavorites: function () {
    var session = this.currentUser();
    if (!session) return [];
    var users = this.allUsers();
    var u = users[session.email];
    return u ? (u.favorites || []) : [];
  }
};

// ============================================================
// INITIALISATION AUTH & NAV
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
  renderNav();
  bindAuthEvents();
  bindContactEvents();

  // Boutons de pied de page
  var footerContact = document.getElementById('footerContactLink');
  if (footerContact) footerContact.addEventListener('click', function (e) { e.preventDefault(); openModal('modalContact'); });
  var footerLogin = document.getElementById('footerLoginLink');
  if (footerLogin) footerLogin.addEventListener('click', function (e) { e.preventDefault(); var u = AUTH.currentUser(); if (u) { toggleAccountDropdown(); } else { openModal('modalAuth'); } });
});

function renderNav() {
  var user = AUTH.currentUser();
  var authDiv = document.getElementById('navAuth');
  if (!authDiv) return;

  if (user) {
    authDiv.innerHTML =
      '<button class="nav-user-btn" id="navUserBtn">' +
        '<span class="nav-avatar">' + user.name.charAt(0).toUpperCase() + '</span>' +
        user.name +
      '</button>';
    document.getElementById('navUserBtn').addEventListener('click', toggleAccountDropdown);
    updateAccountBadges();
  } else {
    authDiv.innerHTML =
      '<button class="nav-btn-ghost" id="navLoginBtn">Se connecter</button>' +
      '<button class="nav-btn-primary" id="navSignupBtn">Créer un compte</button>';
    document.getElementById('navLoginBtn').addEventListener('click', function () { switchAuthTab('login'); openModal('modalAuth'); });
    document.getElementById('navSignupBtn').addEventListener('click', function () { switchAuthTab('signup'); openModal('modalAuth'); });
  }
}

function updateAccountBadges() {
  var fav = document.getElementById('favCount');
  var hist = document.getElementById('histCount');
  var avatar = document.getElementById('accountAvatar');
  var name = document.getElementById('accountName');
  var email = document.getElementById('accountEmail');
  var user = AUTH.currentUser();
  if (!user) return;
  if (fav)    fav.textContent    = AUTH.getFavorites().length;
  if (hist)   hist.textContent   = AUTH.getHistory().length;
  if (avatar) avatar.textContent = user.name.charAt(0).toUpperCase();
  if (name)   name.textContent   = user.name;
  if (email)  email.textContent  = user.email;
}

function toggleAccountDropdown() {
  var dd = document.getElementById('accountDropdown');
  if (!dd) return;
  var isVisible = dd.style.display === 'block';
  dd.style.display = isVisible ? 'none' : 'block';
  if (!isVisible) updateAccountBadges();
}

// Fermer le dropdown en cliquant ailleurs
document.addEventListener('click', function (e) {
  var dd = document.getElementById('accountDropdown');
  if (!dd || dd.style.display !== 'block') return;
  if (!dd.contains(e.target) && !e.target.closest('#navUserBtn')) {
    dd.style.display = 'none';
  }
});

// ============================================================
// BINDING ÉVÉNEMENTS AUTH
// ============================================================
var _pendingEmail = '';

function bindAuthEvents() {
  // Fermer modal
  document.getElementById('modalAuthClose').addEventListener('click', function () { closeModal('modalAuth'); });
  document.getElementById('modalAuth').addEventListener('click', function (e) { if (e.target === this) closeModal('modalAuth'); });

  // Tabs login / signup
  document.querySelectorAll('.auth-tab').forEach(function (tab) {
    tab.addEventListener('click', function () { switchAuthTab(this.dataset.tab); });
  });

  // Submit login
  document.getElementById('formLogin').addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('loginEmail').value.trim();
    var password = document.getElementById('loginPassword').value;
    var errEl = document.getElementById('loginError');
    errEl.textContent = '';
    if (!email || !password) { errEl.textContent = 'Veuillez remplir tous les champs.'; return; }
    var result = AUTH.login(email, password);
    if (result.error) { errEl.textContent = result.error; return; }
    showAuthSuccess('Connexion réussie ! Bienvenue ' + result.user.name + ' 👋', 'Vous êtes connecté. Vos favoris et recherches sont disponibles dans votre espace personnel.');
    renderNav();
  });

  // Submit signup
  document.getElementById('formSignup').addEventListener('submit', function (e) {
    e.preventDefault();
    var name     = document.getElementById('signupName').value.trim();
    var email    = document.getElementById('signupEmail').value.trim();
    var password = document.getElementById('signupPassword').value;
    var errEl    = document.getElementById('signupError');
    errEl.textContent = '';
    if (!name || !email || !password) { errEl.textContent = 'Veuillez remplir tous les champs.'; return; }
    if (password.length < 8) { errEl.textContent = 'Le mot de passe doit contenir au moins 8 caractères.'; return; }
    if (!/\S+@\S+\.\S+/.test(email)) { errEl.textContent = 'Adresse e-mail invalide.'; return; }
    var result = AUTH.register(name, email, password);
    if (result.error) { errEl.textContent = result.error; return; }
    _pendingEmail = email;
    showVerifyStep(email, result.code);
  });

  // Submit verify
  document.getElementById('formVerify').addEventListener('submit', function (e) {
    e.preventDefault();
    var code  = document.getElementById('verifyCode').value.trim();
    var errEl = document.getElementById('verifyError');
    errEl.textContent = '';
    if (!code) { errEl.textContent = 'Entrez le code reçu par e-mail.'; return; }
    var result = AUTH.verify(_pendingEmail, code);
    if (result.error) { errEl.textContent = result.error; return; }
    showAuthSuccess('Compte vérifié ! 🎉', 'Votre adresse e-mail a été confirmée. Bienvenue sur CompareMax !');
    renderNav();
  });

  // Renvoyer le code
  document.getElementById('resendCode').addEventListener('click', function () {
    var code = AUTH.resend(_pendingEmail);
    if (code) {
      document.getElementById('verifyCodeDemo').textContent = '📩 Nouveau code envoyé à ' + _pendingEmail + ' — Code : ' + code;
      document.getElementById('verifyError').textContent = '';
    }
  });

  // Succès → fermer
  document.getElementById('successClose').addEventListener('click', function () { closeModal('modalAuth'); });

  // Dropdown compte
  document.getElementById('btnLogout').addEventListener('click', function () {
    AUTH.logout();
    document.getElementById('accountDropdown').style.display = 'none';
    renderNav();
    showToast('Vous êtes déconnecté.');
  });

  document.getElementById('btnFavorites').addEventListener('click', function () {
    var favs = AUTH.getFavorites();
    document.getElementById('accountDropdown').style.display = 'none';
    showToast(favs.length === 0 ? 'Aucun favori sauvegardé.' : favs.length + ' favori(s) sauvegardé(s).');
  });

  document.getElementById('btnHistory').addEventListener('click', function () {
    var hist = AUTH.getHistory();
    document.getElementById('accountDropdown').style.display = 'none';
    showToast(hist.length === 0 ? 'Aucune recherche récente.' : hist.length + ' recherche(s) sauvegardée(s).');
  });
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(function (t) {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  document.getElementById('formLogin').style.display   = tab === 'login'  ? 'flex' : 'none';
  document.getElementById('formSignup').style.display  = tab === 'signup' ? 'flex' : 'none';
  document.getElementById('loginError').textContent  = '';
  document.getElementById('signupError').textContent = '';
}

function showVerifyStep(email, code) {
  document.getElementById('authStepChoice').style.display = 'none';
  document.getElementById('authStepVerify').style.display = '';
  document.getElementById('verifyEmailDisplay').textContent = email;
  // Afficher le code en démo (en prod, le code serait envoyé par e-mail)
  document.getElementById('verifyCodeDemo').textContent = '📩 [DÉMO] Code envoyé à ' + email + ' — Code : ' + code;
  document.getElementById('verifyError').textContent = '';
  document.getElementById('verifyCode').value = '';
}

function showAuthSuccess(title, sub) {
  document.getElementById('authStepChoice').style.display = 'none';
  document.getElementById('authStepVerify').style.display = 'none';
  document.getElementById('authStepSuccess').style.display = '';
  document.getElementById('successTitle').textContent = title;
  document.getElementById('successSub').textContent = sub;
}

// ============================================================
// BINDING ÉVÉNEMENTS CONTACT
// ============================================================
function bindContactEvents() {
  document.getElementById('modalContactClose').addEventListener('click', function () { closeModal('modalContact'); });
  document.getElementById('modalContact').addEventListener('click', function (e) { if (e.target === this) closeModal('modalContact'); });

  document.getElementById('formContact').addEventListener('submit', function (e) {
    e.preventDefault();
    var name    = document.getElementById('contactName').value.trim();
    var email   = document.getElementById('contactEmail').value.trim();
    var subject = document.getElementById('contactSubject').value;
    var message = document.getElementById('contactMessage').value.trim();
    var errEl   = document.getElementById('contactError');
    errEl.textContent = '';
    if (!name || !email || !subject || !message) { errEl.textContent = 'Veuillez remplir tous les champs.'; return; }
    if (!/\S+@\S+\.\S+/.test(email)) { errEl.textContent = 'Adresse e-mail invalide.'; return; }
    // Simuler l'envoi
    document.getElementById('formContact').style.display = 'none';
    document.getElementById('contactSuccess').style.display = 'block';
  });
}

// ============================================================
// HELPERS MODAUX
// ============================================================
function openModal(id) {
  var m = document.getElementById(id);
  if (!m) return;
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Réinitialiser l'auth modal
  if (id === 'modalAuth') {
    document.getElementById('authStepChoice').style.display = '';
    document.getElementById('authStepVerify').style.display = 'none';
    document.getElementById('authStepSuccess').style.display = 'none';
  }
  // Réinitialiser le contact modal
  if (id === 'modalContact') {
    document.getElementById('formContact').style.display = 'flex';
    document.getElementById('contactSuccess').style.display = 'none';
    document.getElementById('contactError').textContent = '';
  }
}

function closeModal(id) {
  var m = document.getElementById(id);
  if (!m) return;
  m.classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================================
// SAUVEGARDER LES RECHERCHES AUTOMATIQUEMENT
// ============================================================
// Hook sur le bouton comparer TV
var _origOnCompare = typeof onCompare === 'function' ? onCompare : null;
document.addEventListener('DOMContentLoaded', function () {
  var compareBtn = document.getElementById('compareBtn');
  if (compareBtn) {
    compareBtn.addEventListener('click', function () {
      var user = AUTH.currentUser();
      if (user) {
        AUTH.saveSearch({
          type: 'tv',
          priceMin: AppState.filters.priceMin,
          priceMax: AppState.filters.priceMax,
          sizeMin: AppState.filters.sizeMin,
          sizeMax: AppState.filters.sizeMax,
          date: new Date().toISOString()
        });
      }
    });
  }
  var compareWashingBtn = document.getElementById('compareWashingBtn');
  if (compareWashingBtn) {
    compareWashingBtn.addEventListener('click', function () {
      var user = AUTH.currentUser();
      if (user) {
        AUTH.saveSearch({
          type: 'washing',
          priceMin: AppState.washingFilters.priceMin,
          priceMax: AppState.washingFilters.priceMax,
          date: new Date().toISOString()
        });
      }
    });
  }
});

// ============================================================
// GESTION DES COOKIES
// ============================================================
var COOKIE_KEY = 'cm_cookie_consent';

function getCookieConsent() {
  try { return JSON.parse(localStorage.getItem(COOKIE_KEY)); } catch(e) { return null; }
}

function setCookieConsent(analytics) {
  var data = { analytics: analytics, date: new Date().toISOString() };
  localStorage.setItem(COOKIE_KEY, JSON.stringify(data));
  if (analytics) {
    activateAnalytics();
  }
}

function activateAnalytics() {
  // Activer Google Analytics si le consentement est donné
  // Remplace G-XXXXXXXXXX par ton vrai ID Google Analytics
  // window.dataLayer = window.dataLayer || [];
  // var script = document.createElement('script');
  // script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  // script.async = true;
  // document.head.appendChild(script);
  // function gtag(){ dataLayer.push(arguments); }
  // gtag('js', new Date());
  // gtag('config', 'G-XXXXXXXXXX');
  console.log('[CompareMax] Analytics activés.');
}

function initCookieBanner() {
  var consent = getCookieConsent();
  var banner = document.getElementById('cookieBanner');

  // Si consentement déjà donné, on n'affiche pas le bandeau
  if (consent !== null) {
    if (consent.analytics) activateAnalytics();
    return;
  }

  // Afficher le bandeau après 1 seconde
  if (banner) {
    setTimeout(function() { banner.style.display = 'flex'; }, 800);
  }

  var btnAccept  = document.getElementById('cookieAccept');
  var btnRefuse  = document.getElementById('cookieRefuse');
  if (btnAccept) btnAccept.addEventListener('click', function() {
    setCookieConsent(true);
    banner.style.display = 'none';
    showToast('Cookies acceptés. Merci !');
  });
  if (btnRefuse) btnRefuse.addEventListener('click', function() {
    setCookieConsent(false);
    banner.style.display = 'none';
    showToast('Cookies refusés. Seuls les cookies fonctionnels sont actifs.');
  });

  // Modal gestion cookies (depuis footer)
  var manageLink = document.getElementById('manageCookiesLink');
  if (manageLink) manageLink.addEventListener('click', function(e) {
    e.preventDefault();
    openCookieModal();
  });
}

function openCookieModal() {
  var consent = getCookieConsent();
  var toggle = document.getElementById('cookieAnalyticsToggle');
  if (toggle && consent) toggle.checked = !!consent.analytics;
  openModal('modalCookies');
}

document.addEventListener('DOMContentLoaded', function() {
  initCookieBanner();

  var modalClose = document.getElementById('modalCookiesClose');
  if (modalClose) modalClose.addEventListener('click', function() { closeModal('modalCookies'); });

  var prefAccept = document.getElementById('cookiePrefAccept');
  var prefRefuse = document.getElementById('cookiePrefRefuse');
  var toggle     = document.getElementById('cookieAnalyticsToggle');

  if (prefAccept) prefAccept.addEventListener('click', function() {
    var analytics = toggle ? toggle.checked : false;
    setCookieConsent(analytics);
    closeModal('modalCookies');
    // Masquer le bandeau s'il est encore visible
    var banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
    showToast(analytics ? 'Préférences enregistrées — cookies analytiques activés.' : 'Préférences enregistrées — cookies analytiques refusés.');
  });

  if (prefRefuse) prefRefuse.addEventListener('click', function() {
    if (toggle) toggle.checked = false;
    setCookieConsent(false);
    closeModal('modalCookies');
    var banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
    showToast('Tous les cookies optionnels ont été refusés.');
  });
});
