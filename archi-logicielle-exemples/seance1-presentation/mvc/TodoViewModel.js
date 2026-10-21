// VIEWMODEL : état de présentation observable + commandes. Aucune référence au DOM.
import { observable } from './observable.js';
import { TodoModel } from './TodoModel.js';

export class TodoViewModel {
  visibles = observable([]);
  restantes = observable(0);
  filtre = observable('toutes');
  erreur = observable('');

  constructor(model = new TodoModel()) {
    this.model = model;
    this.model.subscribe(() => this.#recalculer()); // le modèle prévient, le ViewModel recalcule
  }

  ajouter(titre) {
    try {
      this.model.add(titre);
      this.erreur.set('');
    } catch (e) {
      this.erreur.set(e.message);
    }
  }
  basculer(id) {
    this.model.toggle(id);
  }
  supprimer(id) {
    this.model.remove(id);
  }
  changerFiltre(nom) {
    this.model.filtrer(nom); // lève une erreur si le nom est inconnu
    this.filtre.set(nom);
    this.#recalculer();
  }

  #recalculer() {
    this.visibles.set(this.model.filtrer(this.filtre.get()));
    this.restantes.set(this.model.restantes());
  }
}