import React, { useState, useContext, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import ReactTable from 'react-data-table-component';
import logo from '../../images/logo copy.png';
import { Link, useNavigate} from 'react-router-dom';
import { useMyContext } from '../../context';
import PedidosPendientes from './PedidosPendientes';
import PedidoAsignado from './PedidoAsignado';

const Inicio = () => {
  //const { infoUser, setInfoUser } = useContext(MyContext);
  const [state, setState] = useMyContext();
  const navigate=useNavigate()
 
  useEffect(() => {
    console.log(state)
    if(state.rol!=2){
      navigate("/")
    }
    //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
  },[]);


  return (
    <div className="wall2">
      <nav className="navbar navbar-expand-lg navbar-light position-relative">
        <img id="logoStar" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">AlChilazo</a>
        <div className="h2 text-light">Inicio</div>
        <div className="btn-group d-inline-flex" data-toggle="buttons">
          <Link to="/emp/Miperfil" className="btn textForm text-light">Miperfil</Link>
          <Link to="/" className="btn textForm text-light">Cerrar Sesion</Link>
        </div>
      </nav>
      <div className="container">
        <div className="row mt-4">
          <div className="col-7">
            <PedidosPendientes />
          </div>
          <div className='col-5'>
            <PedidoAsignado />
          </div>
        </div>
      </div>
    </div>


  );
};

export default Inicio;