
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3") ;
const database = require("../managers/databaseManager");
const querysMySQL = require("../querys/querysMySQL");
const crypto = require('crypto');
require('dotenv').config();

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const s3 = new S3Client({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  
    region: process.env.BUCKET_REGION     
});



exports.newdeliveruser = async function (req,res){
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
            tipo_licencia: req.body.tipo_licencia
        };
         //Encripto la contraseña
         let passwordEncrypt = crypto.createHash('md5').update(user.password).digest("hex");

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
                        database.query(querysMySQL.ins_sol, [currentDate,user.nombre, user.apellido,user.email,user.nit,user.medio_transporte,user.userid,user.descripcion,user.username,passwordEncrypt,user.tipo_empresa,user.municipio,user.tipo_licencia,0],async function(err,result,fields){
                            
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
        console.log(e)
        res.status(400).send({status: "error", message: "Error al crear usuario", data: e});
    }
}


exports.getdeliveruser = async function (req,res){
    try{
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: randomImageName(),
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }

        const command = new PutObjectCommand(params)

        await s3.send(command)
        const objectUrl = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;

        //Aca irá la parte de guardar en la base de datos
        res.status(200).send({status: "success", message: "Datos del repartidor", objectUrl: objectUrl});
    }catch(e){
        console.log(e)
        res.status(400).send({status: "error", message: "Error al crear repartidor", data: e});
    }
}

exports.updatedeliveruser = async function (req,res){
    try{
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: randomImageName(),
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }

        const command = new PutObjectCommand(params)

        await s3.send(command)
        const objectUrl = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;

        //Aca irá la parte de guardar en la base de datos
        res.status(200).send({status: "success", message: "Repartidor modificado", objectUrl: objectUrl});
    }catch(e){
        console.log(e)
        res.status(400).send({status: "error", message: "Error al crear repartidor", data: e});
    }
}

exports.deletedeliveruser = async function (req,res){
    try{
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: randomImageName(),
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }

        const command = new PutObjectCommand(params)

        await s3.send(command)
        const objectUrl = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;

        //Aca irá la parte de guardar en la base de datos
        res.status(200).send({status: "success", message: "Repartidor eliminado", objectUrl: objectUrl});
    }catch(e){
        console.log(e)
        res.status(400).send({status: "error", message: "Error al crear repartidor", data: e});
    }
}

