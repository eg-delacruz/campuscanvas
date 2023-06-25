import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from 'next/router';

//Syles
import styles from './DisplayEliminateBrandModal.module.scss';

//React query
import { useQuery,useQueryClient } from '@tanstack/react-query';
import adminKeys from '@query-key-factory/adminKeys';

//Components
import Modal from '@components/GeneralUseComponents/Modal/Modal';
import WarningImage from '@components/GeneralUseComponents/WarningImage/WarningImage';
import ConfirmationSwal from '@components/GeneralUseComponents/ConfirmationSwal/ConfirmationSwal';

//Hooks
import useAxios from '@hooks/useAxios';

//Endpoints
import endPoints from '@services/api';

//Request functions
import requestFn from '@request-functions/Admin/Discounts';

const DisplayEliminateBrandModal = ({
  showModal,
  setShowModal,
  id,
  brandLogoFileName,
}) => {
  //Axios
  const { fetchData: eraseBrand, cancel } = useAxios();

  //React query
  const queryClient = useQueryClient();

  const BRANDS = useQuery({
    queryKey: [adminKeys.brands.all_brands],
    queryFn: requestFn.getBrands,
    staleTime: 1000 * 60 * 60 * 24, //24 hours
    initialData: [],
    initialDataUpdatedAt: 1, //prevent initialData from being overwritten by queryFn
    enabled: false,
  });

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
      queryClient.setQueryData(
        [adminKeys.brands.all_brands],
        (oldData = []) => {
          //Check if all brands have been already fetched before deleting the brand
          if (oldData.length === 0) {
            //Refetch that query to update the data
            BRANDS.refetch();
            return oldData;
          }

          //If brands have been already fetched, delete the brand from the array
          return oldData.filter((brand) => brand._id !== id);
        }
      );

      setState({
        ...state,
        loading: false,
        error: null,
      });

      ConfirmationSwal({
        message: response.body,
      })

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
