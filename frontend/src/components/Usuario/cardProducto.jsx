import React from "react";
import PropTypes from "prop-types";
import { Link,BrowserRouter  } from 'react-router-dom';

import "./card.css";


// imageSource={imagen_producto} title={nombre_producto} id={id_producto} text={descripcion_producto} precio={precio_producto} 

const CardPr = ({imageSource, title,id ,text, precio,producto_id }) => {

  const AgregarCarrito = () =>{
    var objeto = {
      id_producto: id ,
      nombre_producto: title,
      precio_producto: precio,
      cantidad: 1,
      tipo_producto_id_tipo_producto: producto_id
    }
    var bandera = true;
    var carrito = [];
    var storedCarrito = window.localStorage.getItem('carrito');
    if (storedCarrito == null || storedCarrito =='undefined') {
        carrito = [];
    } else {
        carrito = JSON.parse(storedCarrito);
    }
    if (carrito.length > 0)
    {
      for (let index = 0; index < carrito.length; index++) {
        if(carrito[index].id_producto == id){
          bandera = false;
          carrito[index].cantidad = carrito[index].cantidad + 1;
          alert('Se agrego el producto al Carrito');
          break;
        }
        
      }
      if(bandera) {
        carrito.push(objeto)
        alert('Se agrego el producto al Carrito');
      } 
    }else {
      carrito.push(objeto)
      alert('Se agrego el producto al Carrito');
    }
    
    try {
      console.log(carrito)
      localStorage.setItem('carrito', JSON.stringify(carrito))
   } catch (error) {
       console.error(error)
   }

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