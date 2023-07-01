import React, { useState,useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../images/logo copy.png';
import { Link,useNavigate } from 'react-router-dom';
import CardPr from './cardProducto';
import image2 from '../../images/quesoB.png';
import axios from 'axios';


//<Form selectedRow={selectedRow} closeModal={closeModal} filteredDataV={filteredDataV} />
const PanelCa = () => {
    const navigate = useNavigate()
    const categoria = localStorage.getItem("categoria");
    console.log(localStorage.getItem("categoria"));
    const idCate = localStorage.getItem("idCategoria");
    console.log(localStorage.getItem("idCategoria"));
  

    //const { title } = location.state;


    /********************************************** */

    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('rol')!=1){
            navigate("/")
            return
        }
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {

            const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              };
          const response = await axios.get(`${process.env.REACT_APP_API_CONSUME}/api/products/type/${idCate}`,config); // Reemplaza 'URL_DEL_SERVIDOR' con la URL correcta
          const data = response.data; // Obtener los datos de la respuesta
          setFilteredData(data.data); // Actualizar los datos del componente
          console.log('Datos Obtenidos:', data.data);
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      };



    return (
        <div className="wall2">
            <nav className="navbar navbar-expand-lg navbar-light position-relative">
                <img id="logoStar" src={logo} alt="Logo" />
                <a className="navbar-brand" >AlChilazo</a>
                <div className="h2 text-light">Categoria de: {categoria} </div>
                <Link to="/inicioU" className="btn textForm text-light btnEffect btnRT">Regresar</Link>

            </nav>
            <div className="container">
                <div className="h2 text-light row">
                    <div className="col-12 bg-dark rounded">
                        Productos a la venta
                    </div>
                </div>
                <div className="container d-flex justify-content-center align-items-center h-100">
                    <div className="row">
                        {filteredData.length === 0 ? (
                            <div className='bg-dark rounded'>
                                <h2 className='textForm text-light'>Sin productos para esta categoria</h2>
                            </div>
                        ) : (

                            filteredData.map(({ nombre_producto, imagen_producto, id_producto, descripcion_producto, precio_producto }) => (
                                <div className="col-md-2" key={id_producto}>
                                    <CardPr imageSource={imagen_producto} title={nombre_producto} id={id_producto} text={descripcion_producto} precio={precio_producto} />
                                </div>
                            ))

                        )}
                    </div>
                </div>
            </div>
        </div>


    );
};

export default PanelCa;