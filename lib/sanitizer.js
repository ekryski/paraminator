var entities = require('./entities');
var xss = require('./xss');

var Sanitizer = exports.Sanitizer = function() {}

var whitespace = '\\r\\n\\t\\s';

Sanitizer.prototype.modify = function(str) {
    this.str = str;
}

Sanitizer.prototype.wrap = function (str) {
    return str;
}

Sanitizer.prototype.value = function () {
    return this.str;
}

Sanitizer.prototype.chain = function () {
    this.wrap = function () { return this };
    return this;
}

//Create some aliases - may help code readability
Sanitizer.prototype.convert = Sanitizer.prototype.sanitize = function(str) {
    this.str = str;
    return this;
}

Sanitizer.prototype.xss = function(is_image) {
    this.modify(xss.clean(this.str, is_image));
    return this.wrap(this.str);
}

Sanitizer.prototype.entityDecode = function() {
    this.modify(entities.decode(this.str));
    return this.wrap(this.str);
}

Sanitizer.prototype.entityEncode = function() {
    this.modify(entities.encode(this.str));
    return this.wrap(this.str);
}

Sanitizer.prototype.ltrim = function(chars) {
    chars = chars || whitespace;
    this.modify(this.str.replace(new RegExp('^['+chars+']+', 'g'), ''));
    return this.wrap(this.str);
}

Sanitizer.prototype.rtrim = function(chars) {
    chars = chars || whitespace;
    this.modify(this.str.replace(new RegExp('['+chars+']+$', 'g'), ''));
    return this.wrap(this.str);
}

Sanitizer.prototype.trim = function(chars) {
    chars = chars || whitespace;
    this.modify(this.str.replace(new RegExp('^['+chars+']+|['+chars+']+$', 'g'), ''));
    return this.wrap(this.str);
}

Sanitizer.prototype.ifNull = function(replace) {
    if (!this.str || this.str === '') {
        this.modify(replace);
    }
    return this.wrap(this.str);
}

Sanitizer.prototype.toFloat = function() {
    this.modify(parseFloat(this.str));
    return this.wrap(this.str);
}

Sanitizer.prototype.toInt = function(radix) {
    radix = radix || 10;
    this.modify(parseInt(this.str*1, radix));
    return this.wrap(this.str);
}

//Any strings with length > 0 (except for '0' and 'false') are considered true,
//all other strings are false
Sanitizer.prototype.toBoolean = function() {
    if (!this.str || this.str == '0' || this.str == 'false' || this.str == '') {
        this.modify(false);
    } else {
        this.modify(true);
    }
    return this.wrap(this.str);
}

//String must be equal to '1' or 'true' to be considered true, all other strings
//are false
Sanitizer.prototype.toBooleanStrict = function() {
    if (this.str == '1' || this.str == 'true') {
        this.modify(true);
    } else {
        this.modify(false);
    }
    return this.wrap(this.str);
}