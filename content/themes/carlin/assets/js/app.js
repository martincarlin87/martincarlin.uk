var App = function () {

    var handleNotifications = function () {
        
        $(document).on('click', '.notification > button.delete', function() {
            $(this).parent().addClass('is-hidden');
            return false;
        });
    }

    var handleContactForm = function () {

        $('form.contact').on('submit', function () {

            var $form = $(this);
            var $submit = $(this).find(':submit');

            var valid = 1;

            $form.find('.required').each(function() {
                if ($(this).val() === '') {
                    $(this).parent().addClass('is-error');
                    valid = 0;
                } else {
                    $(this).parent().removeClass('is-error');
                }
            });


            if (valid == 1) {

                $submit.addClass('is-loading is-disabled');

                $('div.notification').replaceWith('<div class="notification is-primary">' +
                                            '<button class="delete"></button>' +
                                            '<i class="fa fa-info-circle"></i> Processing form...' +
                                          '</div>');

            } else {
                $('div.notification').replaceWith('<div class="notification is-danger">' +
                                            '<button class="delete"></button>' +
                                            '<i class="fa fa-warning"></i> Please fill out the required fields' +
                                          '</div>');
            }

            return false;
        });
    }

    return {
        // main function to initiate the module
        init: function () {
            handleNotifications();
            handleContactForm();
        }

    };

}();