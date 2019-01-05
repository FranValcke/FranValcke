/**
 * Created by Fran on 5/12/2018.
 */
const token = require('../lib/token');
function init(app) {
    const path = '/token';
    // endpoint to create token to given address
    app.post(path+'/buyTicket', token.buyTicket);

}
module.exports = init;

