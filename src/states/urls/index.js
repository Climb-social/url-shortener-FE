export default ngModule => {

    ngModule
        .config(function ($stateProvider) {

            $stateProvider
                .state('urls', {
                    url: '/',
                    template: require('./urls.html'),
                    controller: 'UrlsCtrl as vm',
                    resolve: {
                        currentAuth(AuthService) {
                            return AuthService.$requireAuth();
                        }
                    }
                });
        });

    //////

    ngModule.controller('UrlsCtrl', UrlsCtrl);

    function UrlsCtrl(currentAuth, LinkService, $state) {
        "use strict";
        let vm = this;

        if (!currentAuth) {
            $state.go('auth');
        }

        vm.inputUrl = '';

        vm.params = {};

        vm.allCampaigns = LinkService.listCampaigns;
        vm.allSources = LinkService.listSources;
        vm.allMediumsForSource = LinkService.listMediumsForSource;

        vm.configurations = [];

        vm.onUrlChange = () => {
            if (!vm.urlForm.url.$valid) {
                return false;
            }

            vm.configurations = LinkService.listConfigurations(vm.inputUrl);
        };

        vm.reset = () => {
            "use strict";
            vm.params = {};
            vm.inputUrl = '';
            vm.configurations = [];
            vm.urlForm.$setPristine();
            vm.urlForm.$setUntouched();
            vm.isSaving = false;
        };

        vm.setOutputUrl = (url) => {
            vm.outputUrl = url;
        };

        vm.create = () => {
            "use strict";

            vm.isSaving = true;
            LinkService.create(vm.inputUrl, vm.params)
                .then((url) => {
                    vm.outputUrl = url;
                    vm.reset();
                });


        };

    }


};
