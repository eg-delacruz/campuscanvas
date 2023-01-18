import { useState } from 'react';

//styles
import styles from '@styles/pagestyles/admin/descuentos/gestionarMarcas.module.scss';

//Components
import Modal from '@components/GeneralUseComponents/Modal/Modal';
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ButtonBack from '@components/GeneralUseComponents/ButtonBack/ButtonBack';
import DragDropUploadArea from '@components/GeneralUseComponents/DragDropUploadArea/DragDropUploadArea';
import CustomCheckBox from '@components/GeneralUseComponents/CustomCheckBox/CustomCheckBox';

//hooks
import { useInputValue } from '@hooks/useInputValue';
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

const gestionarMarcas = () => {
  const { securingRoute } = useSecureAdminRoute();

  //States
  const [state, setState] = useState({
    error: null,
    submitting: false,
  });
  const [showModal, setShowModal] = useState(true);
  const [files, setFiles] = useState([]);
  const [sponsorsBox, setSponsorsBox] = useState(false);

  const BRANDS = [
    {
      id: 1,
      name: 'Marca 1',
    },
    {
      id: 2,
      name: 'Marca 2',
    },
    {
      id: 3,
      name: 'Marca 3',
    },
    {
      id: 4,
      name: 'Marca 4',
    },
  ];

  //TODO: show a submitting state while submitting, close the modal and show a success message with sweetAlert. Use the new useAxios hook to submit
  //Controlling inputs
  const BRAND_NAME = useInputValue('');
  const BRAND_DESCRIPTION = useInputValue('');

  //Function needed by Drag Drog area to return files to parent component
  const onFileChange = (files) => {
    setFiles(files);
  };

  //Function needed by Custom checkbox to return boolean
  const onCheckboxChange = (value) => {
    setSponsorsBox(value);
  };

  const handleCreateNew = (e) => {
    e.preventDefault();
    setState({ ...state, error: null });

    if (files.length === 0) {
      return setState({
        error: 'Debes subir una imagen SVG del logo',
      });
    }

    const formdata = new FormData();
    formdata.append('brand_name', BRAND_NAME.value);
    formdata.append('brand_description', BRAND_DESCRIPTION.value);
    formdata.append('brand_logo', files[0]);
    formdata.append('sponsors_box', sponsorsBox);
  };

  const displayNewBrandModal = () => {
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
                <label
                  htmlFor='brand_name'
                  className={`${styles.input_title} `}
                >
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
                message={'La marca patrocina Campus Box 🎁'}
                required={false}
                defaultChecked={false}
                onBoxCheck={() => {
                  onCheckboxChange(!sponsorsBox);
                }}
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
                onChange={BRAND_DESCRIPTION.onChange}
                required
              />
            </div>

            <label className={`${styles.input_title}`}>
              Imagen del logo en SVG
            </label>
            <DragDropUploadArea
              onFileChange={(files) => {
                onFileChange(files);
              }}
              maxAllowedFiles={1}
              maxSizeFilesBytes={4194304}
              allowedFileFormats={['svg', 'jpg', 'jpeg', 'png']}
            />

            {state.error && <p className='error__messagev2'>{state.error}</p>}

            <button className={`${styles.submit_btn} btn button--red`}>
              Crear
            </button>
          </form>
        </div>
      </Modal>
    );
  };

  if (securingRoute) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      {displayNewBrandModal()}
      <SecondaryHeader />
      <div className={`${styles.container} container`}>
        <ButtonBack prevRoute={'/admin/descuentos'} />

        <div className={styles.title_create_brand_container}>
          <h1>Marcas</h1>
          <button
            className='btn button--red'
            onClick={() => setShowModal(true)}
          >
            <span>+ </span>Crear marca
          </button>
        </div>

        <section className={styles.brands}>
          {BRANDS.length > 0 ? (
            BRANDS.map((brand) => (
              <div className={styles.brand} key={brand.id}>
                <h5>{brand.name}</h5>{' '}
                <div>
                  <span> Editar </span> <span> Eliminar </span>
                </div>
              </div>
            ))
          ) : (
            <p>No hay marcas</p>
          )}
        </section>
      </div>
    </>
  );
};

export default gestionarMarcas;
