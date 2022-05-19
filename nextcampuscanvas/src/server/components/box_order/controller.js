import store from '@server/components/box_order/store';

const createBoxOrder = async (userID, season, shopify_order_number) => {
  if (!userID || !season || !shopify_order_number) {
    throw new Error('[boxOrderController] Los datos son insuficientes');
  }
  const box_order = {
    userID,
    season,
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
  console.log(userID);
  console.log(process.env.NEXT_PUBLIC_CURRENT_SEASON);

  //Buscar todos los pedidos de ese usuario
  //Contar si son más de X pedidos
  //Si son más de X pedidos, devolver false
};

export default {
  createBoxOrder,
  verifyBoxOrderLimit,
};
