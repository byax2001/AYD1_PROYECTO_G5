import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useMyContext } from '../../context';

const comboInfo = [
  {
    id:0,
    descripcion: 'Individual',
  },{
    id:1,
    descripcion: 'Combo',
  }
];

const FormRP = () => {//aqui debo indicarle que espero el valor empresa

    const [state, setState] = useMyContext();
    const [nameR, setNameR] = useState('');
    const [descR, setDescR] = useState('');
    const [precio, setPrecio] = useState(null);
    const [tipoR, setTipoR] = useState('');
    const [empresa, setEmpresa] = useState(1);///Falta recibir dato
    const [combo, setCombo] = useState(null);
    const [image, setImage] = useState(null);

    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
      console.log("Uses STATE---------------------------------------\n")
      console.log(state)
      fetchData(); // Realizar la petición al cargar el componente
    },[]);
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_CONSUME}/api/products/type`); // Reemplaza 'URL_DEL_SERVIDOR' con la URL correcta
        const data = response.data; // Obtener los datos de la respuesta
        setFilteredData(data.data); // Actualizar los datos del componente
        console.log('Datos Obtenidos:', data.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    

   
    /*console.log("pru",tipoR)
    console.log("pru",descR)*/

   


    

    const handleClick = async () => {
        console.log('Datos a Almacenar: ',nameR, ' Tipo',tipoR ,' Descp',descR, ' Precio: ', precio,'Combo: ',combo);
        console.log('Imagen:', image);

            //----
            const url = `${process.env.REACT_APP_API_CONSUME}/api/products`;
            const dataFD = new FormData();
            dataFD.append('nombre', nameR)
            dataFD.append('descripcion', descR)
            dataFD.append('tipo', tipoR)
            dataFD.append('empresa', state.data.idempresa)  
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
    

      const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setTipoR(selectedValue);
        // Realiza las acciones que necesites con el valor seleccionado
        console.log('Valor seleccionado:', selectedValue);
      };

      const handleSelectChangeC = (event) => {
        const selectedValue = event.target.value;
        setCombo(selectedValue);
        // Realiza las acciones que necesites con el valor seleccionado
        console.log('Valor seleccionado:', selectedValue);
      };
      
      

  return (

    <div>
      <div className='container' style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '5px' }}>

        {/*Formulario: */}
        <div className="row">
          <div className="col-2" />
          <div className="col-8">
            <div className="row">
              <div className="col-12">
                <h4 className='textForm'>Valores:</h4>
              </div>
            </div>

            <div className="row mb-3 textForm">
              <div className="col-2">
                <label htmlFor="exampleFormControlInput1" className="form-label">Producto:</label>
              </div>
              <div className="col-10">
                <input id="idp"
                  className="form-control form-control-lg"
                  type="text" aria-label=".form-control-lg example"
                  placeholder='Ingrese el nombre del producto'
                  onChange={(e) => setNameR(e.target.value)}></input>
              </div>
            </div>
            {/*
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Tipo</label>
              <input id="idt" className="form-control form-control-lg" type="text" aria-label=".form-control-lg example" onChange={(e) => setTipoR(e.target.value)}></input>
            </div>*/}

            {/*--------------------------------------------------------------------------- */}
            {/*
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Combo</label>
              <input id="idt" className="form-control form-control-lg" type="text" aria-label=".form-control-lg example" onChange={(e) => setCombo(e.target.value)}></input>
            </div>*/}

            <div className="row mb-3">
              <select className="form-select" aria-label="Default select example" defaultValue="default" onChange={handleSelectChangeC}>
                <option value="default">Indique si el Producto es Combo o Individual</option>
                {comboInfo.map((item) => (
                  <option key={item.id} value={item.id}>{item.descripcion}</option>
                ))}
              </select>
            </div>


            <div className="mb-3 row textForm">
              <label htmlFor="exampleFormControlInput1" className="form-label">Descripcion</label>
              <input id="idd"
                placeholder='Ingrese una descripción para el producto'
                className="form-control form-control-lg"
                type="text" aria-label=".form-control-lg example"
                onChange={(e) => setDescR(e.target.value)}></input>
            </div>

            <div className="mb-3 row">
              <label htmlFor="image" className="form-label textForm">
                Imagen:
              </label>
              <input id="image" className="form-control" type="file" accept="image/*" onChange={handleImageChange} required />
            </div>
            <div className="row mb-3 textForm">
              <div className="col-2">
                <label htmlFor="exampleFormControlInput1" className="form-label">Precio:</label>
              </div>
              <div className="col-10">
                <input id="idd"
                  placeholder='Ingrese precio del producto'
                  className="form-control form-control-lg"
                  type="text" aria-label=".form-control-lg example"
                  onChange={(e) => setPrecio(e.target.value)}></input>
              </div>


            </div>

            <div className="mb-3">
              <select className="form-select" aria-label="Default select example" defaultValue="default" onChange={handleSelectChange}>
                <option value="default">Seleccione el Tipo</option>
                {filteredData.map((item) => (
                  <option key={item.id_tipo_producto} value={item.id_tipo_producto}>{item.nombre_tipo_prod}</option>
                ))}
              </select>
            </div>


            <div className="mb-3">
              <button className='btn btn-secondary btnEffect' onClick={() => handleClick()}>
                Guardar
              </button>
            </div>

          </div>
          <div className="col-2" />
        </div>
      </div>
    </div>
    
  );
};

export default FormRP;
