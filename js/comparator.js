// ============================================================
// comparator.js - Algorithme de comparaison intelligente
//
// Ce fichier contient toute la logique qui permet de :
//   1. Filtrer les TVs selon les critères de l'utilisateur
//   2. Calculer un score de qualité pour chaque TV
//   3. Les regrouper en 3 catégories de budget
//   4. Générer des suggestions intelligentes
// ============================================================

// ------------------------------------------------------------
// HIÉRARCHIE DES TECHNOLOGIES D'IMAGE
// Plus le score est élevé, meilleure est la technologie.
// ------------------------------------------------------------
const TECH_HIERARCHY = {
  "LED":     1,
  "QLED":    3,
  "QNED":    3,
  "MiniLED": 4,
  "OLED":    5
};

// ------------------------------------------------------------
// FONCTION PRINCIPALE
// C'est cette fonction que popup.js appelle pour lancer
// toute la comparaison.
// ------------------------------------------------------------
function runComparison(database, filters) {
  // Étape 1 : Filtrer les TVs dans la fourchette de l'utilisateur
  const filtered = filterTVs(database, filters);

  // Étape 2 : Calculer le score de chaque TV filtrée
  const scored = filtered.map(tv => ({
    ...tv,
    score: calculateScore(tv, filters)
  })).sort((a, b) => b.score - a.score); // Trier du meilleur au moins bon

  // Étape 3 : Regrouper en 3 catégories selon le budget
  const grouped = groupByBudgetTiers(scored, filters.priceMax, filters.noLimit);

  // Étape 4 : Chercher les TVs légèrement au-dessus du budget
  const aboveBudgetFiltered = filters.noLimit ? [] : findAboveBudgetTVs(database, filters);

  // Étape 5 : Générer les suggestions intelligentes
  const suggestions = generateSmartSuggestions(
    scored.slice(0, 3), // On compare avec les 3 meilleures TVs dans le budget
    aboveBudgetFiltered
  );

  return {
    premium:     grouped.premium,
    value:       grouped.value,
    aboveBudget: aboveBudgetFiltered.slice(0, 5),
    suggestions: suggestions,
    totalFound:  filtered.length
  };
}

// ------------------------------------------------------------
// Filtre les TVs selon la fourchette de prix et de taille
// ------------------------------------------------------------
function filterTVs(database, filters) {
  return database.filter(tv => {
    // Filtre de taille
    if (tv.size_inches < filters.sizeMin || tv.size_inches > filters.sizeMax) {
      return false;
    }

    // Filtre de prix (si "sans limite" est coché, on ignore le prix maximum)
    if (tv.price < filters.priceMin) {
      return false;
    }
    if (!filters.noLimit && tv.price > filters.priceMax) {
      return false;
    }

    return true;
  });
}

// ------------------------------------------------------------
// Calcule le score composite d'une TV (de 0 à 10)
//
// Pondération des critères :
//   - Qualité image    : 30% (OLED > MiniLED > QLED > LED)
//   - Rapport Q/Prix   : 25% (meilleure image pour moins cher)
//   - Qualité son      : 15%
//   - Réparabilité     : 10%
//   - Avis clients     : 15%
//   - Garantie         :  5%
// ------------------------------------------------------------
function calculateScore(tv, filters) {
  // --- Critère 1 : Qualité image (0-10, déjà fourni dans la base) ---
  const imageScore = tv.imageScore;

  // --- Critère 2 : Rapport qualité/prix (0-10) ---
  // Idée : une TV OLED à 1000€ a un meilleur rapport Q/P qu'une OLED à 2000€
  // On compare l'image à ce qu'on paie, dans la fourchette de l'utilisateur.
  let valueScore;
  const priceRef = filters.noLimit ? 3000 : filters.priceMax;
  // Normalisation du prix dans la fourchette (0 = très cher, 10 = très bon marché)
  const pricePosition = 1 - Math.min((tv.price - filters.priceMin) / Math.max(priceRef - filters.priceMin, 1), 1);
  // Rapport image/prix : meilleure image + prix bas = meilleur rapport
  valueScore = Math.min(10, (imageScore * 0.5 + pricePosition * 10 * 0.5));
  // Bonus si promotion en cours
  if (tv.hasPromotion) valueScore = Math.min(10, valueScore + 0.5);

  // --- Critère 3 : Qualité son (0-10, déjà fourni dans la base) ---
  const soundScore = tv.soundScore;

  // --- Critère 4 : Indice de réparabilité (0-10, déjà fourni dans la base) ---
  const repairScore = tv.repairabilityScore;

  // --- Critère 5 : Avis clients (0-10) ---
  // Si moins de 50 avis, on réduit la confiance dans la note
  let reviewScore = tv.reviewScore;
  if (tv.reviewCount < 50) reviewScore = reviewScore * 0.7;
  else if (tv.reviewCount < 200) reviewScore = reviewScore * 0.9;

  // --- Critère 6 : Garantie (0-10) ---
  // 2 ans = 4/10, 3 ans = 6/10, 5 ans = 10/10
  const warrantyScore = Math.min(10, tv.warrantyYears * 2);

  // --- Calcul du score final ---
  const totalScore = (
    imageScore  * 0.30 +
    valueScore  * 0.25 +
    soundScore  * 0.15 +
    repairScore * 0.10 +
    reviewScore * 0.15 +
    warrantyScore * 0.05
  );

  // Arrondi à 1 décimale
  return Math.round(Math.min(10, totalScore) * 10) / 10;
}

