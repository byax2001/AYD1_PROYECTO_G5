import { Component, useEffect } from "react"
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js'
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title

)


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: "white",
        font: {
          size: 14
        }
      }
    },
    title: {
      display: true,
      text: 'Los 5 Mejores Repartidores',
      color: "white",
      font: {
        size: 16
      }

    }
  },
  scales: {
    x: {
      ticks: {
        color: 'white', // color del texto del eje x
        beginAtZero: true
      },
      grid: {
        color: 'white'
      }
    },
    y: {
      ticks: {
        beginAtZero: true,
        color: 'white', // color del texto del eje y
      }, 
      grid: {
        color: 'white'
      }
    }
  }
};
function Top5Dev(props) {
  const [labelB,setLabelB]=useState(['Sede 1', 'Sede 2', 'Sede 3', 'Sede 4', 'Sede 5'])
  const [dataB,setDataB]=useState([12, 19, 3, 5, 2])
  const data = {
    labels: labelB,
    datasets: [
      {
        label: 'Sedes',
        data: dataB,
        backgroundColor: [
          'rgba(144,238,144, 0.8)', // Verde claro
          'rgba(135,206,235, 0.8)', // Celeste
          'rgba(255, 99, 71, 0.8)', // Rojo
          'rgba(0, 0, 128, 0.8)', // Azul marino
          'rgba(64, 224, 208, 0.8)' // Turquesa
          ],
        borderColor: [
          'rgba(144,238,144, 0.8)', // Verde claro
          'rgba(135,206,235, 0.8)', // Celeste
          'rgba(255, 99, 71, 0.8)', // Rojo
          'rgba(0, 0, 128, 0.8)', // Azul marino
          'rgba(64, 224, 208, 0.8)' // Turquesa
          ],
        borderWidth: 1,
      },
    ],
  };
  const gBarras=async()=>{
    const url = `${process.env.REACT_APP_API_CONSUME}/api/top_sedes`;
    let config = {
        method: "GET", //ELEMENTOS A ENVIAR
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json", 
        Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    };
    try{
      const res = await fetch(url, config);
      
      const data_res = await res.json();
      const label = []
      const data = []
      for (let index = 0; index < data_res.length; index++) {
        const s = data_res[index];
        label.push(s.sede)
        data.push(s.votos);
        /*"sede": 8,
        "municipio": "Amatitlan",
        "departamento": "Guatemala",
        "papeleta": "Rosada",
        "partido": "UNE*/
      }
      setDataB(data)
      setLabelB(label)
      //console.log(votoC)
      //setVotos(votoC)

    }catch(e){
      console.log(e)
    }
    
}
  useEffect(() => {
      const intervalo = setInterval(() => {
       gBarras();
      }, 1000);
      return () => clearInterval(intervalo);
      //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
  },[]);
  
  return (
    <Bar data={data} options={options} />)

}
export default Top5Dev;