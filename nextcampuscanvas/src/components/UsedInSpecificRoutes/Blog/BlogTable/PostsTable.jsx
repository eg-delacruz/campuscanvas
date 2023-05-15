import Img from "react-cool-img";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

//Styles
import styles from "./PostsTable.module.scss";

//Components
import CircularLoader from "@components/GeneralUseComponents/CircularLoader/CircularLoader";

//Services
import { truncateText } from "@services/truncateText";

const PostsTable = ({ posts }) => {
  let MAIN_POST = null;

  //Get the main post from the posts array
  MAIN_POST = posts.find((post) => {
    return post.fields.postPrincipal === true;
  });

  //If there is no main post, get the first post from the posts array (which is the newest post)
  if (!MAIN_POST) {
    MAIN_POST = posts[0];
  }

  //Get all featured posts from the posts array (postDestacado === true)
  const FEATURED_POSTS = posts.filter((post) => {
    return post.fields.postDestacado === true;
  });

  //Eliminate the main post and the featured posts from the posts array
  const ALL_POSTS = posts.filter((post) => {
    return (
      post.fields.postDestacado === false && post.fields.postPrincipal === false
    );
  });

  //To send the id of the post to the post page
  const router = useRouter();

  return (
    <div className={styles.Posts}>
      {/*   /////////////////////////
            //      Main Post      //
            ///////////////////////// */}
      <main className={styles.Posts__main}>
        <div className={`${styles.Posts__mainContainer} container`}>
          <div className={styles.MainPost}>
            <figure className={styles.MainPost__image}>
              <Img
                src={`https:${MAIN_POST?.fields.imagenDePortada?.fields.file.url}`}
                placeholder={CircularLoader}
                alt={`Imagen miniatura de ${MAIN_POST?.fields.titulo}`}
                lazy={true}
              />
            </figure>
            <h1>{MAIN_POST?.fields.titulo}</h1>
            <p>{truncateText(MAIN_POST?.fields.extracto, 380)}</p>
            <button
              onClick={() => {
                router.push(
                  {
                    pathname: `/blog/${MAIN_POST?.fields.slug}`,
                    query: { slug: MAIN_POST?.fields.slug },
                  },
                  `/blog/${MAIN_POST?.fields.slug}`
                );
              }}
              className="btn button--redRedborderTransparent"
            >
              Leer más
            </button>
          </div>
        </div>
      </main>

      {/*   /////////////////////////
            //    Featured posts    //
            ///////////////////////// */}
      <h3 className={styles.featuredPostsHeader}>Posts destacados</h3>
      <hr className={styles.featured_posts_upper_hr} />
      <section
        className={`${styles.featuredPostsContainer} ${
          FEATURED_POSTS.length < 3
            ? styles.featuredPostsContainer_adjustSpacing
            : ""
        } container`}
      >
        {FEATURED_POSTS.map((post) => (
          //Featured post card
          <article
            className={styles.featured_post_card}
            key={post.fields.slug}
            onClick={() => {
              router.push(
                {
                  pathname: `/blog/${post.fields.slug}`,
                  query: { slug: post.fields.slug },
                },
                `/blog/${post.fields.slug}`
              );
            }}
          >
            <figure className={styles.featured_post_card__image}>
              <Img
                src={`https:${post.fields.imagenMiniatura.fields.file.url}`}
                placeholder={CircularLoader}
                alt={`Imagen miniatura de ${post.fields.titulo}`}
                lazy={true}
                className={styles.Img}
              />
            </figure>
            <h1>{post.fields.titulo}</h1>
          </article>
        ))}
      </section>

      {/*   /////////////////////////
            // Latest posts table //
          ///////////////////////// */}
      {ALL_POSTS.length > 0 && (
        <section className={`${styles.AllPosts} container`}>
          <h3 className={styles.AllPostsHeader}>Últimos Posts</h3>
          <hr />

          <div className={styles.AllPostsGrid}>
            {ALL_POSTS.map((post) => (
              //Post card
              <article key={post.fields.slug} className={styles.post}>
                <figure>
                  <Img
                    src={`https:${post.fields.imagenMiniatura.fields.file.url}`}
                    placeholder={CircularLoader}
                    alt={`Imagen miniatura de ${post.fields.titulo}`}
                    lazy={true}
                    className={styles.Img}
                  />
                </figure>
                <h1>{post.fields.titulo}</h1>
                <p>{truncateText(post.fields.extracto, 170)}</p>

                <button
                  onClick={() => {
                    router.push(
                      {
                        pathname: `/blog/${post.fields.slug}`,
                        query: { slug: post.fields.slug },
                      },
                      `/blog/${post.fields.slug}`
                    );
                  }}
                  className="btn button--redRedborderTransparent"
                >
                  Leer más
                </button>

                <hr />
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default PostsTable;

PostsTable.propTypes = {
  posts: PropTypes.array.isRequired,
};
