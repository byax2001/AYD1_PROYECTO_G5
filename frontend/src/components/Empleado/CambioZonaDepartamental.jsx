import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import logo from '../../images/logo.png';
import star from '../../images/star.png';
import { Link, useNavigate } from 'react-router-dom';
import { useMyContext } from '../../context';
import Modal from 'react-modal';

//VENTANA EMERGENTE PARA ACCIONAR 
const CambioZona = ({ onRequestClose, idUser }) => {
    const [state, setState] = useMyContext();
    const navigate = useNavigate()
    const [depCambio, setDepCambio] = useState(0)
    const [munCambio, setMunCambio] = useState(0)
    const [formData, setFormData] = useState({ municipio: 0, departamento: 0 })

    const [showMunicipios, setShowMunicipios] = useState(false)
    const [municipios, setMunicipios] = useState([])
    const [departamentos, setDepartamentos] = useState([])

    useEffect(() => {
        //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
        getDepartamentos()
    }, []);


    const handleAceptarSol = () => {
        onRequestClose();
    };

    const handleRechazarSol = () => {
        onRequestClose();
    };

    const handleChange = (event) => {
        const { name, value, type, checked, files } = event.target;
        const fieldValue = value;
    
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: fieldValue,
        }));
    
        if(name ==="departamento"){
          if(value==0){
            setShowMunicipios(false);
            setFormData((prevFormData) => ({
              ...prevFormData,
              ["municipio"]: 0,
            }));
          }else{
            //METODO PARA RELLENAR MUNICIPIOS 
            getMunicipios(value);
            //MOSTRAR DEPARTAMENTOS
            setShowMunicipios(true)
          }
          
        }
      };

    //GET
    const getMunicipios = async (departamento) => {
        const url = `${process.env.REACT_APP_API_CONSUME}/api/departamento/municipio/${departamento}`;
        let config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };

        try {
            const res = await fetch(url, config);
            const data_res = await res.json();
            setMunicipios(data_res.data)
        } catch (e) {
            console.log(e)
        }

    }
    //getDepartamentos
    const getDepartamentos = async () => {
        const url = `${process.env.REACT_APP_API_CONSUME}/api/departamento`;
        let config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };

        try {
            const res = await fetch(url, config);
            const data_res = await res.json();
            setDepartamentos(data_res.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (

        <div className='container'>
            <div className="text-center row mb-5"><h2 className=''>Cambiar Area de Trabajo</h2></div>
            <div className="row mb-3">
                
                    <select onChange={handleChange} name="departamento" className='form-select'>
                        <option value={0}>Seleccione Departamento</option>
                        {departamentos.map((departamento) => (
                            <option key={departamento.id_departamento} value={departamento.id_departamento}>
                                {departamento.nombre_dep}
                            </option>
                        ))}
                    </select>
            </div>
            {showMunicipios && (<div className="row mb-3">
                    <select onChange={handleChange} name="municipio" className='form-select'>
                        <option value={0}>Seleccione Municipio</option>
                        {municipios.map((municipio) => (
                            <option key={municipio.id_municipio} value={municipio.id_municipio}>
                                {municipio.nombre_municipio}
                            </option>
                        ))}
                    </select>
            </div>)}
            
            <div className="row">
                <div className="col-2"></div>
                <button className='btn btn-primary col-3 btnEffect btn-secondary' onClick={handleAceptarSol}>
                    Cambiar
                </button>
                <div className="col-2"></div>
                <button className='btn btn-primary col-3 btnEffect btn-secondary' onClick={handleRechazarSol}>
                    Cancelar
                </button>
                <div className="col-2"></div>
            </div>
        </div>
    );
};


export default CambioZona;
