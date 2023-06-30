const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)

describe('Test del backend Grupo5 AyD1',()=>{
    //Test para la ruta inicial
    it('Test de conexion de la api',async()=>{
        const response = await supertest(app).get('/');
        expect(response.statusCode).toBe(200);
    })


    //Test para el login
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

})