export default ngModule => {

    const slugify = require('slugify');

    ngModule.service('CampaignsService', CampaignsService);

    function CampaignsService($firebaseArray, $firebaseObject, FIREBASE_URL) {
        "use strict";

        const ref = new Firebase(`${FIREBASE_URL}/campaign`);
        let campaigns = $firebaseArray(ref);

        return {

            _get(name) {
                const slug = slugify(name).toLowerCase();
                const campaignRef = ref.child(slug);

                return $firebaseObject(campaignRef);
            },

            add(name) {
                let campaign = this._get(name);
                campaign.name = name;
                return campaign.$save();
            },

            list() {
                return campaigns;
            },

            isLoaded() {
                return campaigns.$loaded();
            }
        };
    }
}