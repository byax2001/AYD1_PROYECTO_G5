import React, { useState,useEffect  } from 'react';
import { Link } from 'react-router-dom';
import icarrito from './images/carrito.png'
import ihistorial from './images/historial.png'

import './carrito.css'


const Carrito = () => {
   
    useEffect(() => {
     
    }, []);
      

    return (
        <div id='divCarrito'>
            <div className="row mb-4">
                <div className="col-12">
                    <Link to={"/pedidoCliente"}>
                        <img src={icarrito}
                            className='bg-dark'
                            alt="Logo" id="icarrito"
                            onMouseOver={(e) => e.target.classList.add('brillo')}
                            onMouseOut={(e) => e.target.classList.remove('brillo')} />
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {/* <Link to='/historialPedidos' className="btn textForm text-light btnEffect btn-warning">Historial de Pedidos</Link> */}
                    <Link to={"/historialPedidos"}>
                        <img src={ihistorial}
                            className='bg-dark'
                            alt="Historial Pedidos" id="icarrito"
                            onMouseOver={(e) => e.target.classList.add('brillo')}
                            onMouseOut={(e) => e.target.classList.remove('brillo')} />
                    </Link>
                </div>
            </div>


        </div>
    );
};

export default Carrito;