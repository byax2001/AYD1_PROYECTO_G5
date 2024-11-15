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
		telefono, tipo_licencia,nit,fecha_registro, 
		CASE WHEN  estado=0 THEN 'BANEADO'
		WHEN estado = 1 THEN 'ACTIVO'
		WHEN estado = 3 THEN 'MANTENIMIENTO'
		END AS estado
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

		get_sales_value: `select fecha_pedido,sum(precio_producto) as valor FROM 
		(
		select pc.id_pedido_cliente,pc.fecha_pedido, dpc.cantidad,dpc.producto_id_producto, p.precio_producto 
		from pedido_cliente pc , detalle_pedido_cliente dpc, producto p
		where fecha_pedido >= ?
		and pc.id_pedido_cliente = dpc.pedido_cliente_id_pedido_cliente 
		and dpc.producto_id_producto = p.id_producto 
		) tabla
		group by fecha_pedido`,
		

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

		req_pending_address_change:`SELECT s.id_solicitud_repartidor, s.fecha_solicitud ,u.nombre , u.apellido,  m2.nombre_municipio as municipioantiguo,  m.nombre_municipio  as municipionuevo, m.id_municipio as idmunicipio, d.direccion as direccionantigua, s.direccion  as direccionnueva FROM solicitud_pendiente s
		inner join municipio m on s.municipio_id_municipio  = m.id_municipio
		inner join usuario u on u.id_usuario = s.usuario_id_usuario
		inner join direccion d on u.id_usuario = d.usuario_id_usuario
		inner join municipio m2 ON d.municipio_id_municipio = m2.id_municipio
		WHERE s.usuario_id_usuario != 1 and s.aprobada = 0;`,

		//Municipios
		list_municipios: "SELECT m.id_municipio,m.nombre_municipio , d.* FROM municipio m inner join departamento d  on m.departamento_id_departamento = d.id_departamento WHERE m.departamento_id_departamento = ?",
		list_dep: "SELECT * FROM departamento",

		//Cupones
		list_used_cupon_by_user: "SELECT * FROM detalle_cupon_usuario WHERE usuario_id_usuario = ? AND cupon_id_cupon = ? AND utilizado = 1",
		get_id_cupon_by_name :"SELECT id_cupon FROM cupon WHERE codigo_cupon = ?",

		//Top5 Retaurantes populares

		//Producto más vendido
		get_most_selled_product: `SELECT p.id_producto , p.nombre_producto , SUM(dpc.cantidad) AS total_vendido , p.descripcion_producto , p.imagen_producto , p.precio_producto
		FROM detalle_pedido_cliente AS dpc
		JOIN producto AS p ON dpc.producto_id_producto = p.id_producto 
		WHERE p.empresa_id_empresa  = ?
		GROUP BY dpc.producto_id_producto 
		ORDER BY total_vendido DESC
		LIMIT 1;`,

		get_most_global_selled_product:`SELECT  p.id_producto, e.nombre, p.nombre_producto, SUM(dpc.cantidad) AS total_vendido, p.descripcion_producto, p.imagen_producto, p.precio_producto
		FROM detalle_pedido_cliente AS dpc
		JOIN producto AS p ON dpc.producto_id_producto = p.id_producto 
		JOIN empresa as e on p.empresa_id_empresa = e.id_empresa
		GROUP BY dpc.producto_id_producto 
		ORDER BY total_vendido DESC
		LIMIT 5;
		`,

		//Ordenes disponibles para entregar
		get_orders_availabe_by_adrress:`SELECT pc.id_pedido_cliente AS NoOrden, d.direccion, m.nombre_municipio  AS municipio, pc.fecha_pedido AS fecha, 
										CASE pc.metodo_pago
											WHEN 0 THEN 'Efectivo'
											WHEN 1 THEN 'Tarjeta'
											ELSE 'Desconocido'
										END AS metodo
										FROM pedido_cliente AS pc
										JOIN direccion AS d ON pc.usuario_id_usuario = d.usuario_id_usuario
										JOIN municipio AS m ON d.municipio_id_municipio = m.id_municipio
										WHERE d.municipio_id_municipio = (SELECT municipio_id_municipio FROM direccion WHERE usuario_id_usuario =?) AND pc.estado_pedido_id_estado = 1;`,

		//Obtener orden de repartidos
		get_order_select_by_deliver: `SELECT pc.id_pedido_cliente AS NoOrden, pc.fecha_pedido AS fecha
									  FROM pedido_cliente AS pc 
									  WHERE pc.usuario_id_usuario2 = ? AND pc.estado_pedido_id_estado = 2; `,	
									  
		get_orders_by_deliver: `SELECT pc.id_pedido_cliente AS NoOrden,CONCAT(u.nombre, " ", u.apellido) as nombre, pc.fecha_pedido AS fecha, d.direccion as direccion, pc.calificacion as calificacion, pc.estado_pedido_id_estado as estado
								FROM pedido_cliente AS pc 
								JOIN usuario u ON pc.usuario_id_usuario = u.id_usuario  
								JOIN direccion d ON d.usuario_id_usuario  = pc.usuario_id_usuario 
								WHERE pc.usuario_id_usuario2 = ?; `,	

		get_top5_restaurants: 	`SELECT e.id_empresa, e.nombre, SUM(dpc.cantidad) AS total_ventas, e.descripcion_empresa as descripcion
								FROM empresa e
								JOIN producto p ON e.id_empresa = p.empresa_id_empresa
								JOIN detalle_pedido_cliente dpc ON p.id_producto = dpc.producto_id_producto
								GROUP BY e.id_empresa, e.nombre
								ORDER BY total_ventas DESC
								LIMIT 5; `,	

		get_top5_delivers: 	`SELECT u.id_usuario, u.nombre, AVG(pc.calificacion) AS promedio_calificacion
								FROM pedido_cliente pc
								JOIN usuario u ON pc.usuario_id_usuario2 = u.id_usuario
								WHERE pc.calificacion IS NOT NULL AND (pc.estado_pedido_id_estado = 3 OR pc.estado_pedido_id_estado = 5)
								GROUP BY u.id_usuario, u.nombre
								ORDER BY promedio_calificacion DESC
								LIMIT 5; `,	

		get_top5_restaurants2: 	`SELECT e.id_empresa, e.nombre, COUNT(*) AS total_ordenes
							FROM empresa e
							JOIN producto p ON e.id_empresa = p.empresa_id_empresa
							JOIN detalle_pedido_cliente dpc ON p.id_producto  = dpc.producto_id_producto
							JOIN pedido_cliente pc ON dpc.pedido_cliente_id_pedido_cliente  = pc.id_pedido_cliente 
							GROUP BY e.id_empresa, e.nombre
							ORDER BY total_ordenes DESC
							LIMIT 5; `,	
		
		get_orders_by_user: `SELECT pc.id_pedido_cliente AS NoOrden, pc.fecha_pedido AS fecha, d.direccion  AS direccion	,
							CASE pc.metodo_pago
								WHEN 0 THEN 'Efectivo'
								WHEN 1 THEN 'Tarjeta'
								ELSE 'Desconocido'
							END AS metodo, ep.nombre_estado as estado, CONCAT (u.nombre," ",u.apellido ) AS repartidor
							FROM pedido_cliente pc
							JOIN direccion d ON pc.usuario_id_usuario = d.usuario_id_usuario
							JOIN estado_pedido ep ON pc.estado_pedido_id_estado = ep.id_estado 
							LEFT JOIN usuario u ON pc.usuario_id_usuario2  = u.id_usuario 
							WHERE pc.usuario_id_usuario = ?;
						`,	

		get_orders_globally: `SELECT pc.id_pedido_cliente AS NoOrden, pc.fecha_pedido AS fecha, d.direccion  AS direccion	,
						CASE pc.metodo_pago
							WHEN 0 THEN 'Efectivo'
							WHEN 1 THEN 'Tarjeta'
							ELSE 'Desconocido'
						END AS metodo, ep.nombre_estado as estado, CONCAT (u.nombre," ",u.apellido ) AS repartidor
						FROM pedido_cliente pc
						JOIN direccion d ON pc.usuario_id_usuario = d.usuario_id_usuario
						JOIN estado_pedido ep ON pc.estado_pedido_id_estado = ep.id_estado 
						LEFT JOIN usuario u ON pc.usuario_id_usuario2  = u.id_usuario;
						
					`,	


		get_rate_of_deliver: `SELECT AVG(pc.calificacion) AS calificacion
							  FROM pedido_cliente pc 
							  WHERE pc.calificacion IS NOT NULL AND pc.estado_pedido_id_estado = 5 AND pc.usuario_id_usuario2 = ?`,
    /* ----------------------------------------------------------------------- */
	/* ------------------------------ UPDATES -------------------------------- */
	/* ----------------------------------------------------------------------- */
		update_datosuser: "UPDATE usuario SET nombre=?,apellido=?, password=?, rol=?, telefono=?, tipo_licencia=?, nit=? WHERE id_usuario=?",
		update_restaurante: "UPDATE usuario SET nombre=?,descripcion_empresa=?, tipo_empresa_id_tipo=?, telefono=?, WHERE id_empresa=?",
		update_product: "UPDATE producto SET nombre_producto=?,descripcion_producto=?, imagen_producto=?, precio_producto=?,tipo_producto_id_tipo_producto=?,combo=? WHERE id_producto=?",
		
		update_pending_request: "UPDATE solicitud_pendiente SET aprobada=? WHERE id_solicitud_repartidor= ?",

		update_status_order: "UPDATE pedido_cliente SET usuario_id_usuario2=?, estado_pedido_id_estado=? WHERE id_pedido_cliente=?",

		update_status_order_cancel: "UPDATE pedido_cliente SET usuario_id_usuario2=?, estado_pedido_id_estado=4 WHERE id_pedido_cliente=?",

		update_status_order_delivered: "UPDATE pedido_cliente SET usuario_id_usuario2=?, estado_pedido_id_estado=3 WHERE id_pedido_cliente=?",

		update_status_order: "UPDATE pedido_cliente SET usuario_id_usuario2=?, estado_pedido_id_estado=? WHERE id_pedido_cliente=?",
		
		update_adrress: "UPDATE direccion SET direccion=?, municipio_id_municipio=? WHERE usuario_id_usuario=?",

		update_pending_request_change_adrress: "UPDATE solicitud_pendiente SET aprobada=? WHERE id_solicitud_repartidor= ?",

		ban_user: "UPDATE usuario SET estado=?, descripcionBan = ?  WHERE id_usuario=?",
		
		rate_order: "UPDATE pedido_cliente SET calificacion= ?, estado_pedido_id_estado = 5 WHERE id_pedido_cliente= ?",
		

    /* ----------------------------------------------------------------------- */
	/* ------------------------------ INSERTS -------------------------------- */
	/* ----------------------------------------------------------------------- */





		ins_user:"INSERT INTO usuario "+ 
					" (nombre, apellido, email, username, password,rol,telefono,tipo_licencia,nit,fecha_registro,estado) "+
					" VALUES (?,?,?,?,?,?,?,?,?,?,1);",

		ins_sol:"INSERT INTO solicitud_pendiente "+
				   "(fecha_solicitud,nombre,apellido,email,nit,medio_transporte,usuario_id_usuario,descripcion_empresa,username,password,tipo_empresa,municipio_id_municipio,tipo_licencia,aprobada,telefono,direccion) "+
				   "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",

		ins_sol_cambio_departamental:"INSERT INTO solicitud_pendiente "+
				   "(fecha_solicitud,usuario_id_usuario,aprobada,direccion,municipio_id_municipio) "+
				   "VALUES (?,?,?,?,?);",
				   
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


	// ORDENES
		ins_order: "INSERT INTO pedido_cliente "+
		"(fecha_pedido,detalles_repartidor,metodo_pago,calificacion,usuario_id_usuario,estado_pedido_id_estado,usuario_id_usuario2,detalle_cupon_usuario_id_detalle_cupon)"+
		" VALUES (?,?,?,?,?,?,?,?);",

		ins_order_detail: "INSERT INTO detalle_pedido_cliente "+
		"(cantidad,producto_id_producto,producto_id_tipo_producto,pedido_cliente_id_pedido_cliente)"+
		" VALUES (?,?,?,?);",

	//CUPONES
		ins_cupon: "INSERT INTO cupon "+
		"(porcentaje_descuento,descripcion,codigo_cupon)"+
		" VALUES (?,?,?);",

		ins_cupon_user: "INSERT INTO detalle_cupon_usuario "+
		"(utilizado,cupon_id_cupon,usuario_id_usuario)"+
		" VALUES (?,?,?);",


    /* ----------------------------------------------------------------------- */
	/* ------------------------------ DELETE  -------------------------------- */
	/* ----------------------------------------------------------------------- */
    	del_user: "DELETE FROM usuario WHERE id_usuario=?",
		del_restaurant: "DELETE FROM empresa WHERE id_empresa=?",
		del_product: "DELETE FROM producto WHERE id_producto=?",
		

}