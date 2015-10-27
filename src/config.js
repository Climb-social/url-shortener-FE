export default ngModule => {

    ngModule

        // Enable HTML5 mode
        .config(function ($locationProvider) {
            $locationProvider
                .hashPrefix('!');
        })

        .config(function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/auth');

        })


    ;
}