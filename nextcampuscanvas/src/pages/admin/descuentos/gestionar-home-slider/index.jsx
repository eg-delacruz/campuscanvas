import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

//Styles
import styles from '@styles/pagestyles/admin/descuentos/gestionarHomeSlider.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import DisplayEliminateHomeBanner from '@components/UsedInSpecificRoutes/Admin/Descuentos/HomeSlider/DisplayEliminateHomeBanner/DisplayEliminateHomeBanner';

//Redux
import { getHomeBannersInfo, selectHomeBanner } from '@redux/homeBannersSlice';

//Assets
import delete_icon from '@assets/GeneralUse/IconsAndButtons/delete.svg';

const homeSliderManagement = () => {
  const { securingRoute } = useSecureAdminRoute();

  //States
  const [showEliminateModal, setShowEliminateModal] = useState(false);
  const [eliminateBanner, setEliminateBanner] = useState({
    banner_id: '',
    discount_title: '',
  });

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Reducers
  const bannersInfoReducer = useSelector(selectHomeBanner);

  useEffect(() => {
    const setBannersInfo = async () => {
      if (bannersInfoReducer.home_banners.length === 0) {
        dispatch(getHomeBannersInfo());
      }
    };
    setBannersInfo();
  }, []);

  //Functions
  const displayEliminateModal = (banner_id, discount_title) => {
    setEliminateBanner({
      banner_id,
      discount_title,
    });
    setShowEliminateModal(true);
  };

  const handleEliminateModal = () => {
    return (
      <DisplayEliminateHomeBanner
        showModal={showEliminateModal}
        setShowModal={setShowEliminateModal}
        banner_id={eliminateBanner.banner_id}
        discount_title={eliminateBanner.discount_title}
      />
    );
  };

  if (securingRoute || bannersInfoReducer.loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (bannersInfoReducer.error) {
    return <p className='error__message'>{bannersInfoReducer.error}</p>;
  }

  return (
    <>
      <AdminHeader />
      <ButtonUp />

      <div className={`container`}>
        {handleEliminateModal()}
        <ButtonBack prevRoute={'/admin/descuentos'} />

        <h1>Home slider banners ({bannersInfoReducer.home_banners.length})</h1>
        <p>
          Para añadir un nuevo banner a un descuento concreto, dirígete al
          descuento y añádelo desde ahí
        </p>

        <div className={styles.banners_container}>
          {bannersInfoReducer.home_banners.map((banner) => (
            <div className={styles.banner} key={banner.id}>
              <Link
                href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${banner.discount_id}`}
              >
                <div className={styles.info_container}>
                  <div className={styles.brand_logo_container}>
                    <div className={styles.logo_container}>
                      <img
                        src={banner.brand_logo.URL}
                        alt={banner.brand_name}
                      />
                    </div>
                    <h2>{banner.brand_name}</h2>
                  </div>
                  <p className={styles.discount_title}>
                    {banner.discount_title}
                  </p>
                  <p className={styles.discount_category}>
                    <strong>Categoría: </strong>
                    {banner.discount_category}
                  </p>
                  <p className={styles.created_at}>
                    <strong>Fecha de creación del banner: </strong>
                    {banner?.created_at}
                  </p>
                  <p className={styles.created_by}>
                    <strong>Banner creado por: </strong>
                    {banner?.created_by}
                  </p>
                </div>
              </Link>
              <div className={styles.images_container}>
                <div className={styles.big_image_title_delete_banner_container}>
                  <h5>Pantalla grande (1200 x 400)</h5>
                  <div className={styles.eliminate_container}>
                    <Image src={delete_icon} />
                    <div
                      className={styles.eliminate_text}
                      onClick={() =>
                        displayEliminateModal(banner.id, banner.discount_title)
                      }
                    >
                      Eliminar banners
                    </div>
                  </div>
                </div>
                <div className={styles.big_banner}>
                  <img
                    src={banner.slider_banner_big_screen.URL}
                    alt={`Banner pantalla grande de ${banner.brand_name}`}
                  />
                </div>
                <h5>Pantalla movil (780 x 520)</h5>
                <div className={styles.small_banner}>
                  <img
                    src={banner.slider_banner_small_screen.URL}
                    alt={`Banner pantalla movil de ${banner.brand_name}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default homeSliderManagement;
