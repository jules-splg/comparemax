// ============================================================
// washingDatabase.js - Base de données des lave-linges
//
// 15 modèles représentatifs du marché français (données simulées
// mais fidèles aux caractéristiques réelles des gammes 2024).
// ============================================================

const WASHING_DATABASE = [

  // ===========================================================
  // ENTRÉE DE GAMME (< 400€) - 2 modèles
  // ===========================================================

  {
    id: "beko-wtc8521xw",
    brand: "Beko",
    model: "WTC8521XW",
    displayName: "Beko WTC8521XW",
    type: "frontload",
    installationType: "freestanding",
    function: "washer",
    capacity_kg: 8,
    dryCapacity_kg: null,
    color: "white",
    energyLabel: "B",
    spinSpeed_rpm: 1200,
    noiseWash_db: 52,
    noiseSpin_db: 77,
    delayStart_hours: 12,
    programs: 10,
    connected: false,
    steamFunction: false,
    price: 399,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 6.5,
    warrantyYears: 2,
    reviewScore: 7.5,
    reviewCount: 421,
    year: 2024,
    energyConsumption_kwh: 58,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Beko+WTC8521XW",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 133.00, totalCost: 399, interestRate: 0, label: "3x sans frais" }
      ]
    },
    affiliateLinks: {
      amazon:       "https://www.amazon.fr/dp/PLACEHOLDER?tag=comparemax21-21",
      fnac:         "https://www.fnac.com/Beko-WTC8521XW",
      boulanger:    "https://www.boulanger.com/ref/Beko-WTC8521XW",
      darty:        "https://www.darty.com/Beko-WTC8521XW",
      cdiscount:    "https://www.cdiscount.com/Beko-WTC8521XW",
      leclerc:      "https://www.e.leclerc/Beko-WTC8521XW",
      but:          "https://www.but.fr/Beko-WTC8521XW",
      electrodepot: "https://www.electrodepot.fr/Beko-WTC8521XW",
      ldlc:         null,
      ubaldi:       null,
      veepee:       null
    },
    pricesByRetailer: {
      amazon: 399, fnac: 409, boulanger: 399, darty: 405,
      cdiscount: 389, leclerc: 395, but: 399, electrodepot: 385
    }
  },

  {
    id: "hotpoint-nm11946wsafr",
    brand: "Hotpoint",
    model: "NM11946WSAFR",
    displayName: "Hotpoint NM11946WSAFR",
    type: "frontload",
    installationType: "freestanding",
    function: "washer",
    capacity_kg: 9,
    dryCapacity_kg: null,
    color: "white",
    energyLabel: "B",
    spinSpeed_rpm: 1400,
    noiseWash_db: 50,
    noiseSpin_db: 77,
    delayStart_hours: 12,
    programs: 12,
    connected: false,
    steamFunction: false,
    price: 449,
    originalPrice: 499,
    hasPromotion: true,
    promotionLabel: "Promo -10%",
    promotionEndDate: "2026-05-01",
    repairabilityScore: 6.5,
    warrantyYears: 2,
    reviewScore: 7.4,
    reviewCount: 198,
    year: 2024,
    energyConsumption_kwh: 55,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Hotpoint+NM11946",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 149.67, totalCost: 449, interestRate: 0, label: "3x sans frais" }
      ]
    },
    affiliateLinks: {
      amazon:       "https://www.amazon.fr/dp/PLACEHOLDER?tag=comparemax21-21",
      fnac:         "https://www.fnac.com/Hotpoint-NM11946",
      boulanger:    "https://www.boulanger.com/ref/Hotpoint-NM11946",
      darty:        "https://www.darty.com/Hotpoint-NM11946",
      cdiscount:    "https://www.cdiscount.com/Hotpoint-NM11946",
      leclerc:      "https://www.e.leclerc/Hotpoint-NM11946",
      but:          "https://www.but.fr/Hotpoint-NM11946",
      electrodepot: "https://www.electrodepot.fr/Hotpoint-NM11946",
      ldlc:         null,
      ubaldi:       null,
      veepee:       null
    },
    pricesByRetailer: {
      amazon: 449, fnac: 455, boulanger: 449, darty: 459,
      cdiscount: 439, leclerc: 445, but: 449, electrodepot: 435
    }
  },

  // ===========================================================
  // MILIEU DE GAMME (400€ - 800€) - 8 modèles
  // ===========================================================

  {
    id: "aeg-l7fec41s",
    brand: "AEG",
    model: "L7FEC41S",
    displayName: "AEG L7FEC41S",
    type: "frontload",
    installationType: "freestanding",
    function: "washer",
    capacity_kg: 7,
    dryCapacity_kg: null,
    color: "white",
    energyLabel: "A",
    spinSpeed_rpm: 1400,
    noiseWash_db: 46,
    noiseSpin_db: 71,
    delayStart_hours: 24,
    programs: 14,
    connected: false,
    steamFunction: false,
    price: 499,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 8.5,
    warrantyYears: 2,
    reviewScore: 8.1,
    reviewCount: 623,
    year: 2024,
    energyConsumption_kwh: 44,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=AEG+L7FEC41S",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 166.33, totalCost: 499, interestRate: 0, label: "3x sans frais" }
      ]
    },
    affiliateLinks: {
      amazon:       "https://www.amazon.fr/dp/PLACEHOLDER?tag=comparemax21-21",
      fnac:         "https://www.fnac.com/AEG-L7FEC41S",
      boulanger:    "https://www.boulanger.com/ref/AEG-L7FEC41S",
      darty:        "https://www.darty.com/AEG-L7FEC41S",
      cdiscount:    "https://www.cdiscount.com/AEG-L7FEC41S",
      leclerc:      null,
      but:          null,
      electrodepot: null,
      ldlc:         null,
      ubaldi:       null,
      veepee:       null
    },
    pricesByRetailer: {
      amazon: 499, fnac: 509, boulanger: 499, darty: 509, cdiscount: 489
    }
  },

  {
    id: "haier-hw90-b14939s8u1",
    brand: "Haier",
    model: "HW90-B14939S8U1",
    displayName: "Haier HW90-B14939 Serie 5",
    type: "frontload",
    installationType: "freestanding",
    function: "washer",
    capacity_kg: 9,
    dryCapacity_kg: null,
    color: "white",
    energyLabel: "A",
    spinSpeed_rpm: 1400,
    noiseWash_db: 48,
    noiseSpin_db: 72,
    delayStart_hours: 24,
    programs: 12,
    connected: true,
    steamFunction: true,
    price: 499,
    originalPrice: 579,
    hasPromotion: true,
    promotionLabel: "Offre -14%",
    promotionEndDate: "2026-04-30",
    repairabilityScore: 7.0,
    warrantyYears: 3,
    reviewScore: 7.8,
    reviewCount: 312,
    year: 2024,
    energyConsumption_kwh: 47,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Haier+HW90-B14939",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 166.33, totalCost: 499, interestRate: 0, label: "3x sans frais" }
      ]
    },
    affiliateLinks: {
      amazon:       "https://www.amazon.fr/dp/PLACEHOLDER?tag=comparemax21-21",
      fnac:         "https://www.fnac.com/Haier-HW90-B14939",
      boulanger:    "https://www.boulanger.com/ref/Haier-HW90-B14939",
      darty:        "https://www.darty.com/Haier-HW90-B14939",
      cdiscount:    "https://www.cdiscount.com/Haier-HW90-B14939",
      leclerc:      "https://www.e.leclerc/Haier-HW90-B14939",
      but:          "https://www.but.fr/Haier-HW90-B14939",
      electrodepot: "https://www.electrodepot.fr/Haier-HW90-B14939",
      ldlc:         null,
      ubaldi:       null,
      veepee:       null
    },
    pricesByRetailer: {
      amazon: 499, fnac: 509, boulanger: 499, darty: 505,
      cdiscount: 489, leclerc: 495, but: 499, electrodepot: 479
    }
  },

  {
    id: "electrolux-ew7f348sc",
    brand: "Electrolux",
    model: "EW7F348SC",
    displayName: "Electrolux EW7F348SC",
    type: "frontload",
    installationType: "freestanding",
    function: "washer",
    capacity_kg: 8,
    dryCapacity_kg: null,
    color: "silver",
    energyLabel: "A",
    spinSpeed_rpm: 1400,
    noiseWash_db: 47,
    noiseSpin_db: 73,
    delayStart_hours: 20,
    programs: 14,
    connected: true,
    steamFunction: false,
    price: 549,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 7.5,
    warrantyYears: 2,
    reviewScore: 7.9,
    reviewCount: 298,
    year: 2024,
    energyConsumption_kwh: 46,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Electrolux+EW7F348SC",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 183.00, totalCost: 549, interestRate: 0, label: "3x sans frais" }
      ]
    },
    affiliateLinks: {
      amazon:       "https://www.amazon.fr/dp/PLACEHOLDER?tag=comparemax21-21",
      fnac:         "https://www.fnac.com/Electrolux-EW7F348SC",
      boulanger:    "https://www.boulanger.com/ref/Electrolux-EW7F348SC",
      darty:        "https://www.darty.com/Electrolux-EW7F348SC",
      cdiscount:    null,
      leclerc:      null,
      but:          null,
      electrodepot: null,
      ldlc:         null,
      ubaldi:       null,
      veepee:       null
    },
    pricesByRetailer: {
      amazon: 549, fnac: 559, boulanger: 549, darty: 559
    }
  },

  {
    id: "samsung-ww90t534daw",
    brand: "Samsung",
    model: "WW90T534DAW",
    displayName: "Samsung WW90T534DAW Ecobubble",
    type: "frontload",
    installationType: "freestanding",
    function: "washer",
    capacity_kg: 9,
    dryCapacity_kg: null,
    color: "white",
    energyLabel: "A",
    spinSpeed_rpm: 1400,
    noiseWash_db: 47,
    noiseSpin_db: 75,
    delayStart_hours: 24,
    programs: 15,
    connected: true,
    steamFunction: true,
    price: 599,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 7.5,
    warrantyYears: 2,
    reviewScore: 8.0,
    reviewCount: 892,
    year: 2024,
    energyConsumption_kwh: 46,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Samsung+WW90T534DAW",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 199.67, totalCost: 599, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 62.30, totalCost: 623, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon:       "https://www.amazon.fr/dp/PLACEHOLDER?tag=comparemax21-21",
      fnac:         "https://www.fnac.com/Samsung-WW90T534DAW",
      boulanger:    "https://www.boulanger.com/ref/Samsung-WW90T534DAW",
      darty:        "https://www.darty.com/Samsung-WW90T534DAW",
      cdiscount:    "https://www.cdiscount.com/Samsung-WW90T534DAW",
      leclerc:      "https://www.e.leclerc/Samsung-WW90T534DAW",
      but:          "https://www.but.fr/Samsung-WW90T534DAW",
      electrodepot: "https://www.electrodepot.fr/Samsung-WW90T534DAW",
      ldlc:         null,
      ubaldi:       null,
      veepee:       null
    },
    pricesByRetailer: {
      amazon: 599, fnac: 609, boulanger: 599, darty: 609,
      cdiscount: 589, leclerc: 595, but: 599, electrodepot: 579
    }
  },

  {
    id: "lg-f4wv709s1e",
    brand: "LG",
    model: "F4WV709S1E",
    displayName: "LG F4WV709S1E TurboWash 360°",
    type: "frontload",
    installationType: "freestanding",
    function: "washer",
    capacity_kg: 9,
    dryCapacity_kg: null,
    color: "white",
    energyLabel: "A",
    spinSpeed_rpm: 1360,
    noiseWash_db: 46,
    noiseSpin_db: 72,
    delayStart_hours: 24,
    programs: 14,
    connected: true,
    steamFunction: true,
    price: 649,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 8.0,
    warrantyYears: 2,
    reviewScore: 8.3,
    reviewCount: 1203,
    year: 2024,
    energyConsumption_kwh: 43,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=LG+F4WV709S1E",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 216.33, totalCost: 649, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 67.50, totalCost: 675, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon:       "https://www.amazon.fr/dp/PLACEHOLDER?tag=comparemax21-21",
      fnac:         "https://www.fnac.com/LG-F4WV709S1E",
      boulanger:    "https://www.boulanger.com/ref/LG-F4WV709S1E",
      darty:        "https://www.darty.com/LG-F4WV709S1E",
      cdiscount:    null,
      leclerc:      null,
      but:          null,
      electrodepot: null,
      ldlc:         null,
      ubaldi:       null,
      veepee:       null
    },
    pricesByRetailer: {
      amazon: 649, fnac: 659, boulanger: 649, darty: 669
    }
  },

  {
    id: "whirlpool-w8i49wbfr",
    brand: "Whirlpool",
    model: "W8I49WBFR",
    displayName: "Whirlpool W8I49WBFR Encastrable",
    type: "frontload",
    installationType: "built-in",
    function: "washer",
    capacity_kg: 9,
    dryCapacity_kg: null,
    color: "white",
    energyLabel: "B",
    spinSpeed_rpm: 1400,
    noiseWash_db: 48,
    noiseSpin_db: 76,
    delayStart_hours: 24,
    programs: 16,
    connected: false,
    steamFunction: false,
    price: 699,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 7.0,
    warrantyYears: 2,
    reviewScore: 7.8,
    reviewCount: 312,
    year: 2024,
    energyConsumption_kwh: 52,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Whirlpool+W8I49WBFR",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 233.00, totalCost: 699, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 72.70, totalCost: 727, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon:       "https://www.amazon.fr/dp/PLACEHOLDER?tag=comparemax21-21",
      fnac:         "https://www.fnac.com/Whirlpool-W8I49WBFR",
      boulanger:    "https://www.boulanger.com/ref/Whirlpool-W8I49WBFR",
      darty:        "https://www.darty.com/Whirlpool-W8I49WBFR",
      cdiscount:    "https://www.cdiscount.com/Whirlpool-W8I49WBFR",
      leclerc:      "https://www.e.leclerc/Whirlpool-W8I49WBFR",
      but:          "https://www.but.fr/Whirlpool-W8I49WBFR",
      electrodepot: "https://www.electrodepot.fr/Whirlpool-W8I49WBFR",
      ldlc:         null,
      ubaldi:       null,
      veepee:       null
    },
    pricesByRetailer: {
      amazon: 699, fnac: 709, boulanger: 699, darty: 709,
      cdiscount: 689, leclerc: 695, but: 699, electrodepot: 679
    }
  },

  {
    id: "bosch-wav28g43ff",
    brand: "Bosch",
    model: "WAV28G43FF",
    displayName: "Bosch WAV28G43FF Serie 8",
    type: "frontload",
    installationType: "freestanding",
    function: "washer",
    capacity_kg: 9,
    dryCapacity_kg: null,
    color: "white",
    energyLabel: "A",
    spinSpeed_rpm: 1400,
    noiseWash_db: 44,
    noiseSpin_db: 69,
    delayStart_hours: 24,
    programs: 16,
    connected: true,
    steamFunction: false,
    price: 749,
    originalPrice: 899,
    hasPromotion: true,
    promotionLabel: "Promo -17%",
    promotionEndDate: "2026-04-25",
    repairabilityScore: 9.0,
    warrantyYears: 2,
    reviewScore: 8.4,
    reviewCount: 534,
    year: 2024,
    energyConsumption_kwh: 41,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Bosch+WAV28G43FF",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 249.67, totalCost: 749, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 77.90, totalCost: 779, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon:       "https://www.amazon.fr/dp/PLACEHOLDER?tag=comparemax21-21",
      fnac:         "https://www.fnac.com/Bosch-WAV28G43FF",
      boulanger:    "https://www.boulanger.com/ref/Bosch-WAV28G43FF",
      darty:        "https://www.darty.com/Bosch-WAV28G43FF",
      cdiscount:    null,
      leclerc:      null,
      but:          null,
      electrodepot: null,
      ldlc:         null,
      ubaldi:       null,
      veepee:       null
    },
    pricesByRetailer: {
      amazon: 749, fnac: 759, boulanger: 749, darty: 769
    }
  },

  // ===========================================================
  // HAUT DE GAMME (800€ - 1500€) - 4 modèles
  // ===========================================================

  {
    id: "lg-f4dv709h2t",
    brand: "LG",
    model: "F4DV709H2T",
    displayName: "LG F4DV709H2T Lavant-séchant",
    type: "frontload",
    installationType: "freestanding",
    function: "washer-dryer",
    capacity_kg: 9,
    dryCapacity_kg: 6,
    color: "white",
    energyLabel: "E",
    spinSpeed_rpm: 1400,
    noiseWash_db: 50,
    noiseSpin_db: 74,
    delayStart_hours: 19,
    programs: 14,
    connected: true,
    steamFunction: true,
    price: 899,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 8.0,
    warrantyYears: 2,
    reviewScore: 8.2,
    reviewCount: 543,
    year: 2024,
    energyConsumption_kwh: 84,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=LG+F4DV709H2T",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 299.67, totalCost: 899, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 93.50, totalCost: 935, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon:       "https://www.amazon.fr/dp/PLACEHOLDER?tag=comparemax21-21",
      fnac:         "https://www.fnac.com/LG-F4DV709H2T",
      boulanger:    "https://www.boulanger.com/ref/LG-F4DV709H2T",
      darty:        "https://www.darty.com/LG-F4DV709H2T",
      cdiscount:    null,
      leclerc:      null,
      but:          null,
      electrodepot: null,
      ldlc:         null,
      ubaldi:       null,
      veepee:       null
    },
    pricesByRetailer: {
      amazon: 899, fnac: 909, boulanger: 899, darty: 919
    }
  },

  {
    id: "samsung-wd90t654dbh",
    brand: "Samsung",
    model: "WD90T654DBH",
    displayName: "Samsung WD90T654DBH Lavant-séchant",
    type: "frontload",
    installationType: "freestanding",
    function: "washer-dryer",
    capacity_kg: 9,
    dryCapacity_kg: 6,
    color: "black",
    energyLabel: "E",
    spinSpeed_rpm: 1400,
    noiseWash_db: 49,
    noiseSpin_db: 75,
    delayStart_hours: 24,
    programs: 16,
    connected: true,
    steamFunction: true,
    price: 999,
    originalPrice: 1199,
    hasPromotion: true,
    promotionLabel: "Promo -17%",
    promotionEndDate: "2026-05-15",
    repairabilityScore: 7.5,
    warrantyYears: 2,
    reviewScore: 8.3,
    reviewCount: 412,
    year: 2024,
    energyConsumption_kwh: 89,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Samsung+WD90T654DBH",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 333.00, totalCost: 999, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 103.90, totalCost: 1039, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon:       "https://www.amazon.fr/dp/PLACEHOLDER?tag=comparemax21-21",
      fnac:         "https://www.fnac.com/Samsung-WD90T654DBH",
      boulanger:    "https://www.boulanger.com/ref/Samsung-WD90T654DBH",
      darty:        "https://www.darty.com/Samsung-WD90T654DBH",
      cdiscount:    "https://www.cdiscount.com/Samsung-WD90T654DBH",
      leclerc:      "https://www.e.leclerc/Samsung-WD90T654DBH",
      but:          "https://www.but.fr/Samsung-WD90T654DBH",
      electrodepot: "https://www.electrodepot.fr/Samsung-WD90T654DBH",
      ldlc:         null,
      ubaldi:       null,
      veepee:       null
    },
    pricesByRetailer: {
      amazon: 999, fnac: 1009, boulanger: 999, darty: 1019,
      cdiscount: 989, leclerc: 995, but: 999, electrodepot: 979
    }
  },

  {
    id: "bosch-wna14490ff",
    brand: "Bosch",
    model: "WNA14490FF",
    displayName: "Bosch WNA14490FF Lavant-séchant Serie 6",
    type: "frontload",
    installationType: "freestanding",
    function: "washer-dryer",
    capacity_kg: 9,
    dryCapacity_kg: 6,
    color: "white",
    energyLabel: "E",
    spinSpeed_rpm: 1400,
    noiseWash_db: 47,
    noiseSpin_db: 71,
    delayStart_hours: 24,
    programs: 15,
    connected: true,
    steamFunction: false,
    price: 1099,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 9.0,
    warrantyYears: 2,
    reviewScore: 8.5,
    reviewCount: 289,
    year: 2024,
    energyConsumption_kwh: 91,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Bosch+WNA14490FF",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 366.33, totalCost: 1099, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 114.30, totalCost: 1143, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon:       "https://www.amazon.fr/dp/PLACEHOLDER?tag=comparemax21-21",
      fnac:         "https://www.fnac.com/Bosch-WNA14490FF",
      boulanger:    "https://www.boulanger.com/ref/Bosch-WNA14490FF",
      darty:        "https://www.darty.com/Bosch-WNA14490FF",
      cdiscount:    null,
      leclerc:      null,
      but:          null,
      electrodepot: null,
      ldlc:         null,
      ubaldi:       null,
      veepee:       null
    },
    pricesByRetailer: {
      amazon: 1099, fnac: 1119, boulanger: 1099, darty: 1129
    }
  },

  {
    id: "aeg-l9wba61bc",
    brand: "AEG",
    model: "L9WBA61BC",
    displayName: "AEG L9WBA61BC Encastrable Lavant-séchant",
    type: "frontload",
    installationType: "built-in",
    function: "washer-dryer",
    capacity_kg: 9,
    dryCapacity_kg: 6,
    color: "white",
    energyLabel: "E",
    spinSpeed_rpm: 1400,
    noiseWash_db: 46,
    noiseSpin_db: 70,
    delayStart_hours: 24,
    programs: 16,
    connected: true,
    steamFunction: true,
    price: 1199,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 8.5,
    warrantyYears: 2,
    reviewScore: 8.4,
    reviewCount: 187,
    year: 2024,
    energyConsumption_kwh: 93,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=AEG+L9WBA61BC",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 399.67, totalCost: 1199, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 124.70, totalCost: 1247, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon:       "https://www.amazon.fr/dp/PLACEHOLDER?tag=comparemax21-21",
      fnac:         "https://www.fnac.com/AEG-L9WBA61BC",
      boulanger:    "https://www.boulanger.com/ref/AEG-L9WBA61BC",
      darty:        "https://www.darty.com/AEG-L9WBA61BC",
      cdiscount:    null,
      leclerc:      null,
      but:          null,
      electrodepot: null,
      ldlc:         null,
      ubaldi:       null,
      veepee:       null
    },
    pricesByRetailer: {
      amazon: 1199, fnac: 1219, boulanger: 1199, darty: 1229
    }
  },

  // ===========================================================
  // PREMIUM (> 1200€) - 2 modèles
  // ===========================================================

  {
    id: "miele-wci870-wps",
    brand: "Miele",
    model: "WCI870 WPS",
    displayName: "Miele WCI870 WPS TwinDos",
    type: "frontload",
    installationType: "freestanding",
    function: "washer",
    capacity_kg: 9,
    dryCapacity_kg: null,
    color: "white",
    energyLabel: "A",
    spinSpeed_rpm: 1600,
    noiseWash_db: 43,
    noiseSpin_db: 68,
    delayStart_hours: 24,
    programs: 20,
    connected: true,
    steamFunction: true,
    price: 1299,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 9.5,
    warrantyYears: 2,
    reviewScore: 9.0,
    reviewCount: 287,
    year: 2024,
    energyConsumption_kwh: 39,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Miele+WCI870+WPS",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 433.00, totalCost: 1299, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 135.10, totalCost: 1351, interestRate: 4, label: "10x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon:       "https://www.amazon.fr/dp/PLACEHOLDER?tag=comparemax21-21",
      fnac:         "https://www.fnac.com/Miele-WCI870",
      boulanger:    "https://www.boulanger.com/ref/Miele-WCI870",
      darty:        "https://www.darty.com/Miele-WCI870",
      cdiscount:    null,
      leclerc:      null,
      but:          null,
      electrodepot: null,
      ldlc:         null,
      ubaldi:       null,
      veepee:       null
    },
    pricesByRetailer: {
      amazon: 1299, fnac: 1329, boulanger: 1299, darty: 1349
    }
  },

  {
    id: "miele-wt1-wci860",
    brand: "Miele",
    model: "WT1 WCI860",
    displayName: "Miele WT1 WCI860 Lavant-séchant",
    type: "frontload",
    installationType: "freestanding",
    function: "washer-dryer",
    capacity_kg: 8,
    dryCapacity_kg: 5,
    color: "white",
    energyLabel: "D",
    spinSpeed_rpm: 1600,
    noiseWash_db: 43,
    noiseSpin_db: 68,
    delayStart_hours: 24,
    programs: 20,
    connected: true,
    steamFunction: true,
    price: 2299,
    originalPrice: null,
    hasPromotion: false,
    promotionLabel: null,
    promotionEndDate: null,
    repairabilityScore: 9.5,
    warrantyYears: 2,
    reviewScore: 9.1,
    reviewCount: 145,
    year: 2024,
    energyConsumption_kwh: 102,
    image: "https://placehold.co/300x180/1a1a2e/ffffff?text=Miele+WT1+WCI860",
    installment: {
      available: true,
      plans: [
        { months: 3, monthlyPayment: 766.33, totalCost: 2299, interestRate: 0, label: "3x sans frais" },
        { months: 10, monthlyPayment: 239.10, totalCost: 2391, interestRate: 4, label: "10x avec frais" },
        { months: 20, monthlyPayment: 124.10, totalCost: 2482, interestRate: 8, label: "20x avec frais" }
      ]
    },
    affiliateLinks: {
      amazon:       "https://www.amazon.fr/dp/PLACEHOLDER?tag=comparemax21-21",
      fnac:         "https://www.fnac.com/Miele-WT1-WCI860",
      boulanger:    "https://www.boulanger.com/ref/Miele-WT1-WCI860",
      darty:        "https://www.darty.com/Miele-WT1-WCI860",
      cdiscount:    null,
      leclerc:      null,
      but:          null,
      electrodepot: null,
      ldlc:         null,
      ubaldi:       null,
      veepee:       null
    },
    pricesByRetailer: {
      amazon: 2299, fnac: 2349, boulanger: 2299, darty: 2399
    }
  }

]; // Fin de WASHING_DATABASE

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
  WASHING_DATABASE.forEach(function (m) {
    m.affiliateLinks = searchLinks(m.displayName);
  });
})();
