/**
 * A custom resource helper to help us write configurations into the file system.
 * This is meant to be an npm module, copy it into the main node_modules.
 * Then in the dashboard add "configwriter" as a resource.
 *
 * Get requests with the json-config will be written to the file system.
 *
 * @type {Resource|exports|module.exports}
 */
var	fs = require('fs'),
    jsonfile = require('jsonfile'),
    util		= require('util'),
    path		= require('path'),
    publicDir	= "/../../public",
    debug		= require('debug')('dpd-fileupload'),
    formidable	= require('formidable'),
    md5			= require('md5'),
    mime		= require('mime'),
    Collection	= require('deployd/lib/resources/collection');


function ConfigWriter(name, options) {
    Collection.apply(this, arguments);
}
util.inherits(ConfigWriter, Collection);
module.exports = ConfigWriter;

ConfigWriter.prototype.clientGeneration = true;

ConfigWriter.prototype.handle = function (ctx, next) {
    ctx.query.id = ctx.query.id || this.parseId(ctx) || (ctx.body && ctx.body.id);
    var req = ctx.req;

    if(req && ( req.method === 'POST' || req.method === 'PUT') ) {
        for (var i=0;i<ctx.body.configs.length;i++) {
            var websiteConfig = ctx.body.configs[i];
            var uploadDir = path.join(
                __dirname,
                publicDir,
                'config',
                websiteConfig.domainname.replace(/[\.\-]/ig,'')).toLowerCase();

            try {
                fs.statSync(uploadDir).isDirectory();
            } catch (er) {
                fs.mkdir(uploadDir);
            }

            var file = uploadDir + '/config.json';

            console.log('writing to filesystem for ', websiteConfig.domainname);

            jsonfile.writeFileSync(file, websiteConfig, {spaces: 2});
        }

        ctx.done({ statusCode: 200, message: "done" });
    }
};
