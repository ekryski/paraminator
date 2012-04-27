var rules = require('./rules');
var defaultErrors = require('./errors');

var Paraminator = exports.Paraminator = function() {}

Paraminator.prototype.error = function (msg) {
    throw new Error(msg);
    return this;
};

Paraminator.prototype.validate = function(rules, params, callback) {

    var errors = [];
    var warnings = [];
    var valid = false;

    for (var param in params){
        for (var rule in rules[param].rules){
            if (rules[param].required){
                rule(params, param, rules[param].message, errors);
            }
            else {
                rule(params, param, rules[param].message, warnings);
            }
        }
    }

    if (!errors.length) valid = true;

    callback(errors, warnings, valid);
}

for (var key in rules) {
    if (rules.hasOwnProperty(key)) {
        (function (key) {
            Paraminator.prototype[key] = function() {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(this.str);
                if(!rules[key].apply(this, args)) {
                    return this.error(this.msg || defaultErrors[key]);
                }
                return this;
            };
        })(key);
    }
}

//Create some aliases
Paraminator.prototype.check = Paraminator.prototype.validate;
Paraminator.prototype.assert = Paraminator.prototype.validate;
Paraminator.prototype.isFloat = Paraminator.prototype.isDecimal;
Paraminator.prototype.is = Paraminator.prototype.regex;
Paraminator.prototype.not = Paraminator.prototype.notRegex;