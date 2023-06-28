import React, { useState,useEffect  } from 'react';
import { Link } from 'react-router-dom';
import icarrito from './images/carrito.png'
import './carrito.css'


const Carrito = () => {
   
    useEffect(() => {
     
    }, []);
      

    return (
        <div id='divCarrito'>
            <Link to={"/pedidoCliente"}>
                <img src={icarrito}
                    className='bg-dark'
                    alt="Logo" id="icarrito"
                    onMouseOver={(e) => e.target.classList.add('brillo')}
                    onMouseOut={(e) => e.target.classList.remove('brillo')} />
            </Link>

        </div>
    );
};

export default Carrito;