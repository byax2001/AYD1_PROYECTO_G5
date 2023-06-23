import React from "react";
import Card from "./cardEmpresa";

import image1 from '../../images/logo.png';
import image2 from '../../images/quesoB.png';
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
    image: image2,
    url: "https://blog.faztweb.com",
  },
  {
    id: 3,
    title: "Carls Jr",
    image: image3,
    url: "https://youtube.com/fazttech",
  },
];

function Cards() {
  return (
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row">
        {cards.map(({ title, image, url, id }) => (
          <div className="col-md-4" key={id}>
            <Card imageSource={image} title={title} url={url} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;