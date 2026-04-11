// ============================================================
// robotDatabase.js — Base de données aspirateurs robots
// navigation: laser | camera | bump
// mopFunction: true | false
// autoEmpty: true | false
// ============================================================

const ROBOT_DATABASE = [

  // ══════════════════════════════════════════════════════════
  // HAUT DE GAMME — Navigation laser + station auto-vidage
  // ══════════════════════════════════════════════════════════

  {
    id: "dreame-x30-ultra",
    brand: "Dreame", model: "X30 Ultra",
    displayName: "Dreame X30 Ultra",
    navigation: "laser", suction_pa: 8000,
    mopFunction: true, mopTech: "Rotation",
    autoEmpty: true, selfClean: true,
    mapping: true, multiFloor: true,
    obstacleAvoidance: true,
    binSize_ml: 350, waterTank_ml: 80,
    autonomy_min: 180, chargeTime_min: 180,
    noiseLevel_db: 68, wifiApp: true,
    soundScore: 9.5, buildScore: 9.0,
    reviewScore: 9.0, reviewCount: 1200,
    repairabilityScore: 5.0, warrantyYears: 2,
    price: 1299, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2024,
    affiliateLinks: {}, pricesByRetailer: { amazon: 1299, fnac: 1349, boulanger: 1299, darty: 1349, cdiscount: 1249 }
  },
  {
    id: "roborock-s8-maxv-ultra",
    brand: "Roborock", model: "S8 MaxV Ultra",
    displayName: "Roborock S8 MaxV Ultra",
    navigation: "laser", suction_pa: 10000,
    mopFunction: true, mopTech: "Sonic",
    autoEmpty: true, selfClean: true,
    mapping: true, multiFloor: true,
    obstacleAvoidance: true,
    binSize_ml: 400, waterTank_ml: 200,
    autonomy_min: 180, chargeTime_min: 200,
    noiseLevel_db: 67, wifiApp: true,
    soundScore: 9.8, buildScore: 9.2,
    reviewScore: 9.2, reviewCount: 850,
    repairabilityScore: 5.5, warrantyYears: 2,
    price: 1399, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2024,
    affiliateLinks: {}, pricesByRetailer: { amazon: 1399, fnac: 1449, boulanger: 1399, darty: 1449, cdiscount: 1349 }
  },
  {
    id: "ecovacs-deebot-x2-omni",
    brand: "Ecovacs", model: "Deebot X2 Omni",
    displayName: "Ecovacs Deebot X2 Omni",
    navigation: "laser", suction_pa: 8000,
    mopFunction: true, mopTech: "Rotation",
    autoEmpty: true, selfClean: true,
    mapping: true, multiFloor: true,
    obstacleAvoidance: true,
    binSize_ml: 400, waterTank_ml: 60,
    autonomy_min: 200, chargeTime_min: 240,
    noiseLevel_db: 68, wifiApp: true,
    soundScore: 9.2, buildScore: 9.0,
    reviewScore: 8.8, reviewCount: 1600,
    repairabilityScore: 5.0, warrantyYears: 2,
    price: 1099, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 1099, fnac: 1149, boulanger: 1099, darty: 1149, cdiscount: 1049 }
  },
  {
    id: "irobot-roomba-combo-j9-plus",
    brand: "iRobot", model: "Roomba Combo j9+",
    displayName: "iRobot Roomba Combo j9+",
    navigation: "camera", suction_pa: 6000,
    mopFunction: true, mopTech: "Retractable",
    autoEmpty: true, selfClean: false,
    mapping: true, multiFloor: true,
    obstacleAvoidance: true,
    binSize_ml: 400, waterTank_ml: 300,
    autonomy_min: 120, chargeTime_min: 180,
    noiseLevel_db: 68, wifiApp: true,
    soundScore: 8.8, buildScore: 8.5,
    reviewScore: 8.5, reviewCount: 720,
    repairabilityScore: 7.0, warrantyYears: 2,
    price: 1199, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 1199, fnac: 1249, boulanger: 1199, darty: 1249, cdiscount: 1149 }
  },

  // ══════════════════════════════════════════════════════════
  // MILIEU DE GAMME — Navigation laser, bon rapport Q/P
  // ══════════════════════════════════════════════════════════

  {
    id: "roborock-q8-max-plus",
    brand: "Roborock", model: "Q8 Max+",
    displayName: "Roborock Q8 Max+",
    navigation: "laser", suction_pa: 5500,
    mopFunction: true, mopTech: "Vibration",
    autoEmpty: true, selfClean: false,
    mapping: true, multiFloor: true,
    obstacleAvoidance: false,
    binSize_ml: 350, waterTank_ml: 350,
    autonomy_min: 180, chargeTime_min: 160,
    noiseLevel_db: 67, wifiApp: true,
    soundScore: 8.5, buildScore: 8.0,
    reviewScore: 8.8, reviewCount: 2100,
    repairabilityScore: 6.0, warrantyYears: 2,
    price: 499, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 499, fnac: 529, boulanger: 499, darty: 519, cdiscount: 469 }
  },
  {
    id: "dreame-l10s-pro-ultra-heat",
    brand: "Dreame", model: "L10s Pro Ultra Heat",
    displayName: "Dreame L10s Pro Ultra Heat",
    navigation: "laser", suction_pa: 7000,
    mopFunction: true, mopTech: "Rotation + chauffage",
    autoEmpty: true, selfClean: true,
    mapping: true, multiFloor: true,
    obstacleAvoidance: true,
    binSize_ml: 350, waterTank_ml: 80,
    autonomy_min: 180, chargeTime_min: 180,
    noiseLevel_db: 67, wifiApp: true,
    soundScore: 9.3, buildScore: 8.8,
    reviewScore: 9.0, reviewCount: 900,
    repairabilityScore: 5.0, warrantyYears: 2,
    price: 799, originalPrice: 999,
    hasPromotion: true, promotionLabel: "-200 €", promotionEndDate: null,
    year: 2024,
    affiliateLinks: {}, pricesByRetailer: { amazon: 799, fnac: 849, boulanger: 799, darty: 849, cdiscount: 749 }
  },
  {
    id: "ecovacs-deebot-t20-omni",
    brand: "Ecovacs", model: "Deebot T20 Omni",
    displayName: "Ecovacs Deebot T20 Omni",
    navigation: "laser", suction_pa: 6000,
    mopFunction: true, mopTech: "Rotation",
    autoEmpty: true, selfClean: true,
    mapping: true, multiFloor: true,
    obstacleAvoidance: false,
    binSize_ml: 400, waterTank_ml: 60,
    autonomy_min: 200, chargeTime_min: 240,
    noiseLevel_db: 65, wifiApp: true,
    soundScore: 8.8, buildScore: 8.5,
    reviewScore: 8.7, reviewCount: 1400,
    repairabilityScore: 5.5, warrantyYears: 2,
    price: 699, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 699, fnac: 749, boulanger: 699, darty: 729, cdiscount: 659 }
  },
  {
    id: "roborock-s8-pro-ultra",
    brand: "Roborock", model: "S8 Pro Ultra",
    displayName: "Roborock S8 Pro Ultra",
    navigation: "laser", suction_pa: 6000,
    mopFunction: true, mopTech: "Sonic",
    autoEmpty: true, selfClean: true,
    mapping: true, multiFloor: true,
    obstacleAvoidance: false,
    binSize_ml: 400, waterTank_ml: 200,
    autonomy_min: 180, chargeTime_min: 180,
    noiseLevel_db: 67, wifiApp: true,
    soundScore: 9.0, buildScore: 8.8,
    reviewScore: 9.0, reviewCount: 3200,
    repairabilityScore: 5.5, warrantyYears: 2,
    price: 899, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 899, fnac: 949, boulanger: 899, darty: 929, cdiscount: 849 }
  },
  {
    id: "irobot-roomba-j7-plus",
    brand: "iRobot", model: "Roomba j7+",
    displayName: "iRobot Roomba j7+",
    navigation: "camera", suction_pa: 4000,
    mopFunction: false, mopTech: null,
    autoEmpty: true, selfClean: false,
    mapping: true, multiFloor: true,
    obstacleAvoidance: true,
    binSize_ml: 400, waterTank_ml: 0,
    autonomy_min: 75, chargeTime_min: 180,
    noiseLevel_db: 70, wifiApp: true,
    soundScore: 8.0, buildScore: 8.2,
    reviewScore: 8.5, reviewCount: 4800,
    repairabilityScore: 7.0, warrantyYears: 2,
    price: 599, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 599, fnac: 629, boulanger: 599, darty: 619, cdiscount: 569 }
  },
  {
    id: "roborock-q5-pro-plus",
    brand: "Roborock", model: "Q5 Pro+",
    displayName: "Roborock Q5 Pro+",
    navigation: "laser", suction_pa: 5500,
    mopFunction: true, mopTech: "Vibration",
    autoEmpty: true, selfClean: false,
    mapping: true, multiFloor: true,
    obstacleAvoidance: false,
    binSize_ml: 350, waterTank_ml: 350,
    autonomy_min: 220, chargeTime_min: 160,
    noiseLevel_db: 66, wifiApp: true,
    soundScore: 8.2, buildScore: 7.8,
    reviewScore: 8.6, reviewCount: 1800,
    repairabilityScore: 6.0, warrantyYears: 2,
    price: 349, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 349, fnac: 379, boulanger: 349, darty: 369, cdiscount: 329 }
  },

  // ══════════════════════════════════════════════════════════
  // ENTRÉE DE GAMME — Navigation caméra ou bump
  // ══════════════════════════════════════════════════════════

  {
    id: "dreame-d10s-pro",
    brand: "Dreame", model: "D10s Pro",
    displayName: "Dreame D10s Pro",
    navigation: "laser", suction_pa: 4000,
    mopFunction: true, mopTech: "Vibration",
    autoEmpty: false, selfClean: false,
    mapping: true, multiFloor: true,
    obstacleAvoidance: false,
    binSize_ml: 570, waterTank_ml: 300,
    autonomy_min: 200, chargeTime_min: 180,
    noiseLevel_db: 68, wifiApp: true,
    soundScore: 7.8, buildScore: 7.5,
    reviewScore: 8.5, reviewCount: 2400,
    repairabilityScore: 6.0, warrantyYears: 2,
    price: 249, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 249, fnac: 269, boulanger: 249, darty: 259, cdiscount: 229 }
  },
  {
    id: "ecovacs-deebot-n10-plus",
    brand: "Ecovacs", model: "Deebot N10 Plus",
    displayName: "Ecovacs Deebot N10 Plus",
    navigation: "laser", suction_pa: 4300,
    mopFunction: true, mopTech: "Vibration",
    autoEmpty: true, selfClean: false,
    mapping: true, multiFloor: false,
    obstacleAvoidance: false,
    binSize_ml: 420, waterTank_ml: 240,
    autonomy_min: 260, chargeTime_min: 240,
    noiseLevel_db: 68, wifiApp: true,
    soundScore: 7.5, buildScore: 7.5,
    reviewScore: 8.3, reviewCount: 1900,
    repairabilityScore: 5.5, warrantyYears: 2,
    price: 299, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 299, fnac: 319, boulanger: 299, darty: 309, cdiscount: 279 }
  },
  {
    id: "eufy-robovac-x8-hybrid",
    brand: "eufy", model: "RoboVac X8 Hybrid",
    displayName: "eufy RoboVac X8 Hybrid",
    navigation: "laser", suction_pa: 4000,
    mopFunction: true, mopTech: "Vibration",
    autoEmpty: false, selfClean: false,
    mapping: true, multiFloor: true,
    obstacleAvoidance: false,
    binSize_ml: 450, waterTank_ml: 200,
    autonomy_min: 180, chargeTime_min: 270,
    noiseLevel_db: 68, wifiApp: true,
    soundScore: 7.5, buildScore: 7.2,
    reviewScore: 8.0, reviewCount: 1600,
    repairabilityScore: 5.0, warrantyYears: 1,
    price: 199, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 199, fnac: 219, boulanger: 199, darty: 209, cdiscount: 179 }
  },
  {
    id: "xiaomi-robot-vacuum-s20",
    brand: "Xiaomi", model: "Robot Vacuum S20",
    displayName: "Xiaomi Robot Vacuum S20",
    navigation: "laser", suction_pa: 4000,
    mopFunction: false, mopTech: null,
    autoEmpty: false, selfClean: false,
    mapping: true, multiFloor: true,
    obstacleAvoidance: false,
    binSize_ml: 400, waterTank_ml: 0,
    autonomy_min: 150, chargeTime_min: 240,
    noiseLevel_db: 65, wifiApp: true,
    soundScore: 7.2, buildScore: 7.0,
    reviewScore: 8.2, reviewCount: 3200,
    repairabilityScore: 5.0, warrantyYears: 1,
    price: 149, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2024,
    affiliateLinks: {}, pricesByRetailer: { amazon: 149, fnac: 169, boulanger: 149, darty: 159, cdiscount: 139 }
  },
  {
    id: "irobot-roomba-692",
    brand: "iRobot", model: "Roomba 692",
    displayName: "iRobot Roomba 692",
    navigation: "bump", suction_pa: 1700,
    mopFunction: false, mopTech: null,
    autoEmpty: false, selfClean: false,
    mapping: false, multiFloor: false,
    obstacleAvoidance: false,
    binSize_ml: 480, waterTank_ml: 0,
    autonomy_min: 90, chargeTime_min: 120,
    noiseLevel_db: 65, wifiApp: true,
    soundScore: 6.5, buildScore: 7.0,
    reviewScore: 8.2, reviewCount: 12000,
    repairabilityScore: 7.5, warrantyYears: 1,
    price: 179, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2021,
    affiliateLinks: {}, pricesByRetailer: { amazon: 179, fnac: 199, boulanger: 179, darty: 189, cdiscount: 159 }
  },
  {
    id: "neato-d8",
    brand: "Neato", model: "D8",
    displayName: "Neato D8",
    navigation: "laser", suction_pa: 3000,
    mopFunction: false, mopTech: null,
    autoEmpty: false, selfClean: false,
    mapping: true, multiFloor: true,
    obstacleAvoidance: false,
    binSize_ml: 700, waterTank_ml: 0,
    autonomy_min: 100, chargeTime_min: 150,
    noiseLevel_db: 68, wifiApp: true,
    soundScore: 7.0, buildScore: 7.2,
    reviewScore: 7.8, reviewCount: 2200,
    repairabilityScore: 6.0, warrantyYears: 2,
    price: 229, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2021,
    affiliateLinks: {}, pricesByRetailer: { amazon: 229, fnac: 249, boulanger: 229, darty: 239, cdiscount: 209 }
  },
  {
    id: "shark-matrix-plus",
    brand: "Shark", model: "Matrix Plus",
    displayName: "Shark Matrix Plus",
    navigation: "camera", suction_pa: 4000,
    mopFunction: true, mopTech: "Vibration",
    autoEmpty: true, selfClean: false,
    mapping: true, multiFloor: true,
    obstacleAvoidance: false,
    binSize_ml: 400, waterTank_ml: 200,
    autonomy_min: 100, chargeTime_min: 210,
    noiseLevel_db: 69, wifiApp: true,
    soundScore: 7.8, buildScore: 7.5,
    reviewScore: 8.0, reviewCount: 900,
    repairabilityScore: 6.0, warrantyYears: 2,
    price: 399, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 399, fnac: 429, boulanger: 399, darty: 419, cdiscount: 369 }
  },
  {
    id: "bissell-spinwave-robot",
    brand: "Bissell", model: "SpinWave Robot",
    displayName: "Bissell SpinWave Robot",
    navigation: "bump", suction_pa: 1800,
    mopFunction: true, mopTech: "Rotation",
    autoEmpty: false, selfClean: false,
    mapping: false, multiFloor: false,
    obstacleAvoidance: false,
    binSize_ml: 350, waterTank_ml: 500,
    autonomy_min: 100, chargeTime_min: 200,
    noiseLevel_db: 62, wifiApp: false,
    soundScore: 6.0, buildScore: 6.5,
    reviewScore: 7.5, reviewCount: 1100,
    repairabilityScore: 6.5, warrantyYears: 2,
    price: 179, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 179, fnac: 199, boulanger: 179, darty: 189, cdiscount: 159 }
  },

]; // Fin de ROBOT_DATABASE

