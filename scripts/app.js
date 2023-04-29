// Importation de fonctionnalités
import { recipesArray } from './factory.js';
import { handleOpenCloseFilters } from './openCloseFilers.js';
import { addTag, removeTag, createTagElements } from './tags.js';
import { mainSearchV2 } from './mainSearch-v2.js';

// Sélection des éléments du document
const filterElement = document.querySelectorAll('.filter__listOption');
const closeTagElement = document.querySelectorAll('.tags__close');
const mainSearchBar = document.querySelector('.search__input');

// Gestion de l'ouverture et de la fermeture des tags
handleOpenCloseFilters();

// Création d'éléments des tags
createTagElements(recipesArray);

// Recherche via le champ principal, via les tags ou en combinant les deux méthodes
mainSearchBar.addEventListener('input', mainSearchV2);

// Ajout d'une tag
filterElement.forEach((element) => {
  element.addEventListener('click', addTag);
});

// Suppression d'une tag
closeTagElement.forEach((closeCross) => {
  closeCross.addEventListener('click', removeTag);
});
