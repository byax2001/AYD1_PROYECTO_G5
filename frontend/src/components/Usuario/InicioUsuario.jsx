import React, { useState,useEffect  } from 'react';
import logo from '../../images/logo copy.png';
import { Link, useNavigate } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import Card from './cardsEmp';
import CardsC from './cardsCatego';
import fondo1 from '../../images/fondoCard.jpg';
import "./css/inicio.css";
import Carrito from './Carrito/Carrito';
import axios from 'axios';

const Iniciouser = () => {
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const [data, setData] = useState([]);

    const [suggestions, setSuggestions] = useState([]);




    useEffect(() => {
     
        if(localStorage.getItem('rol')!=1){
            navigate("/")
            return
        }
    
        //realizar la carga de datos antes del filtro
        setSuggestions(
            data.filter(item =>
              item.nombre.toLowerCase().includes(searchValue.toLowerCase())
            )
          );
    
        //Metodos de peticion de Restaurantes:
        fetchData();

    }, [searchValue]);

    //Obtencion de Datos de Empresa:
    const fetchData = async () => {
        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              };
          const response = await axios.get(`${process.env.REACT_APP_API_CONSUME}/api/reports/top5restaurant`,config); // Reemplaza 'URL_DEL_SERVIDOR' con la URL correcta
          const data = response.data; // Obtener los datos de la respuesta
          setData(data.data); // Actualizar los datos del componente
          console.log('Datos Obtenidos:', data.data);
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      };
      
    ///Prueba:

    const getSuggestionValue = suggestion => suggestion.nombre;

    const renderSuggestion = suggestion => 
        <div className='text-dark'>{suggestion.nombre}</div>;

    const onChange = (event, { newValue }) => setSearchValue(newValue);

    const inputProps = {
        placeholder: 'Busqueda',
        value: searchValue,
        onChange,
    };


      const guardarReb = () =>{
        console.log("AQUIIIII",searchValue);
        localStorage.setItem("titleres",searchValue);///-----------------------------------------aqui me quede ver mañana

        console.log("ID",obtenerId(searchValue));
        localStorage.setItem("idres",obtenerId(searchValue));

      }

      const obtenerId = (searchValue) => {
        const empresa = data.find((item) => item.nombre === searchValue);
        if (empresa) {
          return empresa.id_empresa;
        } else {
          return null; // o el valor que consideres adecuado si no se encuentra el ID
        }
      };

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light position-relative">
                <img id="logoStar" src={logo} alt="Logo" />
                <a className="navbar-brand" href="/">AlChilazo</a>
                <div className="h2 text-light">Inicio de Usuario</div>
                <div className="btnRT">
                    <div className="d-inline-flex" id='suggest_r'>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={() => { }}
                            onSuggestionsClearRequested={() => { }}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                        />

                    </div>
                    <div className='btn-group d-inline-flex' data-toggle="buttons">
                        <Link
                            onClick={guardarReb}
                            to={
                                searchValue === ''
                                    ? { pathname: '/inicioU' }
                                    : {
                                        pathname: `/panelE/${encodeURIComponent(searchValue)}`,
                                        state: { title: searchValue },
                                    }
                            }
                            className="btn text-light btnEffect btn-warning">Ir A</Link>

                        <span className="dropdown-divider">|</span>{/* Para separar los botones */}
                        <Link to="/" className="btn textForm text-light btnEffect btn-warning">Cerrar Sesion</Link>
                    </div>
                </div>
            </nav>
            <Carrito/>
            <div className='container mt-3'>
                <div className="row">
                    <div className="col-12" >
                        <div className="card text-center bg-dark animate__animated animate__fadeInUp">
                            <div className="overflow">
                                <img id="iHero" src={fondo1} alt="a wallpaper" className="card-img-top" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                <div className="h2 text-light mt-2">Restaurantes Recomendados</div>
                </div>
                <div className="row">
                    <div className="App col-12">
                        <Card />
                    </div>
                </div>
                <div className="row">
                <div className="h2 text-light mt-3">Categorias de Productos</div>
                </div>
                <div className="row">
                <div className="App">
                    <CardsC />
                </div>
                </div>
                
            </div>
        </React.Fragment>


    );
};

export default Iniciouser;