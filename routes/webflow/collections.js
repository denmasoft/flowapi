var express = require('express');
var router = express.Router();
var Collections = require('../../models/webflow/collections');
router.get('/site/:site?', function(req, res, next) {
    if (req.params.site) {
        Collections.getAll(req.params.site, function(err, rows) {
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
router.get('/:collection?/items/:limit?', function(req, res, next) {
    if (req.params.collection) {
        var limit = req.params.limit ? req.params.limit : 10;
        Collections.getItems(req.params.collection, limit, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        })
    } else {
        res.json({ 'success': false, 'message': 'You must specify the collection id.' });
    }
});
router.get('/:collection?/schema', function(req, res, next) {
    if (req.params.collection) {
        Collections.getAllWithFullSchema(req.params.collection, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        })
    } else {
        res.json({ 'success': false, 'message': 'You must specify the collection id.' });
    }
});
router.get('/:collection?/item/:item?', function(req, res, next) {
    if (req.params.collection && req.params.item) {
        Collections.getSingleItem(req.params.collection, req.params.item, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        })
    } else {
        res.json({ 'success': false, 'message': 'You must specify the collection and the item id.' });
    }
});
router.post('/:collection?/item/new', function(req, res, next) {
    if (req.params.collection) {
        Collections.createItem(req.params.collection, req.body, function(err) {
            if (err) {
                res.json(err); //throw error
            } else {
                res.json({ 'success': true, 'message': 'Item created successfully.' });
            }
        })
    } else {
        res.json({ 'success': false, 'message': 'You must specify the collection id.' });
    }
});
router.put('/:collection?/item/update', function(req, res, next) {
    if (req.params.collection) {
        Collections.updateItem(req.params.collection, req.body, function(err) {
            if (err) {
                res.json(err);
            } else {
                res.json({ 'success': true, 'message': 'Item updated successfully.' });
            }
        })
    } else {
        res.json({ 'success': false, 'message': 'You must specify the collection id.' });
    }
});
router.delete('/:collection?/remove/:item?', function(req, res, next) {
    if (req.params.collection && req.params.item) {
        Collections.removeItem(req.params.collection, req.params.item, function(err) {
            if (err) {
                res.json(err);
            } else {
                res.json({ 'success': true, 'message': 'Item removed successfully.' });
            }
        })
    } else {
        res.json({ 'success': false, 'message': 'You must specify the collection and item id.' });
    }
});
module.exports = router;