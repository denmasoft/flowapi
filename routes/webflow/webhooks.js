var express = require('express');
var router = express.Router();
var Webhooks = require('../../models/webflow/webhooks');
router.get('/site/:site?', function(req, res, next) {
    if (req.params.site) {
        Webhooks.getAll(req.params.site, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        res.json({ 'success': false, 'message': 'You must specify the site id.' });
    }
});
router.get('/:webhook?/site/:site?', function(req, res, next) {
    if (req.params.Webhook && req.params.site) {

        Webhooks.getSpecificWebHook(req.params.webhook, req.params.site, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        })
    } else {
        res.json({ 'success': false, 'message': 'You must specify the webhook and site id.' });
    }
});
router.post('/:site?/webhook/new', function(req, res, next) {
    if (req.params.site) {
        Webhooks.create(req.params.site, req.body, function(err) {
            if (err) {
                res.json(err); //throw error
            } else {
                res.json({ 'success': true, 'message': 'Webhook created successfully.' });
            }
        })
    } else {
        res.json({ 'success': false, 'message': 'You must specify the site id.' });
    }
});
router.delete('/:site?/remove/:webhook?', function(req, res, next) {
    if (req.params.site && req.params.webhook) {
        Webhooks.remove(req.params.site, req.params.webhook, function(err) {
            if (err) {
                res.json(err);
            } else {
                res.json({ 'success': true, 'message': 'Webhook removed successfully.' });
            }
        })
    } else {
        res.json({ 'success': false, 'message': 'You must specify the site and webhook id.' });
    }
});
module.exports = router;