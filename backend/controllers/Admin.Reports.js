const database = require("../managers/databaseManager");
const querysMySQL = require("../querys/querysMySQL");


exports.getInfoUser = async function (req, res) {
    try {
        database.query(querysMySQL.list_all_users, [], async function (err, result, fields) {

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