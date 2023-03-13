import { mockAllDrinks } from './helpers/MockDrinks/mockAllDrinks';
import { mockCategoryDrinks } from './helpers/MockDrinks/mockCategoryDrinks';
import { mockDrinksCocoa } from './helpers/MockDrinks/mockDrinksCocoa';
import { mockDrinksOrdinary } from './helpers/MockDrinks/mockDrinksOrdinary';
import { mockDrinksOther } from './helpers/MockDrinks/mockDrinksOther';
import { mockDrinksShake } from './helpers/MockDrinks/mockDrinksShake';
import { mockDrinksCockTail } from './helpers/MockDrinks/mockDrinsCockTail';
import { mockAll } from './helpers/MockMeals/mockAll';
import { mockCategory } from './helpers/MockMeals/mockCategory';
import { mockMealsBeef } from './helpers/MockMeals/mockMealsBeef';
import { mockMealsBreakfast } from './helpers/MockMeals/mockMealsBreakfast';
import { mockMealsChecken } from './helpers/MockMeals/mockMealsChecken';
import { mockMealsDessert } from './helpers/MockMeals/mockMealsDessert';

const mockFetch = (url) => {
  switch (url) {
  case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
    return Promise.resolve({
      json: () => Promise.resolve(mockCategory),
    });
  case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef':
    return Promise.resolve({
      json: () => Promise.resolve(mockMealsBeef),
    });
  case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast':
    return Promise.resolve({
      json: () => Promise.resolve(mockMealsBreakfast),
    });
  case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken':
    return Promise.resolve({
      json: () => Promise.resolve(mockMealsChecken),
    });
  case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert':
    return Promise.resolve({
      json: () => Promise.resolve(mockMealsDessert),
    });
  case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat':
    return Promise.resolve({
      json: () => Promise.resolve({
        meals: [
          {
            strMeal: 'Mbuzi Choma (Roasted Goat)',
            strMealThumb: 'https://www.themealdb.com/images/media/meals/cuio7s1555492979.jpg',
            idMeal: '52968',
          },
        ],
      }),
    });
  default:
    return Promise.resolve({
      json: () => Promise.resolve(mockAll),
    });
  }
};

const mockFetchDrinks = (url) => {
  switch (url) {
  case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
    return Promise.resolve({
      json: () => Promise.resolve(mockCategoryDrinks),
    });
  case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink':
    return Promise.resolve({
      json: () => Promise.resolve(mockDrinksOrdinary),
    });
  case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail':
    return Promise.resolve({
      json: () => Promise.resolve(mockDrinksCockTail),
    });
  case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake':
    return Promise.resolve({
      json: () => Promise.resolve(mockDrinksShake),
    });
  case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other%20/%20Unknown':
    return Promise.resolve({
      json: () => Promise.resolve(mockDrinksOther),
    });
  case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa':
    return Promise.resolve({
      json: () => Promise.resolve(mockDrinksCocoa),
    });
  default:
    return Promise.resolve({
      json: () => Promise.resolve(mockAllDrinks),
    });
  }
};

export { mockFetch, mockFetchDrinks };
