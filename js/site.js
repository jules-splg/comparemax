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
      { key: 'airfryer',   label: 'Airfryer',           emoji: '⚡', available: true  },
      { key: 'microwave',  label: 'Micro-ondes',        emoji: '♨️', available: false },
      { key: 'hob',        label: 'Plaques de cuisson', emoji: '🍳', available: true  },
    ]
  },
  maison: {
    label: 'Maison', emoji: '🏡',
    products: [
      { key: 'vacuum', label: 'Aspirateur',          emoji: '🌪️', available: true  },
      { key: 'robot',  label: 'Aspirateur robot',     emoji: '🤖', available: true  },
      { key: 'iron',   label: 'Repassage',            emoji: '👔', available: true  },
    ]
  },
  'tv-son': {
    label: 'TV & Son', emoji: '📺',
    products: [
      { key: 'tv',        label: 'Télévision',      emoji: '📺', available: true  },
      { key: 'speaker',   label: 'Enceinte',         emoji: '🔊', available: true  },
      { key: 'earphones', label: 'Écouteurs',        emoji: '🎧', available: true  },
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
    priceMin: 150,
    priceMax: 350,
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
  speakerFilters: {
    priceMin: 0,
    priceMax: 500,
    noLimit: false,
    speakerType: 'all',
    powerSource: 'all',
    stereoMode: false,
    minBattery: 0,
    waterproof: false
  },
  robotFilters: {
    priceMin: 0,
    priceMax: 700,
    noLimit: false,
    navigation: 'all',
    mopFunction: false,
    autoEmpty: false,
    mapping: false
  },
  earphonesFilters: {
    priceMin: 0,
    priceMax: 300,
    noLimit: false,
    earType: 'all',
    anc: false,
    multipoint: false,
    wirelessCharging: false
  },
  airfryerFilters: {
    priceMin: 0,
    priceMax: 130,
    noLimit: false,
    airType: 'all',
    minCapacity: 0,
    dual: false,
    dehydrate: false,
    rotisserie: false
  },
  hobFilters: {
    priceMin: 150,
    priceMax: 350,
    noLimit: false,
    hobType: 'all',
    minBurners: 0,
    hasTimer: false,
    hasIntegratedHood: false
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
  document.getElementById('wPriceMin').value = AppState.washingFilters.priceMin;
  document.getElementById('wPriceMax').value = AppState.washingFilters.priceMax;
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
  document.getElementById('dwPriceMin').value = AppState.dishwasherFilters.priceMin;
  document.getElementById('dwPriceMax').value = AppState.dishwasherFilters.priceMax;
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
  document.getElementById('cfPriceMin').value = AppState.coffeeFilters.priceMin;
  document.getElementById('cfPriceMax').value = AppState.coffeeFilters.priceMax;
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

  var vacMaxWeightEl = document.getElementById('vacMaxWeight');
  if (vacMaxWeightEl) vacMaxWeightEl.addEventListener('input', function () {
    AppState.vacuumFilters.maxWeight = parseFloat(this.value);
    var d = document.getElementById('vacWeightDisplay');
    if (d) d.textContent = this.value + ' kg maximum';
  });

  var vacMinAutonomyEl = document.getElementById('vacMinAutonomy');
  if (vacMinAutonomyEl) vacMinAutonomyEl.addEventListener('input', function () {
    AppState.vacuumFilters.minAutonomy = parseInt(this.value);
    var d = document.getElementById('vacAutonomyDisplay');
    if (d) d.textContent = this.value + ' min minimum';
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
  // Force slider to AppState on init (prevents browser form restore overriding defaults)
  document.getElementById('vacPriceMin').value = AppState.vacuumFilters.priceMin;
  document.getElementById('vacPriceMax').value = AppState.vacuumFilters.priceMax;
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
  document.getElementById('ironPriceMin').value = AppState.ironFilters.priceMin;
  document.getElementById('ironPriceMax').value = AppState.ironFilters.priceMax;
  updateIronRangeTrack(); updateIronPriceDisplay();

  // ---- Filtres enceinte ----
  document.getElementById('spkPriceMin').addEventListener('input', function () { onSpkRangeChange('min'); });
  document.getElementById('spkPriceMax').addEventListener('input', function () { onSpkRangeChange('max'); });

  document.querySelectorAll('.spk-quick-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var min = parseInt(this.dataset.min), max = parseInt(this.dataset.max);
      document.getElementById('spkPriceMin').value = min;
      document.getElementById('spkPriceMax').value = max;
      AppState.speakerFilters.priceMin = min;
      AppState.speakerFilters.priceMax = max;
      AppState.speakerFilters.noLimit  = max >= 4000;
      updateSpkPriceDisplay(); updateSpkRangeTrack();
      document.querySelectorAll('.spk-quick-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  document.querySelectorAll('#spkTypeGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#spkTypeGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.speakerFilters.speakerType = this.dataset.value;
      onSpkTypeChange(this.dataset.value);
    });
  });

  document.querySelectorAll('#spkPowerSourceGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#spkPowerSourceGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.speakerFilters.powerSource = this.dataset.value;
      onSpkPowerSourceChange(this.dataset.value);
    });
  });

  document.querySelectorAll('#spkStereoGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#spkStereoGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.speakerFilters.stereoMode = this.dataset.value === 'yes';
    });
  });

  document.querySelectorAll('#spkWaterproofGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#spkWaterproofGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.speakerFilters.waterproof = this.dataset.value === 'yes';
    });
  });

  document.getElementById('spkMinBattery').addEventListener('input', function () {
    AppState.speakerFilters.minBattery = parseInt(this.value);
    document.getElementById('spkBatteryDisplay').textContent = this.value + 'h minimum';
  });

  document.getElementById('compareSpeakerBtn').addEventListener('click', onCompareSpeaker);
  // Force slider to AppState on init
  document.getElementById('spkPriceMin').value = AppState.speakerFilters.priceMin;
  document.getElementById('spkPriceMax').value = AppState.speakerFilters.priceMax;
  updateSpkRangeTrack(); updateSpkPriceDisplay();
  onSpkTypeChange('all');

  // ---- Filtres aspirateur robot ----
  document.getElementById('robPriceMin').addEventListener('input', function () { onRobRangeChange('min'); });
  document.getElementById('robPriceMax').addEventListener('input', function () { onRobRangeChange('max'); });

  document.querySelectorAll('.rob-quick-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var min = parseInt(this.dataset.min), max = parseInt(this.dataset.max);
      document.getElementById('robPriceMin').value = min;
      document.getElementById('robPriceMax').value = max;
      AppState.robotFilters.priceMin = min;
      AppState.robotFilters.priceMax = max;
      AppState.robotFilters.noLimit  = max >= 2000;
      updateRobPriceDisplay(); updateRobRangeTrack();
      document.querySelectorAll('.rob-quick-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  document.querySelectorAll('#robNavGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#robNavGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.robotFilters.navigation = this.dataset.value;
    });
  });

  document.querySelectorAll('#robMopGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#robMopGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.robotFilters.mopFunction = this.dataset.value === 'yes';
    });
  });

  document.querySelectorAll('#robAutoEmptyGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#robAutoEmptyGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.robotFilters.autoEmpty = this.dataset.value === 'yes';
    });
  });

  document.querySelectorAll('#robMappingGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#robMappingGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.robotFilters.mapping = this.dataset.value === 'yes';
    });
  });

  document.getElementById('compareRobotBtn').addEventListener('click', onCompareRobot);
  // Force slider inputs to AppState values on init (prevents browser form restore overriding defaults)
  document.getElementById('robPriceMin').value = AppState.robotFilters.priceMin;
  document.getElementById('robPriceMax').value = AppState.robotFilters.priceMax;
  updateRobRangeTrack(); updateRobPriceDisplay();

  // ---- Filtres écouteurs ----
  document.getElementById('earPriceMin').addEventListener('input', function () { onEarRangeChange('min'); });
  document.getElementById('earPriceMax').addEventListener('input', function () { onEarRangeChange('max'); });

  document.querySelectorAll('.ear-quick-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var min = parseInt(this.dataset.min), max = parseInt(this.dataset.max);
      document.getElementById('earPriceMin').value = min;
      document.getElementById('earPriceMax').value = max;
      AppState.earphonesFilters.priceMin = min;
      AppState.earphonesFilters.priceMax = max;
      AppState.earphonesFilters.noLimit  = max >= 800;
      updateEarPriceDisplay(); updateEarRangeTrack();
      document.querySelectorAll('.ear-quick-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  document.querySelectorAll('#earTypeGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#earTypeGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.earphonesFilters.earType = this.dataset.value;
    });
  });

  document.querySelectorAll('#earAncGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#earAncGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.earphonesFilters.anc = this.dataset.value === 'yes';
    });
  });

  document.querySelectorAll('#earMultipointGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#earMultipointGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.earphonesFilters.multipoint = this.dataset.value === 'yes';
    });
  });

  document.querySelectorAll('#earWirelessChargingGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#earWirelessChargingGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.earphonesFilters.wirelessCharging = this.dataset.value === 'yes';
    });
  });

  document.getElementById('compareEarphonesBtn').addEventListener('click', onCompareEarphones);
  // Force slider inputs to AppState values on init (prevents browser form restore overriding defaults)
  document.getElementById('earPriceMin').value = AppState.earphonesFilters.priceMin;
  document.getElementById('earPriceMax').value = AppState.earphonesFilters.priceMax;
  updateEarRangeTrack(); updateEarPriceDisplay();

  // ---- Filtres airfryer ----
  document.getElementById('afrPriceMin').addEventListener('input', function () { onAfrRangeChange('min'); });
  document.getElementById('afrPriceMax').addEventListener('input', function () { onAfrRangeChange('max'); });

  document.querySelectorAll('.afr-quick-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var min = parseInt(this.dataset.min), max = parseInt(this.dataset.max);
      document.getElementById('afrPriceMin').value = min;
      document.getElementById('afrPriceMax').value = max;
      AppState.airfryerFilters.priceMin = min;
      AppState.airfryerFilters.priceMax = max;
      AppState.airfryerFilters.noLimit  = max >= 500;
      updateAfrPriceDisplay(); updateAfrRangeTrack();
      document.querySelectorAll('.afr-quick-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  document.querySelectorAll('#afrTypeGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#afrTypeGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.airfryerFilters.airType = this.dataset.value;
    });
  });

  document.getElementById('afrMinCapacity').addEventListener('input', function () {
    AppState.airfryerFilters.minCapacity = parseFloat(this.value);
    document.getElementById('afrCapacityDisplay').textContent = this.value + ' L minimum';
  });

  document.querySelectorAll('#afrDualGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#afrDualGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.airfryerFilters.dual = this.dataset.value === 'yes';
    });
  });

  document.querySelectorAll('#afrDehydrateGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#afrDehydrateGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.airfryerFilters.dehydrate = this.dataset.value === 'yes';
    });
  });

  document.querySelectorAll('#afrRotisserieGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#afrRotisserieGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.airfryerFilters.rotisserie = this.dataset.value === 'yes';
    });
  });

  document.getElementById('compareAirfryerBtn').addEventListener('click', onCompareAirfryer);
  updateAfrRangeTrack(); updateAfrPriceDisplay();

  // ---- Filtres plaques de cuisson ----
  document.getElementById('hobPriceMin').addEventListener('input', function () { onHobRangeChange('min'); });
  document.getElementById('hobPriceMax').addEventListener('input', function () { onHobRangeChange('max'); });

  document.querySelectorAll('.hob-quick-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var min = parseInt(this.dataset.min), max = parseInt(this.dataset.max);
      document.getElementById('hobPriceMin').value = min;
      document.getElementById('hobPriceMax').value = max;
      AppState.hobFilters.priceMin = min;
      AppState.hobFilters.priceMax = max;
      AppState.hobFilters.noLimit  = max >= 2000;
      updateHobPriceDisplay(); updateHobRangeTrack();
      document.querySelectorAll('.hob-quick-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  document.querySelectorAll('#hobTypeGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#hobTypeGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.hobFilters.hobType = this.dataset.value;
    });
  });

  document.querySelectorAll('#hobBurnersGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#hobBurnersGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.hobFilters.minBurners = parseInt(this.dataset.value) || 0;
    });
  });

  document.querySelectorAll('#hobTimerGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#hobTimerGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.hobFilters.hasTimer = this.dataset.value === 'yes';
    });
  });

  document.querySelectorAll('#hobHoodGroup .toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#hobHoodGroup .toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      AppState.hobFilters.hasIntegratedHood = this.dataset.value === 'yes';
    });
  });

  document.getElementById('compareHobBtn').addEventListener('click', onCompareHob);
  document.getElementById('hobPriceMin').value = AppState.hobFilters.priceMin;
  document.getElementById('hobPriceMax').value = AppState.hobFilters.priceMax;
  updateHobRangeTrack(); updateHobPriceDisplay();
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

  // Meilleur prix revendeur (calculé avant le bloc prix pour l'afficher)
  const bestRetailer = findBestRetailer(tv);
  const displayPrice = bestRetailer ? bestRetailer.price : tv.price;
  const showStrike   = bestRetailer && bestRetailer.price < tv.price;

  // Prix
  const priceBlock = `
    <div class="card-price-block">
      ${(tv.hasPromotion && tv.originalPrice)
        ? `<span class="card-price-original">${tv.originalPrice} €</span>`
        : showStrike
          ? `<span class="card-price-original">${tv.price} €</span>`
          : ''}
      <span class="card-price-main">${displayPrice} <span class="card-price-suffix">€</span></span>
      ${tv.hasPromotion && tv.promotionEndDate
        ? `<span class="card-promo-end">🏷️ ${tv.promotionLabel} — jusqu'au ${formatDate(tv.promotionEndDate)}</span>`
        : tv.hasPromotion
          ? `<span class="card-promo-end">🏷️ ${tv.promotionLabel}</span>`
          : showStrike
            ? `<span class="card-promo-end">💰 Prix constaté chez ${bestRetailer.name}</span>`
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

  // CTA revendeur
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
  var isSpeaker     = product === 'speaker';
  var isRobot       = product === 'robot';
  var isEarphones   = product === 'earphones';
  var isAirfryer    = product === 'airfryer';
  var isHob         = product === 'hob';
  document.getElementById('filtersTv').style.display          = isTv         ? '' : 'none';
  document.getElementById('filtersWashing').style.display     = isWashing    ? '' : 'none';
  document.getElementById('filtersDishwasher').style.display  = isDishwasher ? '' : 'none';
  document.getElementById('filtersCoffee').style.display      = isCoffee     ? '' : 'none';
  document.getElementById('filtersVacuum').style.display      = isVacuum     ? '' : 'none';
  document.getElementById('filtersIron').style.display        = isIron       ? '' : 'none';
  document.getElementById('filtersSpeaker').style.display     = isSpeaker    ? '' : 'none';
  document.getElementById('filtersRobot').style.display       = isRobot      ? '' : 'none';
  document.getElementById('filtersEarphones').style.display   = isEarphones  ? '' : 'none';
  document.getElementById('filtersAirfryer').style.display    = isAirfryer   ? '' : 'none';
  document.getElementById('filtersHob').style.display         = isHob        ? '' : 'none';

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

