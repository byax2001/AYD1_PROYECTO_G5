'use strict'

var express = require('express');
var multer = require('multer');
var USER = require('../controllers/User.Controller');
var USERDELIVER = require('../controllers/UserDeliver.Controller')
var RESTAURANTS = require('../controllers/UserRestaurant.Controller')
var REPORTS = require('../controllers/Admin.Reports')

var router = express.Router();
var baseurl = '/api/';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })



// Ruta default
router.get('/', (req, res) => {
    res.status(200).send('exitoso');    
});

// Usuarios
router.post(baseurl + 'user',                                     USER.newuser)
router.get(baseurl + 'user',                                      USER.getuser)
router.put(baseurl + 'user',                                      USER.updateuser)
router.delete(baseurl + 'user',                                   USER.deleteuser)


// Repartidores
router.post(baseurl + 'userdeliver',    upload.single('image'),   USERDELIVER.newdeliveruser)
router.get(baseurl + 'userdeliver',                               USERDELIVER.getdeliveruser)
router.put(baseurl + 'userdeliver',     upload.single('image'),   USERDELIVER.updatedeliveruser)
router.delete(baseurl + 'userdeliver',                            USERDELIVER.deletedeliveruser)

// Restaurantes

router.post(baseurl + 'restaurants',    upload.single('image'),   RESTAURANTS.newrestaurant)
router.get(baseurl + 'restaurants',                               RESTAURANTS.getrestaurant)
router.put(baseurl + 'restaurants',     upload.single('image'),   RESTAURANTS.updaterestaurant) 
router.delete(baseurl + 'restaurants',                            RESTAURANTS.deleterestaurant)

// Reportes
router.get(baseurl + 'reports',                                   REPORTS.getInfoUser)

module.exports = router;