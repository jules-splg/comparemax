// ============================================================
// vacuumDatabase.js — Base de données aspirateurs
// 14 modèles : 5 balai · 5 robot · 4 traineau
//
// suctionPower :
//   balai    → W (puissance moteur, 100–500)
//   robot    → Pa (2 000–10 000)
//   traineau → W (puissance moteur, 700–2 200)
// ============================================================

const VACUUM_DATABASE = [

  // ===========================================================
  // BALAI (aspirateurs-balais sans fil) — 5 modèles
  // ===========================================================

  {
    id: "rowenta-xforce-860-flex",
    brand: "Rowenta", model: "X-Force 8.60 Flex Animal",
    displayName: "Rowenta X-Force 8.60 Flex Animal",
    type: "balai", withBag: false,
    suctionPower: 180, noiseLevel_db: 78,
    petFriendly: true, connected: false,
    weight_kg: 2.8, batteryLife_min: 45, chargeTime_min: 210,
    floorTypes: ["hardFloor", "carpet", "parquet"],
    dustCapacity_ml: 900,
    cleanWaterTank_ml: null, dirtyWaterTank_ml: null,
    cleaningArea_sqm: null, programmable: null,
    autoEmpty: null, mopFunction: null,
    mappingTechnology: null, obstacleAvoidance: null,
    bagCapacity_liters: null,
    price: 199, originalPrice: 249, hasPromotion: true,
    promotionLabel: "Promo -20%", promotionEndDate: "2026-05-01",
    repairabilityScore: 6.0, warrantyYears: 2,
    reviewScore: 7.8, reviewCount: 1243, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Rowenta+X-Force+8.60",
    installment: { available: true, plans: [{ months: 3, monthlyPayment: 66.33, totalCost: 199, interestRate: 0, label: "3x sans frais" }] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 199, fnac: 209, boulanger: 199, darty: 205, cdiscount: 189 }
  },

  {
    id: "samsung-jet-75e",
    brand: "Samsung", model: "Jet 75E",
    displayName: "Samsung Jet 75E Animal",
    type: "balai", withBag: false,
    suctionPower: 200, noiseLevel_db: 82,
    petFriendly: true, connected: false,
    weight_kg: 2.6, batteryLife_min: 60, chargeTime_min: 210,
    floorTypes: ["hardFloor", "carpet", "parquet", "tile"],
    dustCapacity_ml: 800,
    cleanWaterTank_ml: null, dirtyWaterTank_ml: null,
    cleaningArea_sqm: null, programmable: null,
    autoEmpty: null, mopFunction: null,
    mappingTechnology: null, obstacleAvoidance: null,
    bagCapacity_liters: null,
    price: 299, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    repairabilityScore: 6.2, warrantyYears: 2,
    reviewScore: 8.1, reviewCount: 876, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Samsung+Jet+75E",
    installment: { available: true, plans: [{ months: 3, monthlyPayment: 99.67, totalCost: 299, interestRate: 0, label: "3x sans frais" }] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 299, fnac: 309, boulanger: 299, darty: 309 }
  },

  {
    id: "dyson-v8-origin",
    brand: "Dyson", model: "V8 Origin",
    displayName: "Dyson V8 Origin 115 AW",
    type: "balai", withBag: false,
    suctionPower: 260, noiseLevel_db: 84,
    petFriendly: true, connected: false,
    weight_kg: 2.65, batteryLife_min: 40, chargeTime_min: 300,
    floorTypes: ["hardFloor", "carpet", "parquet", "tile"],
    dustCapacity_ml: 540,
    cleanWaterTank_ml: null, dirtyWaterTank_ml: null,
    cleaningArea_sqm: null, programmable: null,
    autoEmpty: null, mopFunction: null,
    mappingTechnology: null, obstacleAvoidance: null,
    bagCapacity_liters: null,
    price: 349, originalPrice: 449, hasPromotion: true,
    promotionLabel: "Promo -22%", promotionEndDate: "2026-04-30",
    repairabilityScore: 5.8, warrantyYears: 2,
    reviewScore: 8.4, reviewCount: 4321, year: 2023,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Dyson+V8+Origin",
    installment: { available: true, plans: [{ months: 3, monthlyPayment: 116.33, totalCost: 349, interestRate: 0, label: "3x sans frais" }] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 349, fnac: 359, boulanger: 349, darty: 369, cdiscount: 339 }
  },

  {
    id: "dyson-v11-absolute-extra",
    brand: "Dyson", model: "V11 Absolute Extra",
    displayName: "Dyson V11 Absolute Extra 185 AW",
    type: "balai", withBag: false,
    suctionPower: 380, noiseLevel_db: 87,
    petFriendly: true, connected: false,
    weight_kg: 3.05, batteryLife_min: 60, chargeTime_min: 270,
    floorTypes: ["hardFloor", "carpet", "parquet", "tile"],
    dustCapacity_ml: 765,
    cleanWaterTank_ml: null, dirtyWaterTank_ml: null,
    cleaningArea_sqm: null, programmable: null,
    autoEmpty: null, mopFunction: null,
    mappingTechnology: null, obstacleAvoidance: null,
    bagCapacity_liters: null,
    price: 549, originalPrice: 699, hasPromotion: true,
    promotionLabel: "Promo -21%", promotionEndDate: "2026-05-10",
    repairabilityScore: 5.9, warrantyYears: 2,
    reviewScore: 8.7, reviewCount: 2987, year: 2023,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Dyson+V11+Absolute",
    installment: { available: true, plans: [
      { months: 3, monthlyPayment: 183.00, totalCost: 549, interestRate: 0, label: "3x sans frais" },
      { months: 10, monthlyPayment: 57.40, totalCost: 574, interestRate: 4, label: "10x avec frais" }
    ]},
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 549, fnac: 569, boulanger: 549, darty: 579 }
  },

  {
    id: "dyson-v15-detect-absolute",
    brand: "Dyson", model: "V15 Detect Absolute",
    displayName: "Dyson V15 Detect Absolute 240 AW",
    type: "balai", withBag: false,
    suctionPower: 480, noiseLevel_db: 84,
    petFriendly: true, connected: false,
    weight_kg: 3.1, batteryLife_min: 60, chargeTime_min: 270,
    floorTypes: ["hardFloor", "carpet", "parquet", "tile"],
    dustCapacity_ml: 765,
    cleanWaterTank_ml: null, dirtyWaterTank_ml: null,
    cleaningArea_sqm: null, programmable: null,
    autoEmpty: null, mopFunction: null,
    mappingTechnology: null, obstacleAvoidance: null,
    bagCapacity_liters: null,
    price: 699, originalPrice: 799, hasPromotion: true,
    promotionLabel: "Offre -13%", promotionEndDate: "2026-06-01",
    repairabilityScore: 6.0, warrantyYears: 2,
    reviewScore: 9.0, reviewCount: 1843, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Dyson+V15+Detect",
    installment: { available: true, plans: [
      { months: 3, monthlyPayment: 233.00, totalCost: 699, interestRate: 0, label: "3x sans frais" },
      { months: 10, monthlyPayment: 73.10, totalCost: 731, interestRate: 4, label: "10x avec frais" }
    ]},
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 699, fnac: 719, boulanger: 699, darty: 729 }
  },

  // ===========================================================
  // ROBOT — 5 modèles
  // suctionPower en Pa
  // ===========================================================

  {
    id: "irobot-roomba-694",
    brand: "iRobot", model: "Roomba 694",
    displayName: "iRobot Roomba 694 Wi-Fi",
    type: "robot", withBag: false,
    suctionPower: 2000, noiseLevel_db: 67,
    petFriendly: true, connected: true,
    weight_kg: 3.4, batteryLife_min: 90, chargeTime_min: 120,
    floorTypes: ["hardFloor", "carpet", "parquet", "tile"],
    dustCapacity_ml: 600,
    cleanWaterTank_ml: null, dirtyWaterTank_ml: null,
    cleaningArea_sqm: 90,
    programmable: true, autoEmpty: false, mopFunction: false,
    mappingTechnology: "basic", obstacleAvoidance: false,
    bagCapacity_liters: null,
    price: 249, originalPrice: 299, hasPromotion: true,
    promotionLabel: "Promo -17%", promotionEndDate: "2026-04-30",
    repairabilityScore: 6.5, warrantyYears: 2,
    reviewScore: 7.6, reviewCount: 5431, year: 2023,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=iRobot+Roomba+694",
    installment: { available: true, plans: [{ months: 3, monthlyPayment: 83.00, totalCost: 249, interestRate: 0, label: "3x sans frais" }] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 249, fnac: 259, boulanger: 249, darty: 259, cdiscount: 239 }
  },

  {
    id: "roborock-q5-plus",
    brand: "Roborock", model: "Q5+",
    displayName: "Roborock Q5+ Lidar + Vidage auto",
    type: "robot", withBag: false,
    suctionPower: 2700, noiseLevel_db: 68,
    petFriendly: true, connected: true,
    weight_kg: 3.5, batteryLife_min: 180, chargeTime_min: 360,
    floorTypes: ["hardFloor", "carpet", "parquet", "tile"],
    dustCapacity_ml: 770,
    cleanWaterTank_ml: null, dirtyWaterTank_ml: null,
    cleaningArea_sqm: 200,
    programmable: true, autoEmpty: true, mopFunction: false,
    mappingTechnology: "lidar", obstacleAvoidance: false,
    bagCapacity_liters: null,
    price: 399, originalPrice: 499, hasPromotion: true,
    promotionLabel: "Promo -20%", promotionEndDate: "2026-05-01",
    repairabilityScore: 6.8, warrantyYears: 2,
    reviewScore: 8.3, reviewCount: 2134, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Roborock+Q5+Plus",
    installment: { available: true, plans: [
      { months: 3, monthlyPayment: 133.00, totalCost: 399, interestRate: 0, label: "3x sans frais" },
      { months: 10, monthlyPayment: 41.80, totalCost: 418, interestRate: 4, label: "10x avec frais" }
    ]},
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 399, fnac: 409, boulanger: 399, darty: 419 }
  },

  {
    id: "ecovacs-deebot-n8-pro-plus",
    brand: "Ecovacs", model: "DEEBOT N8 Pro+",
    displayName: "Ecovacs DEEBOT N8 Pro+ Lidar Lavage",
    type: "robot", withBag: false,
    suctionPower: 2600, noiseLevel_db: 70,
    petFriendly: true, connected: true,
    weight_kg: 3.8, batteryLife_min: 110, chargeTime_min: 360,
    floorTypes: ["hardFloor", "carpet", "parquet", "tile"],
    dustCapacity_ml: 420,
    cleanWaterTank_ml: 240, dirtyWaterTank_ml: null,
    cleaningArea_sqm: 160,
    programmable: true, autoEmpty: true, mopFunction: true,
    mappingTechnology: "lidar", obstacleAvoidance: true,
    bagCapacity_liters: null,
    price: 499, originalPrice: 599, hasPromotion: true,
    promotionLabel: "Offre -17%", promotionEndDate: "2026-05-15",
    repairabilityScore: 6.5, warrantyYears: 2,
    reviewScore: 8.0, reviewCount: 987, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Ecovacs+N8+Pro+",
    installment: { available: true, plans: [
      { months: 3, monthlyPayment: 166.33, totalCost: 499, interestRate: 0, label: "3x sans frais" },
      { months: 10, monthlyPayment: 52.10, totalCost: 521, interestRate: 4, label: "10x avec frais" }
    ]},
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 499, fnac: 509, boulanger: 499, darty: 519 }
  },

  {
    id: "roborock-s7-maxv-ultra",
    brand: "Roborock", model: "S7 MaxV Ultra",
    displayName: "Roborock S7 MaxV Ultra Lavage auto + Vidage auto",
    type: "robot", withBag: false,
    suctionPower: 5100, noiseLevel_db: 68,
    petFriendly: true, connected: true,
    weight_kg: 4.3, batteryLife_min: 180, chargeTime_min: 180,
    floorTypes: ["hardFloor", "carpet", "parquet", "tile"],
    dustCapacity_ml: 350,
    cleanWaterTank_ml: 3000, dirtyWaterTank_ml: 2500,
    cleaningArea_sqm: 300,
    programmable: true, autoEmpty: true, mopFunction: true,
    mappingTechnology: "lidar", obstacleAvoidance: true,
    bagCapacity_liters: null,
    price: 999, originalPrice: 1299, hasPromotion: true,
    promotionLabel: "Promo -23%", promotionEndDate: "2026-06-01",
    repairabilityScore: 6.8, warrantyYears: 2,
    reviewScore: 8.8, reviewCount: 1243, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Roborock+S7+MaxV+Ultra",
    installment: { available: true, plans: [
      { months: 3, monthlyPayment: 333.00, totalCost: 999, interestRate: 0, label: "3x sans frais" },
      { months: 10, monthlyPayment: 104.50, totalCost: 1045, interestRate: 4, label: "10x avec frais" },
      { months: 20, monthlyPayment: 54.10, totalCost: 1082, interestRate: 8, label: "20x avec frais" }
    ]},
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 999, fnac: 1019, boulanger: 999, darty: 1049 }
  },

  {
    id: "ecovacs-deebot-t20-omni",
    brand: "Ecovacs", model: "DEEBOT T20 OMNI",
    displayName: "Ecovacs DEEBOT T20 OMNI Station tout-en-un",
    type: "robot", withBag: false,
    suctionPower: 6000, noiseLevel_db: 70,
    petFriendly: true, connected: true,
    weight_kg: 4.6, batteryLife_min: 200, chargeTime_min: 180,
    floorTypes: ["hardFloor", "carpet", "parquet", "tile"],
    dustCapacity_ml: 420,
    cleanWaterTank_ml: 4000, dirtyWaterTank_ml: 3500,
    cleaningArea_sqm: 350,
    programmable: true, autoEmpty: true, mopFunction: true,
    mappingTechnology: "lidar", obstacleAvoidance: true,
    bagCapacity_liters: null,
    price: 1299, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    repairabilityScore: 6.5, warrantyYears: 2,
    reviewScore: 9.0, reviewCount: 876, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Ecovacs+T20+OMNI",
    installment: { available: true, plans: [
      { months: 3, monthlyPayment: 433.00, totalCost: 1299, interestRate: 0, label: "3x sans frais" },
      { months: 10, monthlyPayment: 135.80, totalCost: 1358, interestRate: 4, label: "10x avec frais" },
      { months: 20, monthlyPayment: 70.30, totalCost: 1406, interestRate: 8, label: "20x avec frais" }
    ]},
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 1299, fnac: 1319, boulanger: 1299, darty: 1349 }
  },

  // ===========================================================
  // TRAINEAU — 4 modèles
  // suctionPower en W (puissance moteur)
  // ===========================================================

  {
    id: "rowenta-silence-force-ro8371",
    brand: "Rowenta", model: "RO8371EA Silence Force",
    displayName: "Rowenta Silence Force Multicyclonic",
    type: "traineau", withBag: false,
    suctionPower: 750, noiseLevel_db: 66,
    petFriendly: false, connected: false,
    weight_kg: 5.5, batteryLife_min: null, chargeTime_min: null,
    floorTypes: ["hardFloor", "carpet", "parquet", "tile"],
    dustCapacity_ml: 3000,
    cleanWaterTank_ml: null, dirtyWaterTank_ml: null,
    cleaningArea_sqm: null, programmable: null,
    autoEmpty: null, mopFunction: null,
    mappingTechnology: null, obstacleAvoidance: null,
    bagCapacity_liters: null,
    price: 199, originalPrice: 249, hasPromotion: true,
    promotionLabel: "Promo -20%", promotionEndDate: "2026-05-01",
    repairabilityScore: 7.0, warrantyYears: 2,
    reviewScore: 8.0, reviewCount: 1542, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Rowenta+Silence+Force",
    installment: { available: true, plans: [{ months: 3, monthlyPayment: 66.33, totalCost: 199, interestRate: 0, label: "3x sans frais" }] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 199, fnac: 209, boulanger: 199, darty: 205, cdiscount: 189 }
  },

  {
    id: "bosch-prosilence-bgs5335a",
    brand: "Bosch", model: "BGS5335A ProSilence",
    displayName: "Bosch ProSilence 66 dB Avec sac 4 L",
    type: "traineau", withBag: true,
    suctionPower: 900, noiseLevel_db: 66,
    petFriendly: false, connected: false,
    weight_kg: 4.8, batteryLife_min: null, chargeTime_min: null,
    floorTypes: ["hardFloor", "carpet", "parquet", "tile"],
    dustCapacity_ml: null,
    cleanWaterTank_ml: null, dirtyWaterTank_ml: null,
    cleaningArea_sqm: null, programmable: null,
    autoEmpty: null, mopFunction: null,
    mappingTechnology: null, obstacleAvoidance: null,
    bagCapacity_liters: 4.0,
    price: 299, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    repairabilityScore: 7.2, warrantyYears: 2,
    reviewScore: 8.2, reviewCount: 743, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Bosch+ProSilence",
    installment: { available: true, plans: [{ months: 3, monthlyPayment: 99.67, totalCost: 299, interestRate: 0, label: "3x sans frais" }] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 299, fnac: 309, boulanger: 299, darty: 319 }
  },

  {
    id: "miele-classic-c1",
    brand: "Miele", model: "Classic C1 PowerLine",
    displayName: "Miele Classic C1 PowerLine Avec sac 4,5 L",
    type: "traineau", withBag: true,
    suctionPower: 890, noiseLevel_db: 76,
    petFriendly: false, connected: false,
    weight_kg: 4.7, batteryLife_min: null, chargeTime_min: null,
    floorTypes: ["hardFloor", "carpet", "parquet", "tile"],
    dustCapacity_ml: null,
    cleanWaterTank_ml: null, dirtyWaterTank_ml: null,
    cleaningArea_sqm: null, programmable: null,
    autoEmpty: null, mopFunction: null,
    mappingTechnology: null, obstacleAvoidance: null,
    bagCapacity_liters: 4.5,
    price: 349, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    repairabilityScore: 8.5, warrantyYears: 2,
    reviewScore: 8.5, reviewCount: 987, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Miele+Classic+C1",
    installment: { available: true, plans: [
      { months: 3, monthlyPayment: 116.33, totalCost: 349, interestRate: 0, label: "3x sans frais" },
      { months: 10, monthlyPayment: 36.50, totalCost: 365, interestRate: 4, label: "10x avec frais" }
    ]},
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { fnac: 349, boulanger: 349, darty: 369, ubaldi: 339 }
  },

  {
    id: "miele-complete-c3-excellence",
    brand: "Miele", model: "Complete C3 Excellence PowerLine",
    displayName: "Miele Complete C3 Excellence Animal+Parquet",
    type: "traineau", withBag: true,
    suctionPower: 1600, noiseLevel_db: 68,
    petFriendly: true, connected: false,
    weight_kg: 5.8, batteryLife_min: null, chargeTime_min: null,
    floorTypes: ["hardFloor", "carpet", "parquet", "tile"],
    dustCapacity_ml: null,
    cleanWaterTank_ml: null, dirtyWaterTank_ml: null,
    cleaningArea_sqm: null, programmable: null,
    autoEmpty: null, mopFunction: null,
    mappingTechnology: null, obstacleAvoidance: null,
    bagCapacity_liters: 4.5,
    price: 699, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    repairabilityScore: 9.0, warrantyYears: 2,
    reviewScore: 9.1, reviewCount: 1243, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Miele+C3+Excellence",
    installment: { available: true, plans: [
      { months: 3, monthlyPayment: 233.00, totalCost: 699, interestRate: 0, label: "3x sans frais" },
      { months: 10, monthlyPayment: 73.10, totalCost: 731, interestRate: 4, label: "10x avec frais" }
    ]},
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { fnac: 699, boulanger: 699, darty: 729, ubaldi: 679 }
  }

]; // Fin de VACUUM_DATABASE

// Liens de recherche réels
(function () {
  function searchLinks(q) {
    var e = encodeURIComponent(q);
    return {
      amazon:       'https://www.amazon.fr/s?k=' + e,
      fnac:         'https://www.fnac.com/SearchResult/ResultSet.aspx?Search=' + e,
      boulanger:    'https://www.boulanger.com/recherche/' + e,
      darty:        'https://www.darty.com/nav/extra/search?text=' + e,
      cdiscount:    'https://www.cdiscount.com/search/10/' + e + '.html',
      leclerc:      'https://www.e.leclerc/recherche?q=' + e,
      but:          'https://www.but.fr/recherche?q=' + e,
      electrodepot: 'https://www.electrodepot.fr/recherche?s=' + e,
      ubaldi:       'https://www.ubaldi.com/recherche/' + e + '.php',
      veepee:       null
    };
  }
  VACUUM_DATABASE.forEach(function (v) {
    v.affiliateLinks = searchLinks(v.brand + ' ' + v.model);
  });
})();
