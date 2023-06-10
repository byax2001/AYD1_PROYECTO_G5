import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useFetcher,useNavigate} from 'react-router-dom'

function LandingPage (props){
    const [num1,setNum1] = useState(0);
    const [num2,setNum2] = useState(0);
    const [resultado, setResultado] =useState(0)

    const suma=function(){
        let ntotal = Number(num1)+Number(num2)
        setResultado(ntotal)
    }

    const SumarServer=async()=>{
        const url = `http://localhost:8080/sumar`;
        let config = {
            method: "POST", //ELEMENTOS A ENVIAR
            body: JSON.stringify({ num1:Number(num1),num2:Number(num2) }),
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
        };
        try{
          const res = await fetch(url, config);
          const data_res = await res.json();
          setResultado(data_res.r)

          console.log(data_res)
        }catch(e){
          console.log(e)
        }
        
    }
    
    return(
        <React.Fragment>
            <div className="d-flex justify-content-center align-items-center">
                <div>
                    <label className="text-light mt-5">Numero 1</label>
                    <input type="number" onChange={(event) => setNum1(event.target.value)}/>
                </div>
                <div>
                    <label className="text-light mt-5" >Numero 2</label>
                    <input className="ml-5" type="number" onChange={(event) => setNum2(event.target.value)}/>
                </div>
                <button className="btn btn-secondary mt-5" onClick={()=>{SumarServer()}}>Realizar Suma</button>
            </div>
            <label className="text-light"> El total de esa suma es:{resultado} </label>
        </React.Fragment> 
    )

}
export default LandingPage;