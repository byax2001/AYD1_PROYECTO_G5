import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';
import DataTable from 'react-data-table-component';
import '../css/LandingPage.css';

const customStyles = {
  noData: {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#a2a2a2',
    },
  },
  header: {
    style: {
      justifyContent: 'center',
      fontSize: '22px',
      color: 'white',
      backgroundColor: "#3a3a3a",
      minHeight: '56px',
      paddingLeft: '16px',
      paddingRight: '8px',
    },
  },
  rows: {
    style: {
      backgroundColor: "#3a3a3a",
      color: "white"
    },
    stripedStyle: {
      backgroundColor: "#3a3a3a",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#3a3a3a",
      color: "white",
      fontSize: '25px'
    },
  },
  cells: {
    style: {
      whiteSpace: 'pre-wrap' // Hace que las celdas se hagan más altas en lugar de ensancharse
    },
  },
  pagination: {
    style: {
      fontSize: '13px',
      color: 'white',
      minHeight: '56px',
      backgroundColor: '#3a3a3a',
      borderTopStyle: 'solid',
      borderTopWidth: '4px',
      borderTopColor: 'd2d2d2',
    }
  }
};

const data = [
  {
    pregunta: '¿Cuál es la misión de AlChilazo?',
    respuesta: 'En AlChilazo, nuestra misión es promover la innovación gastronómica en Guatemala y conectar a los chapines con una amplia variedad de restaurantes de calidad.'
  },
  {
    pregunta: '¿Cómo garantizan la calidad y seguridad de los restaurantes asociados?',
    respuesta: 'En AlChilazo, somos responsables de garantizar que todos los restaurantes asociados cumplan con estándares estrictos de calidad e higiene antes de ser incluidos en nuestra plataforma.'
  },
  {
    pregunta: '¿Qué tipo de comida puedo encontrar en AlChilazo?',
    respuesta: 'AlChilazo ofrece una amplia variedad de opciones gastronómicas, desde comida guatemalteca tradicional hasta cocina internacional. Nos enorgullece apoyar a los restaurantes chapines y promover la diversidad culinaria en Guatemala.'
  },
  {
    pregunta: '¿Cuál es el objetivo principal de AlChilazo?',
    respuesta: 'Nuestro objetivo principal en AlChilazo es ofrecer una experiencia de pedido de alimentos fácil y conveniente, al mismo tiempo que brindamos apoyo a los restaurantes locales y promovemos la economía en Guatemala.'
  }
];
const cols= [
  {
    name: 'Pregunta',
    selector: 'pregunta',
    sortable: true,
    width: 'auto'
  },
  {
    name: 'Respuesta',
    selector: 'respuesta',
    sortable: true,
    width: 'auto'
  }
]

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <h1>Política de Privacidad de El Chilazo</h1>

      <h2>Responsabilidad y Compromiso</h2>
      <p>En El Chilazo, nos tomamos muy en serio la privacidad de nuestros usuarios. Nos comprometemos a proteger la información personal que recopilamos y a utilizarla de acuerdo con esta política de privacidad.</p>

      <h2>Información que Recopilamos</h2>
      <p>Para brindar nuestros servicios, podemos recopilar cierta información personal, como tu nombre, dirección de correo electrónico, número de teléfono, ubicación geográfica y preferencias de entrega. También podemos recopilar información de pago, como datos de tarjeta de crédito o débito, cuando realices una transacción a través de nuestra plataforma.</p>

      <h2>Uso de la Información</h2>
      <p>Utilizamos la información recopilada para proporcionar y mejorar nuestros servicios, procesar pagos, comunicarnos contigo, personalizar tu experiencia y garantizar la seguridad de nuestras operaciones. Además, podemos utilizar información agregada o anónima con fines estadísticos o de investigación.</p>

      <h2>Divulgación de la Información</h2>
      <p>En El Chilazo, mantenemos la confidencialidad de la información personal de nuestros usuarios. No vendemos, alquilamos ni compartimos tu información con terceros, excepto en los casos necesarios para brindar nuestros servicios, cumplir con la ley o proteger nuestros derechos y seguridad.</p>

      <h2>Seguridad de la Información</h2>
      <p>Implementamos medidas de seguridad adecuadas para proteger tu información personal contra accesos no autorizados, alteraciones o divulgaciones. Sin embargo, debes tener en cuenta que ninguna medida de seguridad en Internet es completamente infalible.</p>

      <h2>Guatemala y Jurisdicción</h2>
      <p>Esta política de privacidad se rige por las leyes de Guatemala. Cualquier disputa que surja en relación con esta política estará sujeta a la jurisdicción exclusiva de los tribunales competentes de Guatemala.</p>

      <h2>Modificaciones de la Política de Privacidad</h2>
      <p>Podemos actualizar esta política de privacidad de vez en cuando. Te recomendamos revisar periódicamente esta página para estar al tanto de los cambios. El uso continuado de nuestros servicios después de cualquier modificación de esta política se considerará como aceptación de dichos cambios.</p>

      <p>Si tienes alguna pregunta o inquietud acerca de nuestra política de privacidad, no dudes en contactarnos a través de nuestros canales de atención al cliente.</p>

      <p>Fecha de entrada en vigencia: 13/06/2023</p>

      <p>¡Gracias por confiar en El Chilazo y permitirnos servirte con privacidad y seguridad!</p>

      <p>El Chilazo</p>
    </div>
  );
};

