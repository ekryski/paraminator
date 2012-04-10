## I will Paramidate You... ##

Paramidator is a flexible and powerful paramater validator module that allows you to define validation rules and error messages in a testable manner.

It is the Arnold Schwarzenegger of validation.

![Paramidator](https://github.com/ekryski/paramidator/raw/master/paramidator.jpg)

### Defining Rules ###
Rules are defined in a JSON structure making it easy to customize and read.

	var todoRules = {
		'id': {
			'required': true,
			'message': 'Need to provide a valid id',
			'rules': [
				'isNotNull',
				'isNotEmpty',
				'isNotNan',
				'regEx(/foo/i)'
			]
		}
	}

### Validating ###

	
	var paramidator = require('paramidator');
	var validate = paramidator.validate;

	var todoRules = {
		'id': {
			'required': true,
			'message': 'Need to provide a valid id',
			'rules': [
				paramidator.isNotNull(),
				paramidator.isNotEmpty(),
				paramidator.isNotNan(),
				paramidator.regEx(/foo/i)
			]
		}
	}

	app.get('/todos:id', function(req, res, next){
		req.validate( todoRules, function(errors, valid){
			if (!valid) console.log(errors);
			else console.log('parameters are valid!');
		});
	});
