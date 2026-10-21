// CONTROLLER : traduit les actions de la vue en opérations sur le modèle.
export class TodoController {
  #filtre = 'toutes'; // filtre courant

  constructor(model, view) {
    const refresh = () => {
      view.render(model.filtrer(this.#filtre), model.restantes());
      view.showFiltre(this.#filtre);
    };

    view.bindAdd(title => {
      try {
        model.add(title);
        view.showError('');
      } catch (e) {
        view.showError(e.message);
      }
    });
    view.bindToggle(id => model.toggle(id));
    view.bindRemove(id => model.remove(id));
    view.bindFilter(nom => {
      this.#filtre = nom;
      refresh();
    });
    model.subscribe(refresh); // la vue observe le modèle (via le contrôleur)
  }
}