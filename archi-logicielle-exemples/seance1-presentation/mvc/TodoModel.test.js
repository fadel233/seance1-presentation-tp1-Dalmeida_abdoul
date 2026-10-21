// Le ViewModel se teste sans navigateur : il ne touche jamais au DOM.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TodoViewModel } from './TodoViewModel.js';

test('ajouter met à jour visibles et restantes', () => {
  const vm = new TodoViewModel();
  vm.ajouter('A');
  assert.equal(vm.visibles.get().length, 1);
  assert.equal(vm.restantes.get(), 1);
});

test('un titre vide remplit erreur, puis une saisie valide l’efface', () => {
  const vm = new TodoViewModel();
  vm.ajouter('  ');
  assert.match(vm.erreur.get(), /obligatoire/);
  vm.ajouter('A');
  assert.equal(vm.erreur.get(), '');
});

test('le filtre « faites » ne montre que les tâches cochées', () => {
  const vm = new TodoViewModel();
  vm.ajouter('A');
  vm.ajouter('B');
  vm.basculer(vm.visibles.get()[0].id);
  vm.changerFiltre('faites');
  assert.deepEqual(vm.visibles.get().map(t => t.title), ['A']);
  assert.equal(vm.restantes.get(), 1);
});

test('un filtre inconnu est refusé', () => {
  assert.throws(() => new TodoViewModel().changerFiltre('xyz'), /inconnu/);
});