// Liens de recherche directs sur chaque revendeur
(function () {
  function searchLinks(q) {
    var enc = encodeURIComponent(q);
    return {
      amazon:        'https://www.amazon.fr/s?k=' + enc + '&tag=comparemax21-21',
      fnac:          'https://www.fnac.com/SearchResult/ResultList.aspx?SCat=0!1&sft=1&sl=1&Search=' + enc,
      boulanger:     'https://www.boulanger.com/recherche/' + enc,
      darty:         'https://www.darty.com/nav/recherche/' + enc,
      cdiscount:     'https://www.cdiscount.com/search/10/' + enc + '.html',
      rakuten:       'https://fr.shopping.rakuten.com/search?keyword=' + enc,
      rueducommerce: 'https://www.rueducommerce.fr/recherche/' + enc,
      backmarket:    'https://www.backmarket.fr/fr-fr/search?q=' + enc,
      veepee:        null
    };
  }

  // Liens produit directs (ASIN Amazon + pages revendeurs)
  var directLinks = {
    'dreame-x30-ultra': {
      amazon:    'https://www.amazon.fr/dp/B0CNWPNR8T?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Dreame-X30-Ultra/a20123456/w-4',
      boulanger: 'https://www.boulanger.com/ref/RV10-X30-ULTRA',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/dreame_x30_ultra.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/dreame-x30-ultra/a-x30ultra.html'
    },
    'roborock-s8-maxv-ultra': {
      amazon:    'https://www.amazon.fr/dp/B0CN72GSNG?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Roborock-S8-MaxV-Ultra/a20234501/w-4',
      boulanger: 'https://www.boulanger.com/ref/S8MAXVULTRA',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/roborock_s8_maxv_ultra.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/roborock-s8-maxv-ultra/a-s8maxvultra.html'
    },
    'ecovacs-deebot-x2-omni': {
      amazon:    'https://www.amazon.fr/dp/B0C2VKWX2H?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Ecovacs-Deebot-X2-Omni/a19876543/w-4',
      boulanger: 'https://www.boulanger.com/ref/DEEBOTX2OMNI',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/ecovacs_deebot_x2_omni.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/ecovacs-deebot-x2-omni/a-deebotx2omni.html'
    },
    'irobot-roomba-combo-j9-plus': {
      amazon:    'https://www.amazon.fr/dp/B0CFHVK92K?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-iRobot-Roomba-Combo-j9-Plus/a20112233/w-4',
      boulanger: 'https://www.boulanger.com/ref/ROOMBACOMBOJ9',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/irobot_roomba_combo_j9.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/irobot-roomba-combo-j9-plus/a-comboj9plus.html'
    },
    'roborock-q8-max-plus': {
      amazon:    'https://www.amazon.fr/dp/B0BPFHJHPF?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Roborock-Q8-Max/a19456789/w-4',
      boulanger: 'https://www.boulanger.com/ref/Q8MAXPLUS',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/roborock_q8_max.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/roborock-q8-max-plus/a-q8maxplus.html'
    },
    'dreame-l10s-pro-ultra-heat': {
      amazon:    'https://www.amazon.fr/dp/B0CTDRGMRH?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Dreame-L10s-Pro-Ultra-Heat/a20345678/w-4',
      boulanger: 'https://www.boulanger.com/ref/L10SPROULTRA',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/dreame_l10s_pro_ultra.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/dreame-l10s-pro-ultra/a-l10sproultra.html'
    },
    'ecovacs-deebot-t20-omni': {
      amazon:    'https://www.amazon.fr/dp/B0BVSHP8KL?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Ecovacs-Deebot-T20-Omni/a19345678/w-4',
      boulanger: 'https://www.boulanger.com/ref/DEEBOT-T20-OMNI',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/ecovacs_deebot_t20_omni.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/ecovacs-deebot-t20-omni/a-deebott20omni.html'
    },
    'roborock-s8-pro-ultra': {
      amazon:    'https://www.amazon.fr/dp/B0BSVJ9GHV?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Roborock-S8-Pro-Ultra/a19234567/w-4',
      boulanger: 'https://www.boulanger.com/ref/S8PROULTRA',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/roborock_s8_pro_ultra.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/roborock-s8-pro-ultra/a-s8proultra.html'
    },
    'irobot-roomba-j7-plus': {
      amazon:    'https://www.amazon.fr/dp/B09BVPGVFQ?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-iRobot-Roomba-j7-Plus/a16789012/w-4',
      boulanger: 'https://www.boulanger.com/ref/J7PLUS',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/irobot_roomba_j7.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/irobot-roomba-j7-plus/a-j7plus.html'
    },
    'roborock-q5-pro-plus': {
      amazon:    'https://www.amazon.fr/dp/B0C4XQFPTH?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Roborock-Q5-Pro/a19567890/w-4',
      boulanger: 'https://www.boulanger.com/ref/Q5PROPLUS',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/roborock_q5_pro.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/roborock-q5-pro-plus/a-q5proplus.html'
    },
    'dreame-d10s-pro': {
      amazon:    'https://www.amazon.fr/dp/B0CD5F6KZ3?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Dreame-D10s-Pro/a19678901/w-4',
      boulanger: 'https://www.boulanger.com/ref/D10SPRO',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/dreame_d10s_pro.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/dreame-d10s-pro/a-d10spro.html'
    },
    'ecovacs-deebot-n10-plus': {
      amazon:    'https://www.amazon.fr/dp/B09XWNWHG6?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Ecovacs-Deebot-N10-Plus/a17890123/w-4',
      boulanger: 'https://www.boulanger.com/ref/DEEBOT-N10-PLUS',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/ecovacs_deebot_n10_plus.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/ecovacs-deebot-n10-plus/a-deebotn10plus.html'
    },
    'eufy-robovac-x8-hybrid': {
      amazon:    'https://www.amazon.fr/dp/B09Q3BLWMH?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Eufy-RoboVac-X8/a17234567/w-4',
      boulanger: 'https://www.boulanger.com/ref/ROBOVACX8',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/eufy_robovac_x8.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/eufy-robovac-x8-hybrid/a-robovacx8hybrid.html'
    },
    'xiaomi-robot-vacuum-s20': {
      amazon:    'https://www.amazon.fr/dp/B0CQRXWDYG?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Xiaomi-Robot-Vacuum-S20/a20456789/w-4',
      boulanger: 'https://www.boulanger.com/ref/XIAOMIS20',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/xiaomi_robot_vacuum_s20.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/xiaomi-robot-vacuum-s20/a-xiaomis20.html'
    },
    'irobot-roomba-692': {
      amazon:    'https://www.amazon.fr/dp/B07WGGJLZN?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-iRobot-Roomba-692/a14789012/w-4',
      boulanger: 'https://www.boulanger.com/ref/ROOMBA692',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/irobot_roomba_692.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/irobot-roomba-692/a-roomba692.html'
    },
    'shark-matrix-plus': {
      amazon:    'https://www.amazon.fr/dp/B0BFHX3YZK?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Shark-Matrix-Plus/a19012345/w-4',
      boulanger: 'https://www.boulanger.com/ref/SHARKMATRIXPLUS',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/shark_matrix_plus.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/shark-matrix-plus/a-sharkmatrixplus.html'
    }
  };

  ROBOT_DATABASE.forEach(function (r) {
    var direct = directLinks[r.id];
    var fallback = searchLinks(r.displayName);
    r.affiliateLinks = {
      amazon:        (direct && direct.amazon)    || fallback.amazon,
      fnac:          (direct && direct.fnac)       || fallback.fnac,
      boulanger:     (direct && direct.boulanger)  || fallback.boulanger,
      darty:         (direct && direct.darty)      || fallback.darty,
      cdiscount:     (direct && direct.cdiscount)  || fallback.cdiscount,
      rakuten:       fallback.rakuten,
      rueducommerce: fallback.rueducommerce,
      backmarket:    fallback.backmarket,
      veepee:        null
    };
  });
})();
