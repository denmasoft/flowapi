const Webflow = require('webflow-api');
var fs = require('fs');
var path = require('path');
var authkey = fs.readFileSync(path.join(__dirname) + '/auth.key', "utf8");
const webflow = new Webflow({ token: authkey });
module.exports = webflow;