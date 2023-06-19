import React, { useState,useRef, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from '../images/logo.png';
import md5 from 'md5';
import Alert from 'react-bootstrap/Alert';

function RegistroEmpresa() {
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
    username: '',
    password: '',
    descripcion: '',
    tipo_empresa: 0,
    email: '',
    telefono: '',
    departamento: 0,
    zona: '',
    municipio: 0,
    direccion:'',
    rol: 3,
    userid: 1,
    file: null
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
        getMunicipios();
        //FILTRAR SOLO LOS MUNICIPIOS QUE EL DEPARTAMENTO POSEE
        const muniFiltrados = municipios.filter((municipio) => municipio.id_departamento == parseInt(value));
        setMunicipios(muniFiltrados);
        //MOSTRAR DEPARTAMENTOS
        setShowMunicipios(true)
      }
      
    }
  };

  //POST
  const Registro = async () => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/restaurants`;
    const data = new FormData();
    data.append('nombre', formData.nombre)
    data.append('username', formData.username)
    data.append('password', formData.password)
    data.append('descripcion', formData.descripcion)
    data.append('apellido', '')
    data.append('tipo_empresa', formData.tipo_empresa)
    data.append('email', formData.email)
    data.append('telefono', formData.telefono)
    data.append('departamento', formData.departamento)
    data.append('zona', formData.zona)
    data.append('municipio', formData.municipio)
    data.append('direccion', formData.direccion)
    data.append('rol', formData.rol)
    data.append('userid', formData.userid)
    data.append('image', formData.file)


    let config = {
      method: "POST", //ELEMENTOS A ENVIAR
      body: data,
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
  const getMunicipios = async () => {
    const url = `${process.env.REACT_APP_API_CONSUME}/api/departamento/municipio`;
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
    const cFormData = { ...formData };
    cFormData["password"]=md5(cFormData["password"])
    
    console.log(cFormData);
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
        <div className="h2 text-light">Registro de Empresa</div>
      </nav>
      {showAlert && (
        <Alerta />
      )}
      {showSucess && (
        <AlertSuccess />
      )}
      <div className='container'>
        <div className='row'>
          <div className='col-3 col-sm-0'></div>
          <div className="col-6">
            <Form onSubmit={handleSubmit} className='text-white bg-dark'>
              <Form.Group controlId="nombre">
                <Form.Label className="textForm">Nombre de la Entidad</Form.Label>
                <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="descripcion">
                <Form.Label className="textForm">Descripción</Form.Label>
                <Form.Control type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="tipo_empresa">
                <Form.Label className="textForm">Categoría</Form.Label>
                <Form.Control type="int" name="tipo_empresa" value={formData.tipo_empresa} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="username">
                <Form.Label className="textForm">Username</Form.Label>
                <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label className="textForm">Correo Electrónico</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              
              <Form.Group controlId="password">
                <Form.Label className="textForm">Contraseña</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="telefono">
                <Form.Label className="textForm">Número de Telefono</Form.Label>
                <Form.Control
                  type="number"
                  name="telefono"
                  value={String(formData.telefono)}
                  onChange={handleChange}
                  maxLength={8}
                  required
                />
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
                  <p className='h6 textForm'><small>Dep ID: {formData.departamento}</small></p>
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
                  <p className='h6 textForm'><small>Muni ID: {formData.municipio}</small></p>
                </Form.Group>
              )}
              
              <Form.Group controlId="zona">
                <Form.Label className="numberForm">Zona</Form.Label>
                <Form.Control type="number" name="zona" value={formData.zona} onChange={handleChange} required />
              </Form.Group>
              
              <Form.Group controlId="direccion">
                <Form.Label className="textForm">Zona</Form.Label>
                <Form.Control type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="file">
                <Form.Label className="textForm">Documentos</Form.Label>
                <Form.Control type="file" name="file" onChange={handleChange} accept="application/pdf" />
              </Form.Group>

              <Button className='bg-secondary mt-2 btnEffect' variant="primary" type="submit" >
                Enviar
              </Button>
            </Form>
          </div>
          <div className="col-3 col-sm-0"></div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RegistroEmpresa;