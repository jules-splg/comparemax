// ============================================================
// hobDatabase.js — Base de données plaques de cuisson
// 14 modèles : induction · vitrocéramique · électrique
//
// power_w      : puissance totale en watts
// burners      : nombre de foyers
// programs     : niveaux de chauffe / modes de cuisson
// hasTimer     : minuteur intégré
// hasIntegratedHood : hotte aspirante intégrée
// boostZone    : zone boost (montée rapide en température)
// bridgeFunction : zone pont (fusion de 2 foyers en 1 grand)
// flexiZone    : zone flexible (foyer adaptatif)
// childLock    : verrouillage enfant
// width_cm     : largeur en cm
// ============================================================

const HOB_DATABASE = [

  // ===========================================================
  // INDUCTION
  // ===========================================================

  {
    id: 'samsung-nz64t3706ak',
    brand: 'Samsung', model: 'NZ64T3706AK',
    displayName: 'Samsung NZ64T3706AK',
    type: 'induction',
    burners: 4, width_cm: 60,
    power_w: 7400,
    programs: 9,
    hasTimer: true,
    hasIntegratedHood: false,
    boostZone: true,
    bridgeFunction: false,
    flexiZone: false,
    childLock: true,
    connected: false,
    repairabilityScore: 6.0, warrantyYears: 2,
    reviewScore: 8.1, reviewCount: 2341, year: 2024,
    price: 249, originalPrice: 299, hasPromotion: true,
    promotionLabel: 'Promo -17%', promotionEndDate: '2026-05-15',
    image: 'https://placehold.co/300x180/1a1a2e/ffffff?text=Samsung+NZ64T3706',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 249, fnac: 259, boulanger: 249, darty: 259, cdiscount: 239 }
  },

  {
    id: 'bosch-pkn645dp1e',
    brand: 'Bosch', model: 'PKN645DP1E',
    displayName: 'Bosch PKN645DP1E Série 4',
    type: 'induction',
    burners: 4, width_cm: 60,
    power_w: 7400,
    programs: 9,
    hasTimer: true,
    hasIntegratedHood: false,
    boostZone: true,
    bridgeFunction: false,
    flexiZone: false,
    childLock: true,
    connected: false,
    repairabilityScore: 7.2, warrantyYears: 2,
    reviewScore: 8.3, reviewCount: 1876, year: 2024,
    price: 299, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    image: 'https://placehold.co/300x180/1a1a2e/ffffff?text=Bosch+PKN645DP1E',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 299, fnac: 309, boulanger: 299, darty: 299, cdiscount: 289 }
  },

  {
    id: 'siemens-eh675mfb1e',
    brand: 'Siemens', model: 'EH675MFB1E',
    displayName: 'Siemens EH675MFB1E iQ500',
    type: 'induction',
    burners: 4, width_cm: 60,
    power_w: 7400,
    programs: 17,
    hasTimer: true,
    hasIntegratedHood: false,
    boostZone: true,
    bridgeFunction: true,
    flexiZone: true,
    childLock: true,
    connected: false,
    repairabilityScore: 7.0, warrantyYears: 2,
    reviewScore: 8.5, reviewCount: 1124, year: 2024,
    price: 349, originalPrice: 399, hasPromotion: true,
    promotionLabel: 'Promo -13%', promotionEndDate: '2026-04-30',
    image: 'https://placehold.co/300x180/1a1a2e/ffffff?text=Siemens+EH675MFB1E',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 349, fnac: 359, boulanger: 349, darty: 369, cdiscount: 339 }
  },

  {
    id: 'aeg-ike64441fb',
    brand: 'AEG', model: 'IKE64441FB',
    displayName: 'AEG IKE64441FB MaxiSense',
    type: 'induction',
    burners: 4, width_cm: 60,
    power_w: 7200,
    programs: 9,
    hasTimer: true,
    hasIntegratedHood: false,
    boostZone: true,
    bridgeFunction: false,
    flexiZone: false,
    childLock: true,
    connected: false,
    repairabilityScore: 6.8, warrantyYears: 2,
    reviewScore: 8.2, reviewCount: 987, year: 2024,
    price: 279, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    image: 'https://placehold.co/300x180/1a1a2e/ffffff?text=AEG+IKE64441FB',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 279, fnac: 289, boulanger: 279, darty: 285, cdiscount: 269 }
  },

  {
    id: 'electrolux-liv6343',
    brand: 'Electrolux', model: 'LIV6343',
    displayName: 'Electrolux LIV6343 900',
    type: 'induction',
    burners: 4, width_cm: 60,
    power_w: 6200,
    programs: 9,
    hasTimer: true,
    hasIntegratedHood: false,
    boostZone: true,
    bridgeFunction: false,
    flexiZone: false,
    childLock: true,
    connected: false,
    repairabilityScore: 6.5, warrantyYears: 2,
    reviewScore: 7.9, reviewCount: 643, year: 2024,
    price: 229, originalPrice: 279, hasPromotion: true,
    promotionLabel: 'Promo -18%', promotionEndDate: '2026-05-01',
    image: 'https://placehold.co/300x180/1a1a2e/ffffff?text=Electrolux+LIV6343',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 229, fnac: 239, boulanger: 229, darty: 235, cdiscount: 219 }
  },

  {
    id: 'neff-t58fd20x0',
    brand: 'Neff', model: 'T58FD20X0',
    displayName: 'Neff T58FD20X0 FlexInduction',
    type: 'induction',
    burners: 4, width_cm: 60,
    power_w: 7400,
    programs: 17,
    hasTimer: true,
    hasIntegratedHood: false,
    boostZone: true,
    bridgeFunction: true,
    flexiZone: true,
    childLock: true,
    connected: false,
    repairabilityScore: 7.3, warrantyYears: 2,
    reviewScore: 8.7, reviewCount: 521, year: 2024,
    price: 699, originalPrice: 799, hasPromotion: true,
    promotionLabel: 'Promo -13%', promotionEndDate: '2026-05-31',
    image: 'https://placehold.co/300x180/1a1a2e/ffffff?text=Neff+T58FD20X0',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 699, fnac: 719, boulanger: 699, darty: 729, cdiscount: null }
  },

  {
    id: 'bosch-pxx875d67e',
    brand: 'Bosch', model: 'PXX875D67E',
    displayName: 'Bosch PXX875D67E Série 8 90cm',
    type: 'induction',
    burners: 5, width_cm: 90,
    power_w: 11100,
    programs: 17,
    hasTimer: true,
    hasIntegratedHood: false,
    boostZone: true,
    bridgeFunction: true,
    flexiZone: true,
    childLock: true,
    connected: true,
    repairabilityScore: 7.5, warrantyYears: 2,
    reviewScore: 9.0, reviewCount: 312, year: 2024,
    price: 1299, originalPrice: 1499, hasPromotion: true,
    promotionLabel: 'Promo -13%', promotionEndDate: '2026-04-30',
    image: 'https://placehold.co/300x180/1a1a2e/ffffff?text=Bosch+PXX875D67E',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: null, fnac: 1299, boulanger: 1299, darty: 1349, cdiscount: null }
  },

  {
    id: 'de-dietrich-dpi7692xs',
    brand: 'De Dietrich', model: 'DPI7692XS',
    displayName: 'De Dietrich DPI7692XS',
    type: 'induction',
    burners: 4, width_cm: 60,
    power_w: 7400,
    programs: 14,
    hasTimer: true,
    hasIntegratedHood: false,
    boostZone: true,
    bridgeFunction: true,
    flexiZone: false,
    childLock: true,
    connected: false,
    repairabilityScore: 7.0, warrantyYears: 2,
    reviewScore: 8.6, reviewCount: 278, year: 2024,
    price: 549, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    image: 'https://placehold.co/300x180/1a1a2e/ffffff?text=De+Dietrich+DPI7692XS',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: null, fnac: 549, boulanger: 549, darty: 569, cdiscount: null }
  },

  // ===========================================================
  // VITROCÉRAMIQUE
  // ===========================================================

  {
    id: 'bosch-pkn645pp1e',
    brand: 'Bosch', model: 'PKN645PP1E',
    displayName: 'Bosch PKN645PP1E Série 4',
    type: 'vitroceramique',
    burners: 4, width_cm: 60,
    power_w: 6300,
    programs: 7,
    hasTimer: true,
    hasIntegratedHood: false,
    boostZone: false,
    bridgeFunction: false,
    flexiZone: false,
    childLock: true,
    connected: false,
    repairabilityScore: 6.8, warrantyYears: 2,
    reviewScore: 7.8, reviewCount: 1432, year: 2024,
    price: 199, originalPrice: 249, hasPromotion: true,
    promotionLabel: 'Promo -20%', promotionEndDate: '2026-05-01',
    image: 'https://placehold.co/300x180/1a1a2e/ffffff?text=Bosch+PKN645PP1E',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 199, fnac: 209, boulanger: 199, darty: 209, cdiscount: 189 }
  },

  {
    id: 'siemens-et645fqb1e',
    brand: 'Siemens', model: 'ET645FQB1E',
    displayName: 'Siemens ET645FQB1E iQ300',
    type: 'vitroceramique',
    burners: 4, width_cm: 60,
    power_w: 6300,
    programs: 7,
    hasTimer: true,
    hasIntegratedHood: false,
    boostZone: false,
    bridgeFunction: false,
    flexiZone: false,
    childLock: true,
    connected: false,
    repairabilityScore: 6.9, warrantyYears: 2,
    reviewScore: 7.9, reviewCount: 876, year: 2024,
    price: 229, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    image: 'https://placehold.co/300x180/1a1a2e/ffffff?text=Siemens+ET645FQB1E',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 229, fnac: 239, boulanger: 229, darty: 235, cdiscount: 219 }
  },

  {
    id: 'whirlpool-akt-8090-ne',
    brand: 'Whirlpool', model: 'AKT 8090 NE',
    displayName: 'Whirlpool AKT 8090 NE',
    type: 'vitroceramique',
    burners: 4, width_cm: 60,
    power_w: 5900,
    programs: 6,
    hasTimer: false,
    hasIntegratedHood: false,
    boostZone: false,
    bridgeFunction: false,
    flexiZone: false,
    childLock: true,
    connected: false,
    repairabilityScore: 6.2, warrantyYears: 2,
    reviewScore: 7.4, reviewCount: 1102, year: 2023,
    price: 149, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    image: 'https://placehold.co/300x180/1a1a2e/ffffff?text=Whirlpool+AKT+8090',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 149, fnac: 159, boulanger: 149, darty: 155, cdiscount: 139 }
  },

  {
    id: 'aeg-hk654070fb',
    brand: 'AEG', model: 'HK654070FB',
    displayName: 'AEG HK654070FB',
    type: 'vitroceramique',
    burners: 4, width_cm: 60,
    power_w: 6200,
    programs: 7,
    hasTimer: true,
    hasIntegratedHood: false,
    boostZone: false,
    bridgeFunction: false,
    flexiZone: false,
    childLock: true,
    connected: false,
    repairabilityScore: 6.7, warrantyYears: 2,
    reviewScore: 7.7, reviewCount: 654, year: 2024,
    price: 179, originalPrice: 219, hasPromotion: true,
    promotionLabel: 'Promo -18%', promotionEndDate: '2026-05-15',
    image: 'https://placehold.co/300x180/1a1a2e/ffffff?text=AEG+HK654070FB',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 179, fnac: 189, boulanger: 179, darty: 185, cdiscount: 169 }
  },

  // ===========================================================
  // ÉLECTRIQUE
  // ===========================================================

  {
    id: 'whirlpool-wl-s7660-ne',
    brand: 'Whirlpool', model: 'WL S7660 NE',
    displayName: 'Whirlpool WL S7660 NE',
    type: 'electrique',
    burners: 4, width_cm: 60,
    power_w: 5900,
    programs: 6,
    hasTimer: false,
    hasIntegratedHood: false,
    boostZone: false,
    bridgeFunction: false,
    flexiZone: false,
    childLock: false,
    connected: false,
    repairabilityScore: 5.8, warrantyYears: 2,
    reviewScore: 6.9, reviewCount: 432, year: 2023,
    price: 129, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    image: 'https://placehold.co/300x180/1a1a2e/ffffff?text=Whirlpool+WL+S7660',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 129, fnac: 139, boulanger: 129, darty: 135, cdiscount: 119 }
  },

  {
    id: 'indesit-is-63q60-x',
    brand: 'Indesit', model: 'IS 63Q60 X',
    displayName: 'Indesit IS 63Q60 X',
    type: 'electrique',
    burners: 4, width_cm: 60,
    power_w: 5900,
    programs: 4,
    hasTimer: false,
    hasIntegratedHood: false,
    boostZone: false,
    bridgeFunction: false,
    flexiZone: false,
    childLock: false,
    connected: false,
    repairabilityScore: 5.5, warrantyYears: 2,
    reviewScore: 6.5, reviewCount: 876, year: 2023,
    price: 99, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    image: 'https://placehold.co/300x180/1a1a2e/ffffff?text=Indesit+IS+63Q60+X',
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null },
    pricesByRetailer: { amazon: 99, fnac: 109, boulanger: 99, darty: 105, cdiscount: 89 }
  }

];
