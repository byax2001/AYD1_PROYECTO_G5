'use strict'

var express = require('express');
var multer = require('multer');
var USER = require('../controllers/User.Controller');
var USERDELIVER = require('../controllers/UserDeliver.Controller')
var RESTAURANTS = require('../controllers/UserRestaurant.Controller')
var OAUTH = require('../controllers/OauthController')
var REPORTS = require('../controllers/Admin.Reports')
var PRODUCTS = require('../controllers/Products.Controller')
var ACEPTREQ = require('../controllers/Acept.Request')
var ADDR = require('../controllers/Address.Controller')

var router = express.Router();
var baseurl = '/api/';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })



// Ruta default
router.get('/', (req, res) => {
    res.status(200).send('exitoso');    
});

//Oauth
router.post(baseurl + 'login',                                    OAUTH.login)


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

//Productos
router.post(baseurl + 'products',       upload.single('image'),   PRODUCTS.newproduct)
router.get(baseurl + 'products',                                  PRODUCTS.getproducts)
router.put(baseurl + 'products',        upload.single('image'),   PRODUCTS.updateproduct)
router.delete(baseurl + 'products/:id',                           PRODUCTS.deleteproduct)
router.get(baseurl + 'products/type/:id',                         PRODUCTS.getproductsbytype)
router.get(baseurl + 'products/rest/:id',                         PRODUCTS.getproductsbyrestaurant)
router.get(baseurl + 'products/type',                             PRODUCTS.getproductsbytype)

//Revision Solicitudes
router.put(baseurl + 'aceptRequest',                              ACEPTREQ.updateAceptReq)
router.put(baseurl + 'denyRequest',                               ACEPTREQ.updateDenyReq)
router.get(baseurl + 'reqPendingRestaurant',                      ACEPTREQ.getInfoReqRestaurant)
router.get(baseurl + 'reqPendingDelivers',                        ACEPTREQ.getInfoReqDelivers)

// Reportes
router.get(baseurl + 'reports',                                   REPORTS.getInfoUser)

//Municipio
router.get(baseurl + 'departamento',                              ADDR.getInfoDep)
router.get(baseurl + 'departamento/municipio',                    ADDR.getInfoMun)

module.exports = router;