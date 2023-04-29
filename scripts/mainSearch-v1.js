import { recipesArray } from './factory.js';
import { createRecipeCard, checkIfRecipeIsEmpty } from './displayCard.js';
import {
  createTagElements,
  allSelectedTags,
  filterRecipesByActiveTags,
} from './tags.js';

const cardContainer = document.querySelector('.cards__container');

export function mainSearchV1(e) {
  let searchedWords = [];
  if (e.target.value === '') {
    searchedWords = [...allSelectedTags].map((tag) =>
      tag.toLowerCase().replace(/ /g, '')
    );
  } else {
    searchedWords = [
      ...e.target.value.toLowerCase().split(' '),
      ...allSelectedTags.map((tag) => tag.toLowerCase().replace(/ /g, '')),
    ];
  }

  if (e.target.value.length >= 3 || e.target.value.length === 0) {
    cardContainer.textContent = '';

    // filter recipesArray and return recipes that match the searched words
    const filteredArr = recipesArray.filter((recipe) => {
      recipe = recipe[0];

      // create an object of different search types (name, description, ingredients)
      const searchTypes = {
        name: recipe.name.toLowerCase(),
        description: recipe.description.toLowerCase(),
        ingredients: recipe.ingredients
          .map((u) => u.ingredient.toLowerCase().replace(/ /g, ''))
          .join(' '),
        appliance: recipe.appliance.toLowerCase().replace(/ /g, ''),
        ustensils: recipe.ustensils.map((u) =>
          u.toLowerCase().replace(/ /g, '')
        ),
      };

      // return true if ALL searched words are found in the searchTypes object
      return searchedWords.every((word) => {
        for (const prop in searchTypes) {
          if (searchTypes[prop].includes(word)) {
            return true;
          }
        }
        return false;
      });
    });

    // create recipe cards for the filtered recipes
    createRecipeCard(filteredArr);
    // create tag elements for the filtered recipes
    createTagElements(filteredArr);
    // filter the array filteredArr again according to the selected tags
    filterRecipesByActiveTags(filteredArr, allSelectedTags);

    // check if there are no recipes found and display message
    checkIfRecipeIsEmpty();
  }
}
