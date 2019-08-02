var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
router.post('/', function(req, res, next) {
    var authkey = __dirname + '/../../auth.key';
    fs.writeFileSync(authkey, req.body.apikey, { "encoding": "utf8" });
    res.json({ 'success': true, 'msg': req.body.apikey });
});
module.exports = router;