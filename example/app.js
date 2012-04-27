 module.exports = ( function () {
  var express = require( 'express' );
  var app = express.createServer();
  app.paraminator = require( 'paraminator' );

  app.configure( function () {
    app.set( 'root', __dirname );
    app.set( 'view engine', 'jade' );
    app.set( 'views', __dirname + '/views' );
    app.use( express.bodyParser() );
    app.use( express.cookieParser() );
    app.use( app.router );
    app.use( express.static( __dirname + '/public' ) );
  } );

  var todoRules = {
    'id': {
      required: true,
      message: 'Need to provide a valid id',
      rules: [ paraminator.isUUID() ]
    },
    'completed': {
      required: false,
      message: '\'completed\' must be a valid boolean',
      rules: [ paraminator.isBoolean() ]
    },

  }

  app.get('/todos', function(req, res, next){
    app.paraminator.validate(todoRules, req.query, function(errors, warnings, valid){
      if (errors) console.log(errors.join(','));
      if (warnings) console.log(warnings.join(','));
      if (!valid) console.log('I have paraminated you!');
      if (!valid) console.log('You are good to go!');
    });
  });

  app.get('/todos/:id', function(req, res, next){
    app.paraminator.validate(todoRules, req.params, function(errors, warnings, valid){
      if (errors) console.log(errors.join(','));
      if (warnings) console.log(warnings.join(','));
      if (!valid) console.log('I have paraminated you!');
      if (!valid) console.log('You are good to go!');
    });
  });

  // Starts up the server, if there is no parent process (such as integration test runner or the like)
  if ( !module.parent ) {
    app.listen( 3000 );
    console.log( 'Server running at http://127.0.0.1:3000/' + '\r' );
  }

  return app;
}());