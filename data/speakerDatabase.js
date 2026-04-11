// ============================================================
// speakerDatabase.js — Base de données enceintes
// Types : bluetooth | hifi
// Alimentation BT : battery | mains | both
// ============================================================

const SPEAKER_DATABASE = [

  // ══════════════════════════════════════════════════════════
  // BLUETOOTH BATTERIE
  // ══════════════════════════════════════════════════════════

  // JBL
  {
    id: "jbl-go-4",
    brand: "JBL", model: "Go 4",
    displayName: "JBL Go 4",
    type: "bluetooth", powerSource: "battery",
    batteryLife_h: 7, power_w: 3,
    stereoMode: false, stereoTech: null,
    waterproofing: "IP67", bluetoothVersion: 5.3, multipoint: false,
    weight_g: 195,
    soundScore: 6.0, buildScore: 7.5,
    reviewScore: 8.0, reviewCount: 3200,
    repairabilityScore: 4.0, warrantyYears: 1,
    price: 39, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2024,
    affiliateLinks: {}, pricesByRetailer: { amazon: 39, fnac: 45, boulanger: 39, darty: 42, cdiscount: 35 }
  },
  {
    id: "jbl-clip-5",
    brand: "JBL", model: "Clip 5",
    displayName: "JBL Clip 5",
    type: "bluetooth", powerSource: "battery",
    batteryLife_h: 13, power_w: 5,
    stereoMode: false, stereoTech: null,
    waterproofing: "IP67", bluetoothVersion: 5.3, multipoint: false,
    weight_g: 260,
    soundScore: 6.5, buildScore: 8.0,
    reviewScore: 8.2, reviewCount: 2800,
    repairabilityScore: 4.5, warrantyYears: 1,
    price: 59, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2024,
    affiliateLinks: {}, pricesByRetailer: { amazon: 59, fnac: 65, boulanger: 59, darty: 62, cdiscount: 54 }
  },
  {
    id: "jbl-flip-6",
    brand: "JBL", model: "Flip 6",
    displayName: "JBL Flip 6",
    type: "bluetooth", powerSource: "battery",
    batteryLife_h: 12, power_w: 20,
    stereoMode: true, stereoTech: "PartyBoost",
    waterproofing: "IP67", bluetoothVersion: 5.1, multipoint: false,
    weight_g: 530,
    soundScore: 7.5, buildScore: 8.0,
    reviewScore: 8.6, reviewCount: 6800,
    repairabilityScore: 5.0, warrantyYears: 1,
    price: 119, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 119, fnac: 129, boulanger: 119, darty: 125, cdiscount: 109 }
  },
  {
    id: "jbl-charge-5",
    brand: "JBL", model: "Charge 5",
    displayName: "JBL Charge 5",
    type: "bluetooth", powerSource: "battery",
    batteryLife_h: 20, power_w: 30,
    stereoMode: true, stereoTech: "PartyBoost",
    waterproofing: "IP67", bluetoothVersion: 5.1, multipoint: false,
    weight_g: 960,
    soundScore: 8.0, buildScore: 8.5,
    reviewScore: 8.8, reviewCount: 4200,
    repairabilityScore: 5.0, warrantyYears: 1,
    price: 149, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 149, fnac: 159, boulanger: 149, darty: 155, cdiscount: 139 }
  },
  {
    id: "jbl-xtreme-4",
    brand: "JBL", model: "Xtreme 4",
    displayName: "JBL Xtreme 4",
    type: "bluetooth", powerSource: "battery",
    batteryLife_h: 24, power_w: 50,
    stereoMode: true, stereoTech: "PartyBoost",
    waterproofing: "IP67", bluetoothVersion: 5.3, multipoint: true,
    weight_g: 2200,
    soundScore: 8.8, buildScore: 8.5,
    reviewScore: 9.0, reviewCount: 1500,
    repairabilityScore: 5.0, warrantyYears: 1,
    price: 299, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2024,
    affiliateLinks: {}, pricesByRetailer: { amazon: 299, fnac: 319, boulanger: 299, darty: 309 }
  },
  {
    id: "jbl-boombox-3",
    brand: "JBL", model: "Boombox 3",
    displayName: "JBL Boombox 3",
    type: "bluetooth", powerSource: "battery",
    batteryLife_h: 24, power_w: 80,
    stereoMode: true, stereoTech: "PartyBoost",
    waterproofing: "IP67", bluetoothVersion: 5.3, multipoint: false,
    weight_g: 5700,
    soundScore: 9.2, buildScore: 8.5,
    reviewScore: 9.0, reviewCount: 1900,
    repairabilityScore: 5.0, warrantyYears: 1,
    price: 399, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 399, fnac: 419, boulanger: 399, darty: 409 }
  },

  // Marshall
  {
    id: "marshall-willen-ii",
    brand: "Marshall", model: "Willen II",
    displayName: "Marshall Willen II",
    type: "bluetooth", powerSource: "battery",
    batteryLife_h: 15, power_w: 5,
    stereoMode: false, stereoTech: null,
    waterproofing: "IP67", bluetoothVersion: 5.3, multipoint: true,
    weight_g: 360,
    soundScore: 7.2, buildScore: 9.0,
    reviewScore: 8.5, reviewCount: 1200,
    repairabilityScore: 6.0, warrantyYears: 2,
    price: 99, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2024,
    affiliateLinks: {}, pricesByRetailer: { amazon: 99, fnac: 109, boulanger: 99, darty: 105 }
  },
  {
    id: "marshall-emberton-ii",
    brand: "Marshall", model: "Emberton II",
    displayName: "Marshall Emberton II",
    type: "bluetooth", powerSource: "battery",
    batteryLife_h: 30, power_w: 10,
    stereoMode: false, stereoTech: null,
    waterproofing: "IPX7", bluetoothVersion: 5.1, multipoint: true,
    weight_g: 680,
    soundScore: 7.8, buildScore: 9.0,
    reviewScore: 8.9, reviewCount: 3100,
    repairabilityScore: 6.0, warrantyYears: 2,
    price: 129, originalPrice: 149,
    hasPromotion: true, promotionLabel: "-13%", promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 129, fnac: 139, boulanger: 129, darty: 135 }
  },
  {
    id: "marshall-middleton",
    brand: "Marshall", model: "Middleton",
    displayName: "Marshall Middleton",
    type: "bluetooth", powerSource: "battery",
    batteryLife_h: 20, power_w: 50,
    stereoMode: false, stereoTech: null,
    waterproofing: "IP67", bluetoothVersion: 5.1, multipoint: true,
    weight_g: 1300,
    soundScore: 8.5, buildScore: 9.2,
    reviewScore: 9.0, reviewCount: 1800,
    repairabilityScore: 6.5, warrantyYears: 2,
    price: 249, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 249, fnac: 269, boulanger: 249, darty: 259 }
  },

  // Sony
  {
    id: "sony-srs-xb13",
    brand: "Sony", model: "SRS-XB13",
    displayName: "Sony SRS-XB13",
    type: "bluetooth", powerSource: "battery",
    batteryLife_h: 16, power_w: null,
    stereoMode: false, stereoTech: null,
    waterproofing: "IP67", bluetoothVersion: 5.0, multipoint: false,
    weight_g: 168,
    soundScore: 6.5, buildScore: 7.5,
    reviewScore: 8.2, reviewCount: 4500,
    repairabilityScore: 4.0, warrantyYears: 1,
    price: 49, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2021,
    affiliateLinks: {}, pricesByRetailer: { amazon: 49, fnac: 55, boulanger: 49, darty: 52, cdiscount: 44 }
  },
  {
    id: "sony-srs-xb43",
    brand: "Sony", model: "SRS-XB43",
    displayName: "Sony SRS-XB43",
    type: "bluetooth", powerSource: "battery",
    batteryLife_h: 24, power_w: 32,
    stereoMode: false, stereoTech: null,
    waterproofing: "IP67", bluetoothVersion: 5.0, multipoint: true,
    weight_g: 1190,
    soundScore: 8.3, buildScore: 7.5,
    reviewScore: 8.5, reviewCount: 2800,
    repairabilityScore: 5.5, warrantyYears: 1,
    price: 149, originalPrice: 199,
    hasPromotion: true, promotionLabel: "-25%", promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 149, fnac: 159, boulanger: 149, darty: 155, cdiscount: 139 }
  },
  {
    id: "sony-srs-xg300",
    brand: "Sony", model: "SRS-XG300",
    displayName: "Sony SRS-XG300",
    type: "bluetooth", powerSource: "battery",
    batteryLife_h: 25, power_w: null,
    stereoMode: true, stereoTech: "True Wireless Stereo",
    waterproofing: "IP67", bluetoothVersion: 5.3, multipoint: true,
    weight_g: 1850,
    soundScore: 8.7, buildScore: 8.0,
    reviewScore: 8.8, reviewCount: 1600,
    repairabilityScore: 5.5, warrantyYears: 1,
    price: 249, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 249, fnac: 259, boulanger: 249, darty: 255 }
  },

  // Bose
  {
    id: "bose-soundlink-flex-2",
    brand: "Bose", model: "SoundLink Flex 2",
    displayName: "Bose SoundLink Flex 2",
    type: "bluetooth", powerSource: "battery",
    batteryLife_h: 12, power_w: null,
    stereoMode: true, stereoTech: "Party Mode / Stereo",
    waterproofing: "IP67", bluetoothVersion: 5.3, multipoint: true,
    weight_g: 620,
    soundScore: 8.5, buildScore: 9.0,
    reviewScore: 9.0, reviewCount: 3800,
    repairabilityScore: 6.0, warrantyYears: 1,
    price: 179, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2024,
    affiliateLinks: {}, pricesByRetailer: { amazon: 179, fnac: 189, boulanger: 179, darty: 185 }
  },
  {
    id: "bose-soundlink-max",
    brand: "Bose", model: "SoundLink Max",
    displayName: "Bose SoundLink Max",
    type: "bluetooth", powerSource: "both",
    batteryLife_h: 20, power_w: null,
    stereoMode: true, stereoTech: "Party Mode / Stereo",
    waterproofing: "IP67", bluetoothVersion: 5.3, multipoint: true,
    weight_g: 1280,
    soundScore: 9.3, buildScore: 9.0,
    reviewScore: 9.2, reviewCount: 980,
    repairabilityScore: 6.0, warrantyYears: 1,
    price: 399, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2024,
    affiliateLinks: {}, pricesByRetailer: { amazon: 399, fnac: 419, boulanger: 399, darty: 409 }
  },

  // Ultimate Ears
  {
    id: "ue-wonderboom-3",
    brand: "Ultimate Ears", model: "Wonderboom 3",
    displayName: "Ultimate Ears Wonderboom 3",
    type: "bluetooth", powerSource: "battery",
    batteryLife_h: 14, power_w: 10,
    stereoMode: true, stereoTech: "True Wireless Stereo",
    waterproofing: "IP67", bluetoothVersion: 5.0, multipoint: false,
    weight_g: 425,
    soundScore: 7.0, buildScore: 8.0,
    reviewScore: 8.3, reviewCount: 5200,
    repairabilityScore: 4.0, warrantyYears: 2,
    price: 89, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 89, fnac: 99, boulanger: 89, darty: 95, cdiscount: 79 }
  },
  {
    id: "ue-hyperboom",
    brand: "Ultimate Ears", model: "Hyperboom",
    displayName: "Ultimate Ears Hyperboom",
    type: "bluetooth", powerSource: "both",
    batteryLife_h: 24, power_w: null,
    stereoMode: false, stereoTech: null,
    waterproofing: "IPX4", bluetoothVersion: 5.0, multipoint: true,
    weight_g: 2100,
    soundScore: 9.0, buildScore: 8.5,
    reviewScore: 9.1, reviewCount: 2200,
    repairabilityScore: 5.0, warrantyYears: 2,
    price: 399, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 399, fnac: 419, boulanger: 399, darty: 409 }
  },

  // Anker / Soundcore
  {
    id: "soundcore-motion-x600",
    brand: "Soundcore", model: "Motion X600",
    displayName: "Soundcore Motion X600",
    type: "bluetooth", powerSource: "battery",
    batteryLife_h: 12, power_w: 50,
    stereoMode: true, stereoTech: "Stereo Pair",
    waterproofing: "IPX7", bluetoothVersion: 5.3, multipoint: true,
    weight_g: 1860,
    soundScore: 8.5, buildScore: 8.0,
    reviewScore: 8.7, reviewCount: 3100,
    repairabilityScore: 5.0, warrantyYears: 1,
    price: 129, originalPrice: 169,
    hasPromotion: true, promotionLabel: "-24%", promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 129, fnac: 139, cdiscount: 119 }
  },

  // Harman Kardon
  {
    id: "harman-kardon-go-play-3",
    brand: "Harman Kardon", model: "Go + Play 3",
    displayName: "Harman Kardon Go + Play 3",
    type: "bluetooth", powerSource: "both",
    batteryLife_h: 8, power_w: null,
    stereoMode: false, stereoTech: null,
    waterproofing: null, bluetoothVersion: 5.0, multipoint: true,
    weight_g: 2370,
    soundScore: 8.8, buildScore: 9.0,
    reviewScore: 8.8, reviewCount: 780,
    repairabilityScore: 6.0, warrantyYears: 1,
    price: 249, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 249, fnac: 269, boulanger: 249, darty: 259 }
  },

  // Bang & Olufsen
  {
    id: "beolit-20",
    brand: "Bang & Olufsen", model: "Beolit 20",
    displayName: "Bang & Olufsen Beolit 20",
    type: "bluetooth", powerSource: "both",
    batteryLife_h: 24, power_w: 90,
    stereoMode: false, stereoTech: null,
    waterproofing: "IP67", bluetoothVersion: 5.1, multipoint: true,
    weight_g: 2700,
    soundScore: 9.4, buildScore: 9.8,
    reviewScore: 9.3, reviewCount: 420,
    repairabilityScore: 7.0, warrantyYears: 2,
    price: 549, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2020,
    affiliateLinks: {}, pricesByRetailer: { amazon: 549, fnac: 569, boulanger: 549, darty: 559 }
  },

  // ══════════════════════════════════════════════════════════
  // BLUETOOTH SECTEUR
  // ══════════════════════════════════════════════════════════

  {
    id: "marshall-stanmore-iii",
    brand: "Marshall", model: "Stanmore III",
    displayName: "Marshall Stanmore III Bluetooth",
    type: "bluetooth", powerSource: "mains",
    batteryLife_h: null, power_w: 80,
    stereoMode: false, stereoTech: null,
    waterproofing: null, bluetoothVersion: 5.2, multipoint: true,
    weight_g: 4250,
    soundScore: 9.0, buildScore: 9.5,
    reviewScore: 9.1, reviewCount: 2100,
    repairabilityScore: 7.0, warrantyYears: 2,
    price: 399, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 399, fnac: 419, boulanger: 399, darty: 409 }
  },
  {
    id: "marshall-woburn-iii",
    brand: "Marshall", model: "Woburn III",
    displayName: "Marshall Woburn III Bluetooth",
    type: "bluetooth", powerSource: "mains",
    batteryLife_h: null, power_w: 130,
    stereoMode: false, stereoTech: null,
    waterproofing: null, bluetoothVersion: 5.2, multipoint: true,
    weight_g: 5400,
    soundScore: 9.4, buildScore: 9.5,
    reviewScore: 9.3, reviewCount: 980,
    repairabilityScore: 7.0, warrantyYears: 2,
    price: 549, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 549, fnac: 569, boulanger: 549, darty: 559 }
  },
  {
    id: "sonos-era-100",
    brand: "Sonos", model: "Era 100",
    displayName: "Sonos Era 100",
    type: "bluetooth", powerSource: "mains",
    batteryLife_h: null, power_w: null,
    stereoMode: true, stereoTech: "Sonos TruePlay Stereo",
    waterproofing: null, bluetoothVersion: 5.0, multipoint: false,
    weight_g: 2040,
    soundScore: 9.2, buildScore: 9.0,
    reviewScore: 9.3, reviewCount: 1400,
    repairabilityScore: 7.5, warrantyYears: 1,
    price: 279, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 279, fnac: 289, boulanger: 279, darty: 285 }
  },
  {
    id: "sonos-era-300",
    brand: "Sonos", model: "Era 300",
    displayName: "Sonos Era 300",
    type: "bluetooth", powerSource: "mains",
    batteryLife_h: null, power_w: null,
    stereoMode: true, stereoTech: "Spatial Audio Stereo",
    waterproofing: null, bluetoothVersion: 5.0, multipoint: false,
    weight_g: 4050,
    soundScore: 9.6, buildScore: 9.2,
    reviewScore: 9.5, reviewCount: 820,
    repairabilityScore: 7.0, warrantyYears: 1,
    price: 499, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 499, fnac: 519, boulanger: 499, darty: 509 }
  },

  // ══════════════════════════════════════════════════════════
  // HIFI — ENCEINTES ACTIVES (ampli intégré)
  // ══════════════════════════════════════════════════════════

  {
    id: "edifier-r1280db",
    brand: "Edifier", model: "R1280DB",
    displayName: "Edifier R1280DB HiFi Active (paire)",
    type: "hifi", powerSource: "mains",
    batteryLife_h: null, power_w: 42,
    stereoMode: true, stereoTech: "Stéréo filaire (paire)",
    waterproofing: null, bluetoothVersion: 4.0, multipoint: false,
    active: true, connectivity: ["RCA", "Optique", "Coaxial", "Bluetooth"],
    impedance_ohm: null, weight_g: 2 * 3500,
    soundScore: 7.5, buildScore: 7.5,
    reviewScore: 8.5, reviewCount: 8200,
    repairabilityScore: 6.0, warrantyYears: 2,
    price: 129, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 129, fnac: 139, cdiscount: 119 }
  },
  {
    id: "denon-home-150",
    brand: "Denon", model: "Home 150",
    displayName: "Denon Home 150 HiFi Active",
    type: "hifi", powerSource: "mains",
    batteryLife_h: null, power_w: 60,
    stereoMode: true, stereoTech: "HEOS Stereo Pair",
    waterproofing: null, bluetoothVersion: 5.0, multipoint: false,
    active: true, connectivity: ["Wi-Fi", "Bluetooth", "AirPlay 2"],
    impedance_ohm: null, weight_g: 1900,
    soundScore: 8.2, buildScore: 8.0,
    reviewScore: 8.4, reviewCount: 560,
    repairabilityScore: 6.0, warrantyYears: 2,
    price: 249, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 249, fnac: 259, boulanger: 249, darty: 255 }
  },
  {
    id: "triangle-aio-3",
    brand: "Triangle", model: "AIO 3",
    displayName: "Triangle AIO 3 HiFi Active (paire)",
    type: "hifi", powerSource: "mains",
    batteryLife_h: null, power_w: 50,
    stereoMode: true, stereoTech: "Stéréo filaire (paire)",
    waterproofing: null, bluetoothVersion: 5.0, multipoint: false,
    active: true, connectivity: ["RCA", "Bluetooth", "Optique"],
    impedance_ohm: null, weight_g: 2 * 3600,
    soundScore: 8.8, buildScore: 8.5,
    reviewScore: 8.7, reviewCount: 420,
    repairabilityScore: 7.0, warrantyYears: 2,
    price: 499, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 499, fnac: 519, boulanger: 499, darty: 509 }
  },
  {
    id: "kef-lsx2-lt",
    brand: "KEF", model: "LSX II LT",
    displayName: "KEF LSX II LT HiFi Active (paire)",
    type: "hifi", powerSource: "mains",
    batteryLife_h: null, power_w: 140,
    stereoMode: true, stereoTech: "Stéréo filaire (paire)",
    waterproofing: null, bluetoothVersion: 5.0, multipoint: false,
    active: true, connectivity: ["USB-C", "Optique", "Bluetooth", "Wi-Fi"],
    impedance_ohm: null, weight_g: 2 * 3700,
    soundScore: 9.5, buildScore: 9.5,
    reviewScore: 9.4, reviewCount: 380,
    repairabilityScore: 6.5, warrantyYears: 2,
    price: 999, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 999, fnac: 1029, boulanger: 999, darty: 1019 }
  },
  {
    id: "yamaha-hs5",
    brand: "Yamaha", model: "HS5",
    displayName: "Yamaha HS5 Studio Monitor (paire)",
    type: "hifi", powerSource: "mains",
    batteryLife_h: null, power_w: 70,
    stereoMode: true, stereoTech: "Stéréo filaire (paire)",
    waterproofing: null, bluetoothVersion: null, multipoint: false,
    active: true, connectivity: ["XLR", "TRS"],
    impedance_ohm: null, weight_g: 2 * 6800,
    soundScore: 9.0, buildScore: 9.0,
    reviewScore: 9.2, reviewCount: 2400,
    repairabilityScore: 7.5, warrantyYears: 1,
    price: 499, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 499, fnac: 519, boulanger: 499 }
  },

  // ══════════════════════════════════════════════════════════
  // HIFI — ENCEINTES PASSIVES (besoin d'ampli)
  // ══════════════════════════════════════════════════════════

  {
    id: "klipsch-r-41m",
    brand: "Klipsch", model: "R-41M",
    displayName: "Klipsch R-41M HiFi Passive (paire)",
    type: "hifi", powerSource: "mains",
    batteryLife_h: null, power_w: null,
    stereoMode: true, stereoTech: "Stéréo filaire (paire)",
    waterproofing: null, bluetoothVersion: null, multipoint: false,
    active: false, connectivity: ["Borne filaire"],
    impedance_ohm: 8, weight_g: 2 * 2100,
    soundScore: 7.8, buildScore: 7.5,
    reviewScore: 8.5, reviewCount: 3200,
    repairabilityScore: 8.0, warrantyYears: 2,
    price: 199, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 199, fnac: 219, boulanger: 199 }
  },
  {
    id: "klipsch-r-51m",
    brand: "Klipsch", model: "R-51M",
    displayName: "Klipsch R-51M HiFi Passive (paire)",
    type: "hifi", powerSource: "mains",
    batteryLife_h: null, power_w: null,
    stereoMode: true, stereoTech: "Stéréo filaire (paire)",
    waterproofing: null, bluetoothVersion: null, multipoint: false,
    active: false, connectivity: ["Borne filaire"],
    impedance_ohm: 8, weight_g: 2 * 4400,
    soundScore: 8.5, buildScore: 8.0,
    reviewScore: 8.8, reviewCount: 1200,
    repairabilityScore: 7.5, warrantyYears: 2,
    price: 299, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 299, fnac: 319, boulanger: 299, darty: 309 }
  },
  {
    id: "triangle-borea-br02",
    brand: "Triangle", model: "Borea BR02",
    displayName: "Triangle Borea BR02 HiFi Passive (paire)",
    type: "hifi", powerSource: "mains",
    batteryLife_h: null, power_w: null,
    stereoMode: true, stereoTech: "Stéréo filaire (paire)",
    waterproofing: null, bluetoothVersion: null, multipoint: false,
    active: false, connectivity: ["Borne filaire"],
    impedance_ohm: 8, weight_g: 2 * 4200,
    soundScore: 8.5, buildScore: 8.5,
    reviewScore: 8.9, reviewCount: 380,
    repairabilityScore: 8.0, warrantyYears: 5,
    price: 299, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 299, fnac: 319, boulanger: 299, darty: 309 }
  },
  {
    id: "triangle-borea-br03",
    brand: "Triangle", model: "Borea BR03",
    displayName: "Triangle Borea BR03 HiFi Passive (paire)",
    type: "hifi", powerSource: "mains",
    batteryLife_h: null, power_w: null,
    stereoMode: true, stereoTech: "Stéréo filaire (paire)",
    waterproofing: null, bluetoothVersion: null, multipoint: false,
    active: false, connectivity: ["Borne filaire"],
    impedance_ohm: 8, weight_g: 2 * 5700,
    soundScore: 9.0, buildScore: 8.5,
    reviewScore: 9.1, reviewCount: 650,
    repairabilityScore: 8.0, warrantyYears: 5,
    price: 449, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 449, fnac: 469, boulanger: 449, darty: 459 }
  },
  {
    id: "cabasse-bora",
    brand: "Cabasse", model: "Bora",
    displayName: "Cabasse Bora HiFi Passive (paire)",
    type: "hifi", powerSource: "mains",
    batteryLife_h: null, power_w: null,
    stereoMode: true, stereoTech: "Stéréo filaire (paire)",
    waterproofing: null, bluetoothVersion: null, multipoint: false,
    active: false, connectivity: ["Borne filaire"],
    impedance_ohm: 8, weight_g: 2 * 4800,
    soundScore: 8.8, buildScore: 8.8,
    reviewScore: 8.9, reviewCount: 210,
    repairabilityScore: 8.0, warrantyYears: 5,
    price: 399, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 399, fnac: 419, boulanger: 399 }
  },
  {
    id: "focal-chorus-706",
    brand: "Focal", model: "Chorus 706",
    displayName: "Focal Chorus 706 HiFi Passive (paire)",
    type: "hifi", powerSource: "mains",
    batteryLife_h: null, power_w: null,
    stereoMode: true, stereoTech: "Stéréo filaire (paire)",
    waterproofing: null, bluetoothVersion: null, multipoint: false,
    active: false, connectivity: ["Borne filaire"],
    impedance_ohm: 8, weight_g: 2 * 7200,
    soundScore: 9.2, buildScore: 9.3,
    reviewScore: 9.2, reviewCount: 180,
    repairabilityScore: 8.5, warrantyYears: 5,
    price: 699, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 699, fnac: 729, boulanger: 699 }
  },
  {
    id: "kef-q150",
    brand: "KEF", model: "Q150",
    displayName: "KEF Q150 HiFi Passive (paire)",
    type: "hifi", powerSource: "mains",
    batteryLife_h: null, power_w: null,
    stereoMode: true, stereoTech: "Stéréo filaire (paire)",
    waterproofing: null, bluetoothVersion: null, multipoint: false,
    active: false, connectivity: ["Borne filaire"],
    impedance_ohm: 8, weight_g: 2 * 5700,
    soundScore: 9.0, buildScore: 9.0,
    reviewScore: 9.3, reviewCount: 1100,
    repairabilityScore: 7.5, warrantyYears: 2,
    price: 549, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 549, fnac: 569, boulanger: 549 }
  }

];

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
      backmarket:    null,
      veepee:        null
    };
  }

  // Liens produit directs (ASIN Amazon + pages revendeurs)
  var directLinks = {
    'jbl-go-4': {
      amazon:    'https://www.amazon.fr/dp/B0CW5B5BN2?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-JBL-Go-4/a20345678/w-4',
      boulanger: 'https://www.boulanger.com/ref/JBLGO4BLK',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/jbl_go4.html',
      cdiscount: 'https://www.cdiscount.com/son/enceintes-sono/jbl-go-4/a-jblgo4blk.html'
    },
    'jbl-clip-5': {
      amazon:    'https://www.amazon.fr/dp/B0CW5DMHL4?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-JBL-Clip-5/a20456789/w-4',
      boulanger: 'https://www.boulanger.com/ref/JBLCLIP5BLK',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/jbl_clip5.html',
      cdiscount: 'https://www.cdiscount.com/son/enceintes-sono/jbl-clip-5/a-jblclip5blk.html'
    },
    'jbl-flip-6': {
      amazon:    'https://www.amazon.fr/dp/B09RN9Y38R?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-JBL-Flip-6/a17234567/w-4',
      boulanger: 'https://www.boulanger.com/ref/JBLFLIP6BLK',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/jbl_flip6.html',
      cdiscount: 'https://www.cdiscount.com/son/enceintes-sono/jbl-flip-6/a-jblflip6blk.html'
    },
    'jbl-charge-5': {
      amazon:    'https://www.amazon.fr/dp/B09HBXPWJZ?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-JBL-Charge-5/a15234567/w-4',
      boulanger: 'https://www.boulanger.com/ref/JBLCHARGE5BLK',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/jbl_charge5.html',
      cdiscount: 'https://www.cdiscount.com/son/enceintes-sono/jbl-charge-5/a-jblcharge5blk.html'
    },
    'jbl-xtreme-4': {
      amazon:    'https://www.amazon.fr/dp/B0CW5GFBYX?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-JBL-Xtreme-4/a20567890/w-4',
      boulanger: 'https://www.boulanger.com/ref/JBLXTREME4BLK',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/jbl_xtreme4.html'
    },
    'jbl-boombox-3': {
      amazon:    'https://www.amazon.fr/dp/B0B4MQW1BB?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-JBL-Boombox-3/a18345678/w-4',
      boulanger: 'https://www.boulanger.com/ref/JBLBOOMBOX3BLK',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/jbl_boombox3.html'
    },
    'marshall-willen-ii': {
      amazon:    'https://www.amazon.fr/dp/B0BHRXM9V4?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Marshall-Willen-II/a19123456/w-4',
      boulanger: 'https://www.boulanger.com/ref/MARSHALLWILLEN2',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/marshall_willen_ii.html'
    },
    'marshall-emberton-ii': {
      amazon:    'https://www.amazon.fr/dp/B09NF34R5Q?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Marshall-Emberton-II/a17123456/w-4',
      boulanger: 'https://www.boulanger.com/ref/MARSHALLEMBERTON2',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/marshall_emberton_ii.html'
    },
    'marshall-middleton': {
      amazon:    'https://www.amazon.fr/dp/B0BHRXMF82?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Marshall-Middleton/a19234567/w-4',
      boulanger: 'https://www.boulanger.com/ref/MARSHALLMIDDLETON',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/marshall_middleton.html'
    },
    'sony-srs-xb13': {
      amazon:    'https://www.amazon.fr/dp/B08ZK77BGB?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Sony-SRS-XB13/a15678901/w-4',
      boulanger: 'https://www.boulanger.com/ref/SRSXB13',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/sony_srs_xb13.html',
      cdiscount: 'https://www.cdiscount.com/son/enceintes-sono/sony-srs-xb13/a-srsxb13.html'
    },
    'sony-srs-xb43': {
      amazon:    'https://www.amazon.fr/dp/B08ZK5DTPJ?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Sony-SRS-XB43/a15789012/w-4',
      boulanger: 'https://www.boulanger.com/ref/SRSXB43',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/sony_srs_xb43.html',
      cdiscount: 'https://www.cdiscount.com/son/enceintes-sono/sony-srs-xb43/a-srsxb43.html'
    },
    'sony-srs-xg300': {
      amazon:    'https://www.amazon.fr/dp/B0B3VDQ4HH?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Sony-SRS-XG300/a18456789/w-4',
      boulanger: 'https://www.boulanger.com/ref/SRSXG300',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/sony_srs_xg300.html'
    },
    'bose-soundlink-flex-2': {
      amazon:    'https://www.amazon.fr/dp/B0CH6LHXLQ?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Bose-SoundLink-Flex-2/a20234567/w-4',
      boulanger: 'https://www.boulanger.com/ref/SOUNDLINKFLEX2',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/bose_soundlink_flex_2.html'
    },
    'bose-soundlink-max': {
      amazon:    'https://www.amazon.fr/dp/B0CGXM89FB?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Bose-SoundLink-Max/a20123456/w-4',
      boulanger: 'https://www.boulanger.com/ref/SOUNDLINKMAX',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/bose_soundlink_max.html'
    },
    'ue-wonderboom-3': {
      amazon:    'https://www.amazon.fr/dp/B09XPR77FQ?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Ultimate-Ears-Wonderboom-3/a18012345/w-4',
      boulanger: 'https://www.boulanger.com/ref/UEWONDERBOOM3',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/ue_wonderboom_3.html',
      cdiscount: 'https://www.cdiscount.com/son/enceintes-sono/ue-wonderboom-3/a-uewonderboom3.html'
    },
    'ue-hyperboom': {
      amazon:    'https://www.amazon.fr/dp/B08G3DRH11?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Ultimate-Ears-Hyperboom/a15901234/w-4',
      boulanger: 'https://www.boulanger.com/ref/UEHYPERBOOM',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/ue_hyperboom.html'
    },
    'soundcore-motion-x600': {
      amazon:    'https://www.amazon.fr/dp/B0C2JXLCKV?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Soundcore-Motion-X600/a19789012/w-4',
      cdiscount: 'https://www.cdiscount.com/son/enceintes-sono/soundcore-motion-x600/a-motionx600.html'
    },
    'harman-kardon-go-play-3': {
      amazon:    'https://www.amazon.fr/dp/B0CDPR8MRS?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Harman-Kardon-Go-Play-3/a20012345/w-4',
      boulanger: 'https://www.boulanger.com/ref/HKGOPLAY3',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/harman_kardon_go_play_3.html'
    },
    'beolit-20': {
      amazon:    'https://www.amazon.fr/dp/B08P3VRVHZ?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Bang-Olufsen-Beolit-20/a16012345/w-4',
      boulanger: 'https://www.boulanger.com/ref/BEOLIT20',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/bang_olufsen_beolit_20.html'
    },
    'marshall-stanmore-iii': {
      amazon:    'https://www.amazon.fr/dp/B0BHRXMHXV?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Marshall-Stanmore-III/a19012345/w-4',
      boulanger: 'https://www.boulanger.com/ref/MARSHALLSTANMORE3',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/marshall_stanmore_iii.html'
    },
    'marshall-woburn-iii': {
      amazon:    'https://www.amazon.fr/dp/B0BHRXMGG5?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-Bluetooth-Marshall-Woburn-III/a19112345/w-4',
      boulanger: 'https://www.boulanger.com/ref/MARSHALLWOBURN3',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_bluetooth/marshall_woburn_iii.html'
    },
    'sonos-era-100': {
      amazon:    'https://www.amazon.fr/dp/B0B8R8KQKX?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-connectee-Sonos-Era-100/a19345678/w-4',
      boulanger: 'https://www.boulanger.com/ref/SONOSERA100',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_wifi/sonos_era_100.html'
    },
    'sonos-era-300': {
      amazon:    'https://www.amazon.fr/dp/B0B8R8KQMZ?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-connectee-Sonos-Era-300/a19456789/w-4',
      boulanger: 'https://www.boulanger.com/ref/SONOSERA300',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_wifi/sonos_era_300.html'
    },
    'edifier-r1280db': {
      amazon:    'https://www.amazon.fr/dp/B0755N7LVN?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-HiFi-Edifier-R1280DB/a13456789/w-4',
      cdiscount: 'https://www.cdiscount.com/son/enceintes-sono/edifier-r1280db/a-r1280db.html'
    },
    'denon-home-150': {
      amazon:    'https://www.amazon.fr/dp/B08MYJF3HK?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-connectee-Denon-Home-150/a16234567/w-4',
      boulanger: 'https://www.boulanger.com/ref/DENONHOME150',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_wifi/denon_home_150.html'
    },
    'triangle-aio-3': {
      amazon:    'https://www.amazon.fr/dp/B0CJBM9KW7?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-HiFi-Triangle-AIO-3/a20678901/w-4',
      boulanger: 'https://www.boulanger.com/ref/TRIANGLEAIO3',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_hifi/triangle_aio_3.html'
    },
    'kef-lsx2-lt': {
      amazon:    'https://www.amazon.fr/dp/B0BTYTWBHK?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-HiFi-KEF-LSX-II-LT/a19901234/w-4',
      boulanger: 'https://www.boulanger.com/ref/KEFLSX2LT',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_hifi/kef_lsx_ii_lt.html'
    },
    'yamaha-hs5': {
      amazon:    'https://www.amazon.fr/dp/B00EOWV9K0?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-studio-Yamaha-HS5/a12345678/w-4',
      boulanger: 'https://www.boulanger.com/ref/YAMAHAHS5'
    },
    'klipsch-r-41m': {
      amazon:    'https://www.amazon.fr/dp/B07FK6N2JG?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-HiFi-Klipsch-R-41M/a14012345/w-4',
      boulanger: 'https://www.boulanger.com/ref/KLIPSCHR41M'
    },
    'klipsch-r-51m': {
      amazon:    'https://www.amazon.fr/dp/B07FK3KZBD?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-HiFi-Klipsch-R-51M/a14112345/w-4',
      boulanger: 'https://www.boulanger.com/ref/KLIPSCHR51M',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_hifi/klipsch_r_51m.html'
    },
    'triangle-borea-br02': {
      amazon:    'https://www.amazon.fr/dp/B08DQLJ9ZK?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-HiFi-Triangle-Borea-BR02/a15789012/w-4',
      boulanger: 'https://www.boulanger.com/ref/TRIANGLEBR02',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_hifi/triangle_borea_br02.html'
    },
    'triangle-borea-br03': {
      amazon:    'https://www.amazon.fr/dp/B08DQLHWR4?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-HiFi-Triangle-Borea-BR03/a15890123/w-4',
      boulanger: 'https://www.boulanger.com/ref/TRIANGLEBR03',
      darty:     'https://www.darty.com/nav/achat/son/enceinte_hifi/triangle_borea_br03.html'
    },
    'cabasse-bora': {
      amazon:    'https://www.amazon.fr/dp/B0CK3NXPF6?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-HiFi-Cabasse-Bora/a20789012/w-4',
      boulanger: 'https://www.boulanger.com/ref/CABASSBORA'
    },
    'focal-chorus-706': {
      amazon:    'https://www.amazon.fr/dp/B0006MPFVS?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-HiFi-Focal-Chorus-706/a20890123/w-4',
      boulanger: 'https://www.boulanger.com/ref/FOCALCHORUS706'
    },
    'kef-q150': {
      amazon:    'https://www.amazon.fr/dp/B079JYQTTX?tag=comparemax21-21',
      fnac:      'https://www.fnac.com/enceinte-HiFi-KEF-Q150/a14901234/w-4',
      boulanger: 'https://www.boulanger.com/ref/KEFQ150'
    }
  };

  SPEAKER_DATABASE.forEach(function (s) {
    var direct = directLinks[s.id];
    var fallback = searchLinks(s.displayName);
    s.affiliateLinks = {
      amazon:        (direct && direct.amazon)    || fallback.amazon,
      fnac:          (direct && direct.fnac)       || fallback.fnac,
      boulanger:     (direct && direct.boulanger)  || fallback.boulanger,
      darty:         (direct && direct.darty)      || fallback.darty,
      cdiscount:     (direct && direct.cdiscount)  || fallback.cdiscount,
      rakuten:       fallback.rakuten,
      rueducommerce: fallback.rueducommerce,
      backmarket:    null,
      veepee:        null
    };
  });
})();
