export default ngModule => {

    ngModule.service('AuthService', AuthService);

    function AuthService($firebaseAuth, FIREBASE_URL) {
        "use strict";

        const ref = new Firebase(`${FIREBASE_URL}`);
        return $firebaseAuth(ref);

    }
}