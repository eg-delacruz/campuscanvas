import React from 'react';
import { Link } from 'react-router-dom';

//Assets
import './FAQs.scoped.scss';

//Components
import ButtonUp from '../../components/ButtonUp/ButtonUp';

function FAQs() {
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

  return (
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
              <h4>¿Por qué son las bolsas de Campus Bag totalmente gratis?</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                nisl eros, pulvinar facilisis justo mollis, auctor consequat
                urna. Morbi a bibendum metus. Donec scelerisque sollicitudin
                enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci
                vestibulum eget. Class aptent taciti sociosqu ad litora torquent
                per conubia nostra, per inceptos himenaeos. Duis pharetra luctus
                lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere
                ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper
                sagittis id vel leo.
              </p>
            </article>
            <article>
              <h4>¿Dónde y cuándo se reparten las bolsas?</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                nisl eros, pulvinar facilisis justo mollis, auctor consequat
                urna. Morbi a bibendum metus. Donec scelerisque sollicitudin
                enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci
                vestibulum eget. Class aptent taciti sociosqu ad litora torquent
                per conubia nostra, per inceptos himenaeos. Duis pharetra luctus
                lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere
                ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper
                sagittis id vel leo.
              </p>
            </article>
            <article>
              <h4>
                Me perdí de la distribución de las bolsas en mi campus, ¿cómo
                puedo obtener una?
              </h4>
              <p>
                Puedes pedir tu Campus Bag en línea en este enlace, o puedes
                esperar nuestra siguiente repartición. En algunas universidades
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
                <Link to='/construccion'> formulario de contacto </Link>. Con
                mucho gusto te enviaremos toda la información que necesites.
              </p>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}

export default FAQs;
