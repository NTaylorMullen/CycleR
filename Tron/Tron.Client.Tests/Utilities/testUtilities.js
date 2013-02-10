var testUtilities;

(function ($, window) {
    testUtilities = {
        theory: function (argumentList, fn) {
            for (var i = 0; i < argumentList.length; i++) {
                fn.apply(this, argumentList[i]);
            }
        }
    };
})($, window)