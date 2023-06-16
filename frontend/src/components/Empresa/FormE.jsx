import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Form = ({ selectedRow }) => {


    const [nameR, setNameR] = useState('');
    const [tipoR, setTipoR] = useState('');
    const [descR, setDescR] = useState('');

   
    /*console.log("pru",tipoR)
    console.log("pru",descR)*/

    const [data, setData] = useState(selectedRow || []);

    


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    const handleClick = () => {
        console.log('fila a modificar: ',data)
        console.log('Datos a Almacenar: ',nameR, ' ',tipoR,' ',descR)
        alert('Se guardaran los datos: ',nameR, ' ',tipoR,' ',descR, ' Estos Datos corresponde a la Fila: ',data);

      };
      

  return (

    <div>
        <div className='container' >
            <h2>Edicion de Producto</h2>
            <p>Valores:</p>
            {/* <pre>{JSON.stringify(selectedRow, null, 2)}</pre>*/}
            
            {/*Formulario: */}

            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Producto: {selectedRow.producto}</label>
            <input id="idp" className="form-control form-control-lg" type="text" aria-label=".form-control-lg example" onChange={(e) => setNameR(e.target.value)}></input>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Tipo: {selectedRow.tipo}</label>
            <input id="idt" className="form-control form-control-lg" type="text" aria-label=".form-control-lg example" onChange={(e) => setTipoR(e.target.value)}></input>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Descripcion: {selectedRow.descripcion}</label>
            <input id="idd" className="form-control form-control-lg" type="text" aria-label=".form-control-lg example" onChange={(e) => setDescR(e.target.value)}></input>
            </div>
            <button  className='btn btn-secondary' onClick={() => handleClick()}>
              Guardar
            </button>
        
        </div>
    </div>
    
  );
};

export default Form;
