

function validate(form,errorClass) {
    var hasErrors, inputs, self, validateGeneral, validateOnEmail, validateOnEmpty, validateOnPhone;
    errorClass = errorClass||"error";
    hasErrors = 0;
    inputs = form.find("[data-validate]");
    self = this;
    validateGeneral = function (input, flag) {
        if (flag) {
            input["removeClass"](errorClass);
        } else {
            hasErrors++;
            input["addClass"](errorClass);
        }
    };
    validateOnEmpty = function (input) {
        var inputLength, length;
        length = 2;
        inputLength = input.val().length;
        validateGeneral(input, inputLength >= length);
    };
    validateOnEmail = function (input) {
        var res;
        res = /^([a-zA-Z0-9+_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        validateGeneral(input, res.test(input.val()));
    };
    validateOnPhone = function (input) {
        var regex;
        regex = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
        validateGeneral(input, regex.test(input.val()));
    };
    inputs.each(function (i, el) {
        var $el;
        $el = $(el);
        switch ($el.attr("data-validate")) {
            case "empty":
                validateOnEmpty($el);
                break;
            case "email":
                validateOnEmail($el);
                break;
            case "tel":
                validateOnPhone($el);
                break;
            default:
                validateOnEmpty($el);
        }
    });
    return hasErrors === 0;
};