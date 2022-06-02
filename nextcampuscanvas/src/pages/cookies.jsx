import { useEffect, useState } from 'react';

//Styles
import styles from '@pagestyles/Cookies.module.scss';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Services
import { InsertScript } from '@services/InsertScript';

function Cookies() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      InsertScript(
        'https://consent.cookiebot.com/56697194-dfde-4726-ae75-dd1721d25c14/cd.js',
        'CookieDeclaration',
        'cookiebot_script_container'
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  return (
    <>
      <SEOHeader
        tabTitle={'Cookies'}
        metaName={'Cookies'}
        description={'Declaración de cookies'}
      />

      <Layout>
        <main className={styles.main}>
          <ButtonUp />
          <div className={`${styles.main__container} container`}>
            <h2>Declaración de cookies</h2>

            <div id='cookiebot_script_container'></div>
            {loading && (
              <div className={styles.main__loader}>
                <Loader />
              </div>
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
              <h4>Última actualización: 01/06/2022</h4>
              <h4>
                Copyright ® Campus Canvas 2022. Todos los derechos reservados
              </h4>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

export default Cookies;
