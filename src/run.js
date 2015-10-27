const FastClick = require('fastclick');

export default ngModule => {

    ngModule

        // Run FastClick
        .run(function() {
            FastClick.attach(document.body);
        })

        // Add no-touch class
        .run(function() {
            if (!("ontouchstart" in document.documentElement)) {
                document.documentElement.className += " no-touch";
            }
        })

        // Set mobile-safari
        .run(function () {

            function isMobileSafari() {
                return navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)
            }

            if (!isMobileSafari()) {
                document.documentElement.className += " no-mob-safari";
            } else {
                document.documentElement.className += " mob-safari";
            }
        })

        // Auth

        .run(function ($rootScope, $location) {
            "use strict";

            $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
                // We can catch the error thrown when the $requireAuth promise is rejected
                // and redirect the user back to the home page
                debugger;

                if (error === "AUTH_REQUIRED") {
                    $location.path("/auth");
                }
            });


        })

    ;

};