import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

//Styles
import styles from './StuIdVerification.module.scss';

//Assets
import arrow_right_white from '@assets/GeneralUse/IconsAndButtons/arrow_right_white.svg';

//Components
import DragDropUploadArea from '@components/GeneralUseComponents/DragDropUploadArea/DragDropUploadArea';

//Browser identifyer
import identifyBrowser from '@services/identifyBrowser';
const { getBrowserName } = identifyBrowser;

//Endpoints
import endPoints from '@services/api';

const StuIdVerification = ({ setVerificationMethod }) => {
  const [files, setFiles] = useState([]);
  const [state, setState] = useState({
    error: null,
    loading: false,
    sent: false,
  });

  const router = useRouter();

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
            app_secret_key:
              process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
            browserName: getBrowserName(navigator.userAgent),
          },
          body: formData,
        }
      );

      const data = await respuesta.json();
      //Handling server errors
      if (data.error) {
        setState({ ...state, error: data.error, loading: false });
        setTimeout(() => {
          setState({ ...state, error: null });
        }, 3000);
        return false;
      }

      setState({ ...state, error: null, loading: false });

      setState({ ...state, error: null, loading: false, sent: true });

      setTimeout(() => {
        router.push('/');
      }, 10000);
    } catch (error) {
      setState({ ...state, error: error, loading: false });
    }
  };

  //Function needed by Drag Drog area to return files to parent component
  const onFileChange = (files) => {
    setFiles(files);
  };

  if (state.sent) {
    return (
      <div className={styles.container}>
        <h1>Documentos enviados 🗎</h1>
        <p>
          Hemos recibido tus documentos. Los evaluaremos y daremos de alta tu
          cuenta en caso estos sean válidos. Ten en cuenta que la verificación
          tardará aproximadamente un día laboral.
        </p>
        <p>
          <strong>🕒 En breve serás redirigido al Home</strong>
        </p>
      </div>
    );
  }

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

      {state.error && <p className={'error__messagev2'}>{state.error}</p>}

      {files.length > 0 && (
        <button
          type='submit'
          className={`${state.loading && styles.buttonLoading} btn button--red`}
          disabled={state.loading}
        >
          Enviar
        </button>
      )}
    </form>
  );
};

export default StuIdVerification;
