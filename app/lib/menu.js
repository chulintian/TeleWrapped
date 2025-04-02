const ingredients ={
    "greenFlag": [
        "bokchoy",
        "broccoli",
        "leek"
    ],
    "numOfMessages": [
        "tomato",
        "corn",
        "carrot"
    ],
    "redFlag": [
        "crab",
        "meat",
        "prawn"
    ],
    "compatibility": [
        "enoki",
        "shiitake"
    ],
    "attachmentStyle": [
        "fishcake",  
        "tofu"
    ],
    "vibeCheck": [
        "egg", 
        "radish", 
        "noodle", 
    ],
}


/**
 * Get a random ingredient from the specified category
 * @param {*} category Ingredient category
 * @returns A random ingredient
 */
function getRandItem(category){
    const items = ingredients[category];
    return items[Math.floor(Math.random() * items.length)];
}


/**
 * Get 10 unique set menus with 5 ingredients, 1 ingredient from 5 categories
 * @returns A list of 10 unique menus
 */
export function generateSetMenus(){
    const sets = new Set();

    const categories = Object.keys(ingredients);

    while (sets.size < 10) {
        var setMenu = [];
        for (const category of categories) {
            setMenu.push(getRandItem(category));
        }
        sets.add(setMenu)
    }
    return { 
        code: 200, 
        content: {
            sets: Array.from(sets),
        }
    };
}