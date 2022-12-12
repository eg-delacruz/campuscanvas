import { GET_ALL, LOADING, ERROR } from '../reduxtypes/postsTypes';
import { POSTS } from '../Databases/BlogDatabase';

export const getPosts = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    setTimeout(function () {
      dispatch({
        type: GET_ALL,
        payload: POSTS,
      });
    }, 800);
  } catch (error) {
    dispatch({
      type: ERROR,
      payload:
        'Ha ocurrido un problema al cargar los post de nuestro blog. Inténtalo más tarde.',
    });
  }
};
