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
            fecha_registro: req.body.fecha_registro
        };
        //Encripto la contraseña
        let passwordEncrypt = crypto.createHash('md5').update(user.password).digest("hex");
        //Primero hago la validación que no exista el correo
        database.query(querysMySQL.list_users_byemail,[user.email],function(err,result,fields){    
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
                        database.query(querysMySQL.ins_user,[user.nombre,user.apellido,user.email,user.username,passwordEncrypt,user.rol,user.telefono,user.tipo_licencia,user.nit,user.fecha_registro],function(err,result,fields){
                            
                            //Si todo pasó correctamente, envio el correo
                            enviarEmailUser(user.email,"Bienvenido",user.username)
                            res.status(200).send({status: "success", message: "Usuario creado con exito"});
                        });        
                        
                    }
                });
            }
        });       
        
    }catch(e){
        console.log(e)
        res.status(400).send({status: "error", message: "Error al crear usuario", data: e});
    }
}



exports.deleteuser = async function (req,res){
    try{
        var user = {
            iduser: req.body.iduser,
        };
        database.query(querysMySQL.del_user,[user.iduser],async function(err,result,fields){    
            if (result){
    
                res.status(200).send({status: "success", message: "El usuario fue eliminado con exito:", data: result});
            }else{
                res.status(200).send({msg:"Se produjo un error al eliminar usuario.", valid:false})
                return;
    
            }
        }); 

    }catch(e){
        res.status(400).send({status: "error", message: "Error al eliminar usuario", data: e});
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
        console.log(e)
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
