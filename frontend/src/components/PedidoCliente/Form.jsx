import React from 'react'

function Form({input,setInput, todos, setTodos}) {
  
  const onInputChange = (event) => {
   // console.log("Se ingres el Input")
    setInput(event.target.value);
}

  const onFormSubmit = (event) => {
    event.preventDefault();
    setTodos([...todos,{id:todos.length ,title:input,completed:false}]);
    setInput("");
    console.log(todos.length)
}

  return (
    <form onSubmit={onFormSubmit}>
      <input type="text" placeholder='Hola Mundo...' className='task-input' value={input}
      required 
      onChange ={onInputChange}
      />
      <button className='button-add' type='submit'>Add</button>
    </form>
  )
}

export default Form