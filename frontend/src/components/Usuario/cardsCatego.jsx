import React, { useState,useEffect  } from 'react';

import axios from 'axios';
import CardC from "./cardCategoria";

import image1 from '../../images/logo copy.png';


/*
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
*/
/// aqui manipulo todas las cartas:

const CardsC = () => {


  const [fildata, setFilData] = useState([]);



  useEffect(() => {
    
    fetchDataC();
  }, []);


  const fetchDataC = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_CONSUME}/api/products/type`); // Reemplaza 'URL_DEL_SERVIDOR' con la URL correcta
      const data = response.data; // Obtener los datos de la respuesta
      setFilData(data.data); // Actualizar los datos del componente
      console.log('Datos Obtenidos:', data.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };


  return (

    <div>
      <div className=" container-fluid">
        <div className="row">
          {/* SE DEBE DE MODIFICAR ASI PARA OBTENER EL LINK DE LA IMAGEN DEL PRODUCOT
            {data.map(({img_producto, id_tipo_producto,nombre_tipo_prod}) => (
          */}
          {fildata.map(({id_tipo_producto,nombre_tipo_prod}) => (
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