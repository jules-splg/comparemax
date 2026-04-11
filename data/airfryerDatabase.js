// ============================================================
// airfryerDatabase.js — Base de données airfryers
//
// type: basket | oven | dual (double bac) | paddle (brassage auto)
// display: digital | analog
// Critères clés :
//   capacity_l    — capacité totale en litres
//   power_w       — puissance en watts
//   baskets       — nombre de bacs/compartiments
//   maxTemp_c     — température maximale (°C)
//   preheat       — préchauffe nécessaire
//   dishwasherSafe— panier lavable au lave-vaisselle
//   functions     — nombre de programmes / fonctions
//   rotisserie    — broche rotissoire intégrée
//   dehydrate     — fonction déshydratation
// ============================================================

const AIRFRYER_DATABASE = [

  // ══════════════════════════════════════════════════════════
  // DOUBLE BAC (DUAL ZONE)
  // ══════════════════════════════════════════════════════════

  {
    id: "ninja-foodi-dualbrew-af400",
    brand: "Ninja", model: "Foodi DualZone AF400",
    displayName: "Ninja Foodi DualZone AF400",
    type: "dual",
    capacity_l: 9.5, basketCount: 2,
    power_w: 2470, maxTemp_c: 240,
    preheat: false, dishwasherSafe: true,
    functions: 6, rotisserie: false, dehydrate: true,
    display: "digital", wifiApp: false,
    cookingScore: 9.0, buildScore: 9.0,
    reviewScore: 9.2, reviewCount: 18000,
    repairabilityScore: 5.5, warrantyYears: 2,
    price: 199, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 199, fnac: 219, boulanger: 199, darty: 209, cdiscount: 185 }
  },
  {
    id: "ninja-foodi-dualbrew-af500",
    brand: "Ninja", model: "Foodi DualZone AF500",
    displayName: "Ninja Foodi DualZone AF500",
    type: "dual",
    capacity_l: 9.5, basketCount: 2,
    power_w: 2470, maxTemp_c: 240,
    preheat: false, dishwasherSafe: true,
    functions: 8, rotisserie: false, dehydrate: true,
    display: "digital", wifiApp: false,
    cookingScore: 9.2, buildScore: 9.0,
    reviewScore: 9.0, reviewCount: 8200,
    repairabilityScore: 5.5, warrantyYears: 2,
    price: 229, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 229, fnac: 249, boulanger: 229, darty: 239, cdiscount: 209 }
  },
  {
    id: "cosori-turbo-blaze-dual-blaze",
    brand: "Cosori", model: "Dual Blaze 9L",
    displayName: "Cosori Dual Blaze 9L",
    type: "dual",
    capacity_l: 9.0, basketCount: 2,
    power_w: 1700, maxTemp_c: 230,
    preheat: false, dishwasherSafe: true,
    functions: 12, rotisserie: false, dehydrate: true,
    display: "digital", wifiApp: true,
    cookingScore: 8.8, buildScore: 8.5,
    reviewScore: 8.8, reviewCount: 4200,
    repairabilityScore: 5.0, warrantyYears: 2,
    price: 159, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 159, fnac: 179, boulanger: 159, darty: 169, cdiscount: 145 }
  },
  {
    id: "tefal-easy-fry-dual",
    brand: "Tefal", model: "Easy Fry Dual XXL",
    displayName: "Tefal Easy Fry Dual XXL",
    type: "dual",
    capacity_l: 8.3, basketCount: 2,
    power_w: 1700, maxTemp_c: 200,
    preheat: false, dishwasherSafe: true,
    functions: 8, rotisserie: false, dehydrate: false,
    display: "digital", wifiApp: false,
    cookingScore: 8.2, buildScore: 8.0,
    reviewScore: 8.5, reviewCount: 3100,
    repairabilityScore: 6.0, warrantyYears: 2,
    price: 139, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 139, fnac: 149, boulanger: 139, darty: 145, cdiscount: 125 }
  },

  // ══════════════════════════════════════════════════════════
  // PANIER SIMPLE — Grande capacité (6L+)
  // ══════════════════════════════════════════════════════════

  {
    id: "philips-airfryer-xxl-hd9870",
    brand: "Philips", model: "Airfryer XXL HD9870",
    displayName: "Philips Airfryer XXL HD9870",
    type: "basket",
    capacity_l: 7.2, basketCount: 1,
    power_w: 2225, maxTemp_c: 200,
    preheat: false, dishwasherSafe: true,
    functions: 7, rotisserie: false, dehydrate: true,
    display: "digital", wifiApp: true,
    cookingScore: 9.5, buildScore: 9.0,
    reviewScore: 9.3, reviewCount: 12000,
    repairabilityScore: 6.5, warrantyYears: 2,
    price: 249, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 249, fnac: 269, boulanger: 249, darty: 259, cdiscount: 229 }
  },
  {
    id: "ninja-air-fryer-max-af160",
    brand: "Ninja", model: "Air Fryer Max AF160",
    displayName: "Ninja Air Fryer Max AF160",
    type: "basket",
    capacity_l: 5.2, basketCount: 1,
    power_w: 1750, maxTemp_c: 240,
    preheat: false, dishwasherSafe: true,
    functions: 5, rotisserie: false, dehydrate: true,
    display: "digital", wifiApp: false,
    cookingScore: 9.0, buildScore: 8.8,
    reviewScore: 9.2, reviewCount: 22000,
    repairabilityScore: 5.5, warrantyYears: 2,
    price: 119, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2021,
    affiliateLinks: {}, pricesByRetailer: { amazon: 119, fnac: 129, boulanger: 119, darty: 125, cdiscount: 109 }
  },
  {
    id: "cosori-turbo-blaze-6l",
    brand: "Cosori", model: "Turbo Blaze 6L",
    displayName: "Cosori Turbo Blaze 6L",
    type: "basket",
    capacity_l: 6.0, basketCount: 1,
    power_w: 1700, maxTemp_c: 230,
    preheat: false, dishwasherSafe: true,
    functions: 9, rotisserie: false, dehydrate: true,
    display: "digital", wifiApp: true,
    cookingScore: 8.8, buildScore: 8.5,
    reviewScore: 9.0, reviewCount: 9500,
    repairabilityScore: 5.5, warrantyYears: 2,
    price: 99, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 99, fnac: 109, boulanger: 99, darty: 105, cdiscount: 89 }
  },
  {
    id: "tefal-easy-fry-xxl",
    brand: "Tefal", model: "Easy Fry XXL EY801",
    displayName: "Tefal Easy Fry XXL EY801",
    type: "basket",
    capacity_l: 6.5, basketCount: 1,
    power_w: 1500, maxTemp_c: 200,
    preheat: false, dishwasherSafe: true,
    functions: 8, rotisserie: false, dehydrate: false,
    display: "digital", wifiApp: false,
    cookingScore: 8.0, buildScore: 8.2,
    reviewScore: 8.7, reviewCount: 7800,
    repairabilityScore: 6.5, warrantyYears: 2,
    price: 89, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 89, fnac: 99, boulanger: 89, darty: 95, cdiscount: 79 }
  },
  {
    id: "moulinex-easy-fry-grill-classic",
    brand: "Moulinex", model: "Easy Fry & Grill Classic",
    displayName: "Moulinex Easy Fry & Grill",
    type: "basket",
    capacity_l: 4.2, basketCount: 1,
    power_w: 1400, maxTemp_c: 200,
    preheat: false, dishwasherSafe: true,
    functions: 6, rotisserie: false, dehydrate: false,
    display: "digital", wifiApp: false,
    cookingScore: 7.8, buildScore: 7.8,
    reviewScore: 8.5, reviewCount: 6200,
    repairabilityScore: 6.5, warrantyYears: 2,
    price: 69, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 69, fnac: 79, boulanger: 69, darty: 75, cdiscount: 59 }
  },

  // ══════════════════════════════════════════════════════════
  // PANIER SIMPLE — Petite capacité (< 5L, 1-2 personnes)
  // ══════════════════════════════════════════════════════════

  {
    id: "philips-airfryer-essential-hd9252",
    brand: "Philips", model: "Airfryer Essential HD9252",
    displayName: "Philips Airfryer Essential HD9252",
    type: "basket",
    capacity_l: 4.1, basketCount: 1,
    power_w: 1400, maxTemp_c: 200,
    preheat: false, dishwasherSafe: true,
    functions: 1, rotisserie: false, dehydrate: false,
    display: "analog", wifiApp: false,
    cookingScore: 8.5, buildScore: 8.0,
    reviewScore: 8.8, reviewCount: 25000,
    repairabilityScore: 6.5, warrantyYears: 2,
    price: 79, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2021,
    affiliateLinks: {}, pricesByRetailer: { amazon: 79, fnac: 89, boulanger: 79, darty: 85, cdiscount: 69 }
  },
  {
    id: "instant-vortex-plus-4l",
    brand: "Instant Pot", model: "Vortex Plus 4L",
    displayName: "Instant Pot Vortex Plus 4L",
    type: "basket",
    capacity_l: 4.0, basketCount: 1,
    power_w: 1500, maxTemp_c: 205,
    preheat: false, dishwasherSafe: true,
    functions: 6, rotisserie: false, dehydrate: true,
    display: "digital", wifiApp: false,
    cookingScore: 8.2, buildScore: 8.0,
    reviewScore: 8.7, reviewCount: 4800,
    repairabilityScore: 5.5, warrantyYears: 1,
    price: 79, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 79, fnac: 89, boulanger: 79, darty: 85, cdiscount: 69 }
  },
  {
    id: "cecotec-cecofry-compact",
    brand: "Cecotec", model: "Cecofry Compact Rapid",
    displayName: "Cecotec Cecofry Compact",
    type: "basket",
    capacity_l: 1.5, basketCount: 1,
    power_w: 900, maxTemp_c: 200,
    preheat: false, dishwasherSafe: true,
    functions: 1, rotisserie: false, dehydrate: false,
    display: "analog", wifiApp: false,
    cookingScore: 6.5, buildScore: 6.0,
    reviewScore: 7.8, reviewCount: 8500,
    repairabilityScore: 5.0, warrantyYears: 2,
    price: 29, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 29, fnac: 35, boulanger: 29, darty: 32, cdiscount: 25 }
  },

  // ══════════════════════════════════════════════════════════
  // FOUR AIRFRYER (MULTI-FONCTION, GRAND FORMAT)
  // ══════════════════════════════════════════════════════════

  {
    id: "ninja-foodi-15in1-dz550",
    brand: "Ninja", model: "Foodi 15-en-1 DZ550",
    displayName: "Ninja Foodi 15-en-1 DZ550",
    type: "oven",
    capacity_l: 12.0, basketCount: 1,
    power_w: 1800, maxTemp_c: 230,
    preheat: false, dishwasherSafe: true,
    functions: 15, rotisserie: false, dehydrate: true,
    display: "digital", wifiApp: false,
    cookingScore: 9.3, buildScore: 9.0,
    reviewScore: 9.0, reviewCount: 3200,
    repairabilityScore: 5.5, warrantyYears: 2,
    price: 269, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 269, fnac: 289, boulanger: 269, darty: 279, cdiscount: 249 }
  },
  {
    id: "instant-pot-vortex-plus-10l",
    brand: "Instant Pot", model: "Vortex Plus 10L ClearCook",
    displayName: "Instant Pot Vortex Plus 10L",
    type: "oven",
    capacity_l: 10.0, basketCount: 1,
    power_w: 1500, maxTemp_c: 205,
    preheat: false, dishwasherSafe: true,
    functions: 7, rotisserie: true, dehydrate: true,
    display: "digital", wifiApp: false,
    cookingScore: 8.8, buildScore: 8.5,
    reviewScore: 8.8, reviewCount: 4100,
    repairabilityScore: 5.5, warrantyYears: 1,
    price: 149, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 149, fnac: 169, boulanger: 149, darty: 159, cdiscount: 135 }
  },
  {
    id: "philips-airfryer-xxl-connected",
    brand: "Philips", model: "Airfryer 3000 Series XXL",
    displayName: "Philips Airfryer 3000 Series XXL",
    type: "oven",
    capacity_l: 6.2, basketCount: 1,
    power_w: 1700, maxTemp_c: 200,
    preheat: false, dishwasherSafe: true,
    functions: 8, rotisserie: false, dehydrate: false,
    display: "digital", wifiApp: true,
    cookingScore: 9.0, buildScore: 9.0,
    reviewScore: 9.2, reviewCount: 5600,
    repairabilityScore: 6.5, warrantyYears: 2,
    price: 179, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2024,
    affiliateLinks: {}, pricesByRetailer: { amazon: 179, fnac: 199, boulanger: 179, darty: 189, cdiscount: 165 }
  },

  // ══════════════════════════════════════════════════════════
  // BRASSAGE AUTOMATIQUE (PADDLE)
  // ══════════════════════════════════════════════════════════

  {
    id: "ninja-foodi-paddle-af300",
    brand: "Ninja", model: "Foodi FlexDrawer AF300",
    displayName: "Ninja Foodi FlexDrawer AF300",
    type: "paddle",
    capacity_l: 10.4, basketCount: 1,
    power_w: 2470, maxTemp_c: 240,
    preheat: false, dishwasherSafe: true,
    functions: 6, rotisserie: false, dehydrate: true,
    display: "digital", wifiApp: false,
    cookingScore: 9.0, buildScore: 8.8,
    reviewScore: 8.8, reviewCount: 1800,
    repairabilityScore: 5.5, warrantyYears: 2,
    price: 249, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 249, fnac: 269, boulanger: 249, darty: 259, cdiscount: 229 }
  },
  {
    id: "philips-airfryer-with-agitator",
    brand: "Philips", model: "Airfryer XXL + Agitateur HD9867",
    displayName: "Philips Airfryer XXL HD9867",
    type: "paddle",
    capacity_l: 7.3, basketCount: 1,
    power_w: 2225, maxTemp_c: 200,
    preheat: false, dishwasherSafe: true,
    functions: 7, rotisserie: false, dehydrate: true,
    display: "digital", wifiApp: false,
    cookingScore: 9.3, buildScore: 9.0,
    reviewScore: 9.0, reviewCount: 3800,
    repairabilityScore: 6.0, warrantyYears: 2,
    price: 219, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 219, fnac: 239, boulanger: 219, darty: 229, cdiscount: 199 }
  },

]; // Fin de AIRFRYER_DATABASE

