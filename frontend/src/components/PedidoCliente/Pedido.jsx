import React ,{useState} from 'react'
import logo from '../../images/logo copy.png';
import { Link,useLocation } from 'react-router-dom';
import Header from './Header'
import Form from './Form'
import Lista from './Lista'
import "./lista.css";

function Pedido() {

    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);

    
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light position-relative">
                <img id="logoLP" src={logo} alt="Logo" />
                <a className="navbar-brand" >AlChilazo</a>
                <div className="h2 text-light">Carrito </div>
                <div className="btn-group d-inline-flex" data-toggle="buttons">
                    <Link to="/inicioU" className="btn textForm text-light">Regresar</Link>
                </div>
            </nav>

            <div className='container'>
                <div className='app-wrapper'>
                    <div>
                        <Header></Header>
                    </div>
                    <div>
                        <Form input={input}
                            setInput={setInput}
                            todos={todos}
                            setTodos={setTodos}
                            
                        ></Form>
                    </div>
                    <div>
                        <Lista todos={todos} setTodos={setTodos}></Lista>
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

export default Pedido