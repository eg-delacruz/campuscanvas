import React from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';

//Assets
import Blog_Logo from '@assets/GeneralUse/Logos/Blog_logo.svg';

//Styles
import styles from '@pagestyles/BlogPost.module.scss';

//Components
import PostTemplate from '@components/UsedInSpecificRoutes/Blog/PostTemplate/PostTemplate';
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ErrorDisplayer from '@components/GeneralUseComponents/ErrorDisplayer/ErrorDisplayer';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

//Redux actions
import * as postsActions from '../../../actions/postsActions';
const { getPosts } = postsActions;

const BlogPost = (props) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  if (props.posts.length === 0 || props.posts === undefined) {
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

  //Const used for SEO to define the author of the post in the description
  let Author = 'el equipo de Campus Canvas';
  if (POST) {
    Author =
      Object.keys(POST).length > 0 ? POST.Author : 'el equipo de Campus Canvas';
  }

  return (
    <>
      <SEOHeader
        tabTitle={'Post'}
        metaName={'Post'}
        description={`Post publicado por ${Author}`}
      />

      <Layout>
        <div className={styles.PostContainer}>
          <figure className={styles.Blog__logo}>
            <Image src={Blog_Logo} alt='Logo Campus Blog' />
          </figure>
          <PostTemplate {...POST} />
        </div>
      </Layout>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);
