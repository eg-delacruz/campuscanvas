import PropTypes from 'prop-types';
import DOMPurify from 'isomorphic-dompurify';

//Styles
import styles from './DisplayTermsCondsModal.module.scss';

//Components
import Modal from '@components/GeneralUseComponents/Modal/Modal';

const DisplayTermsCondsModal = ({ showModal, setShowModal, TermsConds }) => {
  return (
    <Modal
      minHeight={150}
      width={500}
      show={showModal}
      onClose={() => setShowModal(false)}
      position='top'
    >
      <div className={styles.container}>
        <h1 className={styles.title}>Términos y condiciones</h1>
        <div
          className={styles.terms_and_conds}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(TermsConds) }}
        />
      </div>
      <button
        className={`${styles.accept_btn} btn button--red`}
        onClick={() => setShowModal(false)}
        type='button'
      >
        Aceptar
      </button>
    </Modal>
  );
};

export default DisplayTermsCondsModal;

DisplayTermsCondsModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  TermsConds: PropTypes.string.isRequired,
};
