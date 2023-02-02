import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

//Styles
import styles from './DisplayEliminateDiscountModal.module.scss';

//Components
import Modal from '@components/GeneralUseComponents/Modal/Modal';
import WarningImage from '@components/GeneralUseComponents/WarningImage/WarningImage';

//Endpoints
import endPoints from '@services/api/index';

//Hooks
import useAxios from '@hooks/useAxios';

//Redux
import { getDiscounts } from '@redux/discountsSlice';

const DisplayEliminateDiscountModal = ({
  showModal,
  setShowModal,
  id,
  bannerURL,
}) => {
  const { fetchData, cancel } = useAxios();

  const router = useRouter();

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //States
  const [state, setState] = useState({
    loading: false,
    error: null,
  });

  const handleEliminate = async () => {
    setState({ ...state, loading: true });

    const response = await fetchData(
      endPoints.admin.discounts.getDiscountById(id, bannerURL),
      'delete',
      null,
      { bannerURL }
    );
    if (response.error) {
      return setState({ ...state, error: response.error });
    }

    //If deletion successful
    if (response.body === 'Descuento eliminado') {
      //Update discounts in global state
      dispatch(getDiscounts());

      //Show a confirmation swall
      setState({ ...state, loading: false });
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        width: 400,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'success',
        title: response.body,
      });

      //Redirect
      router.push('/admin/descuentos/gestionar-descuentos');
    }
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

        <h1>¿Estas seguro de eliminar este descuento?</h1>

        <p>
          Se eliminarán todos los elementos vinculados a él, como las{' '}
          <strong>fotos de banners</strong>, la{' '}
          <strong>tarjeta del descuento</strong> y los posibles{' '}
          <strong>banners del slider principal de home</strong>
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

export default DisplayEliminateDiscountModal;

DisplayEliminateDiscountModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  bannerURL: PropTypes.string.isRequired,
};
