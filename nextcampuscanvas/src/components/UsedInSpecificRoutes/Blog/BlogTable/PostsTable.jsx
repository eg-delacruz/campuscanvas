import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//Styles
import './PostsTable.scoped.scss';

//Assets

//Components
import Loader from '../../../GeneralUseComponents/Loader/Loader.jsx';
import ErrorDisplayer from '../../../../components/GeneralUseComponents/ErrorDisplayer/ErrorDisplayer';

//Redux actions
import * as postsActions from '../../../../actions/postsActions';
const { getPosts } = postsActions;

const PostsTable = (props) => {
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
    <div className='Posts'>
      {/*   /////////////////////////
            //      Main Post      //
            ///////////////////////// */}
      <main className='Posts__main'>
        <div className='Posts__mainContainer container'>
          <h3>Descubre tips y consejos para tu vida estudiantil aquí</h3>

          {MAIN_POST.map((post) => (
            <div key={post.id} className='MainPost'>
              <figure className='MainPost__image'>
                <img src={post.SmallImage} alt='Imagen de la publicación' />
              </figure>
              <h1>{post.Title}</h1>
              <p>{truncateText(post.Content[0], 350)}</p>
              <Link
                to={`blog/post/${post.id}`}
                className='btn button--redRedborderTransparent'
              >
                Leer más
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/*   /////////////////////////
            //     Posts Table     //
            ///////////////////////// */}
      <section className='AllPosts container'>
        <h3>Últimos Posts</h3>
        <hr />

        <div className='AllPostsGrid'>
          {ALL_POSTS.map((post) => (
            <div key={post.id} className='post'>
              <figure>
                <img src={post.SmallImage} alt='Portada del post' />
              </figure>
              <h4>{post.Title}</h4>
              <p className='post__description'>
                {truncateText(post.Content[0], 170)}
              </p>
              <Link
                to={`blog/post/${post.id}`}
                className='btn button--redRedborderTransparent'
              >
                Leer más
              </Link>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsTable);
