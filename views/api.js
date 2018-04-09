module.exports = function(app){
    apicontroller = require('../controller/apicontroller');

    app.route('/getdata/:caseid')
      .get(apicontroller.fetch_from_CMO);
}
