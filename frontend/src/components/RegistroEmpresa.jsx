import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from '../images/logo.png';

function RegistroEmpresa() {
  const [formData, setFormData] = useState({
    nombreEntidad: '',
    descripcion: '',
    categoria: '',
    correo: '',
    departamento: '',
    zona: '',
    municipio: '',
    documentos: null,
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
        <div className="h2 text-light">Registro de Empresa</div>
      </nav>
      <div className='container'>
        <div className='row'>
          <div className='col-3 col-sm-0'></div>
          <div className="col-6">
            <Form onSubmit={handleSubmit} className='text-white bg-dark'>
              <Form.Group controlId="nombreEntidad">
                <Form.Label className="textForm">Nombre de la Entidad</Form.Label>
                <Form.Control type="text" name="nombreEntidad" value={formData.nombreEntidad} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="descripcion">
                <Form.Label className="textForm">Descripción</Form.Label>
                <Form.Control type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="categoria">
                <Form.Label className="textForm">Categoría</Form.Label>
                <Form.Control type="text" name="categoria" value={formData.categoria} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="correo">
                <Form.Label className="textForm">Correo Electrónico</Form.Label>
                <Form.Control type="email" name="correo" value={formData.correo} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="departamento">
                <Form.Label className="textForm">Departamento</Form.Label>
                <Form.Control type="text" name="departamento" value={formData.departamento} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="zona">
                <Form.Label className="numberForm">Zona</Form.Label>
                <Form.Control type="number" name="zona" value={formData.zona} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="municipio">
                <Form.Label className="textForm">Municipio</Form.Label>
                <Form.Control type="text" name="municipio" value={formData.municipio} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="documentos">
                <Form.Label className="textForm">Documentos</Form.Label>
                <Form.Control type="file" name="documentos" onChange={handleChange} />
              </Form.Group>

              <Button className='bg-secondary mt-2 btnEffect' variant="primary" type="submit">
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
