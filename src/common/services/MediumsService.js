export default ngModule => {

    const slugify = require('slugify');

    ngModule.service('MediumsService', MediumsService);

    function MediumsService($firebaseArray, $firebaseObject, FIREBASE_URL) {
        "use strict";

        const ref = new Firebase(`${FIREBASE_URL}/medium`);

        return {

            listForSource(source) {
                let source_slug = slugify(source).toLowerCase();
                let mediumsRef = ref.child(source_slug);
                return $firebaseArray(mediumsRef);
            },

            addToSource(source, name) {

                let source_slug = slugify(source).toLowerCase();
                let name_slug = slugify(name).toLowerCase();

                let item = $firebaseObject(
                    ref.child(source_slug)
                        .child(name_slug)
                );

                item.$value = true;
                return item.$save();

            }
        };
    }
}