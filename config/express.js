'use strict';

var express = require('express'),
    bodyParser = require('body-parser');

module.exports = function (app) {
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.enable('trust proxy');

    app.use(express.static(__dirname + '/../public'));
};
