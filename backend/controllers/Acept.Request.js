const database = require("../managers/databaseManager");
const querysMySQL = require("../querys/querysMySQL");
const { enviarEmailUser } = require("../managers/emailManager");


exports.updateAceptReq = async function (req, res) {
    try {
        var pendingReq = {
            id_solicitud: req.body.id_solicitud
        };
        var datausesr = {};
        database.query(querysMySQL.update_pending_request, [1, pendingReq.id_solicitud], async function (err, result, fields) {
        });

        // Primero debemos buscar al usuario mediante su solicitud
        const result = await new Promise((resolve, reject) => {
            database.query(querysMySQL.list_emp_request, [pendingReq.id_solicitud], function (err, result, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        datausesr.nombre = result[0].nombre;
        datausesr.apellido = result[0].apellido;
        datausesr.email = result[0].email;
        datausesr.username = result[0].username;
        datausesr.password = result[0].password;
        datausesr.telefono = result[0].telefono;
        datausesr.tipo_licencia = result[0].tipo_licencia;
        datausesr.tipo_empresa = result[0].tipo_empresa;
        datausesr.nit = result[0].nit;
        datausesr.fecha_registro = result[0].fecha_solicitud;
        datausesr.descripcion_empresa = result[0].descripcion_empresa;
        datausesr.direccion = result[0].direccion;
        datausesr.municipio = result[0].municipio_id_municipio;
        res.status(200).send({ status: "success", message: "Usuario creado con exito", data: datausesr });
        if (result.length > 0) {
            //si es repartidor inserta el repartidor en usuario
            if (datausesr.descripcion_empresa == null || datausesr.descripcion_empresa == "") {
                const result2 = await new Promise((resolve, reject) => {
                    database.query(querysMySQL.ins_user, [datausesr.nombre, datausesr.apellido, datausesr.email, datausesr.username, datausesr.password, 2, datausesr.telefono, datausesr.tipo_licencia, datausesr.nit, datausesr.fecha_registro], function (err, result2, fields) {
                        if (err) {
                            reject(err);
                        } else {

                            database.query(querysMySQL.ins_address,[datausesr.direccion,"",result2.insertId,datausesr.municipio],function(err,result,fields){
                                if (err)throw err;
                                enviarEmailUser(datausesr.email,"Bienvenido",datausesr.username)
                            });
                            resolve(result2);
                        }
                    });
                });

            } else {
                //inserta el usuario
                const result2 = await new Promise((resolve, reject) => {
                    database.query(querysMySQL.ins_user, [datausesr.nombre, null, datausesr.email, datausesr.username, datausesr.password, 3, datausesr.telefono, null, datausesr.nit, datausesr.fecha_registro], async function (err, result2, fields) {
                        if (err) {
                            reject(err);
                        } else {
                            //ahora inserta la empresa 
                            const result3 = await new Promise((resolve, reject) => {
                                database.query(querysMySQL.ins_empre, [datausesr.nombre, datausesr.descripcion_empresa, datausesr.email, datausesr.tipo_empresa, datausesr.telefono], function (err, result3, fields) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        console.log(result2)
                                        database.query(querysMySQL.ins_address,[datausesr.direccion,"",result2.insertId,datausesr.municipio],function(err,result,fields){
                                            if (err)throw err;

                                            enviarEmailUser(datausesr.email,"Bienvenido",datausesr.username)
                                        });
                                        resolve(result3);
                                    }
                                });
                            });
                            resolve(result2);
                        }
                    });
                });

            }


        } else {
            res.status(200).send({ message: "Credenciales incorrectas", data: datausesr, valid: false });
        }


    } catch (e) {
        res.status(400).send({ status: "error", message: "Error al obtener informacion de usuarios", data: e });
    }
}

exports.updateDenyReq = async function (req, res) {
    try {
        var pendingReq = {
            id_solicitud: req.body.id_solicitud
        };
        database.query(querysMySQL.update_pending_request, [2, pendingReq.id_solicitud], async function (err, result, fields) {

            res.status(200).send({ status: "success", message: "Update Deny Request" });
        });
    } catch (e) {
        res.status(400).send({ status: "error", message: "Error al obtener informacion de usuarios", data: e });
    }
}


exports.getInfoReqRestaurant = async function (req, res) {
    try {
        database.query(querysMySQL.req_pending_restaurant, [], async function (err, result, fields) {

            //Luego de ejecutar todos los querys se validan si fueron exitos
            if (result) {
                //devuelve los 5 resultados en un JSON
                res.status(200).send({ status: "success", message: "Estos son las solicitudes pendientes de restaurantes:", data: result});
            } else {
                res.status(200).send({ msg: "Se produjo un error al obtener las solicitudes.", valid: false })
                return;

            }


        });

    } catch (e) {
        res.status(400).send({ status: "error", message: "Error al obtener informacion de usuarios", data: e });
    }
}


exports.getInfoReqDelivers = async function (req, res) {
    try {
        database.query(querysMySQL.req_pending_delivers, [], async function (err, result, fields) {

            //Luego de ejecutar todos los querys se validan si fueron exitos
            if (result) {
                //devuelve los 5 resultados en un JSON
                res.status(200).send({ status: "success", message: "Estos son las solicitudes pendientes de repartidores:", data: result});
            } else {
                res.status(200).send({ msg: "Se produjo un error al obtener las solicitudes.", valid: false })
                return;

            }


        });

    } catch (e) {
        res.status(400).send({ status: "error", message: "Error al obtener informacion de usuarios", data: e });
    }
}


exports.getInfoReqChangeAdress = async function (req, res) {
    try {
        database.query(querysMySQL.req_pending_address_change, [], async function (err, result, fields) {

            //Luego de ejecutar todos los querys se validan si fueron exitos
            if (result) {
                //devuelve los 5 resultados en un JSON
                res.status(200).send({ status: "success", message: "Estos son las solicitudes pendientes de cambio departamental:", data: result});
            } else {
                res.status(200).send({ msg: "Se produjo un error al obtener las solicitudes de cambio departamental.", valid: false })
                return;

            }


        });

    } catch (e) {
        res.status(400).send({ status: "error", message: "Error al obtener las solicitudes de cambio departamental", data: e });
    }
}


exports.updateAceptChangeAdressReq = async function (req, res) {
    try {
        var pendingReq = {
            id_solicitud: req.body.id_solicitud
        };
        database.query(querysMySQL.list_emp_request, [pendingReq.id_solicitud], async function (err, result, fields) {
            if(result.length>0){
                database.query(querysMySQL.update_adrress,[result[0].direccion,result[0].municipio_id_municipio,result[0].usuario_id_usuario, ] , async function (err, result2, fields) {
                    if (err)throw err;
                    if(result2.affectedRows>0){
                        database.query(querysMySQL.update_pending_request_change_adrress,[2,pendingReq.id_solicitud],async function(err,result3,fields){

                            if(err)throw err;
                            if(result3.affectedRows>0){
                                res.status(200).send({status: "success", msg: "se hizo el cambio de forma correcta"});
                            }else{
                                res.status(200).send({msg:"No se pudo hacer el cambio de dirección", valid:false})
                            }
                            
                        });
                    }else{
                        res.status(200).send({msg:"No se pudo hacer el cambio de dirección", valid:false})
                    }
                });
            }
            
        });
    } catch (e) {
        res.status(400).send({ status: "error", msg: "Error al obtener informacion de usuarios", data: e });
    }
}
