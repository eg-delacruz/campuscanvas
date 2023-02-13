import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

//Styles
import styles from '@styles/pagestyles/admin/descuentos/gestionarHomeSlider.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';

//Redux
import { getHomeBannersInfo, selectHomeBanner } from '@redux/homeBannersSlice';

//TODO: with chain operator, evaluate if banners have a created by and created at property
const homeSliderManagement = () => {
  const { securingRoute } = useSecureAdminRoute();

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Reducers
  const bannersInfoReducer = useSelector(selectHomeBanner);

  console.log(bannersInfoReducer);

  useEffect(() => {
    const setBannersInfo = async () => {
      if (bannersInfoReducer.home_banners.length === 0) {
        dispatch(getHomeBannersInfo());
      }
    };
    setBannersInfo();
  }, []);

  if (securingRoute || bannersInfoReducer.loading) {
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
        <ButtonBack prevRoute={'/admin/descuentos'} />

        <h1>Home slider banners ({bannersInfoReducer.home_banners.length})</h1>
        <p>
          Para añadir un nuevo banner a un descuento concreto, dirígete al{' '}
          <Link href={'/admin/descuentos/gestionar-descuentos'}>descuento</Link>{' '}
          y añádelo desde ahí
        </p>
      </div>
    </>
  );
};

export default homeSliderManagement;
