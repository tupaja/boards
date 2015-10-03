var jwt = require('express-jwt');
var config = require('config');

module.exports = jwt({
  secret: config.get('jwtSecret'),
  getToken: function (req) {
    return req.cookies.token;
  }
})
