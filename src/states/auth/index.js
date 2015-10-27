export default ngModule => {

    ngModule
        .config(function ($stateProvider) {

            $stateProvider
                .state('auth', {
                    url: '/auth',
                    template: require('./auth.html'),
                    controller: 'AuthCtrl as vm'
                });
        });

    //////

    ngModule.controller('AuthCtrl', AuthCtrl);

    function AuthCtrl(AuthService, $state) {
        "use strict";
        let vm = this;

        vm.logIn = (email, password) => {

            AuthService.$authWithPassword({
                email: email,
                password: password
            }).then(function () {
                $state.go('urls');
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });
        }
    }


};
