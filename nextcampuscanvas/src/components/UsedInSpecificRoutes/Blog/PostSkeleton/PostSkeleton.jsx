//Styles
import styles from './PostSkeleton.module.scss';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';

const PostSkeleton = () => {
  const PARAGRAPH_COUNT = 6;

  return (
    <Layout>
      <div className={`${styles.container} container`}>
        <div className={styles.image_skeleton}></div>
        <div className={styles.author_skeleton}></div>
        <div className={styles.pubDate_skeleton}></div>
        <hr />
        <div className={styles.title_skeleton}></div>

        {/* Some paragraph skeletons */}
        {[...Array(PARAGRAPH_COUNT)].map((_, index) => (
          <div key={index} className={styles.paragraph_skeleton}></div>
        ))}

        <br />
        <br />

        {/* Some paragraph skeletons */}
        {[...Array(PARAGRAPH_COUNT)].map((_, index) => (
          <div key={index} className={styles.paragraph_skeleton}></div>
        ))}

        <br />
        <br />

        {/* Some paragraph skeletons */}
        {[...Array(PARAGRAPH_COUNT)].map((_, index) => (
          <div key={index} className={styles.paragraph_skeleton}></div>
        ))}
      </div>
    </Layout>
  );
};

export default PostSkeleton;
