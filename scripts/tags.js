import { recipesArray } from './factory.js';
import { capitalizeWords } from './utils.js';
import { checkIfRecipeIsEmpty, createRecipeCard } from './displayCard.js';

export let uniqueIngredients = [];
export let uniqueAppliances = [];
export let uniqueUstensils = [];

let selectedIngredientTags = [];
let selectedAppliancesTags = [];
let selectedUstensilTags = [];
export let allSelectedTags = [
  ...selectedAppliancesTags,
  ...selectedIngredientTags,
  ...selectedUstensilTags,
];

let selectedTags = [];

export function addTag() {
  const mainSearchInput = document.querySelector('.search__input');
  const tagList = document.querySelector('.tags');
  const clickedTagName = this.innerText;
  let color;
  selectedTags.push(clickedTagName);
  mainSearchInput.value = '';

  if (this.parentElement.classList.contains('filter__showList--blue')) {
    color = 'blue';
    uniqueIngredients.splice(uniqueIngredients.indexOf(clickedTagName), 1);
    uniqueIngredients.sort();
    selectedIngredientTags.push(clickedTagName.toLowerCase());
    allSelectedTags = [
      ...selectedAppliancesTags,
      ...selectedIngredientTags,
      ...selectedUstensilTags,
    ];
  } else if (this.parentElement.classList.contains('filter__showList--red')) {
    color = 'red';
    uniqueUstensils.splice(uniqueUstensils.indexOf(clickedTagName), 1);
    uniqueUstensils.sort();
    selectedUstensilTags.push(clickedTagName.toLowerCase());
    allSelectedTags = [
      ...selectedAppliancesTags,
      ...selectedIngredientTags,
      ...selectedUstensilTags,
    ];
  } else if (this.parentElement.classList.contains('filter__showList--green')) {
    color = 'green';
    uniqueAppliances.splice(uniqueAppliances.indexOf(clickedTagName), 1);
    uniqueAppliances.sort();
    selectedAppliancesTags.push(clickedTagName.toLowerCase());
    allSelectedTags = [
      ...selectedAppliancesTags,
      ...selectedIngredientTags,
      ...selectedUstensilTags,
    ];
  } else {
    return;
  }

  const tag = document.createElement('div');
  tag.className = `tags__item tags__item--${color}`;
  tag.innerHTML = `
    <span class="tags__name">${clickedTagName}</span>
    <span class="tags__close"><img src="ressources/images/remove-icon.png" alt="cross icon to remove this tag"></span>
  `;
  tag.dataset.color = color;
  tagList.appendChild(tag);
  tag.addEventListener('click', removeTag);
  filterRecipesByActiveTags(recipesArray, allSelectedTags);
  this.remove();
}

export function removeTag() {
  const mainSearchInput = document.querySelector('.search__input');
  const tag = this;
  const tagText = tag.firstElementChild.innerText;
  let list = null;
  let listItems = null;
  selectedTags.pop(tagText);
  mainSearchInput.value = '';
  if (tag.classList.contains('tags__item--blue')) {
    list = document.querySelector('.filter__showList--blue');
    listItems = list.querySelectorAll('.filter__listOption');
    uniqueIngredients.push(tagText);
    selectedIngredientTags.pop(tagText);
    uniqueIngredients.sort();
    allSelectedTags = [
      ...selectedAppliancesTags,
      ...selectedIngredientTags,
      ...selectedUstensilTags,
    ];
  } else if (tag.classList.contains('tags__item--green')) {
    list = document.querySelector('.filter__showList--green');
    listItems = list.querySelectorAll('.filter__listOption');
    uniqueAppliances.push(tagText);
    selectedAppliancesTags.pop(tagText);
    uniqueAppliances.sort();
    allSelectedTags = [
      ...selectedAppliancesTags,
      ...selectedIngredientTags,
      ...selectedUstensilTags,
    ];
  } else if (tag.classList.contains('tags__item--red')) {
    list = document.querySelector('.filter__showList--red');
    listItems = list.querySelectorAll('.filter__listOption');
    uniqueUstensils.push(tagText);
    selectedUstensilTags.pop(tagText);
    uniqueUstensils.sort();
    allSelectedTags = [
      ...selectedAppliancesTags,
      ...selectedIngredientTags,
      ...selectedUstensilTags,
    ];
  }

  const listOption = document.createElement('li');
  listOption.className = 'filter__listOption';
  listOption.innerText = tagText;
  listOption.addEventListener('click', addTag);
  // Loop into list items in order to insert the tag back into alphabetic order
  let index = 0;
  for (let i = 0; i < listItems.length; i++) {
    if (tagText < listItems[i].innerText) {
      index = i;
      break;
    }
  }
  list.insertBefore(listOption, listItems[index]);
  filterRecipesByActiveTags(recipesArray, allSelectedTags);
  tag.remove();
}

