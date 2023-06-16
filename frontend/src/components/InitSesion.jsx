import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from '../images/logo.png';
import '../css/Isesion.css'; 

function InitSesion() {
  const [formData, setFormData] = useState({
    Name: '',
    Password: '',
  });

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
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
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
              <Form.Group controlId="firstName">
                <Form.Label className="textForm">Email:</Form.Label>
                <Form.Control type="email" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label className="textForm">Contraseña</Form.Label>
                <Form.Control type="password" name="lastName" value={formData.lastName} onChange={handleChange} required />
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
