import React from 'react'
import edit from '../../images/Editar.png';
import del from '../../images/delete.png';

function Lista({ todos, setTodos }) {
    const handleClick = (row) => {
        console.log(row)

    };
    return (
        <div>
            {console.log(todos)}
            {todos.map((todo) => (
                <li className='list-item' key={todo.id}>
                    <input type="text" value={todo.title} className='list'
                        onChange={(event) => event.preventDefault()} />

                    <div className='header'>
                        <h4>Cantidad {todo.id}</h4>
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