import PropTypes from 'prop-types';
import { useState } from 'react';
import Swal from 'sweetalert2';

//Syles
import styles from './DisplayEliminateBrandModal.module.scss';

//Components
import Modal from '@components/GeneralUseComponents/Modal/Modal';
import WarningImage from '@components/GeneralUseComponents/WarningImage/WarningImage';

const DisplayEliminateBrandModal = ({ showModal, setShowModal, id }) => {
  //States
  const [state, setState] = useState({
    loading: false,
    error: null,
  });

  const handleEliminate = async () => {
    console.log(id);
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
