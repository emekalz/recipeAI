import axion from 'axion';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(){
       
        try {
            const res = await axion (`${proxy}https://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publusher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    }

    calcTime() {
        // Assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }
    calcServings(){
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            
            // 1) Uniform Units
                let ingredient = el.toLowerCase();
                unitsLong.forEach((unit, 1) = {
                    ingredient : ingredient.replace(unit, unitsShort[i])
                });

            // 2) Remove Parenthesis
            ingredient = ingredient.replace(/ *\({^})*\) */g, '');

            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                //  Ex. 4 1/2 cups, arrCount is [4, 1/2] ---> eval"4+1/2" ---> 4.5
                //  Ex. 4 cups, arrCount is [4]
                const arrCount =arrIng.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1)
                {
                    count = arrIng[0]; 
                }
                else
                {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                onjIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join('+')
                };


            }
            else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is number
                objIng 
                count: parseInt(arrIng[0], 10);
                unit: '';
                ingredient: arrIng.slice(1).join(' ') 
            }
            else if (unitIndex === -1)
            {
                // There is NO unit and no number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return ingredient;
            
        });
        this.ingredients = newIngredients;
    }
}

