export default class Likes {
    constructor() {
        this.Likes = [];
    }

    addLike(id, title, author, image)
    {
        const like = { id, title, author, img };
        this.likes.push(like);
        return like;
    }

    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
    }

    isLiked(id){
        return this.Likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes(){
        return this.likes.length;
    }

    persistData () {
        localStorage.setItem('Likes', JSON.stringify(this.likes));
    }

    readStorage (){
        const storage = JSON.parse(localStorage.getItem('likes'));

        // Restoring likes from the local storage
        if (storage) this.likes = storage;
    }
}