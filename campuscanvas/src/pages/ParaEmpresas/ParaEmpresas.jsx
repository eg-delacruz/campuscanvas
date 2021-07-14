import React from 'react';
import './ParaEmpresas.scoped.scss';
import { Link } from 'react-router-dom';

//assets
import BagLogo from '../../assets/static/bag_logo.svg';
import Bagsx2 from '../../assets/static/2bags.png';
import sectionDown from '../../assets/static/section_down.png';
import cardImage from '../../assets/static/card_sample_image.png';
import sampleImage_1 from '../../assets/static/Sample_img_1.png';
import sampleImage_2 from '../../assets/static/Sample_img_2.png';
import sampleImage_3 from '../../assets/static/Sample_img_3.png';
import sampleImage_4 from '../../assets/static/Sample_img_4.png';

//components
import Card from '../../components/Card--ImgTitleText/Card';
import Patrocinadores from '../../components/Carousel/Carousel';

function ParaEmpresas() {
  return (
    <div className='body__gridContainer'>
      {/* /////////////////////////
            //       Hero         //
            ///////////////////////// */}

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

      {/* /////////////////////////
            //       Main         //
            ///////////////////////// */}

      <section className='main container' id='paraEmpresas_main'>
        <h2>¡Regala una sonrisa al estudiante!</h2>

        <p className='main__content'>
          Nuestro servicio <b>Campus Bag</b> tiene como principal objetivo
          obsequiar productos y servicios a los estudiantes universitarios a
          través de un modelo de patrocinios. A lo largo del cuatrimestre
          estudiantil nos acercamos a los distintos campus de las universidades
          Madrileñas a entregar bolsas con todo tipo de contenido relevante para
          los estudiantes. Estos van desde productos comestibles como galletas,
          chocolatinas y alguna que otra chuchería, hasta bebidas de todo tipo,
          muestras de productos cosméticos o muestras de productos de oficina
          como bolígrafos y útiles escolares. Además, nuestros patrocinadores
          pueden incluir en la bolsa flyers y cupones de descuento e incluso
          ofertas de empleo y búsqueda de candidatos. Todo con el objetivo de
          brindar valor a los estudiantes y generar una imagen de marca
          positiva.
          <br />
        </p>
      </section>

      {/* /////////////////////////
          //   Upper Benefits    //
          ///////////////////////// */}

      <section className='upperBenefits'>
        <div className='upperBenefits__container container'>
          <h2>¿Por qué confiar en nuestro servicio</h2>
          <div className='beneficios__container'>
            <Card
              image={cardImage}
              imgAlt='Imagen de tarjeta'
              title='Da una percepción positiva a tu marca'
            >
              Nuestra <b>Campus Bag</b> es un regalo que las distintas marcas
              patrocinadoras en conjunto dan a los estudiantes.
            </Card>

            <Card
              image={cardImage}
              imgAlt='Imagen de tarjeta'
              title='Una forma distinta de hacer publicidad'
            >
              Diferénciate de tu competencia al utilizar un medio de publicidad
              menos saturado que los medios tradicionales.
            </Card>

            <Card
              image={cardImage}
              imgAlt='Imagen de tarjeta'
              title='Contacto directo con estudiantes internacionales'
            >
              Las universidades de Madrid reciben constantemente estudiantes
              internacionales. Dales una buena impresión de tus productos.
            </Card>

            <Card
              image={cardImage}
              imgAlt='Imagen de tarjeta'
              title='Perfecto para nuevas empresas'
            >
              Si eres una nueva empresa con productos o servicios interesantes
              para estudiantes, haz que te conozcan a través de nosotros.
            </Card>

            <Card
              image={cardImage}
              imgAlt='Imagen de tarjeta'
              title='Un punto de contacto más con clientes potenciales'
            >
              Tener diversos puntos de contacto con tus clientes puede hacer la
              diferencia. Nosotros añadimos un punto de contacto más a tu lista.
            </Card>

            <Card
              image={cardImage}
              imgAlt='Imagen de tarjeta'
              title='Dedicado a estudiantes'
            >
              Proveemos un servicio de publicidad enfocado a estudiantes,
              facilitando así el contacto directo entre ellos y las empresas.
            </Card>
          </div>
        </div>
      </section>

      {/* /////////////////////////
          //   Under Benefits    //
          ///////////////////////// */}

      <section className='underBenefits container'>
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
            <img src={sampleImage_1} alt='Comunidad de Madrid' />
          </figure>
        </article>

        <article className='beneficio'>
          <div className='beneficio__informacion'>
            <h4>La forma perfecta de encontrar candidatos</h4>
            <p>
              Encuentra a los mejores candidatos para tu empresa directamente en
              las universidades. A través de nosotros puedes ofrecer bacantes
              para estudiantes en prácticas, de media jornada, jornada completa
              o de cualquier otro tipo. Además, puedes enviar tus propuestas al
              campus que mejor se adapte al tipo de perfil que estás buscando.
            </p>
          </div>
          <figure className='beneficio__imagen'>
            <img src={sampleImage_1} alt='Comunidad de Madrid' />
          </figure>
        </article>

        <article className='beneficio'>
          <div className='beneficio__informacion'>
            <h4>Nosotros nos encargamos de la distribución</h4>
            <p>
              El equipo de Campus Canvas cuenta con una red de distribución de
              Campus Bag en toda la comunidad de Madrid, pudiendo así llegar a
              los estudiantes de las universidades más grandes del área. A lo
              largo de cada cuatrimestre estudiantil, todas estas universidades
              son visitadas como mínimo una vez por nuestro equipo. De esta
              manera no te tienes que preocupar por la logística de
              distribución, ¡déjalo en nuestras manos!
            </p>
          </div>
          <figure className='beneficio__imagen'>
            <img src={sampleImage_2} alt='Comunidad de Madrid' />
          </figure>
        </article>

        <article className='beneficio'>
          <div className='beneficio__informacion'>
            <h4>Diseñamos tu publicidad</h4>
            <p>
              Si no tienes un equipo dedicado al diseño e impresión de tu
              publicidad, nosotros lo hacemos por ti. En conjunto contigo,
              diseñamos tus volantes publicitarios y nos encargamos de su
              impresión con el acabado que más te convenga: impresiones a una
              tinta, duo tonos, coated, uncoated, etc. Si lo prefieres, puedes
              enviarnos el diseño de tu volante y nosotros continuaremos el
              proceso de impresión y distribución.
            </p>
          </div>
          <figure className='beneficio__imagen'>
            <img src={sampleImage_3} alt='Comunidad de Madrid' />
          </figure>
        </article>

        <article className='beneficio'>
          <div className='beneficio__informacion'>
            <h4>Múltiples opciones para tus productos</h4>
            <p>
              Uno de los objetivos de nuestra Campus Bag es obsequiar valor al
              estudiante. Por ello, incitamos a nuestros patrocinadores en
              contribuir a ella principalmente con productos interesantes de su
              marca y de esta manera generar una imagen de marca positiva de
              cara a los estudiantes. Otras maneras de contribuir es a través de
              flyers o cupones con descuentos, ofertas atractivas u ofertas de
              empleo.
            </p>
          </div>
          <figure className='beneficio__imagen'>
            <img src={sampleImage_4} alt='Comunidad de Madrid' />
          </figure>
        </article>
      </section>

      {/* Enviar título por props */}
      <Patrocinadores />

      {/* /////////////////////////
          //      Contacto       //
          ///////////////////////// */}
      <section className='bottom container'>
        <p>
          Contacta con nosotros y asegura un lugar para tus productos en la
          bolsa que se distribuye a todos los estudiantes universitarios en
          Madrid una vez por cuatrimestre y sorpréndelos con un bonito regalo de
          parte de tu empresa.{' '}
        </p>
        <Link to='#' className='btn button-blue'>
          Contáctanos
        </Link>
      </section>
    </div>
  );
}

export default ParaEmpresas;
