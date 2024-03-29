import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

//Styles
import styles from './DisplayEliminateDiscountModal.module.scss';

//React query
import { useQueryClient } from '@tanstack/react-query';
import adminKeys from '@query-key-factory/adminKeys';
import discountKeys from '@query-key-factory/discountKeys';

//Components
import Modal from '@components/GeneralUseComponents/Modal/Modal';
import WarningImage from '@components/GeneralUseComponents/WarningImage/WarningImage';
import ConfirmationSwal from '@components/GeneralUseComponents/ConfirmationSwal/ConfirmationSwal';

//Endpoints
import endPoints from '@services/api/index';

//Hooks
import useAxios from '@hooks/useAxios';

//Redux
import { getHomeSectionsCount } from '@redux/homeSectionsDiscountsCountSlice';

const DisplayEliminateDiscountModal = ({
  showModal,
  setShowModal,
  id,
  bannerName,
  has_home_banner,
  card_appears_in_home,
  brand_id,
  refetch_show_first_in_all_discounts_count,
  refetch_show_in_searchbar_count,
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

  //React query
  const queryClient = useQueryClient();

  const handleEliminate = async () => {
    setState({ ...state, loading: true });

    const response = await fetchData(
      endPoints.admin.discounts.getDiscountById(id, bannerName),
      'delete',
      null,
      { bannerName }
    );
    if (response.error) {
      return setState({ ...state, error: response.error });
    }

    //If deletion successful

    //Invalidate the home banners info cache
    if (has_home_banner) {
      queryClient.invalidateQueries(
        [adminKeys.homeBanner.getHomeSliderBannersInfo],
        { exact: true }
      );
    }
    //Invalidate the show first in all discounts count cache
    if (refetch_show_first_in_all_discounts_count) {
      queryClient.invalidateQueries(
        [discountKeys.cards.show_first_in_all_discounts_count],
        { exact: true }
      );
    }

    //Invalidate the show in searchbar count cache
    if (refetch_show_in_searchbar_count) {
      queryClient.invalidateQueries(
        [discountKeys.cards.show_in_recommendations_searchbar_count],
        { exact: true }
      );
    }

    //Refresh global home section cards count if the card appeared in home
    if (card_appears_in_home) {
      dispatch(getHomeSectionsCount());
    }

    //Decrease the discounts_attached count of the brand in the brands query cache (which is an array of brands) by one if applies (if the array is not empty). If the discounts_attached count is 0, the brand.last_time_checked_since_brand_has_no_discounts is updated to the current date
    queryClient.setQueryData([adminKeys.brands.all_brands], (oldData) => {
      if (oldData?.length > 0) {
        const updatedBrands = oldData.map((brand) => {
          //We search for the brand that has the same id as the brand_id of the deleted discount
          if (brand._id === brand_id) {
            //In this case, the resultig count will be 0, so we update the last_time_checked_since_brand_has_no_discounts to the current date
            if (brand.discounts_attached === 1) {
              return {
                ...brand,
                discounts_attached: brand.discounts_attached - 1,
                last_time_checked_since_brand_has_no_discounts: new Date(),
              };
            } else {
              return {
                ...brand,
                discounts_attached: brand.discounts_attached - 1,
              };
            }
          }
          return brand;
        });
        return updatedBrands;
      }
    });

    //Update the discounts list by removing the deleted discount from the discounts query cache (which is an array of discounts)
    queryClient.setQueryData([adminKeys.discounts.all_discounts], (oldData) => {
      if (oldData?.length > 0) {
        const updatedDiscounts = oldData.filter(
          (discount) => discount._id !== id
        );
        return updatedDiscounts;
      }
    });

    setState({ ...state, loading: false });

    //Show a confirmation swall
    ConfirmationSwal({
      message: response.body,
    });

    //Close the modal
    setShowModal(false);

    //Redirect
    router.push('/admin/descuentos/gestionar-descuentos');
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
  bannerName: PropTypes.string.isRequired,
  has_home_banner: PropTypes.bool.isRequired,
  card_appears_in_home: PropTypes.bool.isRequired,
  brand_id: PropTypes.string.isRequired,
  refetch_show_first_in_all_discounts_count: PropTypes.bool.isRequired,
  refetch_show_in_searchbar_count: PropTypes.bool.isRequired,
};
