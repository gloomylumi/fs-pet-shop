'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var petsPath = path.join( __dirname, 'pets.json' );

var node = path.basename( process.argv[ 0 ] );
var file = path.basename( process.argv[ 1 ] );
var cmd = process.argv[ 2 ];
var index = process.argv[ 3 ]

if ( cmd === 'read' ) {
  fs.readFile( petsPath, 'utf8', function( err, data ) {
    if ( err ) {
      throw err;

    }
    var pets = JSON.parse( data );
    console.log( pets[ index ] );
  } );
} else {
  console.error( `Usage: ${node} ${file} [read | create | update | destroy]` );
  process.exit( 1 );
}
