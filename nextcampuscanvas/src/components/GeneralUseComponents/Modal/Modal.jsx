import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

const Modal = ({ show, onClose, children }) => {
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
      >
        <div className={styles.header}>
          <button onClick={handleClose}> close icon</button>
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
