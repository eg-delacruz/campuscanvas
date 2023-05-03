import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

//Styles
import styles from './DisplayUpdateLastTimeCheckedModal.module.scss';

//Components
import Modal from '@components/GeneralUseComponents/Modal/Modal';
import WarningImage from '@components/GeneralUseComponents/WarningImage/WarningImage';

//React query
import { useMutation, useQueryClient } from '@tanstack/react-query';
import adminKeys from '@query-key-factory/adminKeys';

//Request functions
import requestFunctions from '@request-functions/Admin/Discounts/index';

const DisplayUpdateLastTimeCheckedModal = ({
  showModal,
  setShowModal,
  brand_id,
  brand_name,
}) => {
  //React query
  const queryClient = useQueryClient();
  const UPDATE_LAST_TIME_CHECKED = useMutation({
    mutationFn: (brand_id) => requestFunctions.updateLastTimeChecked(brand_id),
    onSuccess: (updated_date) => {
      //update the cache with the response of the mutation
      queryClient.setQueryData([adminKeys.brands.all_brands], (oldData) => {
        if (oldData?.length > 0) {
          const updatedBrands = oldData.map((brand) => {
            if (brand._id === brand_id) {
              return {
                ...brand,
                last_time_checked_since_brand_has_no_discounts: updated_date,
              };
            } else {
              return brand;
            }
          });

          return updatedBrands;
        } else {
          return oldData;
        }
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
        title: 'Fecha de revisión actualizada',
      });

      //Close the modal
      setShowModal(false);
    },
  });

  return (
    <Modal
      width={500}
      minHeight={250}
      show={showModal}
      onClose={() => setShowModal(false)}
    >
      <div className={styles.container}>
        <WarningImage />
        <h1>Confirma esta acción</h1>
        <p>
          Actualiza la última fecha de revisión a este momento solo si acabas de
          comprobar que <strong>{brand_name}</strong> no tiene descuentos u
          ofertas interesantes actualmente
        </p>
        {/* TODO: improve loading state and disabled with the mutation */}
        <button
          onClick={() => {
            UPDATE_LAST_TIME_CHECKED.mutate(brand_id);
          }}
          type='submit'
          className={`
          ${
            UPDATE_LAST_TIME_CHECKED.isLoading ? styles.buttonLoading : ''
          } btn button--red`}
          disabled={UPDATE_LAST_TIME_CHECKED.isLoading}
        >
          Confirmar
        </button>
        {UPDATE_LAST_TIME_CHECKED.isError && (
          <p className='error__message'>
            {UPDATE_LAST_TIME_CHECKED?.error?.message}
          </p>
        )}
      </div>
    </Modal>
  );
};

export default DisplayUpdateLastTimeCheckedModal;

DisplayUpdateLastTimeCheckedModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  brand_id: PropTypes.string.isRequired,
  brand_name: PropTypes.string.isRequired,
};
