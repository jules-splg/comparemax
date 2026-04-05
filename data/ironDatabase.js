// ============================================================
// ironDatabase.js — Base de données fers à repasser
// 14 modèles : 7 fers à repasser · 7 centrales vapeur
//
// steamFlow_g_min    : débit vapeur continu (g/min)
// steamBoost_g_min   : coup de vapeur (g/min)
// waterTank_ml       : réservoir d'eau
// pressure_bar       : pression vapeur (surtout pour centrales)
// power_w            : puissance totale en Watts
// ============================================================

const IRON_DATABASE = [

  // ===========================================================
  // FERS À REPASSER — 7 modèles
  // ===========================================================

  {
    id: "tefal-fv2660-ultraglide",
    brand: "Tefal", model: "FV2660 Ultraglide",
    displayName: "Tefal FV2660 Ultraglide",
    type: "iron",
    steamFlow_g_min: 25, steamBoost_g_min: 100,
    waterTank_ml: 200, pressure_bar: 0, power_w: 2200,
    antiCalcSystem: false, antiCalcType: null,
    soleplateMaterial: "airglide",
    autoOff: true, verticalSteam: false,
    price: 39, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    repairabilityScore: 5.5, warrantyYears: 1,
    reviewScore: 7.4, reviewCount: 1243, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Tefal+FV2660",
    installment: { available: false, plans: [] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 39, fnac: 39, boulanger: 39, darty: 39, cdiscount: 35, leclerc: 38 }
  },

  {
    id: "philips-dst5030-5000",
    brand: "Philips", model: "DST5030/10",
    displayName: "Philips DST5030 5000 Series",
    type: "iron",
    steamFlow_g_min: 35, steamBoost_g_min: 140,
    waterTank_ml: 300, pressure_bar: 0, power_w: 2400,
    antiCalcSystem: true, antiCalcType: "removable",
    soleplateMaterial: "stainless",
    autoOff: true, verticalSteam: true,
    price: 59, originalPrice: 69, hasPromotion: true,
    promotionLabel: "Promo -15%", promotionEndDate: "2026-04-30",
    repairabilityScore: 6.0, warrantyYears: 2,
    reviewScore: 7.8, reviewCount: 876, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Philips+DST5030",
    installment: { available: false, plans: [] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 59, fnac: 59, boulanger: 59, darty: 65, cdiscount: 55 }
  },

  {
    id: "rowenta-dw6010-focus",
    brand: "Rowenta", model: "DW6010D1 Focus",
    displayName: "Rowenta DW6010 Focus Semelle Inox",
    type: "iron",
    steamFlow_g_min: 40, steamBoost_g_min: 180,
    waterTank_ml: 270, pressure_bar: 0, power_w: 2400,
    antiCalcSystem: true, antiCalcType: "automatic",
    soleplateMaterial: "stainless",
    autoOff: true, verticalSteam: true,
    price: 79, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    repairabilityScore: 6.5, warrantyYears: 2,
    reviewScore: 8.2, reviewCount: 2341, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Rowenta+DW6010",
    installment: { available: false, plans: [] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 79, fnac: 79, boulanger: 79, darty: 85, cdiscount: 74 }
  },

  {
    id: "calor-fv6550-maestro",
    brand: "Calor", model: "FV6550C0 Maestro",
    displayName: "Calor FV6550 Maestro Anti-calcaire",
    type: "iron",
    steamFlow_g_min: 45, steamBoost_g_min: 200,
    waterTank_ml: 350, pressure_bar: 0, power_w: 2800,
    antiCalcSystem: true, antiCalcType: "removable",
    soleplateMaterial: "ceramic",
    autoOff: true, verticalSteam: true,
    price: 99, originalPrice: 119, hasPromotion: true,
    promotionLabel: "Promo -17%", promotionEndDate: "2026-05-01",
    repairabilityScore: 6.2, warrantyYears: 2,
    reviewScore: 8.0, reviewCount: 543, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Calor+FV6550",
    installment: { available: false, plans: [] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 99, fnac: 99, boulanger: 99, darty: 105 }
  },

  {
    id: "rowenta-dw9240-pro-master",
    brand: "Rowenta", model: "DW9240D1 Pro Master",
    displayName: "Rowenta DW9240 Pro Master 3100 W",
    type: "iron",
    steamFlow_g_min: 50, steamBoost_g_min: 240,
    waterTank_ml: 350, pressure_bar: 0, power_w: 3100,
    antiCalcSystem: true, antiCalcType: "automatic",
    soleplateMaterial: "stainless",
    autoOff: true, verticalSteam: true,
    price: 149, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    repairabilityScore: 6.8, warrantyYears: 2,
    reviewScore: 8.5, reviewCount: 1876, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Rowenta+DW9240",
    installment: { available: true, plans: [{ months: 3, monthlyPayment: 49.67, totalCost: 149, interestRate: 0, label: "3x sans frais" }] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 149, fnac: 149, boulanger: 149, darty: 159 }
  },

  {
    id: "braun-texstyle9-ts985",
    brand: "Braun", model: "TexStyle 9 TS 985",
    displayName: "Braun TexStyle 9 TS 985 Eloxal 3D",
    type: "iron",
    steamFlow_g_min: 55, steamBoost_g_min: 260,
    waterTank_ml: 400, pressure_bar: 0, power_w: 3000,
    antiCalcSystem: true, antiCalcType: "automatic",
    soleplateMaterial: "titanium",
    autoOff: true, verticalSteam: true,
    price: 179, originalPrice: 229, hasPromotion: true,
    promotionLabel: "Promo -22%", promotionEndDate: "2026-05-10",
    repairabilityScore: 6.5, warrantyYears: 2,
    reviewScore: 8.6, reviewCount: 743, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Braun+TS985",
    installment: { available: true, plans: [{ months: 3, monthlyPayment: 59.67, totalCost: 179, interestRate: 0, label: "3x sans frais" }] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 179, fnac: 189, boulanger: 179, darty: 195 }
  },

  {
    id: "rowenta-dw9640-pro-style",
    brand: "Rowenta", model: "DW9640D1 Pro Style+",
    displayName: "Rowenta DW9640 Pro Style+ 3100 W 60 g/min",
    type: "iron",
    steamFlow_g_min: 60, steamBoost_g_min: 280,
    waterTank_ml: 400, pressure_bar: 0, power_w: 3100,
    antiCalcSystem: true, antiCalcType: "automatic",
    soleplateMaterial: "stainless",
    autoOff: true, verticalSteam: true,
    price: 249, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    repairabilityScore: 7.0, warrantyYears: 2,
    reviewScore: 8.8, reviewCount: 521, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Rowenta+DW9640",
    installment: { available: true, plans: [{ months: 3, monthlyPayment: 83.00, totalCost: 249, interestRate: 0, label: "3x sans frais" }] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 249, fnac: 259, boulanger: 249, darty: 269 }
  },

  // ===========================================================
  // CENTRALES VAPEUR — 7 modèles
  // ===========================================================

  {
    id: "tefal-gv8160-express-easy",
    brand: "Tefal", model: "GV8160 Express Easy",
    displayName: "Tefal GV8160 Express Easy 4,5 bar",
    type: "steam-station",
    steamFlow_g_min: 90, steamBoost_g_min: 380,
    waterTank_ml: 1200, pressure_bar: 4.5, power_w: 2400,
    antiCalcSystem: true, antiCalcType: "removable",
    soleplateMaterial: "stainless",
    autoOff: true, verticalSteam: true,
    price: 129, originalPrice: 159, hasPromotion: true,
    promotionLabel: "Promo -19%", promotionEndDate: "2026-04-30",
    repairabilityScore: 6.0, warrantyYears: 2,
    reviewScore: 7.8, reviewCount: 1432, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Tefal+GV8160",
    installment: { available: true, plans: [{ months: 3, monthlyPayment: 43.00, totalCost: 129, interestRate: 0, label: "3x sans frais" }] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 129, fnac: 129, boulanger: 129, darty: 139, cdiscount: 119 }
  },

  {
    id: "calor-gv7569-express-steam",
    brand: "Calor", model: "GV7569C0 Express Steam",
    displayName: "Calor GV7569 Express Steam 5,5 bar",
    type: "steam-station",
    steamFlow_g_min: 110, steamBoost_g_min: 440,
    waterTank_ml: 1200, pressure_bar: 5.5, power_w: 2600,
    antiCalcSystem: true, antiCalcType: "removable",
    soleplateMaterial: "ceramic",
    autoOff: true, verticalSteam: true,
    price: 179, originalPrice: 219, hasPromotion: true,
    promotionLabel: "Promo -18%", promotionEndDate: "2026-05-01",
    repairabilityScore: 6.2, warrantyYears: 2,
    reviewScore: 8.1, reviewCount: 876, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Calor+GV7569",
    installment: { available: true, plans: [{ months: 3, monthlyPayment: 59.67, totalCost: 179, interestRate: 0, label: "3x sans frais" }] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 179, fnac: 179, boulanger: 179, darty: 189 }
  },

  {
    id: "rowenta-dg8520-eco",
    brand: "Rowenta", model: "DG8520D1 Eco Intelligence",
    displayName: "Rowenta DG8520 Eco Intelligence 6 bar",
    type: "steam-station",
    steamFlow_g_min: 120, steamBoost_g_min: 480,
    waterTank_ml: 1100, pressure_bar: 6.0, power_w: 2400,
    antiCalcSystem: true, antiCalcType: "automatic",
    soleplateMaterial: "stainless",
    autoOff: true, verticalSteam: true,
    price: 229, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    repairabilityScore: 7.0, warrantyYears: 2,
    reviewScore: 8.4, reviewCount: 1231, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Rowenta+DG8520",
    installment: { available: true, plans: [{ months: 3, monthlyPayment: 76.33, totalCost: 229, interestRate: 0, label: "3x sans frais" }] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 229, fnac: 229, boulanger: 229, darty: 249 }
  },

  {
    id: "philips-gc8942-perfectcare",
    brand: "Philips", model: "GC8942/80 PerfectCare",
    displayName: "Philips GC8942 PerfectCare 6,5 bar",
    type: "steam-station",
    steamFlow_g_min: 130, steamBoost_g_min: 500,
    waterTank_ml: 1800, pressure_bar: 6.5, power_w: 2400,
    antiCalcSystem: true, antiCalcType: "automatic",
    soleplateMaterial: "ceramic",
    autoOff: true, verticalSteam: true,
    price: 279, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    repairabilityScore: 6.8, warrantyYears: 2,
    reviewScore: 8.5, reviewCount: 987, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Philips+GC8942",
    installment: { available: true, plans: [{ months: 3, monthlyPayment: 93.00, totalCost: 279, interestRate: 0, label: "3x sans frais" }] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 279, fnac: 279, boulanger: 279, darty: 299 }
  },

  {
    id: "calor-gv9569-fasteo",
    brand: "Calor", model: "GV9569C0 Fasteo",
    displayName: "Calor GV9569 Fasteo 6,5 bar Anti-calcaire",
    type: "steam-station",
    steamFlow_g_min: 140, steamBoost_g_min: 560,
    waterTank_ml: 1800, pressure_bar: 6.5, power_w: 2700,
    antiCalcSystem: true, antiCalcType: "automatic",
    soleplateMaterial: "titanium",
    autoOff: true, verticalSteam: true,
    price: 299, originalPrice: 369, hasPromotion: true,
    promotionLabel: "Offre -19%", promotionEndDate: "2026-05-15",
    repairabilityScore: 6.5, warrantyYears: 2,
    reviewScore: 8.6, reviewCount: 654, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Calor+GV9569",
    installment: { available: true, plans: [{ months: 3, monthlyPayment: 99.67, totalCost: 299, interestRate: 0, label: "3x sans frais" }] },
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 299, fnac: 299, boulanger: 299, darty: 319 }
  },

  {
    id: "philips-gc9682-perfectcare-elite",
    brand: "Philips", model: "GC9682/80 PerfectCare Elite Plus",
    displayName: "Philips GC9682 PerfectCare Elite Plus 7 bar",
    type: "steam-station",
    steamFlow_g_min: 160, steamBoost_g_min: 600,
    waterTank_ml: 1800, pressure_bar: 7.0, power_w: 2400,
    antiCalcSystem: true, antiCalcType: "automatic",
    soleplateMaterial: "ceramic",
    autoOff: true, verticalSteam: true,
    price: 399, originalPrice: 499, hasPromotion: true,
    promotionLabel: "Promo -20%", promotionEndDate: "2026-06-01",
    repairabilityScore: 7.2, warrantyYears: 2,
    reviewScore: 9.0, reviewCount: 1432, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Philips+GC9682",
    installment: { available: true, plans: [
      { months: 3, monthlyPayment: 133.00, totalCost: 399, interestRate: 0, label: "3x sans frais" },
      { months: 10, monthlyPayment: 41.80, totalCost: 418, interestRate: 4, label: "10x avec frais" }
    ]},
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 399, fnac: 399, boulanger: 399, darty: 419 }
  },

  {
    id: "polti-vaporella-535-pro",
    brand: "Polti", model: "Vaporella 535 Pro",
    displayName: "Polti Vaporella 535 Pro 8 bar 170 g/min",
    type: "steam-station",
    steamFlow_g_min: 170, steamBoost_g_min: 700,
    waterTank_ml: 2500, pressure_bar: 8.0, power_w: 2400,
    antiCalcSystem: true, antiCalcType: "filter",
    soleplateMaterial: "stainless",
    autoOff: true, verticalSteam: true,
    price: 499, originalPrice: null, hasPromotion: false,
    promotionLabel: null, promotionEndDate: null,
    repairabilityScore: 7.5, warrantyYears: 2,
    reviewScore: 9.1, reviewCount: 543, year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Polti+Vaporella+535",
    installment: { available: true, plans: [
      { months: 3, monthlyPayment: 166.33, totalCost: 499, interestRate: 0, label: "3x sans frais" },
      { months: 10, monthlyPayment: 52.10, totalCost: 521, interestRate: 4, label: "10x avec frais" }
    ]},
    affiliateLinks: { amazon: null, fnac: null, boulanger: null, darty: null, cdiscount: null, leclerc: null, but: null, electrodepot: null, ubaldi: null, veepee: null },
    pricesByRetailer: { amazon: 499, fnac: 519, boulanger: 499, darty: 529 }
  }

]; // Fin de IRON_DATABASE

