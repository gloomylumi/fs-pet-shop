'use strict';
const fs = require( 'fs' );
const path = require( 'path' );
var petsPath = path.join( __dirname, 'pets.json' );

const express = require( 'express' );
const app = express();
var port = process.env.PORT || 8000;

app.disable( 'x-powered-by' );

app.get( '/pets', function( req, res ) {
  fs.readFile( petsPath, 'utf8', function( err, petsJSON ) {
    if ( err ) {
      console.error( err.stack );
      return res.sendStatus( 500 );
    }

    var pets = JSON.parse( petsJSON );
    res.send( pets );
  } );

} );
app.use( function( req, res ) {
  res.sendStatus( 404 );
} );
app.listen( port, function() {
  console.log( 'Listening on port', port );
} );
