import React from "react";
import Card from "./cardEmpresa";

import image1 from '../../images/logo.png';
import image3 from '../../images/star.png';

const cards = [
  {
    id: 1,
    title: "Chilazo Burger",
    image: image1,
    url: "https://faztweb.com",
  },
  {
    id: 2,
    title: "Queso Rey",
    image: image3,
    url: "https://blog.faztweb.com",
  },
  {
    id: 3,
    title: "Carls Jr",
    image: image3,
    url: "https://youtube.com/fazttech",
  },
  {
    id: 4,
    title: "Tacos el Chilazo",
    image: image1,
    url: "https://faztweb.com",
  },
  {
    id: 5,
    title: "Burritos el Rey",
    image: image1,
    url: "https://blog.faztweb.com",
  },
  {
    id: 6,
    title: "Mariscos",
    image: image3,
    url: "https://youtube.com/fazttech",
  },
];


/// aqui manipulo todas las cartas:

const Cards = () => {


  return (

    <div>
      <div className="h2 text-light">Restaurantes Recomendados</div>
      <div className="container d-flex justify-content-center align-items-center h-100">
        <div className="row">
          {cards.map(({ title, image, url, id }) => (
            <div className="col-md-2" key={id}>
              <Card imageSource={image} title={title} id={id}   />
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}

export default Cards;