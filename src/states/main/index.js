export default ngModule => {

    require('./main.scss');

    ngModule
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($mdSidenav, AuthService, $state) {
        let vm = this;

        vm.Auth = AuthService;


        vm.Auth.$onAuth(function (authData) {
            if (!authData) {
                $state.go('auth');
            }
        });
    }

};
