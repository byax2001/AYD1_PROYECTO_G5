
import React, { useState,useEffect  } from 'react';
import DataTable from 'react-data-table-component';
import logo from '../../images/logo.png';
import edit from '../../images/editv2.png';
import deleteV from '../../images/delete.png';
//import Amb from '../../images/quesoB.png';
import { Link } from 'react-router-dom';
import Form from './FormE';
import ReactTable from 'react-data-table-component';
import ReactModal from 'react-modal';
import axios from 'axios';
import { useMyContext } from '../../context';

ReactModal.setAppElement('#root'); // Establece el elemento de la aplicación principal
// varaible de stilo
const customStyles = {
    noData: {
        style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#a2a2a2',
        },
    },
    header: {

        style: {
            justifyContent: 'center',
            fontSize: '22px',
            color: 'white',
            backgroundColor: "#3a3a3a",
            minHeight: '56px',
            paddingLeft: '16px',
            paddingRight: '8px',
        },
    },
    rows: {
        //para variar colores entre fila y fila 
        //style fila 1
        //stripedstyle fila2
        style: {
            fontSize: '16px',
            backgroundColor: "#9b9b9b",
            color: "white"
        },
        stripedStyle: {
            backgroundColor: "#646464",
        },
    },
    headCells: {
        style: {
            
            backgroundColor: "#3a3a3a",
            color: "white"
        },
    },

    pagination: {
        style: {
            fontSize: '13px',
            color: 'white',
            minHeight: '56px',
            backgroundColor: '#3a3a3a',
            borderTopStyle: 'solid',
            borderTopWidth: '4px',
            borderTopColor: 'd2d2d2',
        }
    }
};

//varaibles Necesarias para la Carga de Datos
//Aqui mi filas
/*const data = [
    {
        nombre: 'Chorizo Argentino',   
        descripcion: 'Completo',
        precio: 30,
        tipo: 'Combo',
        empresa: 2,
        imagen: Amb,//sera de validar si me mandaria algun Link
        id:17,
    },
    {
        nombre: 'Queso Doble',   
        descripcion: 'Completo',
        precio: 40,
        tipo: 'Simple',
        empresa: 2,
        imagen: Amb,//sera de validar si me mandaria algun Link
        id:7,
    },
    {
        nombre: 'Bacon',   
        descripcion: 'Completo',
        precio: 80,
        tipo: 'Entrada',
        empresa: 2,
        imagen: Amb,//sera de validar si me mandaria algun Link
        id:1,
    },
  ];*/


