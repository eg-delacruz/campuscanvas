let db = require('mongoose');

const dbConnect = async (url) => {
  if (db.connections[0].readyState) {
    //DB already connected
    return;
  }
  await db
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('[db] Successfully connected');
    })
    .catch((err) => {
      console.error('[db]', err);
    });
};

module.exports = dbConnect;
