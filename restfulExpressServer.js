'use strict';
const fs = require( 'fs' );
const path = require( 'path' );
var petsPath = path.join( __dirname, 'pets.json' );
const express = require( 'express' );
const app = express();

app.disable( 'x-powered-by' );
app.set('port',process.env.PORT || 8000);

const morgan = require('morgan');
app.use(morgan('short'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.get( '/pets', function( req, res ) {
  fs.readFile(petsPath,'utf8',function (err,petsJSON) {
    if (err) {
      console.error(err);
      res.sendStatus(404);
    }
    var pets = JSON.parse(petsJSON);
    res.send( pets );
  });
} );

app.get( '/pets/:id', function( req, res, next ) {
  fs.readFile(petsPath,'utf8',function (err,petsJSON) {
    if (err) {
      return next(err);
    }
    var pets = JSON.parse(petsJSON);

    var id = Number.parseInt( req.params.id );

    if ( id < 0 || id >= pets.length || Number.isNaN( id ) ) {
      return res.sendStatus( 404 );
    }
    res.send( pets[ id ] );
  });
} );

app.post( '/pets', function( req, res,next ) {
  fs.readFile(petsPath,'utf8',function (err,petsJSON) {
    if (err) {
      return next(err);
    }
    var pets = JSON.parse(petsJSON);
  var pet = req.body;
  if(!pet.name || !pet.age || !pet.kind) {
    return res.sendStatus(400);
  }
  pets.push(pet);
  var newPetsJSON = JSON.stringify(pets);
  fs.writeFile(petsPath,newPetsJSON,function (err) {
    if (err) {
      return next(err);
    }
    res.send(pet);
  });
});
} );


app.listen( app.get('port'), function() {
  console.log( 'Listening on', app.get('port') );
} );

app.use(function (err,req,res,next) {
  console.error(err.stack);
  return res.status(500).send('Something broke!');
});

app.use(function (req,res,next) {
  res.set('Content-Type','text/plain');
  res.status(404).send('Not Found');
});

module.exports = app;
