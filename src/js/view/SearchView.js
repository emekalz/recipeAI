import { elements } from "./base"


export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList .innerHtml = '';
    elements.searchPages.innerHtml = '';
}


export const highlightSelected = id => {
    const resultArr = Array.from(document.querySelectorAll('.results-link'));
    resultArr.forEach(el => {
        el.classList.remove('results-link-active');
    })

    document.querySelector(`a href = "${id}")`).classList.add('results-link-active');
};



const limitRecipeTitle = (title, limit = 17) => {
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join('  ')}.....`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
    <li class="result-link">
        <h4 class="result-name">
            ${limitRecipeTitle(recipe.title)}
        </h4>
        <p class="recipe-author">
            ${recipe.publisher}
        </p>
        <i class="fa fa-star"></i>
        <br>
        <a href="#${recipe.recipe_id}" class="result-link"></a>
        <img src="${recipe.recipe_url}" alt="${recipe.title}"
    </li>`; 


elements.searchResList.insertAdjacentHtml('beforeend', markup);
};

const createButton = (page, type) =>`
    <button class="btn-inline results btn-${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <i class="fa fa-prev"></i> ${type === 'prev' ? 'left' : 'right'}
        <span>Page ${type === 'prev' ? 'left' : page + 1}   </span>
    </button>

`



const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    if (page === 1){
        // Button to go to the next page
        createButton(page, 'next');
    }

    else if (page < pages){
        // Both Buttons
        button =- `
        ${ createButton(page, 'prev')};
        ${ createButton(page, 'next')};
        `
        createButton(page, 'next');
    }

    else if(page === pages){
        // Only button to go to prev page
        createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button)
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = 10;

    recipes.slice(start, end).foreach(renderRecipe);
}