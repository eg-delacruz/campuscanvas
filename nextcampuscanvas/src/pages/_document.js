//Aquí manejamos el SEO de la página de manera global

import { Html, Head, Main, NextScript } from 'next/document';

//TODO: clean the dangerourslySetInnerHTML
export default function Document() {
  return (
    <Html lang='es'>
      <Head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />

        {/* Google Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
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

        {/* TradeTracker site verification */}
        <meta
          name='tradetracker-site-verification'
          content='81f3cacd79c1298746f18e41200e617c8d19ec03'
        />

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

        {/* Cookie consent banner and widget */}
        {/* <script
          id='Cookiebot'
          src='https://consent.cookiebot.com/uc.js'
          data-cbid='56697194-dfde-4726-ae75-dd1721d25c14'
          data-blockingmode='auto'
          type='text/javascript'
          onError={() => {
            console.error('Script failed to load');
          }}
        /> */}

        {/* Facebook Pixel */}
        <meta
          name='facebook-domain-verification'
          content='3qz9uu9j751op1snjiaemodbjgc0mt'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `!(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js'
      );

      fbq('init', '771964337451446');
      fbq('track', 'PageView');`,
          }}
        />

        {/* Facebook Pixel */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img
          height='1'
          width='1'
          style='display:none'
          src='https://www.facebook.com/tr?id=771964337451446&ev=PageView&noscript=1'
        />`,
          }}
        />
      </Head>

      <body>
        {/* Es necesario poner el main y NextScript para que la app funcione bien */}
        <Main />
        <NextScript />
        <div id='modal-root'></div>
      </body>
    </Html>
  );
}
