import React from 'react';
import './ParaEmpresas.scoped.scss';

//assets
import BagLogo from '../../assets/static/bag_logo.svg';
import Bagsx2 from '../../assets/static/2bags.png';
import sectionDown from '../../assets/static/section_down.png';

//components
import Patrocinadores from '../../components/Carousel/Carousel';

function ParaEmpresas() {
  return (
    <div className='body__gridContainer'>
      <figure className='pageTitle container'>
        <img src={BagLogo} alt='Logo Campus Bag' />
      </figure>

      <section className='hero'>
        <div className='hero__container container'>
          <h1 className='hero__title'>
            ¡La bolsa más esperada por los estudiantes
          </h1>
          <figure>
            <img src={Bagsx2} alt='Ejemplos bolsas Campus Bag' />
          </figure>
        </div>
        <a href='#paraEmpresas_main'>
          <img src={sectionDown} alt='Bajar a siguiente sección' />
        </a>
      </section>

      <section className='main container' id='paraEmpresas_main'>
        <h2>¡Regala una sonrisa al estudiante!</h2>
        <p>
          Nuestro servicio Campus Bag tiene como principal objetivo obsequiar
          productos y servicios a los estudiantes universitarios a través de un
          modelo de patrocinios. A lo largo del cuatrimestre estudiantil nos
          acercamos a los distintos campus de las universidades Madrileñas a
          entregar bolsas con todo tipo de contenido relevante para los
          estudiantes. Estos van desde productos comestibles como galletas,
          chocolatinas y alguna que otra chuchería, hasta bebidas de todo tipo,
          muestras de productos cosméticos o muestras de productos de oficina
          como bolígrafos y útiles escolares. Además, nuestros patrocinadores
          pueden incluir en la bolsa flyers y cupones de descuento e incluso
          ofertas de empleo y búsqueda de candidatos. Todo con el objetivo de
          brindar valor a los estudiantes y generar una imagen de marca
          positiva.
        </p>
      </section>

      <section className='beneficios container'>
        <h2>¿Por qué confiar en nuestro servicio</h2>
        <div className='beneficios__container'>
          <article className='card card--beneficio'>
            <img src='' alt='Percepción positiva' />
            <h4>Da una percepción positiva a tu marca</h4>
            <p>
              Nuestra Campus Bag es un regalo que las marcas patrocinadoras en
              conjunto dan a los estudiantes.
            </p>
          </article>

          <article className='card card--beneficio'>
            <img src='' alt='Percepción positiva' />
            <h4>Da una percepción positiva a tu marca</h4>
            <p>
              Nuestra Campus Bag es un regalo que las marcas patrocinadoras en
              conjunto dan a los estudiantes.
            </p>
          </article>

          <article className='card card--beneficio'>
            <img src='' alt='Percepción positiva' />
            <h4>Da una percepción positiva a tu marca</h4>
            <p>
              Nuestra Campus Bag es un regalo que las marcas patrocinadoras en
              conjunto dan a los estudiantes.
            </p>
          </article>
        </div>
      </section>

      <section className='masBeneficios container'>
        <article className='beneficio'>
          <div className='beneficio__informacion'>
            <h4>Cubrimos toda la comunidad de Madrid</h4>
            <p>
              --- Hablar de cantidad total de estudiantes --- metus. Donec
              scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet
              ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu
              ad litora torquent per conubia nostra, per inceptos himenaeos.
              Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus,
              lacinia quis posuere ut
            </p>
          </div>
          <figure className='beneficio__imagen'>
            <img src='' alt='Comunidad de Madrid' />
          </figure>
        </article>

        <article className='beneficio'>
          <div className='beneficio__informacion'>
            <h4>Cubrimos toda la comunidad de Madrid</h4>
            <p>
              --- Hablar de cantidad total de estudiantes --- metus. Donec
              scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet
              ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu
              ad litora torquent per conubia nostra, per inceptos himenaeos.
              Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus,
              lacinia quis posuere ut
            </p>
          </div>
          <figure className='beneficio__imagen'>
            <img src='' alt='Comunidad de Madrid' />
          </figure>
        </article>

        <article className='beneficio'>
          <div className='beneficio__informacion'>
            <h4>Cubrimos toda la comunidad de Madrid</h4>
            <p>
              --- Hablar de cantidad total de estudiantes --- metus. Donec
              scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet
              ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu
              ad litora torquent per conubia nostra, per inceptos himenaeos.
              Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus,
              lacinia quis posuere ut
            </p>
          </div>
          <figure className='beneficio__imagen'>
            <img src='' alt='Comunidad de Madrid' />
          </figure>
        </article>
      </section>
      {/* Enviar título por props */}
      <Patrocinadores />

      <section className='bottom container'>
        <p>
          Contacta con nosotros y asegura un lugar para tus productos en la
          bolsa que se distribuye a todos los estudiantes universitarios en
          Madrid una vez por cuatrimestre y sorpréndelos con un bonito regalo de
          parte de tu empresa.{' '}
        </p>
        <a href='#' className='btn button-blue'>
          Contáctanos
        </a>
      </section>
    </div>
  );
}

export default ParaEmpresas;
