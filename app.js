'use strict';

var express = require('express'),
    app = express(),
    watson = require('watson-developer-cloud'),
    fs = require('fs');

require('./config/express')(app);

var http = require('http').Server(app);
var io = require('socket.io')(http);
var speech_to_text = watson.speech_to_text({
    username: process.env.BLUEMIX_USERNAME,
    password: process.env.BLUEMIX_PASSWORD,
    version: 'v1',
    url: 'https://stream.watsonplatform.net/speech-to-text/api'
});

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/sample', function(req, res) {
    var recognizeStream = speech_to_text.createRecognizeStream({ model: 'fr-FR_BroadbandModel' });
    fs.createReadStream(__dirname + '/resources/brexit.wav').pipe(recognizeStream);
    recognizeStream.setEncoding('utf8');
    recognizeStream.on('readable', function() {
        io.emit('stream_readable', {text: recognizeStream.read()});
    });
    recognizeStream.on('end', function() {
        io.emit('stream_end');
    });

    res.render('sample');
});

http.listen(3000, function(){
      console.log('listening on *:3000');
});
