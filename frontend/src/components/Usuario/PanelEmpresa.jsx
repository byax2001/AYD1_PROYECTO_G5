import React, { useState,useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../images/logo.png';
import { Link,useLocation } from 'react-router-dom';
import Card from './cardsEmp';


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
        </div>

    );
};

export default PanelE;