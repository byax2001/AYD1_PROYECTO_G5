import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const FormRP = () => {//aqui debo indicarle que espero el valor empresa


    const [nameR, setNameR] = useState('');
    const [descR, setDescR] = useState('');
    const [precio, setPrecio] = useState(null);
    const [tipoR, setTipoR] = useState('');
    const [empresa, setEmpresa] = useState(1);///Falta recibir dato
    const [combo, setCombo] = useState(null);
    const [image, setImage] = useState(null);
    

   
    /*console.log("pru",tipoR)
    console.log("pru",descR)*/

   


    

    const handleClick = async () => {
        console.log('Datos a Almacenar: ',nameR, ' Tipo',tipoR ,' Descp',descR, ' Precio: ', precio,'Combo: ',combo);
        console.log('Imagen:', image);

            //----
            const url = `http://localhost:4000/api/products`;
            const dataFD = new FormData();
            dataFD.append('nombre', nameR)
            dataFD.append('descripcion', descR)
            dataFD.append('tipo', tipoR)
            dataFD.append('empresa', empresa)  
            dataFD.append('combo', combo) 
            dataFD.append('precio', precio)
            dataFD.append('image', image)
            
            let config = {
                method: "POST", //ELEMENTOS A ENVIAR
                body: dataFD,
            };
            try{
                const res = await fetch(url, config);
                
                const data_res = await res.json();
                
                console.log(data_res)
                alert(data_res.message);
                //console.log(votoC)
                //setVotos(votoC)
            }catch(e){
                console.log(e)
            }
      
      


        setNameR('');
        setTipoR('');
        setDescR('');
        setPrecio('');
        setCombo('');
        setImage(null);

        // Limpia los valores de los inputs
    
      };

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
      };
    
      

  return (

    <div>
        <div className='container' style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '5px' }}>
            <p>Valores:</p>
            {/* <pre>{JSON.stringify(selectedRow, null, 2)}</pre>*/}
            
            {/*Formulario: */}

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Producto</label>
              <input id="idp" className="form-control form-control-lg" type="text" aria-label=".form-control-lg example" onChange={(e) => setNameR(e.target.value)}></input>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Tipo</label>
              <input id="idt" className="form-control form-control-lg" type="text" aria-label=".form-control-lg example" onChange={(e) => setTipoR(e.target.value)}></input>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Combo</label>
              <input id="idt" className="form-control form-control-lg" type="text" aria-label=".form-control-lg example" onChange={(e) => setCombo(e.target.value)}></input>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Descripcion</label>
              <input id="idd" className="form-control form-control-lg" type="text" aria-label=".form-control-lg example" onChange={(e) => setDescR(e.target.value)}></input>
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Imagen:
              </label>
              <input id="image" className="form-control" type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="mb-3">
               <label htmlFor="exampleFormControlInput1" className="form-label">Precio</label>
              <input id="idd" className="form-control form-control-lg" type="text" aria-label=".form-control-lg example" onChange={(e) => setPrecio(e.target.value)}></input>
            </div>

            <div className="mb-3">
              <button  className='btn btn-secondary' onClick={() => handleClick()}>
                Guardar
              </button>
            </div>
            

            
        
        </div>
    </div>
    
  );
};

export default FormRP;