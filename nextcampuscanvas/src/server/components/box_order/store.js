import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import boxOrder from '@server/components/box_order/model';

/////////////////////Create box order//////////////////////////////
const addBoxOrder = async (box_order) => {
  return await boxOrder.create(box_order);
};

const getOrdersByUserID = async (userID) => {
  try {
    return await boxOrder.find({ userID });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  add: addBoxOrder,
  getOrdersByUserID,
};
