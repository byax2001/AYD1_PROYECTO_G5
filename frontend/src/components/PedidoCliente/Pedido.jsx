import React, { useState,useEffect } from 'react'
import logo from '../../images/logo copy.png';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header'
import Form from './Form'
import Lista from './Lista'
import "./lista.css";
import useLocalStorage from './useLocalStorage'

function Pedido() {
    const navigate=useNavigate()
    var carrito = [];
    var storedCarrito = window.localStorage.getItem('carrito');
    if (storedCarrito == null || storedCarrito =='undefined') {
        carrito = [];
    } else {
        carrito = JSON.parse(storedCarrito);
    }

    const [input, setInput] = useState("");
    useLocalStorage('carrito', carrito)

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
                <div className="h2 text-light">Carrito </div>
                <Link to="/inicioU" className="btn textForm text-light btnEffect btnRT">Regresar</Link>
            </nav>

            <div className='container contPedido mt-2'>
                <div className='app-wrapper'>
                    <div>
                        <Header></Header>
                    </div>
                    <div>
                        <Form input={input}
                            setInput={setInput}
                            lista={carrito}
                        ></Form>
                    </div>
                    <div>
                        <Lista todos={carrito} ></Lista>
                    </div>
                </div>

            </div>
            </div>
            
        </React.Fragment>
    )
}

export default Pedido