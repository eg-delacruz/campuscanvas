const withPWA = require('next-pwa');
const withFonts = require('next-fonts');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    mode: 'production',
    disable: false,
  },
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    //Dominios externos de los que vendrán nuestras imágenes para etiqueta Image
    domains: ['i.imgur.com', 'campus-canvas-bucket.s3.eu-west-3.amazonaws.com'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'campus-canvas-bucket.s3.eu-west-3.amazonaws.com',
    //   },
    // ],
  },
};

module.exports = nextConfig;

module.exports = withFonts();
