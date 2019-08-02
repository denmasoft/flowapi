var webflow = require('../../webflow');
var Sites = {
    getAll: function(callback) {
        const sites = webflow.sites();
        sites.then(s => console.log(s));
    },
    getSpecificSite: function(id, callback) {
        const site = webflow.sites({ siteId: id });
        site.then(s => console.log(s));
    },
    publishSite: function(id, domains, callback) {
        const published = webflow.publishSite({ siteId: id, domains: domains });
        published.then(p => console.log(p));
    }
};
module.exports = Sites;