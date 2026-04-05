// ============================================================
// affiliate.js - Système de liens d'affiliation
//
// Ce fichier gère tout ce qui concerne les liens vers les
// revendeurs partenaires. C'est ici que vous configurez
// vos identifiants d'affiliation une fois inscrits sur
// les plateformes partenaires.
//
// COMMENT GAGNER DE L'ARGENT AVEC L'AFFILIATION :
// Quand un utilisateur clique sur un lien et achète une TV,
// vous touchez une commission (1-4% du prix d'achat).
// Exemple : TV à 1000€ avec 3% de commission = 30€ pour vous.
// ============================================================

// ------------------------------------------------------------
// CONFIGURATION DES REVENDEURS
// Modifiez ces données avec vos propres informations
// une fois inscrit sur les plateformes d'affiliation.
// ------------------------------------------------------------
const RETAILERS = {
  amazon: {
    name: "Amazon",
    shortName: "Amazon",
    bgColor: "#FF9900",
    textColor: "#000000",
    // VOTRE TAG AMAZON : remplacez "VOTRE_TAG-21" par votre vrai tag
    // Obtenez-le sur : https://affiliate-program.amazon.fr
    affiliateTag: "VOTRE_TAG-21",
    program: "Amazon Associates",
    commission: "1 à 4%",
    cookieDuration: "24 heures",
    joinUrl: "https://affiliate-program.amazon.fr",
    priority: 1
  },
  fnac: {
    name: "Fnac",
    shortName: "Fnac",
    bgColor: "#E5A313",
    textColor: "#000000",
    // Inscrivez-vous sur Awin, cherchez "Fnac" et demandez l'accès
    program: "Awin (chercher 'Fnac')",
    commission: "2 à 3%",
    cookieDuration: "30 jours",
    joinUrl: "https://www.awin.com/fr",
    priority: 2
  },
  boulanger: {
    name: "Boulanger",
    shortName: "Boulanger",
    bgColor: "#0057A8",
    textColor: "#ffffff",
    program: "Awin (chercher 'Boulanger')",
    commission: "2%",
    cookieDuration: "30 jours",
    joinUrl: "https://www.awin.com/fr",
    priority: 3
  },
  darty: {
    name: "Darty",
    shortName: "Darty",
    bgColor: "#EE0000",
    textColor: "#ffffff",
    program: "Awin (chercher 'Darty')",
    commission: "2%",
    cookieDuration: "30 jours",
    joinUrl: "https://www.awin.com/fr",
    priority: 4
  },
  cdiscount: {
    name: "Cdiscount",
    shortName: "Cdiscount",
    bgColor: "#DC0014",
    textColor: "#ffffff",
    program: "Awin (chercher 'Cdiscount')",
    commission: "2 à 3%",
    cookieDuration: "30 jours",
    joinUrl: "https://www.awin.com/fr",
    priority: 5
  },
  leclerc: {
    name: "E.Leclerc",
    shortName: "Leclerc",
    bgColor: "#003399",
    textColor: "#ffffff",
    program: "Effinity (chercher 'Leclerc')",
    commission: "1 à 2%",
    cookieDuration: "30 jours",
    joinUrl: "https://www.effinity.fr",
    priority: 6
  },
  ldlc: {
    name: "LDLC",
    shortName: "LDLC",
    bgColor: "#FF6B00",
    textColor: "#ffffff",
    program: "Effinity (chercher 'LDLC')",
    commission: "2%",
    cookieDuration: "30 jours",
    joinUrl: "https://www.effinity.fr",
    priority: 7
  },
  but: {
    name: "But",
    shortName: "But",
    bgColor: "#E30613",
    textColor: "#ffffff",
    program: "Awin (chercher 'But')",
    commission: "2%",
    cookieDuration: "30 jours",
    joinUrl: "https://www.awin.com/fr",
    priority: 8
  },
  carrefour: {
    name: "Carrefour",
    shortName: "Carrefour",
    bgColor: "#003399",
    textColor: "#ffffff",
    program: "Tradedoubler (chercher 'Carrefour')",
    commission: "1 à 3%",
    cookieDuration: "30 jours",
    joinUrl: "https://www.tradedoubler.com/fr",
    priority: 9
  },
  electrodepot: {
    name: "Electro Dépôt",
    shortName: "Electrodépôt",
    bgColor: "#FFCC00",
    textColor: "#000000",
    program: "Awin (chercher 'Electro Depot')",
    commission: "2%",
    cookieDuration: "30 jours",
    joinUrl: "https://www.awin.com/fr",
    priority: 10
  },
  ubaldi: {
    name: "Ubaldi",
    shortName: "Ubaldi",
    bgColor: "#0070C0",
    textColor: "#ffffff",
    program: "Awin (chercher 'Ubaldi')",
    commission: "2%",
    cookieDuration: "30 jours",
    joinUrl: "https://www.awin.com/fr",
    priority: 11
  },
  veepee: {
    name: "Veepee",
    shortName: "Veepee",
    bgColor: "#CB0032",
    textColor: "#ffffff",
    program: "Awin (chercher 'Veepee')",
    commission: "3%",
    cookieDuration: "7 jours",
    joinUrl: "https://www.awin.com/fr",
    priority: 12,
    isFlashSale: true
  },
  backmarket: {
    name: "Back Market",
    shortName: "Back Market",
    bgColor: "#1DB954",
    textColor: "#ffffff",
    program: "Awin (chercher 'Back Market')",
    commission: "3 à 5%",
    cookieDuration: "30 jours",
    joinUrl: "https://www.awin.com/fr",
    priority: 13
  },
  dyson: {
    name: "Dyson",
    shortName: "Dyson",
    bgColor: "#CC2229",
    textColor: "#ffffff",
    program: "Awin (chercher 'Dyson')",
    commission: "3%",
    cookieDuration: "30 jours",
    joinUrl: "https://www.awin.com/fr",
    priority: 14
  },
  delonghi: {
    name: "De'Longhi",
    shortName: "DeLonghi",
    bgColor: "#8B0000",
    textColor: "#ffffff",
    program: "Awin (chercher 'De Longhi')",
    commission: "3%",
    cookieDuration: "30 jours",
    joinUrl: "https://www.awin.com/fr",
    priority: 15
  },
  rakuten: {
    name: "Rakuten",
    shortName: "Rakuten",
    bgColor: "#BF0000",
    textColor: "#ffffff",
    program: "Rakuten Advertising",
    commission: "3 à 5%",
    cookieDuration: "30 jours",
    joinUrl: "https://rakutenadvertising.com/fr",
    priority: 16
  },
  rueducommerce: {
    name: "Rue du Commerce",
    shortName: "Rue du Commerce",
    bgColor: "#E2001A",
    textColor: "#ffffff",
    program: "Awin (chercher 'Rue du Commerce')",
    commission: "2 à 4%",
    cookieDuration: "30 jours",
    joinUrl: "https://www.awin.com/fr",
    priority: 17
  },
  lidl: {
    name: "Lidl",
    shortName: "Lidl",
    bgColor: "#FFD700",
    textColor: "#003399",
    program: "Awin (chercher 'Lidl')",
    commission: "2%",
    cookieDuration: "30 jours",
    joinUrl: "https://www.awin.com/fr",
    priority: 18
  }
};

