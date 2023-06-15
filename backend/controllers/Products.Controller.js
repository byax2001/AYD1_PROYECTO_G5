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


exports.newproduct = async function(req,res){
    try{
        var producto = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            tipo: req.body.tipo,
            empresa: req.body.empresa,
            combo: req.body.combo
        }

        //cargo la imagen en el bucket
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: randomImageName(),
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);
        const objectUrl = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;

        //Luego de agregar el subir la imagen al bucket, agrego el producto a la base de datos

        database.query(querysMySQL.ins_product,[producto.nombre,producto.descripcion,objectUrl,producto.precio,producto.tipo,producto.empresa,producto.combo],function(err,result,fields){
            //reviso si se agrego correctamente
            if(result.affectedRows>0){
                res.status(200).send({ message: "Producto registrado correctamente", valid:true}); 
                return
            }else{
                res.status(200).send({ message: "Hubo un error con el registro :C", valid:true}); 
                return
            }



        });
  
    }catch (e){
        console.log(e)
        res.status(400).send({status: "error", message: "Error al crear usuario", data: e});
    }

}


exports.getproducts = async function(req,res){
    try{
        database.query(querysMySQL.list_all_products,[],async function(err,result,fields){    
            if (result){
    
                res.status(200).send({status: "success", message: "Estos son los productos:", data: result});
            }else{
                res.status(200).send({msg:"Se produjo un error al obtener los productos.", valid:false})
                return;
    
            }
        }); 

    }catch(e){
        res.status(400).send({status: "error", message: "Error al obtener productos", data: e});
    }

}

// exports.newProduct = async function(req,res){
//     try{
//         res.status(200).send({ message: "Bienvenido",valid:true});  
//     }catch (e){
//         console.log(e)
//         res.status(400).send({status: "error", message: "Error al crear usuario", data: e});
//     }

// }

exports.deleteProduct = async function(req,res){
    try{
        database.query(querysMySQL.del_product,[req.body.idproduct],function(err,result,fields){
            if (result.affectedRows>0){

                res.status(200).send({status: "success", message: "El producto fue eliminado con exito:"});
            }else{
                res.status(200).send({msg:"Se produjo un error al eliminar el producto.", valid:false})
                return;
    
            }
        });

    }catch (e){
        console.log(e)
        res.status(400).send({status: "error", message: "Error al crear eliminar producto", data: e});
    }

}
