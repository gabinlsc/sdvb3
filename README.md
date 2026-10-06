# SDVB3

Projet pédagogique de site vitrine et de maquette d'espace collaborateurs, réalisé à quatre.

## Avancement dans `dev`

État au 6 octobre 2026 : trois pages sont intégrées ; la page Services reste à réaliser.

| Page | Fichier | État | Pull Request |
| --- | --- | --- | --- |
| Accueil | `index.html` | Intégrée dans `dev` | [#5](https://github.com/gabinlsc/sdvb3/pull/5) |
| Espace collaborateurs | `connexion.html` | Intégrée dans `dev` | [#6](https://github.com/gabinlsc/sdvb3/pull/6) |
| Contact | `contact.html` | Intégrée dans `dev` | [#2](https://github.com/gabinlsc/sdvb3/pull/2) |
| Services | `services.html` | À réaliser | — |

Les liens vers `services.html` ne fonctionnent pas encore. La validation collective du site complet reste à effectuer après l'intégration de cette dernière page.

## Groupe

| Membre | GitHub | Contribution |
| --- | --- | --- |
| Gabin LESCOAT | @gabinlsc | Contact (`contact.html`) |
| Marceau Gioanetti | @Fr0gzilla | Contribution à confirmer |
| Remi Durand | @Remi-tec | Accueil (`index.html`) |
| Teddy Barraud | @Evo-Ted | Espace collaborateurs (`connexion.html`) |

Les formulaires sont des maquettes : aucune authentification réelle ni aucun envoi de message n'est prévu. Utiliser uniquement des données fictives pour les essais.

## Organisation Git

Les branches de contribution partent de `dev`. Les contributions sont proposées par Pull Request vers `dev`, avec une relecture par un autre membre. Les versions validées passent ensuite de `dev` vers `main`.

`dev` et `main` sont protégées : une approbation, les contrôles HTML/JavaScript et les tests navigateur Contact sont obligatoires avant fusion. La date de livraison du [milestone Version 1.0](https://github.com/gabinlsc/sdvb3/milestone/1) reste à confirmer.

## Consulter le site et lancer les vérifications

Le site est statique : ouvrir `index.html` dans un navigateur suffit pour consulter les pages. Node.js sert aux outils de développement et à l'aperçu local facultatif.

Avec Node.js 24 ou supérieur :

```sh
npm ci
npm run check
npm start
```

Pour consulter l'accueil avec le serveur local, ouvrir `http://127.0.0.1:4173/index.html`. La racine du serveur affiche actuellement Contact. Sous PowerShell, utiliser `npm.cmd` si `npm.ps1` est bloqué.

`npm run check` valide toutes les pages HTML à la racine et la syntaxe des scripts de Contact et du serveur. GitHub Actions exécute ces contrôles ainsi que les tests navigateur Contact sur les PR vers `dev` ou `main`, et lors d'un push dans `main`.

Pour lancer les tests navigateur Contact localement :

```sh
npx playwright install chromium
npm run test:e2e
```

## Documentation de la contribution Contact

- [Guide d'intégration, schéma Git et planning proposé](docs/contribution-contact.md)
- [Critères de réussite](docs/issue-contact.md)
- [Rapport de vérification et preuves CI](docs/verification-contact.md)

Ces documents retracent la contribution Contact ; le tableau d'avancement ci-dessus indique l'état actuel des pages dans `dev`.
