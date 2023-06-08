'use strict'

var express = require('express');

var USER = require('../controllers/User.Controller');


var router = express.Router();
var baseurl = '/api/';

// Ruta default
router.get('/', (req, res) => {
    res.status(200).send('exitoso');    
});

// Usuarios
router.post(baseurl + 'user',               USER.newuser)

module.exports = router;