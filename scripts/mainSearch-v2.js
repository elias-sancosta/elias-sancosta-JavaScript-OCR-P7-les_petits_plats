import { recipesArray } from './factory.js';
import { createRecipeCard, checkIfRecipeIsEmpty } from './displayCard.js';
import {
  createTagElements,
  allSelectedTags,
  filterRecipesByActiveTags,
} from './tags.js';

const cardContainer = document.querySelector('.cards__container');

export function mainSearchV2(e) {
  let searchedWords = [];
  if (e.target.value === '') {
    searchedWords = [...allSelectedTags].map((tag) =>
      tag.toLowerCase().replace(/ /g, ''),
    );
  } else {
    searchedWords = [
      ...e.target.value.toLowerCase().split(' '),
      ...allSelectedTags.map((tag) => tag.toLowerCase().replace(/ /g, '')),
    ];
  }

  if (e.target.value.length >= 3 || e.target.value.length === 0) {
    cardContainer.textContent = '';

    // Initialize the filtered array
    let filteredArr = [];

    // Search the recipesArray and add matching recipes to the filtered array
    for (let i = 0; i < recipesArray.length; i++) {
      let recipe = recipesArray[i][0];

      // create an object of different search types (name, description, ingredients)
      const searchTypes = {
        name: recipe.name.toLowerCase(),
        description: recipe.description.toLowerCase(),
        ingredients: recipe.ingredients
          .map((u) => u.ingredient.toLowerCase().replace(/ /g, ''))
          .join(' '),
        appliance: recipe.appliance.toLowerCase().replace(/ /g, ''),
        ustensils: recipe.ustensils.map((u) =>
          u.toLowerCase().replace(/ /g, ''),
        ),
      };

      // check if all searched words are found in the searchTypes object
      let isMatch = true;
      for (let j = 0; j < searchedWords.length; j++) {
        let word = searchedWords[j];
        let found = false;

        // loop through all properties of the `searchTypes` object
        for (const prop in searchTypes) {
          // check if the current word is found in the property
          if (searchTypes[prop].includes(word)) {
            found = true;
            break;
          }
        }

        // if the current word is not found, set `isMatch` to false and break out of the loop
        if (!found) {
          isMatch = false;
          break;
        }
      }

      // if a match is found for all searched words, add the recipe to the filtered array
      if (isMatch) {
        filteredArr.push(recipesArray[i]);
      }
    }

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
