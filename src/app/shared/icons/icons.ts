/**
     * All Possible Icons:
     * Miscellaneous
     * Food/Drinks
     * Savings
     * Entertainment
     * Bills/Utilities
     */
export default class Icons {
    icons:String[];
    colors:String[];

    constructor() {
        this.icons = [
            'fas fa-dollar-sign',
            'fas fa-utensils',
            'fas fa-piggy-bank',
            'fas fa-tv',
            'far fa-credit-card'
        ];
        this.colors = [
            'green',
            'orange',
            'blue',
            'yellow',
            'red'
        ]
    }

    findIconImg(index) {
        return this.icons[index].valueOf();
    } 
    findColor(index) {
        return this.colors[index].valueOf();
    }
}