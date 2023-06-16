import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from '../images/logo.png';

function RegistroEmpleado() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nickName:'',
    password:'',
    email: '',
    celular: '',
    departamento: '',
    municipalidad: '',
    tieneLicencia: false,
    TipoLicencia: '',
    tieneMoto: false,
    documento: null,
  });
  const [file,setFile]=useState("")

  const handleChange = (event) => {
    /* 
      event.target = {value:val, file:[val]}
    */
   //DECLARAN LAS VARIABLES NAME, VALUE, TYPE Y CHECKED
   //LA FORMA DE ABAJO ES UNA FORMA ESPECIAL PARA DECLARA DONDE SE DECLARA Y SE ASIGNAN 
   //LOS VALORES DE UN JSON   {name:val, value:val, type:type,checked:val,files:val}
    const { name, value, type, checked, files } = event.target;

    //                  tipo igual chekcbox? val checked/ Tipo es igual a file? tomar file[0] /tomar valor normal
    // checked es false o true
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
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning mb-3">
        <img id="logoLP" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">Home</a>
        <div className="h2 text-light">Registro de Empleado</div>
      </nav>
      <div className='container'>
        <div className='row'>
          <div className='col-3 col-sm-0'>

          </div>
          <div className="col-6">
            <Form onSubmit={handleSubmit} className='text-white bg-dark'>
              <Form.Group controlId="firstName">
                <Form.Label className="textForm">Nombre</Form.Label>
                <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label className="textForm">Apellidos</Form.Label>
                <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="nickName">
                <Form.Label className="textForm">NickName</Form.Label>
                <Form.Control type="text" name="nickName" value={formData.nickName} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label className="textForm">Correo Electrónico</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              
              <Form.Group controlId="password">
                <Form.Label className="textForm">Contraseña</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="celular">
                <Form.Label className="textForm">Número de Celular</Form.Label>
                <Form.Control
                  type="number"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  maxLength={8}
                  required
                />
              </Form.Group>

              <Form.Group controlId="departamento">
                <Form.Label className="textForm">Departamento</Form.Label>
                <Form.Control type="text" name="departamento" value={formData.departamento} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="municipalidad">
                <Form.Label className="textForm">Municipio</Form.Label>
                <Form.Control type="text" name="municipalidad" value={formData.municipalidad} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="tieneLicencia">
                <Form.Check type="checkbox" name="tieneLicencia" label="¿Posee Licencia?" checked={formData.tieneLicencia} onChange={handleChange} />
              </Form.Group>

              {formData.tieneLicencia && (
                <Form.Group controlId="TipoLicencia">
                  <Form.Label className="textForm">Tipo de Licencia</Form.Label>
                  <Form.Control type="text" name="TipoLicencia" value={formData.TipoLicencia} onChange={handleChange} required />
                </Form.Group>
              )}

              <Form.Group controlId="tieneMoto">
                <Form.Check type="checkbox" name="tieneMoto" label="¿Posee Motocicleta Propia?" checked={formData.tieneMoto} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="documento">
                <Form.Label className="textForm">Hoja de Vida</Form.Label>
                <Form.Control type="file" name="documento" accept="application/pdf" onChange={handleChange} />
              </Form.Group>

              <Button className='bg-secondary mt-2 btnEffect' variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </div>
          <div className="col-3 col-sm-0">
            
          </div>
        </div>

      </div>

    </React.Fragment>
  );
}

export default RegistroEmpleado;
