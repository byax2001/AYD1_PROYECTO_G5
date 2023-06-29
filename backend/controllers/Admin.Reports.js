const database = require("../managers/databaseManager");
const querysMySQL = require("../querys/querysMySQL");


exports.getInfoUser = async function (req, res) {
    try {
        database.query(querysMySQL.list_all_users_rep, [], async function (err, result, fields) {

            database.query(querysMySQL.total_users, [], async function (err, result1, fields) {
                database.query(querysMySQL.total_users_byday, [], async function (err, result2, fields) {
                    database.query(querysMySQL.total_users_bymonth, [], async function (err, result3, fields) {
                        database.query(querysMySQL.total_users_byyear, [], async function (err, result4, fields) {

                            database.query(querysMySQL.total_req_accept, [], async function (err, result5, fields) {
                                database.query(querysMySQL.total_req_deny, [], async function (err, result6, fields) {
                                    //Luego de ejecutar todos los querys se validan si fueron exitos
                                    if (result && result2 && result3 && result4 && result5 && result6) {
                                        //devuelve los 5 resultados en un JSON
                                        res.status(200).send({ status: "success", message: "Estos son los usuarios:", data: result, total: result1, regDia: result2, regMonth: result3, regYear: result4, totalAprob: result5, totalDeny: result6 });
                                    } else {
                                        res.status(200).send({ msg: "Se produjo un error al obtener usuarios.", valid: false })
                                        return;

                                    }
                                });

                            });
                        });

                    });

                });

            });

        });

    } catch (e) {
        res.status(400).send({ status: "error", message: "Error al obtener informacion de usuarios", data: e });
    }
}


exports.getPopularRestaurants = async function (req, res) {
    try {
        
        database.query(querysMySQL.get_most_selled_product,[req.params.id],async function(err,result,fields){
            if (err)throw err;
            if (result.length>0){
                res.status(200).send({msg:"Este es el producto más vendido", valid:true, data:result})
                return;

        }else{
            res.status(200).send({msg:"Aún no hay productos vendidos", valid:true, data:result})
            return;
        };
    });

    } catch (e) {
        console.log(e)
        res.status(400).send({ status: "error", message: "Error al obtener informacion de usuarios", data: e });
    }
}

exports.getTop5Restaurants = async function (req, res) {
    try {
        
        database.query(querysMySQL.get_top5_restaurants,[],async function(err,result,fields){
            if (err)throw err;
            if (result.length>0){
                res.status(200).send({msg:"Este es el top5 de restaurantes", valid:true, data:result})
                return;

        }else{
            res.status(200).send({msg:"Aún no hay productos vendidos para obtener el top5", valid:true, data:result})
            return;
        };
    });

    } catch (e) {
        console.log(e)
        res.status(400).send({ status: "error", message: "Error al obtener informacion de usuarios", data: e });
    }
}

exports.getTop5delivers = async function (req, res) {
    try {
        
        database.query(querysMySQL.get_top5_delivers,[],async function(err,result,fields){
            if (err)throw err;
            if (result.length>0){
                res.status(200).send({msg:"Este es el top5 de repartidores", valid:true, data:result})
                return;

        }else{
            res.status(200).send({msg:"Aún no hay ordenes entregadas :c", valid:true, data:result})
            return;
        };
    });

    } catch (e) {
        console.log(e)
        res.status(400).send({ status: "error", message: "Error al obtener informacion de usuarios", data: e });
    }
}


exports.getTop5Restaurants2 = async function (req, res) {
    try {
        
        database.query(querysMySQL.get_top5_restaurants2,[],async function(err,result,fields){
            if (err)throw err;
            if (result.length>0){
                res.status(200).send({msg:"Este es el top5 de restaurantes", valid:true, data:result})
                return;

        }else{
            res.status(200).send({msg:"Aún no hay productos vendidos para obtener el top5", valid:true, data:result})
            return;
        };
    });

    } catch (e) {
        console.log(e)
        res.status(400).send({ status: "error", message: "Error al obtener informacion de usuarios", data: e });
    }
}