var webflow = require('../../webflow');
var WebHooks = {
    getAll: function(site, callback) {
        const webhooks = webflow.webhooks({ siteId: site });
        webhooks.then(hook => console.log(hook));
    },
    getSpecificWebHook: function(site, webhook_id, callback) {
        const webhook = webflow.webhook({ siteId: site, webhookId: webhook_id });
        webhook.then(hook => console.log(hook));
    },
    create: function(site, data, callback) {
        const webhook = webflow.createWebhook({
            siteId: site,
            triggerType: data.triggerType,
            url: data.url,
        });
        webhook.then(hook => console.log(hook));
    },
    remove: function(site, webhook, callback) {
        const deletedHook = webflow.removeWebhook({ siteId: site, webhookId: webhook })
        deletedHook.then(x => console.log(x))
    }
};
module.exports = WebHooks;