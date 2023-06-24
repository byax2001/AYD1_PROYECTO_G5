import React, { useState,useRef,useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from '../images/logo copy.png';
import md5 from 'md5';
import Alert from 'react-bootstrap/Alert';

function RegistroUsuario() {
  const [message,setMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false);
  const [showSucess, setShowSucess] = useState(false);
  const screenRef = useRef(null);

  const [showMunicipios, setShowMunicipios] = useState(false)
  const [municipios, setMunicipios] = useState([])
  const [departamentos, setDepartamentos] = useState([])
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    username:'',
    password:'',
    email: '',
    telefono: '',
    rol:1,
    departamento: 0,
    municipio: 0,
    direccion: ''
  });

  //CAMBIA EL VALOR DE LAS VARIABLES EN EL STRUCT FORMDATA
  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    const fieldValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));

    if(name ==="departamento"){
      if(value==0){
        setShowMunicipios(false);
        setFormData((prevFormData) => ({
          ...prevFormData,
          ["municipio"]: 0,
        }));
      }else{
        //METODO PARA RELLENAR MUNICIPIOS 
        getMunicipios(value);
        //MOSTRAR DEPARTAMENTOS
        setShowMunicipios(true)
      }
      
    }
  };

  //POST
  const Registro = async () => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/user`;
    const cFormData = { ...formData };
    cFormData["password"]=md5(cFormData["password"])
    
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

      console.log(data_res)
      //console.log(votoC)
      //setVotos(votoC)
    } catch (e) {
      console.log(e)
    }

  }
  //GET
  const getMunicipios = async (departamento) => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/departamento/municipio/${departamento}`;
    let config = {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    
    try {
      const res = await fetch(url, config);
      const data_res = await res.json();
      setMunicipios(data_res.data)
    } catch (e) {
      console.log(e)
    }

  }
  //getDepartamentos
  const getDepartamentos = async () => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/departamento`;
    let config = {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    
    try {
      const res = await fetch(url, config);
      const data_res = await res.json();
      setDepartamentos(data_res.data)
    } catch (e) {
      console.log(e)
    }

  }

  useEffect(() => {
    
    getDepartamentos();
    //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
  },[]);

  //ACCION QUE REALIZA EL FORMULARIO LUEGO DE HACER CLICK A ALGUN BOTON
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario a través de una API o realizar otras acciones con ellos
    // Aquí puedes enviar los datos del formulario a través de una API o realizar otras acciones con ellos
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(formData.email)){
      setShowAlert(true);
      setMessage("Correo Invalido")
      screenRef.current.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (formData.telefono.length !== 8) {
      setShowAlert(true);
      setMessage("Numero de telefono invalido")
      screenRef.current.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (formData.departamento === 0 || formData.municipio === 0) {
      setShowAlert(true);
      setMessage("Departamento o Municipio Invalidos")
      screenRef.current.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    Registro();
    setMessage("Registro Realizado")
    setShowSucess(true);
    //INVOCAR POST
    screenRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  //COMPONENTE DE ALERTA WARNING
  const Alerta = ()=> {
    //DANGER = COLOR ROJO
    // sucess = COLOR VERDE
    return (
    
      <Alert variant="danger" onClose={handleAlertClose} dismissible>
        ¡Error! {message}
      </Alert>
    );
  }

  //COMPONENTE DE ALERTA SUCCESS
  const AlertSuccess = ()=> {
    //DANGER = COLOR ROJO
    // sucess = COLOR VERDE
    return (
    
      <Alert variant="success" onClose={()=>{setShowSucess(false)}} dismissible>
        ¡Éxito! {message}
      </Alert>
    );
  }

  //FUNCION PARA CERRAR LOS AVISOS  
  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light mb-3" ref={screenRef}>
        <img id="logoLP" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">Home</a>
        <div className="h2 text-light">Registro de Usuario</div>
      </nav>
      {showAlert && (
        <Alerta />
      )}
      {showSucess && (
        <AlertSuccess />
      )}
      <div className='container'>
        <div className='row'>
          <div className='col-3 col-sm-0 barfoodL'>

          </div>
          <div className="col-6">
            <Form onSubmit={handleSubmit} className='text-white bg-dark bg-transparent'>
              <Form.Group controlId="nombre">
                <Form.Label className="textForm">Nombre</Form.Label>
                <Form.Control placeholder='Ingrese su nombre' type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="apellido">
                <Form.Label className="textForm">Apellidos</Form.Label>
                <Form.Control placeholder='Ingrese su apellido' type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="username">
                <Form.Label className="textForm">username</Form.Label>
                <Form.Control placeholder='Ingrese su Username' type="text" name="username" value={formData.username} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label className="textForm">Correo Electrónico</Form.Label>
                <Form.Control placeholder='Ingrese su Correo Electronico' type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label className="textForm">Contraseña</Form.Label>
                <Form.Control placeholder='Ingrese una contraseña' type="password" name="password" value={formData.password} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="telefono">
                <div className="row mt-3">
                  <div className="col-4">
                    <Form.Label className="textForm">Número de Telefono</Form.Label>
                  </div>
                  <div className="col-1"></div>
                  <div className="col-7">
                    <Form.Control
                      type="number"
                      name="telefono"
                      placeholder='Ingrese su numero de telefono'
                      value={String(formData.telefono)}
                      onChange={handleChange}
                      maxLength={8}
                      required
                    />
                  </div>
                </div>


              </Form.Group>

              <Form.Group controlId="departamento">
                <Form.Label className="textForm">Departamento</Form.Label>
                <div>
                  <select onChange={handleChange} name="departamento" className='form-select'>
                    <option value={0}>Seleccione un departamento</option>
                    {departamentos.map((departamento) => (
                      <option key={departamento.id_departamento} value={departamento.id_departamento}>
                        {departamento.nombre_dep}
                      </option>
                    ))}
                  </select>
                </div>
              </Form.Group>

              {showMunicipios && (
                <Form.Group controlId="municipio">
                  <Form.Label className="textForm">Municipio</Form.Label>
                  <Form.Control as="select" name="municipio" value={formData.municipio} onChange={handleChange} required>
                    <option value={0}>Seleccione un municipio</option>
                    {municipios.map((municipio) => (
                      <option key={municipio.id_municipio} value={municipio.id_municipio}>
                        {municipio.nombre_municipio}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )}

              <Form.Group controlId="direccion">
                <Form.Label className="textForm">Direccion</Form.Label>
                <Form.Control type="text" name="direccion" placeholder='Especifique su dirección' value={formData.direccion} onChange={handleChange} required />
              </Form.Group>
             

              <Button className='bg-secondary mt-2 btnEffect' variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </div>
          <div className="col-3 col-sm-0 barfood">
            
          </div>
        </div>

      </div>

    </React.Fragment>
  );
}

export default RegistroUsuario;