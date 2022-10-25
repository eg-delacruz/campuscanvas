//TODO:Don´t forget to implement FB Conversions API in server
import Image from 'next/image';
import { useState } from 'react';

//Styles
import styles from './StuIdVerification.module.scss';

//Assets
import arrow_right_white from '@assets/GeneralUse/IconsAndButtons/arrow_right_white.svg';

//Components
import DragDropUploadArea from '@components/GeneralUseComponents/DragDropUploadArea/DragDropUploadArea';

//Endpoints
import endPoints from '@services/api';

const StuIdVerification = ({ user_id, setVerificationMethod }) => {
  const [files, setFiles] = useState([]);
  const [state, setState] = useState({
    error: null,
    loading: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, error: null, loading: true });
    const formData = new FormData();

    files.map((file) => {
      return formData.append('files', file);
    });

    try {
      const respuesta = await fetch(
        endPoints.file_management.student_acc_files.stu_id_files,
        {
          method: 'POST',
          headers: {
            accept: '*/*',
            //TODO: not sure if erase this or not for file upload
            //'Content-Type': 'application/json',
            app_secret_key:
              process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
          },
          //TODO: verify id JSON.stringify(formData) needed
          //body: JSON.stringify(formData),
          body: formData,
        }
      );

      console.log(respuesta);
      const data = await respuesta.json();
      console.log(data);

      setState({ ...state, error: null, loading: false });
    } catch (error) {
      setState({ ...state, error: error, loading: false });
    }
  };

  //Function needed by Drag Drog area to return files to parent component
  const onFileChange = (files) => {
    setFiles(files);
  };

  return (
    <form
      onSubmit={handleSubmit}
      action=''
      method='POST'
      className={styles.container}
      autoComplete='off'
    >
      <button
        onClick={() => {
          setVerificationMethod('');
        }}
        className={`${styles.button_back} btn button--red`}
      >
        <span>
          <Image src={arrow_right_white} />
        </span>
        <div>Otro método</div>
      </button>

      <h1>Regístrate gratis</h1>
      <h4>Paso 3 de 3</h4>
      <p className={styles.subtitle}>
        Sube aquí tu identificación de estudiante. La evaluaremos y daremos de
        alta tu cuenta en caso esta sea válida. Ten en cuenta que la
        verificación tardará aproximadamente un día laboral.
      </p>

      <DragDropUploadArea
        onFileChange={(files) => {
          onFileChange(files);
        }}
        maxAllowedFiles={2}
        maxSizeFilesBytes={4194304}
        allowedFileFormats={[
          'pdf',
          'jpg',
          'jpeg',
          'png',
          'doc',
          'docx',
          'pptx',
        ]}
      />

      {files.length > 0 && (
        //TODO: loading state + disabled
        <button type='submit' className={`btn button--red`}>
          Enviar
        </button>
      )}
    </form>
  );
};

export default StuIdVerification;
