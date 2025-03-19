const ingredients ={
    "greenVeg": [
        "bokchoy",
        "broccoli",
        "leek"
    ],
    "otherVeg": [
        "tomato",
        "radish",
        "carrot"
    ],
    "meat": [
        "crab",
        "meat",
        "prawn"
    ],
    "mushroom": [
        "enoki",
        "shiitake"
    ],
    "extra": [
        "egg", 
        "fishcake", 
        "noodle", 
        "tofu"
    ]
}

function getRandItem(category){
    const items = ingredients[category];
    return items[Math.floor(Math.random() * items.length)];
}

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