import React, { useState,useEffect  } from 'react';
import logo from '../../images/logo copy.png';
import { Link,useLocation } from 'react-router-dom';
import CardPr from './cardProducto';
import image2 from '../../images/quesoB.png';


const data = [
    {
    id_producto:14,
	nombre_producto: "Papas Grandes",
    descripcion_producto: "Muy delicioso",
	precio_producto:10,
	nombre_tipo_prod:"Plato Fuerte",
	imagen_producto:image2,
    producto_id_producto: 2
    },
    {
	id_producto:2,
    nombre_producto: "Papas chicas",
    descripcion_producto: "Muy delicioso",
	precio_producto:5,
	nombre_tipo_prod:"Plato chico",
	imagen_producto:image2,
    producto_id_producto: 2
    },
    {
	id_producto:3,
    nombre_producto: "Papas Medianas",
    descripcion_producto: "Muy delicioso",
	precio_producto:7,
	nombre_tipo_prod:"Plato Medio",
	imagen_producto:image2,
    producto_id_producto: 2
    }
  ];

//<Form selectedRow={selectedRow} closeModal={closeModal} filteredDataV={filteredDataV} />
const PanelE = () => {
    
    const titleR = localStorage.getItem("titleres");
    console.log(localStorage.getItem("titleres"));
    const idR = localStorage.getItem("idres");
    console.log(localStorage.getItem("idres"));


    //const { title } = location.state;

    return (
        <React.Fragment>
            <div className="wall3">
                <nav className="navbar navbar-expand-lg navbar-light position-relative">
                    <img id="logoStar" src={logo} alt="Logo" />
                    <a className="navbar-brand" >AlChilazo</a>
                    <div className="h2 text-light">Bienvenido a {titleR}  {idR} </div>
                    <Link to="/inicioU" className="btn textForm text-light btnRT btnEffect">Regresar</Link>
                </nav>
                <div className="container">

                    <div className="h2 text-light">Productos a la venta</div>
                    <div className="container d-flex justify-content-center align-items-center h-100">
                        <div className="row">
                            {data.map(({ nombre_producto, imagen_producto, id_producto, descripcion_producto, precio_producto, producto_id_producto }) => (
                                <div className="col-md-2" key={id_producto}>
                                    <CardPr imageSource={imagen_producto} title={nombre_producto} id={id_producto} text={descripcion_producto} precio={precio_producto} producto_id={producto_id_producto} />
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>

        </React.Fragment>





    );
};

export default PanelE;