// ------------------------------------------------------------
// Réinitialise les filtres de la catégorie courante et relance
// ------------------------------------------------------------
function resetFilters() {
  var cat = AppState.currentCategory;

  if (cat === 'tv') {
    AppState.filters.priceMin = 0;
    AppState.filters.priceMax = 1500;
    AppState.filters.noLimit  = false;
    AppState.filters.sizeMin  = 43;
    AppState.filters.sizeMax  = 65;
    var minEl = document.getElementById('priceMin');
    var maxEl = document.getElementById('priceMax');
    if (minEl) minEl.value = 0;
    if (maxEl) maxEl.value = 1500;
    onCompare();

  } else if (cat === 'washing') {
    AppState.washingFilters.priceMin = 0;
    AppState.washingFilters.priceMax = 800;
    AppState.washingFilters.noLimit  = false;
    onCompareWashing();

  } else if (cat === 'dishwasher') {
    AppState.dishwasherFilters.priceMin = 0;
    AppState.dishwasherFilters.priceMax = 800;
    AppState.dishwasherFilters.noLimit  = false;
    onCompareDishwasher();

  } else if (cat === 'coffee') {
    AppState.coffeeFilters.priceMin = 0;
    AppState.coffeeFilters.priceMax = 800;
    AppState.coffeeFilters.noLimit  = false;
    onCompareCoffee();

  } else if (cat === 'vacuum') {
    AppState.vacuumFilters.priceMin = 150;
    AppState.vacuumFilters.priceMax = 350;
    AppState.vacuumFilters.noLimit  = false;
    document.getElementById('vacPriceMin').value = 150;
    document.getElementById('vacPriceMax').value = 350;
    updateVacPriceDisplay(); updateVacRangeTrack();
    document.querySelectorAll('.vac-quick-btn').forEach(function (b) { b.classList.remove('active'); });
    var vacDef = document.querySelector('.vac-quick-btn[data-min="150"][data-max="350"]');
    if (vacDef) vacDef.classList.add('active');
    onCompareVacuum();

  } else if (cat === 'iron') {
    AppState.ironFilters.priceMin = 0;
    AppState.ironFilters.priceMax = 200;
    AppState.ironFilters.noLimit  = false;
    onCompareIron();
  } else if (cat === 'speaker') {
    AppState.speakerFilters.priceMin = 0;
    AppState.speakerFilters.priceMax = 500;
    AppState.speakerFilters.noLimit  = false;
    document.getElementById('spkPriceMin').value = 100;
    document.getElementById('spkPriceMax').value = 300;
    updateSpkPriceDisplay(); updateSpkRangeTrack();
    document.querySelectorAll('.spk-quick-btn').forEach(function (b) { b.classList.remove('active'); });
    var spkDef = document.querySelector('.spk-quick-btn[data-min="100"][data-max="300"]');
    if (spkDef) spkDef.classList.add('active');
    onCompareSpeaker();
  } else if (cat === 'robot') {
    AppState.robotFilters.priceMin = 200;
    AppState.robotFilters.priceMax = 500;
    AppState.robotFilters.noLimit  = false;
    document.getElementById('robPriceMin').value = 200;
    document.getElementById('robPriceMax').value = 500;
    updateRobPriceDisplay(); updateRobRangeTrack();
    document.querySelectorAll('.rob-quick-btn').forEach(function (b) { b.classList.remove('active'); });
    var robDef = document.querySelector('.rob-quick-btn[data-min="200"][data-max="500"]');
    if (robDef) robDef.classList.add('active');
    onCompareRobot();
  } else if (cat === 'earphones') {
    AppState.earphonesFilters.priceMin = 80;
    AppState.earphonesFilters.priceMax = 200;
    AppState.earphonesFilters.noLimit  = false;
    document.getElementById('earPriceMin').value = 80;
    document.getElementById('earPriceMax').value = 200;
    updateEarPriceDisplay(); updateEarRangeTrack();
    document.querySelectorAll('.ear-quick-btn').forEach(function (b) { b.classList.remove('active'); });
    var earDef = document.querySelector('.ear-quick-btn[data-min="80"][data-max="200"]');
    if (earDef) earDef.classList.add('active');
    onCompareEarphones();
  } else if (cat === 'airfryer') {
    AppState.airfryerFilters.priceMin = 0;
    AppState.airfryerFilters.priceMax = 130;
    AppState.airfryerFilters.noLimit  = false;
    onCompareAirfryer();
  } else if (cat === 'hob') {
    AppState.hobFilters.priceMin = 150;
    AppState.hobFilters.priceMax = 350;
    AppState.hobFilters.noLimit  = false;
    document.getElementById('hobPriceMin').value = 150;
    document.getElementById('hobPriceMax').value = 350;
    updateHobPriceDisplay(); updateHobRangeTrack();
    document.querySelectorAll('.hob-quick-btn').forEach(function (b) { b.classList.remove('active'); });
    var hobDef = document.querySelector('.hob-quick-btn[data-min="150"][data-max="350"]');
    if (hobDef) hobDef.classList.add('active');
    onCompareHob();
  }

  document.getElementById('noResultsMsg').style.display = 'none';
  document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
}

