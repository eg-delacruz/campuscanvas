import { useDispatch, useSelector } from 'react-redux';
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
import { getPosts, selectPosts } from '@redux/postsSlice';

const BlogPost = () => {
  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Reducers
  const postsReducer = useSelector(selectPosts);

  const router = useRouter();
  const {
    query: { id },
  } = router;

  if (postsReducer.posts.length === 0 || postsReducer.posts === undefined) {
    dispatch(getPosts());
  }

  const POST = postsReducer.posts.find((post) => {
    return post.id === id;
  });

  if (postsReducer.loading)
    return (
      <Layout>
        <div className={styles.loader_container}>
          <Loader />
        </div>
      </Layout>
    );

  if (postsReducer.error)
    return (
      <Layout>
        <ErrorDisplayer message={postsReducer.error} />
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

export default BlogPost;
