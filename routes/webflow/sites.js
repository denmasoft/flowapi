var express = require('express');
var router = express.Router();
var Sites = require('../../models/webflow/sites');
router.get('/:id?', function(req, res, next) {
    if (req.params.id) {
        Sites.getSpecificSite(req.params.id, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        Sites.getAll(function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});
router.post('/publish/:site?', function(req, res, next) {
    if (req.params.site) {
        Sites.publishSite(req.params.site, req.body, function(err, count) {
            if (err) {
                res.json(err);
            } else {
                res.json(req.body);
            }
        });
    } else {
        res.json({ 'success': false, 'message': 'You must specify the site id.' });
    }
});
module.exports = router;