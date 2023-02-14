import PropTypes from 'prop-types';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

//Components
import Modal from '@components/GeneralUseComponents/Modal/Modal';
import WarningImage from '@components/GeneralUseComponents/WarningImage/WarningImage';

//Styles
import styles from './DisplayEliminateHomeBanner.module.scss';

//Endpoints
import endPoints from '@services/api/index';

//Hooks
import useAxios from '@hooks/useAxios';

//Redux
import { getHomeBannersInfo } from '@redux/homeBannersSlice';

const DisplayEliminateHomeBanner = ({
  showModal,
  setShowModal,
  banner_id,
  discount_title,
}) => {
  const { fetchData, cancel } = useAxios();

  //State
  const [state, setState] = useState({
    loading: false,
    error: null,
  });

  const handleEliminate = async () => {
    // setState({ ...state, loading: true });

    // const response = await fetchData(
    //     endPoints.admin.homeBanners.deleteHomeBanner(banner_id),
    //     'delete'
    // );
    // if (response.error) {
    //     return setState({ ...state, error: response.error });
    // }

    // //If deletion successful
    // if (response.body === 'Banner eliminado') {
    //     //Update discounts in global state

    //     //Show a confirmation swall
    // const Toast = Swal.mixin({
    //     toast: true,
    //     position: 'top-end',
    //     showConfirmButton: false,
    //     timer: 3000,
    //     width: 400,
    //     timerProgressBar: true,
    //     didOpen: (toast) => {
    //       toast.addEventListener('mouseenter', Swal.stopTimer);
    //       toast.addEventListener('mouseleave', Swal.resumeTimer);
    //     },
    //   });

    // Toast.fire({
    //     icon: 'success',
    //     title: response.body,
    //   });

    //     //Close modal
    //     setShowModal(false);
    // }
    console.log(`Banner con banner id ${banner_id} eliminado`);
  };

  return (
    <Modal
      width={500}
      minHeight={250}
      show={showModal}
      onClose={() => setShowModal(false)}
    >
      <div className={styles.modal}>
        <WarningImage color='yellow' />

        <h1>
          ¿Estas seguro de eliminar el banner del descuento: {discount_title}?
        </h1>
        <p>
          Se eliminará el <strong>banner de pantalla grande</strong> y el{' '}
          <strong>banner para pantallas de movil</strong>, y no aparecerá más en
          home.
        </p>

        <button
          onClick={handleEliminate}
          type='submit'
          className={`${
            state.loading ? styles.buttonLoading : ''
          } btn button--red`}
          disabled={state.loading}
        >
          Eliminar
        </button>
      </div>
    </Modal>
  );
};

export default DisplayEliminateHomeBanner;

DisplayEliminateHomeBanner.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  banner_id: PropTypes.string.isRequired,
  discount_title: PropTypes.string.isRequired,
};
