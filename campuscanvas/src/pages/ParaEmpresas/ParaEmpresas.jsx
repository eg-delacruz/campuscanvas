import React from 'react';
import './ParaEmpresas.scoped.scss';
import { Link } from 'react-router-dom';

//assets
import BagLogo from '../../assets/static/GeneralUse/Logos/bag_logo.svg';
import Bagsx2 from '../../assets/static/PagesImages/EmpresasImages/2bags.png';
import SectionDownButton from '../../assets/static/GeneralUse/IconsAndButtons/section_down';

//Images
import upperBenefit1 from '../../assets/static/PagesImages/EmpresasImages/upperBenefit_img_1.png';
import Card_gift from '../../assets/static/GeneralUse/card_gift.png';
import upperBenefit3 from '../../assets/static/PagesImages/EmpresasImages/upperBenefit_img_3.png';
import upperBenefit4 from '../../assets/static/PagesImages/EmpresasImages/upperBenefit_img_4.png';
import upperBenefit5 from '../../assets/static/PagesImages/EmpresasImages/upperBenefit_img_5.png';
import upperBenefit6 from '../../assets/static/PagesImages/EmpresasImages/upperBenefit_img_6.png';
import lowerBenefit1 from '../../assets/static/PagesImages/EmpresasImages/lowerBenefit_img_1.png';
import lowerBenefit2 from '../../assets/static/PagesImages/EmpresasImages/lowerBenefit_img_2.png';
import lowerBenefit3 from '../../assets/static/PagesImages/EmpresasImages/lowerBenefit_img_3.png';
import lowerBenefit4 from '../../assets/static/PagesImages/EmpresasImages/lowerBenefit_img_4.png';
import lowerBenefit5 from '../../assets/static/PagesImages/EmpresasImages/lowerBenefit_img_5.png';

//components
import HelmetLayout from '../../components/GeneralUseComponents/HelmetLayout/HelmetLayout';
import Layout from '../../components/GeneralUseComponents/Layout/Layout';
import ButtonUp from '../../components/GeneralUseComponents/ButtonUp/ButtonUp';
import Card from '../../components/GeneralUseComponents/Card--ImgTitleText/Card';
import Patrocinadores from '../../components/GeneralUseComponents/Carousel/Carousel';

function ParaEmpresas() {
  return (
    <Layout>
      <HelmetLayout
        title='Empresas'
        subtitle='Información para empresas sobre nuestros servicios y productos'
      />
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
              ¡La bolsa más esperada por los estudiantes!
            </h1>
            <figure>
              <img src={Bagsx2} alt='Ejemplos bolsas Campus Bag' />
            </figure>
          </div>
          <a href='#paraEmpresas_main'>
            <SectionDownButton className='hero__sectionDown' color='#3a86ff' />
            {/* <img src={sectionDown} alt='Bajar a siguiente sección' /> */}
          </a>
        </section>

        {/* /////////////////////////
            //       Main         //
            ///////////////////////// */}

        <section className='main container' id='paraEmpresas_main'>
          <h2 className='main__title1'>¡Regala una sonrisa al estudiante!</h2>

          <p className='main__content1'>
            Nuestro servicio Campus Bag tiene como principal objetivo obsequiar
            productos y servicios a los estudiantes universitarios a través de
            un modelo de patrocinios. A lo largo del cuatrimestre estudiantil
            nos acercamos a los distintos campus de las universidades madrileñas
            a entregar bolsas con todo tipo de contenido relevante para los
            estudiantes. <br /> <br /> Estos van desde productos comestibles
            como galletas, chocolatinas, chucherías y bebidas de todo tipo,
            hasta muestras de productos cosméticos, productos de oficina como
            bolígrafos y útiles escolares, flyers, cupones de descuento e
            incluso ofertas de empleo y búsqueda de candidatos. Todo con el
            objetivo de brindar valor a los estudiantes y generar una imagen de
            marca positiva.
            <br />
          </p>

          <h2 className='main__title2'>
            <b> Repartimos </b>por ti los siguientes productos...
          </h2>

          <ul className='main__content2'>
            <li>
              <h4>
                Productos funcionales o de consumo producidos por tu marca
                (recomendado)
              </h4>
              <p>
                Productos de muestra producidos por tu marca, como botellas y
                latas de refresco, refrescos en polvo, galletas, chocolates,
                dulces y cualquier otro tipo de comestibles. También muestras de
                productos cosméticos o productos de oficina como bolígrafos y
                útiles escolares.
              </p>
            </li>

            <li>
              <h4>Folletos</h4>
              <p>
                Ya sea con la finalidad de promocionar tus productos, dar a
                conocer tu marca o encontrar potenciales candidatos para tu
                empresa.
              </p>
            </li>

            <li>
              <h4>Tu anuncio impreso directamente en la bolsa</h4>
              <p>
                Puedes anunciarte en una de las caras de las Campus Bag,
                formando así, parte de su diseño.
              </p>
            </li>
          </ul>
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
                estudiantes internacionales en Madrid.
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
                Tener diversos puntos de contacto con tus clientes puede hacer
                la diferencia. Nosotros añadimos uno más a tu lista.
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
                una <b>Campus Bag</b> a cada uno de ellas/os cada cuatrimestre.
                La espectativa generada por nuestra bolsa garantiza a tu empresa
                una campaña de publicidad efectiva.
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
                Encuentra a los mejores candidatos para tu empresa directamente
                en las universidades. Con nosotros puedes ofrecer bacantes para
                estudiantes en prácticas, de media jornada, jornada completa o
                de cualquier otro tipo.
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
                Campus Bag en toda la{' '}
                <Link to='/universidades'>comunidad de Madrid</Link>, pudiendo
                así llegar a los estudiantes de las universidades más grandes
                del área. A lo largo de cada cuatrimestre estudiantil, todas
                estas universidades son visitadas como mínimo una vez por
                nuestro equipo. De esta manera no te tienes que preocupar por la
                logística de distribución, ¡déjalo en nuestras manos!
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
                tinta, duo tonos, coated, uncoated, etc.
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
                Uno de los objetivos de nuestra <b> Campus Bag</b> es obsequiar
                valor al estudiante. Por ello, incitamos a nuestros
                patrocinadores a contribuir a ella principalmente con productos
                interesantes de su marca, y de esta manera generar una imagen de
                marca positiva de cara a los estudiantes. También puedes poner
                productos como flyers o cupones con descuentos, ofertas
                atractivas y ofertas de empleo.
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
            bolsa que se distribuye a todos los estudiantes madrileños, y
            sorpréndelos con un bonito regalo de parte de tu empresa.
          </p>
          <Link
            to={{ pathname: '/contacto', state: { CV: false } }}
            className='btn button--blue'
          >
            Contáctanos
          </Link>
        </section>
      </div>
    </Layout>
  );
}

export default ParaEmpresas;
