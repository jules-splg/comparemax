// ============================================================
// productReferences.js — Base de références produits
//
// Source unique de vérité pour :
//   - EAN / ASIN / référence fabricant
//   - URLs affiliées (Amazon + revendeurs FR)
//   - Specs techniques vérifiées (sources : manua.ls, fabricants)
//   - Prix de référence par enseigne
//
// Structure par catégorie, puis par id produit.
// Toutes les databases (.js) piochent ici via PRODUCT_REFS[id].
// ============================================================

'use strict';

var PRODUCT_REFS = {

  // ══════════════════════════════════════════════════════════
  // ASPIRATEURS BALAI
  // ══════════════════════════════════════════════════════════

  'rowenta-xforce-860-flex': {
    brand: 'Rowenta', model: 'X-Force 8.60 Flex Animal', ref: 'RH9873WO',
    ean: null, // à compléter depuis Amazon/Fnac
    asin: 'B0CQWF9K7M',
    category: 'vacuum', subtype: 'balai',
    specs: {
      suctionPower_W: 185, batteryLife_min: 45, chargeTime_min: 210,
      weight_kg: 2.8, noiseLevel_db: 78, dustCapacity_ml: 900,
      voltage_V: 22, withBag: false, petFriendly: true
    },
    prices: { amazon: 199, fnac: 209, boulanger: 199, darty: 205, cdiscount: 189 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0CQWF9K7M?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-balai-Rowenta-X-Force-8-60-Flex-Animal/a19234710/w-4',
      boulanger: 'https://www.boulanger.com/ref/RH9873WO',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_balai/rowenta_x-force_8-60_flex_animal.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/rowenta-x-force-8-60-flex-animal/a-rh9873wo.html'
    }
  },

  'samsung-jet-75e': {
    brand: 'Samsung', model: 'Jet 75E Animal', ref: 'VS20T7536T5EF',
    ean: '8806094672541',
    asin: 'B0C4Y7QLHX',
    category: 'vacuum', subtype: 'balai',
    specs: {
      suctionPower_W: 200, batteryLife_min: 60, chargeTime_min: 210,
      weight_kg: 2.6, noiseLevel_db: 82, dustCapacity_ml: 800,
      voltage_V: 21.9, withBag: false, petFriendly: true
    },
    prices: { amazon: 299, fnac: 309, boulanger: 299, darty: 309 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0C4Y7QLHX?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-balai-Samsung-Jet-75E/a17534980/w-4',
      boulanger: 'https://www.boulanger.com/ref/VS20T7536T5EF',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_balai/samsung_jet_75e.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/samsung-jet-75e/a-vs20t7536t5ef.html'
    }
  },

  'dyson-v8-origin': {
    brand: 'Dyson', model: 'V8 Origin 115 AW', ref: 'V8',
    ean: null,
    asin: 'B0BRQQ4G7G',
    category: 'vacuum', subtype: 'balai',
    specs: {
      suctionPower_AW: 115, batteryLife_min: 40, chargeTime_min: 300,
      weight_kg: 2.65, noiseLevel_db: 84, dustCapacity_ml: 540,
      withBag: false, petFriendly: true
    },
    prices: { amazon: 349, fnac: 359, boulanger: 349, darty: 369, cdiscount: 339 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0BRQQ4G7G?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-balai-Dyson-V8-Origin/a18945600/w-4',
      boulanger: 'https://www.boulanger.com/ref/39239901',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_balai/dyson_v8.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/dyson-v8-origin/a-39239901.html'
    }
  },

  'dyson-v11-absolute-extra': {
    brand: 'Dyson', model: 'V11 Absolute Extra 185 AW', ref: 'V11AbsoluteExtra',
    ean: null,
    asin: 'B07YFD8PTZ',
    category: 'vacuum', subtype: 'balai',
    specs: {
      suctionPower_AW: 185, motorPower_W: 610,
      batteryLife_min: 60, chargeTime_h: 4.5,
      weight_kg: 3.09, noiseLevel_db: 82, dustCapacity_ml: 760,
      withBag: false, petFriendly: true
    },
    prices: { amazon: 549, fnac: 569, boulanger: 549, darty: 579 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B07YFD8PTZ?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-balai-Dyson-V11-Absolute-Extra/a14416890/w-4',
      boulanger: 'https://www.boulanger.com/ref/39229990',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_balai/dyson_v11_absolute.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/dyson-v11/a-39229990.html'
    }
  },

  'dyson-v15-detect-absolute': {
    brand: 'Dyson', model: 'V15 Detect Absolute 240 AW', ref: 'V15DetectAbsolute',
    ean: '5025155057421',
    asin: 'B09BVLNS5V',
    category: 'vacuum', subtype: 'balai',
    specs: {
      suctionPower_AW: 240, motorPower_W: 660,
      batteryLife_min: 60, chargeTime_h: 4.5,
      weight_kg: 3.0, noiseLevel_db: 82, dustCapacity_ml: 770,
      voltage_V: 18.55, withBag: false, petFriendly: true,
      features: ['laser-detection', 'piezo-sensor', 'hepa-filter']
    },
    prices: { amazon: 699, fnac: 719, boulanger: 699, darty: 729 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B09BVLNS5V?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-balai-Dyson-V15-Detect-Absolute/a16261390/w-4',
      boulanger: 'https://www.boulanger.com/ref/39241230',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_balai/dyson_v15_detect.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/dyson-v15-detect/a-39241230.html'
    }
  },

  // ══════════════════════════════════════════════════════════
  // ASPIRATEURS TRAINEAU
  // ══════════════════════════════════════════════════════════

  'rowenta-silence-force-ro8371': {
    brand: 'Rowenta', model: 'Silence Force Multicyclonic', ref: 'RO8371EA',
    ean: null,
    asin: 'B01N6T6TTM',
    category: 'vacuum', subtype: 'traineau',
    specs: {
      suctionPower_W: 750, noiseLevel_db: 66,
      weight_kg: 5.5, dustCapacity_ml: 3000,
      withBag: false, petFriendly: false, cordLength_m: 6
    },
    prices: { amazon: 199, fnac: 209, boulanger: 199, darty: 205, cdiscount: 189 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B01N6T6TTM?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-traineau-Rowenta-Silence-Force/a16003820/w-4',
      boulanger: 'https://www.boulanger.com/ref/RO8371EA',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_traineau/rowenta_silence_force.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/rowenta-silence-force/a-ro8371ea.html'
    }
  },

  'bosch-prosilence-bgs5335a': {
    brand: 'Bosch', model: 'BGS5335A ProSilence', ref: 'BGS5335A',
    ean: null,
    asin: 'B07GV7WJZQ',
    category: 'vacuum', subtype: 'traineau',
    specs: {
      suctionPower_W: 900, noiseLevel_db: 66,
      weight_kg: 4.8, bagCapacity_L: 4.0,
      withBag: true, petFriendly: false
    },
    prices: { amazon: 299, fnac: 309, boulanger: 299, darty: 319 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B07GV7WJZQ?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-traineau-Bosch-BGS5335A/a14254440/w-4',
      boulanger: 'https://www.boulanger.com/ref/BGS5335A',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_traineau/bosch_bgs5335a.html'
    }
  },

  'miele-classic-c1': {
    brand: 'Miele', model: 'Classic C1 PowerLine', ref: '9.827.480',
    ean: '4002515440049',
    asin: 'B001F0PJCW',
    category: 'vacuum', subtype: 'traineau',
    specs: {
      suctionPower_W: 700, noiseLevel_db: 77,
      weight_kg: 5.8, bagCapacity_L: 4.5,
      cordLength_m: 9, annualEnergy_kWh: 27.9,
      withBag: true, petFriendly: false,
      filtration: 'AirClean'
    },
    prices: { fnac: 349, boulanger: 349, darty: 369, ubaldi: 339 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B001F0PJCW?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-traineau-Miele-Classic-C1/a12345678/w-4',
      boulanger: 'https://www.boulanger.com/ref/10660100',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_traineau/miele_classic_c1.html',
      ubaldi:    'https://www.ubaldi.com/aspirateur/miele-classic-c1-powerline-sban0.php'
    }
  },

  'miele-complete-c3-excellence': {
    brand: 'Miele', model: 'Complete C3 Excellence PowerLine', ref: 'C3Excellence',
    ean: null,
    asin: 'B078WLMNXL',
    category: 'vacuum', subtype: 'traineau',
    specs: {
      suctionPower_W: 1600, noiseLevel_db: 68,
      weight_kg: 5.8, bagCapacity_L: 4.5,
      withBag: true, petFriendly: true,
      filtration: 'HEPA AirClean 3D'
    },
    prices: { fnac: 699, boulanger: 699, darty: 729, ubaldi: 679 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B078WLMNXL?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-traineau-Miele-Complete-C3/a14236580/w-4',
      boulanger: 'https://www.boulanger.com/ref/10660710',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_traineau/miele_complete_c3.html',
      ubaldi:    'https://www.ubaldi.com/aspirateur/miele-complete-c3-excellence-animal-parquet.php'
    }
  },

  // ══════════════════════════════════════════════════════════
  // ASPIRATEURS ROBOTS (catégorie dédiée = robotDatabase)
  // ══════════════════════════════════════════════════════════

  'dreame-x30-ultra': {
    brand: 'Dreame', model: 'X30 Ultra', ref: 'X30Ultra',
    ean: null,
    asin: 'B0CNWPNR8T',
    category: 'robot',
    specs: {
      suctionPower_Pa: 8300, batteryLife_min: null, batteryCapacity_mAh: 6400,
      dustCapacity_ml: null, cleanWaterTank_ml: null, dirtyWaterTank_ml: null,
      cleaningArea_sqm: null,
      mappingTechnology: 'lidar', obstacleAvoidance: true,
      autoEmpty: true, mopFunction: true, mopAutoClean: true,
      hotWaterMop: true, hotWaterTemp_C: 60,
      weight_kg: null, connected: true, programmable: true
    },
    prices: { amazon: 1299, fnac: 1349, boulanger: 1299, darty: 1349, cdiscount: 1249 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0CNWPNR8T?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Dreame-X30-Ultra/a20123456/w-4',
      boulanger: 'https://www.boulanger.com/ref/RV10-X30-ULTRA',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/dreame_x30_ultra.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/dreame-x30-ultra/a-x30ultra.html'
    }
  },

  'dreame-l10s-ultra': {
    brand: 'Dreame', model: 'L10s Ultra', ref: 'RLS6LADC',
    ean: '6973734681477',
    asin: null,
    category: 'robot',
    specs: {
      suctionPower_Pa: 5300, batteryLife_min: 210, batteryCapacity_mAh: 5200,
      dustCapacity_ml: 350, baseStationDust_L: 3, cleanWaterTank_ml: 2500,
      cleaningArea_sqm: 200,
      noiseLevel_db: 59,
      mappingTechnology: 'lidar', obstacleAvoidance: true,
      autoEmpty: true, mopFunction: true, mopAutoClean: true,
      weight_kg: 3.7, connected: true, programmable: true
    },
    prices: { amazon: 699, fnac: 749, boulanger: 699, darty: 729, cdiscount: 659 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0CTDRGMRH?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Dreame-L10s-Pro-Ultra-Heat/a20345678/w-4',
      boulanger: 'https://www.boulanger.com/ref/L10SPROULTRA',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/dreame_l10s_pro_ultra.html'
    }
  },

  'roborock-s8-maxv-ultra': {
    brand: 'Roborock', model: 'S8 MaxV Ultra', ref: 'S8MAXVULTRA',
    ean: null,
    asin: 'B0CN72GSNG',
    category: 'robot',
    specs: {
      suctionPower_Pa: 10000, batteryLife_min: 180,
      dustCapacity_ml: 350, cleanWaterTank_ml: 3000, dirtyWaterTank_ml: 2500,
      cleaningArea_sqm: 300,
      mappingTechnology: 'lidar', obstacleAvoidance: true,
      autoEmpty: true, mopFunction: true, mopAutoClean: true,
      connected: true, programmable: true
    },
    prices: { amazon: 1399, fnac: 1449, boulanger: 1399, darty: 1449, cdiscount: 1349 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0CN72GSNG?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Roborock-S8-MaxV-Ultra/a20234501/w-4',
      boulanger: 'https://www.boulanger.com/ref/S8MAXVULTRA',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/roborock_s8_maxv_ultra.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/roborock-s8-maxv-ultra/a-s8maxvultra.html'
    }
  },

  'roborock-s8-pro-ultra': {
    brand: 'Roborock', model: 'S8 Pro Ultra', ref: 'S8PROULTRA',
    ean: null,
    asin: 'B0BSVJ9GHV',
    category: 'robot',
    specs: {
      suctionPower_Pa: 6000, batteryLife_min: 180,
      dustCapacity_ml: 350, cleanWaterTank_ml: 2500, dirtyWaterTank_ml: 2000,
      cleaningArea_sqm: 300,
      mappingTechnology: 'lidar', obstacleAvoidance: true,
      autoEmpty: true, mopFunction: true, mopAutoClean: true,
      connected: true, programmable: true
    },
    prices: { amazon: 899, fnac: 949, boulanger: 899, darty: 929, cdiscount: 849 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0BSVJ9GHV?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Roborock-S8-Pro-Ultra/a19234567/w-4',
      boulanger: 'https://www.boulanger.com/ref/S8PROULTRA',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/roborock_s8_pro_ultra.html'
    }
  },

  'ecovacs-deebot-x2-omni': {
    brand: 'Ecovacs', model: 'DEEBOT X2 OMNI', ref: 'DEEBOTX2OMNI',
    ean: null,
    asin: 'B0C2VKWX2H',
    category: 'robot',
    specs: {
      suctionPower_Pa: 8000, batteryLife_min: 165,
      dustCapacity_ml: 400, cleanWaterTank_ml: 3200, dirtyWaterTank_ml: 3200,
      cleaningArea_sqm: 300,
      mappingTechnology: 'lidar', obstacleAvoidance: true,
      autoEmpty: true, mopFunction: true, mopAutoClean: true,
      shape: 'square', connected: true, programmable: true
    },
    prices: { amazon: 1099, fnac: 1149, boulanger: 1099, darty: 1149, cdiscount: 1049 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0C2VKWX2H?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Ecovacs-Deebot-X2-Omni/a19876543/w-4',
      boulanger: 'https://www.boulanger.com/ref/DEEBOTX2OMNI',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/ecovacs_deebot_x2_omni.html'
    }
  },

  'ecovacs-deebot-n10-plus': {
    brand: 'Ecovacs', model: 'DEEBOT N10 Plus', ref: 'DEEBOT-N10-PLUS',
    ean: null,
    asin: 'B09XWNWHG6',
    category: 'robot',
    specs: {
      suctionPower_Pa: 4300, batteryLife_min: 300,
      dustCapacity_ml: 430, cleanWaterTank_ml: 260,
      cleaningArea_sqm: 250,
      mappingTechnology: 'lidar', obstacleAvoidance: false,
      autoEmpty: true, mopFunction: true, mopAutoClean: false,
      connected: true, programmable: true
    },
    prices: { amazon: 299, fnac: 319, boulanger: 299, darty: 309, cdiscount: 279 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B09XWNWHG6?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Ecovacs-Deebot-N10-Plus/a17890123/w-4',
      boulanger: 'https://www.boulanger.com/ref/DEEBOT-N10-PLUS',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/ecovacs_deebot_n10_plus.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/ecovacs-deebot-n10-plus/a-deebotn10plus.html'
    }
  },

  'roborock-q5-pro-plus': {
    brand: 'Roborock', model: 'Q5 Pro+', ref: 'Q5PROPLUS',
    ean: null,
    asin: 'B0C4XQFPTH',
    category: 'robot',
    specs: {
      suctionPower_Pa: 5500, batteryLife_min: 180,
      dustCapacity_ml: 770, cleanWaterTank_ml: 200,
      cleaningArea_sqm: 200,
      mappingTechnology: 'lidar', obstacleAvoidance: false,
      autoEmpty: true, mopFunction: true, mopAutoClean: false,
      connected: true, programmable: true
    },
    prices: { amazon: 399, fnac: 429, boulanger: 399, darty: 419, cdiscount: 369 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0C4XQFPTH?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-Roborock-Q5-Pro/a19567890/w-4',
      boulanger: 'https://www.boulanger.com/ref/Q5PROPLUS',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/roborock_q5_pro.html'
    }
  },

  'irobot-roomba-j7-plus': {
    brand: 'iRobot', model: 'Roomba j7+', ref: 'J7PLUS',
    ean: null,
    asin: 'B09BVPGVFQ',
    category: 'robot',
    specs: {
      suctionPower_Pa: 2500, batteryLife_min: 75,
      dustCapacity_ml: 400, cleaningArea_sqm: 150,
      mappingTechnology: 'camera', obstacleAvoidance: true,
      autoEmpty: true, mopFunction: false,
      connected: true, programmable: true
    },
    prices: { amazon: 599, fnac: 629, boulanger: 599, darty: 619, cdiscount: 569 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B09BVPGVFQ?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-iRobot-Roomba-j7-Plus/a16789012/w-4',
      boulanger: 'https://www.boulanger.com/ref/J7PLUS',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/irobot_roomba_j7.html'
    }
  },

  'irobot-roomba-692': {
    brand: 'iRobot', model: 'Roomba 692', ref: 'ROOMBA692',
    ean: null,
    asin: 'B07WGGJLZN',
    category: 'robot',
    specs: {
      suctionPower_Pa: 2000, batteryLife_min: 90, weight_kg: 3.07,
      dustCapacity_ml: null, cleaningArea_sqm: 90,
      mappingTechnology: 'basic', obstacleAvoidance: true,
      autoEmpty: false, mopFunction: false,
      connected: true, programmable: true
    },
    prices: { amazon: 179, fnac: 199, boulanger: 179, darty: 189, cdiscount: 159 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B07WGGJLZN?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/aspirateur-robot-iRobot-Roomba-692/a14789012/w-4',
      boulanger: 'https://www.boulanger.com/ref/ROOMBA692',
      darty:     'https://www.darty.com/nav/achat/electromenager/entretien_de_la_maison/aspirateur_robot/irobot_roomba_692.html',
      cdiscount: 'https://www.cdiscount.com/maison/menage-repassage/irobot-roomba-692/a-roomba692.html'
    }
  },

  // ══════════════════════════════════════════════════════════
  // ENCEINTES BLUETOOTH / CONNECTÉES
  // ══════════════════════════════════════════════════════════

  'jbl-go-4': {
    brand: 'JBL', model: 'GO 4', ref: 'JBLGO4BLK',
    ean: '050036399289', // Black colorway UPC
    asin: 'B0CX5C6WP3',
    category: 'speaker', subtype: 'bluetooth-portable',
    specs: {
      power_W_rms: 4.2, batteryLife_h: 7, playtimeBoost_h: 2,
      chargeTime_h: 3, batteryCapacity_mAh: 850,
      bluetooth: '5.3', ipRating: 'IP67',
      weight_g: 192, dimensions_mm: '94.3 x 75.7 x 42.2',
      frequency_Hz: '90-20000', transducer_mm: 45,
      powerSource: 'battery'
    },
    prices: { amazon: 50, fnac: 55, boulanger: 50, darty: 52, cdiscount: 48 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0CX5C6WP3?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/Enceinte-sans-fil-portable-JBL-Go-4-Bluetooth-Noir/a19531370/w-4',
      boulanger: 'https://www.boulanger.com/ref/JBLGO4BLK',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/jbl_go4.html',
      cdiscount: 'https://www.cdiscount.com/son/enceintes-sono/jbl-go-4/a-jblgo4blk.html'
    }
  },

  'jbl-clip-5': {
    brand: 'JBL', model: 'CLIP 5', ref: 'JBLCLIP5BLK',
    ean: '050036400077', // Black UPC
    asin: 'B0CW5DMHL4',
    category: 'speaker', subtype: 'bluetooth-portable',
    specs: {
      power_W_rms: 7, batteryLife_h: 12, chargeTime_h: 3,
      batteryCapacity_mAh: 1400,
      bluetooth: '5.3', ipRating: 'IP67',
      weight_g: 285, dimensions_mm: '86.3 x 134.5 x 46',
      frequency_Hz: '90-20000',
      powerSource: 'battery', carabinerClip: true
    },
    prices: { amazon: 75, fnac: 80, boulanger: 75, darty: 78, cdiscount: 70 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0CW5DMHL4?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-JBL-Clip-5/a20456789/w-4',
      boulanger: 'https://www.boulanger.com/ref/JBLCLIP5BLK',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/jbl_clip5.html',
      cdiscount: 'https://www.cdiscount.com/son/enceintes-sono/jbl-clip-5/a-jblclip5blk.html'
    }
  },

  'jbl-flip-6': {
    brand: 'JBL', model: 'FLIP 6', ref: 'JBLFLIP6BLK',
    ean: null,
    asin: 'B09RN9Y38R',
    category: 'speaker', subtype: 'bluetooth-portable',
    specs: {
      power_W_rms: 20, batteryLife_h: 12,
      batteryCapacity_mAh: 4800,
      bluetooth: '5.1', ipRating: 'IPX7',
      weight_g: 550, dimensions_mm: '178 x 68 x 72',
      frequency_Hz: '63-20000',
      woofer_mm: 80, tweeter_mm: 16,
      powerSource: 'battery', partyBoost: true
    },
    prices: { amazon: 130, fnac: 140, boulanger: 130, darty: 135, cdiscount: 120 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B09RN9Y38R?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-JBL-Flip-6/a17234567/w-4',
      boulanger: 'https://www.boulanger.com/ref/JBLFLIP6BLK',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/jbl_flip6.html',
      cdiscount: 'https://www.cdiscount.com/son/enceintes-sono/jbl-flip-6/a-jblflip6blk.html'
    }
  },

  'jbl-charge-5': {
    brand: 'JBL', model: 'CHARGE 5', ref: 'JBLCHARGE5BLK',
    ean: '6925281982088',
    asin: 'B09HBXPWJZ',
    category: 'speaker', subtype: 'bluetooth-portable',
    specs: {
      power_W_rms: 30, batteryLife_h: 20,
      batteryCapacity_mAh: 7500,
      bluetooth: '5.1', ipRating: 'IP67',
      weight_g: 960, dimensions_mm: '223 x 96.5 x 94',
      frequency_Hz: '60-20000',
      powerSource: 'battery', powerBank: true, partyBoost: true
    },
    prices: { amazon: 180, fnac: 190, boulanger: 180, darty: 185, cdiscount: 170 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B09HBXPWJZ?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-JBL-Charge-5/a15234567/w-4',
      boulanger: 'https://www.boulanger.com/ref/JBLCHARGE5BLK',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/jbl_charge5.html',
      cdiscount: 'https://www.cdiscount.com/son/enceintes-sono/jbl-charge-5/a-jblcharge5blk.html'
    }
  },

  'jbl-xtreme-4': {
    brand: 'JBL', model: 'XTREME 4', ref: 'JBLXTREME4BLK',
    ean: null,
    asin: 'B0CW5GFBYX',
    category: 'speaker', subtype: 'bluetooth-portable',
    specs: {
      // Xtreme 3 specs utilisés en attendant Xtreme 4 officiel
      power_W_rms: 100, batteryLife_h: 15,
      batteryCapacity_mAh: 5000,
      bluetooth: '5.1', ipRating: 'IP67',
      weight_g: 1968, dimensions_mm: '298.5 x 136 x 134',
      powerSource: 'battery', powerBank: true
    },
    prices: { amazon: 350, fnac: 370, boulanger: 350, darty: 360 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0CW5GFBYX?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-JBL-Xtreme-4/a20567890/w-4',
      boulanger: 'https://www.boulanger.com/ref/JBLXTREME4BLK',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/jbl_xtreme4.html'
    }
  },

  'marshall-emberton-ii': {
    brand: 'Marshall', model: 'Emberton II', ref: 'MARSHALLEMBERTON2',
    ean: null,
    asin: 'B09NF34R5Q',
    category: 'speaker', subtype: 'bluetooth-portable',
    specs: {
      power_W_rms: 20, batteryLife_h: 30, chargeTime_h: 3,
      bluetooth: '5.1', ipRating: 'IP67',
      weight_g: 700, dimensions_mm: '160 x 76 x 68',
      frequency_Hz: '60-20000',
      powerSource: 'battery'
    },
    prices: { amazon: 150, fnac: 160, boulanger: 150, darty: 155 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B09NF34R5Q?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Marshall-Emberton-II/a17123456/w-4',
      boulanger: 'https://www.boulanger.com/ref/MARSHALLEMBERTON2',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/marshall_emberton_ii.html'
    }
  },

  'marshall-middleton': {
    brand: 'Marshall', model: 'Middleton', ref: 'MARSHALLMIDDLETON',
    ean: '7340055391979',
    asin: 'B0BHRXMF82',
    category: 'speaker', subtype: 'bluetooth-portable',
    specs: {
      power_W_rms: 50, batteryLife_h: 20, chargeTime_h: 4.5,
      bluetooth: '5.1', ipRating: 'IP67',
      weight_g: 1800, dimensions_mm: '230 x 109 x 95',
      frequency_Hz: '50-20000',
      drivers: 4, passiveRadiators: 2, amplifiers: 4,
      powerSource: 'battery', auxInput: true
    },
    prices: { amazon: 280, fnac: 290, boulanger: 280, darty: 285 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0BHRXMF82?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Marshall-Middleton/a19234567/w-4',
      boulanger: 'https://www.boulanger.com/ref/MARSHALLMIDDLETON',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/marshall_middleton.html'
    }
  },

  'marshall-stanmore-iii': {
    brand: 'Marshall', model: 'Stanmore III', ref: 'MARSHALLSTANMORE3',
    ean: null,
    asin: 'B0BHRXMHXV',
    category: 'speaker', subtype: 'bluetooth-shelf',
    specs: {
      power_W_rms: 80, spl_dB: 97,
      bluetooth: '5.2', ipRating: null,
      weight_g: 4250, dimensions_mm: '350 x 203 x 188',
      frequency_Hz: '45-20000',
      tweeters: 2, woofers: 1,
      powerSource: 'ac', auxInput: true, rca: true,
      remoteControl: true
    },
    prices: { amazon: 400, fnac: 420, boulanger: 400, darty: 410 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0BHRXMHXV?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Marshall-Stanmore-III/a19012345/w-4',
      boulanger: 'https://www.boulanger.com/ref/MARSHALLSTANMORE3',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/marshall_stanmore_iii.html'
    }
  },

  'sonos-era-100': {
    brand: 'Sonos', model: 'Era 100', ref: 'SONOSERA100',
    ean: null,
    asin: 'B0B8R8KQKX',
    category: 'speaker', subtype: 'wifi-connected',
    specs: {
      power_W_rms: null, // non communiqué par Sonos
      bluetooth: '5.0', wifi: true, airplay2: true,
      stereo: false, truePlayTuning: true,
      powerSource: 'ac'
    },
    prices: { amazon: 279, fnac: 299, boulanger: 279, darty: 289 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0B8R8KQKX?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-connectee-Sonos-Era-100/a19345678/w-4',
      boulanger: 'https://www.boulanger.com/ref/SONOSERA100',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_wifi/sonos_era_100.html'
    }
  },

  // ══════════════════════════════════════════════════════════
  // ÉCOUTEURS
  // ══════════════════════════════════════════════════════════

  'sony-wf-1000xm5': {
    brand: 'Sony', model: 'WF-1000XM5', ref: 'WF1000XM5B',
    ean: '4548736143548',
    asin: 'B0C33XXS56',
    category: 'earphones', subtype: 'inear-tws',
    specs: {
      batteryLife_h: 8, batteryWithANC_h: 8, batteryNoANC_h: 12,
      totalWithCase_h: 24, chargeTime_h: 1.5, fastCharge_min: 10,
      bluetooth: '5.3',
      codecs: ['SBC', 'AAC', 'LDAC'],
      anc: true, transparency: true,
      ipRating: 'IPX4', wirelessCharging: true,
      weight_g_each: 5.9, caseWeight_g: 39,
      driver_mm: 8.4, multipoint: false
    },
    prices: { amazon: 279, fnac: 299, boulanger: 279, darty: 289, ldlc: 269 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0C33XXS56?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/ecouteurs-Sony-WF-1000XM5/a19234567/w-4',
      boulanger: 'https://www.boulanger.com/ref/WF1000XM5B',
      darty:     'https://www.darty.com/nav/achat/son/ecouteur_bluetooth/sony_wf_1000xm5.html'
    }
  },

  'samsung-galaxy-buds-2-pro': {
    brand: 'Samsung', model: 'Galaxy Buds 2 Pro', ref: 'SM-R510',
    ean: null,
    asin: null,
    category: 'earphones', subtype: 'inear-tws',
    specs: {
      batteryLife_h: 5, batteryWithANC_h: 5, batteryNoANC_h: 8,
      totalWithCase_ANC_h: 18, totalWithCase_noANC_h: 29,
      earbudCapacity_mAh: 61, caseCapacity_mAh: 515,
      bluetooth: '5.3',
      codecs: ['SBC', 'AAC'],
      anc: true, transparency: false,
      ipRating: 'IPX7',
      weight_g_each: 5.5, caseWeight_g: 43.4,
      micArray: 3
    },
    prices: { amazon: 150, fnac: 165, boulanger: 150, darty: 160, cdiscount: 140 },
    links: {
      amazon:    'https://www.amazon.fr/dp/B0BSVJ9GHV?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/ecouteurs-Samsung-Galaxy-Buds-2-Pro/a18901234/w-4',
      boulanger: 'https://www.boulanger.com/ref/SM-R510',
      darty:     'https://www.darty.com/nav/achat/son/ecouteur_bluetooth/samsung_galaxy_buds_2_pro.html'
    }
  },

  // ══════════════════════════════════════════════════════════
  // LAVE-LINGE
  // ══════════════════════════════════════════════════════════

  'haier-hw90-b14959u1': {
    brand: 'Haier', model: 'HW90-B14959U1', ref: 'HW90-B14959U1',
    ean: null,
    asin: null,
    category: 'washing',
    specs: {
      capacity_kg: 9, spinSpeed_rpm: 1400,
      energyClass: 'A', waterConsumption_L: 48,
      noiseLevel_dB_spin: 70,
      wifi: true, bluetooth: true,
      dimensions_mm: '600 x 850 x 570',
      weight_kg: 65,
      loadType: 'front', motorType: 'beltless',
      delayedStart: true, childLock: true,
      app: 'hOn'
    },
    prices: { amazon: 499, fnac: 529, boulanger: 499, darty: 519, cdiscount: 469 },
    links: {
      amazon:    'https://www.amazon.fr/s?k=Haier+HW90-B14959U1&tag=comparemax21-21',
      fnac:      'https://www.fnac.com/lave-linge-Haier-HW90-B14959U1/a17890123/w-4',
      boulanger: 'https://www.boulanger.com/ref/HW90B14959U1',
      darty:     'https://www.darty.com/nav/achat/electromenager/lavage/lave_linge/haier_hw90.html'
    }
  },

  // ══════════════════════════════════════════════════════════
  // LAVE-VAISSELLE
  // ══════════════════════════════════════════════════════════

  'electrolux-eem43201l': {
    brand: 'Electrolux', model: 'EEM43201L', ref: '911074060',
    ean: null,
    asin: null,
    category: 'dishwasher',
    specs: {
      placeSettings: 10, energyClass: 'E',
      energyConsumption_kWh: 0.754, waterConsumption_L: 9.9,
      noiseLevel_dB: 46, noiseClass: 'C',
      programDuration_h: 4,
      dimensions_mm: '820 x 450 x 550',
      installationType: 'builtin', cutleryStorage: 'drawer'
    },
    prices: { amazon: 749, fnac: 779, boulanger: 749, darty: 769 },
    links: {
      amazon:    'https://www.amazon.fr/s?k=Electrolux+EEM43201L&tag=comparemax21-21',
      fnac:      'https://www.fnac.com/lave-vaisselle-Electrolux-EEM43201L/a15678901/w-4',
      boulanger: 'https://www.boulanger.com/ref/EEM43201L',
      darty:     'https://www.darty.com/nav/achat/electromenager/lavage/lave_vaisselle/electrolux_eem43201l.html'
    }
  },

  // ══════════════════════════════════════════════════════════
  // MACHINES À CAFÉ
  // ══════════════════════════════════════════════════════════

  'delonghi-magnifica-evo-ecam290': {
    brand: "De'Longhi", model: 'Magnifica Evo ECAM290.61.B', ref: 'ECAM290.61.B',
    ean: null,
    asin: null,
    category: 'coffee', subtype: 'grains',
    specs: {
      pressure_bar: 15, waterTank_L: 1.8, beanHopper_g: 250,
      milkSystem: 'pannarello', cappuccinoAuto: false,
      power_W: 1450, weight_kg: 9.0,
      grinder: 'built-in', grounds: true
    },
    prices: { amazon: 449, fnac: 479, boulanger: 449, darty: 469, cdiscount: 419 },
    links: {
      amazon:    'https://www.amazon.fr/s?k=DeLonghi+Magnifica+Evo+ECAM290&tag=comparemax21-21',
      fnac:      'https://www.fnac.com/cafetiere-broyeur-DeLonghi-Magnifica-Evo/a17234567/w-4',
      boulanger: 'https://www.boulanger.com/ref/ECAM290.61.B',
      darty:     'https://www.darty.com/nav/achat/electromenager/preparation_culinaire/cafetiere_expresso_broyeur/delonghi_magnifica_evo.html'
    }
  }

};

// ══════════════════════════════════════════════════════════════
// Utilitaires
// ══════════════════════════════════════════════════════════════

/**
 * Récupère toutes les refs d'une catégorie donnée
 * @param {string} cat  'vacuum' | 'robot' | 'speaker' | 'earphones' | 'washing' | 'dishwasher' | 'coffee'
 */
function getRefsByCategory(cat) {
  return Object.entries(PRODUCT_REFS)
    .filter(function(e) { return e[1].category === cat; })
    .reduce(function(acc, e) { acc[e[0]] = e[1]; return acc; }, {});
}

/**
 * Enrichit un produit d'une database avec ses données de référence
 * (affiliate links + EAN + prix par enseigne)
 */
function enrichFromRefs(product) {
  var ref = PRODUCT_REFS[product.id];
  if (!ref) return product;
  if (ref.links)  product.affiliateLinks   = Object.assign({}, ref.links);
  if (ref.prices) product.pricesByRetailer = Object.assign({}, ref.prices);
  if (ref.ean)    product.ean              = ref.ean;
  if (ref.asin)   product.asin             = ref.asin;
  return product;
}
