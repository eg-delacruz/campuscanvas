import React from 'react';
import { connect } from 'react-redux';

//Assets
import Blog_Logo from '../../assets/static/GeneralUse/Logos/Blog_logo.svg';

//Styles
import './BlogPost.scoped.scss';

//Components
import PostTemplate from '../../components/UsedInSpecificRoutes/Blog/PostTemplate/PostTemplate';
import Layout from '../../components/GeneralUseComponents/Layout/Layout';
import HelmetLayout from '../../components/GeneralUseComponents/HelmetLayout/HelmetLayout';
import Loader from '../../components/GeneralUseComponents/Loader/Loader';
import ErrorDisplayer from '../../components/GeneralUseComponents/ErrorDisplayer/ErrorDisplayer';

//Redux actions
import * as postsActions from '../../actions/postsActions';
const { getPosts } = postsActions;

const BlogPost = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  if (props.posts.length === 0) {
    props.getPosts();
  }

  const POST = props.posts.find((post) => {
    return post.id === id;
  });

  if (props.loading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  if (props.error)
    return (
      <Layout>
        <ErrorDisplayer message={props.error} />
      </Layout>
    );

  //Const used in ReactHelmet for SEO to define the author of the post in the description
  let Author = 'el equipo de Campus Canvas';
  if (POST) {
    Author =
      Object.keys(POST).length > 0 ? POST.Author : 'el equipo de Campus Canvas';
  }

  return (
    <Layout>
      <HelmetLayout title='Post' subtitle={`Post publicado por ${Author}`} />
      <div className='PostContainer'>
        <figure className='Blog__logo'>
          <img src={Blog_Logo} alt='Logo Campus Blog' />
        </figure>
        <PostTemplate {...POST} />
      </div>
    </Layout>
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
)(BlogPost);
