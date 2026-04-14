// ============================================================
// bundle.js — Optimiseur de pack emménagement
//
// Génère 3 alternatives de pack (Économique / Équilibré / Premium)
// en répartissant le budget total entre les catégories sélectionnées
// et en adaptant les recommandations aux besoins du foyer.
// ============================================================

// ------------------------------------------------------------
// Poids relatifs de chaque catégorie dans un budget emménagement
// (somme ≠ 1 intentionnel — normalisés dynamiquement)
// ------------------------------------------------------------
const BUNDLE_WEIGHTS = {
  fridge:     0.22,
  washing:    0.18,
  dishwasher: 0.12,
  tv:         0.15,
  hob:        0.13,
  vacuum:     0.09,
  coffee:     0.06,
  airfryer:   0.03,
  iron:       0.02
};

// ------------------------------------------------------------
// Labels et emojis par catégorie
// ------------------------------------------------------------
const BUNDLE_CATEGORY_META = {
  fridge:     { label: 'Réfrigérateur',     emoji: '🧊' },
  washing:    { label: 'Lave-linge',        emoji: '🫧' },
  dishwasher: { label: 'Lave-vaisselle',    emoji: '🍽️' },
  tv:         { label: 'Télévision',        emoji: '📺' },
  hob:        { label: 'Plaques de cuisson',emoji: '🍳' },
  vacuum:     { label: 'Aspirateur',        emoji: '🌪️' },
  coffee:     { label: 'Machine à café',    emoji: '☕' },
  airfryer:   { label: 'Airfryer',          emoji: '⚡' },
  iron:       { label: 'Fer à repasser',    emoji: '👔' }
};

// ------------------------------------------------------------
// 3 stratégies de pack
// ------------------------------------------------------------
const BUNDLE_STRATEGIES = [
  {
    id: 'eco',
    label: 'Économique',
    emoji: '💰',
    tagline: 'L\'essentiel au meilleur prix',
    color: '#22c55e',
    // Priorité : meilleur rapport qualité/prix (reviewScore / price)
    pickFn: function(candidates) {
      return candidates.slice().sort(function(a, b) {
        return (b.reviewScore / b.price) - (a.reviewScore / a.price);
      })[0];
    }
  },
  {
    id: 'balanced',
    label: 'Équilibré',
    emoji: '⭐',
    tagline: 'Le meilleur choix pour votre foyer',
    color: '#8b5cf6',
    // Priorité : score mixte (70% qualité + 30% rapport Q/P)
    pickFn: function(candidates, maxBudget) {
      var priceRange = maxBudget - Math.min.apply(null, candidates.map(function(c) { return c.price; }));
      return candidates.slice().sort(function(a, b) {
        var aVal = a.reviewScore * 0.7 + (1 - (a.price / maxBudget)) * 10 * 0.3;
        var bVal = b.reviewScore * 0.7 + (1 - (b.price / maxBudget)) * 10 * 0.3;
        return bVal - aVal;
      })[0];
    }
  },
  {
    id: 'premium',
    label: 'Premium',
    emoji: '🏆',
    tagline: 'Confort et qualité maximaux',
    color: '#f59e0b',
    // Priorité : meilleure note avis
    pickFn: function(candidates) {
      return candidates.slice().sort(function(a, b) {
        return (b.reviewScore * 10 + (b.repairabilityScore || 0)) - (a.reviewScore * 10 + (a.repairabilityScore || 0));
      })[0];
    }
  }
];

// ------------------------------------------------------------
// FONCTION PRINCIPALE
// ------------------------------------------------------------
function runBundleOptimizer(selectedCategories, totalBudget, peopleCount, squareMeters) {
  // 1. Normaliser les poids selon les catégories sélectionnées
  var totalWeight = selectedCategories.reduce(function(sum, cat) {
    return sum + (BUNDLE_WEIGHTS[cat] || 0.05);
  }, 0);
  var normalizedWeights = {};
  selectedCategories.forEach(function(cat) {
    normalizedWeights[cat] = (BUNDLE_WEIGHTS[cat] || 0.05) / totalWeight;
  });

  // 2. Construire les sous-bases filtrées selon le foyer
  var filteredDbs = buildHouseholdFilteredDbs(selectedCategories, peopleCount, squareMeters);

  // 3. Générer les 3 packs
  return BUNDLE_STRATEGIES.map(function(strategy) {
    var pack = {};
    var total = 0;
    var allFound = true;

    selectedCategories.forEach(function(cat) {
      var catMaxBudget = totalBudget * normalizedWeights[cat];
      var db = filteredDbs[cat] || [];

      // Produits dans le budget de la catégorie
      var candidates = db.filter(function(p) { return p.price <= catMaxBudget; });

      // Si rien dans le budget, prendre le moins cher disponible
      if (candidates.length === 0) {
        candidates = db.slice().sort(function(a, b) { return a.price - b.price; }).slice(0, 3);
      }

      var picked = candidates.length > 0 ? strategy.pickFn(candidates, catMaxBudget) : null;

      if (picked) {
        pack[cat] = picked;
        total += picked.price;
      } else {
        allFound = false;
      }
    });

    return {
      strategy: strategy,
      products: pack,
      total: total,
      withinBudget: total <= totalBudget,
      budgetUsed: Math.round((total / totalBudget) * 100)
    };
  });
}

