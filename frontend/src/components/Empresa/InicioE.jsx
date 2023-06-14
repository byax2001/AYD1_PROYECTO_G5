import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

import Modal from 'react-modal';


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

//------------------------------------------------------------------------------

//varaibles Necesarias para la Carga de Datos
//Aqui mi filas
const data = [
    {
        producto: 'Quesoburguesa',
        tipo: 'Individual',
        descripcion: 'Simple pero sabroso',
    },
    {
        producto: 'Combo Tradicional ',
        tipo: 'Combo',
        descripcion: 'nuestro combo mas popular',
    },
    {
        producto: 'Combo Deluxe ',
        tipo: 'Combo',
        descripcion: 'nuestro combo mas completo',
    },
    {
        producto: 'Bebida Natural ',
        tipo: 'Individual',
        descripcion: 'bebida 100% Natural',
    }
    // Agrega más filas según tus necesidades
];
//Aqui mis columnas
const columns = [
    {
        name: 'Nombre del producto',
        selector: row => row.producto,
        sortable: true,
    },
    {
        name: 'Tipo',
        selector: row => row.tipo,
        sortable: true,
    },
    {
        name: 'Descripcion',
        selector: row => row.descripcion,
        sortable: true,
    }
];

const InicioE = () => {
    const [filteredData, setFilteredData] = useState(data);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        producto: '',
        tipo: '',
        descripcion: '',
    });
    const handleTipoClick = (row) => {
        setSelectedItem(row);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para guardar los cambios del formulario
        // Puedes acceder a los valores actualizados de los campos a través del estado
        //  // Por ejemplo, hacer una solicitud de API para actualizar los valores en la base de datos
        // Ejemplo: selectedItem.producto, selectedItem.tipo, selectedItem.descripcion


        const updatedData = filteredData.map((item) => {
            if (item === selectedItem) {
                return {
                    producto: formValues.producto,
                    tipo: formValues.tipo,
                    descripcion: formValues.descripcion,
                };
            }
            return item;
        });

        setFilteredData(updatedData);
        closeModal();

    };


    const handleInputChange = (event) => {
        const { id, value } = event.target;
        const updatedItem = {
            producto: formValues.producto,
            tipo: formValues.tipo,
            descripcion: formValues.descripcion,
        };
        setSelectedItem(updatedItem);
    };
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-warning position-relative">
                <img id="logoStar" src={logo} alt="Logo" />
                <a className="navbar-brand" href="/">AlChilazo</a>
                <div className="h2 text-light">Inicio Empresa</div>
                <div className="btn-group d-inline-flex" data-toggle="buttons">
                    {/*aqui colocaria los link para visitar */}
                    <Link to="/emp/EmPanel" className="btn textForm text-light">Panel de control</Link>
                    <Link to="/" className="btn textForm text-light">Cerrar Sesion</Link>

                </div>
            </nav>

            <div className="container mt-4">
                <div className="my-4">
                    <DataTable
                        title={"Lista de productos"}
                        columns={columns}
                        data={filteredData}
                        customStyles={customStyles}
                        pagination
                        highlightOnHover
                        striped
                        responsive
                        onRowClicked={handleTipoClick} // Agregamos el evento onRowClicked
                    />
                </div>

            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Detalle del producto"
            >
                {selectedItem && (
                    <div>
                        <h2>Editar producto</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="nombre">Nombre:</label>
                                <input type="text" id="nombre" value={selectedItem.producto} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="tipo">Tipo:</label>
                                <input type="text" id="tipo" value={selectedItem.tipo} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="descripcion">Descripción:</label>
                                <textarea id="descripcion" value={selectedItem.descripcion} onChange={handleInputChange} />
                            </div>
                            <button type="submit">Guardar cambios</button>
                            <button onClick={closeModal}>Cerrar</button>
                        </form>
                    </div>
                )}
            </Modal>

        </React.Fragment>
    );
};

export default InicioE;
