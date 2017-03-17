
$.widget('custom.controllerLog', {
    options: {
        class_menu: '.chronic-text'
    },

    _init: function () {

    },

    pushLog: function (message) {
        $(this.options.class_menu).append('<p>'+message.replace()+'</p>');
        $(this.options.class_menu).stop().animate({
            scrollTop: $(this.options.class_menu)[0].scrollHeight
        }, 800);
    }
});