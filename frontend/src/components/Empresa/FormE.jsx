import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Form = ({ selectedRow, closeModal  }) => {


    const [nameR, setNameR] = useState('');
    const [tipoR, setTipoR] = useState('');
    const [descR, setDescR] = useState('');
    const [image, setImage] = useState(null);
    const [precio, setPrecio] = useState(null);
    

   
    /*console.log("pru",tipoR)
    console.log("pru",descR)*/

    const [data, setData] = useState(selectedRow || []);

    


    

    const handleClick = () => {

       
      if (nameR.trim() === '' || tipoR.trim() === ''|| tipoR.trim() === ''|| descR.trim() === ''|| precio.trim() === '') {
        alert('Por favor, complete todos los campos');
        
        return;
      }
        console.log('fila a modificar: ',data, data.id)
        console.log('Datos a Almacenar: ',nameR, ' Tipo',tipoR ,' Descp',descR, ' Precio: ', precio)
        console.log('Imagen:', image);

        alert('Se guardaran los datos: '+ nameR + ' '+ tipoR +' '+descR+ ' '+ precio + ' '+ ' Estos Datos corresponde a la Fila: '+ data.id);

        setNameR('');
        setTipoR('');
        setDescR('');
        setPrecio('');
        setImage(null);
        closeModal();

      };

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
      };
    
      

  return (

    <div>
        <div className='container' >
            <h2>Edicion de Producto</h2>
            <p>Valores:</p>
            {/* <pre>{JSON.stringify(selectedRow, null, 2)}</pre>*/}
            
            {/*Formulario: */}

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Producto: {selectedRow.nombre}</label>
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

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Imagen:
              </label>
              <input id="image" className="form-control" type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="mb-3">
               <label htmlFor="exampleFormControlInput1" className="form-label">Precio: {selectedRow.precio}</label>
              <input id="idd" className="form-control form-control-lg" type="text" aria-label=".form-control-lg example" onChange={(e) => setPrecio(e.target.value)}></input>
            </div>

            <div className="mb-3">
              <button  className='btn btn-secondary' onClick={() => handleClick()}>
                Guardar
              </button>
            </div>
            <div className="mb-3">
              <button  className='btn btn-secondary' onClick={() => closeModal()}>
                Cancelar
              </button>
            </div>
            

            
        
        </div>
    </div>
    
  );
};

export default Form;