(function () {
  function searchLinks(q) {
    return {
      amazon:       'https://www.amazon.fr/s?k=' + encodeURIComponent(q) + '&tag=comparemax21-21',
      fnac:         'https://www.google.fr/search?q=' + encodeURIComponent('site:fnac.com "' + q + '"'),
      boulanger:    'https://www.google.fr/search?q=' + encodeURIComponent('site:boulanger.com "' + q + '"'),
      darty:        'https://www.google.fr/search?q=' + encodeURIComponent('site:darty.com "' + q + '"'),
      cdiscount:    'https://www.google.fr/search?q=' + encodeURIComponent('site:cdiscount.com "' + q + '"'),
      leclerc:      'https://www.google.fr/search?q=' + encodeURIComponent('site:e.leclerc "' + q + '"'),
      but:          'https://www.google.fr/search?q=' + encodeURIComponent('site:but.fr "' + q + '"'),
      electrodepot: 'https://www.google.fr/search?q=' + encodeURIComponent('site:electrodepot.fr "' + q + '"'),
      ubaldi:       'https://www.google.fr/search?q=' + encodeURIComponent('site:ubaldi.com "' + q + '"'),
      backmarket:   'https://www.google.fr/search?q=' + encodeURIComponent('site:backmarket.fr "' + q + '"'),
      dyson:        'https://www.google.fr/search?q=' + encodeURIComponent('site:dyson.fr "' + q + '"'),
      delonghi:     'https://www.google.fr/search?q=' + encodeURIComponent('site:delonghi.com "' + q + '"'),
      veepee:       null
    };
  };
  };
  }
  IRON_DATABASE.forEach(function (m) {
    m.affiliateLinks = searchLinks(m.displayName);
  });
})();
