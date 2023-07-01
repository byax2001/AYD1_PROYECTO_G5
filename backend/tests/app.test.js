const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)


function createMockFileData() {
    const fileData = {
      buffer: Buffer.from('contenido del archivo'), // Aquí debes reemplazar 'contenido del archivo' con los datos reales del archivo
      mimetype: 'image/jpeg', // Aquí debes reemplazar 'image/jpeg' con el tipo MIME correspondiente al archivo que deseas simular
      filename: 'nombre_archivo.jpg' // Aquí debes reemplazar 'nombre_archivo.jpg' con el nombre de archivo que deseas simular
    };
  
    return fileData;
  }
  
describe('Test del backend Grupo5 AyD1',()=>{
    //Test para la ruta inicial
    it('Test de conexion de la api',async()=>{
        const response = await supertest(app).get('/');
        expect(response.statusCode).toBe(200);
    })

    //Test para el login usuario deliver
    it('Test de login',async()=>{
        const body = 
        {
            "username": "repartidor50",
            "password": "c55d52d0b68a73e44dd7dc6bd0381b47"
        }
        const response = await supertest(app).post('/api/login').send(body);
        expect(response.statusCode).toBe(200);

    })
    
    //Test para el login usuario restaurante
    it('Test de login',async()=>{
        const body = 
        {
            "username": "alitas",
            "password": "c55d52d0b68a73e44dd7dc6bd0381b47"
        }
        const response = await supertest(app).post('/api/login').send(body);
        expect(response.statusCode).toBe(200);

    })

    //Test para el login usuario
    it('Test de login',async()=>{
        const body = 
        {
            "username": "sargentwar",
            "password": "c55d52d0b68a73e44dd7dc6bd0381b47"
        }
        const response = await supertest(app).post('/api/login').send(body);
        expect(response.statusCode).toBe(200);

        // Guardar el token JWT en la variable
        token = response.body.token;
    })

    //Test para nuevo usuario
    it('Test de obtener usuarios',async()=>{
      
        const response = await supertest(app).get('/api/user').set('Authorization', `Bearer ${token}`);;
        expect(response.statusCode).toBe(200);
    })

    //Test para nuevo usuario
    it('Test de crear usuarios con correo ya ingresado',async()=>{
        const body = 
        {
            "nombre": "usuariotest",
            "apellido": "c55d52d0b68a73e44dd7dc6bd0381b47",
            "email": "osmarsantizo@gmail.com",
            "username": "testuser",
            "password": "c55d52d0b68a73e44dd7dc6bd0381b47",
            "rol": 1,
            "telefono": "31771200",
            "tipo_licencia": "C",
            "nit": "107799936",
            "fecha_registro": "2023-06-13",
            "direccion": "probando cambio de dirección",
            "municipio": 2,
        } 

        const response = await supertest(app).post('/api/user').set('Authorization', `Bearer ${token}`).send(body);;
        expect(response.statusCode).toBe(200);
    })

    //Test para nuevo usuario
    it('Test de crear usuarios con usuario ya ingresado',async()=>{
        const body = 
        {
            "nombre": "usuariotest",
            "apellido": "c55d52d0b68a73e44dd7dc6bd0381b47",
            "email": "osmarsddantizo@gmail.com",
            "username": "sargentwar",
            "password": "c55d52d0b68a73e44dd7dc6bd0381b47",
            "rol": 1,
            "telefono": "31771200",
            "tipo_licencia": "C",
            "nit": "107799936",
            "fecha_registro": "2023-06-13",
            "direccion": "probando cambio de dirección",
            "municipio": 2,
        } 

        const response = await supertest(app).post('/api/user').set('Authorization', `Bearer ${token}`).send(body);;
        expect(response.statusCode).toBe(200);
    })

    //Test para nuevo usuario
    it('Test de crear usuario',async()=>{
        const body = 
        {
            "nombre": "usuariotest",
            "apellido": "c55d52d0b68a73e44dd7dc6bd0381b47",
            "email": "osmarssantizo@gmail.com",
            "username": "sargenstwar",
            "password": "c55d52d0b68a73e44dd7dc6bd0381b47",
            "rol": 1,
            "telefono": "31771200",
            "tipo_licencia": "C",
            "nit": "107799936",
            "fecha_registro": "2023-06-13",
            "direccion": "probando cambio de dirección",
            "municipio": 2,
        } 

        const response = await supertest(app).post('/api/user').set('Authorization', `Bearer ${token}`).send(body);;
        expect(response.statusCode).toBe(200);
    })

    //Test para editar usuario malo
    it('Test para editar usuarios',async()=>{
       

        const response = await supertest(app).put('/api/user').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(400);
    })


     //Test para editar usuario bueno
     it('Test para editar usuarios bueno',async()=>{
       

        const body = {
            "nombre": "osmar",
            "apellido": "santizo",
            "email": "test@gmail.com",
            "username": "nuevousarme",
            "password": "passprueba",
            "rol": 1, 
            "telefono": 24646998,
            "tipo_licencia": "C",
            "nit": "2496350k",
            "iduser": 54
        };

        const response = await supertest(app).put('/api/user').set('Authorization', `Bearer ${token}`).send(body);
        expect(response.statusCode).toBe(200);
    })



    //Test para banear usuario
    it('Test para banear usuario',async()=>{
       
        const response = await supertest(app).put('/api/user/ban').set('Authorization', `Bearer ${token}`);
        expect(response.body.valid).toEqual(false);
    })

    

     //Test para obtener usuarios
     it('Test para obtener usuarios', async () => {
        const response = await supertest(app)
            .get('/api/user')
            .set('Authorization', `Bearer ${token}`);
    
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Estos son los usuarios:');
        expect(response.body.data).toEqual(expect.any(Array));
    });

    //Test para banear usuario
    it('Test para banear usuario',async()=>{
       const body ={
        "id":54,
        "descripcion":"Baneo de test",
        "tipoban": 1
    }
        const response = await supertest(app).put('/api/user/ban').set('Authorization', `Bearer ${token}`).send(body);
        expect(response.statusCode).toBe(200);
    })
    //Test para banear usuario
    it('Test para colocar en mantenimiento un usuario',async()=>{
        const body ={
         "id":54,
         "descripcion":"Baneo de test",
         "tipoban": 2
     }
         const response = await supertest(app).put('/api/user/ban').set('Authorization', `Bearer ${token}`).send(body);
         expect(response.statusCode).toBe(200);
     })

      //Test para cambiar de dirección
    it('Test para cambiar dirección',async()=>{
        const body ={
            "userid":54,
            "municipio":44,
            "direccion":"probando cambio de dirección"
        }
         const response = await supertest(app).post('/api/user/changeadress').set('Authorization', `Bearer ${token}`).send(body);
         expect(response.statusCode).toBe(200);
     })

       //Test para obtener deliver
    it('Test para obtener delivers',async()=>{
     
         const response = await supertest(app).get('/api/userdeliver').set('Authorization', `Bearer ${token}`);
         expect(response.statusCode).toBe(400);
     })

       //Test para editar deliver
    it('Test para editar delivers',async()=>{
     
        const response = await supertest(app).get('/api/userdeliver').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(400);
    })

      //Test para obtener departamento
      it('Test para obtener departamento',async()=>{
     
        const response = await supertest(app).get('/api/departamento').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    })

     //Test para obtener municipio
     it('Test para obtener municipio',async()=>{
     
        const response = await supertest(app).get('/api/departamento/municipio/11').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    })


    //Test para obtener info de usuarios
    it('Test para obtener la info de los usuarios ',async()=>{
     
        const response = await supertest(app).get('/api/reports').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    })

     //Test para obtener el producto popular de las  empresas
     it('Test para obtener el producto popular de la empresa',async()=>{
     
        const response = await supertest(app).get('/api/reports/popularproduct/16').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    })


    //Test para obtener el top5 de los restaurantes
    it('Test para obtener el top5 de los restaurantes',async()=>{
     
        const response = await supertest(app).get('/api/reports/top5restaurant').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    })

    //Test para obtener el top5 delivers
    it('Test para obtener el top5 de los delivers',async()=>{
     
        const response = await supertest(app).get('/api/reports/top5deliver').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    })


     //Test para obtener el top5 de los restaurantes2
     it('Test para obtener el top5 de los restaurantes2',async()=>{
     
        const response = await supertest(app).get('/api/reports/top5restaurant2').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    })

     //Test para obtener el producto más vendido
     it('Test para obtener el producto más vendido',async()=>{
     
        const response = await supertest(app).get('/api/reports/getglobalproducts').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    })

    //Test para obtener las ventas totales
    it('test para obtener las ventas totales ',async()=>{
        const body ={
            "fecha":"2023/06/27"
            
        }
        const response = await supertest(app).get('/api/reports/salesValue').set('Authorization', `Bearer ${token}`).send(body);
        expect(response.statusCode).toBe(404);
    })


    //Test para obtener los productos
    it('test para obtener los productos ',async()=>{
    response = await supertest(app).get('/api/products').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    })


    //Test para obtener productos por tipo
    it('test para obtener productos por tipo ',async()=>{
        response = await supertest(app).get('/api/products/type/:1').set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        })
        

    //Test para obtener productos por restaurantes
    it('test para obtener productos por restaurantes',async()=>{
        response = await supertest(app).get('/api/products/rest/16').set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        })
    
    //Test para obtener productos por restaurantes
    it('test para obtener el tipo de los productos',async()=>{
        response = await supertest(app).get('/api/products/type').set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        })
    
    //Test para eliminar producto
    it('test para eliminar producto',async()=>{
        response = await supertest(app).delete('/api/products/11655748').set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        })
     //Test para editar producto 
     it('test para editar producto',async()=>{
        var body = {
            "idproduct":18,
            "nombre": "Mojarra Campero",
            "descripcion": "¿Lo querían?, ahora lo tienen",
            "precio": 55,
            "tipo": 2,
            "combo": 0,
            "imagenold": "https://ayd1-grupo5.s3.amazonaws.com/51fefd5e11d19ebd15cddce0b53ae556ffab932e329d172f463c44eb887d3d6e"
        }
        
        response = await supertest(app).put('/api/products').set('Authorization', `Bearer ${token}`).send(body);
            expect(response.statusCode).toBe(200);
        })
  
    //Test para obtener solicitudes de restaurantes
    it('test para obtener solicitudes de restaurantes',async()=>{
        response = await supertest(app).get('/api/reqPendingRestaurant').set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        })

    //Test para obtener solicitudes de delivers
    it('test para obtener solicitudes de delivers',async()=>{
        response = await supertest(app).get('/api/reqPendingDelivers').set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        })
    //Test para obtener solicitudes de cambio de zona
    it('test para obtener solicitudes de cambio de zona',async()=>{
        response = await supertest(app).get('/api/reqPendingChangeAdress').set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        })

    //Test para obtener ordenes por direccion
    it('test para obtener ordenes por dirección',async()=>{
        response = await supertest(app).get('/api/orderbyadress/44').set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        })

     //Test para obtener ordenes por direccion2
     it('test para obtener ordenes por dirección2',async()=>{
        response = await supertest(app).get('/api/orderbyadress/43').set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        })
    


    //Test para para obtener los restaurantes
    it('test para obtener restaurantes',async()=>{
        response = await supertest(app).get('/api/restaurants').set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        })
        
    //Test para para obtener los tipos de restaurantes
    it('test para obtener los tipos de restaurantes',async()=>{
        response = await supertest(app).get('/api/restaurants/type').set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        }) 


    
     //Test para denegar una solicitud
     it('test para denegar una solicitud',async()=>{
        var body = {
            "id_solicitud": 91
        };
        response = await supertest(app).put('/api/denyRequest').set('Authorization', `Bearer ${token}`).send(body);
            expect(response.statusCode).toBe(200);
        }) 
    //Test para aceptar una request de cambio de zona
    it('test para aceptar una request de cambio de zona ',async()=>{
        var body = {
            "id_solicitud": 91
        };
        response = await supertest(app).put('/api/aceptRequestCAdress').set('Authorization', `Bearer ${token}`).send(body);
            expect(response.statusCode).toBe(200);
        }) 

    //Test para seleccionar una orden
    it('test para seleccionar una orden ',async()=>{
        var body = {
            "idUser":42,
            "estado":2,
            "idpedido":26
      
        }
        response = await supertest(app).put('/api/selectorder').set('Authorization', `Bearer ${token}`).send(body);
            expect(response.statusCode).toBe(200);
        }) 

    //Test para seleccionar una orden repetida
    it('test para seleccionar una orden repetida ',async()=>{
        var body = {
            "idUser":42,
            "estado":2,
            "idpedido":26
      
        }
        response = await supertest(app).put('/api/selectorder').set('Authorization', `Bearer ${token}`).send(body);
            expect(response.statusCode).toBe(200);
        }) 

     //Test para obtener la orden actual
     it('test para obtener la orden actual ',async()=>{
    
        response = await supertest(app).get('/api/order/actual/42').set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        }) 

    //Test para obtener las ordenes por deliver
    it('test para obtener las ordenes de un deliver ',async()=>{
  
        response = await supertest(app).get('/api/userdeliver/orders/42').set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        }) 


     //Test para cancelar una orden
     it('test para cancelar una orden ',async()=>{

        var body = {
            "idUser":42,
            "idpedido":26
        }

        response = await supertest(app).put('/api/order/cancel').set('Authorization', `Bearer ${token}`).send(body);
            expect(response.statusCode).toBe(200);
        }) 

     //Test para entregar una orden
     it('test para entregar una orden ',async()=>{

        var body = {
            "idUser":42,
            "idpedido":26
        }

        response = await supertest(app).put('/api/order/deliver').set('Authorization', `Bearer ${token}`).send(body);
            expect(response.statusCode).toBe(200);
        }) 


    //Test para calificar una orden
    it('test para calificar una orden ',async()=>{

        var body = {
            "idOrder":26,
            "calificacion":5
        }

        response = await supertest(app).put('/api/order/rate').set('Authorization', `Bearer ${token}`).send(body);
            expect(response.statusCode).toBe(200);
        }) 

    //Test para calificar una orden
    it('test para calificar una orden ',async()=>{
        response = await supertest(app).get('/api/order/user/42').set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        }) 

    //Test para obtener todas las ordenes
    it('test para obtener todas las ordenes ',async()=>{
        response = await supertest(app).get('/api/order/all').set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        }) 






})

