const database = require("../managers/databaseManager");
const querysMySQL = require("../querys/querysMySQL");



exports.neworder = async function(req,res){
    try{
        var usecupon = false;
        var currentDate = new Date();
        //Primero debemos validar si trae cupón
        if(req.body.cupon){
            //Si trae cupón debemos validar si ese usuario no ha utilizado ese cupón
            usecupon = await new Promise((resolve, reject) => {
                //Primero obtengo el id del cupon para ver si es valido
                database.query(querysMySQL.get_id_cupon_by_name, [req.body.cupon], function(err, result, fields) {
                    if (err) {
                        reject(err);
                        } else {
                            if (result.length>0){
                                //Si el cupon es valido revisamos que no lo haya utilizado.
                                database.query(querysMySQL.list_used_cupon_by_user, [req.body.idUser,result[0].id_cupon], function(err, result2, fields) {
                                    if(result2.length>0){
                                        res.status(200).send({ message: "El cupon ingresado ya fue utilizado", valid:false});
                                        return
                                    }else{

                                        resolve([result[0].id_cupon]);
                                        return
                                    }
                                });

                            }else{
                                res.status(200).send({ message: "El cupon ingresado no es valido", valid:false});
                                return
                            }

                        }
                });

            });
        }

        //SI todo con el cupón está bien (si trae), procedemos a crear la orden
        insorder = await new Promise((resolve, reject) => {
            database.query(querysMySQL.ins_order, [currentDate,null,0,null,req.body.idUser,1,null,usecupon? usecupon:null], function(err, result, fields) {
            
                if (err)throw err;
                if(result.affectedRows>0){
                    console.log(result.insertId)
                    // Obtener la lista de productos del body
                    const productos = req.body.productos;
    
                    // Iterar sobre cada producto
                    productos.forEach(function(producto) {
                    const {
                        id_producto,
                        nombre_producto,
                        precio_producto,
                        tipo_producto_id_tipo_producto,
                        empresa_id_empresa,
                        combo,
                        cantidad
                    } = producto;
                    database.query(querysMySQL.ins_order_detail, [cantidad, id_producto, tipo_producto_id_tipo_producto, result.insertId], function(err, result, fields) {
                        if (err) throw err;             
                    });
                    });

                    res.status(200).send({ message: "Orden ingresada con exito", valid:true});
                    return
                }else{
    
                    res.status(200).send({ message: "Hubo un error al crear la orden", valid:false});
                    return
                }
    
            });
        

        });

        console.log(insorder)
        
    
    }catch (e){
        console.log(e)
        res.status(400).send({status: "error", message: "Error al crear usuario", data: e});
    }

}



