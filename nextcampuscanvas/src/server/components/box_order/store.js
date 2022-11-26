import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import boxOrder from '@server/components/box_order/model';
//This model will be populated
import user from '@server/components/user/model';

/////////////////////Create box order//////////////////////////////
const addBoxOrder = async (box_order) => {
  return await boxOrder.create(box_order);
};

const getOrdersByUserID = async (userID) => {
  try {
    return await boxOrder
      .find({ userID })
      .populate({ path: 'userID', model: user })
      .exec();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOrdersBystu_id = async (stu_id) => {
  try {
    return await boxOrder.find({ stu_id });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOrdersBystu_email = async (stu_email) => {
  try {
    return await boxOrder.find({ stu_email });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  add: addBoxOrder,
  getOrdersByUserID,
  getOrdersBystu_id,
  getOrdersBystu_email,
};
