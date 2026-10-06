# Réaliser la page Contact de SDVB3

**Responsable :** Gabin LESCOAT (@gabinlsc)

**Label :** enhancement

**Branche :** `feature/contact`, créée depuis `dev`

## Besoin

En tant que visiteur, je souhaite connaître les coordonnées de SDVB3 et essayer un formulaire de contact fictif, sur ordinateur comme sur mobile.

## Critères de réussite

- [ ] `contact.html` contient des coordonnées fictives explicitement signalées.
- [ ] Le formulaire contient un nom, un e-mail, un message et un bouton « Envoyer le message ».
- [ ] Tous les champs ont des libellés associés et une validation adaptée.
- [ ] Une indication précise qu'aucun envoi ni stockage n'a lieu ; seuls des essais fictifs sont demandés.
- [ ] Une confirmation accessible s'affiche après une saisie valide, sans requête réseau.
- [ ] Sans JavaScript, aucun envoi n'est possible.
- [ ] Le menu référence les quatre pages et identifie Contact comme page courante.
- [ ] Le pied de page mentionne SDVB3 et les quatre membres.
- [ ] La page est lisible à 320, 390, 768 et 1280 pixels et utilisable au clavier.
- [ ] La commande HTML contrôle toutes les pages `.html` à la racine, y compris les futures contributions.
- [ ] Les tests locaux et les vérifications GitHub Actions passent.
- [ ] Une PR vers `dev` est relue et approuvée par un autre membre ; une correction demandée est conservée dans l'historique.

## Relecture

Relire le rendu mobile, les libellés et le caractère fictif du formulaire. La navigation complète sera testée après intégration des trois autres pages dans `dev`.

Ne pas fermer cette Issue avant l'approbation et la fusion.
