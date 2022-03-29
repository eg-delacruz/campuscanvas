//Aquí manejamos el SEO de la página de manera global

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />

          {/* Manifest para PWA */}
          <link rel='manifest' href='/manifest.json'></link>

          {/* No se que son */}
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />

          {/* Favicon  */}
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/favicon/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon/favicon-16x16.png'
          />
          <link rel='manifest' href='/favicon/site.webmanifest' />
          <link
            rel='mask-icon'
            href='/favicon/safari-pinned-tab.svg'
            color='#5bbad5'
          />
          <meta name='msapplication-TileColor' content='#da532c' />
          <meta name='theme-color' content='#ffffff' />

          {/* Font1 */}
          <link
            href='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,700;0,800;1,400&display=swap'
            rel='stylesheet'
          />
          {/* Font2 */}
          <link
            href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400&display=swap'
            rel='stylesheet'
          />

          {/* Improves loading performance by loading google fonts parallel to wp load */}
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />

          {/* makes browser color match website */}
          <meta name='theme-color' content='#ffffff' />

          {/* allows search engines to find this page */}
          <meta name='robots' content='index' follow='true' />
        </Head>

        <body>
          {/* Es necesario poner el main y NextScript para que la app funcione bien */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
