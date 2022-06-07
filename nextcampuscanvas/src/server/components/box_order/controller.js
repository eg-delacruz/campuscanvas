import store from '@server/components/box_order/store';

const createBoxOrder = async (
  userID,
  season,
  shopify_order_number,
  email,
  stu_email,
  stu_id
) => {
  if (!userID || !season || !shopify_order_number || !email) {
    throw new Error('[boxOrderController] Los datos son insuficientes');
  }

  //Create logic operator that evaluates if at least stu_email or stu_id is provided
  if (!stu_email && !stu_id) {
    throw new Error(
      '[boxOrderController] Se necesita al menos un correo o ID de estudiante'
    );
  }

  let STU_ID = '';
  let STU_EMAIL = '';
  if (stu_id) {
    STU_ID = stu_id;
  }
  if (stu_email) {
    STU_EMAIL = stu_email;
  }

  const box_order = {
    userID,
    season,
    stu_id: STU_ID,
    stu_email: STU_EMAIL,
    shopify_order_number,
    createdAt: new Date(),
  };
  try {
    const createdBoxOrder = await store.add(box_order);
    return createdBoxOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

const verifyBoxOrderLimit = async (userID) => {
  if (!userID) {
    throw new Error('[boxOrderController] Se necesita un ID de usuario');
  }
  try {
    const userOrders = await store.getOrdersByUserID(userID);
    //Filter orders of current season
    const seasonOrders = userOrders.filter(
      (order) => order.season === process.env.NEXT_PUBLIC_CURRENT_SEASON
    );
    //If user has more than one order of current season, return false
    if (seasonOrders.length >= 1) {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  createBoxOrder,
  verifyBoxOrderLimit,
};
