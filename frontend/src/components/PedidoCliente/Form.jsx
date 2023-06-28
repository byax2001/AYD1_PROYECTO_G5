import React from 'react'
import useLocalStorage from './useLocalStorage'

function Form({input,setInput,lista}) {
  const onInputChange = (event) => {
   // console.log("Se ingres el Input")
    setInput(event.target.value);
}

  const onFormSubmit = (event) => {
    event.preventDefault();
    setInput("");

}

const onBorrar = (event) => {
  var vacia = []
  try {
    localStorage.setItem('carrito', JSON.stringify(vacia))
 } catch (error) {
     console.error(error)
 }
}



const doOrder =  async() => {
  var storedCarrito = window.localStorage.getItem('carrito');
  var carrito = JSON.parse(storedCarrito);
  var objeto = {
    idUser: 44 ,
    cupon: input,
    productos: carrito
  }

    const url = `${process.env.REACT_APP_API_CONSUME}/api/neworder`;
    let config = {
      method: "POST", //ELEMENTOS A ENVIAR
      body: JSON.stringify(objeto),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //agregar tocken
      },
    };
    try {
      const res = await fetch(url, config);
  
      const data_res = await res.json();
  
      //console.log(data_res)
      if(data_res.valid){
        console.log(data_res)
        alert(data_res.message)
        onBorrar();
      }else{
        //AVISO CONTRASEÑA
        alert(data_res.message)
      }
    } catch (e) {
      console.log(e)
    }
  
  
}

  return (
    <form onSubmit={onFormSubmit}>
      <input type="text" placeholder='Agregar Cupon...' className='task-input' value={input}
      onChange ={onInputChange}
      />
      <button className='button-add' onClick={doOrder}>Crear Pedido</button>
    </form>
  )
}

export default Form