// ------------------------------------------------------------
// Regroupe les TVs filtrées en 3 catégories de budget
// ------------------------------------------------------------
function groupByBudgetTiers(scoredTVs, priceMax, noLimit) {
  // Si l'utilisateur n'a pas de limite de budget
  if (noLimit) {
    // Tout va dans "premium", triées par score
    return {
      premium: scoredTVs.slice(0, 5),
      value:   scoredTVs.slice(5, 10)
    };
  }

  // Seuils des catégories en % du budget maximum
  const premiumMin = priceMax * 0.75;  // 75% à 100% = "Premium"
  const valueMin   = priceMax * 0.40;  // 40% à 75% = "Meilleur rapport Q/P"

  const premium = scoredTVs
    .filter(tv => tv.price >= premiumMin)
    .slice(0, 5);

  const value = scoredTVs
    .filter(tv => tv.price >= valueMin && tv.price < premiumMin)
    .slice(0, 5);

  return { premium, value };
}

// ------------------------------------------------------------
// Trouve les TVs légèrement au-dessus du budget (100% à 120%)
// Pour le 3ème tableau "Alternatives intéressantes"
// ------------------------------------------------------------
function findAboveBudgetTVs(database, filters) {
  const aboveMin = filters.priceMax;
  const aboveMax = filters.priceMax * 1.20;

  return database
    .filter(tv => {
      // Doit être dans la fourchette de taille
      if (tv.size_inches < filters.sizeMin || tv.size_inches > filters.sizeMax) return false;
      // Doit être légèrement au-dessus du budget max
      return tv.price > aboveMin && tv.price <= aboveMax;
    })
    .map(tv => ({
      ...tv,
      score: calculateScore(tv, { ...filters, noLimit: false, priceMax: aboveMax })
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

// ------------------------------------------------------------
// Génère les suggestions intelligentes
//
// Principe : si une TV coûte au maximum 10% de plus que la
// meilleure TV dans le budget, mais qu'elle est nettement
// meilleure sur au moins 2 critères, on la suggère.
// ------------------------------------------------------------
function generateSmartSuggestions(bestInBudget, aboveBudgetTVs) {
  if (bestInBudget.length === 0 || aboveBudgetTVs.length === 0) {
    return [];
  }

  const suggestions = [];
  // On utilise la meilleure TV dans le budget comme référence
  const bestRef = bestInBudget[0];

  aboveBudgetTVs.forEach(aboveTV => {
    // Vérification : au maximum 10% de plus cher
    if (aboveTV.price > bestRef.price * 1.10) return;

    const reasons = [];

    // Raison 1 : écran plus grand (au moins 5 pouces de plus)
    if (aboveTV.size_inches >= bestRef.size_inches + 5) {
      reasons.push(`écran plus grand (${aboveTV.size_inches}" vs ${bestRef.size_inches}")`);
    }

    // Raison 2 : technologie image supérieure
    const aboveTechScore = TECH_HIERARCHY[aboveTV.technology] || 1;
    const refTechScore   = TECH_HIERARCHY[bestRef.technology]  || 1;
    if (aboveTechScore > refTechScore) {
      reasons.push(`technologie image supérieure (${aboveTV.technology} vs ${bestRef.technology})`);
    }

    // Raison 3 : qualité son nettement meilleure (1.5 point de différence)
    if (aboveTV.soundScore >= bestRef.soundScore + 1.5) {
      reasons.push(`meilleur son (${aboveTV.soundScore}/10 vs ${bestRef.soundScore}/10)`);
    }

    // Raison 4 : indice de réparabilité nettement meilleur
    if (aboveTV.repairabilityScore >= bestRef.repairabilityScore + 1.5) {
      reasons.push(`meilleure réparabilité (${aboveTV.repairabilityScore}/10 vs ${bestRef.repairabilityScore}/10)`);
    }

    // On suggère seulement si au moins 2 améliorations significatives
    if (reasons.length >= 2) {
      const extraCost    = aboveTV.price - bestRef.price;
      const extraPercent = Math.round((extraCost / bestRef.price) * 100);

      suggestions.push({
        tv:           aboveTV,
        comparedTo:   bestRef,
        reasons:      reasons,
        extraCost:    extraCost,
        extraPercent: extraPercent
      });
    }
  });

  return suggestions.slice(0, 3); // Maximum 3 suggestions
}

// ------------------------------------------------------------
// Convertit un score (0-10) en libellé textuel
// ------------------------------------------------------------
function scoreToLabel(score) {
  if (score >= 9.5) return "Exceptionnel";
  if (score >= 8.5) return "Excellent";
  if (score >= 7.5) return "Très bon";
  if (score >= 6.5) return "Bon";
  if (score >= 5.5) return "Correct";
  return "Basique";
}

// ------------------------------------------------------------
// Retourne la classe CSS de couleur selon la technologie
// ------------------------------------------------------------
function getTechBadgeClass(technology) {
  const classes = {
    "OLED":    "badge-oled",
    "MiniLED": "badge-miniled",
    "QLED":    "badge-qled",
    "QNED":    "badge-qned",
    "LED":     "badge-led"
  };
  return classes[technology] || "badge-led";
}

// ============================================================
// LAVE-LINGE — Comparaison intelligente
// ============================================================

// ------------------------------------------------------------
// Fonction principale lave-linge (même structure que runComparison)
// ------------------------------------------------------------
function runWashingComparison(database, filters) {
  const filtered = filterWashingMachines(database, filters);

  const scored = filtered.map(m => ({
    ...m,
    score: calculateWashingScore(m, filters)
  })).sort((a, b) => b.score - a.score);

  const grouped = groupByBudgetTiers(scored, filters.priceMax, filters.noLimit);
  const aboveBudget = filters.noLimit ? [] : findAboveBudgetWashing(database, filters);

  return {
    premium:     grouped.premium,
    value:       grouped.value,
    aboveBudget: aboveBudget.slice(0, 5),
    suggestions: [],
    totalFound:  filtered.length
  };
}

// ------------------------------------------------------------
// Filtre les lave-linges selon les critères
// ------------------------------------------------------------
function filterWashingMachines(database, filters) {
  return database.filter(m => {
    if (m.price < filters.priceMin) return false;
    if (!filters.noLimit && m.price > filters.priceMax) return false;

    if (filters.installationType && filters.installationType !== 'all') {
      if (m.installationType !== filters.installationType) return false;
    }
    if (filters.washingFunction && filters.washingFunction !== 'all') {
      if (m.function !== filters.washingFunction) return false;
    }
    if (filters.color && filters.color !== 'all') {
      const colorMap = { 'blanc': 'white', 'noir': 'black' };
      if (filters.color === 'autre') {
        if (m.color === 'white' || m.color === 'black') return false;
      } else if (m.color !== colorMap[filters.color]) {
        return false;
      }
    }
    if (filters.capacityMin && m.capacity_kg < filters.capacityMin) return false;

    return true;
  });
}

// ------------------------------------------------------------
// Score lave-linge (0-10)
//
// Pondération :
//   Énergie         20%  (A > G)
//   Bruit           15%  (essorage : moins = mieux)
//   Rapport Q/Prix  15%
//   Réparabilité    10%
//   Vitesse essorage 10%
//   Programmes       8%
//   Avis clients     8%
//   Connectivité     5%
//   Départ différé   5%
//   Garantie         4%
// ------------------------------------------------------------
function calculateWashingScore(m, filters) {
  // Énergie (A=10, B=8, C=6, D=5, E=4, F=3, G=2)
  const energyMap = { A: 10, B: 8, C: 6, D: 5, E: 4, F: 3, G: 2 };
  const energyScore = energyMap[m.energyLabel] || 5;

  // Bruit essorage (dB) — plus silencieux = mieux
  const noiseScore = m.noiseSpin_db < 70 ? 10
    : m.noiseSpin_db < 73 ? 8
    : m.noiseSpin_db < 76 ? 6 : 4;

  // Vitesse d'essorage (rpm)
  const spinScore = m.spinSpeed_rpm >= 1600 ? 10
    : m.spinSpeed_rpm >= 1400 ? 8
    : m.spinSpeed_rpm >= 1200 ? 5 : 3;

  // Nombre de programmes
  const programsScore = m.programs >= 20 ? 10
    : m.programs >= 15 ? 8
    : m.programs >= 10 ? 6 : 4;

  // Départ différé (heures)
  const delayScore = m.delayStart_hours >= 24 ? 10
    : m.delayStart_hours >= 19 ? 8
    : m.delayStart_hours >= 12 ? 6 : 3;

  // Connectivité
  const connectedScore = m.connected ? 10 : 4;

  // Rapport qualité/prix
  const priceRef = filters.noLimit ? 2000 : filters.priceMax;
  const pricePos = 1 - Math.min((m.price - filters.priceMin) / Math.max(priceRef - filters.priceMin, 1), 1);
  const valueScore = Math.min(10, energyScore * 0.4 + pricePos * 10 * 0.6);

  // Réparabilité (0-10, déjà en base)
  const repairScore = m.repairabilityScore;

  // Avis clients
  let reviewScore = m.reviewScore;
  if (m.reviewCount < 50) reviewScore *= 0.7;
  else if (m.reviewCount < 200) reviewScore *= 0.9;

  // Garantie
  const warrantyScore = Math.min(10, m.warrantyYears * 2);

  const total = (
    energyScore    * 0.20 +
    noiseScore     * 0.15 +
    valueScore     * 0.15 +
    repairScore    * 0.10 +
    spinScore      * 0.10 +
    programsScore  * 0.08 +
    reviewScore    * 0.08 +
    connectedScore * 0.05 +
    delayScore     * 0.05 +
    warrantyScore  * 0.04
  );

  return Math.round(Math.min(10, total) * 10) / 10;
}

// ------------------------------------------------------------
// Lave-linges légèrement au-dessus du budget (100-120%)
// ------------------------------------------------------------
function findAboveBudgetWashing(database, filters) {
  const aboveMin = filters.priceMax;
  const aboveMax = filters.priceMax * 1.20;

  return database
    .filter(m => {
      if (m.price <= aboveMin || m.price > aboveMax) return false;
      if (filters.installationType && filters.installationType !== 'all') {
        if (m.installationType !== filters.installationType) return false;
      }
      if (filters.washingFunction && filters.washingFunction !== 'all') {
        if (m.function !== filters.washingFunction) return false;
      }
      if (filters.color && filters.color !== 'all') {
        const colorMap = { 'blanc': 'white', 'noir': 'black' };
        if (filters.color === 'autre') {
          if (m.color === 'white' || m.color === 'black') return false;
        } else if (m.color !== colorMap[filters.color]) {
          return false;
        }
      }
      if (filters.capacityMin && m.capacity_kg < filters.capacityMin) return false;
      return true;
    })
    .map(m => ({
      ...m,
      score: calculateWashingScore(m, { ...filters, noLimit: false, priceMax: aboveMax })
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

// ============================================================
// LAVE-VAISSELLE — Comparaison intelligente
// ============================================================

function runDishwasherComparison(database, filters) {
  const filtered = filterDishwashers(database, filters);
  const scored = filtered.map(m => ({
    ...m,
    score: calculateDishwasherScore(m, filters)
  })).sort((a, b) => b.score - a.score);

  const grouped = groupByBudgetTiers(scored, filters.priceMax, filters.noLimit);
  const aboveBudget = filters.noLimit ? [] : findAboveBudgetDishwashers(database, filters);

  return {
    premium:     grouped.premium,
    value:       grouped.value,
    aboveBudget: aboveBudget.slice(0, 5),
    suggestions: [],
    totalFound:  filtered.length
  };
}

function filterDishwashers(database, filters) {
  return database.filter(m => {
    if (m.price < filters.priceMin) return false;
    if (!filters.noLimit && m.price > filters.priceMax) return false;
    if (filters.installationType && filters.installationType !== 'all') {
      if (m.installationType !== filters.installationType) return false;
    }
    if (filters.cutleryStorage && filters.cutleryStorage !== 'all') {
      if (m.cutleryStorage !== filters.cutleryStorage) return false;
    }
    if (filters.placeSettingsMin) {
      if (m.placeSettings < filters.placeSettingsMin) return false;
    }
    return true;
  });
}

// Score lave-vaisselle (0-10)
// Pondération :
//   Énergie         25%
//   Bruit           20%
//   Consommation eau 15%
//   Rapport Q/Prix  15%
//   Réparabilité    10%
//   Programmes       5%
//   Avis clients     5%
//   Garantie         5%
function calculateDishwasherScore(m, filters) {
  // Énergie (A=10, B=8, C=6, D=5, E=4, F=3, G=2)
  const energyMap = { A: 10, B: 8, C: 6, D: 5, E: 4, F: 3, G: 2 };
  const energyScore = energyMap[m.energyLabel] || 5;

  // Bruit (dB) — moins = mieux
  const noiseScore = m.noiseLevel_db <= 38 ? 10
    : m.noiseLevel_db <= 42 ? 8
    : m.noiseLevel_db <= 45 ? 6
    : m.noiseLevel_db <= 48 ? 4 : 2;

  // Consommation eau (litres) — moins = mieux
  const waterScore = m.waterConsumption_liters <= 6 ? 10
    : m.waterConsumption_liters <= 7.5 ? 8
    : m.waterConsumption_liters <= 9 ? 6
    : m.waterConsumption_liters <= 11 ? 4 : 2;

  // Programmes
  const programsScore = m.programs >= 10 ? 10
    : m.programs >= 8 ? 8
    : m.programs >= 6 ? 6 : 4;

  // Rapport qualité/prix
  const priceRef = filters.noLimit ? 2000 : filters.priceMax;
  const pricePos = 1 - Math.min((m.price - filters.priceMin) / Math.max(priceRef - filters.priceMin, 1), 1);
  const valueScore = Math.min(10, energyScore * 0.4 + pricePos * 10 * 0.6);

  // Réparabilité
  const repairScore = m.repairabilityScore;

  // Avis clients
  let reviewScore = m.reviewScore;
  if (m.reviewCount < 50) reviewScore *= 0.7;
  else if (m.reviewCount < 200) reviewScore *= 0.9;

  // Garantie
  const warrantyScore = Math.min(10, m.warrantyYears * 2);

  const total = (
    energyScore   * 0.25 +
    noiseScore    * 0.20 +
    waterScore    * 0.15 +
    valueScore    * 0.15 +
    repairScore   * 0.10 +
    programsScore * 0.05 +
    reviewScore   * 0.05 +
    warrantyScore * 0.05
  );

  return Math.round(Math.min(10, total) * 10) / 10;
}

function findAboveBudgetDishwashers(database, filters) {
  const aboveMin = filters.priceMax;
  const aboveMax = filters.priceMax * 1.20;
  return database
    .filter(m => {
      if (m.price <= aboveMin || m.price > aboveMax) return false;
      if (filters.installationType && filters.installationType !== 'all') {
        if (m.installationType !== filters.installationType) return false;
      }
      if (filters.cutleryStorage && filters.cutleryStorage !== 'all') {
        if (m.cutleryStorage !== filters.cutleryStorage) return false;
      }
      return true;
    })
    .map(m => ({
      ...m,
      score: calculateDishwasherScore(m, { ...filters, noLimit: false, priceMax: aboveMax })
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

// ============================================================
// MACHINE À CAFÉ — Comparaison intelligente
// ============================================================

function runCoffeeComparison(database, filters) {
  const filtered = filterCoffeeMachines(database, filters);
  const scored = filtered.map(m => ({
    ...m,
    score: calculateCoffeeScore(m, filters)
  })).sort((a, b) => b.score - a.score);

  const grouped = groupByBudgetTiers(scored, filters.priceMax, filters.noLimit);
  const aboveBudget = filters.noLimit ? [] : findAboveBudgetCoffee(database, filters);

  return {
    premium:     grouped.premium,
    value:       grouped.value,
    aboveBudget: aboveBudget.slice(0, 5),
    suggestions: [],
    totalFound:  filtered.length
  };
}

function filterCoffeeMachines(database, filters) {
  return database.filter(m => {
    if (m.price < filters.priceMin) return false;
    if (!filters.noLimit && m.price > filters.priceMax) return false;
    if (filters.installationType && filters.installationType !== 'all') {
      if (m.installationType !== filters.installationType) return false;
    }
    if (filters.beanType && filters.beanType !== 'all') {
      if (m.beanType !== filters.beanType) return false;
    }
    if (filters.milkSystem === true && !m.milkSystem) return false;
    return true;
  });
}

// Score machine à café (0-10)
// Pondération :
//   Qualité café     30% (pression, type de grain)
//   Système lait     20%
//   Rapport Q/Prix   20%
//   Polyvalence      10% (programmes)
//   Réparabilité     10%
//   Avis clients     10%
function calculateCoffeeScore(m, filters) {
  // Qualité café — pression + type de grain
  const pressureScore = m.pressure_bar >= 19 ? 10
    : m.pressure_bar >= 15 ? 7 : 4;
  const grainBonus = m.beanType === 'grains' ? 2 : 0; // les grains offrent plus de fraîcheur
  const coffeeScore = Math.min(10, pressureScore * 0.8 + grainBonus);

  // Système lait
  const milkScore = m.milkSystemType === 'automatic' ? 10
    : m.milkSystemType === 'manual' ? 6
    : 0;

  // Programmes / polyvalence
  const programsScore = m.programs >= 20 ? 10
    : m.programs >= 12 ? 8
    : m.programs >= 8 ? 6
    : m.programs >= 5 ? 4 : 2;

  // Connectivité bonus
  const connectedBonus = m.connected ? 1 : 0;
  const touchBonus     = m.touchscreen ? 0.5 : 0;

  // Rapport qualité/prix
  const priceRef = filters.noLimit ? 1500 : filters.priceMax;
  const pricePos = 1 - Math.min((m.price - filters.priceMin) / Math.max(priceRef - filters.priceMin, 1), 1);
  const valueScore = Math.min(10, coffeeScore * 0.5 + pricePos * 10 * 0.5);
  if (m.hasPromotion) valueScore + 0.3;

  // Réparabilité
  const repairScore = m.repairabilityScore;

  // Avis clients
  let reviewScore = m.reviewScore;
  if (m.reviewCount < 100) reviewScore *= 0.7;
  else if (m.reviewCount < 500) reviewScore *= 0.9;

  const total = (
    coffeeScore   * 0.30 +
    milkScore     * 0.20 +
    valueScore    * 0.20 +
    programsScore * 0.10 +
    repairScore   * 0.10 +
    reviewScore   * 0.10
  ) + connectedBonus * 0.1 + touchBonus * 0.1;

  return Math.round(Math.min(10, total) * 10) / 10;
}

function findAboveBudgetCoffee(database, filters) {
  const aboveMin = filters.priceMax;
  const aboveMax = filters.priceMax * 1.20;
  return database
    .filter(m => {
      if (m.price <= aboveMin || m.price > aboveMax) return false;
      if (filters.installationType && filters.installationType !== 'all') {
        if (m.installationType !== filters.installationType) return false;
      }
      if (filters.beanType && filters.beanType !== 'all') {
        if (m.beanType !== filters.beanType) return false;
      }
      if (filters.milkSystem === true && !m.milkSystem) return false;
      return true;
    })
    .map(m => ({
      ...m,
      score: calculateCoffeeScore(m, { ...filters, noLimit: false, priceMax: aboveMax })
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

// ============================================================
// ASPIRATEUR — Comparaison intelligente
// ============================================================

function runVacuumComparison(database, filters) {
  const filtered = filterVacuums(database, filters);
  const scored = filtered.map(m => ({
    ...m,
    score: calculateVacuumScore(m, filters)
  })).sort((a, b) => b.score - a.score);

  const grouped = groupByBudgetTiers(scored, filters.priceMax, filters.noLimit);
  const aboveBudget = filters.noLimit ? [] : findAboveBudgetVacuum(database, filters);

  return {
    premium:     grouped.premium,
    value:       grouped.value,
    aboveBudget: aboveBudget.slice(0, 5),
    suggestions: [],
    totalFound:  filtered.length
  };
}

function filterVacuums(database, filters) {
  return database.filter(m => {
    // Robots are handled in their own dedicated category
    if (m.type === 'robot') return false;
    if (m.price < filters.priceMin) return false;
    if (!filters.noLimit && m.price > filters.priceMax) return false;
    if (filters.type && filters.type !== 'all' && m.type !== filters.type) return false;
    if (filters.withBag !== 'all') {
      if (m.withBag !== (filters.withBag === 'yes')) return false;
    }
    if (filters.petFriendly === 'yes' && !m.petFriendly) return false;
    return true;
  });
}

function calculateVacuumScore(m, filters) {
  if (m.type === 'balai')    return calculateBalaiScore(m, filters);
  if (m.type === 'robot')    return calculateRobotScore(m, filters);
  if (m.type === 'traineau') return calculateTraineauScore(m, filters);
  return 5;
}

// Score aspirateur-balai
// Aspiration 25% · Autonomie 20% · Poids 15% · Bruit 15% · Q/P 10% · Animaux 5% · Charge 5% · Avis 5%
function calculateBalaiScore(m, filters) {
  const suctionScore  = Math.min(10, Math.max(2, (m.suctionPower - 100) / 40));
  const batteryScore  = Math.min(10, Math.max(2, (m.batteryLife_min - 20) / 5));
  const weightScore   = Math.max(0, Math.min(10, 10 - (m.weight_kg - 2) * 3.3));
  const noiseScore    = Math.max(2, Math.min(10, 10 - (m.noiseLevel_db - 65) * 0.4));
  const petScore      = m.petFriendly ? 9 : 4;
  const chargeScore   = Math.max(2, Math.min(10, 10 - (m.chargeTime_min - 120) / 22));
  const priceRef      = filters.noLimit ? 800 : filters.priceMax;
  const pricePos      = 1 - Math.min((m.price - filters.priceMin) / Math.max(priceRef - filters.priceMin, 1), 1);
  const valueScore    = Math.min(10, suctionScore * 0.5 + pricePos * 10 * 0.5);
  if (m.hasPromotion) valueScore + 0.3;
  let reviewScore     = m.reviewScore;
  if (m.reviewCount < 100) reviewScore *= 0.7;
  else if (m.reviewCount < 500) reviewScore *= 0.9;

  return Math.round(Math.min(10, (
    suctionScore * 0.25 +
    batteryScore * 0.20 +
    weightScore  * 0.15 +
    noiseScore   * 0.15 +
    valueScore   * 0.10 +
    petScore     * 0.05 +
    chargeScore  * 0.05 +
    reviewScore  * 0.05
  )) * 10) / 10;
}

// Score aspirateur robot
// Aspiration 20% · Mapping 20% · Vidage auto 15% · Batterie 10% · Lavage 10% · Surface 10% · Q/P 8% · Bac 4% · Connecté 3%
function calculateRobotScore(m, filters) {
  const suctionScore    = Math.min(10, Math.max(2, (m.suctionPower - 1000) / 900));
  const mappingScore    = { lidar: 10, camera: 7, gyroscope: 5, basic: 3 }[m.mappingTechnology] || 3;
  const autoEmptyScore  = m.autoEmpty ? 10 : 2;
  const mopScore        = m.mopFunction ? (m.cleanWaterTank_ml >= 1000 ? 10 : m.cleanWaterTank_ml ? 7 : 5) : 2;
  const batteryScore    = Math.min(10, Math.max(2, (m.batteryLife_min - 60) / 15));
  const areaScore       = Math.min(10, Math.max(3, (m.cleaningArea_sqm - 60) / 30));
  const binScore        = Math.min(10, Math.max(2, (m.dustCapacity_ml - 200) / 80));
  const connectedScore  = m.connected ? 9 : 2;
  const priceRef        = filters.noLimit ? 1500 : filters.priceMax;
  const pricePos        = 1 - Math.min((m.price - filters.priceMin) / Math.max(priceRef - filters.priceMin, 1), 1);
  const valueScore      = Math.min(10, suctionScore * 0.4 + pricePos * 10 * 0.6);
  let reviewScore       = m.reviewScore;
  if (m.reviewCount < 100) reviewScore *= 0.7;
  else if (m.reviewCount < 500) reviewScore *= 0.9;

  return Math.round(Math.min(10, (
    suctionScore   * 0.20 +
    mappingScore   * 0.20 +
    autoEmptyScore * 0.15 +
    batteryScore   * 0.10 +
    mopScore       * 0.10 +
    areaScore      * 0.10 +
    valueScore     * 0.08 +
    binScore       * 0.04 +
    connectedScore * 0.03
  )) * 10) / 10;
}

// Score aspirateur traineau
// Aspiration 30% · Bruit 25% · Q/P 20% · Poids 10% · Réparabilité 8% · Avis 5% · Garantie 2%
function calculateTraineauScore(m, filters) {
  const suctionScore  = Math.min(10, Math.max(2, (m.suctionPower - 400) / 160));
  const noiseScore    = Math.max(2, Math.min(10, 10 - (m.noiseLevel_db - 62) * 0.4));
  const weightScore   = Math.max(0, Math.min(10, 10 - (m.weight_kg - 4) * 1.5));
  const priceRef      = filters.noLimit ? 800 : filters.priceMax;
  const pricePos      = 1 - Math.min((m.price - filters.priceMin) / Math.max(priceRef - filters.priceMin, 1), 1);
  const valueScore    = Math.min(10, suctionScore * 0.5 + pricePos * 10 * 0.5);
  const repairScore   = m.repairabilityScore;
  let reviewScore     = m.reviewScore;
  if (m.reviewCount < 100) reviewScore *= 0.7;
  else if (m.reviewCount < 500) reviewScore *= 0.9;
  const warrantyScore = Math.min(10, m.warrantyYears * 2);

  return Math.round(Math.min(10, (
    suctionScore * 0.30 +
    noiseScore   * 0.25 +
    valueScore   * 0.20 +
    weightScore  * 0.10 +
    repairScore  * 0.08 +
    reviewScore  * 0.05 +
    warrantyScore * 0.02
  )) * 10) / 10;
}

function findAboveBudgetVacuum(database, filters) {
  const aboveMax = filters.priceMax * 1.20;
  return filterVacuums(database, { ...filters, noLimit: false, priceMin: filters.priceMax, priceMax: aboveMax })
    .map(m => ({ ...m, score: calculateVacuumScore(m, { ...filters, noLimit: false, priceMax: aboveMax }) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

// ============================================================
// FER À REPASSER — Comparaison intelligente
// ============================================================

function runIronComparison(database, filters) {
  const filtered = filterIrons(database, filters);
  const scored = filtered.map(m => ({
    ...m,
    score: calculateIronScore(m, filters)
  })).sort((a, b) => b.score - a.score);

  const grouped = groupByBudgetTiers(scored, filters.priceMax, filters.noLimit);
  const aboveBudget = filters.noLimit ? [] : findAboveBudgetIron(database, filters);

  return {
    premium:     grouped.premium,
    value:       grouped.value,
    aboveBudget: aboveBudget.slice(0, 5),
    suggestions: [],
    totalFound:  filtered.length
  };
}

function filterIrons(database, filters) {
  return database.filter(m => {
    if (m.price < filters.priceMin) return false;
    if (!filters.noLimit && m.price > filters.priceMax) return false;
    if (filters.type && filters.type !== 'all' && m.type !== filters.type) return false;
    if (filters.antiCalcSystem === 'yes' && !m.antiCalcSystem) return false;
    if (filters.antiCalcSystem === 'no' && m.antiCalcSystem) return false;
    return true;
  });
}

// Score fer à repasser / centrale vapeur
// Fers : débit 30% · puissance 20% · coup vapeur 20% · réservoir 15% · Q/P 8% · anti-calc 5% · avis 2%
// Centrale : pression 25% · débit 25% · coup vapeur 20% · puissance 10% · réservoir 10% · Q/P 5% · anti-calc 3% · avis 2%
function calculateIronScore(m, filters) {
  // Débit vapeur
  const flowMin   = m.type === 'steam-station' ? 70 : 15;
  const flowRange = m.type === 'steam-station' ? 110 : 50;
  const flowScore = Math.min(10, Math.max(2, ((m.steamFlow_g_min - flowMin) / flowRange) * 8 + 2));

  // Coup de vapeur
  const boostMin   = m.type === 'steam-station' ? 300 : 80;
  const boostRange = m.type === 'steam-station' ? 450 : 220;
  const boostScore = Math.min(10, Math.max(2, ((m.steamBoost_g_min - boostMin) / boostRange) * 8 + 2));

  // Puissance (W)
  const powerMin   = m.type === 'steam-station' ? 2200 : 1800;
  const powerRange = m.type === 'steam-station' ? 600 : 1400;
  const powerScore = Math.min(10, Math.max(2, ((m.power_w - powerMin) / powerRange) * 8 + 2));

  // Réservoir
  const tankMin   = m.type === 'steam-station' ? 1000 : 150;
  const tankRange = m.type === 'steam-station' ? 1600 : 270;
  const tankScore = Math.min(10, Math.max(2, ((m.waterTank_ml - tankMin) / tankRange) * 8 + 2));

  // Pression (centrale uniquement)
  const pressureScore = m.type === 'steam-station'
    ? Math.min(10, Math.max(4, m.pressure_bar * 1.25))
    : 5;

  // Anti-calcaire
  const antiCalcScore = m.antiCalcSystem ? 8 : 3;

  // Rapport Q/P
  const priceRef   = filters.noLimit ? 500 : filters.priceMax;
  const pricePos   = 1 - Math.min((m.price - filters.priceMin) / Math.max(priceRef - filters.priceMin, 1), 1);
  const valueScore = Math.min(10, flowScore * 0.5 + pricePos * 10 * 0.5);

  let reviewScore = m.reviewScore;
  if (m.reviewCount < 100) reviewScore *= 0.7;
  else if (m.reviewCount < 500) reviewScore *= 0.9;

  var total;
  if (m.type === 'steam-station') {
    total = (
      pressureScore * 0.25 +
      flowScore     * 0.25 +
      boostScore    * 0.20 +
      powerScore    * 0.10 +
      tankScore     * 0.10 +
      valueScore    * 0.05 +
      antiCalcScore * 0.03 +
      reviewScore   * 0.02
    );
  } else {
    total = (
      flowScore     * 0.30 +
      powerScore    * 0.20 +
      boostScore    * 0.20 +
      tankScore     * 0.15 +
      valueScore    * 0.08 +
      antiCalcScore * 0.05 +
      reviewScore   * 0.02
    );
  }
  return Math.round(Math.min(10, total) * 10) / 10;
}

function findAboveBudgetIron(database, filters) {
  const aboveMax = filters.priceMax * 1.20;
  return filterIrons(database, { ...filters, noLimit: false, priceMin: filters.priceMax, priceMax: aboveMax })
    .map(m => ({ ...m, score: calculateIronScore(m, { ...filters, noLimit: false, priceMax: aboveMax }) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

// ============================================================
// ENCEINTE — Comparaison intelligente
// ============================================================

function runSpeakerComparison(database, filters) {
  const filtered = filterSpeakers(database, filters);
  const scored = filtered.map(s => ({
    ...s,
    score: calculateSpeakerScore(s, filters)
  })).sort((a, b) => b.score - a.score);

  const grouped = groupByBudgetTiers(scored, filters.priceMax, filters.noLimit);
  const aboveBudget = filters.noLimit ? [] : findAboveBudgetSpeaker(database, filters);

  return {
    premium:     grouped.premium,
    value:       grouped.value,
    aboveBudget: aboveBudget.slice(0, 5),
    totalFound:  filtered.length
  };
}

function filterSpeakers(database, filters) {
  return database.filter(s => {
    // Prix
    if (!filters.noLimit && s.price > filters.priceMax) return false;
    if (s.price < filters.priceMin) return false;

    // Type : bluetooth ou hifi
    if (filters.speakerType && filters.speakerType !== 'all') {
      if (s.type !== filters.speakerType) return false;
    }

    // Alimentation (bluetooth uniquement)
    if (filters.powerSource && filters.powerSource !== 'all' && s.type === 'bluetooth') {
      if (filters.powerSource === 'battery' && s.powerSource !== 'battery') return false;
      if (filters.powerSource === 'mains' && s.powerSource === 'battery') return false;
    }

    // Stéréo possible
    if (filters.stereoMode === true && !s.stereoMode) return false;

    // Autonomie minimale (si batterie sélectionnée)
    if (filters.powerSource === 'battery' && filters.minBattery > 0) {
      if (!s.batteryLife_h || s.batteryLife_h < filters.minBattery) return false;
    }

    // Étanchéité
    if (filters.waterproof === true && !s.waterproofing) return false;

    return true;
  });
}

// Score enceinte (0–10)
// Bluetooth batterie :  Son 35% | Autonomie 20% | Build 15% | Q/P 15% | Avis 10% | Répa 5%
// Bluetooth secteur  :  Son 40% | Build 20%     | Q/P 15%  | Avis 15% | Répa 10%
// HiFi               :  Son 45% | Build 15%     | Q/P 15%  | Avis 15% | Répa 10%
function calculateSpeakerScore(s, filters) {
  // Son
  const soundScore = s.soundScore;

  // Autonomie (batterie uniquement)
  let batteryScore = 5;
  if (s.powerSource === 'battery' && s.batteryLife_h) {
    batteryScore = s.batteryLife_h >= 24 ? 10
      : s.batteryLife_h >= 18 ? 8
      : s.batteryLife_h >= 12 ? 6
      : s.batteryLife_h >= 8  ? 4 : 2;
  }

  // Build
  const buildScore = s.buildScore;

  // Rapport Q/P
  const priceRef   = filters.noLimit ? 1500 : filters.priceMax;
  const pricePos   = 1 - Math.min((s.price - filters.priceMin) / Math.max(priceRef - filters.priceMin, 1), 1);
  const valueScore = Math.min(10, soundScore * 0.5 + pricePos * 10 * 0.5);

  // Avis
  let reviewScore = s.reviewScore;
  if (s.reviewCount < 100) reviewScore *= 0.7;
  else if (s.reviewCount < 500) reviewScore *= 0.9;

  // Réparabilité
  const repairScore = s.repairabilityScore;

  // Stéréo bonus
  const stereoBonus = s.stereoMode ? 0.3 : 0;

  // Multipoint bonus (bluetooth)
  const multipointBonus = s.multipoint ? 0.2 : 0;

  let total;
  if (s.type === 'bluetooth' && s.powerSource === 'battery') {
    total = soundScore  * 0.35 +
            batteryScore * 0.20 +
            buildScore  * 0.15 +
            valueScore  * 0.15 +
            reviewScore * 0.10 +
            repairScore * 0.05;
  } else if (s.type === 'bluetooth') {
    total = soundScore  * 0.40 +
            buildScore  * 0.20 +
            valueScore  * 0.15 +
            reviewScore * 0.15 +
            repairScore * 0.10;
  } else {
    // HiFi
    total = soundScore  * 0.45 +
            buildScore  * 0.15 +
            valueScore  * 0.15 +
            reviewScore * 0.15 +
            repairScore * 0.10;
  }

  return Math.round(Math.min(10, total + stereoBonus + multipointBonus) * 10) / 10;
}

function findAboveBudgetSpeaker(database, filters) {
  const aboveMax = filters.priceMax * 1.20;
  return filterSpeakers(database, { ...filters, noLimit: false, priceMin: filters.priceMax, priceMax: aboveMax })
    .map(s => ({ ...s, score: calculateSpeakerScore(s, { ...filters, noLimit: false, priceMax: aboveMax }) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