// ------------------------------------------------------------
// Applique les filtres foyer sur chaque base de données
// ------------------------------------------------------------
function buildHouseholdFilteredDbs(selectedCategories, peopleCount, squareMeters) {
  var dbs = {};

  selectedCategories.forEach(function(cat) {
    var base = getBaseDatabase(cat);
    if (!base || base.length === 0) { dbs[cat] = []; return; }

    var filtered = base.filter(function(p) {
      // Lave-linge : capacité selon nb personnes
      if (cat === 'washing') {
        var minKg = peopleCount <= 2 ? 6 : peopleCount <= 4 ? 8 : 10;
        return (p.capacity_kg || 0) >= minKg;
      }
      // Lave-vaisselle : couverts selon nb personnes
      if (cat === 'dishwasher') {
        var minPlaces = peopleCount <= 2 ? 0 : peopleCount <= 4 ? 9 : 13;
        return (p.placeSettings || 0) >= minPlaces;
      }
      // Frigo : volume selon nb personnes
      if (cat === 'fridge') {
        var minVol = peopleCount <= 2 ? 0 : peopleCount <= 4 ? 280 : 380;
        return (p.volume_l || 0) >= minVol;
      }
      // Airfryer : capacité selon nb personnes
      if (cat === 'airfryer') {
        var minCap = peopleCount <= 2 ? 0 : peopleCount <= 4 ? 5 : 7;
        return (p.capacity_l || 0) >= minCap;
      }
      // Aspirateur : type selon surface
      if (cat === 'vacuum') {
        if (squareMeters > 100) {
          // Grande surface : traineau ou balai puissant
          return p.type === 'traineau' || (p.type === 'balai' && (p.suctionPower || 0) >= 160);
        } else if (squareMeters < 50) {
          // Petit logement : robot ou balai léger
          return p.type === 'robot' || p.type === 'balai';
        }
        return true; // 50-100m² : tout convient
      }
      // Plaques : foyers selon nb personnes
      if (cat === 'hob') {
        var minBurners = peopleCount <= 2 ? 0 : 4;
        return (p.burners || 0) >= minBurners;
      }
      return true;
    });

    // Si le filtre est trop restrictif, on garde au moins 3 produits
    dbs[cat] = filtered.length >= 2 ? filtered : base.slice().sort(function(a, b) { return a.price - b.price; });
  });

  return dbs;
}

// ------------------------------------------------------------
// Retourne la base de données correspondant à une catégorie
// ------------------------------------------------------------
function getBaseDatabase(cat) {
  switch (cat) {
    case 'fridge':     return typeof FRIDGE_DATABASE     !== 'undefined' ? FRIDGE_DATABASE     : [];
    case 'washing':    return typeof WASHING_DATABASE    !== 'undefined' ? WASHING_DATABASE    : [];
    case 'dishwasher': return typeof DISHWASHER_DATABASE !== 'undefined' ? DISHWASHER_DATABASE : [];
    case 'tv':         return typeof TV_DATABASE         !== 'undefined' ? TV_DATABASE         : [];
    case 'hob':        return typeof HOB_DATABASE        !== 'undefined' ? HOB_DATABASE        : [];
    case 'vacuum':     return typeof VACUUM_DATABASE     !== 'undefined' ? VACUUM_DATABASE     : [];
    case 'coffee':     return typeof COFFEE_DATABASE     !== 'undefined' ? COFFEE_DATABASE     : [];
    case 'airfryer':   return typeof AIRFRYER_DATABASE   !== 'undefined' ? AIRFRYER_DATABASE   : [];
    case 'iron':       return typeof IRON_DATABASE       !== 'undefined' ? IRON_DATABASE       : [];
    default: return [];
  }
}
