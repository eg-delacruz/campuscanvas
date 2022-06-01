import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

//Styles
import styles from '@pagestyles/ParaEmpresas.module.scss';

//assets
import SectionDownButton from '@assets/GeneralUse/IconsAndButtons/section_down';

//Images
import BoxWithProducts from '@assets/PagesImages/HomeImages/box_and_products.svg';
import upperbenefit1 from '@assets/PagesImages/EmpresasImages/gift.svg';
import upperBenefit2 from '@assets/PagesImages/EmpresasImages/target.svg';
import upperBenefit3 from '@assets/PagesImages/EmpresasImages/upperBenefit_img_3.svg';
import upperBenefit4 from '@assets/PagesImages/EmpresasImages/upperBenefit_img_4.svg';
import upperBenefit5 from '@assets/PagesImages/EmpresasImages/upperBenefit_img_5.svg';
import upperBenefit6 from '@assets/PagesImages/EmpresasImages/upperBenefit_img_6.svg';
import lowerBenefit1 from '@assets/PagesImages/EmpresasImages/spain_map.svg';
import lowerBenefit2 from '@assets/PagesImages/EmpresasImages/lowerBenefit_img_2.png';
import lowerBenefit3 from '@assets/PagesImages/EmpresasImages/social_media.svg';
import lowerBenefit4 from '@assets/PagesImages/EmpresasImages/lowerBenefit_img_4.png';
import lowerBenefit5 from '@assets/PagesImages/EmpresasImages/lowerBenefit_img_5.png';
import Check_icon from '@assets/PagesImages/EmpresasImages/check_icon.svg';

//components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import Card from '@components/GeneralUseComponents/Card--ImgTitleText/Card';
import SponsorsSlider from '@components/GeneralUseComponents/SponsorsSlider/SponsorsSlider';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

