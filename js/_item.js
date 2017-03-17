$.widget('custom.controllerItem', {
    options: {
        class_menu: '.context-menu'
    },

    _init: function () {
        this._generateItemStyles();
    },

    _generateItemStyles: function () {
        var styles = '';
        for (var key in items) {
            styles += '.inventory-cell.'+items[key].icon+' {background: url(img/items/'+items[key].icon+'.png) center center;background-size: contain;}';
        }
        $('body').append('<style>'+styles+'</style>');
    },

    useItem: function (itemID, itemQuality) {
        var determineMultiplier = 1;

        if (itemQuality == 0) {
            determineMultiplier = 0.2;
            player_data.score += 5;
        }
        if (itemQuality == 1) {
            determineMultiplier = 0.5;
            player_data.score += 10;
        }
        if (itemQuality == 2) {
            determineMultiplier = 1;
            player_data.score += 30;
        }
        if (itemQuality == 3) {
            determineMultiplier = 1.5;
            player_data.score += 50;
        }

        for (var key in items) {
            if (items[key].id == itemID) {
                $('body').controllerLog('pushLog', player_data.name + ' ' + randomArray(items[key].log));
            }
        }

        for (var i = 0; i < player_data.inventory.length; i++) {
            if (player_data.inventory[i][0] == itemID && player_data.inventory[i][2] == itemQuality) {
                if (player_data.inventory[i][1] == 1) {
                    //delete item and reload
                    player_data.inventory.splice(i, 1);
                } else {
                    player_data.inventory[i][1] -=1;
                }
            }
        }

        if (itemID == 3) { //backpack
            player_data.inventory_slots += parseInt(5 * determineMultiplier);
        }

        if (itemID == 4) { //pouch
            player_data.inventory_slots += parseInt(1 * determineMultiplier);
        }

        if (itemID == 5) { //bag
            player_data.inventory_slots += parseInt(3 * determineMultiplier);
        }

        if (itemID == 1) { //pistol
            player_data.weapon = 1;
            player_data.equip.secondaryWeapon = {
                name: 'Пистолет M1911',
                name_translate: 'pistol'
            };
        }

        if (itemID == 6) {
            player_data.equip.meleeWeapon = {
                name: 'Полицейская дубинка',
                name_translate: 'baton'
            };
        }

        if (itemID == 7) { //bread
            $('body').controllerStat('changeViStat', 'blood', parseInt(100 * determineMultiplier), '+')
                .controllerStat('changeViStat', 'thirst', parseInt(5 * determineMultiplier), '+')
                .controllerStat('changeViStat', 'hunger', parseInt(25 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'tired', parseInt(2 * determineMultiplier), '-');
        }

        if (itemID == 0) { //water
            $('body').controllerStat('changeViStat', 'blood', parseInt(50 * determineMultiplier), '+')
                .controllerStat('changeViStat', 'thirst', parseInt(30 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'hunger', parseInt(5 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'tired', parseInt(5 * determineMultiplier), '-');
        }

        if (itemID == 2) { //carrot
            $('body').controllerStat('changeViStat', 'blood', parseInt(70 * determineMultiplier), '+')
                .controllerStat('changeViStat', 'thirst', parseInt(5 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'hunger', parseInt(17 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'tired', parseInt(1 * determineMultiplier), '-');
        }

        if (itemID == 8) { //milk
            $('body').controllerStat('changeViStat', 'blood', parseInt(90 * determineMultiplier), '+')
                .controllerStat('changeViStat', 'thirst', parseInt(15 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'hunger', parseInt(10 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'tired', parseInt(2 * determineMultiplier), '-');
        }

        if (itemID == 9) { //apple
            $('body').controllerStat('changeViStat', 'blood', parseInt(110 * determineMultiplier), '+')
                .controllerStat('changeViStat', 'thirst', parseInt(5 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'hunger', parseInt(15 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'tired', parseInt(1 * determineMultiplier), '-');
        }

        if (itemID == 10) { //pills

        }
        if (itemID == 11) { //medkit
            $('body').controllerStat('changeViStat', 'blood', parseInt(1000 * determineMultiplier), '+');
        }
        if (itemID == 12) { //strawberry
            $('body').controllerStat('changeViStat', 'blood', parseInt(200 * determineMultiplier), '+')
                .controllerStat('changeViStat', 'thirst', parseInt(5 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'hunger', parseInt(15 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'tired', parseInt(1 * determineMultiplier), '-');
        }
        if (itemID == 13) { //banana
            $('body').controllerStat('changeViStat', 'blood', parseInt(50 * determineMultiplier), '+')
                .controllerStat('changeViStat', 'thirst', parseInt(2 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'hunger', parseInt(17 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'tired', parseInt(1 * determineMultiplier), '-');
        }
        if (itemID == 14) { //baseball bat

        }
        if (itemID == 15) { //batteries

        }
        if (itemID == 16) { //beer
            $('body').controllerStat('changeViStat', 'blood', parseInt(150 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'thirst', parseInt(10 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'hunger', parseInt(25 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'tired', parseInt(10 * determineMultiplier), '-');
        }
        if (itemID == 17) { //propeller

        }
        if (itemID == 18) { //boltcutter

        }
        if (itemID == 19) { //paperknife

        }
        if (itemID == 20) { //ammo

        }
        if (itemID == 21) { //chainsaw

        }
        if (itemID == 22) { //cheese
            $('body').controllerStat('changeViStat', 'blood', parseInt(100 * determineMultiplier), '+')
                .controllerStat('changeViStat', 'thirst', parseInt(5 * determineMultiplier), '+')
                .controllerStat('changeViStat', 'hunger', parseInt(25 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'tired', parseInt(2 * determineMultiplier), '-');
        }
        if (itemID == 23) { //cherry
            $('body').controllerStat('changeViStat', 'blood', parseInt(60 * determineMultiplier), '+')
                .controllerStat('changeViStat', 'thirst', parseInt(5 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'hunger', parseInt(15 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'tired', parseInt(2 * determineMultiplier), '-');
        }
        if (itemID == 24) { //pepper
            $('body').controllerStat('changeViStat', 'blood', parseInt(300 * determineMultiplier), '+')
                .controllerStat('changeViStat', 'thirst', parseInt(25 * determineMultiplier), '+')
                .controllerStat('changeViStat', 'hunger', parseInt(5 * determineMultiplier), '-')
                .controllerStat('changeViStat', 'tired', parseInt(25 * determineMultiplier), '-');
        }
        if (itemID == 25) { //hammer

        }
        if (itemID == 26) { //crowbar

        }
        if (itemID == 27) { //famas

        }
        if (itemID == 28) { //flashlight
            if (!player_data.equip.flashlight) {
                $('body').controllerStat('changeStat', 'perception', 1, '+');
                player_data.equip.flashlight = true;
            } else {
                $('body').controllerLog('pushLog', 'У ' + player_data.name + ' уже есть фонарик. Зачем ему еще один? ' + player_data.name + ' выкидывает фонарик.');
            }
        }
        if (itemID == 29) { //gears

        }
        if (itemID == 30) { //grenade

        }
        if (itemID == 31) { //saw

        }
        if (itemID == 32) { //gaika

        }
        if (itemID == 33) { //jerrycan

        }
        if (itemID == 34) { //bulletproof vest
            if (!player_data.equip.vest) {
                $('body').controllerStat('changeStat', 'defense', 2, '+');
                player_data.equip.vest = true;
            } else {
                $('body').controllerLog('pushLog', 'У ' + player_data.name + ' уже есть бронежилет. Зачем ему еще один? ' + player_data.name + ' выкидывает бронежилет.');
            }
        }
        if (itemID == 35) { //led

        }
        if (itemID == 36) { //enfield

        }
        if (itemID == 37) { //bulb

        }
        if (itemID == 38) { //chip

        }
        if (itemID == 39) { //wrench

        }
        if (itemID == 40) { //mp5

        }
        if (itemID == 41) { //plug

        }
        if (itemID == 42) { //shirt
            if (!player_data.equip.shirt) {
                $('body').controllerStat('changeStat', 'agility', 1, '+');
                player_data.equip.shirt = true;
            } else {
                $('body').controllerLog('pushLog', 'У ' + player_data.name + ' уже есть рубашка. Зачем ему еще одна? ' + player_data.name + ' выкидывает рубашку.');
            }
        }
        if (itemID == 43) { //revolver

        }
        if (itemID == 44) { //shotgun

        }
        if (itemID == 45) { //shorts
            if (!player_data.equip.shorts) {
                $('body').controllerStat('changeStat', 'agility', 1, '+');
                player_data.equip.shorts = true;
            } else {
                $('body').controllerLog('pushLog', 'У ' + player_data.name + ' уже есть шорты. Зачем ему еще одни? ' + player_data.name + ' выкидывает шорты.');
            }
        }
        if (itemID == 46) { //vest
            if (!player_data.equip.jacket) {
                $('body').controllerStat('changeStat', 'power', 1, '+');
                player_data.equip.jacket = true;
            } else {
                $('body').controllerLog('pushLog', 'У ' + player_data.name + ' уже есть жилет. Зачем ему еще один? ' + player_data.name + ' выкидывает жилет.');
            }
        }
        if (itemID == 47) { //aug

        }
        if (itemID == 48) { //tec9

        }
        if (itemID == 49) { //spade

        }
        if (itemID == 50) { //trousers
            if (!player_data.equip.pants) {
                $('body').controllerStat('changeStat', 'speed', 1, '+');
                player_data.equip.pants = true;
            } else {
                $('body').controllerLog('pushLog', 'У ' + player_data.name + ' уже есть штаны. Зачем ему еще одни? ' + player_data.name + ' выкидывает штаны.');
            }
        }
        if (itemID == 51) { //UZI

        }
        if (itemID == 52) { //pick

        }
        if (itemID == 53) { //axe

        }

        $('body').controllerInventory('reloadUI', player_data.inventory_slots)
            .controllerStat('reloadViStatUI')
            .controllerStat('reloadUI');
    }
});