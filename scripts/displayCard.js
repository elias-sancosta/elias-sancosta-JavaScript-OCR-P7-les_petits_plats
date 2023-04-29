// import { getFoodImage } from './utils.js';
// import { createTagElements } from './tags.js';

export function createRecipeCard(array) {
  const cardContainer = document.querySelector('.cards__container');
  cardContainer.innerHTML = '';

  array.forEach((recipe) => {
    const card = document.createElement('article');
    card.className = 'card';

    let ingredientList = '';
    recipe[0].ingredients.forEach((ingredient) => {
      ingredientList += `<li class="card__ingredient" >
        <span class="card__ingredient--bold">${
          ingredient.ingredient ? ingredient.ingredient : ''
        }</span> ${ingredient.quantity ? ingredient.quantity : ''} ${
        ingredient.unit ? ingredient.unit : ''
      }
      </li>`;
    });

    card.innerHTML = `
    <a>
    <div class="card__img-container">
      <img src="https://source.unsplash.com/random/320×190/?food" alt="card image">
    </div>
    <div class="card__body">
      <div class="card__head">
        <h2 class="card__title">${recipe[0].name}</h2>
        <span class="card__time"><img src="ressources/images/time.svg" alt="card time clock logo">
          <p class="card__minutes">${recipe[0].time} min</p>
        </span>
      </div>
      <div class="card__content">
        <ul class="card__ingredientsList">
         ${ingredientList}
        </ul>
        <p class="card__description">
        ${recipe[0].description}
        </p>
      </div>
    </div>
  </a>
    `;

    // getFoodImage().then((imageUrl) => {
    //   card.querySelector('img').src = imageUrl;
    // });

    cardContainer.appendChild(card);
  });
}

export function checkIfRecipeIsEmpty() {
  const cardContainer = document.querySelector('.cards__container');
  const noRecipes = document.querySelector('.cards__no-recipes');

  if (cardContainer.childNodes.length === 0) {
    noRecipes.style.display = 'block';
  } else {
    noRecipes.style.display = 'none';
  }
}
