//Clarification: Allows edition and deletion of a discount
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

//Styles
import styles from '@styles/pagestyles/admin/descuentos/editarDescuento.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';
import DisplayEliminateDiscountModal from '@components/UsedInSpecificRoutes/Admin/Descuentos/Discounts/DisplayEliminateDiscountModal/DisplayEliminateDiscountModal';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';
import useAxios from '@hooks/useAxios';

//Assets
import delete_icon from '@assets/GeneralUse/IconsAndButtons/delete.svg';
import edit_icon from '@assets/PagesImages/Cuenta/edit_icon.svg';

//Redux
import { selectDiscount } from '@redux/discountsSlice';

//Endpoints
import endPoints from '@services/api/index';

//TODO: handle if discount doesn´t exist
const editarDescuento = () => {
  const { securingRoute } = useSecureAdminRoute('all');
  //Allows us to manipulate the appropriate slice/action

  const { fetchData, cancel } = useAxios();

  //States
  const [state, setState] = useState({
    discount: {},
    loading: true,
    error: null,
  });
  const [showEliminateModal, setShowEliminateModal] = useState(false);

  //Get discount id
  const router = useRouter();
  const id = router.query.id;

  //Reducers
  const discountsReducer = useSelector(selectDiscount);
  useEffect(() => {
    //Await until the route is ready to get the discount_id
    if (!router.isReady) return;

    //Get the discount from global state if available to avoid unnecessary requests
    if (discountsReducer.discounts.length > 0) {
      const discount = discountsReducer.discounts.find(
        (discount) => discount._id === id
      );
      if (discount) {
        setState({ ...state, discount, loading: false });
      }
      return;
    }

    //Get the discount from the server if it's not available in global state
    if (Object.keys(state.discount).length === 0) {
      const getDiscount = async () => {
        const response = await fetchData(
          endPoints.discounts.getDiscountById(id),
          'get'
        );

        if (response.error) {
          //Redirect if discount doesn´t exist
          if (response.error === 'Descuento no encontrado') {
            //Show a swal
            const customSwal = Swal.mixin({
              customClass: {
                confirmButton: 'btn button--red',
              },
              buttonsStyling: false,
            });
            customSwal
              .fire({
                title: response.error,
                text: 'El descuento que intenta editar no existe',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              })
              .then(() => {
                router.push('/admin/descuentos/gestionar-descuentos');
              });
          }
          setState({
            ...state,
            error: response.error,
            loading: false,
          });
          return;
        }

        setState({
          ...state,
          discount: response.body,
          loading: false,
          error: null,
        });
      };
      getDiscount();
    }

    //If discount doesn´t exist, redirect to 404 page
  }, [discountsReducer, router?.isReady]);

  const displayEliminateModal = () => {
    return (
      <DisplayEliminateDiscountModal
        showModal={showEliminateModal}
        setShowModal={setShowEliminateModal}
        id={id}
        bannerName={state.discount.banner.name}
      />
    );
  };

  if (securingRoute || state.loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  //TODO: display discount info and allow its edition
  return (
    <>
      <AdminHeader />
      {displayEliminateModal()}
      <div className={`${styles.container} container`}>
        <div className={styles.flex_row}>
          <ButtonBack prevRoute={'/admin/descuentos/gestionar-descuentos'} />
          <div className={styles.top_buttons}>
            <div className={styles.edit_icon}>
              <Image src={edit_icon} />
            </div>
            <div className={styles.delete_icon}>
              <span
                onClick={() => {
                  setShowEliminateModal(true);
                }}
              >
                <img src={delete_icon.src} />
              </span>
            </div>
          </div>
        </div>
        <div>editarDescuento</div>
      </div>
    </>
  );
};

export default editarDescuento;
