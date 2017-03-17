$.widget('custom.controllerPath', {
    options: {
        class_menu: '.path-chooser-container',
        pathID: 0,
        skip: false
    },

    _init: function () {
        this._generatePath();
        this._choosePathController();
    },
    
    _generatePath: function () {
        for (var key in player_class) {
            $('.path-choose').append('<div class="path-item" data-path="'+key+'" data-path-id="'+player_class[key].id+'"><div class="path-title">'+player_class[key].name_loc+'</div><div class="path-image"><i class="fa fa-'+player_class[key].icon+'" aria-hidden="true"></i></div><div class="path-desc">'+player_class[key].class_desc+'</div></div>');
        }
    },

    _choosePathController: function () {
        var self = this;

        $(".path-item").on('click', function () {
            self.options.pathID = $(this).data('path-id');
            self._closePath();

            $('body')
                .controllerStat({id: self.options.pathID})
                .controllerInventory({
                    cells: player_data.inventory_slots
                });
            
            for (var keyC in player_class) {
                if (player_class[keyC].id == self.options.pathID) {
                    player_data.player_class = keyC;
                    player_data.player_class_name = player_class[keyC].name_loc;
                    player_data.player_class_id = player_class[keyC].id;
                }
            }
        });

        if (this.options.skip == true) {
            $('.path-item:eq(1)').click();
        }
    },

    _closePath: function () {
        var self = this;
        $('.path-chooser-container').animate({
            height: 0
        }, 1000, function () {
            $('.path-chooser-container').hide();
            $('body').cprompt('call', 'Введите имя:', function (result) {
                player_data.name = result;
                $('body').controllerMainGame('openMainGameWindow')
                    .controllerActions();
            }, true);

            if (self.options.skip) {
                $('#c-field').val('Тестировщик');
                $('.confirm.button').click();
            }
            
        });
    },

    getPath: function () {
        return this.options.pathID;
    }
});