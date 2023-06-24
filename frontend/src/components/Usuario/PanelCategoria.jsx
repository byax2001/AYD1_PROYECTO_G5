import React, { useState,useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../images/logo.png';
import { Link,useLocation } from 'react-router-dom';
import CardPr from './cardProducto';
import image2 from '../../images/quesoB.png';


const data = [
    {
    id_producto:1,
	nombre_producto: "Papas Grandes",
    descripcion_producto: "Muy delicioso",
	precio_producto:10,
	nombre_tipo_prod:"Plato Fuerte",
	imagen_producto:image2
    },
    {
	id_producto:2,
    nombre_producto: "Papas chicas",
    descripcion_producto: "Muy delicioso",
	precio_producto:5,
	nombre_tipo_prod:"Plato chico",
	imagen_producto:image2
    },
    {
	id_producto:3,
    nombre_producto: "Papas Medianas",
    descripcion_producto: "Muy delicioso",
	precio_producto:7,
	nombre_tipo_prod:"Plato Medio",
	imagen_producto:image2

    }
  ];

//<Form selectedRow={selectedRow} closeModal={closeModal} filteredDataV={filteredDataV} />
const PanelCa = () => {

    const categoria = localStorage.getItem("categoria");
    console.log(localStorage.getItem("categoria"));
    const idCate = localStorage.getItem("idCategoria");
    console.log(localStorage.getItem("idCategoria"));
  

    //const { title } = location.state;

    return (

        <React.Fragment>   
            <nav className="navbar navbar-expand-lg navbar-light position-relative">
                            <img id="logoStar" src={logo} alt="Logo" />
                            <a className="navbar-brand" >AlChilazo</a>
                            <div className="h2 text-light">Categoria de: {categoria} _ {idCate} </div>
                            <div className="btn-group d-inline-flex" data-toggle="buttons">
                                <Link to="/inicioU" className="btn textForm text-light">Regresar</Link>
                            </div>
                        </nav>
            <div className="container">
                        
                        <div className="h2 text-light">Productos a la venta</div>
                        <div className="container d-flex justify-content-center align-items-center h-100">
                            <div className="row">
                            {data.map(({ nombre_producto, imagen_producto, id_producto, descripcion_producto,precio_producto }) => (
                                <div className="col-md-2" key={id_producto}>
                                <CardPr imageSource={imagen_producto} title={nombre_producto} id={id_producto} text={descripcion_producto} precio={precio_producto} />
                                </div>
                            ))}
                            </div>
                        </div>


            </div>
        </React.Fragment>


    );
};

export default PanelCa;