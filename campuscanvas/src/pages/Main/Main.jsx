import React from 'react';
import './Main.scoped.scss';
import { Link } from 'react-router-dom';

//Assets
import Hero_image from '../../assets/static/bags_hero2x.png';
import Bag_logo from '../../assets/static/bag_logo.svg';
import Bag_example from '../../assets/static/bag2x.png';
import Card_gift from '../../assets/static/card_gift.png';
import Card_pages from '../../assets/static/card_pages.png';
import Card_coupons from '../../assets/static/card_coupons.png';
import Distribution_map from '../../assets/static/distribution_map2x.png';
import Distributon_house from '../../assets/static/distribution_house2x.png';

//Componentes
import Layout from '../../components/Layout/Layout';
import Carousel from '../../components/Carousel/Carousel';
import ButtonUp from '../../components/ButtonUp/ButtonUp';

function Main() {
  return (
    <div className='body__gridContainer'>
      <Layout>
        {/* /////////////////////////
            //       Hero        //
            ///////////////////////// */}

        <section className='hero'>
          <div className='hero__container container'>
            <h1 className='hero__title'>
              ¡La bolsa más esperada por los estudiantes!
            </h1>
            <figure className='hero__image-container' width={1112} height={461}>
              <img
                className='hero__image'
                src={Hero_image}
                alt='Bolsas Campus Canvas'
              />
            </figure>
          </div>
        </section>

        {/* /////////////////////////
            //       Main         //
            ///////////////////////// */}

        <main>
          <div className='main__container container'>
            <figure className='main__title-container'>
              <img src={Bag_logo} alt='Logo de Campus Bags' />
            </figure>
            <section className='main__content'>
              <figure className='main__content-image'>
                <img
                  src={Bag_example}
                  width={687}
                  height='531.31'
                  alt='Ejemplo de bolsa de Campus Canvas'
                />
              </figure>
              <div className='main__description-container'>
                <p className='main__content-description'>
                  Si eres un estudiante de alguna de las principales
                  universidades de la Comunidad de Madrid, podrás recibir una de
                  nuestras bolsas
                  <strong> Campus Bag </strong> llena de regalos y productos
                  pensados especialmente para ti de parte de nuestros
                  patrocinadores. ¡Todo completamente gratis!
                  <br />
                  <br />
                  Repartimos las bolsas una vez a lo largo del cuatrimestre
                  estudiantil, cerca de alguno de los punto de acceso a tu
                  universidad. Consulta nuestro
                  <Link to='/construccion'> calendario de visitas</Link>, donde
                  podrás enterarte del día y la hora de nuestra visita a tu
                  campus. ¡No te quedes sin la tuya!
                </p>
              </div>
            </section>
          </div>
        </main>

        {/* /////////////////////////
            //      Benefits       //
            ///////////////////////// */}

        <section className='benefits'>
          <div className='benefits__container container'>
            <div className='benefits__cards'>
              <article className='card'>
                <div className='card__image'>
                  <img src={Card_gift} alt='Productos de la bolsa' />
                </div>
                <div className='card__information'>
                  <h4>Productos</h4>
                  <p>
                    Encuentra distintos comestibles como galletas, chocolatinas
                    y golosinas, además de productos que pueden serte de
                    utilidad en tus estudios.
                  </p>
                </div>
              </article>
              <article className='card'>
                <div className='card__image'>
                  <img src={Card_pages} alt='Ofertas de trabajo' />
                </div>
                <div className='card__information'>
                  <h4>Ofertas de trabajo</h4>
                  <p>
                    Ya sean ofertas de estudiantes en prácticas o jornadas de
                    tiempo completo, conecta de primero con tus empresas
                    favoritas.
                  </p>
                </div>
              </article>
              <article className='card'>
                <div className='card__image'>
                  <img src={Card_coupons} alt='Cupones y descuentos' />
                </div>
                <div className='card__information'>
                  <h4>Cupones y descuentos</h4>
                  <p>
                    Ahorra dinero con nosotros a través de códigos de descuento
                    exclusivos para distintos productos, eventos y otras
                    actividades
                  </p>
                </div>
              </article>
            </div>
            <div className='benefits__description'>
              <h2>¡Contenido para todos los gustos!</h2>
              <p>
                El contenido de nuestra Campus Bag puede ser distinto según el
                área en la que estudias. Seguro que en la tuya encuentras más de
                algún producto interesante para ti, pues nuestras marcas
                patrocinadoras provienen de distintas industrias y sectores.
              </p>
            </div>
          </div>
        </section>

        {/* /////////////////////////
            //    Distribution     //
            ///////////////////////// */}

        <section className='distribution'>
          <div className='distributionMadrid container'>
            <h2>Espéranos en tu universidad de la Comunidad de Madrid</h2>
            <figure>
              <img
                src={Distribution_map}
                alt='Mapa de distribución en Madrid'
              />
            </figure>
            <p>
              Si eres estudiante en una de las universidades de la Comunidad de
              Madrid, podrás recibir tu Campus Bag en alguna de nuestras visitas
              a tu campus.
            </p>
          </div>
          <div className='distributionDelivery container'>
            <h2>O te la llevamos hasta tu casa</h2>
            <figure>
              <img
                src={Distributon_house}
                alt='Te enviamos la Campus Bag a casa'
              />
            </figure>
            <h4>Tú solo pagas el envío</h4>
            <Link className='btn button-red' to='/construccion'>
              ¡Pedir Campus Bag!
            </Link>
          </div>
        </section>

        {/* /////////////////////////
            //   Patrocinadores    //
            ///////////////////////// */}

        <Carousel />
      </Layout>
    </div>
  );
}

export default Main;