export function createTagElements(recipes) {
  let uniqueIngredients = [],
    uniqueAppliances = [],
    uniqueUstensils = [];
  // Extract unique ingredients, appliances and utensils from recipes, also check for duplicates
  recipes.forEach((recipe) => {
    recipe = recipe[0];
    recipe.ingredients.forEach((ingredient) => {
      ingredient = capitalizeWords(ingredient.ingredient);
      if (!uniqueIngredients.includes(ingredient)) {
        uniqueIngredients.push(ingredient);
      }
    });
    if (!uniqueAppliances.includes(recipe.appliance)) {
      let appliance = capitalizeWords(recipe.appliance);
      uniqueAppliances.push(appliance);
    }
    recipe.ustensils.forEach((ustensil) => {
      ustensil = capitalizeWords(ustensil);
      if (!uniqueUstensils.includes(ustensil)) {
        uniqueUstensils.push(ustensil);
      }
    });
  });
  // Sort the unique arrays
  uniqueIngredients.sort();
  uniqueAppliances.sort();
  uniqueUstensils.sort();
  // Add tags
  addTagElements(uniqueIngredients, '.filter__showList--blue');
  addTagElements(uniqueAppliances, '.filter__showList--green');
  addTagElements(uniqueUstensils, '.filter__showList--red');

  function addTagElements(tags, className) {
    const tagList = document.querySelector(className);
    tagList.innerHTML = ''; // clear the list before adding new tags
    tags.forEach((tag) => {
      // Check if tag already exist in the selected tag, if yes it skips it.
      if (!selectedTags.includes(tag)) {
        const tagItem = document.createElement('li');
        tagItem.classList.add('filter__listOption');
        tagItem.innerText = tag;
        tagItem.addEventListener('click', addTag);
        tagList.appendChild(tagItem);
      }
    });
  }

  filteringTagsFunctionality(
    uniqueIngredients,
    uniqueAppliances,
    uniqueUstensils,
  );

  function filteringTagsFunctionality(
    uniqueIngredients,
    uniqueAppliances,
    uniqueUstensils,
  ) {
    const inputBlue = document.querySelector('.filter_input--blue');
    const inputRed = document.querySelector('.filter_input--red');
    const inputGreen = document.querySelector('.filter_input--green');

    inputBlue.addEventListener('input', (event) => {
      const filteredIngredients = uniqueIngredients.filter((ingredient) => {
        return ingredient
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      addTagElements(filteredIngredients, '.filter__showList--blue');
    });
    inputRed.addEventListener('input', (event) => {
      const filteredUstensil = uniqueUstensils.filter((ustensil) => {
        return ustensil
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      addTagElements(filteredUstensil, '.filter__showList--red');
    });
    inputGreen.addEventListener('input', (event) => {
      const filteredAppliance = uniqueAppliances.filter((appliance) => {
        return appliance
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      addTagElements(filteredAppliance, '.filter__showList--green');
    });
  }
}

export function filterRecipesByActiveTags(recipesArray, filterArray) {
  //lowercase and remove spaces from all tags in filterArray.toLowerCase()
  filterArray = filterArray.map((tag) => tag.toLowerCase().replace(/ /g, ''));

  //filter recipes that have intersection of all tags in filterArray
  const filteredRecipesByTags = recipesArray.filter((recipe) => {
    let ingredients = recipe[0].ingredients.map((i) =>
      i.ingredient.toLowerCase().replace(/ /g, ''),
    );
    let appliance = recipe[0].appliance.toLowerCase().replace(/ /g, '');
    let ustensils = recipe[0].ustensils.map((u) =>
      u.toLowerCase().replace(/ /g, ''),
    );
    //check if all tags in filterArray exists in ingredients, appliance, or ustensils of recipe
    return filterArray.every(
      (tag) =>
        ingredients.includes(tag) ||
        appliance.includes(tag) ||
        ustensils.includes(tag),
    );
  });

  createRecipeCard(filteredRecipesByTags);
  createTagElements(filteredRecipesByTags);
  checkIfRecipeIsEmpty();
}
