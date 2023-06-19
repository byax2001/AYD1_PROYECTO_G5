const database = require("../managers/databaseManager");
const querysMySQL = require("../querys/querysMySQL");


exports.getInfoDep = async function (req, res) {
    try {
        database.query(querysMySQL.list_dep, [], async function (err, result, fields) {

            //Luego de ejecutar todos los querys se validan si fueron exitos
            if (result) {
                //devuelve los 5 resultados en un JSON
                res.status(200).send({ status: "success", message: "Estos son los departamentos:", data: result});
            } else {
                res.status(200).send({ msg: "Se produjo un error al obtener los departamentos.", valid: false })
                return;

            }


        });

    } catch (e) {
        res.status(400).send({ status: "error", message: "Error al obtener informacion de usuarios", data: e });
    }
}



exports.getInfoMun = async function (req, res) {
    try {
        database.query(querysMySQL.list_municipios, [req.params.id], async function (err, result, fields) {
            if (err)throw err;
            //Luego de ejecutar todos los querys se validan si fueron exitos
            if (result) {
                //devuelve los 5 resultados en un JSON
                res.status(200).send({ status: "success", message: "Estos son los municipios:", data: result});
            } else {

                res.status(200).send({ msg: "Se produjo un error al obtener los municipios.", valid: false })
                return;

            }


        });

    } catch (e) {
        
        res.status(400).send({ status: "error", message: "Error al obtener informacion de usuarios", data: e });
    }
}