import { useEffect } from 'react';

//Styles
import styles from '@pagestyles/Cookies.module.scss';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

function Cookies() {
  const executeScript = (scriptSource, id, HTMLelementID) => {
    if (typeof window !== 'undefined') {
      const Element = document.getElementById(HTMLelementID);
      const script = document.createElement('script');
      script.setAttribute('id', id);
      script.src = scriptSource;
      script.async = true;
      script.type = 'text/javascript';
      Element.appendChild(script);
    }
  };

  return (
    <>
      <SEOHeader
        tabTitle={'Cookies'}
        metaName={'Cookies'}
        description={'Declaración de cookies'}
      />

      <Layout>
        <div className={styles.body__gridContainer}>
          <main className={styles.main}>
            <ButtonUp />
            <div className={`${styles.main__container} container`}>
              <h2>Declaración de cookies</h2>

              <div id='script_container'></div>

              {executeScript(
                'https://consent.cookiebot.com/56697194-dfde-4726-ae75-dd1721d25c14/cd.js',
                'CookieDeclaration',
                'script_container'
              )}

              {/* <p>
                De momento, la web de Campus Canvas no recopila datos de ningún
                tipo, por consiguiente no se hace rastreo de "cookies" ni de
                ningún tipo de dato del usuario. Nuestra web se limita a ser
                meramente informativa a quien interese. Sin embargo, en futuras
                versiones y actualizaciones de esta, es posible que se
                implemente el uso de cookies para mejorar la usabilidad y los
                servicios que se vayan añadiendo. Estas actualizaciones e
                implementaciones serán notificadas en este apartado de nuestra
                web.
              </p> */}

              {/* //////////////////Descomentar y usar esta estructura en el momento en que se comience a hacer uso de datos, y sustituir lo de arriba/////////////// */}

              {/* <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
              Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu
              venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum
              eget. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut
              vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut,
              pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis
              id vel leo. Integer feugiat faucibus libero, at maximus nisl
              suscipit posuere. Morbi nec enim nunc. Phasellus bibendum turpis
              ut ipsum egestas, sed sollicitudin elit convallis. Cras pharetra
              mi tristique sapien vestibulum lobortis. Nam eget bibendum metus,
              non dictum mauris. Nulla at tellus sagittis, viverra est a,
              bibendum metus.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
              Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu
              venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum
              eget. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut
              vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut,
              pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis
              id vel leo. Integer feugiat faucibus libero, at maximus nisl
              suscipit posuere. Morbi nec enim nunc. Phasellus bibendum turpis
              ut ipsum egestas, sed sollicitudin elit convallis. Cras pharetra
              mi tristique sapien vestibulum lobortis. Nam eget bibendum metus,
              non dictum mauris. Nulla at tellus sagittis, viverra est a,
              bibendum metus.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
              Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu
              venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum
              eget. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut
              vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut,
              pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis
              id vel leo. Integer feugiat faucibus libero, at maximus nisl
              suscipit posuere. Morbi nec enim nunc. Phasellus bibendum turpis
              ut ipsum egestas, sed sollicitudin elit convallis. Cras pharetra
              mi tristique sapien vestibulum lobortis. Nam eget bibendum metus,
              non dictum mauris. Nulla at tellus sagittis, viverra est a,
              bibendum metus.
            </p>
            <h3>¿Qué es una cookie?</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
              Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu
              venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum
              eget. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut
              vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut,
              pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis
              id vel leo. Integer feugiat faucibus libero, at maximus nisl
              suscipit posuere. Morbi nec enim nunc. Phasellus bibendum turpis
              ut ipsum egestas, sed sollicitudin elit convallis. Cras pharetra
              mi tristique sapien vestibulum lobortis. Nam eget bibendum metus,
              non dictum mauris. Nulla at tellus sagittis, viverra est a,
              bibendum metus.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
              Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu
              venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum
              eget. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut
              vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut,
              pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis
              id vel leo. Integer feugiat faucibus libero, at maximus nisl
              suscipit posuere. Morbi nec enim nunc. Phasellus bibendum turpis
              ut ipsum egestas, sed sollicitudin elit convallis. Cras pharetra
              mi tristique sapien vestibulum lobortis. Nam eget bibendum metus,
              non dictum mauris. Nulla at tellus sagittis, viverra est a,
              bibendum metus.
            </p>
            <h3>Uso de cookies por parte del titular</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
              Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu
              venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum
              eget. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut
              vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut,
              pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis
              id vel leo. Integer feugiat faucibus libero, at maximus nisl
              suscipit posuere. Morbi nec enim nunc. Phasellus bibendum turpis
              ut ipsum egestas, sed sollicitudin elit convallis. Cras pharetra
              mi tristique sapien vestibulum lobortis. Nam eget bibendum metus,
              non dictum mauris. Nulla at tellus sagittis, viverra est a,
              bibendum metus.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
              Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu
              venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum
              eget. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut
              vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut,
              pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis
              id vel leo. Integer feugiat faucibus libero, at maximus nisl
              suscipit posuere. Morbi nec enim nunc. Phasellus bibendum turpis
              ut ipsum egestas, sed sollicitudin elit convallis. Cras pharetra
              mi tristique sapien vestibulum lobortis. Nam eget bibendum metus,
              non dictum mauris. Nulla at tellus sagittis, viverra est a,
              bibendum metus.
            </p>
            <h3>Tipos y objetivos de las cookies utilizadas</h3>
            <ul>
              <li>
                Ejemplo 1 de tipos y objetivos: Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Quisque nisl eros, pulvinar
                facilisis justo mollis, auctor consequat urna. Morbi a bibendum
                metus. Donec scelerisque sollicitudin enim eu venenatis. Duis
                tincidunt laoreet ex, in pretium orci vestibulum eget. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra,
                per inceptos himenaeos.
              </li>
              <li>
                Ejemplo 2 de tipos y objetivos: Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Quisque nisl eros, pulvinar
                facilisis justo mollis, auctor consequat urna. Morbi a bi
              </li>
              <li>
                Ejemplo 3 de tipos y objetivos: Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Quisque nisl eros, pulvinar
                facilisis justo mollis, auctor consequat urna. Morbi a bibendum
                metus. Donec scelerisque sollicitudin enim eu venenatis. Duis
                tincidunt laoreet ex, in pretium{' '}
              </li>
            </ul>
            <h3>¿Qué cookies utilizamos en nuestro sitio web?</h3>
            <p>
              Las cookies que utilizamos en nuestro sitio web son cookies
              necesarias y analíticas.
            </p>
            <strong>Cookies necesarias: </strong>
            <ul>
              <li>
                Ejemplo 1 de tipos y objetivos: Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Quisque nisl eros, pulvinar
                facilisis justo mollis, auctor consequat urna. Morbi a bibendum
                metus. Donec scelerisque sollicitudin enim eu venenatis. Duis
                tincidunt laoreet ex, in pretium orci vestibulum eget. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra,
                per inceptos himenaeos.
              </li>
              <li>
                Ejemplo 2 de tipos y objetivos: Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Quisque nisl eros, pulvinar
                facilisis justo mollis, auctor consequat urna. Morbi a bi
              </li>
              <li>
                Ejemplo 3 de tipos y objetivos: Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Quisque nisl eros, pulvinar
                facilisis justo mollis, auctor consequat urna. Morbi a bibendum
                metus. Donec scelerisque sollicitudin enim eu venenatis. Duis
                tincidunt laoreet ex, in pretium
              </li>
            </ul>
            <strong>Cookies analíticas: </strong>
            <ul>
              <li>
                Ejemplo 1 de tipos y objetivos: Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Quisque nisl eros, pulvinar
                facilisis justo mollis, auctor consequat urna. Morbi a bibendum
                metus. Donec scelerisque sollicitudin enim eu venenatis. Duis
                tincidunt laoreet ex, in pretium orci vestibulum eget. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra,
                per inceptos himenaeos.
              </li>
              <li>
                Ejemplo 2 de tipos y objetivos: Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Quisque nisl eros, pulvinar
                facilisis justo mollis, auctor consequat urna. Morbi a bi
              </li>
              <li>
                Ejemplo 3 de tipos y objetivos: Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Quisque nisl eros, pulvinar
                facilisis justo mollis, auctor consequat urna. Morbi a bibendum
                metus. Donec scelerisque sollicitudin enim eu venenatis. Duis
                tincidunt laoreet ex, in pretium
              </li>
            </ul>
            <h3>Configuración del usuario para evitar cookies</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
              Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu
              venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum
              eget. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut
              vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut,
              pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis
              id vel leo. Integer feugiat faucibus libero, at maximus nisl
              suscipit posuere. Morbi nec enim nunc. Phasellus bibendum turpis
              ut ipsum egestas, sed sollicitudin elit convallis. Cras pharetra
              mi tristique sapien vestibulum lobortis. Nam eget bibendum metus,
              non dictum mauris. Nulla at tellus sagittis, viverra est a,
              bibendum metus.
            </p>
            <ul>
              <li>
                Ejemplo 1 de navegador: Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Quisque nisl eros, pulvinar facilisis justo
                mollis, auctor consequat urna. Morbi a bibendum metus. Donec
                scelerisque sollicitudin enim eu venenatis. Duis tincidunt
                laoreet ex, in pretium orci vestibulum eget. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos.
              </li>
              <li>
                Ejemplo 2 de navegador: Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Quisque nisl eros, pulvinar facilisis justo
                mollis, auctor consequat urna. Morbi a bi
              </li>
              <li>
                Ejemplo 3 de navegador: Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Quisque nisl eros, pulvinar facilisis justo
                mollis, auctor consequat urna. Morbi a bibendum metus. Donec
                scelerisque sollicitudin enim eu venenatis. Duis tincidunt
                laoreet ex, in pretium
              </li>
              <li>
                Ejemplo 4 de navegador: Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Quisque nisl eros, pulvinar facilisis justo
                mollis, auctor consequat urna. Morbi a bibendum metus. Donec
                scelerisque sollicitudin
              </li>
            </ul> */}
              <div className={styles.main__bottom}>
                <h4>Última actualización: 22/03/2022</h4>
                <h4>
                  Copyright ® Campus Canvas 2021. Todos los derechos reservados
                </h4>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
}

export default Cookies;
