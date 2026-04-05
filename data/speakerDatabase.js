// ============================================================
// speakerDatabase.js — Base de données enceintes
// Types : bluetooth | hifi
// Alimentation BT : battery | mains | both
// ============================================================

const SPEAKER_DATABASE = [

  // ── BLUETOOTH BATTERIE ───────────────────────────────────────

  {
    id: "jbl-charge-5",
    brand: "JBL", model: "Charge 5",
    displayName: "JBL Charge 5",
    type: "bluetooth",
    powerSource: "battery",
    batteryLife_h: 20,
    power_w: 30,
    stereoMode: true, stereoTech: "PartyBoost",
    waterproofing: "IP67",
    bluetoothVersion: 5.1, multipoint: false,
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
    id: "jbl-flip-6",
    brand: "JBL", model: "Flip 6",
    displayName: "JBL Flip 6",
    type: "bluetooth",
    powerSource: "battery",
    batteryLife_h: 12,
    power_w: 20,
    stereoMode: true, stereoTech: "PartyBoost",
    waterproofing: "IP67",
    bluetoothVersion: 5.1, multipoint: false,
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
    id: "jbl-boombox-3",
    brand: "JBL", model: "Boombox 3",
    displayName: "JBL Boombox 3",
    type: "bluetooth",
    powerSource: "battery",
    batteryLife_h: 24,
    power_w: 80,
    stereoMode: true, stereoTech: "PartyBoost",
    waterproofing: "IP67",
    bluetoothVersion: 5.3, multipoint: false,
    weight_g: 5700,
    soundScore: 9.2, buildScore: 8.5,
    reviewScore: 9.0, reviewCount: 1900,
    repairabilityScore: 5.0, warrantyYears: 1,
    price: 399, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 399, fnac: 419, boulanger: 399, darty: 409 }
  },

  {
    id: "marshall-emberton-ii",
    brand: "Marshall", model: "Emberton II",
    displayName: "Marshall Emberton II",
    type: "bluetooth",
    powerSource: "battery",
    batteryLife_h: 30,
    power_w: 10,
    stereoMode: false, stereoTech: null,
    waterproofing: "IPX7",
    bluetoothVersion: 5.1, multipoint: true,
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
    id: "sony-srs-xb43",
    brand: "Sony", model: "SRS-XB43",
    displayName: "Sony SRS-XB43",
    type: "bluetooth",
    powerSource: "battery",
    batteryLife_h: 24,
    power_w: 32,
    stereoMode: false, stereoTech: null,
    waterproofing: "IP67",
    bluetoothVersion: 5.0, multipoint: true,
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
    id: "ultimate-ears-wonderboom-3",
    brand: "Ultimate Ears", model: "Wonderboom 3",
    displayName: "Ultimate Ears Wonderboom 3",
    type: "bluetooth",
    powerSource: "battery",
    batteryLife_h: 14,
    power_w: 10,
    stereoMode: true, stereoTech: "True Wireless Stereo",
    waterproofing: "IP67",
    bluetoothVersion: 5.0, multipoint: false,
    weight_g: 425,
    soundScore: 7.0, buildScore: 8.0,
    reviewScore: 8.3, reviewCount: 5200,
    repairabilityScore: 4.0, warrantyYears: 2,
    price: 89, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 89, fnac: 99, boulanger: 89, darty: 95, cdiscount: 79 }
  },

  // ── BLUETOOTH SECTEUR (ou les deux) ──────────────────────────

  {
    id: "marshall-stanmore-iii",
    brand: "Marshall", model: "Stanmore III",
    displayName: "Marshall Stanmore III Bluetooth",
    type: "bluetooth",
    powerSource: "mains",
    batteryLife_h: null,
    power_w: 80,
    stereoMode: false, stereoTech: null,
    waterproofing: null,
    bluetoothVersion: 5.2, multipoint: true,
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
    id: "sonos-era-100",
    brand: "Sonos", model: "Era 100",
    displayName: "Sonos Era 100",
    type: "bluetooth",
    powerSource: "mains",
    batteryLife_h: null,
    power_w: null,
    stereoMode: true, stereoTech: "Sonos TruePlay Stereo",
    waterproofing: null,
    bluetoothVersion: 5.0, multipoint: false,
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
    id: "bose-soundlink-max",
    brand: "Bose", model: "SoundLink Max",
    displayName: "Bose SoundLink Max",
    type: "bluetooth",
    powerSource: "both",
    batteryLife_h: 20,
    power_w: null,
    stereoMode: true, stereoTech: "Party Mode / Stereo",
    waterproofing: "IP67",
    bluetoothVersion: 5.3, multipoint: true,
    weight_g: 1280,
    soundScore: 9.3, buildScore: 9.0,
    reviewScore: 9.2, reviewCount: 980,
    repairabilityScore: 6.0, warrantyYears: 1,
    price: 399, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2024,
    affiliateLinks: {}, pricesByRetailer: { amazon: 399, fnac: 419, boulanger: 399, darty: 409 }
  },

  // ── HIFI ACTIVES ─────────────────────────────────────────────

  {
    id: "triangle-borea-br03-active",
    brand: "Triangle", model: "AIO 3",
    displayName: "Triangle AIO 3 HiFi Active",
    type: "hifi",
    powerSource: "mains",
    batteryLife_h: null,
    power_w: 2 * 25,
    stereoMode: true, stereoTech: "Stéréo filaire (paire)",
    waterproofing: null,
    bluetoothVersion: 5.0, multipoint: false,
    active: true,
    connectivity: ["RCA", "Bluetooth", "Optique"],
    impedance_ohm: null,
    weight_g: 2 * 3600,
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
    displayName: "KEF LSX II LT HiFi Active",
    type: "hifi",
    powerSource: "mains",
    batteryLife_h: null,
    power_w: 2 * 70,
    stereoMode: true, stereoTech: "Stéréo filaire (paire)",
    waterproofing: null,
    bluetoothVersion: 5.0, multipoint: false,
    active: true,
    connectivity: ["USB-C", "Optique", "Bluetooth", "Wi-Fi"],
    impedance_ohm: null,
    weight_g: 2 * 3700,
    soundScore: 9.5, buildScore: 9.5,
    reviewScore: 9.4, reviewCount: 380,
    repairabilityScore: 6.5, warrantyYears: 2,
    price: 999, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2023,
    affiliateLinks: {}, pricesByRetailer: { amazon: 999, fnac: 1029, boulanger: 999, darty: 1019 }
  },

  {
    id: "denon-home-150",
    brand: "Denon", model: "Home 150",
    displayName: "Denon Home 150 HiFi Active",
    type: "hifi",
    powerSource: "mains",
    batteryLife_h: null,
    power_w: 2 * 30,
    stereoMode: true, stereoTech: "HEOS Stereo Pair",
    waterproofing: null,
    bluetoothVersion: 5.0, multipoint: false,
    active: true,
    connectivity: ["Wi-Fi", "Bluetooth", "AirPlay 2"],
    impedance_ohm: null,
    weight_g: 1900,
    soundScore: 8.2, buildScore: 8.0,
    reviewScore: 8.4, reviewCount: 560,
    repairabilityScore: 6.0, warrantyYears: 2,
    price: 249, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 249, fnac: 259, boulanger: 249, darty: 255 }
  },

  // ── HIFI PASSIVES ─────────────────────────────────────────────

  {
    id: "klipsch-r-51m",
    brand: "Klipsch", model: "R-51M",
    displayName: "Klipsch R-51M HiFi Passive (paire)",
    type: "hifi",
    powerSource: "mains",
    batteryLife_h: null,
    power_w: null,
    stereoMode: true, stereoTech: "Stéréo filaire (paire)",
    waterproofing: null,
    bluetoothVersion: null, multipoint: false,
    active: false,
    connectivity: ["Borne filaire"],
    impedance_ohm: 8,
    weight_g: 2 * 4400,
    soundScore: 8.5, buildScore: 8.0,
    reviewScore: 8.8, reviewCount: 1200,
    repairabilityScore: 7.5, warrantyYears: 2,
    price: 299, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 299, fnac: 319, boulanger: 299, darty: 309 }
  },

  {
    id: "triangle-borea-br03",
    brand: "Triangle", model: "Borea BR03",
    displayName: "Triangle Borea BR03 HiFi Passive (paire)",
    type: "hifi",
    powerSource: "mains",
    batteryLife_h: null,
    power_w: null,
    stereoMode: true, stereoTech: "Stéréo filaire (paire)",
    waterproofing: null,
    bluetoothVersion: null, multipoint: false,
    active: false,
    connectivity: ["Borne filaire"],
    impedance_ohm: 8,
    weight_g: 2 * 5700,
    soundScore: 9.0, buildScore: 8.5,
    reviewScore: 9.1, reviewCount: 650,
    repairabilityScore: 8.0, warrantyYears: 5,
    price: 449, originalPrice: null,
    hasPromotion: false, promotionLabel: null, promotionEndDate: null,
    year: 2022,
    affiliateLinks: {}, pricesByRetailer: { amazon: 449, fnac: 469, boulanger: 449, darty: 459 }
  }

];

// Génère les liens de recherche pour tous les revendeurs
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
      rakuten:        'https://www.google.fr/search?q=' + encodeURIComponent('site:fr.shopping.rakuten.com "' + q + '"'),
      rueducommerce:  'https://www.google.fr/search?q=' + encodeURIComponent('site:rueducommerce.fr "' + q + '"'),
      veepee:         null
    };
  }
  SPEAKER_DATABASE.forEach(function (s) {
    s.affiliateLinks = searchLinks(s.displayName);
  });
})();
