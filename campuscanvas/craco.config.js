// Aquí va la config para usar craco, que ayuda a
// hacer que los .scss sean scoped

module.exports = {
  plugins: [
    {
      plugin: require('craco-plugin-scoped-css'),
    },
  ],
};