import React, { useState, useEffect} from 'react'
import logo from '../../images/logo copy.png';
import { Link, useNavigate } from 'react-router-dom';
import ListaHistorial from './ListaHistorial';

function Historial() {
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('rol')!=1){
          navigate("/")
        }
     },[])

    return (
        <React.Fragment>
            <div className="wall2">
                <nav className="navbar navbar-expand-lg navbar-light position-relative">
                    <img id="logoLP" src={logo} alt="Logo" />
                    <a className="navbar-brand" >AlChilazo</a>
                    <div className="h2 text-light">Historial Pedidos </div>
                    <Link to="/inicioU" className="btn textForm text-light btnEffect btnRT">Regresar</Link>
                </nav>

                <div className="container">
                    <div className="row mt-4">
                        <div className="col-12">
                            <ListaHistorial />
                        </div>
                        
                    </div>
                </div>

            </div>

        </React.Fragment>
    )
}

export default Historial