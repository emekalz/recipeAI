import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './view/SearchView';
import * as recipeView from './view/Recipeview';
import * as listView from './view/Listview';
import * as likesView from './view/likesView'
import { clearloader, elements, renderLoader } from './view/base';
import { elements, renderLoader, clearloader } from './view/base';



//  Global State of the app

/**
 * - Search Object
 * - Current Recipe object 
 * - Shopping list object
 * - Liked Recipes
 */



// ---------------------------------  Views -------------------------------- //
const state = {};

const controlSearch = () => {
    // Get query from view
    const query = searchView.getInput();            
   

    if (query) {
        //  2} New search object and add to the state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput(); 
        searchView.clearResults();
        renderLoader(element.searchRes);

        // 4) Search for recipe
        state.search.getResults();

        // 5) Render results on UI
        clearloader();
        searchView.renderResults(state.search.result);
    }
}

 elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
   if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
    
   }
});


/**
 * RECIPE CONTROLLER
 */


const controlRecipe = () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        searchView.highlightSelected(id)

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
        // Get recipe data and parse ingredients
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();

        // Calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();

        // Render recipe
        clearloader();
        recipeView.renderRecipe(
            state.recipe,
            state.likes.isLiked(id)
        );

       
        } catch(err) 
        {
            alert('Error processing recipe!');
        }
    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));






/**
 * LIST CONTROLLER
 */

const controlList = () => {
    // Create a new list if there is none yet 
   if (!state.list) state.lst = new List();

//    Add each ingredient to the List and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
   
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping_item').dataset.itemid;
})



// Handling the delete button
    if (e.target.matches('.shopping_delete, .shopping_delete +')){
        // Delete from state
        state.list.deleteItem(id);

        // Delete from Ui
        listView.deleteItem(id);

        // Handle the count update
    }else if (e.target.matches('.shopping_count-value')){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }



/**
 * Like Controller
 */
// 

const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
   
 //    User has not yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
 
     // Add like to the state
     const newLike = state.likes.addLike(
         currentID,
         state.recipe.title,
         state.recipe.author,
         state.recipe.img
     );
     // Toggle the like button
     likesView.toggleLikesBtn(true);
 
     // Add Like to UI list
     likesView.renderLike(newLike);
 
     // User has liked current recipe
  

 
    }else {
     // Remove like from the state
     state.likes.deleteLike(currentID);
 
     // Toggle the like button
     likesView.toggleLikedbtn(false);
 
     // Remove like from UI list
        likesView.deleteLike(currentID);

    }
    // Toggle like menu button
    listView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => likes.likesView(like));

 };
 

 
// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease. .btn-decrease +')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1){
            state.recipe.updateServingsIngredients(state.recipe);
        }
    }else if (e.target.matches('.btn-increase, .btn-increase +')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe-btn-add, .recipe-btn-add +')){
        controlList();
    }else if (e.target.matches('.recipe_love, .recipe_love +')) {
        // Like controller
        controlLike();
    }
   
});


// window l = new List();