const InfoEquipo =()=>{
  return(<table className="table table-dark">
  <thead className="thead-dark">
    <tr>
      <th>Nombre</th>
      <th>Carnet</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Brandon Oswaldo Yax Campos</td>
      <td>201800534</td>
    </tr>
    <tr>
      <td>Danny Eduardo Cuxum Sanchez</td>
      <td>201709528</td>
    </tr>
    <tr>
      <td>Osmar Abdel Peña Santizo</td>
      <td>201801619</td>
    </tr>
    <tr>
      <td>Vernik Carlos Alexander Yaxon Ortiz</td>
      <td>201712057</td>
    </tr>
  </tbody>
</table>)
}

function MPiePagina(props) {
  const location = useLocation();
  const [mensaje, setMensaje] = useState("Nosotros somos");
  const [tNav, setTNav] = useState("Quienes Somos");
  
  
  

  useEffect(() => {
    let state = location.state.tinfo;
    if (state === "q") {
      let mensaje = `Bienvenidos a AlChilazo, la plataforma líder en Guatemala para el envío de comida a domicilio. En AlChilazo, nos enorgullece ser el nexo entre los mejores restaurantes de Guatemala y los comensales hambrientos que desean disfrutar de una deliciosa comida en la comodidad de sus hogares.

      Nuestro principal objetivo es satisfacer tus antojos con una amplia variedad de opciones gastronómicas, ofreciendo un servicio de entrega rápido y confiable. Pero no nos limitamos solo a eso, porque en AlChilazo también nos preocupamos por Guatemala y nuestra responsabilidad social.
      
      Nos esforzamos por apoyar a la comunidad local y a los negocios locales, ya que creemos firmemente en fomentar el crecimiento económico y la generación de empleo en nuestro país. \nTrabajamos de la mano con una amplia red de restaurantes asociados, muchos de los cuales son pequeñas empresas guatemaltecas, para impulsar su presencia en el mercado y brindarles una plataforma para llegar a más clientes.
      
      La innovación es parte integral de nuestra identidad. Estamos constantemente buscando formas de mejorar tu experiencia en AlChilazo, desde una interfaz intuitiva y fácil de usar hasta opciones de personalización que se adaptan a tus preferencias culinarias. También implementamos tecnología de vanguardia para optimizar la entrega, asegurando que tu comida llegue caliente y en perfectas condiciones.
      
      En AlChilazo, nos apasiona la comida y la conveniencia, pero también nos preocupamos por Guatemala, somos responsables y promovemos la innovación. Estamos comprometidos en ofrecerte la mejor experiencia de entrega de comida, apoyando a la comunidad y siendo un catalizador del crecimiento gastronómico en nuestro país.
      
      ¡Gracias por ser parte de AlChilazo y permitirnos servirte lo mejor de la cocina guatemalteca!
      
      `;
      setMensaje(mensaje);
      setTNav("Quienes Somos");
    } else if (state === "e") {
      setMensaje(mensaje);
      setTNav("Equipo");
    } else if (state === "pf") {
      setMensaje("Preguntas frecuentes");
      setTNav("Preguntas Frecuentes");
    } else if (state === "tc") {
      setMensaje("Términos y condiciones");
      setTNav("Términos y Condiciones");
    } else if (state === "pp") {
      setMensaje("Políticas de privacidad");
      setTNav("Políticas de Privacidad");
    }
  }, [location.state]);

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <img id="logoLP" src={logo} alt="Logo" />
        <a className="navbar-brand" href="/">AlChilazo</a>
        <div className='textForm h4 text-light'>{tNav}</div>
      </nav>
      <div className='container textForm text-light mt-3'>
  <div className="row">
    {location.state.tinfo === 'pf' ? (
      <div className="col-12">
          <DataTable
            title={mensaje}
            columns={cols}
            data={data}
            customStyles={customStyles}
          />
      </div>
    ): location.state.tinfo === 'tc' ? (
      <div className="col-12 bg-dark">
        <React.Fragment>
        <h1>Términos y Condiciones de AlChilazo</h1>
            <h2>1. Aceptación de los Términos y Condiciones</h2>
            <p>Al utilizar los servicios de AlChilazo, aceptas y te comprometes a cumplir con los presentes Términos y Condiciones, así como con nuestras políticas y directrices adicionales que puedan ser publicadas en nuestro sitio web o aplicaciones móviles.</p>
            <h2>2. Uso de la Plataforma</h2>
            <h3>2.1 Registro</h3>
            <p>Para acceder a nuestros servicios, es necesario registrarse en nuestra plataforma proporcionando información precisa y veraz. Tú eres responsable de mantener la confidencialidad de tu cuenta y de todas las actividades que ocurran bajo tu nombre de usuario.</p>
            <h3>2.2 Uso Adecuado</h3>
            <p>Al utilizar nuestros servicios, te comprometes a utilizar la plataforma de manera adecuada, respetando los derechos de otros usuarios, restaurantes asociados y de AlChilazo. No está permitido utilizar la plataforma con fines ilegales, difamatorios, fraudulentos o que puedan causar daño a terceros.</p>
            <h3>2.3 Restricciones</h3>
            <p>No podrás utilizar la plataforma si no tienes la capacidad legal para hacerlo o si has sido previamente suspendido o eliminado de nuestra plataforma.</p>
            <h2>3. Pedidos y Entregas</h2>
            <h3>3.1 Restaurantes Asociados</h3>
            <p>AlChilazo se compromete a ofrecer una amplia variedad de restaurantes asociados, garantizando que cumplan con altos estándares de calidad e higiene. Sin embargo, no nos responsabilizamos por cualquier inconveniente o incidente que pueda ocurrir durante la entrega de los pedidos.</p>
            <h3>3.2 Compromiso de Entrega</h3>
            <p>Nos esforzamos por realizar las entregas en el tiempo estipulado, sin embargo, existen circunstancias imprevistas que pueden causar demoras. En tales casos, te mantendremos informado y haremos todo lo posible para minimizar cualquier inconveniente.</p>
            <h2>4. Responsabilidad y Seguridad</h2>
            <h3>4.1 Seguridad de los Usuarios</h3>
            <p>Tanto AlChilazo como los restaurantes asociados se comprometen a garantizar la seguridad de los usuarios. Sin embargo, no podemos garantizar la seguridad absoluta, por lo que te recomendamos tomar las precauciones necesarias al utilizar nuestros servicios.</p>
            <h3>4.2 Uso Responsable</h3>
            <p>Tú eres responsable de utilizar nuestros servicios de manera responsable y respetuosa. No podrás utilizar la plataforma para actividades ilegales, fraudulentas o que puedan poner en peligro la seguridad de otros usuarios.</p>
            <h2>5. Legislación Aplicable y Jurisdicción</h2>
            <p>Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de Guatemala. Cualquier disputa que surja en relación con estos Términos y Condiciones estará sujeta a la jurisdicción exclusiva de los tribunales competentes de Guatemala.</p>
            <p>Al utilizar los servicios de AlChilazo, aceptas cumplir con estos Términos y Condiciones. Si no estás de acuerdo con alguno de los términos establecidos, te recomendamos no utilizar nuestra plataforma. Si tienes alguna pregunta o consulta, no dudes en contactarnos a través de nuestros canales de atención al cliente.</p>
            <p>Fecha de entrada en vigencia: 13/06/2023</p>
            <p>¡Gracias por ser parte de AlChilazo y permitirnos servirte lo mejor de la cocina guatemalteca!</p>
            <p> AlChilazo</p>
        </React.Fragment>
        </div>
    ): location.state.tinfo === 'pp' ? (
      <div className="col-12 bg-dark">
        <React.Fragment>
        <PrivacyPolicy/>  
        </React.Fragment>
      </div>
    ):
    location.state.tinfo === 'e' ? (
      <div className="col-12">
        <InfoEquipo/>
      </div>
    ):
    (
      <React.Fragment>
        <div className="col-3"></div>
        <div className="col-6 bg-dark"> 
          <p className="text-justify">{mensaje}</p>
        </div>
        <div className="col-3"></div>
      </React.Fragment>
    )}
  </div>
</div>


    </React.Fragment>
  );
}

export default MPiePagina;