
$.widget('custom.controllerMainGame', {
    options: {
        main_class: '.main-game-window'
    },

    _init: function () {

    },

    openMainGameWindow: function () {
        $(this.options.main_class).css('height', '0').css('display', 'block').animate({
            height: 520
        }, function () {
            $(this).css('height', 'auto');
        });
    },

    closeMainGameWindow: function () {
        $(this.options.main_class).css('height', '550').css('display', 'block').animate({
            height: 0
        }, function () {
            $(this).css('display', 'none');
        });
    },
    
    gameEnd: function (day) {
        this.closeMainGameWindow();
            $('body').cprompt('call', randomArray(player_death).replace(/%player_name%/g, player_data.name) + ' <br />Выжил: ' + day + ' дней. <br />Итоговый счет: ' + player_data.score + '<br />Играл за класс: ' + player_data.player_class_name, function () {
                location.reload();
            }, false, 'Начать заново', 1);
    }
});