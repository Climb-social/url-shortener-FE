export default ngModule => {

    let urllib = require('url');
    const angular = require('angular');

    ngModule.service('LinkService', LinkService);

    function LinkService(SHORT_URL_HOSTNAME, $q, UrlGeneratorService, ContentService, CampaignsService, SourcesService, MediumsService, ConfigurationsService, ShortLinksService) {
        "use strict";

        return {

            _saveCampaign(name) {
                return CampaignsService.add(name)
                    .then((ref) => {
                        return ref.key();
                    });
            },

            _saveSource(name) {
                return SourcesService.add(name)
                    .then((ref) => {
                        return ref.key();
                    });
            },

            _saveMedium(source, medium) {
                return MediumsService.addToSource(source, medium)
                    .then((ref) => {
                        return ref.key();
                    });
            },

            _saveShort(url) {
                return ShortLinksService.add(url)
                    .then((ref) => {
                        const key = ref.key();
                        return urllib.resolve(SHORT_URL_HOSTNAME, key);
                    });
            },

            _saveContent(value) {
                return ContentService.add(value)
                    .then((ref) => {
                        return ref.key();
                    });
            },

            create(url, params) {

                let campaign = this._saveCampaign(params.campaign);

                let source = this._saveSource(params.source);

                let medium = source
                    .then((source) => {
                        return this._saveMedium(source, params.medium);
                    });

                const generatedUrl = UrlGeneratorService.generate(url, params);
                let shortUrl = this._saveShort(generatedUrl);

                let promises = {
                    campaign,
                    source,
                    medium,
                    shortUrl
                };

                if (params.hasOwnProperty('content')) {
                    promises.content = this._saveContent(params.content)
                }

                $q.all(promises).then((params) => {
                    ConfigurationsService.add(url, angular.extend({
                        ts: Firebase.ServerValue.TIMESTAMP
                    }, params));
                });

                return shortUrl;
            },

            listConfigurations(url) {
                return ConfigurationsService.listForUrl(url);
            },

            listCampaigns() {
                return CampaignsService.list();
            },

            listSources() {
                return SourcesService.list();
            },

            listMediumsForSource(source) {
                return MediumsService.listForSource(source);
            }

        };
    }
}