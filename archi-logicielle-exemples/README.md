# TP1 – Todo-list : MVC puis MVVM

**Où est la logique du filtre ?**
- MVC : la règle de filtrage est dans le modèle (`TodoModel.filtrer()`). Le contrôleur mémorise le filtre courant et appelle le modèle, la vue affiche seulement ce qu'on lui donne.
- MVVM : la règle reste dans le modèle (`filtrer()`), mais le filtre courant est dans le ViewModel (observable `filtre`), qui recalcule `visibles` et `restantes`. La page HTML ne contient aucun calcul.

**Ce qu'on a pu tester sans navigateur**
- MVC : uniquement le modèle (`TodoModel.test.js`), car le contrôleur dépend d'une vue qui touche au DOM.
- MVVM : le modèle et le ViewModel (`TodoViewModel.test.js`) : ajout, erreur sur titre vide, filtre « faites », filtre inconnu. Seule la page HTML reste à tester à la main.

**Fichiers modifiés pour ajouter le filtre en MVC** : 5 fichiers : `index.html` (boutons et style), `TodoModel.js` (`filtrer`, `restantes`), `TodoView.js` (`bindFilter`, `showFiltre`, `render`), `TodoController.js` (filtre courant) et `TodoModel.test.js` (nouveau test).

**Choix pour le tableau de bord QueenBee (mesures en temps réel)** : je choisirais le MVVM. Les mesures arrivent en continu : il suffit de mettre à jour une valeur observable dans le ViewModel, et chaque élément de l'écran abonné se met à jour tout seul, sans que le contrôleur ait à ordonner chaque redessin. L'état d'affichage (seuils, alertes, filtres) se teste sans navigateur. Le MVC reste très adapté aux applications serveur avec ORM, où chaque requête renvoie une page complète, mais il est moins naturel quand les données poussent la vue en permanence.