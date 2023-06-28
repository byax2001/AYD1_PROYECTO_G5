import React from 'react'
import useLocalStorage from './useLocalStorage'

function Form({input,setInput,lista}) {
  const onInputChange = (event) => {
   // console.log("Se ingres el Input")
    setInput(event.target.value);
}

  const onFormSubmit = (event) => {
    var objeto = {
      id: lista.length ,
      nombre: input,
      cantidad: 1
    }

    
    event.preventDefault();
    lista.push(objeto)
    try {
      localStorage.setItem('carrito', JSON.stringify(lista))
   } catch (error) {
       console.error(error)
   }
    setInput("");
    console.log(lista);
}

const onBorrar = (event) => {
  var vacia = []
  try {
    localStorage.setItem('carrito', JSON.stringify(vacia))
 } catch (error) {
     console.error(error)
 }
}


  return (
    <form onSubmit={onFormSubmit}>
      <input type="text" placeholder='Agregar Cupon...' className='task-input' value={input}
      required 
      onChange ={onInputChange}
      />
      <button className='button-add' type='submit'>Agregar Cupon</button>
      <button className='button-add' onClick={onBorrar}>Borrar</button>
      <button className='button-add' onClick={onBorrar}>Aceptar Pedido</button>
    </form>
  )
}

export default Form