import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

//React query
import { useQuery } from '@tanstack/react-query';
import adminKeys from '@query-key-factory/adminKeys';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

//Styles
import styles from '@styles/pagestyles/admin/descuentos/gestionarHomeSlider.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import DisplayEliminateHomeBanner from '@components/UsedInSpecificRoutes/Admin/Descuentos/HomeSlider/DisplayEliminateHomeBanner/DisplayEliminateHomeBanner';

//Assets
import delete_icon from '@assets/GeneralUse/IconsAndButtons/delete.svg';

//Services
import dateFormat from '@services/dateFormat';

//Data requests
import adminFunctions from '@request-functions/Admin/Discounts';

const homeSliderManagement = () => {
  const { securingRoute } = useSecureAdminRoute();

  //States
  const [showEliminateModal, setShowEliminateModal] = useState(false);
  const [eliminateBanner, setEliminateBanner] = useState({
    banner_id: '',
    discount_title: '',
    slider_banner_big_screen_name: '',
    slider_banner_small_screen_name: '',
    discount_id: '',
  });

  //React query
  const HOME_BANNERS_INFO = useQuery({
    queryKey: [adminKeys.homeBanner.getHomeSliderBannersInfo],
    queryFn: adminFunctions.getHomeBannersInfo,
    staleTime: 1000 * 60 * 60 * 24 * 7, //1 week
  });

  //Functions
  const displayEliminateModal = (
    banner_id,
    discount_title,
    slider_banner_big_screen_name,
    slider_banner_small_screen_name,
    discount_id
  ) => {
    setEliminateBanner({
      banner_id,
      discount_title,
      slider_banner_big_screen_name,
      slider_banner_small_screen_name,
      discount_id,
    });
    setShowEliminateModal(true);
  };

  const handleEliminateModal = () => {
    return (
      <DisplayEliminateHomeBanner
        showModal={showEliminateModal}
        setShowModal={setShowEliminateModal}
        banner_id={eliminateBanner.banner_id}
        discount_id={eliminateBanner.discount_id}
        discount_title={eliminateBanner.discount_title}
        slider_banner_big_screen_name={
          eliminateBanner.slider_banner_big_screen_name
        }
        slider_banner_small_screen_name={
          eliminateBanner.slider_banner_small_screen_name
        }
      />
    );
  };

  if (
    securingRoute ||
    HOME_BANNERS_INFO.isLoading ||
    HOME_BANNERS_INFO.isFetching ||
    HOME_BANNERS_INFO.isRefetching
  ) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (HOME_BANNERS_INFO.isError) {
    return <p className='error__message'>{HOME_BANNERS_INFO.error?.message}</p>;
  }

  return (
    <>
      <AdminHeader />
      <ButtonUp />

      <div className={`container`}>
        {handleEliminateModal()}

        <h1>Home slider banners ({HOME_BANNERS_INFO.data?.length})</h1>
        <p>
          Para añadir un nuevo banner a un descuento concreto, dirígete al
          descuento y añádelo desde ahí
        </p>

        {HOME_BANNERS_INFO.data?.map((banner) => (
          <article className={styles.banner} key={banner.id}>
            <Link
              href={`/admin/descuentos/gestionar-descuentos/editar-descuento/${banner.discount_id}`}
            >
              <div className={styles.info_container}>
                <div className={styles.brand_logo_container}>
                  <div className={styles.logo_container}>
                    <img src={banner.brand_logo.URL} alt={banner.brand_name} />
                  </div>
                  <h2>{banner.brand_name}</h2>
                </div>
                <p className={styles.discount_title}>{banner.discount_title}</p>
                <p className={styles.discount_status}>
                  <strong>Estatus del descuento: </strong>
                  <span
                    className={`${
                      banner.discount_status === 'available'
                        ? styles.available
                        : ''
                    } ${
                      banner.discount_status === 'unavailable'
                        ? styles.unavailable
                        : ''
                    }`}
                  >
                    {banner.discount_status}
                  </span>
                </p>
                <p className={styles.discount_category}>
                  <strong>Categoría: </strong>
                  {banner.discount_category}
                </p>
                <p className={styles.created_at}>
                  <strong>Fecha de creación del banner: </strong>
                  {dateFormat.dateToDMYHM(new Date(banner.created_at))}
                </p>
                <p className={styles.created_by}>
                  <strong>Banner creado por: </strong>
                  {banner?.created_by}
                </p>
              </div>
            </Link>
            <div className={styles.images_container}>
              <div className={styles.big_image_title_delete_banner_container}>
                <h5>Pantalla grande (1200 x 550)</h5>
                <div className={styles.eliminate_container}>
                  <Image src={delete_icon} />
                  <div
                    className={styles.eliminate_text}
                    onClick={() =>
                      displayEliminateModal(
                        banner.id,
                        banner.discount_title,
                        banner.slider_banner_big_screen.name,
                        banner.slider_banner_small_screen.name,
                        banner.discount_id
                      )
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
          </article>
        ))}
      </div>
    </>
  );
};

export default homeSliderManagement;
