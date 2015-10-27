// Libs
const angular = require('angular');
require('angular-ui-router');
require('angular-material');
require('angular-messages');
require('firebase');
require('angularfire');
require('angular-material-icons');
require('polyfill-function-prototype-bind');

// Styles
require('css/main.scss');


var ngModule = angular.module('app', [
    'ui.router',
    'ngMaterial',
    'ngMdIcons',
    'ngMessages',
    'firebase'
]);

require('./config')(ngModule);
require('./run')(ngModule);
require('./common')(ngModule);
require('./states')(ngModule);
require('./constants')(ngModule);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
});