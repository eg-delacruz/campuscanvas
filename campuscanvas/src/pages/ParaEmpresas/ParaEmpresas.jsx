import React from 'react';
import './ParaEmpresas.scoped.scss';

//assets

//components
import Patrocinadores from '../../components/Carousel/Carousel';

function ParaEmpresas() {
  return (
    <div className='body__gridContainer'>
      <figure>
        <img src='' alt='Logo Campus Bag' />
      </figure>

      <section className='hero container'>
        {/* poner el display flex al container para no afectar a la imagen de
          ir abajo */}
        <div className='hero__container'>
          <h1>¡La bolsa más esperada por los estudiantes</h1>
          <figure>
            <img src='' alt='Ejemplos bolsas Campus Bag' />
          </figure>
        </div>
        <a href='#IDName'>
          <img src='' alt='Bajar a siguiente sección' />
        </a>
      </section>

      <section className='main container'>
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

      <section className='beneficios'>
        <div />
      </section>

      <section className='masBeneficios'>
        <div />
      </section>
      {/* Enviar título por props */}
      <Patrocinadores />
    </div>
  );
}

export default ParaEmpresas;
