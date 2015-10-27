export default ngModule => {
    require('./CampaignsService')(ngModule);
    require('./SourcesService')(ngModule);
    require('./ContentService')(ngModule);
    require('./MediumsService')(ngModule);
    require('./LinkService')(ngModule);
    require('./ShortLinksService')(ngModule);
    require('./AuthService')(ngModule);
    require('./ConfigurationsService')(ngModule);
    require('./UrlGeneratorService')(ngModule);
}