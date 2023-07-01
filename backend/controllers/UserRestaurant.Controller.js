const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3") ;
const querysMySQL = require("../querys/querysMySQL");
const database = require("../managers/databaseManager");
const crypto = require('crypto');
require('dotenv').config();


const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const s3 = new S3Client({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  
    region: process.env.BUCKET_REGION     
});

exports.newrestaurant = async function (req,res){
    try{

        
        var currentDate = new Date();

        var user = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            nit: req.body.nit,
            medio_transporte: req.body.medio_transporte,
            userid: req.body.userid,
            descripcion: req.body.descripcion,
            username: req.body.username,
            password: req.body.password,
            tipo_empresa: req.body.tipo_empresa,
            municipio: req.body.municipio,
            tipo_licencia: req.body.tipo_licencia,
            direccion: req.body.direccion,
            telefono: req.body.telefono
            
        };

        //Primero hago la validación que no exista el correo
        database.query(querysMySQL.list_users_byemail,[user.email],async function(err,result,fields){    
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
                        database.query(querysMySQL.ins_sol, [currentDate,user.nombre, user.apellido,user.email,user.nit,user.medio_transporte,user.userid,user.descripcion,user.username,user.password,user.tipo_empresa,user.municipio,user.tipo_licencia,0,user.telefono,user.direccion],async function(err,result,fields){
                            if(result.insertId){
                                const params = {
                                    Bucket: process.env.BUCKET_NAME,
                                    Key: randomImageName(),
                                    Body: req.file.buffer,
                                    ContentType: req.file.mimetype,
                                }
                        
                                const command = new PutObjectCommand(params)
                        
                                await s3.send(command)
                                const objectUrl = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;

                                //Si todo bien con el S3 guardo la imagen en la base de datos
                                database.query(querysMySQL.ins_sol_image, [user.descripcion,objectUrl,result.insertId],async function(err,result2,fields){
                                    if (err)throw err;
                                    //Si todo pasó correctamente, envio el correo
                                    
                                    res.status(200).send({status: "success", message: "Solicitud creada con exito"});
                                });  



                            }else{
                                res.status(200).send({msg:"Hubo un error al crear la solicitud", valid:false})
                            }
                        });        
                        
                    }
                });
            }
        });       
        
    }catch(e){
        res.status(400).send({status: "error", message: "Error al crear usuario", data: e});
    }
}



// exports.deleterestaurant = async function (req,res){
//     try{
//         var user = {
//             idrestaurant: req.body.iduser,
//         };
//         database.query(querysMySQL.del_restaurant,[user.idrestaurant],async function(err,result,fields){    
//             if (result){
    
//                 res.status(200).send({status: "success", message: "El restaurante fue eliminado con exito:", data: result});
//             }else{
//                 res.status(200).send({msg:"Se produjo un error al eliminar restaurante.", valid:false})
//                 return;
    
//             }
//         }); 

//     }catch(e){
//         res.status(400).send({status: "error", message: "Error al eliminar restaurante", data: e});
//     }
// }

// exports.updaterestaurant = async function (req,res){
//     try{
//         var user = {
//             nombre: req.body.nombre,
//             descripcion: req.body.descripcion,
//             email: req.body.email,
//             tipo_empresa_id_tipo: req.body.tipo_empresa_id_tipo,
//             telefono: req.body.telefono,
//             iduser: req.body.iduser
//         };
//         database.query(querysMySQL.update_datosuser,[user.nombre,user.apellido,user.password,user.rol,user.telefono,user.tipo_licencia,user.nit,user.iduser],function(err,result,fields){    
//             if (err)throw err;
                
//             res.status(200).send({status: "success", message: "Restaurante actualizado con exito"});
//         })

//     }catch(e){
//         res.status(400).send({status: "error", message: "Error al modificar restaurante", data: e});
//     }
// }

exports.getrestaurant = async function (req,res){
    try{
        database.query(querysMySQL.list_all_empresas,[],async function(err,result,fields){    
            if (result){
    
                res.status(200).send({status: "success", message: "Estos son los restaurantes:", data: result});
            }else{
                // res.status(200).send({msg:"Se produjo un error al obtener restaurantes.", valid:false})
                // return;
    
            }
        }); 

    }catch(e){
        //res.status(400).send({status: "error", message: "Error al crear restaurante", data: e});
    }
      
}

exports.getrestauranttype = async function (req,res){
    try{
        database.query(querysMySQL.list_tipoempresa,[],async function(err,result,fields){    
            if (result){
    
                res.status(200).send({status: "success", message: "Estos son los tipos de empresa:", data: result});
            }else{
                // res.status(200).send({msg:"Se produjo un error al obtener restaurantes.", valid:false})
                // return;
    
            }
        }); 

    }catch(e){
        //res.status(400).send({status: "error", message: "Error al crear restaurante", data: e});
    }
      
}




