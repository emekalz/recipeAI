import { elements } from './base';

export const renderItem = item => {
    const markup = `
    <li class="shopping-item" data-itemid=${item.id}>
        <div class="shopping-count">
            <input type"number" value="${item.count}" step="10">
            <p>g</p>
        </div>
        <p class="shopping-description">Pasta</p>
        <button class="shopping-delete btn-tiny">
            <svg>
                <a href="img/icon.svgIcon-circle-with-cross"></a>
            </svg>
        </button>
    </li>            
    `;
};
    elements.shopping.insertAdjacentHTML('beforeend', markup)

export const deleteItem = id => {
    const item = document.querySelector('[date-itemid="${id}"]');
    item.parentElement.removeChild(item);
};