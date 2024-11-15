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

//Crear producto
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
        res.status(400).send({status: "error", message: "Error al crear usuario", data: e});
    }

}

//Obtener productos
exports.getproducts = async function(req,res){
    try{
        database.query(querysMySQL.list_all_products,[],async function(err,result,fields){    
            if (result){
    
                res.status(200).send({status: "success", message: "Estos son los productos:", data: result});
            }else{
                // res.status(200).send({msg:"Se produjo un error al obtener los productos.", valid:false})
                // return;
    
            }
        }); 

    }catch(e){
        //res.status(400).send({status: "error", message: "Error al obtener productos", data: e});
    }

}

// exports.newProduct = async function(req,res){
//     try{
//         res.status(200).send({ message: "Bienvenido",valid:true});  
//     }catch (e){
//         res.status(400).send({status: "error", message: "Error al crear usuario", data: e});
//     }

// }

exports.updateproduct = async function(req,res){
    try{

        var productoedit = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            tipo: req.body.tipo,
            combo: req.body.combo,
            imagenold: req.body.imagenold
        }
        ///Reviso si me mandan una imagen, es porque va a cambiar la imagen
        if(req.file != undefined){
            //Entonces se debe subir la imagen al bucket
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: randomImageName(),
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            };
    
            const command = new PutObjectCommand(params);
            await s3.send(command);
            const objectUrl = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;
            database.query(querysMySQL.update_product,[productoedit.nombre,productoedit.descripcion,objectUrl,productoedit.precio,productoedit.tipo,productoedit.combo,req.body.idproduct],function(err,result,fields){
                if(result.affectedRows>0){
                    res.status(200).send({status: "success", message: "El producto se actualizó con éxito:", valid:true});
                }else{
                    res.status(200).send({status: "success", message: "El producto se actualizó con éxito:",valid:false});
                }
                
            });

        }else{
            database.query(querysMySQL.update_product,[productoedit.nombre,productoedit.descripcion,productoedit.imagenold,productoedit.precio,productoedit.tipo,productoedit.combo,req.body.idproduct],function(err,result,fields){
                if(result.affectedRows>0){
                    res.status(200).send({status: "success", message: "El producto se actualizó con éxito:", valid:true});
                }else{
                    res.status(200).send({status: "success", message: "El producto se actualizó con éxito:",valid:false});
                }
            });
        }
        

    }catch (e){
        res.status(400).send({status: "error", message: "Error al crear eliminar producto", data: e});
    }
}    


//Eliminar Producto
exports.deleteproduct = async function(req,res){
    try{
        database.query(querysMySQL.del_product,[req.params.id],function(err,result,fields){
            if (result.affectedRows>0){

                res.status(200).send({status: "success", message: "El producto fue eliminado con exito:"});
            }else{
                res.status(200).send({msg:"Se produjo un error al eliminar el producto.", valid:false})
                return;
    
            }
        });

    }catch (e){
        //res.status(400).send({status: "error", message: "Error al crear eliminar producto", data: e});
    }
}


//Obtener productos por tipo
exports.getproductsbytype = async function(req,res){
    try{
        database.query(querysMySQL.list_all_products_by_type,[req.params.id],async function(err,result,fields){    
            if (result){
    
                res.status(200).send({status: "success", message: "Estos son los productos en esta categoria:", data: result});
            }else{
                // res.status(200).send({msg:"Se produjo un error al obtener los productos de esa categoria.", valid:false})
                // return;
    
            }
        }); 

    }catch(e){
        //res.status(400).send({status: "error", message: "Error al obtener productos por categoria", data: e});
    }

}

//Obtener productos por empresa
exports.getproductsbyrestaurant = async function(req,res){
    try{
        database.query(querysMySQL.list_all_products_by_rest,[req.params.id],async function(err,result,fields){    
            if (result){
    
                res.status(200).send({status: "success", message: "Estos son los productos de esta empresa:", data: result});
            }else{
                // res.status(200).send({msg:"Se produjo un error al obtener los productos de esa empresa.", valid:false})
                // return;
    
            }
        }); 

    }catch(e){
        //res.status(400).send({status: "error", message: "Error al obtener productos por empresa", data: e});
    }

}


//Obtener tipos producto
exports.gettyproducts = async function(req,res){
    try{
        database.query(querysMySQL.list_tipoprod,[],async function(err,result,fields){    
            if (result){
                
                res.status(200).send({status: "success", message: "Estos son los tipos de producto:", data: result});
            }else{
                // res.status(200).send({msg:"Se produjo un error al obtener los productos de esa categoria.", valid:false})
                // return;
    
            }
        }); 

    }catch(e){
        //res.status(400).send({status: "error", message: "Error al obtener productos por categoria", data: e});
    }

}


