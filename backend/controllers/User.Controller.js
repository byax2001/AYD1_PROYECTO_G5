


exports.newuser = async function (req,res){
    try{
        var user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };
        res.status(200).send({status: "success", message: "Usuario creado", data: user});
    }catch(e){
        res.status(400).send({status: "error", message: "Error al crear usuario", data: e});
    }
}


