import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

//Styles
import styles from './DisplayNewBrandModal.module.scss';

//Components
import Modal from '@components/GeneralUseComponents/Modal/Modal';
import DragDropUploadArea from '@components/GeneralUseComponents/DragDropUploadArea/DragDropUploadArea';
import CustomCheckBox from '@components/GeneralUseComponents/CustomCheckBox/CustomCheckBox';

//hooks
import { useInputValue } from '@hooks/useInputValue';
import useAxios from '@hooks/useAxios';
import { useCharacterCount } from '@hooks/useCharacterCount';

//Endpoints
import endPoints from '@services/api';

//Redux actions
import { getBrands } from '@redux/brandsSlice';
import { countBrands } from '@redux/brandsCountSlice';

const displayNewBrandModal = ({ showModal, setShowModal }) => {
  //States
  const [state, setState] = useState({
    error: null,
    uploading: false,
  });
  const [files, setFiles] = useState([]);

  const { fetchData: uploadData, cancel } = useAxios();

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Controlling inputs
  const BRAND_NAME = useInputValue('');
  const BRAND_DESCRIPTION = useInputValue('');
  const SPONSORS_BOX = useInputValue(false);

  //Setting field counts
  const DESCRIPTION_COUNT = useCharacterCount();

  //Functions
  const handleDescriptionChange = (e) => {
    BRAND_DESCRIPTION.onChange(e);
    DESCRIPTION_COUNT.onChange(e);
  };

  const handleCreateNew = async (e) => {
    e.preventDefault();
    setState({ ...state, error: null });

    if (files.length === 0) {
      return setState({
        error:
          'Debes subir un archivo preferentemente en formato SVG, o un PNG de 230 x 230 px',
      });
    }

    const formdata = new FormData();
    formdata.append('brand_name', BRAND_NAME.value);
    formdata.append('brand_description', BRAND_DESCRIPTION.value);
    formdata.append('brand_logo', files[0]);
    formdata.append('sponsors_box', SPONSORS_BOX.value);

    setState({ ...state, uploading: true });

    //No try catch needed, since done in the useAxios hook
    const response = await uploadData(
      endPoints.admin.discounts.brands,
      'post',
      formdata,
      { 'Content-Type': 'multipart/form-data' }
    );

    if (response?.error) {
      return setState({ ...state, error: response.error, uploading: false });
    }

    //Dispatching action to update the brands list
    dispatch(getBrands());

    //Dispatching action to update the brands count
    dispatch(countBrands());

    //Reseting values and closing modal
    BRAND_NAME.setValue('');
    BRAND_DESCRIPTION.setValue('');
    setFiles([]);
    SPONSORS_BOX.setValue(false);
    setShowModal(false);
    setState({ ...state, uploading: false, error: null });
    DESCRIPTION_COUNT.setValue(0);

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
  };

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <div className={styles.modal}>
        <h1>Crear nueva marca</h1>
        <form
          action=''
          method='POST'
          autoComplete='off'
          onSubmit={handleCreateNew}
        >
          <div className={styles.row_1_container}>
            <div>
              <label htmlFor='brand_name' className={`${styles.input_title} `}>
                Nombre de la marca
              </label>
              <input
                className={`${styles.input} ${styles.brand_name_input}`}
                name='brand_name'
                id='brand_name'
                type='text'
                placeholder='Nombre de la marca'
                autoComplete='off'
                value={BRAND_NAME.value}
                onChange={BRAND_NAME.onChange}
                required
              />
            </div>
            <CustomCheckBox
              message='La marca patrocina Campus Box 🎁'
              required={false}
              state={SPONSORS_BOX}
            />
          </div>

          <div>
            <label
              htmlFor='brand_description'
              className={`${styles.input_title}`}
            >
              Descripción
            </label>
            <textarea
              className={`${styles.description_text_area}`}
              name='brand_description'
              id='brand_description'
              type='text'
              placeholder='Recomendado: 520 caracteres aprox.'
              autoComplete='off'
              value={BRAND_DESCRIPTION.value}
              onChange={handleDescriptionChange}
              required
            />
            <p
              className={`${styles.char_count} ${
                DESCRIPTION_COUNT.value > 520 ? styles.char_count_warn : ''
              }`}
            >
              <span>{DESCRIPTION_COUNT.value} / 520</span>
            </p>
          </div>

          <label className={`${styles.input_title}`}>Logo en .SVG</label>

          <DragDropUploadArea
            onFileChange={(files) => {
              setFiles(files);
            }}
            maxAllowedFiles={1}
            maxSizeFilesBytes={4194304}
            allowedFileFormats={['svg', 'jpg', 'jpeg', 'png']}
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
            Crear
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default displayNewBrandModal;
