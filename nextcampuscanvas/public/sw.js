if(!self.define){let s,i={};const e=(e,t)=>(e=new URL(e+".js",t).href,i[e]||new Promise((i=>{if("document"in self){const s=document.createElement("script");s.src=e,s.onload=i,document.head.appendChild(s)}else s=e,importScripts(e),i()})).then((()=>{let s=i[e];if(!s)throw new Error(`Module ${e} didn’t register its module`);return s})));self.define=(t,n)=>{const a=s||("document"in self?document.currentScript.src:"")||location.href;if(i[a])return;let c={};const v=s=>e(s,a),r={module:{uri:a},exports:c,require:v};i[a]=Promise.all(t.map((s=>r[s]||v(s)))).then((s=>(n(...s),c)))}}define(["./workbox-5afaf374"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/static/Qivss7pGDUHwL01vwqHPf/_buildManifest.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/Qivss7pGDUHwL01vwqHPf/_middlewareManifest.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/Qivss7pGDUHwL01vwqHPf/_ssgManifest.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/41-0aa7a7f7a4a71a59.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/50-7b1fa7cf67c968ca.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/518-3ceab53e7639ee3f.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/55-c15772f4edd10831.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/61-088d6f50d259b34d.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/668-7769793018971c5c.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/894.9047cda612e8fce0.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/main-90b5eed138d28b24.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/404-34af2229d243bb51.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/FAQs-be4fabc8daae5d66.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/_app-469bc2fe2b13c388.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/_error-427958541d1e32b7.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/auth/%5B...reset-password%5D-3d74c2dc48c7430e.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/auth/cuenta_verificada-353822d8660546ec.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/auth/forgot-password-9f5c8d469297b9ab.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/auth/login-ec04a6cd6b57f8b9.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/auth/registro-3ca3535f20018de7.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/blog-bf18476a27320981.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/blog/post/%5Bid%5D-6f67cb3c034feb99.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/condiciones-6cb363644c637a63.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/construccion-8dc89fc37ee270e3.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/contacto-f5e2062bfeac6d86.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/cookies-9fe81168f75e35c1.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/empleo/%5Bid%5D-9e30ee6c6d6b9da5.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/empleos-5822fdc832234dd7.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/empresas-99a223429704e7cd.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/index-7d23cccd2a6358cc.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/nosotros-b301064f129359d0.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/privacidad-4254fdd3d53f9d7b.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/pages/student/CampusBox-57119bed573e312c.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/chunks/webpack-29ba8032248f9673.js",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/0c8f1c783b4e9f37.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/156f37f4c7856a46.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/1d0b98272f946d31.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/3ca17ec6e68c64ea.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/3cbdefc26b3e612c.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/3ece5c759eaecb91.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/4c2e3fe672472e0c.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/5288778db292cf22.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/60914c15f4f8a268.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/61ce86a636e11143.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/6342ece135b84bd1.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/752152a90be2442d.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/880623f75f0f1b5c.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/a5d617a1574e7226.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/b8a459d86ba879af.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/bd67abf15ddfcaa1.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/c0846afaec642c18.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/ca186b89bdada922.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/d902a1630cc62964.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/da701252c09f1a5a.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/e4ba1588f7c5c9ee.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/css/f8a32146f7126c19.css",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/BG_products.65b01e17.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/BG_sticker_1.3b436c14.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/BG_sticker_2.752604d3.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/BG_sticker_3.82b39845.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/BG_sticker_4.b7f3ee5b.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/BG_sticker_5.b7163dfa.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/BG_sticker_6.522c2dab.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/BG_sticker_7.b7163dfa.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/Blog_logo.6d9934de.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/Box_logo.061596c9.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/Divider.f5767cc0.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/Gerardo.59aad178.jpg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/LargePostImage.057ef81b.jpg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/LargePostImage.e63e482f.jpg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/NotFound404.2e9c5ee5.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/SmallPostImage.3e6a6456.jpg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/SmallPostImage.44e23e8b.jpg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/TrashIcon.4d590a5c.png",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/arrow_left.9f38ea55.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/arrow_right.d9178de6.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/arrow_right_white.bf66a495.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/box.6b51ccdd.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/box_and_products.23668142.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/campusbox.7f07c5e4.png",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/card_coupons.9f5ad698.png",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/card_gift.2829bdb8.png",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/card_pages.804d3372.png",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/check_icon.764e931e.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/contact_background.488108f7.png",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/decisionhandler.fcbabd5d.png",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/distribution_map.996d4b2b.png",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/distribution_ofice.e87d6b42.png",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/dropdown_menu_arrow.b8de7bba.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/facebook_icon.179b29ae.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/gift.bdc5fab2.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/instagram_icon.17fc7eae.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/isotype.585a1cfc.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/linkedin_icon.a05640ca.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/logged_user.e1ae22de.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/logistics_image.dee4a2e6.jpg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/logo.717566f7.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/logo_footer.abe26e18.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/logout_icon.120d9112.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/lowerBenefit_img_2.c9e9c056.png",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/lowerBenefit_img_4.5df83c05.png",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/lowerBenefit_img_5.7ad1e2f1.png",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/nosotros_hero.4702da77.png",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/profile_icon.a6c3b07b.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/send_email.7fe1dfdc.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/social_media.8184c272.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/soldout.ca7752f3.png",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/spain_map.64a38503.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/target.4888b0cf.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/under_construction.d070e604.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/upload_icon1.e397b943.png",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/upperBenefit_img_3.23e2a255.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/upperBenefit_img_4.59b9e704.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/upperBenefit_img_5.e66016f6.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/upperBenefit_img_6.d4cd63d4.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/_next/static/media/youtube_icon.f1cbaa76.svg",revision:"Qivss7pGDUHwL01vwqHPf"},{url:"/favicon/android-chrome-192x192.png",revision:"cff406d03874ff7911905cabd82a1312"},{url:"/favicon/apple-touch-icon.png",revision:"7233942a87d2e54888c61c5db37d8915"},{url:"/favicon/browserconfig.xml",revision:"a493ba0aa0b8ec8068d786d7248bb92c"},{url:"/favicon/favicon-16x16.png",revision:"c457da302e438a747fedb83833e9866d"},{url:"/favicon/favicon-32x32.png",revision:"8a2a57a8ba8f7a79ce1696101b0180be"},{url:"/favicon/favicon.ico",revision:"d026c190513b1b8be392feddbd782038"},{url:"/favicon/mstile-150x150.png",revision:"72ab7c5163060ab104f0cd1519102516"},{url:"/favicon/safari-pinned-tab.svg",revision:"e2bc35328244795696016ae6e1f0b8e3"},{url:"/favicon/site.webmanifest",revision:"c2f552420ee251e4422ca9294463ba95"},{url:"/icon-192x192.png",revision:"bde7015c086d9bd8a4dea02bc1b1660a"},{url:"/icon-256x256.png",revision:"6e2f422eb75995b9f3bdbf56ab6027b8"},{url:"/icon-384x384.png",revision:"7c630d58ae0c5453f5a0926314b5b2d1"},{url:"/icon-512x512.png",revision:"72bf73d8c26d6d82d4a1860b9ed4c65a"},{url:"/manifest.json",revision:"9dc773915d4b63f8181ce9e18a3ae709"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:i,event:e,state:t})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const i=s.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
