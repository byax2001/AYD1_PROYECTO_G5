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
router.get(baseurl + 'user',                                      OAUTH.validateToken,USER.getuser)
router.put(baseurl + 'user',                                      OAUTH.validateToken,USER.updateuser)
router.delete(baseurl + 'user',                                   OAUTH.validateToken,USER.deleteuser)


// Repartidores
router.post(baseurl + 'userdeliver',    upload.single('image'),   USERDELIVER.newdeliveruser)
router.get(baseurl + 'userdeliver',                               OAUTH.validateToken,USERDELIVER.getdeliveruser)
router.put(baseurl + 'userdeliver',     upload.single('image'),   OAUTH.validateToken,USERDELIVER.updatedeliveruser)
router.delete(baseurl + 'userdeliver',                            OAUTH.validateToken,USERDELIVER.deletedeliveruser)

// Restaurantes

router.post(baseurl + 'restaurants',    upload.single('image'),   RESTAURANTS.newrestaurant)
router.get(baseurl + 'restaurants',                               OAUTH.validateToken,RESTAURANTS.getrestaurant)
router.put(baseurl + 'restaurants',     upload.single('image'),   RESTAURANTS.updaterestaurant) 
router.delete(baseurl + 'restaurants',                            OAUTH.validateToken,RESTAURANTS.deleterestaurant)
router.get(baseurl + 'restaurants/type',                          OAUTH.validateToken,RESTAURANTS.getrestauranttype)

//Productos
router.post(baseurl + 'products',       upload.single('image'),   OAUTH.validateToken,PRODUCTS.newproduct)
router.get(baseurl + 'products',                                  OAUTH.validateToken,PRODUCTS.getproducts)
router.put(baseurl + 'products',        upload.single('image'),   OAUTH.validateToken,PRODUCTS.updateproduct)
router.delete(baseurl + 'products/:id',                           OAUTH.validateToken,PRODUCTS.deleteproduct)
router.get(baseurl + 'products/type/:id',                         OAUTH.validateToken,PRODUCTS.getproductsbytype)
router.get(baseurl + 'products/rest/:id',                         OAUTH.validateToken,PRODUCTS.getproductsbyrestaurant)
router.get(baseurl + 'products/type',                             OAUTH.validateToken,PRODUCTS.gettyproducts)

//Revision Solicitudes
router.put(baseurl + 'aceptRequest',                              OAUTH.validateToken,ACEPTREQ.updateAceptReq)
router.put(baseurl + 'denyRequest',                               OAUTH.validateToken,ACEPTREQ.updateDenyReq)
router.get(baseurl + 'reqPendingRestaurant',                      OAUTH.validateToken,ACEPTREQ.getInfoReqRestaurant)
router.get(baseurl + 'reqPendingDelivers',                        OAUTH.validateToken,ACEPTREQ.getInfoReqDelivers)

// Reportes
router.get(baseurl + 'reports',                                   OAUTH.validateToken,REPORTS.getInfoUser)

//Municipio
router.get(baseurl + 'departamento',                              OAUTH.validateToken,ADDR.getInfoDep)
router.get(baseurl + 'departamento/municipio/:id',                OAUTH.validateToken,ADDR.getInfoMun)

module.exports = router;