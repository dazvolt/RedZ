$.widget('custom.cprompt', {
    options: {
        class_menu: '.cprompt',
        callback: ''
    },

    _init: function () {
        
    },
    
    call: function (text, callback, input, buttonName, opacity) {
        var self = this;

        if (opacity) {
            $('.overlay').css('background', 'rgba(0,0,0, '+opacity+')');
        }

        $('.overlay').fadeIn();
        $(this.options.class_menu).fadeIn();

        if (!input) {
            $(self.options.class_menu + ' input').hide();
        }

        $(self.options.class_menu + ' input').focus();
        $(this.options.class_menu + ' .c-text').html(text);

        if (buttonName) {
            $(self.options.class_menu + ' .confirm').text(buttonName);
        } else {
            buttonName = 'Подтвердить';
        }

        $(this.options.class_menu).on('keypress', function (event) {
            if (event.keyCode == 13) {
                if ($(self.options.class_menu + ' input').val().length > 0) {
                    self._close(callback);
                }
            }
        });

        $(this.options.class_menu + ' .confirm').on('click', function () {
            if ($(self.options.class_menu + ' input').val().length > 0) {
                self._close(callback);
            }
        });
    },

    _close: function (callback) {
        var result = '',
            self = this;

        result = $(self.options.class_menu + ' input').val();
        $('.overlay').fadeOut();
        $(self.options.class_menu).fadeOut();

        callback(result);

        return result;
    }
});