'use strict';

const express = require( 'express' );
const app = express();
var port = process.env.PORT || 8000;

app.disable( 'x-powered-by' );

app.use( function( req, res ) {
  var pets = [ {
    "age": 7,
    "kind": "rainbow",
    "name": "fido"
  }, {
    "age": 5,
    "kind": "snake",
    "name": "Buttons"
  } ];
  res.send( pets );
} );

app.listen( port, function() {
  console.log( 'Listening on port', port );
} );
