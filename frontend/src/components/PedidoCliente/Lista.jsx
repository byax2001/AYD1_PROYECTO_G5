import React from 'react'
import plus from '../../images/plus.png';
import minus from '../../images/minus.png';

function Lista({ todos }) {
    const onPlus = (id) => {
        //console.log("Plus " + id)
        var carrito = JSON.parse(window.localStorage.getItem('carrito'));
        for (let index = 0; index < carrito.length; index++) {
            if (carrito[index].id_producto == id) {
                carrito[index].cantidad = carrito[index].cantidad + 1;
                alert('Se agrego el producto');
                break;
            }

        }
        localStorage.setItem('carrito', JSON.stringify(carrito))
    };

    const onMinus = (id) => {
        //console.log("MINUS " + id)
        var carrito = JSON.parse(window.localStorage.getItem('carrito'));
        for (let index = 0; index < carrito.length; index++) {
            if (carrito[index].id_producto == id) {
                if (carrito[index].cantidad > 1) {
                    carrito[index].cantidad = carrito[index].cantidad - 1;
                    alert('Se quito un producto');
                    break;
                }else{
                    alert('No se puede reducir mas');
                    break; 
                }
            }

        }
        localStorage.setItem('carrito', JSON.stringify(carrito))
    };
    return (

        <div>

            {

                todos.map((todo) => (
                    <li className='list-item' key={todo.id_producto}>
                        <input type="text" value={todo.nombre_producto} className='list'
                            onChange={(event) => event.preventDefault()} />

                        <div className='header'>
                            <h6>Precio {todo.precio_producto}</h6>
                        </div>

                        <div className='header'>
                            <h6>Cantidad {todo.cantidad}</h6>
                        </div>

                        <div className='alinea'>
                            <div>
                                <button className='button-complete task-button' onClick={() => onPlus(todo.id_producto)} >
                                    <i >
                                        <img className='button-edit'
                                            src={plus}
                                        />
                                    </i>
                                </button>
                                <button className='button-complete task-button' onClick={() => onMinus(todo.id_producto)}>
                                    <a >
                                        <img className='button-edit'
                                            src={minus}

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