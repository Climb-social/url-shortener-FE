export default ngModule => {

    const url = require('url');
    const crypto = require('crypto');
    const angular = require('angular');

    ngModule.service('ConfigurationsService', ConfigurationsService);

    function ConfigurationsService($firebaseArray, FIREBASE_URL) {
        "use strict";

        const ref = new Firebase(`${FIREBASE_URL}/configuration`);

        return {

            hashForUrl(longUrl) {

                return crypto
                    .createHash('md5')
                    .update(longUrl)
                    .digest("hex");
            },

            add(longUrl, params) {

                const urlHash = this.hashForUrl(longUrl);
                const linksRef = ref.child(urlHash);
                let links = $firebaseArray(linksRef);

                let newLink = angular.extend({
                    url: longUrl
                }, params);

                return links.$add(newLink);
            },

            listForUrl(longUrl) {
                const urlHash = this.hashForUrl(longUrl);
                const linksRef = ref.child(urlHash);
                return $firebaseArray(linksRef);
            }
        };
    }
}