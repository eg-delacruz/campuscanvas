import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import boxOrder from '@server/components/box_order/model';

/////////////////////Create box order//////////////////////////////
const addBoxOrder = async (box_order) => {
  return await boxOrder.create(box_order);
};

module.exports = {
  add: addBoxOrder,
};
