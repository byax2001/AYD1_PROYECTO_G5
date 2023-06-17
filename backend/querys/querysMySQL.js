module.exports = {
    /* ----------------------------------------------------------------------- */
	/* ------------------------------ SELECTS -------------------------------- */
	/* ----------------------------------------------------------------------- */
		//Users
		list_all_users: "SELECT * FROM usuario",
		list_all_empresas:"SELECT * FROM empresa",
		list_all_products:"SELECT * FROM producto",
		list_users_byuser:"SELECT * FROM usuario WHERE username = ?",
		list_users_byemail:"SELECT * FROM usuario WHERE email = ?",
		list_user_byid:"SELECT * FROM usuario WHERE id_usuario = ?",

		list_emp_request: "SELECT * FROM solicitud_pendiente WHERE id_solicitud_repartidor = ?",

		//Products
		list_all_products_by_type :"SELECT * FROM producto WHERE tipo_producto_id_tipo_producto = ?", 
		list_all_products_by_rest :"SELECT * FROM producto WHERE empresa_id_empresa = ?", 

		
		//Restaurant
		list_restaurant_byemail:"SELECT * FROM empresa WHERE email = ?",
        
		//Reports
		total_users: "SELECT COUNT(*) AS TOTAL FROM usuario",
		total_users_byday: `SELECT AVG(tabla.cuenta) AS Promedio_Dia
							FROM (SELECT DAY(fecha_registro) AS fecha , COUNT(*) AS cuenta  
							FROM usuario GROUP BY fecha) tabla`,
		total_users_bymonth: `SELECT AVG(tabla.cuenta) as Promedio_Mes
							  FROM (SELECT MONTH(fecha_registro) AS fecha , COUNT(*) AS cuenta  
							  FROM usuario GROUP BY fecha) tabla`,
		total_users_byyear: `SELECT AVG(tabla.cuenta) AS Promedio_Year
							 FROM (select YEAR(fecha_registro) AS fecha , COUNT(*) AS cuenta  
							 FROM usuario GROUP BY fecha) tabla`,

    /* ----------------------------------------------------------------------- */
	/* ------------------------------ UPDATES -------------------------------- */
	/* ----------------------------------------------------------------------- */
		update_datosuser: "UPDATE usuario SET nombre=?,apellido=?, password=?, rol=?, telefono=?, tipo_licencia=?, nit=? WHERE id_usuario=?",
		update_restaurante: "UPDATE usuario SET nombre=?,descripcion_empresa=?, tipo_empresa_id_tipo=?, telefono=?, WHERE id_empresa=?",
		update_product: "UPDATE producto SET nombre_producto=?,descripcion_producto=?, imagen_producto=?, precio_producto=?,tipo_producto_id_tipo_producto=?,combo=? WHERE id_producto=?",
		
		update_pending_request: "UPDATE solicitud_pendiente SET aprobada=? WHERE id_solicitud_repartidor= ?",

    /* ----------------------------------------------------------------------- */
	/* ------------------------------ INSERTS -------------------------------- */
	/* ----------------------------------------------------------------------- */





		ins_user:"INSERT INTO usuario "+ 
					" (nombre, apellido, email, username, password,rol,telefono,tipo_licencia,nit,fecha_registro) "+
					" VALUES (?,?,?,?,?,?,?,?,?,?);",

		ins_sol:"INSERT INTO solicitud_pendiente "+
				   "(fecha_solicitud,nombre,apellido,email,nit,medio_transporte,usuario_id_usuario,descripcion_empresa,username,password,tipo_empresa,municipio_id_municipio,tipo_licencia,aprobada) "+
				   "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
				   
		ins_sol_image: "INSERT INTO documento_solicitud "+ 
		" (descripcion, documento,solicitud_pendiente_id_solicitud_repartidor ) "+
		" VALUES (?,?,?);",

		ins_product: "INSERT INTO producto "+ 
		" (nombre_producto, descripcion_producto,imagen_producto,precio_producto,tipo_producto_id_tipo_producto,empresa_id_empresa,combo)"+
		" VALUES (?,?,?,?,?,?,?);",


		ins_empre: "INSERT INTO empresa "+ 
		" (nombre, descripcion_empresa,email,tipo_empresa_id_tipo,telefono)"+
		" VALUES (?,?,?,?,?);",


    /* ----------------------------------------------------------------------- */
	/* ------------------------------ DELETE  -------------------------------- */
	/* ----------------------------------------------------------------------- */
    	del_user: "DELETE FROM usuario WHERE id_usuario=?",
		del_restaurant: "DELETE FROM empresa WHERE id_empresa=?",
		del_product: "DELETE FROM producto WHERE id_producto=?",
		

}