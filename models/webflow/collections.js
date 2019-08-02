var webflow = require('../../webflow');
var Collections = {
    getAll: function(site, callback) {
        const collections = webflow.collections({ siteId: site });
        collections.then(c => console.log(c));
    },
    getAllWithFullSchema: function(id, callback) {
        const collection = webflow.collection({ collectionId: id });
        collection.then(c => console.log(c));
    },
    getItems: function(collection, limit, callback) {
        const items = webflow.items({ collectionId: collection }, { limit: limit });
        items.then(i => console.log(i));
    },
    getSingleItem: function(collection, item_id, callback) {
        const item = webflow.item({ collectionId: collection, itemId: item_id });
        item.then(i => console.log(i));
    },
    createItem: function(collection, Item, live, callback) {
        const item = webflow.createItem({
            collectionId: collection,
            live: live,
            fields: {
                'name': Item.name, //'Exciting blog post title'
                'slug': Item.slug, //'exciting-post'
                '_archived': Item._archived, //false
                '_draft': Item._draft, //false
                'color': Item.color, //'#a98080'
                'author': Item.author, //'580e640c8c9a982ac9b8b778'
                'post-body': Item.postBody, //'<p>Blog post contents...</p>'
                'post-summary': Item.postSummary, //'Summary of exciting blog post'
                'main-image': Item.mainImage, //'580e63fe8c9a982ac9b8b749'
            },
        });
        item.then(i => console.log(i));
    },
    updateItem: function(collection, Item, callback) {
        const item = webflow.updateItem({
            collectionId: collection,
            itemId: Item.id,
            fields: {
                'name': Item.name,
                'slug': Item.slug,
                '_archived': Item._archived,
                '_draft': Item._draft,
                'color': Item.color,
                'author': Item.author,
                'post-body': Item.postBody,
                'post-summary': Item.postSummary,
                'main-image': Item.mainImage,
            }
        });
        item.then(i => console.log(i));
    },
    removeItem: function(collection, item, callback) {
        const removed = webflow.removeItem({ collectionId: collection, itemId: item })
        removed.then(x => console.log(x));
    }
};
module.exports = Collections;