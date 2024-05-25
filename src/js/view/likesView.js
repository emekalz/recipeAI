import { elements } from './base';

export const toggleLikedbtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outLikike';
    document.querySelector('.recipe_love use').setAttribute{`href='img/icons.svg#${iconsStrig}'`}
};

export const togglLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = newLikes > 0 ? 'visible' : 'hidden';
}; 

export const renderLike = like => {
    const markup = `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
     Deleniti, animi!
    `;
    elements.likesList.innerAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
    const el = document.querySelector(`.likes_link[href+="S{id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);

}