import React from 'react';
import './ParaEmpresas.scoped.scss';
import { Link } from 'react-router-dom';

//assets
import BagLogo from '../../assets/static/bag_logo.svg';
import Bagsx2 from '../../assets/static/2bags.png';
import SectionDownButton from '../../assets/static/SVGComponents/Icons/section_down';

//Images
import upperBenefit1 from '../../assets/static/upperBenefit_img_1.png';
import upperBenefit3 from '../../assets/static/upperBenefit_img_3.png';
import upperBenefit4 from '../../assets/static/upperBenefit_img_4.png';
import upperBenefit5 from '../../assets/static/upperBenefit_img_5.png';
import upperBenefit6 from '../../assets/static/upperBenefit_img_6.png';
import lowerBenefit1 from '../../assets/static/lowerBenefit_img_1.png';
import lowerBenefit2 from '../../assets/static/lowerBenefit_img_2.png';
import lowerBenefit3 from '../../assets/static/lowerBenefit_img_3.png';
import lowerBenefit4 from '../../assets/static/lowerBenefit_img_4.png';
import lowerBenefit5 from '../../assets/static/lowerBenefit_img_5.png';
import Card_gift from '../../assets/static/card_gift.png';

//components
import ButtonUp from '../../components/ButtonUp/ButtonUp';
import Card from '../../components/Card--ImgTitleText/Card';
import Patrocinadores from '../../components/Carousel/Carousel';

function ParaEmpresas() {
  return (
    <div className='body__gridContainer'>
      <ButtonUp />
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
          <SectionDownButton className='hero__sectionDown' />
          {/* <img src={sectionDown} alt='Bajar a siguiente sección' /> */}
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
              image={upperBenefit1}
              imgAlt='Imagen de tarjeta'
              title='Da una percepción positiva a tu marca'
            >
              Nuestra <b>Campus Bag</b> es un regalo que las distintas marcas
              patrocinadoras en conjunto dan a los estudiantes.
            </Card>

            <Card
              image={Card_gift}
              imgAlt='Imagen de tarjeta'
              title='Una forma distinta de hacer publicidad'
            >
              La espectativa generada en los estudiantes por descubrir lo que
              hay dentro de la bolsa hace destacar la efectividad de nuestra
              publicidad.
            </Card>

            <Card
              image={upperBenefit3}
              imgAlt='Imagen de tarjeta'
              title='Contacto directo con estudiantes internacionales'
            >
              Causa una buena impresión de tus productos al constante flujo de
              estidiantes internacionales en Madrid.
            </Card>

            <Card
              image={upperBenefit4}
              imgAlt='Imagen de tarjeta'
              title='Perfecto para nuevas empresas'
            >
              Si eres una nueva empresa con productos o servicios interesantes
              para estudiantes, haz que te conozcan a través de nosotros.
            </Card>

            <Card
              image={upperBenefit5}
              imgAlt='Imagen de tarjeta'
              title='Un punto de contacto más con clientes potenciales'
            >
              Tener diversos puntos de contacto con tus clientes puede hacer la
              diferencia. Nosotros añadimos uno más a tu lista.
            </Card>

            <Card
              image={upperBenefit6}
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
              Con más de 300 000 estudiantes, Madrid ofrece un gran potencial
              para nuestro servicio, pues nuestro objetivo es hacer entrega de
              una <b>Campus Bag</b> a cada uno de ellas/os cada cuatrimestre. La
              espectativa generada por nuestra bolsa garantiza a tu empresa una
              campaña de publicidad efectiva.
            </p>
          </div>
          <figure className='beneficio__imagen'>
            <img src={lowerBenefit1} alt='Comunidad de Madrid' />
          </figure>
        </article>

        <hr className='beneficio__hr' />

        <article className='beneficio'>
          <div className='beneficio__informacion'>
            <h4>La forma perfecta de encontrar candidatos</h4>
            <p>
              Encuentra a los mejores candidatos para tu empresa directamente en
              las universidades. Con nosotros puedes ofrecer bacantes para
              estudiantes en prácticas, de media jornada, jornada completa o de
              cualquier otro tipo. Además, promover tus propuestas en el campus
              que mejor se adapte al tipo de perfil que estás buscando.
            </p>
          </div>
          <figure className='beneficio__imagen'>
            <img src={lowerBenefit2} alt='Comunidad de Madrid' />
          </figure>
        </article>

        <hr className='beneficio__hr' />

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
          <figure className='beneficio__imagen beneficio__imgSizeModif'>
            <img src={lowerBenefit3} alt='Comunidad de Madrid' />
          </figure>
        </article>

        <hr className='beneficio__hr' />

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
          <figure className='beneficio__imagen beneficio__imgSizeModif'>
            <img src={lowerBenefit4} alt='Comunidad de Madrid' />
          </figure>
        </article>

        <hr className='beneficio__hr' />

        <article className='beneficio'>
          <div className='beneficio__informacion'>
            <h4>Múltiples opciones para tus productos</h4>
            <p>
              Uno de los objetivos de nuestra Campus Bag es obsequiar valor al
              estudiante. Por ello, incitamos a nuestros patrocinadores a
              contribuir a ella principalmente con productos interesantes de su
              marca, y de esta manera generar una imagen de marca positiva de
              cara a los estudiantes. También puedes poner productos como flyers
              o cupones con descuentos, ofertas atractivas y ofertas de empleo.
            </p>
          </div>
          <figure className='beneficio__imagen beneficio__imgSizeModif'>
            <img src={lowerBenefit5} alt='Comunidad de Madrid' />
          </figure>
        </article>
      </section>

      {/* Enviar título por props */}
      <Patrocinadores titulo='Estas empresas ya confían en nosotros' />

      {/* /////////////////////////
          //      Contacto       //
          ///////////////////////// */}
      <section className='contact container'>
        <p>
          Contacta con nosotros y asegura un lugar para tus productos en la
          bolsa que se distribuye a todos los estudiantes madrileños una vez por
          cuatrimestre y sorpréndelos con un bonito regalo de parte de tu
          empresa.
        </p>
        <Link to='/contacto' className='btn button--blue'>
          Contáctanos
        </Link>
      </section>
    </div>
  );
}

export default ParaEmpresas;
