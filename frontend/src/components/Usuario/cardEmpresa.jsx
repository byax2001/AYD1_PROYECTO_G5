import React from "react";
import PropTypes from "prop-types";
import { Link,BrowserRouter  } from 'react-router-dom';


import "./card.css";

function Card({ imageSource, title, text, id }) {

  const guardarRes= ()  =>{
    localStorage.setItem("titleres",title);
    localStorage.setItem("idres",id);
      
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
        <Link 
          
          onClick={guardarRes()}
          to={{
            pathname:`/panelE/${encodeURIComponent(title)}`,
            state: { title: title }
          }}

          //target="_blank"  /// este es para que lo abra en otra pestaña
          className="btn btn-outline-secondary border-0"
          rel="noreferrer"
        >
          Visitar {title}
        </Link>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  imageSource: PropTypes.string
};

export default Card;