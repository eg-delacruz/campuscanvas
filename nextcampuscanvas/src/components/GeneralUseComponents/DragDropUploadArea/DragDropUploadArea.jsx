import { useState } from 'react';
import propTypes from 'prop-types';
import Image from 'next/image';

//Styles
import styles from './DragDropUploadArea.module.scss';

//Assets
import uploadImg from '@assets/GeneralUse/IconsAndButtons/usedInComponents/DragDropUploadArea/UploadIcon.png';
import TrashIcon from '@assets/PagesImages/ContactoImages/TrashIcon.png';

//Services
import { ToUploadImageConfig } from '@services/ToUploadImageConfig';
import formatBytes from '@services/bytesToMb.js';

const DragDropUploadArea = ({
  onFileChange,
  maxAllowedFiles = 2,
  maxSizeFilesBytes = 4194304,
  allowedFileFormats = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx', 'pptx'],
}) => {
  const [dragAreaSelected, setDragAreaSelected] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [state, setState] = useState({
    error: null,
  });

  //Handling styles depending on state (start)
  const onDragEnter = () => {
    setDragAreaSelected(true);
  };
  const onDragLeave = () => {
    setDragAreaSelected(false);
  };
  const onDrop = () => {
    setDragAreaSelected(false);
  };
  //Handling styles depending on state (end)

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];

    //Allow only certain file formats
    const dots = newFile.name.split('.');
    const newFileType = dots[dots.length - 1];
    if (!allowedFileFormats.includes(newFileType)) {
      setState({ ...state, error: 'Formato de archivo no soportado' });
      setTimeout(() => {
        setState({ ...state, error: null });
      }, 3000);
      return false;
    }

    //Max allowed files
    if (fileList.length >= maxAllowedFiles) {
      setState({
        ...state,
        error: `No puedes enviar más de ${maxAllowedFiles} documentos`,
      });
      setTimeout(() => {
        setState({ ...state, error: null });
      }, 3000);
      return false;
    }

    if (newFile) {
      //Max size allowed files
      if (newFile.size > maxSizeFilesBytes) {
        setState({
          ...state,
          error: `El documento pesa demasiado`,
        });
        setTimeout(() => {
          setState({ ...state, error: null });
        }, 3000);
        return false;
      }
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  console.log(fileList);

  return (
    <>
      {/* ///////////////////
    //    DragDrop Area   //
   ///////////////////////// */}
      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={
          dragAreaSelected
            ? `${styles.drop_file_input} ${styles.dragover}`
            : styles.drop_file_input
        }
      >
        <div className={styles.drop_file_input__label}>
          <div className={styles.uploadImageContainer}>
            <Image src={uploadImg} alt='Sube tu documento' />
          </div>
          <p className={styles.label_message}>
            Arrastra aquí tus documentos (
            {formatBytes.formatBytesString(maxSizeFilesBytes)} max.)
          </p>
        </div>
        <input
          type='file'
          value=''
          accept='.pdf,.jpg,.jpeg,.png,.doc,.docx,.pptx'
          onChange={onFileDrop}
          multiple
        />
      </div>

      {state.error && (
        <p className={`${styles.error_displayer} error__message`}>
          {state.error}
        </p>
      )}

      {/* ///////////////////
    //    Files displayer   //
   ///////////////////////// */}

      {fileList.length > 0 ? (
        <div className={styles.drop_file_preview}>
          {fileList.map((item, index) => (
            <div key={index} className={styles.drop_file_preview__item}>
              <div className={styles.drop_file_preview__item_image_container}>
                <Image
                  src={
                    ToUploadImageConfig[item.name.split('.').slice(-1)] ||
                    ToUploadImageConfig['default']
                  }
                />
              </div>
              <div className={styles.drop_file_preview__item_info}>
                <p>{item.name}</p>
                <p>{formatBytes.formatBytesString(item.size)}</p>
              </div>
              <span
                className={styles.drop_file_preview__item_del}
                onClick={() => {
                  fileRemove(item);
                }}
              >
                <div>
                  <Image src={TrashIcon} />
                </div>
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

DragDropUploadArea.propTypes = {
  submitFunction: propTypes.func,
  maxAllowedFiles: propTypes.number,
  maxSizeFilesBytes: propTypes.number,
  allowedFileFormats: propTypes.array,
};

export default DragDropUploadArea;
