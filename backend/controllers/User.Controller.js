const { enviarEmailUser } = require("../managers/emailManager");

exports.newuser = async function (req,res){
    try{
        console.log(req)
        var user = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password

        };

        enviarEmailUser("osmarsantizo@gmail.com","Bienvenido","osmarp12")

        //Aca irá la parte de guardar en la base de datos
        
        res.status(200).send({status: "success", message: "Usuario creado", data: user});
    }catch(e){
        console.log(e)
        res.status(400).send({status: "error", message: "Error al crear usuario", data: e});
    }
}



exports.deleteuser = async function (req,res){
    try{
        var user = {
            name: req.body.name,
        };

        //Aca irá la parte de guardar en la base de datos
        res.status(200).send({status: "success", message: "Usuario borrado", data: user});
    }catch(e){
        res.status(400).send({status: "error", message: "Error al crear usuario", data: e});
    }
}

exports.updateuser = async function (req,res){
    try{
        var user = {
            name: req.body.name,
        };

        //Aca irá la parte de guardar en la base de datos
        res.status(200).send({status: "success", message: "Usuario modificado", data: user});
    }catch(e){
        res.status(400).send({status: "error", message: "Error al crear usuario", data: e});
    }
}

exports.getuser = async function (req,res){
    try{
        var user = {
            name: req.body.name,
        };

        //Aca irá la parte de guardar en la base de datos
        res.status(200).send({status: "success", message: "Informacion del usuario", data: user});
    }catch(e){
        res.status(400).send({status: "error", message: "Error al crear usuario", data: e});
    }
}

