import propTypes from 'prop-types';
import Image from 'next/image';

//Styles
import styles from './ToUploadFilePreview.module.scss';

//Services
import formatBytes from '@services/bytesToMb.js';
import { ToUploadImageConfig } from '@services/ToUploadImageConfig';

//Assets
import TrashIcon from '@assets/PagesImages/ContactoImages/TrashIcon.png';

//Clarifications:
//1. fileList has to be an object that contains an array
const ToUploadFilePreview = ({ fileList, setFileList }) => {
  //Functions
  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  };
  return (
    <>
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

export default ToUploadFilePreview;

ToUploadFilePreview.propTypes = {
  fileList: propTypes.array,
};
