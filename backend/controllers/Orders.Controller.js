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
                    database.query(querysMySQL.ins_order_detail, [cantidad, id_producto, tipo_producto_id_tipo_producto, result.insertId], function(err) {
                        if (err) throw err;             
                    });
                    });
                    //Si hay cupon debo guardarlo, si no, no hago nada
                    if(usecupon){
                        database.query(querysMySQL.ins_cupon_user, [1,usecupon,req.body.idUser], function(err) {
                            if (err) throw err;             
                        });
                    }

                    res.status(200).send({ message: "Orden ingresada con exito", valid:true});
                    return
                }else{
    
                    res.status(200).send({ message: "Hubo un error al crear la orden", valid:false});
                    return
                }
    
            });
        

        });
        
    
    }catch (e){
        res.status(400).send({status: "error", message: "Error al crear usuario", data: e});
    }

}


exports.getorderbyadress = async function(req,res){
    try{

        database.query(querysMySQL.get_orders_availabe_by_adrress,[req.params.id],async function(err,result,fields){
            if (err)throw err;
            if (result.length>0){
                res.status(200).send({msg:"Estas son las ordenes disponibles en esa area", valid:true, data:result})
                return;

        }else{
            res.status(200).send({msg:"No hay ordenes por el momento", valid:true, data:result})
            return;
        };
    });
    
    }catch (e){
        //res.status(400).send({status: "error", message: "Error al obtener ordenes por departamento", data: e});
    }

}

exports.changestatusorder = async function(req,res){
    try{
        //Primero debo revisar que el usuario qeu quiere seleccionar el pedido no tenga otro pedido seleccionado

        database.query(querysMySQL.get_order_select_by_deliver,[req.body.idUser],async function(err,result,fields){
            if (err)throw err;
            if (result.length>0){
                res.status(200).send({msg:"Ya tienes un pedido seleccionado, solo se puede uno por repartidor", valid:false})
                return;

            }else{
                database.query(querysMySQL.update_status_order,[req.body.idUser,req.body.estado,req.body.idpedido],async function(err,result,fields){
                    if (err)throw err;
                    if (result.affectedRows>0){
                        res.status(200).send({msg:"Has seleccionado una orden correctamente", valid:true})
                        return;
        
                    }else{
                        //res.status(200).send({msg:"Error al selecionar :c ", valid:false})
                        // return;
                    };
            });
            };


        });
    
    }catch{
       // res.status(400).send({status: "error", message: "Error al obtener ordenes por departamento", data: e});
    }

}


exports.getactiveorder = async function(req,res){
    try{

        database.query(querysMySQL.get_order_select_by_deliver,[req.params.id],async function(err,result,fields){
            if (err)throw err;
            if (result.length>0){
                res.status(200).send({msg:"Esta es la orden activa", valid:true, data:result})
                return;

        }else{
            // res.status(200).send({msg:"No hay ordenactiva por el momento", valid:true, data:result})
            // return;
        };
    });
    
    }catch (e){
        // res.status(400).send({status: "error", message: "Error al obtener ordenes por departamento", data: e});
    }

}


exports.getallordersbydeliver = async function(req,res){
    try{

        database.query(querysMySQL.get_orders_by_deliver,[req.params.id],async function(err,result,fields){
            if (err)throw err;
            if (result.length>0){
                res.status(200).send({msg:"Estas son todas las ordenes del repartidor", valid:true, data:result})
                return;

        }else{
            res.status(200).send({msg:"No tiene ninguna orden ", valid:true, data:result})
            return;
        };
    });
    
    }catch (e){
        // res.status(400).send({status: "error", message: "Error al obtener ordenes por departamento", data: e});
    }

}


exports.rateOrder = async function(req,res){
    try{

        database.query(querysMySQL.rate_order,[req.body.calificacion,req.body.idOrder],async function(err,result,fields){
            if (err)throw err;
            if (result.affectedRows>0){
                res.status(200).send({msg:"Has calificado la orden" , valid:true})
                return;

        }else{
            // res.status(200).send({msg:"error al calificar orden ", valid:true, data:result})
            // return;
        };
    });
    
    }catch (e){
        // res.status(400).send({status: "error", message: "Error al calificar ordenes", data: e});
    }

}


exports.cancelorder = async function(req,res){
    try{
     
        database.query(querysMySQL.update_status_order_cancel,[req.body.idUser,req.body.idpedido],async function(err,result,fields){
            //if (err)throw err;
            if (result.affectedRows>0){
                res.status(200).send({message:"Se ha cancelado la orden ", valid:true})
                return;

            }else{
                // res.status(200).send({message:"Error al cancelar la orden :c ", valid:false})
                // return;
            };
        });
            
    }catch (e){
        //res.status(400).send({status: "error", message: "Error al cancelar la orden", data: e});
    }

}


exports.deliverorder = async function(req,res){
    try{
      
        database.query(querysMySQL.update_status_order_delivered,[req.body.idUser,req.body.idpedido],async function(err,result,fields){
            //if (err)throw err;
            if (result.affectedRows>0){
                res.status(200).send({message:"Se ha entregado la orden ", valid:true})
                return;

            }else{
                // res.status(200).send({message:"Error al entregar la orden :c ", valid:false})
                // return;
            };
        });
            
    }catch (e){
        //res.status(400).send({status: "error", message: "Error al entregar la orden", data: e});
    }

}


exports.getordersbyuser = async function(req,res){
    try{

        database.query(querysMySQL.get_orders_by_user,[req.params.id],async function(err,result,fields){
            //if (err)throw err;
            if (result.length>0){
                res.status(200).send({msg:"Estas son las ordenes del usuario", valid:true, data:result})
                return;

        }else{
            res.status(200).send({msg:"No hay ordenes por el momento", valid:true, data:result})
            return;
        };
    });
    
    }catch (e){
        //res.status(400).send({status: "error", message: "Error al obtener ordenes por usuario", data: e});
    }

}


exports.getordersbyuserglobally = async function(req,res){
    try{

        database.query(querysMySQL.get_orders_globally,[],async function(err,result,fields){
            if (err)throw err;
            if (result.length>0){
                res.status(200).send({msg:"Estas son las ordenes", valid:true, data:result})
                return;

        }else{
            res.status(200).send({msg:"No hay ordenes por el momento", valid:true, data:result})
            return;
        };
    });
    
    }catch (e){
       // res.status(400).send({status: "error", message: "Error al obtener ordenes por usuario", data: e});
    }

}