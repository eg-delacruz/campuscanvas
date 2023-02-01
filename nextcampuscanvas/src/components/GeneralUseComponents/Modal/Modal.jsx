import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import PropTypes from 'prop-types';

//width suggested values: 800 | 500
const Modal = ({ show, onClose, width = 800, minHeight = 500, children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div onClick={handleClose} className={styles.overlay}>
      <div
        onClick={(e) => {
          //Needed to avoid that the modal closes if clicked
          e.stopPropagation();
        }}
        className={styles.modal}
        style={{ width: `${width}px`, minHeight: `${minHeight}px` }}
      >
        <div className={styles.header}>
          <button onClick={handleClose}>X</button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  return isClient
    ? createPortal(modalContent, document.getElementById('modal-root'))
    : null;
};

export default Modal;

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
