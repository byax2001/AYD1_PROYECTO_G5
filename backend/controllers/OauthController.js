const database = require("../managers/databaseManager");
const querysMySQL = require("../querys/querysMySQL");


exports.login = async function(req,res){
    try{
        //Primero debemos buscar al usuario mediante su username, 
        database.query(querysMySQL.list_users_byuser,[req.body.username],function(err,result,fields){
            if(result.length>0){
                //comparo la contraseña encriptada con la proporcionada por el usuario
                if(result[0].password == req.body.password){

                    var datausesr = {
                        nombre: result[0].nombre,
                        apellido: result[0].apellido,
                        email: result[0].email,
                        username: result[0].username,
                        rol: result[0].rol, 
                        telefono: result[0].telefono,
                        tipo_licencia: result[0].tipo_licencia,
                        nit: result[0].nit,
                        fecha_registro: result[0].fecha_registro
                    };

                    res.status(200).send({ message: "Bienvenido", data: datausesr,valid:true});    
                }else{
                    res.status(200).send({ message: "Credenciales incorrectas", data: datausesr, valid:false});    
                }

            }else{
                res.status(200).send({ message: "Credenciales incorrectas", data: datausesr, valid:false});    
            }

        });

    }catch(err){

    }
}
