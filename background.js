// ============================================================
// background.js - Service Worker (Manifest V3)
// Ce fichier s'exécute en arrière-plan. Il gère l'installation
// de l'extension et la sauvegarde des préférences par défaut.
// ============================================================

// Quand l'extension est installée pour la première fois
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Enregistrer les filtres par défaut dans le stockage local Chrome
    chrome.storage.local.set({
      tvComparatorFilters: {
        priceMin: 0,
        priceMax: 1500,
        noLimit: false,
        sizeMin: 43,
        sizeMax: 65
      },
      installDate: new Date().toISOString(),
      version: chrome.runtime.getManifest().version
    });
    console.log('ComparTV installé avec succès !');
  }

  if (details.reason === 'update') {
    console.log('ComparTV mis à jour vers la version', chrome.runtime.getManifest().version);
  }
});

// Écouter les messages éventuels depuis popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_VERSION') {
    sendResponse({ version: chrome.runtime.getManifest().version });
  }
  // Important : retourner true pour autoriser des réponses asynchrones futures
  return true;
});
