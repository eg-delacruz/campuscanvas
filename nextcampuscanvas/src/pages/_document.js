//Aquí manejamos el SEO de la página de manera global

//Purufy inserted external html
import DOMPurify from 'isomorphic-dompurify';

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  //Sanitysing the html
  function createHTMLElement(string) {
    return { __html: DOMPurify.sanitize(string) };
  }

  return (
    <Html lang='es'>
      <Head>
        {/* RBH Cookie consent (start) */}
        <link rel='stylesheet' href='https://pdcc.gdpr.es/pdcc.min.css' />
        <script charSet='utf-8' src='https://pdcc.gdpr.es/pdcc.min.js' />

        <script
          type='text/javascript'
          dangerouslySetInnerHTML={createHTMLElement(`
          PDCookieConsent.config({
          "brand": {
          "dev" : false,
          "name": "Robher Asesores, SL",
          "url" : "https://rbhglobal.com",
          "websiteOwner" : "Campus Canvas SL"
          },
          "showBadges": true,
          "cookiePolicyLink": "https://www.campuscanvas.net/cookies",
          "hideModalIn": ["https://www.campuscanvas.net/cookies"],
          "styles": {
          "primaryButton": {
          "bgColor" : "#ad2146",
          "txtColor": "#f5f5f5"
          },
          "secondaryButton": {
          "bgColor" : "#5b0791",
          "txtColor": "#f5f5f5"
          },
          "cookieButton": {
          "activedColor" : "#ad2146",
          "disabledColor" : "#ad2146"
          }
          }
          });
        `)}
        />

        <script
          type='text/javascript'
          dangerouslySetInnerHTML={createHTMLElement(`
        PDCookieConsent.blockList([{
          "contain": "doubleclick",
          "name": "Google Ads",
          "actived": true,
          "editable:": false,
          "visible": false
        }])`)}
        />
        {/* RBH Cookie consent (end) */}

        {/* makes browser color match website */}
        <meta name='theme-color' content='#ffffff' />

        {/* allows search engines to find this page */}
        <meta name='robots' content='index' follow='true' />

        {/* Facebook Pixel */}
        <meta
          name='facebook-domain-verification'
          content='3qz9uu9j751op1snjiaemodbjgc0mt'
        />

        {/* TradeTracker site verification */}
        <meta
          name='tradetracker-site-verification'
          content='81f3cacd79c1298746f18e41200e617c8d19ec03'
        />

        <meta charSet='utf-8' />

        {/* No se que son */}
        {/* TODO: erase this line, since not necesary anymore */}
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />

        {/* Manifest para PWA */}
        <link rel='manifest' href='/manifest.json'></link>

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

        {/* Google Analytics (start) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />

        <script
          dangerouslySetInnerHTML={createHTMLElement(`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
            `)}
        />

        {/* Google Analytics (end) */}

        {/* Google Tag Manager (start) */}
        <script
          dangerouslySetInnerHTML={createHTMLElement(`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KJFK925')`)}
        />

        {/* Google Tag Manager (end) */}

        {/* Facebook Pixel */}
        <script
          dangerouslySetInnerHTML={createHTMLElement(`!(function (f, b, e, v, n, t, s) {
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
        fbq('track', 'PageView');`)}
        />

        <noscript
          dangerouslySetInnerHTML={createHTMLElement(`<img
          height='1'
          width='1'
          style='display:none'
          src='https://www.facebook.com/tr?id=771964337451446&ev=PageView&noscript=1'
        />`)}
        />
      </Head>

      <body>
        {/* Google Tag Manager nonscript (start) */}
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-KJFK925'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* Google Tag Manager nonscript (end) */}

        {/* Es necesario poner el main y NextScript para que la app funcione bien */}
        <Main />
        <NextScript />
        <div id='modal-root'></div>
      </body>
    </Html>
  );
}
