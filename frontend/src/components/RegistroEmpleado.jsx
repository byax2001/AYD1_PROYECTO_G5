import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from '../images/logo.png';

function RegistroEmpleado() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    department: '',
    municipality: '',
    hasLicense: false,
    licenseType: '',
    hasMotorcycle: false,
    resume: null,
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

              <Form.Group controlId="email">
                <Form.Label className="textForm">Correo Electrónico</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="phoneNumber">
                <Form.Label className="textForm">Número de Celular</Form.Label>
                <Form.Control
                  type="number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  maxLength={8}
                  required
                />
              </Form.Group>

              <Form.Group controlId="department">
                <Form.Label className="textForm">Departamento</Form.Label>
                <Form.Control type="text" name="department" value={formData.department} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="municipality">
                <Form.Label className="textForm">Municipio</Form.Label>
                <Form.Control type="text" name="municipality" value={formData.municipality} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="hasLicense">
                <Form.Check type="checkbox" name="hasLicense" label="¿Posee Licencia?" checked={formData.hasLicense} onChange={handleChange} />
              </Form.Group>

              {formData.hasLicense && (
                <Form.Group controlId="licenseType">
                  <Form.Label className="textForm">Tipo de Licencia</Form.Label>
                  <Form.Control type="text" name="licenseType" value={formData.licenseType} onChange={handleChange} required />
                </Form.Group>
              )}

              <Form.Group controlId="hasMotorcycle">
                <Form.Check type="checkbox" name="hasMotorcycle" label="¿Posee Motocicleta Propia?" checked={formData.hasMotorcycle} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="resume">
                <Form.Label className="textForm">Hoja de Vida</Form.Label>
                <Form.Control type="file" name="resume" onChange={handleChange} />
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
