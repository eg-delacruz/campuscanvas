import React from 'react';

//Styles
import styles from '@pagestyles/TerminosCondiciones.module.scss';

//Components
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

function TerminosCondiciones() {
  return (
    <>
      <SEOHeader
        tabTitle={'Términos y condiciones'}
        metaName={'Terminos y condiciones'}
        description={'Estos son nuestros términos y condiciones'}
      />

      <Layout>
        <div className={styles.body__gridcontainer}>
          <section className={styles.main}>
            <div className={`${styles.main__container} container`}>
              <ButtonUp />
              <h2>Términos y condiciones</h2>
              <article>
                <h3>Identificación del titular de la Web.</h3>
                <p>
                  {' '}
                  <strong>Campus Canvas </strong>, S.A., con domicilio en XXX
                  XXX, Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar
                  vitae dolor.Integer eu nibh at nisi ullamcorper sagittis id
                  vel leo. Integer feugiat faucibus libero, at maximus nisl
                  suscipit posuere. Morbi nec enim nunc. Phasellus bibendum
                  turpis ut ipsum egestas, sed sollicitudin elit convallis. Cras
                  pharetra mi tristique sapien vestibulum lobortis. Nam eget
                  bibendum metus, non dictum mauris. Nulla at tellus sagittis,
                  viverra est a, bibendum metus.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque nisl eros, pulvinar facilisis justo mollis, auctor
                  consequat urna. Morbi a bibendum metus. Donec scelerisque
                  sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in
                  pretium orci vestibulum eget. Class aptent taciti sociosqu ad
                  litora torquent per conubia nostra, per inceptos himenaeos.
                  Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum
                  lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer
                  eu nibh at nisi ullamcorper sagittis id vel leo. Integer
                  feugiat faucibus libero, at maximus nisl suscipit posuere.
                  Morbi nec enim nunc. Phasellus bibendum turpis ut ipsum
                  egestas, sed sollicitudin elit convallis. Cras pharetra mi
                  tristique sapien vestibulum lobortis. Nam eget bibendum metus,
                  non dictum mauris. Nulla at tellus sagittis, viverra est a,
                  bibendum metus.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque nisl eros, pulvinar facilisis justo mollis, auctor
                  consequat urna. Morbi a bibendum metus. Donec scelerisque
                  sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in
                  pretium orci vestibulum eget. Class aptent taciti sociosqu ad
                  litora torquent per conubia nostra, per inceptos himenaeos.
                  Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum
                  lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer
                  eu nibh at nisi ullamcorper sagittis id vel leo. Integer
                  feugiat faucibus libero, at maximus nisl suscipit posuere.
                  Morbi nec enim nunc. Phasellus bibendum turpis ut ipsum
                  egestas, sed sollicitudin elit convallis. Cras pharetra mi
                  tristique sapien vestibulum lobortis. Nam eget bibendum metus,
                  non dictum mauris. Nulla at tellus sagittis, viverra est a,
                  bibendum metus.
                </p>
              </article>
              <article>
                <h3>Uso del sitio web</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque nisl eros, pulvinar facilisis justo mollis, auctor
                  consequat urna. Morbi a bibendum metus. Donec scelerisque
                  sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in
                  pretium orci vestibulum eget. Class aptent taciti sociosqu ad
                  litora torquent per conubia nostra, per inceptos himenaeos.
                  Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum
                  lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer
                  eu nibh at nisi ullamcorper sagittis id vel leo. Integer
                  feugiat faucibus libero, at maximus nisl suscipit posuere.{' '}
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque nisl eros, pulvinar facilisis justo mollis, auctor
                  consequat urna. Morbi a bibendum metus. Donec scelerisque
                  sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in
                  pretium orci vestibulum eget.{' '}
                </p>
              </article>
              <article>
                <h3>Derechos de propiedad industrial e intelectual</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque nisl eros, pulvinar facilisis justo mollis, auctor
                  consequat urna. Morbi a bibendum metus. Donec scelerisque
                  sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in
                  pretium orci vestibulum eget. Class aptent taciti sociosqu ad
                  litora torquent per conubia nostra, per inceptos himenaeos.
                  Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum
                  lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer
                  eu nibh at nisi ullamcorper sagittis id vel leo. Integer
                  feugiat faucibus libero, at maximus nisl suscipit posuere.{' '}
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque nisl eros, pulvinar facilisis justo mollis, auctor
                  consequat urna. Morbi a bibendum metus.
                </p>
              </article>
              <article>
                <h3>Enlaces a sitios web de terceros</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque nisl eros, pulvinar facilisis justo mollis, auctor
                  consequat urna. Morbi a bibendum metus. Donec scelerisque
                  sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in
                  pretium orci vestibulum eget. Class aptent taciti sociosqu ad
                  litora torquent per conubia nostra, per inceptos himenaeos.
                  Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum
                  lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer
                  eu nibh at nisi ullamcorper sagittis id vel leo. Integer
                  feugiat faucibus libero, at maximus nisl suscipit posuere.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque nisl eros, pulvinar facilisis justo mollis, auctor
                  consequat urna. Morbi a bibendum metus.
                </p>
              </article>
              <article>
                <h3>Responsabilidad</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque nisl eros, pulvinar facilisis justo mollis, auctor
                  consequat urna. Morbi a bibendum metus. Donec scelerisque
                  sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in
                  pretium orci vestibulum eget. Class aptent taciti sociosqu ad
                  litora torquent per conubia nostra, per inceptos himenaeos.
                  Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum
                  lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer
                  eu nibh at nisi ullamcorper sagittis id vel leo. Integer
                  feugiat faucibus libero, at maximus nisl suscipit posuere.
                  Morbi nec enim nunc. Phasellus bibendum turpis ut ipsum
                  egestas, sed sollicitudin elit convallis. Cras pharetra mi
                  tristique sapien vestibulum lobortis. Nam eget bibendum metus,
                  non dictum mauris. Nulla at tellus sagittis, viverra est a,
                  bibendum metus.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque nisl eros, pulvinar facilisis justo mollis, auctor
                  consequat urna. Morbi a bibendum metus. Donec scelerisque
                  sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in
                  pretium orci vestibulum eget. Class aptent taciti sociosqu ad
                  litora torquent per conubia nostra, per inceptos himenaeos.
                  Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum
                  lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer
                  eu nibh at nisi ullamcorper sagittis id vel leo. Integer
                  feugiat faucibus libero, at maximus nisl suscipit posuere.
                  Morbi nec enim nunc. Phasellus bibendum turpis ut ipsum
                  egestas, sed sollicitudin elit convallis. Cras pharetra mi
                  tristique sapien vestibulum lobortis. Nam eget bibendum metus,
                  non dictum mauris. Nulla at tellus sagittis, viverra est a,
                  bibendum metus.
                </p>
              </article>
              <article>
                <h3>Resolución de conflictos</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque nisl eros, pulvinar facilisis justo mollis, auctor
                  consequat urna. Morbi a bibendum metus. Donec scelerisque
                  sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in
                  pretium orci vestibulum eget. Class aptent taciti sociosqu ad
                  litora torquent per conubia nostra, per inceptos himenaeos.
                  Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum
                  lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer
                  eu nibh at nisi ullamcorper sagittis id vel leo. Integer
                  feugiat faucibus libero, at maximus nisl suscipit posuere.
                  Morbi nec enim nunc. Phasellus bibendum turpis ut ipsum
                  egestas, sed sollicitudin elit convallis. Cras pharetra mi
                  tristique sapien vestibulum lobortis. Nam eget bibendum metus,
                  non dictum mauris. Nulla at tellus sagittis, viverra est a,
                  bibendum metus.
                </p>
              </article>
              <div className={styles.main__bottom}>
                <h4>Última actualización: 7/09/2021</h4>
                <h4>
                  Copyright ® Campus Canvas 2021. Todos los derechos reservados
                </h4>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

export default TerminosCondiciones;
