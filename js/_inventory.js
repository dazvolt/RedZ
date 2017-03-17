$.widget('custom.controllerInventory', {
    options: {
        class_menu: '.context-menu',
        cells: 0,
        item_quality: [['awful','ужасное'], ['bad','плохое'], ['good','хорошее'], ['pristine','превосходное']]
    },

    _init: function () {
        this.reloadUI(this.options.cells);
        this._catchContext();
        this._eventsContextMenu();
    },

    formUI: function (slots) {
        if (!slots) slots = this.options.cells;
        $('.inventory-container').html('');

        for (var i = 0; i < slots; i++) {
            $('.inventory-container').append('<div class="inventory-cell empty"><div class="count">0</div></div>');
        }
    },

    reloadUI: function (slots) {
        if (!slots) slots = this.options.cells;
        this.formUI(slots);

        for (var i = 0; i < player_data.inventory.length; i++) {
            $('.inventory-container .inventory-cell:eq('+i+')').attr('data-id', player_data.inventory[i][0])
                .attr('data-quality', player_data.inventory[i][2]);
            $('.inventory-container .inventory-cell:eq('+i+') .count').text(player_data.inventory[i][1]);

            for (var key in items) {
                if (items[key].id == player_data.inventory[i][0]) {
                    $('.inventory-container .inventory-cell:eq('+i+')').addClass(items[key].icon).removeClass('empty');
                }
            }
        }
    },

    _catchContext: function () {
        var self = this;

        document.addEventListener('contextmenu', function(event) {
            event.preventDefault();

            if ($(event.target).hasClass('inventory-cell')) {
                self._formContextMenu('inventory', $(event.target).attr('data-id'), $(event.target).attr('data-quality'));
                self._eventsContextMenu();

                if (!$(event.target).hasClass('empty')) {
                    self._callContextMenu(event);
                }
            }
        });
    },

    _callContextMenu: function (event) {
        $(this.options.class_menu).show();
        $(this.options.class_menu).css({
            top: event.pageY,
            left: event.pageX
        });
    },

    _eventsContextMenu: function () {
        var self = this,
            quality = '',
            $template = '',
            finalQuality = '';

        $('body').on('click', function (event) {
            if (!$(event.target).hasClass('.context-menu') && $(event.target).parents('.context-menu').length == 0) {
                $(self.options.class_menu).hide();
            } else {
                //target true
            }
        });

        $(this.options.class_menu).find('[data-type="information"]').on('click', function (event) {
            for (var key in items) {
                if (items[key].id == $(self.options.class_menu).attr('data-item-id')) {

                    for (var i = 0; i < player_data.inventory.length; i++) {
                        if (player_data.inventory[i][0] == items[key].id && player_data.inventory[i][2] == $(self.options.class_menu).attr('data-item-quality')) {
                            quality = player_data.inventory[i][2];
                            finalQuality = self.options.item_quality[quality];
                        }
                    }

                    $template = '<p class="item-tech '+finalQuality[0]+'"><img src="img/items/' + items[key].icon + '.png" /><span class="item-quality" data-type="'+finalQuality[0]+'">Качество: '+finalQuality[1]+'</span>' + items[key].tech + '</p><br /><p class="item-desc">' + items[key].desc + '</p>';

                    $('.information.window .title-text').text(items[key].name);
                    $('.information.window .text').html($template);
                    $('.information.window').show().css({
                        top: event.pageY - 200,
                        left: event.pageX - 250
                    });
                    $(self.options.class_menu).hide();
                }
            }
        });

        $(this.options.class_menu).find('[data-type="delete"]').on('click', function (event) {
            var item_id = $(self.options.class_menu).attr('data-item-id');
            var item_quality = $(self.options.class_menu).attr('data-item-quality');

            self.removeFromInventory(item_id, item_quality);
            $(self.options.class_menu).hide();
        });

        $(this.options.class_menu).find('[data-type="use"]').on('click', function (event) {
            var item_id = $(self.options.class_menu).attr('data-item-id');
            var item_quality = $(self.options.class_menu).attr('data-item-quality');

            $('body').controllerItem('useItem', item_id, item_quality);
            $(self.options.class_menu).hide();
        });
    },

    _formContextMenu: function (type, id, quality) {
        if (type == 'inventory') {
            $(this.options.class_menu).html('');
            $(this.options.class_menu).append('<button class="button option" data-type="use">Использовать</button>')
                .append('<button class="button option" data-type="delete">Удалить</button>')
                .append('<button class="button option" data-type="information">Информация</button>');
            $(this.options.class_menu).attr('data-item-id', id).attr('data-item-quality', quality);
        }
    },

    addToInventory: function (itemID, count, quality) {
        var self = this;

        if (player_data.inventory_slots == player_data.inventory.length) {
            $('body').controllerLog('pushLog', player_data.name + ' что-то нашел но не смог это забрать, так как его рюкзак полон.');
        } else {
            for (var i = 0; i < player_data.inventory.length; i++) {

                if (global_debug) console.log('current item: ' + player_data.inventory[i], 'adding id: ' + itemID, 'adding quality: ' + quality);
                if (player_data.inventory[i][0] == itemID && player_data.inventory[i][2] == quality) {
                    player_data.inventory[i][1] += parseInt(count);
                    self.reloadUI(player_data.inventory_slots);

                    return false;
                }
            }

            player_data.inventory.push([itemID, count, quality]);
            this.reloadUI(player_data.inventory_slots);
        }
    },

    removeFromInventory: function (itemID, quality) {
        for (var i = 0; i < player_data.inventory.length; i++) {
            if (player_data.inventory[i][0] == itemID && player_data.inventory[i][2] == quality) {
                player_data.inventory.splice(i, 1);
            }
        }

        this.reloadUI(player_data.inventory_slots);
    }
});