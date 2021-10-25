import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//Redux actions
import * as usuariosActions from '../../actions/usuariosActions';

//Assets
import './FAQs.scoped.scss';

//Components
import ButtonUp from '../../components/ButtonUp/ButtonUp';
import Layout from '../../components/Layout/Layout';

function FAQs(props) {
  // const QUESTIONS = [
  //   {
  //     index: 1,
  //     title: '¿Por qué son las bolsas de Campus Bag totalmente gratis?',
  //     content:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis id vel leo.',
  //   },
  //   {
  //     index: 2,
  //     title: '¿Dónde y cuándo se reparten las bolsas?',
  //     content:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis id vel leo.',
  //   },
  //   {
  //     index: 3,
  //     title:
  //       'Me perdí de la distribución de las bolsas en mi campus, ¿cómo puedo obtener una?',
  //     content:
  //       'Puedes pedir tu Campus Bag en línea en este enlace, o puedes esperar nuestra siguiente repartición. En algunos campus repartimos',
  //   },
  //   {
  //     index: 4,
  //     title: 'Esta es la pregunta frecuente número 4',
  //     content:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis id vel leo.',
  //   },
  //   {
  //     index: 5,
  //     title: 'Esta es la pregunta frecuente número 5',
  //     content:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis id vel leo.',
  //   },
  //   {
  //     index: 6,
  //     title: 'Esta es la pregunta frecuente número 6',
  //     content:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis id vel leo.',
  //   },
  //   {
  //     index: 7,
  //     title: 'Esta es la pregunta frecuente número 7',
  //     content:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis id vel leo.',
  //   },
  //   {
  //     index: 8,
  //     title: 'Esta es la pregunta frecuente número 8',
  //     content:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis id vel leo.',
  //   },
  //   {
  //     index: 9,
  //     title: 'Esta es la pregunta frecuente número 9',
  //     content:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis id vel leo.',
  //   },
  //   {
  //     index: 10,
  //     title: 'Esta es la pregunta frecuente número 10',
  //     content:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis id vel leo.',
  //   },
  // ];

  // const displayQuestions = QUESTIONS.map(({ index, title, content }) => (
  //   <article key={index}>
  //     <h4>{title}</h4>
  //     <p>{content}</p>
  //   </article>
  // ));

  useEffect(() => {
    props.traerTodos();
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
  return reducers.usuariosReducer;
};

export default connect(
  mapStateToProps,
  usuariosActions
)(FAQs);
