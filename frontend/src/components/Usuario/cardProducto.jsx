import React from "react";
import PropTypes from "prop-types";
import { Link,BrowserRouter  } from 'react-router-dom';

import "./card.css";


// imageSource={imagen_producto} title={nombre_producto} id={id_producto} text={descripcion_producto} precio={precio_producto} 

const CardPr = ({imageSource, title,id ,text, precio }) => {

  const AgregarCarrito = () =>{
    console.log("Aqui ira la logica del Carrito");
    console.log("Precio",precio);
  }

  
  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <img src={imageSource} alt="a wallpaper" className="card-img-top" />
      </div>
      <div className="card-body text-light">
        <h4 className="card-title">{title}</h4>
        <p className="card-text text-secondary">
          {text
            ? text
            : "Texto Provisional Descripcion de empresa"}
        </p>
        <h4 className="card-title">Q{precio}</h4>
        <Link 
          onClick={AgregarCarrito}
          className="btn btn-outline-secondary border-0"
          rel="noreferrer"
        >
          Agregar
        </Link>
      </div>
    </div>
  );
};


export default CardPr;