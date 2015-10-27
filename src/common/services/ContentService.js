export default ngModule => {

    const slugify = require('slugify');

    ngModule.service('ContentService', ContentService);

    function ContentService($firebaseArray, $firebaseObject, FIREBASE_URL) {
        "use strict";

        const ref = new Firebase(`${FIREBASE_URL}/content`);
        let contents = $firebaseArray(ref);

        return {

            _get(name) {
                const slug = slugify(name).toLowerCase();
                const contentRef = ref.child(slug);

                return $firebaseObject(contentRef);
            },

            add(name) {
                let content = this._get(name);
                content.name = name;
                return content.$save();
            },

            list() {
                return contents;
            },

            isLoaded() {
                return contents.$loaded();
            }
        };
    }
}