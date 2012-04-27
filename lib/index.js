exports.Paraminator = require('./paraminator').Paraminator;
exports.Sanitizer = require('./sanitizer').Sanitizer;
exports.rules = require('./rules');
exports.defaultErrors = require('./errors');
exports.entities = require('./entities');

//Quick access methods
exports.sanitize = exports.convert = function(str) {
    var sanitizer = new exports.Sanitizer();
    return sanitizer.sanitize(str);
}

exports.validate = exports.assert = exports.check = function(rules, params) {
    var paraminator = new exports.Paraminator();
    return paraminator.validate(rules, params);
}