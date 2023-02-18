import { useState } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

//Components
import Modal from '@components/GeneralUseComponents/Modal/Modal';
import DragDropUploadArea from '@components/GeneralUseComponents/DragDropUploadArea/DragDropUploadArea';

//Styles
import styles from './DisplayCreateHomeBannerModal.module.scss';

//hooks
import useAxios from '@hooks/useAxios';

//Endpoints
import endPoints from '@services/api';

//Redux
import { getHomeBannersInfo, selectHomeBanner } from '@redux/homeBannersSlice';

//CLARIFICATIONS:
//1. The setHomeBanner is a function that has to modify and set a state of the parent function
const DisplayCreateHomeBannerModal = ({
  showModal,
  setShowModal,
  setHomeBanner,
  currentHomeBannerState,
  discount_id,
}) => {
  const { fetchData } = useAxios();

  //States
  const [state, setState] = useState({
    error: null,
    uploading: false,
  });

  const [bigImage, setBigImage] = useState([]);
  const [smallImage, setSmallImage] = useState([]);

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Reducers
  const bannersInfoReducer = useSelector(selectHomeBanner);

  //Functions
  const getNewHomeBanner = async () => {
    setHomeBanner({
      ...currentHomeBannerState,
      loading: true,
      error: null,
    });
    const response = await fetchData(
      endPoints.admin.discounts.getHomeSliderBannerByDiscountId(discount_id),
      'get',
      null,
      { required_info: 'banner_by_discount_id' }
    );

    if (response.error) {
      setHomeBanner({
        ...currentHomeBannerState,
        error: response.error,
        loading: false,
      });
      return;
    }

    setHomeBanner({
      ...currentHomeBannerState,
      homeBanner: response.body,
      loading: false,
      error: null,
    });
  };

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

    //Refresh the banners reducer (this await actually works)
    dispatch(getHomeBannersInfo());

    //Get the new created home banner from the DB
    await getNewHomeBanner();

    setState({ ...state, uploading: false });

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
      title: response.body,
    });

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
          <p>
            Imagen pantalla grande en JPG (Ratio de 3 : 1 , tamaño óptimo de
            1200 x 400!)
          </p>
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
  setHomeBanner: PropTypes.func.isRequired,
  discount_id: PropTypes.string.isRequired,
};
