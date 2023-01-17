import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

//Session
import { useSession } from 'next-auth/react';

//Components
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Styles
import styles from '@styles/pagestyles/admin/students/displayStuIdDocs.module.scss';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

const display_stu_id_docs = () => {
  const { securingRoute } = useSecureAdminRoute();

  const [state, setState] = useState({
    loading: true,
  });
  const [isClient, setIsClient] = useState(false);
  const [fileType, setFileType] = useState('');
  const [fileURL, setFileURL] = useState('');

  useEffect(() => {
    //Needed for NextJS to work only if we are in a browser
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setState({ ...state, loading: false });
      displayFile();
    }
  }, [isClient]);

  const displayFile = () => {
    const fileURL = localStorage.getItem('STU_ID_FILE');
    setFileURL(fileURL);
    const dots = fileURL.split('.');
    const fileType = dots[dots.length - 1].replaceAll('"', '');

    if (fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png') {
      setFileType('image');
    }
    if (fileType == 'pdf') {
      setFileType('pdf');
    }
    if (fileType == 'doc' || fileType == 'docx') {
      setFileType('word_doc');
    }
    if (fileType == 'pptx' || fileType == 'ppt') {
      setFileType('powerpoint');
    }
  };

  //Dinamic displaying

  if (state.loading || securingRoute) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  //Image displayer
  if (fileType === 'image') {
    return (
      <>
        <div className={`${styles.image_container} container`}>
          <img src={fileURL} />
        </div>
      </>
    );
  }

  //PDF displayer
  if (fileType === 'pdf') {
    //https://superuser.com/questions/1277819/why-does-chrome-sometimes-download-a-pdf-instead-of-opening-it
    //Explanation of how a browser identifies a PDF file and displays or downloads it
    return (
      <>
        <div className={`${styles.pdf_container} container`}>
          <object
            data={fileURL}
            width='100%'
            height='100%'
            type='application/pdf'
          >
            <iframe
              src={fileURL}
              width='100%'
              height='100%'
              type='application/pdf'
            >
              <p>This browser does not support PDF!</p>
            </iframe>
          </object>
        </div>
      </>
    );
  }

  //Powerpoint and Word displayer
  if (fileType === 'powerpoint' || fileType === 'word_doc') {
    return (
      <>
        <div className={`${styles.word_ppt_container} container`}>
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${fileURL}`}
            width='100%'
            height='100%'
            frameborder='0'
          />
        </div>
      </>
    );
  }

  return (
    <div>
      <p className='error__messagev2'>Tipo de archivo no compatible</p>
    </div>
  );
};

export default display_stu_id_docs;
