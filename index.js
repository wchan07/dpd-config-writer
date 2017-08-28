/**
 * A custom resource helper to help us write configurations into the file system.
 * This is meant to be an npm module, copy it into the main node_modules.
 * Then in the dashboard add "configwriter" as a resource.
 *
 * Get requests with the json-config will be written to the file system.
 *
 * @type {Resource|exports|module.exports}
 */
var Resource = require('deployd/lib/resource')
    , util = require('util');

var	fs = require('fs'),
    util		= require('util'),
    path		= require('path'),
    publicDir	= "../public",
    debug		= require('debug')('dpd-fileupload'),
    formidable	= require('formidable'),
    md5			= require('md5'),
    mime		= require('mime');


function ConfigWriter(name, options) {
    console.log('construcor of ConfigWriter')
    Resource.apply(this, arguments);
}
util.inherits(ConfigWriter, Resource);
module.exports = ConfigWriter;

ConfigWriter.prototype.clientGeneration = true;

ConfigWriter.prototype.handle = function (ctx, next) {
    console.log('handle a rquest')
    ctx.query.id = ctx.query.id || this.parseId(ctx) || (ctx.body && ctx.body.id);
    var req = ctx.req,
        self = this;

    if(req && req.method === 'GET') {
        var uploadDir = publicDir + '/test';
        try {
            fs.statSync(uploadDir).isDirectory();
        } catch (er) {
            fs.mkdir(uploadDir);
        }
    }
};
