import PropTypes from "prop-types";

//Styles
import styles from "./PostTemplate.module.scss";

//Components
import ContentfulRichText from "@components/GeneralUseComponents/ContentfulRichText/ContentfulRichText";

const PostTemplate = ({
  Author,
  AuthorURL = "https://campuscanvas.net/",
  Content,
  SmallImage,
  LargeImage,
  Title,
  PubDate,
}) => {
  return (
    <div className="Post container">
      <picture className={styles.Post__image}>
        <source media="(max-width:480px)" srcSet={SmallImage} />
        {LargeImage && (
          <img src={LargeImage} alt={`Imagen del post ${Title}`} />
        )}
      </picture>

      <span className={styles.Post__author}>
        {" "}
        <strong>Autor:</strong>{" "}
        <span>
          <a target="_blank" href={AuthorURL}>
            {Author ? Author : "Campus Canvas"}
          </a>
        </span>
      </span>
      <br />
      <span className={styles.Post__PubDate}>
        <h6>Fecha de publicación: </h6> {PubDate}
      </span>

      <hr />

      <h1 className={styles.Post__title}>{Title}</h1>

      <div className={styles.Post__content}>
        <ContentfulRichText content={Content} />
      </div>
    </div>
  );
};

export default PostTemplate;

PostTemplate.propTypes = {
  Author: PropTypes.string.isRequired,
  AuthorURL: PropTypes.string.isRequired,
  Content: PropTypes.object.isRequired,
  SmallImage: PropTypes.string.isRequired,
  LargeImage: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  PubDate: PropTypes.string.isRequired,
};
