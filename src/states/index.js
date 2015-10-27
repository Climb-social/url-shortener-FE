export default ngModule => {

    require('./main')(ngModule);
    require('./urls')(ngModule);
    require('./auth')(ngModule);
}