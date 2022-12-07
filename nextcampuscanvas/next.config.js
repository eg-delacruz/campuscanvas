const withPWA = require('next-pwa')({
  dest: 'public',
});
const withFonts = require('next-fonts');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    mode: 'production',
    disable: false,
  },
  reactStrictMode: true,
  //TODO: Allow images from shopify (YouTube: Next.js + Shopify Storefront API (GraphQL) + TailwindCSS Headless Store - Course preview)
  images: {
    //Dominios externos de los que vendrán nuestras imágenes
    domains: ['i.imgur.com'],
  },
});

module.exports = withFonts();