(function () {
  function searchLinks(q) {
    return {
      amazon:        'https://www.amazon.fr/s?k=' + encodeURIComponent(q) + '&tag=comparemax21-21',
      fnac:          'https://www.google.fr/search?q=' + encodeURIComponent('site:fnac.com "' + q + '"'),
      boulanger:     'https://www.google.fr/search?q=' + encodeURIComponent('site:boulanger.com "' + q + '"'),
      darty:         'https://www.google.fr/search?q=' + encodeURIComponent('site:darty.com "' + q + '"'),
      cdiscount:     'https://www.google.fr/search?q=' + encodeURIComponent('site:cdiscount.com "' + q + '"'),
      leclerc:       'https://www.google.fr/search?q=' + encodeURIComponent('site:e.leclerc "' + q + '"'),
      carrefour:     'https://www.google.fr/search?q=' + encodeURIComponent('site:carrefour.fr "' + q + '"'),
      rueducommerce: 'https://www.google.fr/search?q=' + encodeURIComponent('site:rueducommerce.fr "' + q + '"'),
      rakuten:       'https://www.google.fr/search?q=' + encodeURIComponent('site:fr.shopping.rakuten.com "' + q + '"'),
      ldlc:          null
    };
  }
  AIRFRYER_DATABASE.forEach(function (a) {
    a.affiliateLinks = searchLinks(a.displayName);
  });
})();
