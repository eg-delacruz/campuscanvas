import PropTypes from 'prop-types';
import { useState } from 'react';

//React query
import { useQueryClient } from '@tanstack/react-query';
import adminKeys from '@query-key-factory/adminKeys';

//Components
import Modal from '@components/GeneralUseComponents/Modal/Modal';
import WarningImage from '@components/GeneralUseComponents/WarningImage/WarningImage';
import ConfirmationSwal from '@components/GeneralUseComponents/ConfirmationSwal/ConfirmationSwal';

//Styles
import styles from './DisplayEliminateHomeBanner.module.scss';

//Endpoints
import endPoints from '@services/api/index';

//Hooks
import useAxios from '@hooks/useAxios';
const DisplayEliminateHomeBanner = ({
  showModal,
  setShowModal,
  banner_id,
  discount_id,
  discount_title,
  slider_banner_big_screen_name,
  slider_banner_small_screen_name,
}) => {
  const { fetchData } = useAxios();

  //State
  const [state, setState] = useState({
    loading: false,
    error: null,
  });

  //React query
  const queryClient = useQueryClient();

  const handleEliminate = async () => {
    setState({ ...state, loading: true, error: null });

    const response = await fetchData(
      endPoints.admin.discounts.eliminateHomeSliderBanner(banner_id),
      'delete',
      null,
      {
        slider_banner_big_screen_name,
        slider_banner_small_screen_name,
      }
    );
    if (response.error) {
      return setState({ ...state, error: response.error });
    }

    //If deletion successful
    if (response.body) {
      setState({ ...state, loading: false });

      //Delete the banner from react query cache
      queryClient.setQueryData(
        [adminKeys.homeBanner.getHomeSliderBannersInfo],
        (oldData = []) => {
          return oldData.filter((banner) => banner.id !== banner_id);
        }
      );

      //Invalidate the home banner query of the discount
      queryClient.invalidateQueries(
        [adminKeys.homeBanner.getHomeBannerByDiscountId(discount_id)],
        { exact: true }
      );

      //Confirmation swal
      ConfirmationSwal({
        message: response.body,
      });

      //Close modal
      setShowModal(false);
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

        <h1>
          ¿Estas seguro de eliminar el banner del descuento: {discount_title}?
        </h1>
        <p>
          Se eliminará el <strong>banner de pantalla grande</strong> y el{' '}
          <strong>banner para pantallas de movil</strong>, y no aparecerá más en
          home.
        </p>

        {state.error && <p className='error__messagev2'>{state.error}</p>}

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
  discount_id: PropTypes.string.isRequired,
  discount_title: PropTypes.string.isRequired,
  slider_banner_big_screen_name: PropTypes.string.isRequired,
  slider_banner_small_screen_name: PropTypes.string.isRequired,
};
