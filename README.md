## I will Paraminate You... ##

Paraminator is a flexible and powerful paramater validator module that allows you to define validation rules and error messages in a testable manner.

It is the Arnold Schwarzenegger of validation.

![Paraminator](https://github.com/ekryski/paraminator/raw/master/paramidator.jpg)

**This is currently under development and is not intended for use yet!**

### Defining Rules ###
Rules are defined in a JSON structure making it easy to customize and read.

	var todoRules = {
		'id': {
			'required': true,
			'message': 'Need to provide a valid id',
			'rules': [
				paraminator.isNotNull(),
				paraminator.regEx(/foo/i)
			]
		},
		'number': {
			'required': true,
			'message': 'Need to provide a valid number',
			'rules': [
				paraminator.isFloat()
			]
		}
	}

### Validating ###

	
	var paraminator = require('paraminator');

	var todoRules = {
		'id': {
			'required': true,
			'message': 'Need to provide a valid id',
			'rules': [
				paraminator.isNotNull(),
				paraminator.regEx(/foo/i)
			]
		}
	}

	app.get('/todos:id', function(req, res, next){
		paraminator.validate( todoRules, req.body, function(errors, warnings, valid){
			if (!valid) console.log(errors);
			else console.log('parameters are valid!');
		});
	});

This is largely based off of chriso's [node-validator](https://github.com/chriso/node-validator) however I wanted something that is more flexible and that can do proper rule chaining.
