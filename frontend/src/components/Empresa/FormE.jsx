import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Form = ({ selectedRow, closeModal ,filteredDataV }) => {


    const [nameR, setNameR] = useState('');
    const [tipoR, setTipoR] = useState('');
    const [descR, setDescR] = useState('');
    const [image, setImage] = useState(null);
    const [precio, setPrecio] = useState(null);
    

   
    /*console.log("pru",tipoR)
    console.log("pru",descR)*/

    const [data, setData] = useState(selectedRow || []);

    


    

    const handleClick = async () => {
        console.log('fila a modificar: ',data, data.id)
        console.log('Datos a Almacenar: ',nameR, ' Tipo',tipoR ,' Descp',descR, ' Precio: ', precio)
        console.log('Imagen:', image);

        

        //----
          const url = `${process.env.REACT_APP_API_CONSUME}/api/products`;
          const dataFD = new FormData();
          console.log("######################################################")
          console.log(selectedRow)
          dataFD.append('nombre', nameR ? nameR : selectedRow.nombre_producto)
          dataFD.append('descripcion', descR ? descR : selectedRow.descripcion_producto)
          dataFD.append('tipo', tipoR ? tipoR : selectedRow.tipo_producto)
          dataFD.append('empresa', selectedRow.empresa_id_empresa)  
          if(selectedRow.combo == "SI"){
            dataFD.append('combo', 1) 
          }else{
            dataFD.append('combo', 0) 
          }
          
          dataFD.append('precio', precio ? precio : selectedRow.precio_producto)
          dataFD.append('idproduct', selectedRow.id_producto)
          if (image) dataFD.append('image', image)
          else{
            dataFD.append('imagenold', selectedRow.imagen_producto)
          }
      
      
          let config = {
              method: "PUT", //ELEMENTOS A ENVIAR
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


        //----

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

      const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setTipoR(selectedValue);
        // Realiza las acciones que necesites con el valor seleccionado
        console.log('Valor seleccionado:', selectedValue);
      };
    
      

  return (

    <div>
        <div className='container' >
            <h2>Edicion de Producto</h2>
            <p>Valores:</p>
            {/* <pre>{JSON.stringify(selectedRow, null, 2)}</pre>*/}
            
            {/*Formulario: */}

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Producto: {selectedRow.nombre_producto}</label>
              <input id="idp" className="form-control form-control-lg" type="text" aria-label=".form-control-lg example" onChange={(e) => setNameR(e.target.value)}></input>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Tipo: {selectedRow.tipo_producto_id_tipo_producto}</label>
              <select className="form-select" aria-label="Default select example" defaultValue="default" onChange={handleSelectChange}>
              <option value="default">Seleccione el Tipo</option>
              {filteredDataV.map((item) => (
                <option key={item.id_tipo_producto} value={item.id_tipo_producto}>{item.nombre_tipo_prod}</option>
              ))}
            </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Descripcion: {selectedRow.descripcion_producto}</label>
              <input id="idd" className="form-control form-control-lg" type="text" aria-label=".form-control-lg example" onChange={(e) => setDescR(e.target.value)}></input>
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Imagen:
              </label>
              <input id="image" className="form-control" type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="mb-3">
               <label htmlFor="exampleFormControlInput1" className="form-label">Precio: {selectedRow.precio_producto}</label>
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
