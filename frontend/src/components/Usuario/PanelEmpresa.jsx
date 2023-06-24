import React, { useState,useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../images/logo.png';
import { Link,useLocation } from 'react-router-dom';
import CardPr from './cardProducto';
import image2 from '../../images/quesoB.png';


const data = [
    {
        id: 1,
        nombre_producto: "Combo1",
        image: image2
    },
    {
        id: 2,
        nombre_producto: "Queso Burguesa",
        image: image2
    },
    {
        id: 3,
        nombre_producto: "Papas Medianas",
        image: image2
    },
    {
        id: 4,
        nombre_producto: "Burger con Tocino",
        image: image2
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
        <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-light position-relative">
                <img id="logoStar" src={logo} alt="Logo" />
                <a className="navbar-brand" >AlChilazo</a>
                <div className="h2 text-light">Bienvenido a {titleR} _ {idR} </div>
                <div className="btn-group d-inline-flex" data-toggle="buttons">
                    <Link to="/inicioU" className="btn textForm text-light">Regresar</Link>
                </div>
            </nav>
            <div className="h2 text-light">Productos a la venta</div>
            <div className="container d-flex justify-content-center align-items-center h-100">
                <div className="row">
                {data.map(({ title, image, id }) => (
                    <div className="col-md-2" key={id}>
                    <CardPr imageSource={image} title={title} id={id} />
                    </div>
                ))}
                </div>
            </div>


        </div>

    );
};

export default PanelE;