// ------------------------------------------------------------
// Génère les boutons HTML des revendeurs pour une TV
// ------------------------------------------------------------
function generateRetailerButtons(tv) {
  // Récupère les revendeurs disponibles pour cette TV (ceux avec un lien non null)
  const availableRetailers = Object.entries(tv.affiliateLinks)
    .filter(([key, url]) => url !== null && RETAILERS[key])
    .sort(([a], [b]) => RETAILERS[a].priority - RETAILERS[b].priority);

  if (availableRetailers.length === 0) {
    return '<p class="no-retailers">Aucun revendeur disponible</p>';
  }

  // Trouver le prix le plus bas parmi les revendeurs
  const lowestPrice = availableRetailers.reduce((min, [key]) => {
    const price = tv.pricesByRetailer && tv.pricesByRetailer[key];
    return price && price < min ? price : min;
  }, Infinity);

  const buttons = availableRetailers.map(([retailerKey, url]) => {
    const retailer = RETAILERS[retailerKey];
    const price = tv.pricesByRetailer && tv.pricesByRetailer[retailerKey];
    const isLowest = price && price === lowestPrice;

    return `
      <a href="${url}"
         target="_blank"
         class="retailer-btn ${isLowest ? 'retailer-btn--best' : ''}"
         style="background-color: ${retailer.bgColor}; color: ${retailer.textColor};"
         title="Voir sur ${retailer.name}${retailer.isFlashSale ? ' (vente flash - disponibilité limitée)' : ''}">
        <span class="retailer-name">${retailer.shortName}</span>
        ${price ? `<span class="retailer-price">${price} €</span>` : ''}
        ${isLowest ? '<span class="best-price-badge">Meilleur prix</span>' : ''}
        ${retailer.isFlashSale ? '<span class="flash-badge">⚡</span>' : ''}
      </a>
    `;
  }).join('');

  return `
    <div class="retailer-buttons-container">
      <p class="buy-label">Acheter chez :</p>
      <div class="retailer-buttons">${buttons}</div>
    </div>
  `;
}

