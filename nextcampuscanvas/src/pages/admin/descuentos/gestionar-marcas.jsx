import { useState } from 'react';

//Components
import Modal from '@components/GeneralUseComponents/Modal/Modal';

const gestionarMarcas = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button onClick={() => setShowModal(true)}>Mostrar modal</button>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, omnis
        nesciunt. Iure voluptates odit voluptatum cumque architecto eum laborum
        ut, in deleniti quas. Minus iste, suscipit nesciunt illo voluptates
        neque?
      </Modal>
    </div>
  );
};

export default gestionarMarcas;
