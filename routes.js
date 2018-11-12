
const userClientRoute = require("./app_modules/client_modules");
const manageRoute = require("./admin_modules/management_module");
module.exports = function(app) {
    app.use('/app',userClientRoute);
    app.use('/manage',manageRoute);
}