// ============================================================
// ENCEINTE — Range, affichage, type, comparaison, rendu
// ============================================================

function onSpkRangeChange(which) {
  var minVal = parseInt(document.getElementById('spkPriceMin').value);
  var maxVal = parseInt(document.getElementById('spkPriceMax').value);
  if (which === 'min' && minVal > maxVal) { minVal = maxVal; document.getElementById('spkPriceMin').value = minVal; }
  if (which === 'max' && maxVal < minVal) { maxVal = minVal; document.getElementById('spkPriceMax').value = maxVal; }
  AppState.speakerFilters.priceMin = minVal;
  AppState.speakerFilters.priceMax = maxVal;
  AppState.speakerFilters.noLimit  = maxVal >= 4000;
  updateSpkPriceDisplay();
  updateSpkRangeTrack();
  document.querySelectorAll('.spk-quick-btn').forEach(function (b) { b.classList.remove('active'); });
}

function updateSpkRangeTrack() {
  var track = document.getElementById('spkRangeTrackFill');
  if (!track) return;
  var leftPct  = (AppState.speakerFilters.priceMin / 2000) * 100;
  var rightPct = (Math.min(AppState.speakerFilters.priceMax, 2000) / 2000) * 100;
  track.style.left  = leftPct + '%';
  track.style.width = (rightPct - leftPct) + '%';
}

function updateSpkPriceDisplay() {
  var min = AppState.speakerFilters.priceMin;
  var max = AppState.speakerFilters.priceMax;
  var minEl = document.getElementById('spkPriceMinDisplay');
  var maxEl = document.getElementById('spkPriceMaxDisplay');
  if (minEl) minEl.textContent = min.toLocaleString('fr-FR') + ' €';
  if (maxEl) maxEl.textContent = max >= 2000 ? '2 000 € +' : max.toLocaleString('fr-FR') + ' €';
}

function onSpkTypeChange(type) {
  var btOptions = document.getElementById('spkBtOptions');
  if (btOptions) btOptions.style.display = (type === 'bluetooth' || type === 'all') ? '' : 'none';
}

function onSpkPowerSourceChange(src) {
  var batteryRow = document.getElementById('spkBatteryRow');
  if (batteryRow) batteryRow.style.display = (src === 'battery') ? '' : 'none';
}

function onCompareSpeaker() {
  showLoading(true);
  hideResults();
  setTimeout(function () {
    var results = runSpeakerComparison(SPEAKER_DATABASE, AppState.speakerFilters);
    AppState.results = results;
    showLoading(false);
    renderSpeakerResults(results);
  }, 100);
}

function renderSpeakerResults(results) {
  if (results.totalFound === 0) {
    var noRes = document.getElementById('noResultsMsg');
    var txt   = document.getElementById('noResultsText');
    if (txt) txt.textContent = 'Aucune enceinte trouvée avec ces critères';
    noRes.style.display = 'block';
    return;
  }
  updateSectionTitles();
  renderTopSectionSpeaker('listPremium', results.premium, 'sectionPremium', 'premium');
  renderTopSectionSpeaker('listValue',   results.value,   'sectionValue',   'value');
  if (!AppState.speakerFilters.noLimit) {
    var bestP = results.premium && results.premium[0] ? results.premium[0] : null;
    var bestV = results.value   && results.value[0]   ? results.value[0]   : null;
    renderTopSectionSpeaker('listAbove', results.aboveBudget, 'sectionAbove', 'above', bestP, bestV);
  }
  document.getElementById('resultsWrapper').scrollIntoView({ behavior: 'smooth' });
  requestAnimationFrame(function () { setTimeout(equalizeCardHeights, 50); });
}

function renderTopSectionSpeaker(listId, items, sectionId, type, bestPremium, bestValue) {
  var section = document.getElementById(sectionId);
  var list    = document.getElementById(listId);
  if (!items || items.length === 0) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  list.innerHTML = items.map(function (s, i) { return buildSpeakerCard(s, i + 1, type, bestPremium, bestValue); }).join('');
  requestAnimationFrame(function () {
    list.querySelectorAll('.card-score-fill').forEach(function (el) { el.style.width = el.dataset.width; });
  });
}