function ParaEmpresas() {
  const router = useRouter();
  return (
    <>
      <SEOHeader
        tabTitle={'Empresas'}
        metaName={'Empresas'}
        description={
          'Información para empresas sobre nuestros servicios y productos'
        }
      />

      <Layout>
        <div className={styles.body__gridContainer}>
          <ButtonUp />
          {/* /////////////////////////
            //       Hero         //
          ///////////////////////// */}

          <section className={styles.hero}>
            <div className={`${styles.hero__container} container`}>
              <div className={styles.hero__image_container}>
                <Image src={BoxWithProducts} alt='Campus Box con productos' />
              </div>
              <h1 className={styles.hero__title}>
                ¡Impulsa tu producto con nosotros!
              </h1>
            </div>
            <a href='#paraEmpresas_main'>
              <SectionDownButton
                className={styles.hero__sectionDown}
                color='#005EF5'
              />
            </a>
          </section>

          {/* /////////////////////////
            //       Main         //
            ///////////////////////// */}

          <section
            className={`${styles.main} container`}
            id='paraEmpresas_main'
          >
            <h2 className={styles.main__title}>
              Destaca entre los estudiantes universitarios
            </h2>
            <h4 className={styles.main__subtitle}>
              Campus Box está dirigido a empresas que quieran promover su marca
              entre estudiantes universitarios, a través de la distribución de
              productos como:
            </h4>
            <div className={styles.main__distribution_options_container}>
              <div className={styles.main__distribution_option}>
                <div
                  className={styles.main__distribution_option_image_container}
                >
                  <Image layout='fixed' src={Check_icon} alt='Opción 1' />
                </div>

                <div
                  className={styles.main__distribution_option_details_container}
                >
                  <h5 className={styles.main__distribution_option_title}>
                    Productos de consumo producidos por tu marca
                  </h5>
                  <p className={styles.main__distribution_option_description}>
                    Productos de muestra, tales como botellas y latas de
                    refresco, bebidas en polvo, galletas, chocolates, dulces y
                    cualquier otro tipo de comestibles.{' '}
                  </p>
                </div>
              </div>

              <div className={styles.main__distribution_option}>
                <div
                  className={styles.main__distribution_option_image_container}
                >
                  <Image layout='fixed' src={Check_icon} alt='Opción 2' />
                </div>
                <div
                  className={styles.main__distribution_option_details_container}
                >
                  <h5 className={styles.main__distribution_option_title}>
                    Folletos
                  </h5>
                  <p className={styles.main__distribution_option_description}>
                    Ya sea con la finalidad de promocionar tus productos, dar a
                    conocer tu marca o encontrar potenciales candidatos para tu
                    empresa.
                  </p>
                </div>
              </div>
              <div className={styles.main__distribution_option}>
                <div
                  className={styles.main__distribution_option_image_container}
                >
                  <Image layout='fixed' src={Check_icon} alt='Opción 3' />
                </div>
                <div
                  className={styles.main__distribution_option_details_container}
                >
                  <h5 className={styles.main__distribution_option_title}>
                    Cupones de descuento
                  </h5>
                  <p className={styles.main__distribution_option_description}>
                    Impulsa tus productos otorgando descuentos exclusivos en
                    tecnología, tiendas en línea o eventos de ocio para la
                    comunidad estudiantil.
                  </p>
                </div>
              </div>
              <div className={styles.main__distribution_option}>
                <div
                  className={styles.main__distribution_option_image_container}
                >
                  <Image layout='fixed' src={Check_icon} alt='Opción 4' />
                </div>
                <div
                  className={styles.main__distribution_option_details_container}
                >
                  <h5 className={styles.main__distribution_option_title}>
                    Productos de utilidad para estudiantes
                  </h5>
                  <p className={styles.main__distribution_option_description}>
                    Muestras de productos cosméticos, de higiene y uso personal;
                    merchandising de tu marca como bolígrafos, agendas, bolsas
                    ecológicas, etc.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* /////////////////////////
          //   Upper Benefits    //
          ///////////////////////// */}

          <section className={styles.upperBenefits}>
            <div className={`${styles.upperBenefits__container} container`}>
              <h2>¿Por qué confiar en nuestro servicio</h2>
              <h4 className={styles.upperBenefits__subtitle}>
                Somos la primera empresa publicitaria en España enfocada en
                estudiantes
              </h4>
              <div className={styles.beneficios__container}>
                <Card
                  image={upperbenefit1}
                  imgAlt='Imagen de tarjeta'
                  title='Da una percepción positiva a tu marca'
                >
                  Nuestra <b>Campus Box</b> es percibida como un regalo por el
                  estudiante. ¿Qué mejor manera de promover tus productos?
                </Card>

                <Card
                  image={upperBenefit2}
                  imgAlt='Imagen de tarjeta'
                  title='Una forma distinta de hacer publicidad'
                >
                  Diferénciate de tu competencia al utilizar un medio de
                  publicidad menos saturado y mejor enfocado a tu cliente
                  objetivo.
                </Card>

                <Card
                  image={upperBenefit3}
                  imgAlt='Imagen de tarjeta'
                  title='Contacto directo con estudiantes internacionales'
                >
                  Las universidades Españolas acogen muchos estudiantes
                  internacionales a lo largo del año. Dales una buena impresión
                  de tus productos.
                </Card>

                <Card
                  image={upperBenefit4}
                  imgAlt='Imagen de tarjeta'
                  title='Perfecto para nuevas empresas'
                >
                  Si eres una nueva empresa con productos o servicios
                  interesantes para estudiantes, date a conocer a través de
                  nosotros.
                </Card>

                <Card
                  image={upperBenefit5}
                  imgAlt='Imagen de tarjeta'
                  title='Un punto de contacto más con clientes potenciales'
                >
                  Tener diversos puntos de contacto con tus clientes puede hacer
                  la diferencia. Nosotros añadimos un punto más a tu lista.
                </Card>

                <Card
                  image={upperBenefit6}
                  imgAlt='Imagen de tarjeta'
                  title='Obtén feedback de tus productos'
                >
                  Recopilamos información sobre la opinión de los estudiantes
                  respecto a tu marca a través de encuestas
                </Card>
              </div>
            </div>
          </section>

          {/* /////////////////////////
          //   Under Benefits    //
          ///////////////////////// */}

          <section className={`${styles.underBenefits} container`}>
            <article className={styles.beneficio}>
              <div className={styles.beneficio__informacion}>
                <h4>Cubrimos toda España peninsular </h4>
                <p>
                  Con más de 1 500 000 estudiantes, España ofrece un gran
                  potencial para nuestro servicio, pues nuestro objetivo es
                  promover e impulsar tu marca a través de <b>Campus Bag</b> en
                  todos los rincones de España mediante campañas publicitarias
                  efectivas.
                </p>
              </div>
              <figure className={styles.beneficio__imagen}>
                <img src={lowerBenefit1.src} alt='Comunidad de Madrid' />
              </figure>
            </article>

            <hr className={styles.beneficio__hr} />

            <article
              className={`${styles.beneficio} ${styles['beneficio--flipped']}`}
            >
              <div className={styles.beneficio__informacion}>
                <h4>La forma perfecta de encontrar candidatos</h4>
                <p>
                  Encuentra a los mejores candidatos para tu empresa
                  directamente en las universidades. A través de nosotros puedes
                  ofrecer bacantes para estudiantes en prácticas, de media
                  jornada, jornada completa o del tipo que necesites.
                </p>
              </div>
              <figure className={styles.beneficio__imagen}>
                <img src={lowerBenefit2.src} alt='Comunidad de Madrid' />
              </figure>
            </article>

            <hr className={styles.beneficio__hr} />

            <article className={styles.beneficio}>
              <div className={styles.beneficio__informacion}>
                <h4>Estudiantes, los reyes de las redes sociales</h4>
                <p>
                  La comunidad estudiantil destaca por su facilidad y
                  naturalidad del manejo de redes sociales. Promover tus
                  productos en este segmento aumenta las posibilidades de un
                  marketing boca a boca efectivo, gracias a la facilidad de
                  comunicación y envío de información.
                </p>
              </div>
              <figure
                className={`${styles.beneficio__imagen} ${styles.beneficio__imgSizeModif}`}
              >
                <img src={lowerBenefit3.src} alt='Comunidad de Madrid' />
              </figure>
            </article>

            <hr className={styles.beneficio__hr} />

            <article
              className={`${styles.beneficio} ${styles['beneficio--flipped']}`}
            >
              <div className={styles.beneficio__informacion}>
                <h4>Diseñamos tu publicidad</h4>
                <p>
                  En conjunto contigo, diseñamos tus folletos publicitarios y
                  nos encargamos de su impresión. Si lo prefieres, puedes
                  enviarnos el diseño de tu volante y nosotros continuaremos el
                  proceso de impresión y distribución a través de Campus Box
                </p>
              </div>
              <figure
                className={`${styles.beneficio__imagen} ${styles.beneficio__imgSizeModif}`}
              >
                <img src={lowerBenefit4.src} alt='Comunidad de Madrid' />
              </figure>
            </article>

            <hr className={styles.beneficio__hr} />

            <article className={styles.beneficio}>
              <div className={styles.beneficio__informacion}>
                <h4>Múltiples opciones para tus productos</h4>
                <p>
                  Uno de los objetivos de <b> Campus Box</b> es entregar valor
                  al estudiante. Por ello, incitamos a nuestros patrocinadores a
                  contribuir a ella principalmente con productos interesantes de
                  su marca, y de esta manera generar una{' '}
                  <b>imagen de marca positiva</b> . Otras maneras de contribuir
                  es a través de flyers o cupones con descuentos, ofertas
                  atractivas u ofertas de empleo.
                </p>
              </div>
              <figure
                className={`${styles.beneficio__imagen} ${styles.beneficio__imgSizeModif}`}
              >
                <img src={lowerBenefit5.src} alt='Comunidad de Madrid' />
              </figure>
            </article>
          </section>

          <SponsorsSlider titulo='Estas empresas ya confían en nosotros' />

          {/* /////////////////////////
          //      Contacto       //
          ///////////////////////// */}
          <section className={`${styles.contact} container`}>
            <p>
              Contacta con nosotros, y asegura un lugar para tus productos en la
              caja que se distribuye a todos los estudiantes universitarios una
              vez por cuatrimestre, y sorpréndelos con un bonito gesto de parte
              de tu empresa.
            </p>

            <button
              onClick={() => {
                router.push(
                  { pathname: '/contacto', query: { CV: false } },
                  'contacto'
                );
              }}
              className='btn button--blue'
            >
              Contáctanos
            </button>
          </section>
        </div>
      </Layout>
    </>
  );
}

export default ParaEmpresas;
