import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';

//Styles
import styles from './PostsTable.module.scss';

//Assets

//Components
import Loader from '@components/GeneralUseComponents/Loader/Loader.jsx';
import ErrorDisplayer from '@components/GeneralUseComponents/ErrorDisplayer/ErrorDisplayer';

//Redux actions
import * as postsActions from '../../../../actions/postsActions';
const { getPosts } = postsActions;

const PostsTable = (props) => {
  //To send the id of the post to the post page
  const router = useRouter();

  if (props.posts.length === 0) {
    props.getPosts();
  }
  if (props.loading) return <Loader />;
  if (props.error) return <ErrorDisplayer message={props.error} />;

  //Main post = last post in array
  const MAIN_POST =
    props.posts.length > 0 ? [props.posts[props.posts.length - 1]] : [];

  //All posts without main post
  const ALL_POSTS =
    props.posts.length > 0 ? createAllPostsArray(props.posts) : [];
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

  return (
    <div className={styles.Posts}>
      {/*   /////////////////////////
            //      Main Post      //
            ///////////////////////// */}
      <main className={styles.Posts__main}>
        <div className={`${styles.Posts__mainContainer} container`}>
          <h3>Descubre tips y consejos para tu vida estudiantil aquí</h3>

          {MAIN_POST.map((post) => (
            <div key={post.id} className={styles.MainPost}>
              <figure className={styles.MainPost__image}>
                <Image src={post.LargeImage} alt='Imagen de la publicación' />
              </figure>
              <h1>{post.Title}</h1>
              <p>{truncateText(post.Content[0], 398)}</p>
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
          {ALL_POSTS.map((post) => (
            <div key={post.id} className={styles.post}>
              <figure>
                <Image src={post.SmallImage} alt='Portada del post' />
              </figure>
              <h4>{post.Title}</h4>
              <p className={styles.post__description}>
                {truncateText(post.Content[0], 170)}
              </p>

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

//Map state to props
const mapStateToProps = (reducers) => {
  return reducers.postsReducer;
};

//Map actions to props
const mapDispatchToProps = {
  getPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsTable);
