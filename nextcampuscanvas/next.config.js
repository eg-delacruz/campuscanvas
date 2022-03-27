const withPWA = require('next-pwa');

module.exports = withPWA({
  //TODO: Ver clase de progressive web apps decurso de next.js para hacer manifest
  pwa: {
    dest: 'public',
    register: true,
    mode: 'production',
    disable: false,
  },
  reactStrictMode: true,
  images: {
    //Dominios externos de los que vendrán nuestras imágenes
    // domains: ['placeimg.com'],
  },
});
