import { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

//Styles
import styles from './DisplayNewBrandModal.module.scss';
//Rich text editor styles
//https://www.youtube.com/watch?v=kykC7i9VUE4
import 'react-quill/dist/quill.snow.css';

//Components
import Modal from '@components/GeneralUseComponents/Modal/Modal';
import DragDropUploadArea from '@components/GeneralUseComponents/DragDropUploadArea/DragDropUploadArea';
import CustomCheckBox from '@components/GeneralUseComponents/CustomCheckBox/CustomCheckBox';

//hooks
import { useInputValue } from '@hooks/useInputValue';
import useAxios from '@hooks/useAxios';

//Endpoints
import endPoints from '@services/api';

//Redux actions
import { getBrands } from '@redux/brandsSlice';
import { countBrands } from '@redux/brandsCountSlice';

//Rich text editor
const ReactQuill = dynamic(
  async () => {
    const { default: ReactQuill } = await import('react-quill');
    return ({ forwardedRef, ...props }) => (
      <ReactQuill ref={forwardedRef} {...props} />
    );
  },
  { ssr: false }
);

//React Quill custom options
const modules = {
  clipboard: {
    //avoids Quill creating extra, empty lines if the source of the copy-paste includes a lot of padding before/after things like headings.
    matchVisual: false,
  },
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

//React Quill custom formats. The ones that are not included here will be removed from the editor: https://quilljs.com/docs/formats/
const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
];

const displayNewBrandModal = ({ showModal, setShowModal }) => {
  //Refs
  const descriptionRef = useRef();

  //States
  const [state, setState] = useState({
    error: null,
    uploading: false,
  });
  const [description, setDescription] = useState('');
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [files, setFiles] = useState([]);

  const { fetchData: uploadData, cancel } = useAxios();

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  const router = useRouter();

  //Controlling inputs
  const BRAND_NAME = useInputValue('');
  const SPONSORS_BOX = useInputValue(false);
  const AFFILIATE_PROGRAM = useInputValue('');
  const NOTES = useInputValue('');

  //Count description length
  useEffect(() => {
    //Avoid that the first useEffect runs before the descriptionRef is set
    if (!descriptionRef.current) return;

    setDescriptionLength(
      descriptionRef.current?.unprivilegedEditor.getLength() - 1
    );
  }, [description]);

  //Functions
  const handleCreateNew = async (e) => {
    e.preventDefault();
    setState({ ...state, error: null });

    if (files.length === 0) {
      return setState({
        error:
          'Debes subir un archivo preferentemente en formato SVG, o un PNG de 230 x 230 px',
      });
    }

    if (!descriptionLength) {
      setState({
        ...state,
        error: 'Debes escribir una descripción',
      });
      setTimeout(() => {
        setState({
          ...state,
          error: null,
        });
      }, 3000);
      return false;
    }

    const formdata = new FormData();
    formdata.append('brand_name', BRAND_NAME.value);
    formdata.append('brand_description', description);
    formdata.append('affiliate_program', AFFILIATE_PROGRAM.value);
    formdata.append('notes', NOTES.value);
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
    setDescription('');
    setFiles([]);
    SPONSORS_BOX.setValue(false);
    setShowModal(false);
    setState({ ...state, uploading: false, error: null });
    setDescriptionLength(0);

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
      title: response.body.message,
    });

    //Redirect to the new brand
    router.push(
      `/admin/descuentos/gestionar-marcas/editar-marca/${response.body.brand._id}`
    );
  };

  return (
    <Modal position='top' show={showModal} onClose={() => setShowModal(false)}>
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

          <div className={styles.description_container}>
            <label
              htmlFor='brand_description'
              className={`${styles.input_title}`}
            >
              Descripción
            </label>
            <div className={styles.quill_editor}>
              <ReactQuill
                id='brand_description'
                modules={modules}
                formats={formats}
                value={description}
                onChange={setDescription}
                forwardedRef={descriptionRef}
              />
            </div>
            <p
              className={`${styles.char_count} ${
                styles.description_char_count
              } ${descriptionLength > 520 ? styles.char_count_warn : ''}`}
            >
              <span>{descriptionLength} / 520</span>
            </p>
          </div>

          <div>
            <label
              htmlFor='affiliate_program'
              className={`${styles.input_title} `}
            >
              Plataforma de afiliado de la marca
            </label>
            <input
              className={`${styles.input} ${styles.affiliate_program_input}`}
              name='affiliate_program'
              id='affiliate_program'
              type='text'
              placeholder='Awin, Tradedoubler, etc.'
              autoComplete='off'
              value={AFFILIATE_PROGRAM.value}
              onChange={AFFILIATE_PROGRAM.onChange}
            />
          </div>

          <div>
            <label htmlFor='notes' className={`${styles.input_title}`}>
              Notas
            </label>
            <textarea
              className={`${styles.notes_text_area}`}
              name='notes'
              id='notes'
              type='text'
              placeholder='Por ejemplo, forma de trabajar con la marca, etc.'
              autoComplete='off'
              value={NOTES.value}
              onChange={NOTES.onChange}
            />
          </div>

          <label className={`${styles.input_title}`}>
            Logo en SVG o PNG de 230 x 230 px
          </label>

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