// ------------------------------------------------------------
// Génère l'explication du système d'affiliation
// (section informative pour l'utilisateur)
// ------------------------------------------------------------
function generateAffiliateExplanation() {
  const programsHtml = [
    {
      name: "Amazon Associates",
      url: "affiliate-program.amazon.fr",
      retailers: "Amazon",
      commission: "1-4%",
      delay: "60 jours après livraison",
      info: "Programme facile à rejoindre, validé en quelques jours. Le plus simple pour commencer."
    },
    {
      name: "Awin",
      url: "awin.com/fr",
      retailers: "Fnac, Boulanger, Darty, Cdiscount, But, Electro Dépôt, Ubaldi, Veepee",
      commission: "1-3%",
      delay: "30 jours après validation commande",
      info: "Une seule inscription donne accès à de nombreux marchands. Plateforme principale en France."
    },
    {
      name: "Effinity",
      url: "effinity.fr",
      retailers: "E.Leclerc, LDLC",
      commission: "1-2%",
      delay: "30 jours",
      info: "Plateforme française. Bon pour Leclerc et LDLC notamment."
    },
    {
      name: "Tradedoubler",
      url: "tradedoubler.com/fr",
      retailers: "Carrefour",
      commission: "1-3%",
      delay: "30 jours",
      info: "Plateforme européenne. Nécessaire pour Carrefour."
    }
  ].map(p => `
    <div class="program-card">
      <div class="program-header">
        <strong>${p.name}</strong>
        <span class="program-commission">${p.commission}</span>
      </div>
      <div class="program-retailers">Couvre : ${p.retailers}</div>
      <div class="program-info">${p.info}</div>
      <div class="program-meta">
        <span>Délai de paiement : ${p.delay}</span>
      </div>
    </div>
  `).join('');

  return `
    <div class="affiliate-explanation">
      <div class="affiliate-intro">
        <p>
          <strong>Comment ça marche ?</strong> Quand vous cliquez sur "Voir sur Fnac" ou "Voir sur Amazon"
          depuis ce comparateur et que vous achetez la télévision, le site reçoit une petite commission
          (1 à 4% du prix). <strong>Cela ne change pas le prix que vous payez.</strong>
        </p>
        <p>
          C'est ce qui permet à ce service de rester <strong>entièrement gratuit</strong> pour vous.
        </p>
      </div>
      <h4>Les plateformes d'affiliation à rejoindre :</h4>
      <div class="programs-grid">${programsHtml}</div>
      <p class="affiliate-note">
        ⚠️ <strong>Note importante :</strong> Les liens dans cette version de démonstration ne sont pas encore
        de vrais liens d'affiliation. Une fois inscrit sur ces plateformes, remplacez les URLs dans le fichier
        <code>data/tvDatabase.js</code> par vos propres liens d'affiliation.
      </p>
    </div>
  `;
}
