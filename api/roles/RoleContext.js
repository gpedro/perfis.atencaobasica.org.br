/**
 * Role Context
 * ---
 *
 * The role context is used to determine the roles of a given request.
 * You are free in how to do this, via session variable or via a DB lookup are common scenarios
 *
 */

var actionUtil = require('we-helpers').actionUtil;
var _ = require('lodash'); 

module.exports = {

    resolveRoles: function (req, next) {
        if (!req.isAuthenticated()) return next(['anonymous']);

        if (req.user.isAdmin) return next(['admin', 'authenticated']);
        
        var contextModel = {};
        try {
        	contextModel = actionUtil.parseModel(req);
        } catch (e){
        	// Could not be able to parse a related model for this request
        	// sails.log.warn(e);
        }

        if (_.isEmpty(contextModel)) return next(['authenticated']);

        var pk = actionUtil.parsePk(req);
        if (!pk) return next(['authenticated']);

        contextModel.findOneById(pk)
        .exec(function (err, modelInstance){
        	if (err) return next(err);
        	if (!_.has(modelInstance, 'creator')) return next(['authenticated']);
        	if (modelInstance.creator === req.user.id) return next(['authenticated', 'creator']);

        	next(['authenticated']);
        });
    }

};
