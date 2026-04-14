// ============================================================
// fridgeDatabase.js — Base de données réfrigérateurs
// 12 modèles : combiné · américain · design
//
// volume_l      : volume total (frigo + congélateur)
// fridgeVol_l   : volume réfrigérateur
// freezerVol_l  : volume congélateur
// type          : combi | americain | integrable | design
// noFrost       : dégivrage automatique
// energyClass   : A–G
// ============================================================

const FRIDGE_DATABASE = [

  // ===========================================================
  // PETIT BUDGET — 1-2 personnes
  // ===========================================================

  {
    id: 'candy-chics5154awh',
    brand: 'Candy', model: 'CHICS 5154AWH',
    displayName: 'Candy CHICS 5154AWH',
    type: 'combi',
    volume_l: 236, fridgeVol_l: 182, freezerVol_l: 54,
    width_cm: 54, height_cm: 144,
    noFrost: false, energyClass: 'F',
    color: 'blanc', connected: false,
    repairabilityScore: 5.8, warrantyYears: 2,
    reviewScore: 7.1, reviewCount: 412, year: 2023,
    price: 199, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 199, fnac: 209, boulanger: 199, darty: 205, cdiscount: 189 }
  },

  {
    id: 'beko-b3rcna364hxb',
    brand: 'Beko', model: 'B3RCNA364HXB',
    displayName: 'Beko B3RCNA364HXB NeoFrost',
    type: 'combi',
    volume_l: 324, fridgeVol_l: 253, freezerVol_l: 71,
    width_cm: 60, height_cm: 186,
    noFrost: true, energyClass: 'D',
    color: 'inox', connected: false,
    repairabilityScore: 6.2, warrantyYears: 2,
    reviewScore: 7.6, reviewCount: 634, year: 2024,
    price: 299, originalPrice: 349, hasPromotion: true,
    promotionLabel: 'Promo -14%', promotionEndDate: '2026-05-15',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 299, fnac: 309, boulanger: 299, darty: 305, cdiscount: 289 }
  },

  // ===========================================================
  // MILIEU DE GAMME — 2-4 personnes
  // ===========================================================

  {
    id: 'indesit-infc8ti21w',
    brand: 'Indesit', model: 'INFC8TI21W',
    displayName: 'Indesit INFC8TI21W Frost Free',
    type: 'combi',
    volume_l: 335, fridgeVol_l: 255, freezerVol_l: 80,
    width_cm: 60, height_cm: 178,
    noFrost: true, energyClass: 'E',
    color: 'blanc', connected: false,
    repairabilityScore: 6.0, warrantyYears: 2,
    reviewScore: 7.4, reviewCount: 987, year: 2024,
    price: 349, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 349, fnac: 359, boulanger: 349, darty: 355, cdiscount: 339 }
  },

  {
    id: 'gorenje-nrk6202axl4',
    brand: 'Gorenje', model: 'NRK6202AXL4',
    displayName: 'Gorenje NRK6202AXL4 AdaptTech',
    type: 'combi',
    volume_l: 300, fridgeVol_l: 229, freezerVol_l: 71,
    width_cm: 60, height_cm: 185,
    noFrost: true, energyClass: 'E',
    color: 'inox', connected: false,
    repairabilityScore: 6.3, warrantyYears: 2,
    reviewScore: 7.8, reviewCount: 523, year: 2024,
    price: 399, originalPrice: 449, hasPromotion: true,
    promotionLabel: 'Promo -11%', promotionEndDate: '2026-04-30',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 399, fnac: 409, boulanger: 399, darty: 415, cdiscount: 389 }
  },

  {
    id: 'electrolux-lnt5mf32u0',
    brand: 'Electrolux', model: 'LNT5MF32U0',
    displayName: 'Electrolux LNT5MF32U0 900',
    type: 'combi',
    volume_l: 371, fridgeVol_l: 298, freezerVol_l: 73,
    width_cm: 60, height_cm: 186,
    noFrost: true, energyClass: 'C',
    color: 'inox', connected: false,
    repairabilityScore: 6.7, warrantyYears: 2,
    reviewScore: 8.0, reviewCount: 412, year: 2024,
    price: 549, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: null, fnac: 549, boulanger: 549, darty: 559, cdiscount: 539 }
  },

  // ===========================================================
  // HAUT DE GAMME — 3-5 personnes
  // ===========================================================

  {
    id: 'samsung-rb38t775cs9',
    brand: 'Samsung', model: 'RB38T775CS9',
    displayName: 'Samsung RB38T775CS9 Bespoke',
    type: 'combi',
    volume_l: 390, fridgeVol_l: 273, freezerVol_l: 117,
    width_cm: 60, height_cm: 203,
    noFrost: true, energyClass: 'C',
    color: 'inox', connected: true,
    repairabilityScore: 6.8, warrantyYears: 2,
    reviewScore: 8.3, reviewCount: 1243, year: 2024,
    price: 599, originalPrice: 699, hasPromotion: true,
    promotionLabel: 'Promo -14%', promotionEndDate: '2026-05-31',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 599, fnac: 619, boulanger: 599, darty: 629, cdiscount: 579 }
  },

  {
    id: 'siemens-kg39nxwcf',
    brand: 'Siemens', model: 'KG39NXWCF',
    displayName: 'Siemens KG39NXWCF iQ500',
    type: 'combi',
    volume_l: 366, fridgeVol_l: 279, freezerVol_l: 87,
    width_cm: 60, height_cm: 203,
    noFrost: true, energyClass: 'C',
    color: 'blanc', connected: false,
    repairabilityScore: 7.1, warrantyYears: 2,
    reviewScore: 8.2, reviewCount: 876, year: 2024,
    price: 599, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: null, fnac: 599, boulanger: 599, darty: 619, cdiscount: null }
  },

  {
    id: 'lg-gbb72pzdmn',
    brand: 'LG', model: 'GBB72PZDMN',
    displayName: 'LG GBB72PZDMN DoorCooling',
    type: 'combi',
    volume_l: 384, fridgeVol_l: 277, freezerVol_l: 107,
    width_cm: 60, height_cm: 203,
    noFrost: true, energyClass: 'C',
    color: 'inox', connected: false,
    repairabilityScore: 7.0, warrantyYears: 2,
    reviewScore: 8.4, reviewCount: 1102, year: 2024,
    price: 649, originalPrice: 749, hasPromotion: true,
    promotionLabel: 'Promo -13%', promotionEndDate: '2026-04-30',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 649, fnac: 669, boulanger: 649, darty: 659, cdiscount: 629 }
  },

  {
    id: 'bosch-kgn39vlec',
    brand: 'Bosch', model: 'KGN39VLEC',
    displayName: 'Bosch KGN39VLEC Série 4',
    type: 'combi',
    volume_l: 366, fridgeVol_l: 279, freezerVol_l: 87,
    width_cm: 60, height_cm: 203,
    noFrost: true, energyClass: 'C',
    color: 'inox', connected: false,
    repairabilityScore: 7.3, warrantyYears: 2,
    reviewScore: 8.5, reviewCount: 2341, year: 2024,
    price: 649, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: null, fnac: 649, boulanger: 649, darty: 669, cdiscount: null }
  },

  // ===========================================================
  // PREMIUM — Américain & Design
  // ===========================================================

  {
    id: 'haier-htf508dgs7',
    brand: 'Haier', model: 'HTF-508DGS7',
    displayName: 'Haier HTF-508DGS7 Américain',
    type: 'americain',
    volume_l: 508, fridgeVol_l: 351, freezerVol_l: 157,
    width_cm: 90, height_cm: 177,
    noFrost: true, energyClass: 'E',
    color: 'inox', connected: true,
    repairabilityScore: 6.5, warrantyYears: 2,
    reviewScore: 8.1, reviewCount: 534, year: 2024,
    price: 799, originalPrice: 899, hasPromotion: true,
    promotionLabel: 'Promo -11%', promotionEndDate: '2026-05-15',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 799, fnac: 819, boulanger: 799, darty: 829, cdiscount: null }
  },

  {
    id: 'samsung-rs68a8522s9',
    brand: 'Samsung', model: 'RS68A8522S9',
    displayName: 'Samsung RS68A8522S9 Américain Family Hub',
    type: 'americain',
    volume_l: 634, fridgeVol_l: 466, freezerVol_l: 168,
    width_cm: 91, height_cm: 178,
    noFrost: true, energyClass: 'E',
    color: 'inox', connected: true,
    repairabilityScore: 6.9, warrantyYears: 2,
    reviewScore: 8.7, reviewCount: 876, year: 2024,
    price: 1099, originalPrice: 1299, hasPromotion: true,
    promotionLabel: 'Promo -15%', promotionEndDate: '2026-05-31',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: null, fnac: 1099, boulanger: 1099, darty: 1149, cdiscount: null }
  },

  {
    id: 'smeg-fab30rdg5',
    brand: 'Smeg', model: 'FAB30RDG5',
    displayName: 'Smeg FAB30RDG5 Années 50',
    type: 'design',
    volume_l: 289, fridgeVol_l: 222, freezerVol_l: 67,
    width_cm: 60, height_cm: 151,
    noFrost: false, energyClass: 'D',
    color: 'vert', connected: false,
    repairabilityScore: 6.8, warrantyYears: 2,
    reviewScore: 8.9, reviewCount: 312, year: 2024,
    price: 1399, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: null, fnac: 1399, boulanger: 1399, darty: null, cdiscount: null }
  }

];
