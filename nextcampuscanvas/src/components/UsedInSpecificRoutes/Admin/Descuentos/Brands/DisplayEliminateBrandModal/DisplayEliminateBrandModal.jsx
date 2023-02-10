import PropTypes from 'prop-types';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

//Syles
import styles from './DisplayEliminateBrandModal.module.scss';

//Components
import Modal from '@components/GeneralUseComponents/Modal/Modal';
import WarningImage from '@components/GeneralUseComponents/WarningImage/WarningImage';

//Hooks
import useAxios from '@hooks/useAxios';

//Endpoints
import endPoints from '@services/api';

//Redux
import { getBrands } from '@redux/brandsSlice';

const DisplayEliminateBrandModal = ({
  showModal,
  setShowModal,
  id,
  brandLogoFileName,
}) => {
  //Axios
  const { fetchData: eraseBrand, cancel } = useAxios();

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  const router = useRouter();

  //States
  const [state, setState] = useState({
    loading: false,
    error: null,
  });

  const handleEliminate = async () => {
    setState({ ...state, loading: true });

    const response = await eraseBrand(
      endPoints.admin.discounts.eliminateBrand(id),
      'delete',
      null,
      { brandLogoFileName }
    );

    if (response.error) {
      return setState({ ...state, error: response.error });
    }

    //If deletion successful
    if (response.body === 'Marca eliminada') {
      //Update global brands state
      dispatch(getBrands());

      setState({
        ...state,
        loading: false,
        error: null,
      });

      //Show a confirmation swal
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

      //Redirect to brands page
      router.push('/admin/descuentos/gestionar-marcas');
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

        <h1>¿Estas seguro de eliminar esta marca?</h1>

        <p>
          Se eliminará toda su información, incluyendo el <strong>logo </strong>
          y la <strong>descripción</strong>.
        </p>

        {state.error && (
          <p className='error__messagev2'>{state.error.message}</p>
        )}

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

export default DisplayEliminateBrandModal;

DisplayEliminateBrandModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
