const database = require("../managers/databaseManager");
const { enviarEmailUser } = require("../managers/emailManager");
const querysMySQL = require("../querys/querysMySQL");
const crypto = require('crypto');


exports.newuser = async function (req,res){
    try{
        var user = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            rol: req.body.rol, 
            telefono: req.body.telefono,
            tipo_licencia: req.body.tipo_licencia,
            nit: req.body.nit,
            fecha_registro: req.body.fecha_registro, 
            direccion: req.body.direccion,        
            municipio: req.body.municipio,        

        };
        //Encripto la contraseña
 
        //Primero hago la validación que no exista el correo
        database.query(querysMySQL.list_users_byemail,[user.email],function(err,result,fields){    
            var currentDate = new Date();
            if (err)throw err;
                if (result.length>0){
                res.status(200).send({msg:"El correo ya está asociado a una cuenta.", valid:false})
                return;
            }else{
                //segundoo hago la validación que no exista el usuario
                database.query(querysMySQL.list_users_byuser,[user.username],function(err,result,fields){    
                    if (err)throw err;
                        if (result.length>0){
                        res.status(200).send({msg:"El usuario ya está asociado a una cuenta.", valid:false})
                        return;
                    }else{
                        database.query(querysMySQL.ins_user,[user.nombre,user.apellido,user.email,user.username,user.password,user.rol,user.telefono,user.tipo_licencia,user.nit,currentDate],function(err,result,fields){
                            
                            //Si todo pasó correctamente, envio el correo

                            database.query(querysMySQL.ins_address,[user.direccion,"",result.insertId,user.municipio],function(err,result,fields){
                                if (err)throw err;
                                enviarEmailUser(user.email,"Bienvenido",user.username)
                            });

                            
                            res.status(200).send({status: "success", message: "Usuario creado con exito"});
                        });        
                        
                    }
                });
            }
        });       
        
    }catch(e){
        res.status(400).send({status: "error", message: "Error al crear usuario", data: e});
    }
}




exports.updateuser = async function (req,res){
    try{
        var user = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            rol: req.body.rol, 
            telefono: req.body.telefono,
            tipo_licencia: req.body.tipo_licencia,
            nit: req.body.nit,
            iduser: req.body.iduser
        };

        //Encripto la contraseña
        let passwordEncrypt = crypto.createHash('md5').update(user.password).digest("hex");
        database.query(querysMySQL.update_datosuser,[user.nombre,user.apellido,passwordEncrypt,user.rol,user.telefono,user.tipo_licencia,user.nit,user.iduser],function(err,result,fields){    
            if (err)throw err;
                
            res.status(200).send({status: "success", message: "Usuario actualizado con exito"});
        })

    }catch(e){
        res.status(400).send({status: "error", message: "Error al actualizar usuario", data: e});
    }
}

exports.getuser = async function (req,res){
    try{
        database.query(querysMySQL.list_all_users,[],async function(err,result,fields){    
            if (result){
    
                res.status(200).send({status: "success", message: "Estos son los usuarios:", data: result});
            }else{
                res.status(200).send({msg:"Se produjo un error al obtener usuarios.", valid:false})
                return;
    
            }
        }); 

    }catch(e){
        res.status(400).send({status: "error", message: "Error al obtener usuarios", data: e});
    }
}

exports.banuser = async function (req,res){
    try{
        var tipoban

        if(req.body.tipoban ==1){
            tipoban = 0
        }else if(req.body.tipoban == 2){
            tipoban = 3
        }


        database.query(querysMySQL.ban_user,[tipoban, req.body.descripcion,req.body.id ],async function(err,result,fields){    
            if (result.affectedRows>0){
                if(tipoban == 0){
                    res.status(200).send({status: "success", message: "El Usuario ha sido baneado"});    
                }else if(tipoban == 3){
                    res.status(200).send({status: "success", message: "El Usuario se ha cambiado a mantenimiento"});
                }
                
            }else{
                res.status(200).send({msg:"Se produjo un error al banear usuario.", valid:false})
                return;
    
            }
        }); 

    }catch(e){
        res.status(400).send({status: "error", message: "Error al banear usuario", data: e});
    }
}

exports.newchangeadressrequest = async function (req,res){
    try{
       
        var currentDate = new Date();

        var user = {
      
            userid: req.body.userid,
            municipio: req.body.municipio,
            direccion: req.body.direccion,
        };
        database.query(querysMySQL.ins_sol_cambio_departamental, [currentDate,user.userid,0,user.direccion,user.municipio],async function(err,result,fields){
            if (err)throw err;
            if (result){ 

                res.status(200).send({valid:true, msg: "Su solicitud de cambio departamental ha sido ingresada"});

            }else{
                res.status(200).send({msg:"Hubo un error al crear la solicitud de cambio departamental", valid:false})
            }
        });       
        
    }catch(e){
        res.status(400).send({status: "error", msg: "Error al crear solicitud de cambio departamental", data: e});
    }
}
