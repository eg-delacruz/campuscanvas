import Img from 'react-cool-img';
import PropTypes from 'prop-types';
import Link from 'next/link';

//Styles
import styles from './PostsTable.module.scss';

//Services
import { truncateText } from '@services/truncateText';

//Assets
import main_post_image_placeholder from '@assets/PagesImages/BlogIndex/main_post_img_placeholder.gif';
import posts_img_placeholder from '@assets/PagesImages/BlogIndex/posts_img_placeholder.gif';
import Pagination from '@components/GeneralUseComponents/Pagination/Pagination';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentPage,
  selectBlogPagination,
} from '@redux/blogPaginationSlice';

const PostsTable = ({ posts }) => {
  let MAIN_POST = null;
  const ENTRIES_PER_PAGE = 6;

  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Reducers (global states)
  const blogPaginationReducer = useSelector(selectBlogPagination);

  //Change page
  const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));

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

  //Get posts of current page
  const indexOfLastPost = blogPaginationReducer.currentPage * ENTRIES_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - ENTRIES_PER_PAGE;
  //This array is the one that will be mapped, not the ALL_POSTS array
  const currentPosts = ALL_POSTS.slice(indexOfFirstPost, indexOfLastPost);

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
                placeholder={main_post_image_placeholder.src}
                alt={`Imagen miniatura de ${MAIN_POST?.fields.titulo}`}
                lazy={true}
              />
            </figure>
            <h1>{MAIN_POST?.fields.titulo}</h1>
            <p>{truncateText(MAIN_POST?.fields.extracto, 380)}</p>
            <Link href={`/blog/${MAIN_POST?.fields.slug}`}>
              <a className='btn button--redRedborderTransparent'>Leer más</a>
            </Link>
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
            : ''
        } container`}
      >
        {FEATURED_POSTS.map((post) => (
          //Featured post card
          <Link href={`/blog/${post.fields.slug}`}>
            <a className={styles.featured_post_card_link_container}>
              <article
                className={styles.featured_post_card}
                key={post.fields.slug}
              >
                <figure className={styles.featured_post_card__image}>
                  <Img
                    src={`https:${post.fields.imagenMiniatura.fields.file.url}`}
                    placeholder={posts_img_placeholder.src}
                    alt={`Imagen miniatura de ${post.fields.titulo}`}
                    lazy={true}
                    className={styles.Img}
                  />
                </figure>
                <h1>{post.fields.titulo}</h1>
              </article>
            </a>
          </Link>
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
            {currentPosts.map((post) => (
              //Post card
              <article key={post.fields.slug} className={styles.post}>
                <figure>
                  <Img
                    src={`https:${post.fields.imagenMiniatura.fields.file.url}`}
                    placeholder={posts_img_placeholder.src}
                    alt={`Imagen miniatura de ${post.fields.titulo}`}
                    lazy={true}
                    className={styles.Img}
                  />
                </figure>
                <h1>{post.fields.titulo}</h1>
                <p>{truncateText(post.fields.extracto, 170)}</p>

                <Link href={`/blog/${post.fields.slug}`}>
                  <a className='btn button--redRedborderTransparent'>
                    Leer más
                  </a>
                </Link>

                <hr />
              </article>
            ))}
          </div>
        </section>
      )}

      <Pagination
        itemsPerPage={ENTRIES_PER_PAGE}
        totalItems={ALL_POSTS.length}
        paginate={paginate}
        currentPage={blogPaginationReducer.currentPage}
      />
    </div>
  );
};

export default PostsTable;

PostsTable.propTypes = {
  posts: PropTypes.array.isRequired,
};
