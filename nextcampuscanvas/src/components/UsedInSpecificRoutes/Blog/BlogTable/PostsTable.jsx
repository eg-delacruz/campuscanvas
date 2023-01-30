import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

//Purufy inserted external html
import DOMPurify from 'isomorphic-dompurify';

//Styles
import styles from './PostsTable.module.scss';

//Assets

//Components
import Loader from '@components/GeneralUseComponents/Loader/Loader.jsx';
import ErrorDisplayer from '@components/GeneralUseComponents/ErrorDisplayer/ErrorDisplayer';

//Redux actions
import { getPosts, selectPosts } from '@redux/postsSlice';

const PostsTable = () => {
  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Reducers
  const postsReducer = useSelector(selectPosts);

  //To send the id of the post to the post page
  const router = useRouter();

  if (postsReducer.posts.length === 0) {
    dispatch(getPosts());
  }
  if (postsReducer.loading)
    return (
      <div className={styles.loader_container}>
        <Loader />
      </div>
    );
  if (postsReducer.error)
    return <ErrorDisplayer message={postsReducer.error} />;

  //Main post = last post in array
  const MAIN_POST =
    postsReducer.posts.length > 0
      ? [postsReducer.posts[postsReducer.posts.length - 1]]
      : [];

  //All posts without main post
  const ALL_POSTS =
    postsReducer.posts.length > 0
      ? createAllPostsArray(postsReducer.posts)
      : [];
  function createAllPostsArray(posts_array) {
    const ALL_POSTS = [...posts_array];
    ALL_POSTS.pop();
    return ALL_POSTS;
  }

  //Text shortener function
  function truncateText(text, maxLength) {
    let shortenedText;
    if (text.length > maxLength) {
      shortenedText = text.substr(0, maxLength) + '...';
    } else {
      shortenedText = text;
    }
    return shortenedText;
  }

  function createHTMLElement(string) {
    return { __html: string };
  }

  return (
    <div className={styles.Posts}>
      {/*   /////////////////////////
            //      Main Post      //
            ///////////////////////// */}
      <main className={styles.Posts__main}>
        <div className={`${styles.Posts__mainContainer} container`}>
          <h3>Descubre tips y consejos para tu vida estudiantil</h3>

          {MAIN_POST.map((post) => (
            <div key={post.id} className={styles.MainPost}>
              <figure className={styles.MainPost__image}>
                <Image src={post.LargeImage} alt='Imagen de la publicación' />
              </figure>
              <h1>{post.Title}</h1>
              <p
                dangerouslySetInnerHTML={createHTMLElement(
                  truncateText(post.Content[0], 398)
                )}
              ></p>
              <button
                onClick={() => {
                  router.push(
                    {
                      pathname: `/blog/post/${post.id}`,
                      query: { id: post.id },
                    },
                    `/blog/post/${post.id}`
                  );
                }}
                className='btn button--redRedborderTransparent'
              >
                Leer más
              </button>
            </div>
          ))}
        </div>
      </main>

      {/*   /////////////////////////
            //     Posts Table     //
            ///////////////////////// */}
      <section className={`${styles.AllPosts} container`}>
        <h3>Últimos Posts</h3>
        <hr />

        <div className={styles.AllPostsGrid}>
          {/* Slice and reverse needed to map array from last to first, in order to show newest posts first */}
          {ALL_POSTS.slice(0)
            .reverse()
            .map((post) => (
              <div key={post.id} className={styles.post}>
                <figure>
                  <Image src={post.SmallImage} alt='Portada del post' />
                </figure>
                <h4>{post.Title}</h4>
                <p
                  dangerouslySetInnerHTML={createHTMLElement(
                    truncateText(post.Content[0], 170)
                  )}
                  className={styles.post__description}
                ></p>

                <button
                  onClick={() => {
                    router.push(
                      {
                        pathname: `/blog/post/${post.id}`,
                        query: { id: post.id },
                      },
                      `/blog/post/${post.id}`
                    );
                  }}
                  className='btn button--redRedborderTransparent'
                >
                  Leer más
                </button>

                <hr />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default PostsTable;
