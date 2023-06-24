import React from "react";
import Card from "./cardEmpresa";

import image1 from '../../images/logo.png';
import image3 from '../../images/star.png';



const cards = [
  {
      id_empresa: 16,
      nombre: "Alitas Chapincitas",
      descripcion_empresa: "Deliciosas Alitas",
      email: "456654@gmail.com",
      tipo_empresa_id_tipo: 1,
      telefono: "31778200"
  },
  {
      id_empresa: 17,
      nombre: "Campero",
      descripcion_empresa: "pollo frito",
      email: "opena@gmail.com",
      tipo_empresa_id_tipo: 1,
      telefono: "12345678"
  },
  {
      id_empresa: 18,
      nombre: "Pizza Hut",
      descripcion_empresa: "Variedad de pizzas",
      email: "pizzahut@gmail.com",
      tipo_empresa_id_tipo: 2,
      telefono: "98765432"
  },
  {
      id_empresa: 19,
      nombre: "Burger King",
      descripcion_empresa: "Hamburguesas y papas fritas",
      email: "burgerking@gmail.com",
      tipo_empresa_id_tipo: 2,
      telefono: "56789012"
  },
  {
      id_empresa: 20,
      nombre: "Starbucks",
      descripcion_empresa: "Cafetería y bebidas",
      email: "starbucks@gmail.com",
      tipo_empresa_id_tipo: 3,
      telefono: "34567890"
  },
  {
      id_empresa: 21,
      nombre: "Subway",
      descripcion_empresa: "Subs y sándwiches",
      email: "subway@gmail.com",
      tipo_empresa_id_tipo: 2,
      telefono: "67890123"
  },
  {
      id_empresa: 22,
      nombre: "Dominos",
      descripcion_empresa: "Pizzas y aperitivos",
      email: "dominos@gmail.com",
      tipo_empresa_id_tipo: 2,
      telefono: "01234567"
  }
];

/// aqui manipulo todas las cartas:

const Cards = () => {


  return (

    <div>
      <div className="container d-flex justify-content-center align-items-center h-100">
        <div className="row">
          {cards.map(({ nombre, descripcion_empresa, id_empresa }) => (
            <div className="col-md-2" key={id_empresa}>
              <Card imageSource={image3} title={nombre} id={id_empresa}  text={descripcion_empresa}  />
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}

export default Cards;