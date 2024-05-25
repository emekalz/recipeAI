export const element = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search-field'),
    searchRes:document.querySelector('.result-list'),
    searchResList: document.querySelector('.result-list'),
    searchResultList: document.querySelector('.result-list'),
    searchResPages: document.querySelector('.result-pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping-list'),
    likesMenu: document.querySelector('.likes_field'),
    likesList: document.querySelector('likesList')
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
    <div class="${elementStrings.loader}">
        <svg href="../../../css/bumla/bulma.css">
        </svg>
    </div>`;
    parent.insertAdjacentHTML('afterbeginning', loader)
};

export const clearloader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader); 
}

