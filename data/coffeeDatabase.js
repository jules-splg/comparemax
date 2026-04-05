// ============================================================
// coffeeDatabase.js - Base de données des machines à café
//
// 15 modèles représentatifs du marché français 2024/2025.
// Critères : prix, encastrable ou non, à grains ou à capsules,
// présence ou non d'un système de boissons lactées.
// ============================================================

const COFFEE_DATABASE = [

  // ===========================================================
  // ENTRÉE DE GAMME (< 300€) - 3 modèles
  // ===========================================================

  {
    id: "nespresso-vertuo-pop",
    brand: "Nespresso",
    model: "Vertuo Pop",
    displayName: "Nespresso Vertuo Pop Capsules",
    beanType: "capsules",
    installationType: "freestanding",
    milkSystem: false,
    milkSystemType: null,
    pressure_bar: 19,
    waterTank_ml: 560,
    beanContainer_g: null,
    programs: 5,
    touchscreen: false,
    connected: false,
    color: "multicolor",
    price: 79,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 5.5,
    warrantyYears: 2,
    reviewScore: 8.0,
    reviewCount: 2341,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Nespresso+Vertuo+Pop",
    installment: { available: false, plans: [] },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 79, fnac: 79, boulanger: 79, darty: 79, cdiscount: 74, leclerc: 79 }
  },

  {
    id: "philips-ep1224",
    brand: "Philips",
    model: "EP1224/00",
    displayName: "Philips EP1224/00 Grains Compact",
    beanType: "grains",
    installationType: "freestanding",
    milkSystem: false,
    milkSystemType: null,
    pressure_bar: 15,
    waterTank_ml: 1800,
    beanContainer_g: 275,
    programs: 4,
    touchscreen: false,
    connected: false,
    color: "black",
    price: 249,
    originalPrice: 299,
    hasPromotion: true,
    promotionLabel: "Promo -17%",
    promotionEndDate: "2026-04-30",
    repairabilityScore: 6.5,
    warrantyYears: 2,
    reviewScore: 7.9,
    reviewCount: 1842,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Philips+EP1224",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 83.00, totalCost: 249, interestRate: 0, label: "3x sans frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 249, fnac: 259, boulanger: 249, darty: 259, cdiscount: 239, leclerc: 249 }
  },

  {
    id: "delonghi-magnifica-evo-ecam29061",
    brand: "De'Longhi",
    model: "ECAM290.61.W",
    displayName: "De'Longhi Magnifica Evo Grains",
    beanType: "grains",
    installationType: "freestanding",
    milkSystem: false,
    milkSystemType: null,
    pressure_bar: 15,
    waterTank_ml: 1800,
    beanContainer_g: 250,
    programs: 6,
    touchscreen: false,
    connected: false,
    color: "white",
    price: 299,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 7.0,
    warrantyYears: 2,
    reviewScore: 8.3,
    reviewCount: 3241,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=DeLonghi+ECAM290.61",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 99.67, totalCost: 299, interestRate: 0, label: "3x sans frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 299, fnac: 309, boulanger: 299, darty: 309, cdiscount: 289, leclerc: 299 }
  },

  // ===========================================================
  // MILIEU DE GAMME (300€ – 800€) - 6 modèles
  // ===========================================================

  {
    id: "delonghi-magnifica-evo-ecam29281",
    brand: "De'Longhi",
    model: "ECAM292.81.AZ",
    displayName: "De'Longhi Magnifica Evo Grains + Lait auto",
    beanType: "grains",
    installationType: "freestanding",
    milkSystem: true,
    milkSystemType: "automatic",
    pressure_bar: 15,
    waterTank_ml: 1800,
    beanContainer_g: 250,
    programs: 7,
    touchscreen: false,
    connected: false,
    color: "blue",
    price: 449,
    originalPrice: 499,
    hasPromotion: true,
    promotionLabel: "Offre -10%",
    promotionEndDate: "2026-05-01",
    repairabilityScore: 7.0,
    warrantyYears: 2,
    reviewScore: 8.5,
    reviewCount: 2187,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=DeLonghi+ECAM292.81",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 149.67, totalCost: 449, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 47.00, totalCost: 470, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 449, fnac: 459, boulanger: 449, darty: 459, cdiscount: 439 }
  },

  {
    id: "philips-ep3327",
    brand: "Philips",
    model: "EP3327/40",
    displayName: "Philips EP3327/40 Grains + Lait manuel",
    beanType: "grains",
    installationType: "freestanding",
    milkSystem: true,
    milkSystemType: "manual",
    pressure_bar: 15,
    waterTank_ml: 1800,
    beanContainer_g: 275,
    programs: 8,
    touchscreen: false,
    connected: false,
    color: "black",
    price: 499,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 6.8,
    warrantyYears: 2,
    reviewScore: 8.2,
    reviewCount: 987,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Philips+EP3327",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 166.33, totalCost: 499, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 52.10, totalCost: 521, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 499, fnac: 509, boulanger: 499, darty: 519, cdiscount: 489 }
  },

  {
    id: "siemens-eq500-tp503r04",
    brand: "Siemens",
    model: "TP503R04",
    displayName: "Siemens EQ.500 Grains + Lait automatique",
    beanType: "grains",
    installationType: "freestanding",
    milkSystem: true,
    milkSystemType: "automatic",
    pressure_bar: 15,
    waterTank_ml: 1700,
    beanContainer_g: 300,
    programs: 9,
    touchscreen: false,
    connected: false,
    color: "black",
    price: 649,
    originalPrice: 749,
    hasPromotion: true,
    promotionLabel: "Promo -13%",
    promotionEndDate: "2026-04-25",
    repairabilityScore: 7.2,
    warrantyYears: 2,
    reviewScore: 8.6,
    reviewCount: 743,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Siemens+TP503R04",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 216.33, totalCost: 649, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 67.90, totalCost: 679, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 649, fnac: 659, boulanger: 649, darty: 679, ubaldi: 639 }
  },

  {
    id: "nespresso-vertuo-creatista",
    brand: "Nespresso",
    model: "Vertuo Creatista",
    displayName: "Nespresso Vertuo Creatista Capsules + Lait auto",
    beanType: "capsules",
    installationType: "freestanding",
    milkSystem: true,
    milkSystemType: "automatic",
    pressure_bar: 19,
    waterTank_ml: 1500,
    beanContainer_g: null,
    programs: 7,
    touchscreen: true,
    connected: false,
    color: "silver",
    price: 599,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 5.8,
    warrantyYears: 2,
    reviewScore: 8.4,
    reviewCount: 512,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Nespresso+Creatista",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 199.67, totalCost: 599, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 62.60, totalCost: 626, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 599, fnac: 609, boulanger: 599, darty: 619 }
  },

  {
    id: "jura-e6",
    brand: "Jura",
    model: "E6",
    displayName: "Jura E6 Grains + Lait automatique",
    beanType: "grains",
    installationType: "freestanding",
    milkSystem: true,
    milkSystemType: "automatic",
    pressure_bar: 15,
    waterTank_ml: 1900,
    beanContainer_g: 200,
    programs: 10,
    touchscreen: false,
    connected: false,
    color: "black",
    price: 749,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 7.5,
    warrantyYears: 2,
    reviewScore: 8.8,
    reviewCount: 1243,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Jura+E6",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 249.67, totalCost: 749, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 78.40, totalCost: 784, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 749, fnac: 759, boulanger: 749, darty: 779, ubaldi: 739 }
  },

  // ===========================================================
  // HAUT DE GAMME (800€ – 1500€) - 4 modèles
  // ===========================================================

  {
    id: "delonghi-eletta-explore-ecam450",
    brand: "De'Longhi",
    model: "ECAM450.86.T",
    displayName: "De'Longhi Eletta Explore Grains + Lait auto",
    beanType: "grains",
    installationType: "freestanding",
    milkSystem: true,
    milkSystemType: "automatic",
    pressure_bar: 19,
    waterTank_ml: 1800,
    beanContainer_g: 400,
    programs: 16,
    touchscreen: true,
    connected: true,
    color: "titanium",
    price: 999,
    originalPrice: 1199,
    hasPromotion: true,
    promotionLabel: "Promo -17%",
    promotionEndDate: "2026-05-10",
    repairabilityScore: 7.0,
    warrantyYears: 2,
    reviewScore: 8.7,
    reviewCount: 876,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=DeLonghi+Eletta",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 333.00, totalCost: 999, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 104.50, totalCost: 1045, interestRate: 4, label: "10x avec frais" },
        { months: 20, monthlyPayment: 54.20, totalCost: 1084, interestRate: 8, label: "20x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 999, fnac: 1019, boulanger: 999, darty: 1049 }
  },

  {
    id: "jura-s8",
    brand: "Jura",
    model: "S8",
    displayName: "Jura S8 Grains + Lait automatique WiFi",
    beanType: "grains",
    installationType: "freestanding",
    milkSystem: true,
    milkSystemType: "automatic",
    pressure_bar: 15,
    waterTank_ml: 1900,
    beanContainer_g: 280,
    programs: 15,
    touchscreen: true,
    connected: true,
    color: "silver",
    price: 1099,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 7.8,
    warrantyYears: 2,
    reviewScore: 9.0,
    reviewCount: 1543,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Jura+S8",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 366.33, totalCost: 1099, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 114.90, totalCost: 1149, interestRate: 4, label: "10x avec frais" },
        { months: 20, monthlyPayment: 59.50, totalCost: 1190, interestRate: 8, label: "20x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 1099, fnac: 1119, boulanger: 1099, darty: 1149, ubaldi: 1079 }
  },

  {
    id: "siemens-eq9-ti923309rw",
    brand: "Siemens",
    model: "TI923309RW",
    displayName: "Siemens EQ.9 plus s300 Grains + Lait auto",
    beanType: "grains",
    installationType: "freestanding",
    milkSystem: true,
    milkSystemType: "automatic",
    pressure_bar: 15,
    waterTank_ml: 2300,
    beanContainer_g: 500,
    programs: 12,
    touchscreen: true,
    connected: true,
    color: "black",
    price: 1199,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 7.5,
    warrantyYears: 2,
    reviewScore: 8.9,
    reviewCount: 687,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Siemens+EQ9",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 399.67, totalCost: 1199, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 125.40, totalCost: 1254, interestRate: 4, label: "10x avec frais" },
        { months: 20, monthlyPayment: 64.90, totalCost: 1298, interestRate: 8, label: "20x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 1199, fnac: 1219, boulanger: 1199, darty: 1249, ubaldi: 1179 }
  },

  {
    id: "bosch-verobarista300-ctl636eb6",
    brand: "Bosch",
    model: "CTL636EB6",
    displayName: "Bosch VeroBarista 300 Encastrable Grains + Lait",
    beanType: "grains",
    installationType: "built-in",
    milkSystem: true,
    milkSystemType: "automatic",
    pressure_bar: 19,
    waterTank_ml: 2400,
    beanContainer_g: 500,
    programs: 10,
    touchscreen: true,
    connected: true,
    color: null,
    price: 1299,
    originalPrice: 1499,
    hasPromotion: true,
    promotionLabel: "Offre -13%",
    promotionEndDate: "2026-04-30",
    repairabilityScore: 7.8,
    warrantyYears: 2,
    reviewScore: 9.1,
    reviewCount: 342,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Bosch+CTL636EB6",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 433.00, totalCost: 1299, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 135.80, totalCost: 1358, interestRate: 4, label: "10x avec frais" },
        { months: 20, monthlyPayment: 70.30, totalCost: 1406, interestRate: 8, label: "20x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { fnac: 1299, boulanger: 1299, darty: 1349, ubaldi: 1279 }
  },

  // ===========================================================
  // PREMIUM (> 1500€) - 2 modèles
  // ===========================================================

  {
    id: "miele-cm7550",
    brand: "Miele",
    model: "CM7550",
    displayName: "Miele CM7550 Grains + Lait automatique",
    beanType: "grains",
    installationType: "freestanding",
    milkSystem: true,
    milkSystemType: "automatic",
    pressure_bar: 15,
    waterTank_ml: 2300,
    beanContainer_g: 125,
    programs: 10,
    touchscreen: true,
    connected: false,
    color: "obsidian black",
    price: 1699,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 8.5,
    warrantyYears: 3,
    reviewScore: 9.2,
    reviewCount: 412,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Miele+CM7550",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 566.33, totalCost: 1699, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 177.60, totalCost: 1776, interestRate: 4, label: "10x avec frais" },
        { months: 20, monthlyPayment: 91.90, totalCost: 1838, interestRate: 8, label: "20x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { fnac: 1699, boulanger: 1699, darty: 1749, ubaldi: 1669 }
  },

  {
    id: "jura-giga10",
    brand: "Jura",
    model: "GIGA 10",
    displayName: "Jura GIGA 10 Grains Dual Grinder + Lait auto",
    beanType: "grains",
    installationType: "freestanding",
    milkSystem: true,
    milkSystemType: "automatic",
    pressure_bar: 15,
    waterTank_ml: 2500,
    beanContainer_g: 400,
    programs: 31,
    touchscreen: true,
    connected: true,
    color: "chrome",
    price: 2799,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 8.0,
    warrantyYears: 2,
    reviewScore: 9.4,
    reviewCount: 287,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Jura+GIGA10",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 933.00, totalCost: 2799, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 292.60, totalCost: 2926, interestRate: 4, label: "10x avec frais" },
        { months: 20, monthlyPayment: 151.30, totalCost: 3026, interestRate: 8, label: "20x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 2799, fnac: 2849, boulanger: 2799, darty: 2899, ubaldi: 2749 }
  }

]; // Fin de COFFEE_DATABASE

// Remplace tous les affiliateLinks par des liens de recherche réels
(function () {
  function searchLinks(q) {
    return {
      amazon:         'https://www.amazon.fr/s?k=' + encodeURIComponent(q) + '&tag=comparemax21-21',
      fnac:           'https://www.google.fr/search?q=' + encodeURIComponent('site:fnac.com "' + q + '"'),
      boulanger:      'https://www.google.fr/search?q=' + encodeURIComponent('site:boulanger.com "' + q + '"'),
      darty:          'https://www.google.fr/search?q=' + encodeURIComponent('site:darty.com "' + q + '"'),
      cdiscount:      'https://www.google.fr/search?q=' + encodeURIComponent('site:cdiscount.com "' + q + '"'),
      leclerc:        'https://www.google.fr/search?q=' + encodeURIComponent('site:e.leclerc "' + q + '"'),
      but:            'https://www.google.fr/search?q=' + encodeURIComponent('site:but.fr "' + q + '"'),
      electrodepot:   'https://www.google.fr/search?q=' + encodeURIComponent('site:electrodepot.fr "' + q + '"'),
      ubaldi:         'https://www.google.fr/search?q=' + encodeURIComponent('site:ubaldi.com "' + q + '"'),
      backmarket:     'https://www.google.fr/search?q=' + encodeURIComponent('site:backmarket.fr "' + q + '"'),
      dyson:          'https://www.google.fr/search?q=' + encodeURIComponent('site:dyson.fr "' + q + '"'),
      delonghi:       'https://www.google.fr/search?q=' + encodeURIComponent('site:delonghi.com "' + q + '"'),
      rakuten:        'https://www.google.fr/search?q=' + encodeURIComponent('site:fr.shopping.rakuten.com "' + q + '"'),
      rueducommerce:  'https://www.google.fr/search?q=' + encodeURIComponent('site:rueducommerce.fr "' + q + '"'),
      lidl:           'https://www.google.fr/search?q=' + encodeURIComponent('site:lidl.fr "' + q + '"'),
      veepee:         null
    };
  };
  };
  };
  };
  }
  COFFEE_DATABASE.forEach(function (c) {
    c.affiliateLinks = searchLinks(c.displayName);
  });
})();
