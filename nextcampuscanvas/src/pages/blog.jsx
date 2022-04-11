import React from 'react';
import Image from 'next/image';

//Styles
import styles from '@pagestyles/BlogHome.module.scss';

//Assets
import Blog_title from '@assets/GeneralUse/Logos/Blog_logo.svg';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import PostsTable from '@components/UsedInSpecificRoutes/Blog/BlogTable/PostsTable';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

const BlogHome = () => {
  return (
    <>
      <SEOHeader
        tabTitle={'Blog'}
        metaName={'Blog'}
        description={'Blog dedicado a la vida estudiantil'}
      />

      <Layout>
        <ButtonUp />
        <div className={styles.Blog__container}>
          <figure className={styles.Blog__title}>
            <Image src={Blog_title} alt='Campus Blog' />
          </figure>

          <PostsTable />
        </div>
      </Layout>
    </>
  );
};

export default BlogHome;
