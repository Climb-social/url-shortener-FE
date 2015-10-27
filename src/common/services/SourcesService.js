export default ngModule => {

    const slugify = require('slugify');

    ngModule.service('SourcesService', SourcesService);

    function SourcesService($firebaseArray, $firebaseObject, FIREBASE_URL) {
        "use strict";

        const ref = new Firebase(`${FIREBASE_URL}/source`);
        let sources = $firebaseArray(ref);

        return {

            _get(name) {
                const slug = slugify(name).toLowerCase();
                const sourceRef = ref.child(slug);

                return $firebaseObject(sourceRef);
            },

            add(name) {
                let source = this._get(name);
                source.name = name;
                return source.$save();
            },

            list() {
                return sources;
            },

            isLoaded() {
                return sources.$loaded();
            }
        };
    }
}