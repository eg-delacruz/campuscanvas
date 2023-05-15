import { useState } from 'react';

import styles from '@styles/pagestyles/admin/master/RouteRevalidator.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import ConfirmationSwal from '@components/GeneralUseComponents/ConfirmationSwal/ConfirmationSwal';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//hooks
import { useInputValue } from '@hooks/useInputValue';
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

//Request functions
import adminFunctions from '@request-functions/Admin/index';

const routeRevalidator = () => {
  const { securingRoute } = useSecureAdminRoute('master');

  //States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Controlling inputs
  const ROUTE = useInputValue('');

  //Functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const response = await adminFunctions.revalidateRoute({
      route: ROUTE.value,
    });

    //Handling errors
    if (response.error) {
      setError(response.error);
      setLoading(false);
      return;
    }

    setLoading(false);

    ROUTE.setValue('');

    //Show a confirmation swal
    ConfirmationSwal({
      message: response,
    });
  };

  if (securingRoute) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <AdminHeader />
      <div className={`${styles.container} container`}>
        <h1>Revalidador de rutas</h1>
        <p>
          La ruta a revalidar debe ser la URL completa, empezando por
          'https://www.campuscanvas.net/'
        </p>
        <form
          action=''
          method='POST'
          autoComplete='off'
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.input_container}>
            <label htmlFor='route' className={`${styles.input_title}`}>
              Ruta a revalidar
            </label>
            <input
              className={`${styles.input}`}
              name='route'
              id='route'
              type='text'
              placeholder='Ruta a revalidar'
              autoComplete='off'
              value={ROUTE.value}
              onChange={ROUTE.onChange}
              required
            />
          </div>

          {error && <p className={`error__messagev2`}>{error}</p>}

          <button
            type='submit'
            className={`${loading && styles.buttonLoading} btn button--red`}
            disabled={loading}
          >
            Revalidar
          </button>
        </form>
      </div>
    </>
  );
};

export default routeRevalidator;
