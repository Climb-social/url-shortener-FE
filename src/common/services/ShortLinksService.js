export default ngModule => {

    const shortid = require('shortid');

    ngModule.service('ShortLinksService', ShortLinksService);

    function ShortLinksService($firebaseArray, $firebaseObject, FIREBASE_URL) {
        "use strict";

        const ref = new Firebase(`${FIREBASE_URL}/short`);

        return {

            add(url) {

                const id = shortid.generate();
                const linkRef = ref.child(id);
                let link = $firebaseObject(linkRef);

                link.$value = url;
                return link.$save();
            }

        };
    }
}