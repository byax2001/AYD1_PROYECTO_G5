
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3") ;
const crypto = require('crypto');
require('dotenv').config();

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');



const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
    accessKeyId: accessKey, 
    secretAccessKey: secretAccessKey,  
    region: bucketRegion     
});



exports.newdeliveruser = async function (req,res){
    try{
        const params = {
            Bucket: bucketName,
            Key: randomImageName(),
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }

        const command = new PutObjectCommand(params)

        await s3.send(command)
        const objectUrl = `https://${bucketName}.s3.amazonaws.com/${params.Key}`;
        res.status(200).send({status: "success", message: "Repartidor creado", objectUrl: objectUrl});
    }catch(e){
        console.log(e)
        res.status(400).send({status: "error", message: "Error al crear repartidor", data: e});
    }
}


exports.getdeliveruser = async function (req,res){
    try{
        const params = {
            Bucket: bucketName,
            Key: randomImageName(),
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }

        const command = new PutObjectCommand(params)

        await s3.send(command)
        const objectUrl = `https://${bucketName}.s3.amazonaws.com/${params.Key}`;

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
            Bucket: bucketName,
            Key: randomImageName(),
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }

        const command = new PutObjectCommand(params)

        await s3.send(command)
        const objectUrl = `https://${bucketName}.s3.amazonaws.com/${params.Key}`;

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
            Bucket: bucketName,
            Key: randomImageName(),
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }

        const command = new PutObjectCommand(params)

        await s3.send(command)
        const objectUrl = `https://${bucketName}.s3.amazonaws.com/${params.Key}`;

        //Aca irá la parte de guardar en la base de datos
        res.status(200).send({status: "success", message: "Repartidor eliminado", objectUrl: objectUrl});
    }catch(e){
        console.log(e)
        res.status(400).send({status: "error", message: "Error al crear repartidor", data: e});
    }
}

