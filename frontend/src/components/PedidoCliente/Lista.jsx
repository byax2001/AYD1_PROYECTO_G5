import React from 'react'
import edit from '../../images/Editar.png';
import del from '../../images/delete.png';

function Lista({ todos }) {
    const handleClick = (row) => {
        //console.log(row)

    };

    return (

        <div>

            {

                todos.map((todo) => (
                    <li className='list-item' key={todo.id}>
                        <input type="text" value={todo.nombre} className='list'
                            onChange={(event) => event.preventDefault()} />

                        <div className='header'>
                            <h6>Precio {todo.precio}</h6>
                        </div>

                        <div className='header'>
                            <h6>Cantidad {todo.cantidad}</h6>
                        </div>

                        <div className='alinea'>
                            <div>
                                <button className='button-complete task-button'>
                                    <a >
                                        <img className='button-edit'
                                            src={edit}

                                        />
                                    </a>
                                </button>
                                <button className='button-complete task-button'>
                                    <a >
                                        <img className='button-edit'
                                            src={del}

                                        />
                                    </a>
                                </button>
                            </div>
                        </div>
                    </li>
                )
                )}
        </div>


    )
}

export default Lista