import React from "react";
import CardC from "./cardCategoria";

import image1 from '../../images/logo.png';



const data = [
    {
      id_tipo_producto: 1,
      nombre_tipo_prod: "Plato Fuertes"
    },
    {
      id_tipo_producto: 2,
      nombre_tipo_prod: "Entrada"
    },
    {
      id_tipo_producto: 3,
      nombre_tipo_prod: "Bedidas"
    },
  
    {
      id_tipo_producto: 4,
      nombre_tipo_prod: "Dulces"
    }
  ]

/// aqui manipulo todas las cartas:

const CardsC = () => {


  return (

    <div>
      <div className="container d-flex justify-content-center align-items-center h-100">
        <div className="row">
            
          {data.map(({id_tipo_producto,nombre_tipo_prod}) => (
            <div className="col-md-2" key={id_tipo_producto}>
              <CardC imageSource={image1} title={nombre_tipo_prod} id={id_tipo_producto} />
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}

export default CardsC;