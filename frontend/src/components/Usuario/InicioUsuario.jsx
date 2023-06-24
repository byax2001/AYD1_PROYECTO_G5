import React, { useState,useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import Card from './cardsEmp';
import CardsC from './cardsCatego';
import fondo1 from '../../images/fondoCard.jpg';



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
        id_empresa: 16,
        nombre: "Alitas Chapincitas",
        descripcion_empresa: "Deliciosas Alitas",
        email: "456654@gmail.com",
        tipo_empresa_id_tipo: 1,
        telefono: "31778200"
    },
    {
        id_empresa: 17,
        nombre: "Campero",
        descripcion_empresa: "pollo frito",
        email: "opena@gmail.com",
        tipo_empresa_id_tipo: 1,
        telefono: "12345678"
    },
    {
        id_empresa: 18,
        nombre: "Pizza Hut",
        descripcion_empresa: "Variedad de pizzas",
        email: "pizzahut@gmail.com",
        tipo_empresa_id_tipo: 2,
        telefono: "98765432"
    },
    {
        id_empresa: 19,
        nombre: "Burger King",
        descripcion_empresa: "Hamburguesas y papas fritas",
        email: "burgerking@gmail.com",
        tipo_empresa_id_tipo: 2,
        telefono: "56789012"
    },
    {
        id_empresa: 20,
        nombre: "Starbucks",
        descripcion_empresa: "Cafetería y bebidas",
        email: "starbucks@gmail.com",
        tipo_empresa_id_tipo: 3,
        telefono: "34567890"
    },
    {
        id_empresa: 21,
        nombre: "Subway",
        descripcion_empresa: "Subs y sándwiches",
        email: "subway@gmail.com",
        tipo_empresa_id_tipo: 2,
        telefono: "67890123"
    },
    {
        id_empresa: 22,
        nombre: "Dominos",
        descripcion_empresa: "Pizzas y aperitivos",
        email: "dominos@gmail.com",
        tipo_empresa_id_tipo: 2,
        telefono: "01234567"
    }
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
                        {/*<button className="btn btn-outline-success" type="submit" onClick={()=>prueba()}>Ir A</button> */}
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
                        className="btn btn-outline-success">Ir A</Link>
                    </div>
            </nav>  
            <div className='container'>
                

                <div>
                    <br />
                    <br />
                    
                </div>
                
                <div className="container d-flex justify-content-center align-items-center h-100">
                    <div className="row">
                        <div className="col-md-8" >
                            <div className="card text-center bg-dark animate__animated animate__fadeInUp">
                                <div className="overflow">
                                <img src={fondo1} alt="a wallpaper" className="card-img-top" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="h2 text-light">Restaurantes Recomendados</div>
                <div className="App">
                    <Card />
                </div>
                <br>
                </br>
                <div className="h2 text-light">Categorias de Productos</div>
                <div className="App">
                    <CardsC />
                </div>
            </div>
        </React.Fragment>


    );
};

export default Iniciouser;