const InicioE = () => {
    const [state, setState] = useMyContext();
    const [filteredData, setFilteredData] = useState([]);
    const [filteredDataV, setFilteredDataV] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalv, setShowModalv] = useState(false);
    

    useEffect(() => {
      console.log(state)
      fetchData(); // Realizar la petición al cargar el componente
      fetchDataV();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/rest/${state.data.idempresa}`); // Reemplaza 'URL_DEL_SERVIDOR' con la URL correcta
        const data = response.data; // Obtener los datos de la respuesta
        setFilteredData(data.data); // Actualizar los datos del componente
        console.log('Datos Obtenidos:', data.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    const fetchDataV = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products/type'); // Reemplaza 'URL_DEL_SERVIDOR' con la URL correcta
        const data = response.data; // Obtener los datos de la respuesta
        setFilteredDataV(data.data); // Actualizar los datos del componente
        //console.log('Datos Obtenidos:', data.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
  

      //Aqui mis columnas
  const columns = [

    {
      name: 'Nombre del producto',
      selector: row => row.nombre_producto,
      sortable: true,
      autoWidth: true,
    },
    {
      name: 'Descripcion',
      selector: row => row.descripcion_producto,
      /*cell: (row) => (
          <button  className='btn btn-secondary' onClick={() => handleClick(row)}>
            {row.descripcion_producto}
          </button>
        ),*/
      sortable: true,
      autoWidth: true,
    },
    {
      name: 'Precio',
      selector: row => row.precio_producto,
      sortable: true,
      autoWidth: true,
    },
    {
      name: 'Tipo',
      selector: row => row.nombre_tipo_prod,
      sortable: true,
      autoWidth: true,
    },
    {
      name: 'Imagen',
      selector: row => row.imagen_producto,
      cell: (row) => (
        <a href={row.documento} target="_blank" rel="noopener noreferrer">
          <img className='img-thumbnail'
            src={row.imagen_producto}
            alt="Fotografia"
            style={{ width: '400px', cursor: 'pointer' }}
          />
        </a>
      ),
      sortable: true,
      autoWidth: true,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <div>
          <a onClick={() => handleClick(row)}>
            <img className='img-thumbnail'
              src={edit}
              alt="Fotografia"
              style={{ width: '50px', cursor: 'pointer' }}
            />
          </a>
          <a onClick={() => deleteClick(row)}>
            <img className='img-thumbnail'
              src={deleteV}
              alt="Fotografia"
              style={{ width: '50px', cursor: 'pointer' }}
            />
          </a>
        </div>

      ),
      sortable: true,
      autoWidth: true,

    }
  ];

     const handleClick = (row) => {
        setSelectedRow(row);
        setShowModal(true);

      };
      const deleteClick = (row) => {
        setSelectedRow(row);
        setShowModalv(true);
       


      };
      
      const closeModal = () => {
        setShowModal(false);
        fetchData()
      };

      //Modal delete
      const closeModalv = () => {
        setShowModalv(false);
      };

      const [showSubMenu, setShowSubMenu] = useState(false);

      const handleSubMenuToggle = () => {
        setShowSubMenu(!showSubMenu);
      };

      const deleteRow = async () => {
        const url = `http://localhost:4000/api/products/${selectedRow.id_producto}`; // Reemplaza 'URL_DEL_SERVIDOR' con la URL correcta
            
            let config = {
                method: "DELETE"

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
            fetchData();
            closeModalv();

      }
    return (
        <React.Fragment>
            {/* Navbar*/}

            <nav className="navbar navbar-expand-lg navbar-light position-relative">
                <img id="logoStar" src={logo} alt="Logo" />
                <a className="navbar-brand" href="/">AlChilazo</a>
                <div className="h2 text-light">Panel de Control</div>
                <div className="btn-group d-inline-flex" data-toggle="buttons">
                    {/*aqui colocaria los link para visitar */}
                   
                      <div className="submenu">
                        <Link to="/registroPro" className="btn textForm text-light">
                          Registro de Producto
                        </Link>
                      </div>
                    <Link to="/" className="btn textForm text-light">Cerrar Sesion</Link>

                </div>
            </nav>

            
            {/* Aqui colocamos la tabla */}

            <div className="container mt-4">
                <div className="my-4">
                <ReactTable
                    title={"Lista Productos"}
                    columns={columns}
                    data={filteredData}
                    customStyles={customStyles}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                    noDataText="No se encontraron registros"
                />
                </div>
            </div>

            <ReactModal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Formulario"
            >
                <Form selectedRow={selectedRow} closeModal={closeModal} filteredDataV={filteredDataV} />
            </ReactModal>


            <ReactModal
                isOpen={showModalv}
                onRequestClose={() => setShowModalv(false)}
                contentLabel="Formulario"
                style={{
                  content: {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '400px',
                    height: '200px',
                    backgroundColor: '#ffffff',
                    borderRadius: '5px',
                  },
                  overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  },
                }}
            >
                <h2>¿Esta seguro de eliminar el producto?</h2>
                <button  className='btn btn-secondary' onClick={()=>deleteRow()} >
                  Delete
                </button>
                <button  className='btn btn-secondary' onClick={() => closeModalv()}>
                  Cancelar
                </button>
            </ReactModal>
        </React.Fragment>
    );
};

export default InicioE;
































