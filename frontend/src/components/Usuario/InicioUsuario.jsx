import React, { useState,useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import Card from './cardsEmp';

const customStyles = {
    noData: {
        style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#a2a2a2',
        },
    },
    header: {

        style: {
            justifyContent: 'center',
            fontSize: '22px',
            color: 'white',
            backgroundColor: "#3a3a3a",
            minHeight: '56px',
            paddingLeft: '16px',
            paddingRight: '8px',
        },
    },
    rows: {
        //para variar colores entre fila y fila 
        //style fila 1
        //stripedstyle fila2
        style: {
            fontSize: '16px',
            backgroundColor: "#9b9b9b",
            color: "white"
        },
        stripedStyle: {
            backgroundColor: "#646464",
        },
    },
    headCells: {
        style: {
            
            backgroundColor: "#3a3a3a",
            color: "white"
        },
    },

    pagination: {
        style: {
            fontSize: '13px',
            color: 'white',
            minHeight: '56px',
            backgroundColor: '#3a3a3a',
            borderTopStyle: 'solid',
            borderTopWidth: '4px',
            borderTopColor: 'd2d2d2',
        }
    }
};
const data = [
    {
        nombre: 'Chorizo Argentino',   
        id:17,
    },
    {
        nombre: 'Queso Doble', 
        id:7,
    },
    {
        nombre: 'Bacon',
        id:1
    },
  ];


const Iniciouser = () => {

    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        //realizar la carga de datos antes del filtro
        setSuggestions(
            data.filter(item =>
              item.nombre.toLowerCase().includes(searchValue.toLowerCase())
            )
          );
    }, [searchValue]);
      
    ///Prueba:

    const getSuggestionValue = suggestion => suggestion.nombre;

    const renderSuggestion = suggestion => <div>{suggestion.nombre}</div>;

    const onChange = (event, { newValue }) => setSearchValue(newValue);

    const inputProps = {
        placeholder: 'Busqueda',
        value: searchValue,
        onChange,
    };

    const prueba = () => {
        console.log(searchValue)
      };


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light position-relative">
                <img id="logoStar" src={logo} alt="Logo" />
                <a className="navbar-brand" href="/">AlChilazo</a>
                <div className="h2 text-light">Inicio de Usuario</div>
                <div className="btn-group d-inline-flex" data-toggle="buttons">
                    {/*aqui colocaria los link para visitar */}
                    <Link to="/" className="btn textForm text-light">Cerrar Sesion</Link>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 'auto' }}>                    
                    <form className="d-flex" role="search">
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={() => {}}
                            onSuggestionsClearRequested={() => {}}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                        />
                    </form> 
                    <button className="btn btn-outline-success" type="submit" onClick={()=>prueba()}>Search</button>
                </div>
            </nav>

            <div>
                <br />
                <br />
                
            </div>
            <div className="App">
                <Card />
            </div>
        </div>

    );
};

export default Iniciouser;