// ============================================================
// dishwasherDatabase.js - Base de données des lave-vaisselle
//
// 15 modèles représentatifs du marché français 2024/2025.
// Critères clés : nombre de couverts, type de rangement couverts
// (panier ou tiroir), encastrable ou non, énergie, bruit.
// ============================================================

const DISHWASHER_DATABASE = [

  // ===========================================================
  // ENTRÉE DE GAMME (< 400€) - 3 modèles
  // ===========================================================

  {
    id: "candy-cs1c7lfw",
    brand: "Candy",
    model: "CS 1C7LFW",
    displayName: "Candy CS 1C7LFW Slim 45cm",
    installationType: "freestanding",
    width_cm: 45,
    placeSettings: 7,
    cutleryStorage: "basket",
    energyLabel: "E",
    waterConsumption_liters: 9.9,
    noiseLevel_db: 49,
    programs: 5,
    halfLoad: false,
    delayStart_hours: 0,
    connected: false,
    color: "white",
    price: 269,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 6.0,
    warrantyYears: 2,
    reviewScore: 7.2,
    reviewCount: 312,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Candy+CS1C7LFW",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 89.67, totalCost: 269, interestRate: 0, label: "3x sans frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 269, cdiscount: 259, but: 269, electrodepot: 265 }
  },

  {
    id: "beko-dvn04321w",
    brand: "Beko",
    model: "DVN04321W",
    displayName: "Beko DVN04321W 13 couverts",
    installationType: "freestanding",
    width_cm: 60,
    placeSettings: 13,
    cutleryStorage: "basket",
    energyLabel: "E",
    waterConsumption_liters: 11.6,
    noiseLevel_db: 49,
    programs: 6,
    halfLoad: true,
    delayStart_hours: 9,
    connected: false,
    color: "white",
    price: 329,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 6.3,
    warrantyYears: 2,
    reviewScore: 7.5,
    reviewCount: 487,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Beko+DVN04321W",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 109.67, totalCost: 329, interestRate: 0, label: "3x sans frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 329, boulanger: 329, darty: 339, electrodepot: 319, leclerc: 325 }
  },

  {
    id: "samsung-dw60a3010bb",
    brand: "Samsung",
    model: "DW60A3010BB",
    displayName: "Samsung DW60A3010BB 13 couverts",
    installationType: "freestanding",
    width_cm: 60,
    placeSettings: 13,
    cutleryStorage: "basket",
    energyLabel: "E",
    waterConsumption_liters: 11.6,
    noiseLevel_db: 48,
    programs: 5,
    halfLoad: true,
    delayStart_hours: 24,
    connected: false,
    color: "black",
    price: 379,
    originalPrice: 429,
    hasPromotion: true,
    promotionLabel: "Promo -12%",
    promotionEndDate: "2026-05-15",
    repairabilityScore: 6.1,
    warrantyYears: 2,
    reviewScore: 7.4,
    reviewCount: 203,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Samsung+DW60A3010BB",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 126.33, totalCost: 379, interestRate: 0, label: "3x sans frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 379, fnac: 389, boulanger: 379, darty: 389 }
  },

  // ===========================================================
  // MILIEU DE GAMME (400€ – 800€) - 6 modèles
  // ===========================================================

  {
    id: "bosch-serie2-sms2iti14e",
    brand: "Bosch",
    model: "SMS2ITI14E",
    displayName: "Bosch Serie 2 SMS2ITI14E 12 couverts",
    installationType: "freestanding",
    width_cm: 60,
    placeSettings: 12,
    cutleryStorage: "basket",
    energyLabel: "E",
    waterConsumption_liters: 9.5,
    noiseLevel_db: 48,
    programs: 6,
    halfLoad: true,
    delayStart_hours: 24,
    connected: false,
    color: "white",
    price: 449,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 7.0,
    warrantyYears: 2,
    reviewScore: 8.0,
    reviewCount: 842,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Bosch+SMS2ITI14E",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 149.67, totalCost: 449, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 46.90, totalCost: 469, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 449, fnac: 459, boulanger: 449, darty: 459, ubaldi: 439 }
  },

  {
    id: "whirlpool-wfo3t123p",
    brand: "Whirlpool",
    model: "WFO3T123PX",
    displayName: "Whirlpool WFO3T123PX 14 couverts",
    installationType: "freestanding",
    width_cm: 60,
    placeSettings: 14,
    cutleryStorage: "basket",
    energyLabel: "C",
    waterConsumption_liters: 9.0,
    noiseLevel_db: 46,
    programs: 9,
    halfLoad: true,
    delayStart_hours: 24,
    connected: false,
    color: "white",
    price: 499,
    originalPrice: 579,
    hasPromotion: true,
    promotionLabel: "Offre -14%",
    promotionEndDate: "2026-04-30",
    repairabilityScore: 6.5,
    warrantyYears: 2,
    reviewScore: 7.8,
    reviewCount: 374,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Whirlpool+WFO3T123PX",
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
    pricesByRetailer: { amazon: 499, boulanger: 499, darty: 509, electrodepot: 489, leclerc: 495 }
  },

  {
    id: "siemens-iq300-sn53es14ce",
    brand: "Siemens",
    model: "SN53ES14CE",
    displayName: "Siemens iQ300 SN53ES14CE Encastrable",
    installationType: "built-in",
    width_cm: 60,
    placeSettings: 13,
    cutleryStorage: "basket",
    energyLabel: "C",
    waterConsumption_liters: 9.5,
    noiseLevel_db: 46,
    programs: 6,
    halfLoad: true,
    delayStart_hours: 24,
    connected: false,
    color: null,
    price: 549,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 7.2,
    warrantyYears: 2,
    reviewScore: 8.1,
    reviewCount: 621,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Siemens+SN53ES14CE",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 183.00, totalCost: 549, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 57.40, totalCost: 574, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 549, fnac: 559, boulanger: 549, darty: 569, ubaldi: 539 }
  },

  {
    id: "aeg-fse72707p",
    brand: "AEG",
    model: "FSE72707P",
    displayName: "AEG FSE72707P Encastrable Tiroir à couverts",
    installationType: "built-in",
    width_cm: 60,
    placeSettings: 13,
    cutleryStorage: "drawer",
    energyLabel: "B",
    waterConsumption_liters: 8.5,
    noiseLevel_db: 44,
    programs: 8,
    halfLoad: true,
    delayStart_hours: 24,
    connected: false,
    color: null,
    price: 699,
    originalPrice: 799,
    hasPromotion: true,
    promotionLabel: "Promo -13%",
    promotionEndDate: "2026-05-01",
    repairabilityScore: 7.5,
    warrantyYears: 2,
    reviewScore: 8.3,
    reviewCount: 289,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=AEG+FSE72707P",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 233.00, totalCost: 699, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 73.10, totalCost: 731, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 699, fnac: 719, boulanger: 699, darty: 729 }
  },

  {
    id: "electrolux-eem43201l",
    brand: "Electrolux",
    model: "EEM43201L",
    displayName: "Electrolux EEM43201L Encastrable Tiroir",
    installationType: "built-in",
    width_cm: 60,
    placeSettings: 13,
    cutleryStorage: "drawer",
    energyLabel: "A",
    waterConsumption_liters: 8.0,
    noiseLevel_db: 44,
    programs: 9,
    halfLoad: true,
    delayStart_hours: 24,
    connected: false,
    color: null,
    price: 749,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 7.3,
    warrantyYears: 2,
    reviewScore: 8.4,
    reviewCount: 198,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Electrolux+EEM43201L",
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
    pricesByRetailer: { amazon: 749, fnac: 759, boulanger: 749, darty: 769, ubaldi: 739 }
  },

  {
    id: "siemens-iq500-sn65zx49ce",
    brand: "Siemens",
    model: "SN65ZX49CE",
    displayName: "Siemens iQ500 SN65ZX49CE Encastrable",
    installationType: "built-in",
    width_cm: 60,
    placeSettings: 14,
    cutleryStorage: "drawer",
    energyLabel: "B",
    waterConsumption_liters: 8.5,
    noiseLevel_db: 42,
    programs: 8,
    halfLoad: true,
    delayStart_hours: 24,
    connected: true,
    color: null,
    price: 799,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 7.4,
    warrantyYears: 2,
    reviewScore: 8.5,
    reviewCount: 412,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Siemens+SN65ZX49CE",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 266.33, totalCost: 799, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 83.50, totalCost: 835, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { amazon: 799, fnac: 819, boulanger: 799, darty: 829, ubaldi: 789 }
  },

  // ===========================================================
  // HAUT DE GAMME (800€ – 1500€) - 4 modèles
  // ===========================================================

  {
    id: "bosch-serie8-smv8ycx03e",
    brand: "Bosch",
    model: "SMV8YCX03E",
    displayName: "Bosch Serie 8 SMV8YCX03E Tout intégrable",
    installationType: "built-in",
    width_cm: 60,
    placeSettings: 14,
    cutleryStorage: "drawer",
    energyLabel: "A",
    waterConsumption_liters: 7.5,
    noiseLevel_db: 40,
    programs: 8,
    halfLoad: true,
    delayStart_hours: 24,
    connected: true,
    color: null,
    price: 999,
    originalPrice: 1199,
    hasPromotion: true,
    promotionLabel: "Promo -17%",
    promotionEndDate: "2026-04-20",
    repairabilityScore: 7.8,
    warrantyYears: 2,
    reviewScore: 8.9,
    reviewCount: 743,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Bosch+SMV8YCX03E",
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
    pricesByRetailer: { amazon: 999, fnac: 1019, boulanger: 999, darty: 1049, ubaldi: 979 }
  },

  {
    id: "aeg-fse76738p",
    brand: "AEG",
    model: "FSE76738P",
    displayName: "AEG FSE76738P 15 couverts Tiroir XXL",
    installationType: "built-in",
    width_cm: 60,
    placeSettings: 15,
    cutleryStorage: "drawer",
    energyLabel: "A",
    waterConsumption_liters: 7.0,
    noiseLevel_db: 40,
    programs: 10,
    halfLoad: true,
    delayStart_hours: 24,
    connected: true,
    color: null,
    price: 1099,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 7.9,
    warrantyYears: 2,
    reviewScore: 8.7,
    reviewCount: 287,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=AEG+FSE76738P",
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
    pricesByRetailer: { amazon: 1099, fnac: 1119, boulanger: 1099, darty: 1149 }
  },

  {
    id: "miele-g5222sci",
    brand: "Miele",
    model: "G 5222 SCi",
    displayName: "Miele G 5222 SCi Encastrable AutoDos",
    installationType: "built-in",
    width_cm: 60,
    placeSettings: 14,
    cutleryStorage: "drawer",
    energyLabel: "A",
    waterConsumption_liters: 6.5,
    noiseLevel_db: 42,
    programs: 7,
    halfLoad: true,
    delayStart_hours: 24,
    connected: false,
    color: null,
    price: 1199,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 8.5,
    warrantyYears: 2,
    reviewScore: 9.0,
    reviewCount: 521,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Miele+G5222SCi",
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
    pricesByRetailer: { fnac: 1199, boulanger: 1199, darty: 1229, ubaldi: 1179 }
  },

  {
    id: "miele-g7310sc",
    brand: "Miele",
    model: "G 7310 SC",
    displayName: "Miele G 7310 SC Pose libre AutoDos",
    installationType: "freestanding",
    width_cm: 60,
    placeSettings: 14,
    cutleryStorage: "drawer",
    energyLabel: "A",
    waterConsumption_liters: 6.5,
    noiseLevel_db: 42,
    programs: 7,
    halfLoad: true,
    delayStart_hours: 24,
    connected: false,
    color: "white",
    price: 1399,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 8.7,
    warrantyYears: 2,
    reviewScore: 9.1,
    reviewCount: 389,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Miele+G7310SC",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 466.33, totalCost: 1399, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 146.30, totalCost: 1463, interestRate: 4, label: "10x avec frais" },
        { months: 20, monthlyPayment: 75.70, totalCost: 1514, interestRate: 8, label: "20x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { fnac: 1399, boulanger: 1399, darty: 1449, ubaldi: 1379 }
  },

  // ===========================================================
  // PREMIUM (> 1500€) - 2 modèles
  // ===========================================================

  {
    id: "miele-g7775scvi",
    brand: "Miele",
    model: "G 7775 SCVi XXL",
    displayName: "Miele G 7775 SCVi XXL 15 couverts WiFi",
    installationType: "built-in",
    width_cm: 60,
    placeSettings: 15,
    cutleryStorage: "drawer",
    energyLabel: "A",
    waterConsumption_liters: 6.0,
    noiseLevel_db: 38,
    programs: 9,
    halfLoad: true,
    delayStart_hours: 24,
    connected: true,
    color: null,
    price: 2199,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 8.8,
    warrantyYears: 3,
    reviewScore: 9.3,
    reviewCount: 187,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Miele+G7775SCVi",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 733.00, totalCost: 2199, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 229.80, totalCost: 2298, interestRate: 4, label: "10x avec frais" },
        { months: 20, monthlyPayment: 119.00, totalCost: 2380, interestRate: 8, label: "20x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon: null, fnac: null, boulanger: null, darty: null,
      cdiscount: null, leclerc: null, but: null, electrodepot: null,
      ubaldi: null, veepee: null
    },
    pricesByRetailer: { fnac: 2199, boulanger: 2199, darty: 2249, ubaldi: 2149 }
  },

  {
    id: "vzug-adoradish-v6000",
    brand: "V-ZUG",
    model: "AdoraDish V6000",
    displayName: "V-ZUG AdoraDish V6000 Encastrable",
    installationType: "built-in",
    width_cm: 60,
    placeSettings: 14,
    cutleryStorage: "drawer",
    energyLabel: "A",
    waterConsumption_liters: 5.5,
    noiseLevel_db: 37,
    programs: 12,
    halfLoad: true,
    delayStart_hours: 24,
    connected: true,
    color: null,
    price: 2799,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 9.0,
    warrantyYears: 5,
    reviewScore: 9.5,
    reviewCount: 94,
    year: 2024,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=V-ZUG+AdoraDish",
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
    pricesByRetailer: { boulanger: 2799, darty: 2849 }
  }

]; // Fin de DISHWASHER_DATABASE

// Remplace tous les affiliateLinks par des liens de recherche réels
(function () {
  function searchLinks(q) {
    var e = encodeURIComponent(q);
    return {
      amazon:       'https://www.amazon.fr/s?k=' + e + '&tag=comparemax21-21',
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
  DISHWASHER_DATABASE.forEach(function (d) {
    d.affiliateLinks = searchLinks(d.displayName);
  });
})();
