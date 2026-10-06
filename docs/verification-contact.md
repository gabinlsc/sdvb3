# Vérification de Contact

Contrôles effectués le 6 octobre 2026 pour la contribution de Gabin LESCOAT.

| Contrôle | Résultat |
| --- | --- |
| HTML : `npm run validate:html` sur toutes les pages à la racine | Réussi sur `contact.html`, seule page actuellement présente |
| Syntaxe JavaScript de Contact et du serveur local | Réussie |
| Affichage à 320, 390, 768 et 1280 pixels | Aucun débordement horizontal ; captures inspectées à 320 et 1280 pixels |
| Contrôles axe WCAG A/AA et 2.1 AA à ces quatre tailles | Aucune violation automatique détectée ; ne remplace pas une évaluation humaine complète |
| Chargement HTML, CSS, JavaScript et favicon sur Contact | Aucune réponse HTTP en erreur ni exception JavaScript détectée |
| Formulaire vide et e-mail invalide | Soumission bloquée et focus placé sur le champ à corriger |
| Simulation valide | Confirmation annoncée dans une zone de statut ; aucune requête, aucun stockage local ou de session, aucune donnée dans l'URL |
| Effacer | Tous les champs, le compteur et la confirmation sont réinitialisés |
| Navigation au clavier | Lien d'évitement accessible et fonctionnel |
| Sans JavaScript | Champs et bouton désactivés, explication visible |
| Mouvement réduit | Transitions désactivées |
| Menu | Libellés, chemins et page courante contrôlés ; destinations des trois autres pages en attente de leurs contributions |
| Tests navigateur | 9 tests réussis |

## Défaut identifié et corrigé

Le compteur restait à la valeur précédente après un clic sur « Effacer ». La microtâche lancée dans l'événement `reset` pouvait s'exécuter avant la remise à zéro native des champs. Le compteur est désormais actualisé dans la tâche suivante, après cette remise à zéro. Le test de simulation vérifie aussi cette réinitialisation et passe.

## Preuve volontaire HTML et CI

- Version correcte initiale : commit `15a87fb` ; validation HTML locale réussie.
- Erreur volontaire : commit `3b2f876` ajoute `</input>` au champ e-mail de `contact.html`, une page secondaire du site attendu.
- Détection locale : `npm run validate:html` échoue avec la règle `void-content`, ligne 85, code de sortie 1. Cela démontre que la commande vérifie aussi Contact.
- [Exécution GitHub Actions en échec](https://github.com/gabinlsc/sdvb3/actions/runs/37474797714) : le contrôle HTML échoue pour cette même erreur.
- Correction : suppression de la fermeture invalide dans le commit `fix(contact): corriger la preuve HTML et attendre la navigation clavier`.
- Le test clavier exécuté sur Linux a aussi révélé une attente manquante dans le test : il lisait l'URL immédiatement après Entrée. L'assertion attend désormais effectivement la navigation vers `#contenu`.
- [Contrôles de la PR après correction](https://github.com/gabinlsc/sdvb3/pull/2/checks).

Les deux protections de branche imposent `Validation HTML et JavaScript`, `Tests navigateur Contact` et une approbation humaine. Les protections s'appliquent aussi à l'administrateur. Les approbations sont invalidées par de nouveaux commits.

## En attente du groupe

- Approbation de la PR par un autre membre et correction effectivement demandée en relecture.
- Relecture d'une autre contribution par Gabin.
- Validation du schéma Git et de la charte commune.
- Date de livraison du milestone et répartition des autres pages.
- Validation collective des quatre pages dans `dev`, y compris tous les liens.
- Exercice de conflit sur `index.html` et schéma après résolution.

Ces étapes ne sont pas déclarées terminées par les tests de cette contribution.
