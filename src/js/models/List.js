export default class List{
    constructor() {
        this.items = [];
    }

    addItem(const, unit, imgredient) {
        const item = {
            id: uniqueId(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    delete(id){
        const index = this.items.findIndex(el => el.id === id);
        // [2,4, 8] splice[1, 2] -> returns [4, 8], original array is [2]
        // [2, 4, 8] splice[1, 2] -> returns 4, original array is [2, 4, 8]
        this.item.splice(index, 1);
    }

    updateCount(id, newCount) {
        this.item.find(el => el.id === id).count = newCount;
    }
}