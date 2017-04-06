var express = require('express');
var router = express.Router();
var gcs = require('@google-cloud/storage')({
  projectId: 'express-test-158013',
  keyFilename: 'public/express-test-4d5a2e930ec3.json'
});

var fotos = [];
var bucket = gcs.bucket('test-bucket-cam1');

bucket.getFiles(function(err, files){
  if(err){
    console.log(err);
  } else {
    for(var i = 0; i<files.length; i++){
      fotos.push(files[i]);
    }
  }
});

router.get('/', function(req, res){
    console.log(req.query);
    res.json({
        message: fotos
    });
});

module.exports = router;
