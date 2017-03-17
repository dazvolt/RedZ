$.widget('custom.controllerActions', {
    options: {
        class_menu: '.context-menu',
        current_loc: '',
        location: [],
        day: 0,
        lootable: 3,
        cacheText: ''
    },
    
    _init: function () {
        this._loadStartMoveLocation();
		this._events();
        $('.interaction-actions .combat').hide();
        this._enemyLogic();
    },
    
    _loadStartMoveLocation: function () {
        this.move('movenext');
    },
	
	_events: function () {
		var self = this;
		
		$('[data-action-type="leave"]').on('click', function () {
			self.move('movenext');
            self._tick('move');
		});

        $('[data-action-type="move"]').on('click', function () {
            self.move('movein');
            self._tick('move');
        });

        $('[data-action-type="sleep"]').on('click', function () {
            self._tick('sleep');
        });

        $('[data-action-type="search"]').on('click', function () {
            self._tick('search');
        });
	},
    
    move: function (type) {
        var getStory = '',
            story = '',
			getStoryNext = '',
			getStoryLast = '';

        if (type == 'movenext') {
            getStory = pickRandomProperty(loc);
            story += randomArray(loc[getStory].desc);
            this.options.current_loc = getStory;
        }

        if (type == 'movein') {
            getStory = this.options.current_loc;
            story += randomArray(loc[getStory].desc_next);
        }

        $('[data-action-type="move"] .name, [data-action-type="leave"] .name').text('"' + loc[getStory].name + '"');
		
		getStoryNext = pickRandomProperty(loc[getStory].loc);
		story += ' ' + randomArray(loc[getStory].loc[getStoryNext].desc);
		
		getStoryLast = pickRandomProperty(loc[getStory].loc[getStoryNext].loc);
		
		story += ' ' + randomArray(near) + loc[getStory].loc[getStoryNext].loc[getStoryLast].name + '.';

        $('[data-action-type="sleep"] .name, [data-action-type="search"] .name').text('"' + loc[getStory].loc[getStoryNext].loc[getStoryLast].name + '"');

        var story_result = story.replace(/%player_name%/g, player_data.name);

        this.options.location = [getStory, getStoryNext, getStoryLast];

        $('.interaction-text').text(story_result);
		$('body').controllerLog('pushLog', story_result);
    },

    _checkEnemy: function () {
        var chance = loc[this.options.location[0]].loc[this.options.location[1]].loc[this.options.location[2]].enemy_chance;

        return checkChance(chance);
    },

    _enemyLogic: function () {
        var self = this;

        $('[data-action-type="fight_melee"]').on('click', function () {
            if (player_data.equip.meleeWeapon) {
                $('body').controllerLog('pushLog', randomArray(enemy_fight_melee).replace(/%player_name%/g, player_data.name).replace(/%weapon_name%/g, player_data.equip.meleeWeapon.name));

                if (checkChance(0.5 + (player_data.stat.intelligence / 40))) {
                    player_data.score += 50;
                    $('body').controllerLog('pushLog', randomArray(enemy_fight_melee_result_good).replace(/%player_name%/g, player_data.name).replace(/%weapon_name%/g, player_data.equip.meleeWeapon.name));
                } else {
                    player_data.score -= 5;
                    $('body').controllerLog('pushLog', randomArray(enemy_fight_melee_result_bad).replace(/%player_name%/g, player_data.name).replace(/%weapon_name%/g, player_data.equip.meleeWeapon.name))
                        .controllerStat('changeViStat', 'blood', 1800 - (player_data.stat.defense * 150), '-')
                }
            } else if (!player_data.equip.meleeWeapon) {
                $('body').controllerLog('pushLog', randomArray(enemy_fight_gun_fail).replace(/%player_name%/g, player_data.name));

                if (checkChance(0.2 + (player_data.stat.intelligence / 40))) {
                    player_data.score += 100;
                    $('body').controllerLog('pushLog', randomArray(enemy_fight_melee_result_good).replace(/%player_name%/g, player_data.name).replace(/%weapon_name%/g, player_data.equip.meleeWeapon));
                } else {
                    player_data.score -= 20;
                    $('body').controllerLog('pushLog', randomArray(enemy_fight_melee_result_bad).replace(/%player_name%/g, player_data.name).replace(/%weapon_name%/g, player_data.equip.meleeWeapon))
                        .controllerStat('changeViStat', 'blood', 2000- (player_data.stat.defense * 150), '-');
                }
            }
            $('.interaction-text').text(self.options.cacheText);
            self._afterFight();
        });
        $('[data-action-type="fight_gun"]').on('click', function () {
            if (player_data.equip.secondaryWeapon) {
                $('body').controllerLog('pushLog', randomArray(enemy_fight_gun).replace(/%player_name%/g, player_data.name).replace(/%weapon_name%/g, player_data.equip.secondaryWeapon.name));

                if (checkChance(0.8 + (player_data.stat.intelligence / 40))) {
                    player_data.score += 20;
                    $('body').controllerLog('pushLog', randomArray(enemy_fight_gun_result_good).replace(/%player_name%/g, player_data.name).replace(/%weapon_name%/g, player_data.equip.secondaryWeapon.name));
                } else {
                    player_data.score -= 5;
                    $('body').controllerLog('pushLog', randomArray(enemy_fight_gun_result_bad).replace(/%player_name%/g, player_data.name).replace(/%weapon_name%/g, player_data.equip.secondaryWeapon.name))
                        .controllerStat('changeViStat', 'blood', 1500- (player_data.stat.defense * 150), '-')
                }
            } else if (player_data.equip.primaryWeapon) {
                $('body').controllerLog('pushLog', randomArray(enemy_fight_gun).replace(/%player_name%/g, player_data.name).replace(/%weapon_name%/g, player_data.equip.primaryWeapon.name));

                if (checkChance(0.8 + (player_data.stat.intelligence / 40))) {
                    player_data.score += 20;
                    $('body').controllerLog('pushLog', randomArray(enemy_fight_gun_result_good).replace(/%player_name%/g, player_data.name).replace(/%weapon_name%/g, player_data.equip.primaryWeapon.name));
                } else {
                    player_data.score -= 5;
                    $('body').controllerLog('pushLog', randomArray(enemy_fight_gun_result_bad).replace(/%player_name%/g, player_data.name).replace(/%weapon_name%/g, player_data.equip.primaryWeapon.name))
                        .controllerStat('changeViStat', 'blood', 1500 - (player_data.stat.defense * 150), '-')
                }
            } else if (!player_data.equip.primaryWeapon && !player_data.equip.secondaryWeapon) {
                $('body').controllerLog('pushLog', randomArray(enemy_fight_gun_fail).replace(/%player_name%/g, player_data.name));

                if (checkChance(0.2 + (player_data.stat.intelligence / 40))) {
                    player_data.score += 100;
                    $('body').controllerLog('pushLog', randomArray(enemy_fight_melee_result_good).replace(/%player_name%/g, player_data.name).replace(/%weapon_name%/g, player_data.equip.meleeWeapon));
                } else {
                    player_data.score -= 20;
                    $('body').controllerLog('pushLog', randomArray(enemy_fight_melee_result_bad).replace(/%player_name%/g, player_data.name).replace(/%weapon_name%/g, player_data.equip.meleeWeapon))
                        .controllerStat('changeViStat', 'blood', 2000 - (player_data.stat.defense * 150), '-');
                }
            }
            $('.interaction-text').text(self.options.cacheText);
            self._afterFight();
        });
        $('[data-action-type="run_away"]').on('click', function () {
            $('body').controllerStat('changeViStat', 'thirst', parseInt(25), '+')
                .controllerStat('changeViStat', 'hunger', parseInt(5), '-')
                .controllerStat('changeViStat', 'tired', parseInt(15), '-');
            if (checkChance(player_data.stat.speed / 10) || checkChance(player_data.stat.intelligence / 10)) {
                $('body').controllerLog('pushLog', player_data.name + randomArray(enemy_run).replace(/%player_name%/g, player_data.name));
            } else {
                $('body').controllerLog('pushLog', player_data.name + randomArray(enemy_run_bad).replace(/%player_name%/g, player_data.name))
                    .controllerStat('changeViStat', 'blood', 2000 - (player_data.stat.defense * 150), '-');
            }
            
            self._afterFight();
            self.move('movein');
        });
        $('[data-action-type="stay"]').on('click', function () {
            $('body').controllerStat('changeViStat', 'thirst', parseInt(15), '+')
                .controllerStat('changeViStat', 'hunger', parseInt(5), '-')
                .controllerStat('changeViStat', 'tired', parseInt(5), '-');
            if (checkChance(player_data.stat.luck / 10) || checkChance(player_data.stat.intelligence / 10)) {
                $('body').controllerLog('pushLog', player_data.name + randomArray(enemy_stay).replace(/%player_name%/g, player_data.name));
                $('.interaction-text').text(self.options.cacheText);
            } else {
                $('body').controllerStat('changeViStat', 'thirst', parseInt(25), '+')
                    .controllerStat('changeViStat', 'hunger', parseInt(5), '-')
                    .controllerStat('changeViStat', 'tired', parseInt(15), '-');
                $('body').controllerLog('pushLog', player_data.name + randomArray(enemy_stay_bad).replace(/%player_name%/g, player_data.name))
                    .controllerStat('changeViStat', 'blood', 2000 - (player_data.stat.defense * 150), '-');
                self.move('movein');
            }

            self._afterFight();
        });
    },

    _afterFight: function () {
        $('.interaction-actions .non-combat').show();
        $('.interaction-actions .combat').hide();

        $('body').controllerStat('checkStat');

        if (player_data.stat.blood <= 0) {
            $('body').controllerMainGame('gameEnd', this.options.day);
        }
    },

    _showFightButtons: function () {
        $('.interaction-actions .non-combat').hide();
        $('.interaction-actions .combat').show();

        if (player_data.equip.meleeWeapon) {
            $('[data-action-type="fight_melee"] .melee-name').text(player_data.equip.meleeWeapon.name);
        } else {
            $('[data-action-type="fight_melee"] .melee-name').text('оружия нет');
        }

        if (player_data.equip.secondaryWeapon) {
            $('[data-action-type="fight_gun"] .gun-name').text(player_data.equip.secondaryWeapon.name);
        } else if (player_data.equip.primaryWeapon) {
            $('[data-action-type="fight_gun"] .gun-name').text(player_data.equip.primaryWeapon.name);
        } else if (!player_data.equip.secondaryWeapon && !player_data.equip.primaryWeapon) {
            $('[data-action-type="fight_gun"] .gun-name').text('оружия нет');
        }
    },

    _tick: function (type) {

        if (this._checkEnemy()) {
            $('body').controllerLog('pushLog', player_data.name + ' столкнулся с зомби!');
            this._showFightButtons();
            this.options.cacheText = $('.interaction-text').text();
            $('.interaction-text').text(randomArray(enemy_appear).replace(/%player_name%/g, player_data.name));
        } else {

            if (type == 'move') {
                this.options.lootable += 3;
                if (this.options.lootable > 3) {
                    this.options.lootable = 3;
                }
                player_data.score += 10;
                this.options.day += 0.25;
                $('body').controllerStat('changeViStat', 'hunger', parseInt(getRandomInt(1, 5) - ((player_data.stat.perception / 10) * 1.5)), '+')
                    .controllerStat('changeViStat', 'thirst', parseInt(getRandomInt(1, 8) - ((player_data.stat.perception / 10) * 2)), '+')
                    .controllerStat('changeViStat', 'tired', parseInt(getRandomInt(1, 6) - ((player_data.stat.power / 10) * 2)), '+');
            }

            if (type == 'sleep') {
                player_data.score += 5;
                this.options.day += 0.5;
                $('body').controllerStat('changeViStat', 'hunger', parseInt(getRandomInt(1, 10) - ((player_data.stat.perception / 10) * 1.5)), '+')
                    .controllerStat('changeViStat', 'thirst', parseInt(getRandomInt(1, 2) - ((player_data.stat.perception / 10) * 2)), '+')
                    .controllerStat('changeViStat', 'tired', parseInt(getRandomInt(10, 20) + ((player_data.stat.power / 10) * 2)), '-');

                this._sleep();
            }

            if (type == 'search') {
                this.options.lootable -= 1;
                if (this.options.lootable <= 0) {
                    this.options.lootable = 0;
                } else if (this.options.lootable > 0) {
                    player_data.score += 10;
                    this.options.day += 0.25;
                    $('body').controllerStat('changeViStat', 'hunger', parseInt(getRandomInt(1, 8) - ((player_data.stat.perception / 10) * 1.5)), '+')
                        .controllerStat('changeViStat', 'thirst', parseInt(getRandomInt(1, 10) - ((player_data.stat.perception / 10) * 2)), '+')
                        .controllerStat('changeViStat', 'tired', parseInt(getRandomInt(1, 15) - ((player_data.stat.power / 10) * 2)), '+');
                }

                this._search();
            }

            if (isInt(this.options.day)) {
                player_data.score += 20;
                $('.days-gone').text(this.options.day);
                $('body').controllerLog('pushLog', player_data.name + ' смог выжить уже ' + this.options.day + ' дней!');
            }

            $('body').controllerStat('checkStat');

            if (player_data.stat.blood <= 0) {
                $('body').controllerMainGame('gameEnd', this.options.day);
            }
        }
    },

    _search: function () {
        var getCurrentArray = loot_table[this.options.location[0]][this.options.location[1]][this.options.location[2]];
        var formString = player_data.name + ' нашел';
        var qualityRand = '';
        var gotItem = '';
        var itemName = '';
        var globalGotItem = false;
        var formSearchString = player_data.name + ' обыскивает ';
        $('body').controllerLog('pushLog', formSearchString + ' ' + loc[this.options.location[0]].loc[this.options.location[1]].loc[this.options.location[2]].desc + '.');

        if (this.options.lootable <= 0) {
            $('body').controllerLog('pushLog', player_data.name + ' обыскал все места какие только возможны. Похоже, искать тут больше нечего!');
        } else {
            for (var i = 0; i < getCurrentArray.length; i++) {
                gotItem = checkChance(getCurrentArray[i][1] + (player_data.stat.luck / 50));
                qualityRand = getRandomInt(0, getCurrentArray[i][2]);

                if (gotItem) {
                    $('body').controllerInventory('addToInventory', getCurrentArray[i][0], 1, qualityRand);
                    globalGotItem = true;

                    for (var key in items) {
                        if (items[key].id == getCurrentArray[i][0]) {
                            itemName = items[key].name;
                        }
                    }

                    $('body').controllerLog('pushLog', formString + ' ' + itemName + '.');
                }
            }

            if (!globalGotItem) {
                $('body').controllerLog('pushLog', player_data.name + ' не смог ничего найти.');
            }
        }
    },

    _sleep: function () {
        $('body').controllerLog('pushLog', player_data.name + ' решил немного поспать в ' + loc[this.options.location[0]].loc[this.options.location[1]].loc[this.options.location[2]].desc);
    }
});