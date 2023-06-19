import React, { useState, useContext, createContext,useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from '../images/logo.png';
import '../css/Isesion.css'; 
import md5 from 'md5';
import {Link,useNavigate} from 'react-router-dom'
import { useMyContext } from '../context';


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


      console.log(data_res)
      if(data_res.valid){
        if(data_res.data.rol==0){
          navigate("/adm",{state:{user:"INFORMACION"}})
        }
        else if(data_res.data.rol==1){
          alert("Usuario ingresado con exito");
        }else if (data_res.data.rol==2){
          setState({ ...state, rol:data_res.data.rol, data:data_res.data})
          navigate("/emp",{state:{user:"INFORMACION"}})
        }else{
          navigate("/inicioe",{state:{user:"INFORMACION"}})
        }
      }else{
        //AVISO CONTRASEÑA
        alert(data_res.message)
      }

      //console.log(votoC)
      //setVotos(votoC)
    } catch (e) {
      console.log(e)
    }

  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light">
        <img id="logoLP" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">Home</a>
        <div className="h2 text-light">Iniciar Sesion</div>
      </nav>
      <div className='container-fluid ' id="conInit">
        <div className='row'>
          <div className='col-9'>

          </div>
          <div className="col-3 bg-dark" id="Isesion">
            <Form onSubmit={handleSubmit} className='text-white bg-dark mt-5' >
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

    </React.Fragment>
  );
}

export default InitSesion;
