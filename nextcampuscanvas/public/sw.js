if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,t)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let a={};const c=e=>i(e,r),d={module:{uri:r},exports:a,require:c};s[r]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(t(...e),a)))}}define(["./workbox-5afaf374"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/IjhndrNMb2em61QjCJP_l/_buildManifest.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/IjhndrNMb2em61QjCJP_l/_middlewareManifest.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/IjhndrNMb2em61QjCJP_l/_ssgManifest.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/50-7b1fa7cf67c968ca.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/518-3ceab53e7639ee3f.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/55-c15772f4edd10831.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/61-088d6f50d259b34d.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/645-413edad4d3919923.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/841-5fd090e8161fb87c.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/894.9047cda612e8fce0.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/main-90b5eed138d28b24.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/404-34af2229d243bb51.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/FAQs-f2633024cb6afc0b.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/_app-469bc2fe2b13c388.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/_error-427958541d1e32b7.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/auth/%5B...reset-password%5D-3d74c2dc48c7430e.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/auth/cuenta_verificada-c371ff50f68e6f8b.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/auth/forgot-password-9f5c8d469297b9ab.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/auth/login-154610be91b4898a.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/auth/registro-df6288ade591bb56.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/blog-85e9b4759a29ea69.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/blog/post/%5Bid%5D-8bbb0cd6d6bd908f.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/condiciones-664db1c0893ed52c.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/construccion-8dc89fc37ee270e3.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/contacto-2b667c00cdc86c78.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/cookies-af0254f6816a6b4c.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/empleo/%5Bid%5D-6cdcb8f2de6c6bd8.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/empleos-987403fa2049bd6a.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/empresas-42dbb8dd576bd365.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/index-1396191375dd9bbd.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/nosotros-c3c7bcc2a93ccd9a.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/privacidad-10d9fa6d43e46b30.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/pages/student/CampusBox-7575aaad66dd5fa5.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/chunks/webpack-68b0ebedd86b2f73.js",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/037652908e74696d.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/05a2dc8abd500133.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/0c28de3b0f6593e8.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/2eabe24c7dd6420f.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/4966b6b8b202c0ce.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/4c2e3fe672472e0c.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/504534ea0c08015a.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/5288778db292cf22.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/5cfbd20227ba84d3.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/6bca80ecd0ff334f.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/773dcbc0f6f0e4c5.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/a13731778a79c7b9.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/a2b53624467a1d77.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/a9ef30b809a7edc5.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/b99ef59d217f6320.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/c0846afaec642c18.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/cdc28ea4caee1ef0.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/d314d71d373cfc2b.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/da701252c09f1a5a.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/e4ba1588f7c5c9ee.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/ed2b546fab67395f.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/css/f4e600ca06e869e4.css",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/2bags.164692d1.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/BG_products.65b01e17.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/BG_sticker_1.3b436c14.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/BG_sticker_2.752604d3.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/BG_sticker_3.82b39845.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/BG_sticker_4.b7f3ee5b.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/BG_sticker_5.b7163dfa.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/BG_sticker_6.522c2dab.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/BG_sticker_7.b7163dfa.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/Blog_logo.6d9934de.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/Box_logo.061596c9.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/Divider.f5767cc0.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/Gerardo.59aad178.jpg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/LargePostImage.057ef81b.jpg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/LargePostImage.e63e482f.jpg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/NotFound404.2e9c5ee5.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/SmallPostImage.3e6a6456.jpg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/SmallPostImage.44e23e8b.jpg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/TrashIcon.4d590a5c.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/arrow_botright.c54a6e5f.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/arrow_left.9f38ea55.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/arrow_right.d9178de6.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/arrow_right_white.bf66a495.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/arrow_topleft.7ad57d2a.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/bag_logo.3b60441e.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/box.6b51ccdd.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/box_and_products.23668142.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/campusbox.7f07c5e4.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/card_coupons.9f5ad698.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/card_gift.2829bdb8.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/card_pages.804d3372.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/check_bullet.337cc965.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/contact_background.488108f7.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/decisionhandler.fcbabd5d.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/distribution_map.996d4b2b.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/distribution_ofice.e87d6b42.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/dropdown_menu_arrow.b8de7bba.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/facebook_icon.179b29ae.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/instagram_icon.17fc7eae.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/linkedin_icon.a05640ca.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/logged_user.e1ae22de.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/logistics_image.dee4a2e6.jpg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/logo.717566f7.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/logo_footer.023cf681.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/logout_icon.120d9112.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/lowerBenefit_img_1.2946305a.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/lowerBenefit_img_2.c9e9c056.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/lowerBenefit_img_3.16f2ef15.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/lowerBenefit_img_4.5df83c05.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/lowerBenefit_img_5.7ad1e2f1.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/nosotros_hero.4702da77.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/profile_icon.a6c3b07b.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/send_email.7fe1dfdc.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/soldout.ca7752f3.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/under_construction.d070e604.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/upload_icon1.e397b943.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/upperBenefit_img_1.7c74364c.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/upperBenefit_img_3.c681886b.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/upperBenefit_img_4.c730cd03.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/upperBenefit_img_5.03427c97.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/upperBenefit_img_6.0682dafd.png",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/_next/static/media/youtube_icon.f1cbaa76.svg",revision:"IjhndrNMb2em61QjCJP_l"},{url:"/favicon/android-chrome-192x192.png",revision:"cff406d03874ff7911905cabd82a1312"},{url:"/favicon/apple-touch-icon.png",revision:"7233942a87d2e54888c61c5db37d8915"},{url:"/favicon/browserconfig.xml",revision:"a493ba0aa0b8ec8068d786d7248bb92c"},{url:"/favicon/favicon-16x16.png",revision:"c457da302e438a747fedb83833e9866d"},{url:"/favicon/favicon-32x32.png",revision:"8a2a57a8ba8f7a79ce1696101b0180be"},{url:"/favicon/favicon.ico",revision:"d026c190513b1b8be392feddbd782038"},{url:"/favicon/mstile-150x150.png",revision:"72ab7c5163060ab104f0cd1519102516"},{url:"/favicon/safari-pinned-tab.svg",revision:"e2bc35328244795696016ae6e1f0b8e3"},{url:"/favicon/site.webmanifest",revision:"c2f552420ee251e4422ca9294463ba95"},{url:"/icon-192x192.png",revision:"bde7015c086d9bd8a4dea02bc1b1660a"},{url:"/icon-256x256.png",revision:"6e2f422eb75995b9f3bdbf56ab6027b8"},{url:"/icon-384x384.png",revision:"7c630d58ae0c5453f5a0926314b5b2d1"},{url:"/icon-512x512.png",revision:"72bf73d8c26d6d82d4a1860b9ed4c65a"},{url:"/manifest.json",revision:"9dc773915d4b63f8181ce9e18a3ae709"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
