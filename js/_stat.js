$.widget('custom.controllerStat', {
    options: {
        id: '',
        ViStat: {
            blood: 6000,
            thirst: 100,
            hunger: 100,
            tired: 100
        }
    },

    _init: function () {
        this._loadStat();
        this.reloadViStatUI();
    },

    _loadStat: function () {
        for (var key in player_class) {
            if (player_class[key].id == this.options.id) {
                player_data.player_class = player_class[key].name;
                player_data.player_class_id = player_class[key].id;
                player_data.inventory_slots = player_class[key].inventory_slots;

                for (var key_stat in player_class[key].stat) {
                    player_data.stat[key_stat] = player_class[key].stat[key_stat];
                }

                for (var key_inventory = 0; key_inventory < player_class[key].inventory.length; key_inventory++) {
                    player_data.inventory.push(player_class[key].inventory[key_inventory]);
                }
            }
        }

        this.reloadUI();
    },

    reloadViStatUI: function () {
        var getWidth = 0;

        for (var key in player_data.stat) {
            if (key == 'hunger') {
                getWidth = parseInt((player_data.stat[key] / this.options.ViStat.hunger) * 100);
            }

            if (key == 'tired') {
                getWidth = parseInt((player_data.stat[key] / this.options.ViStat.tired) * 100)
            }

            if (key == 'thirst') {
                getWidth = parseInt((player_data.stat[key] / this.options.ViStat.thirst) * 100)
            }

            if (key == 'blood') {
                getWidth = parseInt((player_data.stat[key] / this.options.ViStat.blood) * 100)
            }

            $('[data-stat-progress-type='+key+'] .stat-progress-bar').css('width', getWidth + '%');
        }
    },

    changeStat: function (stat, value, type) {
        for (var key in player_data.stat) {
            if (key == stat && type == '-') {
                player_data.stat[key] -= value;

                if (player_data.stat[key] < 0) {
                    player_data.stat[key] = 0;
                }

                this.reloadUI();
            }

            if (key == stat && type == '+') {
                player_data.stat[key] += value;

                if (player_data.stat[key] > 10) {
                    player_data.stat[key] = 10;
                }

                this.reloadUI();
            }
        }
    },

    changeViStat: function (stat, value, type) {
        for (var key in player_data.stat) {
            if (key == stat && type == '-') {
                player_data.stat[key] -= value;

                if (player_data.stat[key] < 0) {
                    player_data.stat[key] = 0;
                }

                this.reloadViStatUI();
            }

            if (key == stat && type == '+') {
                player_data.stat[key] += value;

                if (player_data.stat[key] > 100 && key != 'blood') {
                    player_data.stat[key] = 100;
                }

                if (player_data.stat[key] > 6000 && key == 'blood') {
                    player_data.stat[key] = 6000;
                }

                this.reloadViStatUI();
            }
        }
    },

    reloadUI: function () {
        for (var key_stat in player_data.stat) {
            $('[data-stat-value-type="'+key_stat+'"]').text(player_data.stat[key_stat]);
        }
    },
    
    checkStat: function () {
        //HUNGER
        if (player_data.stat.hunger / this.options.ViStat.hunger > 0.2 && player_data.stat.hunger / this.options.ViStat.hunger < 0.4) {
            $('body').controllerLog('pushLog', randomArray(text_hunger.small).replace(/%player_name%/g, player_data.name));
        }
        if (player_data.stat.hunger / this.options.ViStat.hunger > 0.4 && player_data.stat.hunger / this.options.ViStat.hunger < 0.6) {
            $('body').controllerLog('pushLog', randomArray(text_hunger.medium).replace(/%player_name%/g, player_data.name));
        }
        if (player_data.stat.hunger / this.options.ViStat.hunger > 0.6 && player_data.stat.hunger / this.options.ViStat.hunger < 0.8) {
            $('body').controllerLog('pushLog', randomArray(text_hunger.big).replace(/%player_name%/g, player_data.name));
        }
        if (player_data.stat.hunger / this.options.ViStat.hunger > 0.8 && player_data.stat.hunger / this.options.ViStat.hunger < 1) {
            $('body').controllerLog('pushLog', randomArray(text_hunger.large).replace(/%player_name%/g, player_data.name));
        }
        if (player_data.stat.hunger / this.options.ViStat.hunger == 1) {
            this.changeViStat('blood', 100, '-');
            $('body').controllerLog('pushLog', randomArray(text_hunger.critical).replace(/%player_name%/g, player_data.name));
        }

        //THIRST
        if (player_data.stat.thirst / this.options.ViStat.thirst > 0.2 && player_data.stat.thirst / this.options.ViStat.thirst < 0.4) {
            $('body').controllerLog('pushLog', randomArray(text_thirst.small).replace(/%player_name%/g, player_data.name));
        }
        if (player_data.stat.thirst / this.options.ViStat.thirst > 0.4 && player_data.stat.thirst / this.options.ViStat.thirst < 0.6) {
            $('body').controllerLog('pushLog', randomArray(text_thirst.medium).replace(/%player_name%/g, player_data.name));
        }
        if (player_data.stat.thirst / this.options.ViStat.thirst > 0.6 && player_data.stat.thirst / this.options.ViStat.thirst < 0.8) {
            $('body').controllerLog('pushLog', randomArray(text_thirst.big).replace(/%player_name%/g, player_data.name));
        }
        if (player_data.stat.thirst / this.options.ViStat.thirst > 0.8 && player_data.stat.thirst / this.options.ViStat.thirst < 1) {
            $('body').controllerLog('pushLog', randomArray(text_thirst.large).replace(/%player_name%/g, player_data.name));
        }
        if (player_data.stat.thirst / this.options.ViStat.thirst == 1) {
            this.changeViStat('blood', 300, '-');
            $('body').controllerLog('pushLog', randomArray(text_thirst.critical).replace(/%player_name%/g, player_data.name));
        }

        //TIRED
        if (player_data.stat.tired / this.options.ViStat.tired > 0.2 && player_data.stat.tired / this.options.ViStat.tired < 0.4) {
            $('body').controllerLog('pushLog', randomArray(text_tired.small).replace(/%player_name%/g, player_data.name));
        }
        if (player_data.stat.tired / this.options.ViStat.tired > 0.4 && player_data.stat.tired / this.options.ViStat.tired < 0.6) {
            $('body').controllerLog('pushLog', randomArray(text_tired.medium).replace(/%player_name%/g, player_data.name));
        }
        if (player_data.stat.tired / this.options.ViStat.tired > 0.6 && player_data.stat.tired / this.options.ViStat.tired < 0.8) {
            $('body').controllerLog('pushLog', randomArray(text_tired.big).replace(/%player_name%/g, player_data.name));
        }
        if (player_data.stat.tired / this.options.ViStat.tired > 0.8 && player_data.stat.tired / this.options.ViStat.tired < 1) {
            $('body').controllerLog('pushLog', randomArray(text_tired.large).replace(/%player_name%/g, player_data.name));
        }
        if (player_data.stat.tired / this.options.ViStat.tired == 1) {
            this.changeViStat('blood', 75, '-');
            $('body').controllerLog('pushLog', randomArray(text_tired.critical).replace(/%player_name%/g, player_data.name));
        }
    }
});