//item - [item_id, item_quantity, item_quality]
var player_class = {
    soldier: {
        id: '2',
        name: 'soldier',
        name_loc: 'Штурмовик',
        stat: {
            agility: 3,
            speed: 4,
            power: 7,
            defense: 7,
            intelligence: 3,
            perception: 3,
            luck: 3
        },
        inventory_slots: 8,
        inventory: [[6, 1, 1], [0, 2, 1], [7, 1, 2], [3, 1, 3]]
    },
    medic: {
        id: '3',
        name: 'medic',
        name_loc: 'Медик',
        stat: {
            agility: 4,
            speed: 3,
            power: 3,
            defense: 5,
            intelligence: 8,
            perception: 7,
            luck: 4
        },
        inventory_slots: 8,
        inventory: [[0, 3, 3], [7, 1, 3], [4, 1, 3], [9, 1, 2], [10, 1, 3]]
    },
    hunter: {
        id: '1',
        name: 'hunter',
        name_loc: 'Охотник',
        stat: {
            agility: 8,
            speed: 7,
            power: 5,
            defense: 3,
            intelligence: 4,
            perception: 5,
            luck: 4
        },
        inventory_slots: 8,
        inventory: [[0, 2, 3], [7, 2, 3], [1, 1, 0], [5, 1, 2]]
    }
};

var player_data = {
    name: '%player_name%',
    player_class: 'soldier',
    player_class_name: '',
    player_class_id: '2',
    stat: {
        agility: 0,
        speed: 0,
        power: 0,
        defense: 0,
        intelligence: 0,
        perception: 0,
        luck: 0,
        hunger: 0,
        tired: 0,
        blood: 6000,
        thirst: 0
    },
    equip: {
        backpack: false,
        pouch: 0,
        bag: 0,
        vest: false,
        jacket: false,
        pants: false,
        hat: false,
        shirt: false,
        shorts: false,
        secondaryWeapon: false,
        primaryWeapon: false,
        meleeWeapon: false,
        flashlight: false
    },
    score: 0,
    weapon: '',
    inventory_slots: 15,
    inventory: []
};