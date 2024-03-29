import store from '@server/components/box_order/store';
import userController from '@server/components/user/controller';

//Function used to erase sensitive data in orders, since orders have the complete user data, with sensitive info
const cleanOrderForClient = (order) => {
  let orderClean = order.toObject();
  delete orderClean.userID.password;
  delete orderClean.userID.__v;
  return orderClean;
};

const createBoxOrder = async (
  userID,
  season,
  shopify_order_number,
  email,
  stu_email,
  stu_id,
  order_created_in_shopify_at,
  status_URL,
  total_paid,
  description,
  university
) => {
  if (
    !userID ||
    !season ||
    !shopify_order_number ||
    !email ||
    !order_created_in_shopify_at ||
    !status_URL ||
    !description ||
    !university
  ) {
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
    account_email: email,
    stu_id: STU_ID,
    stu_email: STU_EMAIL,
    shopify_order_number,
    total_paid: total_paid || '0',
    status_URL,
    createdAt: new Date(),
    order_created_in_shopify_at,
    description,
    university,
  };

  try {
    const createdBoxOrder = await store.add(box_order);
    return createdBoxOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

const verifyBoxOrderLimit = async (
  userID,
  account_email,
  stu_id,
  stu_email,
  university
) => {
  if (!userID || !account_email || !university) {
    throw new Error('[boxOrderController] Los datos son insuficientes');
  }
  try {
    const responses = await Promise.all([
      store.getOrdersByUserID(userID),
      //TODO: check if the getOrersBysty_id() works after shopify isn´t paused anymore
      //Check if a uni has this stu_id, not only check the stu_id,
      //because it can be that that stu_id also belongs to another
      //university student from a different university
      store.getOrdersBystu_id(stu_id, university),
      store.getOrdersBystu_email(stu_email),
    ]);

    const [ordersByUserID, ordersBystu_id, ordersBystu_email] = responses;

    const seasonOrdersByUserID = ordersByUserID.filter(
      (order) => order.season === process.env.NEXT_PUBLIC_CURRENT_SEASON
    );
    const seasonOrdersBystu_id = ordersBystu_id.filter(
      (order) => order.season === process.env.NEXT_PUBLIC_CURRENT_SEASON
    );
    const seasonOrdersBystu_email = ordersBystu_email.filter(
      (order) => order.season === process.env.NEXT_PUBLIC_CURRENT_SEASON
    );

    //If user has more than one order of current season, return false
    if (
      seasonOrdersByUserID.length >= 1 ||
      seasonOrdersBystu_id.length >= 1 ||
      seasonOrdersBystu_email.length >= 1
    ) {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getBoxOrdersByUser = async (userID) => {
  if (!userID) {
    throw new Error('[boxOrderController] Los datos son insuficientes');
  }
  try {
    const userExists = await userController.checkIfUserExists(userID);
    if (userExists === false) {
      throw new Error('[boxOrderController] El usuario no existe');
    }
    const boxOrders = await store.getOrdersByUserID(userID);
    const cleanBoxOrders = boxOrders.map((order) => {
      return cleanOrderForClient(order);
    });
    return cleanBoxOrders;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  createBoxOrder,
  verifyBoxOrderLimit,
  getBoxOrdersByUser,
};
