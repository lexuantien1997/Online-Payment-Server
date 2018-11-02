
const accountRoute = require('admin_module');
const userClientRoute = require('client_mobile_module');
const manageRoute=require('management_module');

module.exports = function(app) {
    app.use('/secure',accountRoute);
    app.use('/app',userClientRoute);
    app.use('/manage',manageRoute);
}