// Importation de fonctionnalités
import { recipes } from '../assets/recipes.js';
import { createRecipeCard } from '../scripts/displayCard.js';

// Exportation d'un tableau dont les éléments sont des paires [clé, valeur]
export let recipesArray = Object.entries(recipes);

recipesArray.forEach((array) => array.shift());

// Création de fiches recettes
createRecipeCard(recipesArray);
