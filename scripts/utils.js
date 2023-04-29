// GET A RANDOM FOOD IMAGE
export async function getFoodImage() {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/random.php',
    );
    const data = await response.json();
    return data.meals[0].strMealThumb;
  } catch (error) {
    return console.log(error);
  }
}

// CAPITALISE THE FIRST LETTER OF WORDs
export function capitalizeWords(sentence) {
  sentence = sentence.toLowerCase();
  let words = sentence.split(' ');
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(' ');
}
