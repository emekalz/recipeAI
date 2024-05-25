import { elements } from "./base";
import { fraction } from 'fractional';

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
};

const formatCount = const => {
    if (count) {
        // count = 2.5 ---> 2 1/2
        // count = 0.5 ---> 1/2
        const newCount = Math.round(count * 10000) / 10000;
        const [int, dec] = newCount.toString().split('.').map(el => parseInt(el, 10));

        if (!dec) return count;

        if (int === 0){
            const fr = new fraction(count);
            return `$(fr.numerator)/${fr.denominator}`    
        }else{
            const fr = new Fraction[]
        }
    }
    return '?';
};  


const createIngredient = ingredient => `
    <li class="recipe_item">
        <svg class="recipe_icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe_count">1000</div>
        <div class="recipe_ingredient">
        <span class="recipe_unit">g</span>    
`;

export const renderRecipe = recipe => {
    const markup = `
    <p class="recipe">
    </p> 
    <i class="fa fa-menu">
    </i>
    <img src="${recipe.img}" alt="recipe.title" class="recipe_img">
    `;
};