function buildSpeakerCard(s, rank, type, bestPremium, bestValue) {
  var medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
  var medal  = medals[rank] || '#' + rank;
  var isTop1 = rank === 1;
  var scoreWidth = Math.round(s.score * 10);

  var comparisonBlock = '';
  if (type === 'above' && (bestPremium || bestValue)) {
    var compRows = [];
    if (bestPremium) {
      var pDiff = s.price - bestPremium.price;
      var sDiff = parseFloat((s.score - bestPremium.score).toFixed(1));
      var sCls  = sDiff > 0 ? 'comp-better' : sDiff < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">🏆 <strong>' + bestPremium.displayName + '</strong><em> · n°1 premium</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff + ' €</span><span class="comp-extra-score ' + sCls + '">' + (sDiff > 0 ? '+' : '') + sDiff + ' pt</span></span></div>');
    }
    if (bestValue) {
      var pDiff2 = s.price - bestValue.price;
      var sDiff2 = parseFloat((s.score - bestValue.score).toFixed(1));
      var sCls2  = sDiff2 > 0 ? 'comp-better' : sDiff2 < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">⭐ <strong>' + bestValue.displayName + '</strong><em> · n°1 rapport Q/P</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff2 + ' €</span><span class="comp-extra-score ' + sCls2 + '">' + (sDiff2 > 0 ? '+' : '') + sDiff2 + ' pt</span></span></div>');
    }
    comparisonBlock = '<div class="card-comparison"><div class="comp-header">Comparé aux meilleures options dans votre budget :</div>' + compRows.join('') + '</div>';
  }

  var promoTag = s.hasPromotion ? '<span class="card-promo-tag">' + s.promotionLabel + '</span>' : '';
  var typeLabel = s.type === 'hifi' ? '🎵 HiFi' : '📡 Bluetooth';
  var powerLabel = s.type === 'bluetooth'
    ? (s.powerSource === 'battery' ? '🔋 Batterie' : s.powerSource === 'both' ? '🔋/🔌 Batterie + Secteur' : '🔌 Secteur')
    : '🔌 Secteur';
  var stereoLabel = s.stereoMode ? '🔊 Stéréo possible' : '';

  var bestRetailer = findBestRetailer(s);
  var displayPrice = bestRetailer ? bestRetailer.price : s.price;
  var showStrike   = bestRetailer && bestRetailer.price < s.price;
  var ctaLabel = bestRetailer ? 'Meilleur prix : ' + displayPrice + ' € sur ' + bestRetailer.name : 'Voir les offres — ' + s.price + ' €';
  var ctaHref  = bestRetailer ? bestRetailer.url : '#';
  var otherOffers = buildOtherOffers(s, bestRetailer);

  var links = Object.entries(s.affiliateLinks || {})
    .filter(function (e) { return e[1]; })
    .slice(0, 5)
    .map(function (e) { return '<a href="' + e[1] + '" target="_blank" rel="noopener" class="retailer-link">' + e[0].charAt(0).toUpperCase() + e[0].slice(1) + '</a>'; })
    .join('');

  return (
    '<div class="tv-card' + (isTop1 ? ' tv-card--top1' : '') + '">' +
      '<div class="card-header">' +
        '<span class="card-rank">' + medal + '</span>' +
        '<div class="card-title-block">' +
          '<h3 class="card-title">' + s.displayName + '</h3>' +
          '<div class="card-badges">' +
            '<span class="card-badge">' + typeLabel + '</span>' +
            '<span class="card-badge">' + powerLabel + '</span>' +
            (stereoLabel ? '<span class="card-badge">' + stereoLabel + '</span>' : '') +
            (s.waterproofing ? '<span class="card-badge">💧 ' + s.waterproofing + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="card-price-block">' +
          promoTag +
          (showStrike ? '<span class="card-original-price">' + s.price.toLocaleString('fr-FR') + ' €</span>' : '') +
          '<span class="card-price">' + displayPrice.toLocaleString('fr-FR') + ' €</span>' +
        '</div>' +
      '</div>' +
      comparisonBlock +
      '<div class="card-score-block">' +
        '<div class="card-score-label"><span>Score global</span><strong>' + s.score + '/10 · ' + scoreToLabel(s.score) + '</strong></div>' +
        '<div class="card-score-track"><div class="card-score-fill" data-width="' + scoreWidth + '%" style="width:0%"></div></div>' +
      '</div>' +
      '<div class="card-specs">' +
        '<div class="spec-item"><span class="spec-label">Puissance</span><span class="spec-value">' + (s.power_w ? s.power_w + ' W' : 'N/A') + '</span></div>' +
        (s.powerSource === 'battery' && s.batteryLife_h ? '<div class="spec-item"><span class="spec-label">Autonomie</span><span class="spec-value">' + s.batteryLife_h + 'h</span></div>' : '') +
        (s.bluetoothVersion ? '<div class="spec-item"><span class="spec-label">Bluetooth</span><span class="spec-value">' + s.bluetoothVersion + '</span></div>' : '') +
        (s.stereoMode ? '<div class="spec-item"><span class="spec-label">Stéréo</span><span class="spec-value">' + (s.stereoTech || 'Oui') + '</span></div>' : '') +
        '<div class="spec-item"><span class="spec-label">Réparabilité</span><span class="spec-value">' + s.repairabilityScore + '/10</span></div>' +
        '<div class="spec-item"><span class="spec-label">Garantie</span><span class="spec-value">' + s.warrantyYears + ' an' + (s.warrantyYears > 1 ? 's' : '') + '</span></div>' +
      '</div>' +
      '<a href="' + ctaHref + '" target="_blank" rel="noopener" class="card-cta">' + ctaLabel + ' →</a>' +
      (otherOffers.count > 0 ? '<details class="card-other-offers"><summary>Voir ' + otherOffers.count + ' autre' + (otherOffers.count > 1 ? 's' : '') + ' offre' + (otherOffers.count > 1 ? 's' : '') + '</summary><div class="other-offers-list">' + otherOffers.html + '</div></details>' : '') +
    '</div>'
  );
}

// ============================================================
// ASPIRATEUR ROBOT — Range, affichage, comparaison, rendu
// ============================================================

function onRobRangeChange(which) {
  var minVal = parseInt(document.getElementById('robPriceMin').value);
  var maxVal = parseInt(document.getElementById('robPriceMax').value);
  if (which === 'min' && minVal > maxVal) { minVal = maxVal; document.getElementById('robPriceMin').value = minVal; }
  if (which === 'max' && maxVal < minVal) { maxVal = minVal; document.getElementById('robPriceMax').value = maxVal; }
  AppState.robotFilters.priceMin = minVal;
  AppState.robotFilters.priceMax = maxVal;
  AppState.robotFilters.noLimit  = maxVal >= 2000;
  updateRobPriceDisplay();
  updateRobRangeTrack();
  document.querySelectorAll('.rob-quick-btn').forEach(function (b) { b.classList.remove('active'); });
}

function updateRobRangeTrack() {
  var track = document.getElementById('robRangeTrackFill');
  if (!track) return;
  var leftPct  = (AppState.robotFilters.priceMin / 2000) * 100;
  var rightPct = (Math.min(AppState.robotFilters.priceMax, 2000) / 2000) * 100;
  track.style.left  = leftPct + '%';
  track.style.width = (rightPct - leftPct) + '%';
}

function updateRobPriceDisplay() {
  var min = AppState.robotFilters.priceMin;
  var max = AppState.robotFilters.priceMax;
  var minEl = document.getElementById('robPriceMinDisplay');
  var maxEl = document.getElementById('robPriceMaxDisplay');
  if (minEl) minEl.textContent = min.toLocaleString('fr-FR') + ' €';
  if (maxEl) maxEl.textContent = max >= 2000 ? '2 000 € +' : max.toLocaleString('fr-FR') + ' €';
}

function onCompareRobot() {
  showLoading(true);
  hideResults();
  setTimeout(function () {
    var results = runRobotComparison(ROBOT_DATABASE, AppState.robotFilters);
    AppState.results = results;
    showLoading(false);
    renderRobotResults(results);
  }, 100);
}

function renderRobotResults(results) {
  if (results.totalFound === 0) {
    var noRes = document.getElementById('noResultsMsg');
    var txt   = document.getElementById('noResultsText');
    if (txt) txt.textContent = 'Aucun aspirateur robot trouvé avec ces critères';
    noRes.style.display = 'block';
    return;
  }
  updateSectionTitles();
  renderTopSectionRobot('listPremium', results.premium, 'sectionPremium', 'premium');
  renderTopSectionRobot('listValue',   results.value,   'sectionValue',   'value');
  if (!AppState.robotFilters.noLimit) {
    var bestP = results.premium && results.premium[0] ? results.premium[0] : null;
    var bestV = results.value   && results.value[0]   ? results.value[0]   : null;
    renderTopSectionRobot('listAbove', results.aboveBudget, 'sectionAbove', 'above', bestP, bestV);
  }
  document.getElementById('resultsWrapper').scrollIntoView({ behavior: 'smooth' });
  requestAnimationFrame(function () { setTimeout(equalizeCardHeights, 50); });
}

function renderTopSectionRobot(listId, items, sectionId, type, bestPremium, bestValue) {
  var section = document.getElementById(sectionId);
  var list    = document.getElementById(listId);
  if (!items || items.length === 0) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  list.innerHTML = items.map(function (r, i) { return buildRobotCard(r, i + 1, type, bestPremium, bestValue); }).join('');
  requestAnimationFrame(function () {
    list.querySelectorAll('.card-score-fill').forEach(function (el) { el.style.width = el.dataset.width; });
  });
}

function buildRobotCard(r, rank, type, bestPremium, bestValue) {
  var medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
  var medal  = medals[rank] || '#' + rank;
  var isTop1 = rank === 1;
  var scoreWidth = Math.round(r.score * 10);

  var comparisonBlock = '';
  if (type === 'above' && (bestPremium || bestValue)) {
    var compRows = [];
    if (bestPremium) {
      var pDiff = r.price - bestPremium.price;
      var sDiff = parseFloat((r.score - bestPremium.score).toFixed(1));
      var sCls  = sDiff > 0 ? 'comp-better' : sDiff < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">🏆 <strong>' + bestPremium.displayName + '</strong><em> · n°1 premium</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff + ' €</span><span class="comp-extra-score ' + sCls + '">' + (sDiff > 0 ? '+' : '') + sDiff + ' pt</span></span></div>');
    }
    if (bestValue) {
      var pDiff2 = r.price - bestValue.price;
      var sDiff2 = parseFloat((r.score - bestValue.score).toFixed(1));
      var sCls2  = sDiff2 > 0 ? 'comp-better' : sDiff2 < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">⭐ <strong>' + bestValue.displayName + '</strong><em> · n°1 rapport Q/P</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff2 + ' €</span><span class="comp-extra-score ' + sCls2 + '">' + (sDiff2 > 0 ? '+' : '') + sDiff2 + ' pt</span></span></div>');
    }
    comparisonBlock = '<div class="card-comparison"><div class="comp-header">Comparé aux meilleures options dans votre budget :</div>' + compRows.join('') + '</div>';
  }

  var promoTag   = r.hasPromotion ? '<span class="card-promo-tag">' + r.promotionLabel + '</span>' : '';
  var navLabel   = r.navigation === 'laser' ? '📡 Laser' : r.navigation === 'camera' ? '📷 Caméra' : '🎲 Aléatoire';
  var bestRetailer = findBestRetailer(r);
  var displayPrice = bestRetailer ? bestRetailer.price : r.price;
  var showStrike   = bestRetailer && bestRetailer.price < r.price;
  var ctaLabel = bestRetailer ? 'Meilleur prix : ' + displayPrice + ' € sur ' + bestRetailer.name : 'Voir les offres — ' + r.price + ' €';
  var ctaHref  = bestRetailer ? bestRetailer.url : '#';
  var otherOffers = buildOtherOffers(r, bestRetailer);

  return (
    '<div class="tv-card' + (isTop1 ? ' tv-card--top1' : '') + '">' +
      '<div class="card-header">' +
        '<span class="card-rank">' + medal + '</span>' +
        '<div class="card-title-block">' +
          '<h3 class="card-title">' + r.displayName + '</h3>' +
          '<div class="card-badges">' +
            '<span class="card-badge">' + navLabel + '</span>' +
            (r.mopFunction ? '<span class="card-badge">🫧 Vadrouille</span>' : '') +
            (r.autoEmpty   ? '<span class="card-badge">🗑️ Auto-vidage</span>' : '') +
            (r.mapping     ? '<span class="card-badge">🗺️ Cartographie</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="card-price-block">' +
          promoTag +
          (showStrike ? '<span class="card-original-price">' + r.price.toLocaleString('fr-FR') + ' €</span>' : '') +
          '<span class="card-price">' + displayPrice.toLocaleString('fr-FR') + ' €</span>' +
        '</div>' +
      '</div>' +
      comparisonBlock +
      '<div class="card-score-block">' +
        '<div class="card-score-label"><span>Score global</span><strong>' + r.score + '/10 · ' + scoreToLabel(r.score) + '</strong></div>' +
        '<div class="card-score-track"><div class="card-score-fill" data-width="' + scoreWidth + '%" style="width:0%"></div></div>' +
      '</div>' +
      '<div class="card-specs">' +
        '<div class="spec-item"><span class="spec-label">Aspiration</span><span class="spec-value">' + r.suction_pa.toLocaleString('fr-FR') + ' Pa</span></div>' +
        '<div class="spec-item"><span class="spec-label">Autonomie</span><span class="spec-value">' + r.autonomy_min + ' min</span></div>' +
        (r.mopFunction ? '<div class="spec-item"><span class="spec-label">Vadrouille</span><span class="spec-value">' + r.mopTech + '</span></div>' : '') +
        '<div class="spec-item"><span class="spec-label">Bac</span><span class="spec-value">' + r.binSize_ml + ' ml</span></div>' +
        '<div class="spec-item"><span class="spec-label">Réparabilité</span><span class="spec-value">' + r.repairabilityScore + '/10</span></div>' +
        '<div class="spec-item"><span class="spec-label">Garantie</span><span class="spec-value">' + r.warrantyYears + ' an' + (r.warrantyYears > 1 ? 's' : '') + '</span></div>' +
      '</div>' +
      '<a href="' + ctaHref + '" target="_blank" rel="noopener" class="card-cta">' + ctaLabel + ' →</a>' +
      (otherOffers.count > 0 ? '<details class="card-other-offers"><summary>Voir ' + otherOffers.count + ' autre' + (otherOffers.count > 1 ? 's' : '') + ' offre' + (otherOffers.count > 1 ? 's' : '') + '</summary><div class="other-offers-list">' + otherOffers.html + '</div></details>' : '') +
    '</div>'
  );
}

// ============================================================
// ÉCOUTEURS — Range, affichage, comparaison, rendu
// ============================================================

function onEarRangeChange(which) {
  var minVal = parseInt(document.getElementById('earPriceMin').value);
  var maxVal = parseInt(document.getElementById('earPriceMax').value);
  if (which === 'min' && minVal > maxVal) { minVal = maxVal; document.getElementById('earPriceMin').value = minVal; }
  if (which === 'max' && maxVal < minVal) { maxVal = minVal; document.getElementById('earPriceMax').value = maxVal; }
  AppState.earphonesFilters.priceMin = minVal;
  AppState.earphonesFilters.priceMax = maxVal;
  AppState.earphonesFilters.noLimit  = maxVal >= 800;
  updateEarPriceDisplay();
  updateEarRangeTrack();
  document.querySelectorAll('.ear-quick-btn').forEach(function (b) { b.classList.remove('active'); });
}

function updateEarRangeTrack() {
  var track = document.getElementById('earRangeTrackFill');
  if (!track) return;
  var leftPct  = (AppState.earphonesFilters.priceMin / 800) * 100;
  var rightPct = (Math.min(AppState.earphonesFilters.priceMax, 800) / 800) * 100;
  track.style.left  = leftPct + '%';
  track.style.width = (rightPct - leftPct) + '%';
}

function updateEarPriceDisplay() {
  var min = AppState.earphonesFilters.priceMin;
  var max = AppState.earphonesFilters.priceMax;
  var minEl = document.getElementById('earPriceMinDisplay');
  var maxEl = document.getElementById('earPriceMaxDisplay');
  if (minEl) minEl.textContent = min.toLocaleString('fr-FR') + ' €';
  if (maxEl) maxEl.textContent = max >= 800 ? '800 € +' : max.toLocaleString('fr-FR') + ' €';
}

function onCompareEarphones() {
  showLoading(true);
  hideResults();
  setTimeout(function () {
    var results = runEarphonesComparison(EARPHONES_DATABASE, AppState.earphonesFilters);
    AppState.results = results;
    showLoading(false);
    renderEarphonesResults(results);
  }, 100);
}

function renderEarphonesResults(results) {
  if (results.totalFound === 0) {
    var noRes = document.getElementById('noResultsMsg');
    var txt   = document.getElementById('noResultsText');
    if (txt) txt.textContent = 'Aucun écouteur trouvé avec ces critères';
    noRes.style.display = 'block';
    return;
  }
  updateSectionTitles();
  renderTopSectionEarphones('listPremium', results.premium, 'sectionPremium', 'premium');
  renderTopSectionEarphones('listValue',   results.value,   'sectionValue',   'value');
  if (!AppState.earphonesFilters.noLimit) {
    var bestP = results.premium && results.premium[0] ? results.premium[0] : null;
    var bestV = results.value   && results.value[0]   ? results.value[0]   : null;
    renderTopSectionEarphones('listAbove', results.aboveBudget, 'sectionAbove', 'above', bestP, bestV);
  }
  document.getElementById('resultsWrapper').scrollIntoView({ behavior: 'smooth' });
  requestAnimationFrame(function () { setTimeout(equalizeCardHeights, 50); });
}

function renderTopSectionEarphones(listId, items, sectionId, type, bestPremium, bestValue) {
  var section = document.getElementById(sectionId);
  var list    = document.getElementById(listId);
  if (!items || items.length === 0) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  list.innerHTML = items.map(function (e, i) { return buildEarphonesCard(e, i + 1, type, bestPremium, bestValue); }).join('');
  requestAnimationFrame(function () {
    list.querySelectorAll('.card-score-fill').forEach(function (el) { el.style.width = el.dataset.width; });
  });
}

function buildEarphonesCard(e, rank, type, bestPremium, bestValue) {
  var medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
  var medal  = medals[rank] || '#' + rank;
  var isTop1 = rank === 1;
  var scoreWidth = Math.round(e.score * 10);

  var comparisonBlock = '';
  if (type === 'above' && (bestPremium || bestValue)) {
    var compRows = [];
    if (bestPremium) {
      var pDiff = e.price - bestPremium.price;
      var sDiff = parseFloat((e.score - bestPremium.score).toFixed(1));
      var sCls  = sDiff > 0 ? 'comp-better' : sDiff < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">🏆 <strong>' + bestPremium.displayName + '</strong><em> · n°1 premium</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff + ' €</span><span class="comp-extra-score ' + sCls + '">' + (sDiff > 0 ? '+' : '') + sDiff + ' pt</span></span></div>');
    }
    if (bestValue) {
      var pDiff2 = e.price - bestValue.price;
      var sDiff2 = parseFloat((e.score - bestValue.score).toFixed(1));
      var sCls2  = sDiff2 > 0 ? 'comp-better' : sDiff2 < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">⭐ <strong>' + bestValue.displayName + '</strong><em> · n°1 rapport Q/P</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff2 + ' €</span><span class="comp-extra-score ' + sCls2 + '">' + (sDiff2 > 0 ? '+' : '') + sDiff2 + ' pt</span></span></div>');
    }
    comparisonBlock = '<div class="card-comparison"><div class="comp-header">Comparé aux meilleures options dans votre budget :</div>' + compRows.join('') + '</div>';
  }

  var promoTag = e.hasPromotion ? '<span class="card-promo-tag">' + e.promotionLabel + '</span>' : '';
  var typeLabel = e.type === 'over-ear' ? '🎧 Casque' : e.type === 'open' ? '🔓 Ouvert' : '🎵 Intra';
  var battLabel = e.type === 'over-ear'
    ? e.batteryLife_h + 'h autonomie'
    : e.totalBattery_h + 'h total (boîtier inclus)';

  var bestRetailer = findBestRetailer(e);
  var displayPrice = bestRetailer ? bestRetailer.price : e.price;
  var showStrike   = bestRetailer && bestRetailer.price < e.price;
  var ctaLabel = bestRetailer ? 'Meilleur prix : ' + displayPrice + ' € sur ' + bestRetailer.name : 'Voir les offres — ' + e.price + ' €';
  var ctaHref  = bestRetailer ? bestRetailer.url : '#';
  var otherOffers = buildOtherOffers(e, bestRetailer);

  return (
    '<div class="tv-card' + (isTop1 ? ' tv-card--top1' : '') + '">' +
      '<div class="card-header">' +
        '<span class="card-rank">' + medal + '</span>' +
        '<div class="card-title-block">' +
          '<h3 class="card-title">' + e.displayName + '</h3>' +
          '<div class="card-badges">' +
            '<span class="card-badge">' + typeLabel + '</span>' +
            (e.anc ? '<span class="card-badge">🔇 ANC</span>' : '') +
            (e.multipoint ? '<span class="card-badge">🔗 Multipoint</span>' : '') +
            (e.wirelessCharging ? '<span class="card-badge">⚡ Charge sans fil</span>' : '') +
            (e.waterproofing ? '<span class="card-badge">💧 ' + e.waterproofing + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="card-price-block">' +
          promoTag +
          (showStrike ? '<span class="card-original-price">' + e.price.toLocaleString('fr-FR') + ' €</span>' : '') +
          '<span class="card-price">' + displayPrice.toLocaleString('fr-FR') + ' €</span>' +
        '</div>' +
      '</div>' +
      comparisonBlock +
      '<div class="card-score-block">' +
        '<div class="card-score-label"><span>Score global</span><strong>' + e.score + '/10 · ' + scoreToLabel(e.score) + '</strong></div>' +
        '<div class="card-score-track"><div class="card-score-fill" data-width="' + scoreWidth + '%" style="width:0%"></div></div>' +
      '</div>' +
      '<div class="card-specs">' +
        '<div class="spec-item"><span class="spec-label">Autonomie</span><span class="spec-value">' + battLabel + '</span></div>' +
        '<div class="spec-item"><span class="spec-label">Codec</span><span class="spec-value">' + e.codec + '</span></div>' +
        '<div class="spec-item"><span class="spec-label">Bluetooth</span><span class="spec-value">' + e.bluetoothVersion + '</span></div>' +
        (e.anc ? '<div class="spec-item"><span class="spec-label">ANC</span><span class="spec-value">Score ' + e.ancScore + '/10</span></div>' : '') +
        (e.spatialAudio ? '<div class="spec-item"><span class="spec-label">Audio spatial</span><span class="spec-value">Oui</span></div>' : '') +
        '<div class="spec-item"><span class="spec-label">Réparabilité</span><span class="spec-value">' + e.repairabilityScore + '/10</span></div>' +
      '</div>' +
      '<a href="' + ctaHref + '" target="_blank" rel="noopener" class="card-cta">' + ctaLabel + ' →</a>' +
      (otherOffers.count > 0 ? '<details class="card-other-offers"><summary>Voir ' + otherOffers.count + ' autre' + (otherOffers.count > 1 ? 's' : '') + ' offre' + (otherOffers.count > 1 ? 's' : '') + '</summary><div class="other-offers-list">' + otherOffers.html + '</div></details>' : '') +
    '</div>'
  );
}

// ============================================================
// AIRFRYER — Range, affichage, comparaison, rendu
// ============================================================

function onAfrRangeChange(which) {
  var minVal = parseInt(document.getElementById('afrPriceMin').value);
  var maxVal = parseInt(document.getElementById('afrPriceMax').value);
  if (which === 'min' && minVal > maxVal) { minVal = maxVal; document.getElementById('afrPriceMin').value = minVal; }
  if (which === 'max' && maxVal < minVal) { maxVal = minVal; document.getElementById('afrPriceMax').value = maxVal; }
  AppState.airfryerFilters.priceMin = minVal;
  AppState.airfryerFilters.priceMax = maxVal;
  AppState.airfryerFilters.noLimit  = maxVal >= 500;
  updateAfrPriceDisplay();
  updateAfrRangeTrack();
  document.querySelectorAll('.afr-quick-btn').forEach(function (b) { b.classList.remove('active'); });
}

function updateAfrRangeTrack() {
  var track = document.getElementById('afrRangeTrackFill');
  if (!track) return;
  var leftPct  = (AppState.airfryerFilters.priceMin / 500) * 100;
  var rightPct = (Math.min(AppState.airfryerFilters.priceMax, 500) / 500) * 100;
  track.style.left  = leftPct + '%';
  track.style.width = (rightPct - leftPct) + '%';
}

function updateAfrPriceDisplay() {
  var min = AppState.airfryerFilters.priceMin;
  var max = AppState.airfryerFilters.priceMax;
  var minEl = document.getElementById('afrPriceMinDisplay');
  var maxEl = document.getElementById('afrPriceMaxDisplay');
  if (minEl) minEl.textContent = min.toLocaleString('fr-FR') + ' €';
  if (maxEl) maxEl.textContent = max >= 500 ? '500 € +' : max.toLocaleString('fr-FR') + ' €';
}

function onCompareAirfryer() {
  AppState.airfryerFilters.priceMin = parseInt(document.getElementById('afrPriceMin').value) || 0;
  AppState.airfryerFilters.priceMax = parseInt(document.getElementById('afrPriceMax').value) || 130;
  AppState.airfryerFilters.noLimit  = AppState.airfryerFilters.priceMax >= 500;
  showLoading(true);
  hideResults();
  setTimeout(function () {
    var results = runAirfryerComparison(AIRFRYER_DATABASE, AppState.airfryerFilters);
    AppState.results = results;
    showLoading(false);
    renderAirfryerResults(results);
  }, 100);
}

function renderAirfryerResults(results) {
  if (results.totalFound === 0) {
    var noRes = document.getElementById('noResultsMsg');
    var txt   = document.getElementById('noResultsText');
    if (txt) txt.textContent = 'Aucun airfryer trouvé avec ces critères';
    noRes.style.display = 'block';
    return;
  }
  updateSectionTitles();
  renderTopSectionAirfryer('listPremium', results.premium, 'sectionPremium', 'premium');
  renderTopSectionAirfryer('listValue',   results.value,   'sectionValue',   'value');
  if (!AppState.airfryerFilters.noLimit) {
    var bestP = results.premium && results.premium[0] ? results.premium[0] : null;
    var bestV = results.value   && results.value[0]   ? results.value[0]   : null;
    renderTopSectionAirfryer('listAbove', results.aboveBudget, 'sectionAbove', 'above', bestP, bestV);
  }
  document.getElementById('resultsWrapper').scrollIntoView({ behavior: 'smooth' });
  requestAnimationFrame(function () { setTimeout(equalizeCardHeights, 50); });
}

function renderTopSectionAirfryer(listId, items, sectionId, type, bestPremium, bestValue) {
  var section = document.getElementById(sectionId);
  var list    = document.getElementById(listId);
  if (!items || items.length === 0) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  list.innerHTML = items.map(function (a, i) { return buildAirfryerCard(a, i + 1, type, bestPremium, bestValue); }).join('');
  requestAnimationFrame(function () {
    list.querySelectorAll('.card-score-fill').forEach(function (el) { el.style.width = el.dataset.width; });
  });
}

function buildAirfryerCard(a, rank, type, bestPremium, bestValue) {
  var medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
  var medal  = medals[rank] || '#' + rank;
  var isTop1 = rank === 1;
  var scoreWidth = Math.round(a.score * 10);

  var comparisonBlock = '';
  if (type === 'above' && (bestPremium || bestValue)) {
    var compRows = [];
    if (bestPremium) {
      var pDiff = a.price - bestPremium.price;
      var sDiff = parseFloat((a.score - bestPremium.score).toFixed(1));
      var sCls  = sDiff > 0 ? 'comp-better' : sDiff < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">🏆 <strong>' + bestPremium.displayName + '</strong><em> · n°1 premium</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff + ' €</span><span class="comp-extra-score ' + sCls + '">' + (sDiff > 0 ? '+' : '') + sDiff + ' pt</span></span></div>');
    }
    if (bestValue) {
      var pDiff2 = a.price - bestValue.price;
      var sDiff2 = parseFloat((a.score - bestValue.score).toFixed(1));
      var sCls2  = sDiff2 > 0 ? 'comp-better' : sDiff2 < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">⭐ <strong>' + bestValue.displayName + '</strong><em> · n°1 rapport Q/P</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff2 + ' €</span><span class="comp-extra-score ' + sCls2 + '">' + (sDiff2 > 0 ? '+' : '') + sDiff2 + ' pt</span></span></div>');
    }
    comparisonBlock = '<div class="card-comparison"><div class="comp-header">Comparé aux meilleures options dans votre budget :</div>' + compRows.join('') + '</div>';
  }

  var typeLabels = { basket: '🧺 Panier simple', dual: '🍗🥦 Double bac', oven: '🔲 Four airfryer', paddle: '🔄 Brassage auto' };
  var typeLabel  = typeLabels[a.type] || a.type;
  var promoTag   = a.hasPromotion ? '<span class="card-promo-tag">' + a.promotionLabel + '</span>' : '';

  var bestRetailer = findBestRetailer(a);
  var displayPrice = bestRetailer ? bestRetailer.price : a.price;
  var showStrike   = bestRetailer && bestRetailer.price < a.price;
  var ctaLabel = bestRetailer ? 'Meilleur prix : ' + displayPrice + ' € sur ' + bestRetailer.name : 'Voir les offres — ' + a.price + ' €';
  var ctaHref  = bestRetailer ? bestRetailer.url : '#';
  var otherOffers = buildOtherOffers(a, bestRetailer);

  return (
    '<div class="tv-card' + (isTop1 ? ' tv-card--top1' : '') + '">' +
      '<div class="card-header">' +
        '<span class="card-rank">' + medal + '</span>' +
        '<div class="card-title-block">' +
          '<h3 class="card-title">' + a.displayName + '</h3>' +
          '<div class="card-badges">' +
            '<span class="card-badge">' + typeLabel + '</span>' +
            (a.dehydrate   ? '<span class="card-badge">🌿 Déshydratation</span>' : '') +
            (a.rotisserie  ? '<span class="card-badge">🍗 Rotissoire</span>' : '') +
            (a.wifiApp     ? '<span class="card-badge">📱 App connectée</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="card-price-block">' +
          promoTag +
          (showStrike ? '<span class="card-original-price">' + a.price.toLocaleString('fr-FR') + ' €</span>' : '') +
          '<span class="card-price">' + displayPrice.toLocaleString('fr-FR') + ' €</span>' +
        '</div>' +
      '</div>' +
      comparisonBlock +
      '<div class="card-score-block">' +
        '<div class="card-score-label"><span>Score global</span><strong>' + a.score + '/10 · ' + scoreToLabel(a.score) + '</strong></div>' +
        '<div class="card-score-track"><div class="card-score-fill" data-width="' + scoreWidth + '%" style="width:0%"></div></div>' +
      '</div>' +
      '<div class="card-specs">' +
        '<div class="spec-item"><span class="spec-label">Capacité</span><span class="spec-value">' + a.capacity_l + ' L · ' + a.basketCount + ' bac' + (a.basketCount > 1 ? 's' : '') + '</span></div>' +
        '<div class="spec-item"><span class="spec-label">Puissance</span><span class="spec-value">' + a.power_w.toLocaleString('fr-FR') + ' W</span></div>' +
        '<div class="spec-item"><span class="spec-label">Temp. max</span><span class="spec-value">' + a.maxTemp_c + ' °C</span></div>' +
        '<div class="spec-item"><span class="spec-label">Programmes</span><span class="spec-value">' + a.functions + ' fonctions</span></div>' +
        '<div class="spec-item"><span class="spec-label">Lave-vaisselle</span><span class="spec-value">' + (a.dishwasherSafe ? 'Oui' : 'Non') + '</span></div>' +
        '<div class="spec-item"><span class="spec-label">Garantie</span><span class="spec-value">' + a.warrantyYears + ' an' + (a.warrantyYears > 1 ? 's' : '') + '</span></div>' +
      '</div>' +
      '<a href="' + ctaHref + '" target="_blank" rel="noopener" class="card-cta">' + ctaLabel + ' →</a>' +
      (otherOffers.count > 0 ? '<details class="card-other-offers"><summary>Voir ' + otherOffers.count + ' autre' + (otherOffers.count > 1 ? 's' : '') + ' offre' + (otherOffers.count > 1 ? 's' : '') + '</summary><div class="other-offers-list">' + otherOffers.html + '</div></details>' : '') +
    '</div>'
  );
}

// ============================================================
// PLAQUES DE CUISSON — Range, compare, render, card
// ============================================================

function onHobRangeChange(which) {
  var minVal = parseInt(document.getElementById('hobPriceMin').value);
  var maxVal = parseInt(document.getElementById('hobPriceMax').value);
  if (which === 'min' && minVal > maxVal) { minVal = maxVal; document.getElementById('hobPriceMin').value = minVal; }
  if (which === 'max' && maxVal < minVal) { maxVal = minVal; document.getElementById('hobPriceMax').value = maxVal; }
  AppState.hobFilters.priceMin = minVal;
  AppState.hobFilters.priceMax = maxVal;
  AppState.hobFilters.noLimit  = maxVal >= 2000;
  updateHobPriceDisplay(); updateHobRangeTrack();
  document.querySelectorAll('.hob-quick-btn').forEach(function (b) { b.classList.remove('active'); });
}

function updateHobRangeTrack() {
  var track = document.getElementById('hobRangeTrackFill');
  if (!track) return;
  var leftPct  = (parseInt(document.getElementById('hobPriceMin').value) / 2000) * 100;
  var rightPct = (parseInt(document.getElementById('hobPriceMax').value) / 2000) * 100;
  track.style.left = leftPct + '%'; track.style.width = (rightPct - leftPct) + '%';
}

function updateHobPriceDisplay() {
  var min = AppState.hobFilters.priceMin, max = AppState.hobFilters.priceMax;
  var minEl = document.getElementById('hobPriceMinDisplay'), maxEl = document.getElementById('hobPriceMaxDisplay');
  if (minEl) minEl.textContent = min.toLocaleString('fr-FR') + ' \u20ac';
  if (maxEl) maxEl.textContent = max >= 2000 ? '2\u00a0000 \u20ac +' : max.toLocaleString('fr-FR') + ' \u20ac';
}

function onCompareHob() {
  showLoading(true); hideResults();
  setTimeout(function () {
    var results = runHobComparison(HOB_DATABASE, AppState.hobFilters);
    AppState.results = results; showLoading(false);
    renderHobResults(results);
  }, 100);
}

function renderHobResults(results) {
  if (results.totalFound === 0) {
    var noRes = document.getElementById('noResultsMsg'), txt = document.getElementById('noResultsText');
    if (txt) txt.textContent = 'Aucune plaque de cuisson trouv\u00e9e';
    noRes.style.display = 'block'; return;
  }
  updateSectionTitles();
  renderTopSectionHob('listPremium', results.premium, 'sectionPremium', 'premium');
  renderTopSectionHob('listValue',   results.value,   'sectionValue',   'value');
  if (!AppState.hobFilters.noLimit) {
    var bestP = results.premium && results.premium[0] ? results.premium[0] : null;
    var bestV = results.value   && results.value[0]   ? results.value[0]   : null;
    renderTopSectionHob('listAbove', results.aboveBudget, 'sectionAbove', 'above', bestP, bestV);
  }
  document.getElementById('resultsWrapper').scrollIntoView({ behavior: 'smooth' });
  requestAnimationFrame(function () { setTimeout(equalizeCardHeights, 50); });
}

function renderTopSectionHob(listId, items, sectionId, type, bestPremium, bestValue) {
  var section = document.getElementById(sectionId), list = document.getElementById(listId);
  if (!items || items.length === 0) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  list.innerHTML = items.map(function (h, i) { return buildHobCard(h, i + 1, type, bestPremium, bestValue); }).join('');
  requestAnimationFrame(function () { list.querySelectorAll('.card-score-fill').forEach(function (el) { el.style.width = el.dataset.width; }); });
}

function buildHobCard(h, rank, type, bestPremium, bestValue) {
  var medals = { 1: '\ud83e\udd47', 2: '\ud83e\udd48', 3: '\ud83e\udd49' };
  var medal = medals[rank] || '#' + rank;
  var isTop1 = rank === 1;
  var scoreWidth = Math.round(h.score * 10);

  var comparisonBlock = '';
  if (type === 'above' && (bestPremium || bestValue)) {
    var compRows = [];
    if (bestPremium) {
      var pDiff = h.price - bestPremium.price, sDiff = parseFloat((h.score - bestPremium.score).toFixed(1));
      var sCls = sDiff > 0 ? 'comp-better' : sDiff < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">\ud83c\udfc6 <strong>' + bestPremium.displayName + '</strong><em> \u00b7 n\u00b01 premium</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff + ' \u20ac</span><span class="comp-extra-score ' + sCls + '">' + (sDiff > 0 ? '+' : '') + sDiff + ' pt</span></span></div>');
    }
    if (bestValue) {
      var pDiff2 = h.price - bestValue.price, sDiff2 = parseFloat((h.score - bestValue.score).toFixed(1));
      var sCls2 = sDiff2 > 0 ? 'comp-better' : sDiff2 < 0 ? 'comp-worse' : 'comp-equal';
      compRows.push('<div class="comp-row"><span class="comp-label">\u2b50 <strong>' + bestValue.displayName + '</strong><em> \u00b7 n\u00b01 rapport Q/P</em></span><span class="comp-values"><span class="comp-extra-price">+' + pDiff2 + ' \u20ac</span><span class="comp-extra-score ' + sCls2 + '">' + (sDiff2 > 0 ? '+' : '') + sDiff2 + ' pt</span></span></div>');
    }
    comparisonBlock = '<div class="card-comparison"><div class="comp-header">Compar\u00e9 aux meilleures options dans votre budget :</div>' + compRows.join('') + '</div>';
  }

  var typeLabel = h.type === 'induction' ? '\u26a1 Induction' : h.type === 'vitroceramique' ? '\ud83d\udd34 Vitroc\u00e9ramique' : '\ud83d\udd0c \u00c9lectrique';
  var promoTag  = h.hasPromotion ? '<span class="card-promo-tag">' + h.promotionLabel + '</span>' : '';
  var ctaHref   = '#';
  var ctaLabel  = 'Voir le meilleur prix';

  return (
    '<div class="tv-card-wrapper">' +
    (rank <= 3 ? '<div class="card-top-badge">' + (rank === 1 ? 'RECOMMAND\u00c9' : rank === 2 ? 'EXCELLENT' : 'TR\u00c8S BON') + '</div>' : '') +
    '<div class="tv-card' + (isTop1 ? ' tv-card--rank-1' : '') + '">' +
      '<div class="card-header">' +
        '<span class="card-rank">' + medal + '</span>' +
        '<div class="card-title-block">' +
          '<h3 class="card-title">' + h.displayName + '</h3>' +
          '<div class="card-badges">' +
            '<span class="card-badge">' + typeLabel + '</span>' +
            '<span class="card-badge">\ud83d\udd06 ' + h.burners + ' foyers</span>' +
            (h.hasTimer ? '<span class="card-badge">\u23f1\ufe0f Minuteur</span>' : '') +
            (h.boostZone ? '<span class="card-badge">\ud83d\ude80 Boost</span>' : '') +
            (h.flexiZone ? '<span class="card-badge">\ud83d\udd04 FlexiZone</span>' : '') +
            (h.bridgeFunction ? '<span class="card-badge">\ud83d\udd17 Bridge</span>' : '') +
            (h.connected ? '<span class="card-badge">\ud83d\udcf1 Connect\u00e9</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="card-price-block">' +
          promoTag +
          (h.originalPrice ? '<span class="card-original-price">' + h.originalPrice.toLocaleString('fr-FR') + ' \u20ac</span>' : '') +
          '<span class="card-price">' + h.price.toLocaleString('fr-FR') + ' \u20ac</span>' +
        '</div>' +
      '</div>' +
      comparisonBlock +
      '<div class="card-score-block">' +
        '<div class="card-score-label"><span>Score global</span><strong>' + h.score + '/10 \u00b7 ' + scoreToLabel(h.score) + '</strong></div>' +
        '<div class="card-score-track"><div class="card-score-fill" data-width="' + scoreWidth + '%" style="width:0%"></div></div>' +
      '</div>' +
      '<div class="card-specs">' +
        '<div class="spec-item"><span class="spec-label">Puissance</span><span class="spec-value">' + h.power_w.toLocaleString('fr-FR') + ' W</span></div>' +
        '<div class="spec-item"><span class="spec-label">Niveaux</span><span class="spec-value">' + h.programs + ' niveaux</span></div>' +
        '<div class="spec-item"><span class="spec-label">Largeur</span><span class="spec-value">' + h.width_cm + ' cm</span></div>' +
        '<div class="spec-item"><span class="spec-label">S\u00e9curit\u00e9 enfant</span><span class="spec-value">' + (h.childLock ? 'Oui' : 'Non') + '</span></div>' +
        '<div class="spec-item"><span class="spec-label">R\u00e9parabilit\u00e9</span><span class="spec-value">' + h.repairabilityScore + '/10</span></div>' +
        '<div class="spec-item"><span class="spec-label">Garantie</span><span class="spec-value">' + h.warrantyYears + ' ans</span></div>' +
      '</div>' +
      '<a href="' + ctaHref + '" target="_blank" rel="noopener" class="card-cta">' + ctaLabel + ' \u2192</a>' +
    '</div>' +
    '</div>'
  );
}
