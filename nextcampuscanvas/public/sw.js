if(!self.define){let e,t={};const s=(s,i)=>(s=new URL(s+".js",i).href,t[s]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=t,document.head.appendChild(e)}else e=s,importScripts(s),t()})).then((()=>{let e=t[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,a)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(t[r])return;let n={};const o=e=>s(e,r),c={module:{uri:r},exports:n,require:o};t[r]=Promise.all(i.map((e=>c[e]||o(e)))).then((e=>(a(...e),n)))}}define(["./workbox-5afaf374"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/ZDHXIbIXByoYrtaT7eB_V/_buildManifest.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/ZDHXIbIXByoYrtaT7eB_V/_middlewareManifest.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/ZDHXIbIXByoYrtaT7eB_V/_ssgManifest.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/451-d90e8b968ed90db1.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/50-7b1fa7cf67c968ca.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/55-c15772f4edd10831.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/61-088d6f50d259b34d.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/668-7769793018971c5c.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/841-74e8a42ada550533.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/894.9047cda612e8fce0.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/main-90b5eed138d28b24.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/404-34af2229d243bb51.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/FAQs-bcd2aa4909b2715d.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/_app-469bc2fe2b13c388.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/_error-427958541d1e32b7.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/auth/%5B...reset-password%5D-e69581be07f02979.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/auth/cuenta_verificada-c7158ed33c00ffb3.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/auth/forgot-password-bde86f7e8fa56870.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/auth/login-342fe9afe5c2aa97.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/auth/registro-123adedd67ed550b.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/blog-2dd0201ef01bfee0.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/blog/post/%5Bid%5D-c318a01bc781d039.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/condiciones-7b038ed7c3d91e58.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/construccion-8dc89fc37ee270e3.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/contacto-369172b73b48b8b9.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/cookies-de570c29694a05f7.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/empleo/%5Bid%5D-4d903e3c8fe786d7.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/empleos-53d60717fa801611.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/empresas-75646d2121f6a26d.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/index-8a39b7b1a87975ff.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/nosotros-e815f4783f2b713c.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/privacidad-5f828fdadd287602.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/pages/student/CampusBox-5571203f558ebea6.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/chunks/webpack-a30129c94ec37063.js",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/0bd81adfddd1d830.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/153fceb8f73be420.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/47851a4a6eb160da.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/54bd40d74467a92e.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/58ba22db35ccd6a3.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/7786fa79a5ad3027.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/7e7e820ccdf71bab.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/82763e13354314fe.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/88fb825335e5dbf5.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/a06c1c947fa17cc0.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/a13731778a79c7b9.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/b1738b4c4b4e0d6a.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/b99ef59d217f6320.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/c4b2f3fb80a9964e.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/c5d3a33e0bd1ee3b.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/c90d6664ed9bc775.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/d2c27d2f4eef50cb.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/ea1fd020f709b92f.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/ec6f025a919dc275.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/ed2b546fab67395f.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/f9c1930bdbe6edb9.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/css/fe21cad0824469d1.css",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/2bags.164692d1.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/BG_products.65b01e17.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/BG_sticker_1.3b436c14.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/BG_sticker_2.752604d3.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/BG_sticker_3.82b39845.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/BG_sticker_4.b7f3ee5b.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/BG_sticker_5.b7163dfa.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/BG_sticker_6.522c2dab.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/BG_sticker_7.b7163dfa.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/Blog_logo.6d9934de.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/Box_logo.061596c9.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/Divider.f5767cc0.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/Gerardo.59aad178.jpg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/LargePostImage.057ef81b.jpg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/LargePostImage.e63e482f.jpg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/NotFound404.2e9c5ee5.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/SmallPostImage.3e6a6456.jpg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/SmallPostImage.44e23e8b.jpg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/TrashIcon.4d590a5c.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/arrow_botright.c54a6e5f.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/arrow_left.9f38ea55.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/arrow_right.d9178de6.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/arrow_right_white.bf66a495.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/arrow_topleft.7ad57d2a.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/bag_logo.3b60441e.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/box.6b51ccdd.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/box_and_products.23668142.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/campusbox.7f07c5e4.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/card_coupons.9f5ad698.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/card_gift.2829bdb8.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/card_pages.804d3372.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/check_bullet.337cc965.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/contact_background.488108f7.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/decisionhandler.fcbabd5d.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/distribution_map.996d4b2b.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/distribution_ofice.e87d6b42.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/dropdown_menu_arrow.b8de7bba.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/facebook_icon.179b29ae.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/instagram_icon.17fc7eae.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/linkedin_icon.a05640ca.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/logged_user.e1ae22de.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/logistics_image.dee4a2e6.jpg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/logo.717566f7.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/logo_footer.023cf681.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/logout_icon.120d9112.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/lowerBenefit_img_1.2946305a.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/lowerBenefit_img_2.c9e9c056.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/lowerBenefit_img_3.16f2ef15.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/lowerBenefit_img_4.5df83c05.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/lowerBenefit_img_5.7ad1e2f1.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/nosotros_hero.4702da77.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/profile_icon.a6c3b07b.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/send_email.7fe1dfdc.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/soldout.ca7752f3.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/under_construction.d070e604.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/upload_icon1.e397b943.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/upperBenefit_img_1.7c74364c.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/upperBenefit_img_3.c681886b.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/upperBenefit_img_4.c730cd03.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/upperBenefit_img_5.03427c97.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/upperBenefit_img_6.0682dafd.png",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/_next/static/media/youtube_icon.f1cbaa76.svg",revision:"ZDHXIbIXByoYrtaT7eB_V"},{url:"/favicon/android-chrome-192x192.png",revision:"cff406d03874ff7911905cabd82a1312"},{url:"/favicon/apple-touch-icon.png",revision:"7233942a87d2e54888c61c5db37d8915"},{url:"/favicon/browserconfig.xml",revision:"a493ba0aa0b8ec8068d786d7248bb92c"},{url:"/favicon/favicon-16x16.png",revision:"c457da302e438a747fedb83833e9866d"},{url:"/favicon/favicon-32x32.png",revision:"8a2a57a8ba8f7a79ce1696101b0180be"},{url:"/favicon/favicon.ico",revision:"d026c190513b1b8be392feddbd782038"},{url:"/favicon/mstile-150x150.png",revision:"72ab7c5163060ab104f0cd1519102516"},{url:"/favicon/safari-pinned-tab.svg",revision:"e2bc35328244795696016ae6e1f0b8e3"},{url:"/favicon/site.webmanifest",revision:"c2f552420ee251e4422ca9294463ba95"},{url:"/icon-192x192.png",revision:"bde7015c086d9bd8a4dea02bc1b1660a"},{url:"/icon-256x256.png",revision:"6e2f422eb75995b9f3bdbf56ab6027b8"},{url:"/icon-384x384.png",revision:"7c630d58ae0c5453f5a0926314b5b2d1"},{url:"/icon-512x512.png",revision:"72bf73d8c26d6d82d4a1860b9ed4c65a"},{url:"/manifest.json",revision:"9dc773915d4b63f8181ce9e18a3ae709"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:t,event:s,state:i})=>t&&"opaqueredirect"===t.type?new Response(t.body,{status:200,statusText:"OK",headers:t.headers}):t}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const t=e.pathname;return!t.startsWith("/api/auth/")&&!!t.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
