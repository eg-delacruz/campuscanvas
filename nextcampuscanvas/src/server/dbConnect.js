let db = require('mongoose');

//Le decimos a Mongoose que cuando quiera utilizar cualquier promesa, que utilice esta
//la cual es la nativa, pero podemos usar otras librerías para promesas
db.Promise = global.Promise;

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
