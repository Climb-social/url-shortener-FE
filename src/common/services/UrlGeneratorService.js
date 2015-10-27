export default ngModule => {

    const slugify = require('slugify');
    const url = require('url');
    const querystring = require('querystring');

    ngModule.service('UrlGeneratorService', UrlGeneratorService);

    function UrlGeneratorService() {
        "use strict";

        return {

            generate(urlToShare, params) {

                const finalParams = {
                    'utm_campaign': slugify(params.campaign).toLowerCase(),
                    'utm_medium': slugify(params.medium).toLowerCase(),
                    'utm_source': slugify(params.source).toLowerCase()
                };

                let qs = querystring.stringify(finalParams);

                return url.resolve(urlToShare, `?${qs}`);
            }

        };
    }
}