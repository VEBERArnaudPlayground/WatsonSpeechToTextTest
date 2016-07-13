'use strict';

var express = require('express'),
    app = express(),
    watson = require('watson-developer-cloud'),
    ytdl = require('ytdl-core'),
    avconv = require('avconv');

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

app.get('/youtube/:id', function(req, res) {
    var videoId = req.params.id;
    res.render('youtube', {videoId : videoId});

    // create youtube stream
    var youtubeStream = ytdl('http://www.youtube.com/watch?v=' + videoId, {format: 'mp4'});

    // create conv stream
    var convStream = avconv(['-i', 'pipe:0', '-vn', '-f', 'wav', 'pipe:1']);

    // create recognize stream
    var recognizeStream = speech_to_text.createRecognizeStream({model: 'fr-FR_BroadbandModel'});
    recognizeStream.setEncoding('utf8');

    // youtube to text
    youtubeStream
        .pipe(convStream)
        .pipe(recognizeStream);

    // speech to text events
    recognizeStream.on('readable', function() {
        io.emit('stream_readable', {text: recognizeStream.read()});
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
