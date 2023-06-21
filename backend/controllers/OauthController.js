const database = require("../managers/databaseManager");
const querysMySQL = require("../querys/querysMySQL");
const crypto = require('crypto');
const JWT = require('jsonwebtoken');

exports.login = async function(req, res) {
    try {
      var datausesr = {};
      //let passwordEncrypt = crypto.createHash('md5').update(req.body.password).digest("hex");
  
      // Primero debemos buscar al usuario mediante su username
      const result = await new Promise((resolve, reject) => {
        database.query(querysMySQL.list_users_byuser, [req.body.username], function(err, result, fields) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  
      if (result.length > 0) { 
        // Comparo la contraseña encriptada con la proporcionada por el usuario
        if (result[0].password == req.body.password) {
          // Si está bien la contraseña, busco si es un usuario tipo restaurante
          if (result[0].rol == 3) {
            const result2 = await new Promise((resolve, reject) => {
              database.query(querysMySQL.list_restaurant_byemail, [result[0].email], function(err, result2, fields) {
                if (err) {
                  reject(err);
                } else {
                  resolve(result2);
                }
              });
            });
            datausesr.idempresa = result2[0].id_empresa;
          }
          datausesr.iduser = result[0].id_usuario;
          datausesr.nombre = result[0].nombre;
          datausesr.apellido = result[0].apellido;
          datausesr.email = result[0].email;
          datausesr.username = result[0].username;
          datausesr.rol = result[0].rol;
          datausesr.telefono = result[0].telefono;
          datausesr.tipo_licencia = result[0].tipo_licencia;
          datausesr.nit = result[0].nit;
          datausesr.fecha_registro = result[0].fecha_registro;

          // Creación del token JWT 
          const token = JWT.sign(datausesr,process.env.JWT_TOKEN,{expiresIn: '1h'});
  
          res.status(200).send({ message: "Bienvenido", data: datausesr, valid: true, token:token });
        } else {
          res.status(200).send({ message: "Credenciales incorrectas", data: datausesr, valid: false });
        }
      } else {
        res.status(200).send({ message: "Credenciales incorrectas", data: datausesr, valid: false });
      }
    } catch (err) {
      // Manejo de errores
      res.status(400).send({status: "error", message: "Hubo un error en el inicio de sesión", data: e});
    }
  };



  exports.validateToken = async (req,res,next) =>{
    
    try{
      const headers = req.headers
      const authCode = headers.authorization
      const basic = authCode.split(' ')

      const decode = JWT.verify(authCode,process.env.JWT_TOKEN)
      req.body.auth = decode
      next();
    }catch(error){
      res.status(200).send({ message: "Token Invalido",valid: false });
    }
  }
  