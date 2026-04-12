# Règles du projet — Comparateur Intelligent

## 1. Vérifier le travail avant de le rendre
Avant chaque réponse finale, relire les modifications effectuées et s'assurer qu'elles sont cohérentes avec le reste du code (pas de sélecteurs cassés, pas de valeurs orphelines, pas de régressions visibles).

## 2. Pusher automatiquement les modifications sur Netlify
Après chaque modification validée, effectuer automatiquement un `git add` + `git commit` + `git push origin main` sans attendre que l'utilisateur le demande. Si le push est rejeté (remote en avance), faire un `git pull --rebase` puis re-pusher.
