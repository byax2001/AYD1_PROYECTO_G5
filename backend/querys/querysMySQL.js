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
		list_tipoprod: "SELECT * FROM tipo_producto",

		//Products
		list_all_products_by_type :"SELECT * FROM producto WHERE tipo_producto_id_tipo_producto = ?", 
		list_all_products_by_rest :`SELECT p.id_producto ,p.nombre_producto , p.descripcion_producto ,p.imagen_producto ,p.precio_producto, tp.nombre_tipo_prod ,p.empresa_id_empresa ,
		tp.id_tipo_producto as tipo_producto,
		CASE WHEN p.combo = 0 THEN 'NO' ELSE 'SI' 
		END AS combo
		FROM producto p inner join tipo_producto tp  on p.tipo_producto_id_tipo_producto = tp.id_tipo_producto  WHERE p.empresa_id_empresa = ?`, 
		 
		//Restaurant
		list_restaurant_byemail:"SELECT * FROM empresa WHERE email = ?",
		list_tipoempresa: "SELECT * FROM tipo_empresa",
        
		//Reports
		list_all_users_rep: `select id_usuario,nombre,apellido,email,username,password,
		CASE WHEN rol=0 THEN 'ADMIN'
		WHEN rol = 1 THEN 'CLIENTE'
		WHEN rol=2 THEN 'REPARTIDOR'
		WHEN rol =3 THEN 'EMPRESA'
		END AS rol,
		telefono, tipo_licencia,nit,fecha_registro 
		from usuario`,
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

		total_req_accept: `SELECT COUNT(*) AS Aprobadas 
							 FROM solicitud_pendiente 
							 WHERE aprobada = 1`,

		total_req_deny: `SELECT COUNT(*) AS Denegadas 
						 FROM solicitud_pendiente 
						 WHERE aprobada = 2`,

		//Solicitudes pendientes
		req_pending_restaurant:`SELECT s.id_solicitud_repartidor,s.fecha_solicitud, s.nombre, s.apellido, s.email, s.nit, 
		CASE WHEN s.medio_transporte = 0 THEN 'NO' ELSE 'SI'  END AS medio_transporte,
		s.usuario_id_usuario, s.descripcion_empresa, s.username, s.password, te.nombre_tipo,
		m.nombre_municipio, s.tipo_licencia ,
		CASE WHEN s.aprobada = 0 THEN 'PENDIENTE' 
			WHEN s.aprobada = 1 THEN 'APROBADA'
		ELSE 'DENEGADA'  END AS aprobada ,
		s.telefono,s.direccion,
		ds.documento
		FROM solicitud_pendiente s left join tipo_empresa te on s.tipo_empresa = te.id_tipo 
		inner join municipio m on s.municipio_id_municipio = m.id_municipio
		inner join documento_solicitud ds on s.id_solicitud_repartidor = ds.solicitud_pendiente_id_solicitud_repartidor
		where s.descripcion_empresa is not null AND s.descripcion_empresa != ''
		and s.aprobada = 0` ,

		req_pending_delivers:`SELECT s.id_solicitud_repartidor,s.fecha_solicitud, s.nombre, s.apellido, s.email, s.nit, 
		CASE WHEN s.medio_transporte = 0 THEN 'NO' ELSE 'SI'  END AS medio_transporte,
		s.usuario_id_usuario, s.descripcion_empresa, s.username, s.password, te.nombre_tipo,
		m.nombre_municipio, s.tipo_licencia ,
		CASE WHEN s.aprobada = 0 THEN 'PENDIENTE' 
			WHEN s.aprobada = 1 THEN 'APROBADA'
		ELSE 'DENEGADA'  END AS aprobada , 
		s.telefono,s.direccion,
		ds.documento
		FROM solicitud_pendiente s left join tipo_empresa te on s.tipo_empresa = te.id_tipo 
		inner join municipio m on s.municipio_id_municipio = m.id_municipio
		inner join documento_solicitud ds on s.id_solicitud_repartidor = ds.solicitud_pendiente_id_solicitud_repartidor
		where s.aprobada = 0 and s.descripcion_empresa is null OR s.descripcion_empresa = '' `,

		//Municipios
		list_municipios: "SELECT m.id_municipio,m.nombre_municipio , d.* FROM municipio m inner join departamento d  on m.departamento_id_departamento = d.id_departamento WHERE m.departamento_id_departamento = ?",
		list_dep: "SELECT * FROM departamento",

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
				   "(fecha_solicitud,nombre,apellido,email,nit,medio_transporte,usuario_id_usuario,descripcion_empresa,username,password,tipo_empresa,municipio_id_municipio,tipo_licencia,aprobada,telefono,direccion) "+
				   "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
				   
		ins_sol_image: "INSERT INTO documento_solicitud "+ 
		" (descripcion, documento,solicitud_pendiente_id_solicitud_repartidor ) "+
		" VALUES (?,?,?);",

		ins_product: "INSERT INTO producto "+ 
		" (nombre_producto, descripcion_producto,imagen_producto,precio_producto,tipo_producto_id_tipo_producto,empresa_id_empresa,combo)"+
		" VALUES (?,?,?,?,?,?,?);",


		ins_empre: "INSERT INTO empresa "+ 
		" (nombre, descripcion_empresa,email,tipo_empresa_id_tipo,telefono)"+
		" VALUES (?,?,?,?,?);",

		ins_address: "INSERT INTO direccion "+
		" (direccion, descripcion_direccion, usuario_id_usuario,municipio_id_municipio)"+
		" VALUES (?,?,?,?);",

    /* ----------------------------------------------------------------------- */
	/* ------------------------------ DELETE  -------------------------------- */
	/* ----------------------------------------------------------------------- */
    	del_user: "DELETE FROM usuario WHERE id_usuario=?",
		del_restaurant: "DELETE FROM empresa WHERE id_empresa=?",
		del_product: "DELETE FROM producto WHERE id_producto=?",
		

}