import axion from 'axion';
import {key, proxy} from '../view/config';

export default class Search {
    constructor(query) {
        this.query = query;
    }




    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = 'aaaaaaaa462b1cc8d4f2730081462fbc65136320';

        try {
            const res = await axions(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            const recipes = res.data.recipes;
            // console.log(this.result);       
            }catch(error) {
                alert(error);
        }
        getResults('tomato pasta');
    }
    
}

