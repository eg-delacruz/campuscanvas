import Link from "next/link";

//Styles
import styles from "./ContentfulPreviewAlert.module.scss";

//CLARIFICATIONS
//This component is only used in the blog post page to display an alert with the message that the user is in preview mode. It should be used inside layouts so that the header content is not overlapped by the alert
const ContentfulPreviewAlert = ({}) => {
  return (
    //Toast popup component
    <div className={styles.ContentfulPreviewAlert}>
      <div className={`${styles.ContentfulPreviewAlert__container} container`}>
        <p>
          Estás en modo de vista previa. <br />
          <Link href="/api/v1/contentful/exit_contentful_preview">
            Click aquí para salir
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ContentfulPreviewAlert;
