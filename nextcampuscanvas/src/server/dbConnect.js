let db = require('mongoose');

const dbConnect = async (url) => {
  await db
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('[db] Conectada con éxito');
    })
    .catch((err) => {
      console.error('[db]', err);
    });
};

module.exports = dbConnect;
