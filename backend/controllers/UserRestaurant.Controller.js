exports.newrestaurant = async function (req,res){
    try{
        console.log(req)
        var user = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password

        };

        //Aca irá la parte de guardar en la base de datos
        
        res.status(200).send({status: "success", message: "Restaurante creado", data: user});
    }catch(e){
        console.log(e)
        res.status(400).send({status: "error", message: "Error al crear restaurante", data: e});
    }
}



exports.deleterestaurant = async function (req,res){
    try{
        var user = {
            name: req.body.name,
        };

        //Aca irá la parte de guardar en la base de datos
        res.status(200).send({status: "success", message: "Restaurante borrado", data: user});
    }catch(e){
        res.status(400).send({status: "error", message: "Error al crear restaurante", data: e});
    }
}

exports.updaterestaurant = async function (req,res){
    try{
        var user = {
            name: req.body.name,
        };

        //Aca irá la parte de guardar en la base de datos
        res.status(200).send({status: "success", message: "Restaurante modificado", data: user});
    }catch(e){
        res.status(400).send({status: "error", message: "Error al crear restaurante", data: e});
    }
}

exports.getrestaurant = async function (req,res){
    try{
        var user = {
            name: req.body.name,
        };

        //Aca irá la parte de guardar en la base de datos
        res.status(200).send({status: "success", message: "Restaurante del usuario", data: user});
    }catch(e){
        res.status(400).send({status: "error", message: "Error al crear restaurante", data: e});
    }
}

