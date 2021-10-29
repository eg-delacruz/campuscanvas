import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//Redux actions
import * as jobsActions from '../../actions/jobsActions';

//Assets
import './FAQs.scoped.scss';

//Components
import ButtonUp from '../../components/ButtonUp/ButtonUp';
import Layout from '../../components/Layout/Layout';

function FAQs(props) {
  useEffect(() => {
    props.traerTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //en las props se guarda todo lo que está en initialState del reducer.
  //también se guardan los actions.
  console.log(props);

  return (
    <Layout>
      <div>
        {/* /////////////////////////
            //       Main        //
            ///////////////////////// */}
        <main>
          <ButtonUp />
          <div className='main__container container'>
            <h2 className='main__title'>Preguntas frecuentes</h2>
            <section className='main__questionList'>
              <article>
                <h4>
                  ¿Por qué son las bolsas de Campus Bag totalmente gratis?
                </h4>
                <p>
                  El contenido de nuestra <strong>Campus Bag</strong> es
                  totalmente patrocinado por empresas que quieren dar a conocer
                  y promover sus productos entre los estudiantes en España; qué
                  mejor manera de hacerlo que obsequiándotelos para que puedas
                  disfrutar de ellos.
                </p>
              </article>
              <article>
                <h4>¿Dónde y cuándo se reparten las bolsas?</h4>
                <p>
                  En nuestra{' '}
                  <Link to='/construccion'>
                    lista de universidades y ubicaciones
                  </Link>{' '}
                  puedes verificar si tu universidad forma parte de nuestros
                  puntos de repartición. Hacemos nuestro mejor esfuerzo por
                  llevarte tu <strong> Campus Bag</strong> al menos una vez por
                  cuatrimestre. Si tu universidad no se encuentra en nuestra
                  lista, ¡no te desanimes! Estamos constantemente en expansión y
                  seguramente en un futuro próximo también estaremos en tu
                  campus.
                </p>
              </article>
              <article>
                <h4>
                  Me perdí de la distribución de las bolsas en mi campus, ¿cómo
                  puedo obtener una?
                </h4>
                <p>
                  Puedes pedir tu <strong> Campus Bag</strong> en línea en{' '}
                  <Link to='/construccion'>este enlace</Link> , o puedes esperar
                  nuestra siguiente repartición. En algunas universidades
                  repartimos incluso dos veces en el mismo cuatrimestre.
                </p>
              </article>
              <article>
                <h4>
                  Me gustaría promocionar un producto con ustedes, ¿Dónde puedo
                  encontrar información?
                </h4>
                <p>
                  Puedes enviarnos un Email a{' '}
                  <a href='mailto:campuscanvas.info@gmail.com'>
                    <span>campuscanvas.info@gmail.com</span>
                  </a>{' '}
                  o utilizar nuestro{' '}
                  <Link to='/contacto'> formulario de contacto </Link>. Con
                  mucho gusto te enviaremos toda la información que necesites.
                </p>
              </article>
            </section>
          </div>
        </main>
      </div>
    </Layout>
  );
}

//Maps state defined in the reducer to the props.
const mapStateToProps = (reducers) => {
  //accedemos al reducer que nos interesa
  return reducers.jobsReducer;
};

export default connect(
  mapStateToProps,
  jobsActions
)(FAQs);
