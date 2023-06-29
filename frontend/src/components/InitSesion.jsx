import React, { useState, useContext, createContext,useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from '../images/logo copy.png';
import '../css/Isesion.css'; 
import md5 from 'md5';
import {Link,useNavigate} from 'react-router-dom'
import { useMyContext } from '../context';

const Lema=()=>{
  return (
    <div id="lema" className='bg-dark opacity-75'>
      <div className="row">
        <div className="col-1" />
        <div className="col-6 ml-3">
          <div className="row">
            <div className="col-2 p-0">
              <div className='textForm h1 display-1' style={{ textAlign: 'right', color: '#DB4F23' }}>
                Al
              </div>
            </div>
            <div className="col-10 p-0">
              <div className='textForm h1 display-1' style={{ textAlign: 'left', color: '#F9F4EF' }}>
                Chilazo</div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="text-light text-left h4">
                <em>Sabor Guatemalteco, ¡A tu alcance!</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InitSesion() {

  const [state,setState] = useMyContext();
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [id, setID] = useState("")
  const [token,setToken] = useState("")

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    const fieldValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));
  };

    const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario a través de una API o realizar otras acciones con ellos
    console.log(formData);
    iSesion();
    //INICIAR SESION
  };

  const iSesion = async () => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/login`;
    const cFormData = { ...formData };
    cFormData["password"] = md5(cFormData["password"])
    console.log(cFormData);
    let config = {
      method: "POST", //ELEMENTOS A ENVIAR
      body: JSON.stringify(cFormData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      const res = await fetch(url, config);

      const data_res = await res.json();


      //console.log(data_res)
      if(data_res.valid){
        console.log(data_res)

        //En esta parte es donde se puede leer la informacion del token
        const tokenppayload = data_res.token.split('.')[1];
        const decodedPayload = atob(tokenppayload);
        const payloadData = JSON.parse(decodedPayload);
        console.log("DATAAAAAAA")
        console.log(payloadData)
        console.log("DATAAAAAAA")

        localStorage.setItem('idUser',payloadData.iduser)
        localStorage.setItem('token',data_res.token)
        localStorage.setItem('rol',payloadData.rol)
        localStorage.setItem('nombre',payloadData.nombre)
        localStorage.setItem('apellido',payloadData.apellido)


        if(data_res.data.rol==0){
          setState({ ...state, rol:data_res.data.rol, data:data_res.data})
          navigate("/adm",{state:{user:"INFORMACION"}})
        }
        else if(data_res.data.rol==1){
          setState({ ...state, rol:data_res.data.rol, data:data_res.data})
          alert("Usuario ingresado con exito");
        }else if (data_res.data.rol==2){
          localStorage.setItem('calificacion',payloadData.calificacion)
          setState({ ...state, rol:data_res.data.rol, data:data_res.data})
          navigate("/emp",{state:{user:"INFORMACION"}})
        }else{
          setState({ ...state, rol:data_res.data.rol, data:data_res.data})
          navigate("/inicioe",{state:{user:"INFORMACION"}})
        }
      }else{
        //AVISO CONTRASEÑA
        alert(data_res.message)
      }
    } catch (e) {
      console.log(e)
    }

  }

  return (
    <React.Fragment>
      <div className='wallpaper'>
      <nav className="navbar navbar-expand-lg navbar-light opacity-75">
        <img id="logoLP" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">Home</a>
        <div className="h2 text-light">Iniciar Sesion</div>
      </nav>
     
      <div className='container-fluid ' id="conInit">
        <div className='row'>
          <div className='col-9'>
              <Lema/>
          </div>
          <div className="col-3 bg-dark" id="Isesion">
            <Form onSubmit={handleSubmit} className='text-white mt-5' >
              <Form.Group controlId="username">
                <Form.Label className="textForm">Username:</Form.Label>
                <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label className="textForm">Contraseña</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
              </Form.Group>
              <Button className='bg-secondary mt-2 btnEffect' variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </div>
        </div>

      </div>

      </div>
      
    </React.Fragment>
  );
}

export default InitSesion;
