import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import logo from '../../images/logo.png';
import star from '../../images/star.png';
import { Link, useNavigate } from 'react-router-dom';
import { useMyContext } from '../../context';
import Modal from 'react-modal';

//VENTANA EMERGENTE PARA ACCIONAR 
const CambioZona = ({ onRequestClose }) => {
    const [state, setState] = useMyContext();
    const navigate = useNavigate()
    const [depCambio, setDepCambio] = useState(0)
    const [munCambio, setMunCambio] = useState(0)

    useEffect(() => {
        //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
    }, []);


    const handleAceptarSol = () => {
        onRequestClose();
    };

    const handleRechazarSol = () => {
        onRequestClose();
    };
    return (

        <div className='container col-6'>
            <h2>Aceptar o Rechazar</h2>
            <div className="row">
                <div className="col-2"></div>
                <button className='btn btn-primary col-2 btnEffect' onClick={handleAceptarSol}>
                    Aceptar
                </button>
                <div className="col-4"></div>
                <button className='btn btn-primary col-2 btnEffect' onClick={handleRechazarSol}>
                    Rechazar
                </button>
                <div className="col-2"></div>
            </div>
        </div>
    );
};


export default CambioZona;
