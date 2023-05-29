import { useState } from 'react';
import PropTypes from 'prop-types';

//React query
import { useQueryClient } from '@tanstack/react-query';
import adminKeys from '@query-key-factory/adminKeys';

//Components
import Modal from '@components/GeneralUseComponents/Modal/Modal';
import DragDropUploadArea from '@components/GeneralUseComponents/DragDropUploadArea/DragDropUploadArea';
import ConfirmationSwal from '@components/GeneralUseComponents/ConfirmationSwal/ConfirmationSwal';

//Styles
import styles from './DisplayCreateHomeBannerModal.module.scss';

//hooks
import useAxios from '@hooks/useAxios';

//Endpoints
import endPoints from '@services/api';
const DisplayCreateHomeBannerModal = ({
  showModal,
  setShowModal,
  discount_id,
  available_for,
  affiliate_link,
  type,
}) => {
  const { fetchData } = useAxios();

  //States
  const [state, setState] = useState({
    error: null,
    uploading: false,
  });

  const [bigImage, setBigImage] = useState([]);
  const [smallImage, setSmallImage] = useState([]);

  //React query
  const queryClient = useQueryClient();

  //Functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, error: null });

    if (bigImage.length === 0 || smallImage.length === 0) {
      return setState({
        error: 'Debes subir una imagen para cada campo',
      });
    }

    setState({ ...state, uploading: true });

    const formData = new FormData();
    formData.append('big_home_slider_image', bigImage[0]);
    formData.append('small_home_slider_image', smallImage[0]);
    formData.append('discount_id', discount_id);
    formData.append('available_for', available_for);
    formData.append('affiliate_link', affiliate_link);
    formData.append('type', type);

    //Upload banner
    const response = await fetchData(
      endPoints.admin.discounts.createHomeSliderBanner,
      'post',
      formData,
      {
        'Content-Type': 'multipart/form-data',
      }
    );

    if (response.error) {
      setState({
        error: response.error,
        uploading: false,
      });
      return;
    }

    //Invalidate the cache of the home banners info
    queryClient.invalidateQueries(
      [adminKeys.homeBanner.getHomeSliderBannersInfo],
      { exact: true }
    );

    //Invalidate the cache of the home banner of the discount
    queryClient.invalidateQueries(
      [adminKeys.homeBanner.getHomeBannerByDiscountId(discount_id)],
      { exact: true }
    );

    setState({ ...state, uploading: false, error: null });

    //Confirmation swal
    ConfirmationSwal({
      message: response.body,
    });

    //Reset the images
    setBigImage([]);
    setSmallImage([]);

    //Close the modal
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)} minHeight={250}>
      <div className={styles.modal}>
        <h1>Crear nuevo Home Slider Banner</h1>
        <form
          action=''
          method='POST'
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <p>Imagen pantalla grande en JPG (Tamaño 1200 x 550!)</p>
          <DragDropUploadArea
            onFileChange={(files) => {
              setBigImage(files);
            }}
            maxAllowedFiles={1}
            maxSizeFilesBytes={4194304}
            allowedFileFormats={['jpg', 'jpeg', 'png']}
            minimizedVersion={true}
          />
          <p>Imagen pantalla movil en JPG (780 x 520!)</p>
          <DragDropUploadArea
            onFileChange={(files) => {
              setSmallImage(files);
            }}
            maxAllowedFiles={1}
            maxSizeFilesBytes={4194304}
            allowedFileFormats={['jpg', 'jpeg', 'png']}
            minimizedVersion={true}
          />

          {state.error && <p className='error__messagev2'>{state.error}</p>}

          <button
            type='submit'
            className={`${styles.submit_btn} ${
              state.uploading && styles.buttonLoading
            } btn button--red`}
            disabled={state.uploading}
          >
            Crear banner
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default DisplayCreateHomeBannerModal;

DisplayCreateHomeBannerModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  discount_id: PropTypes.string.isRequired,
  available_for: PropTypes.string.isRequired,
  affiliate_link: PropTypes.string,
  type: PropTypes.string.isRequired,
};
