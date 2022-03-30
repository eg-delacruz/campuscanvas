import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

//Styles
import styles from '@pagestyles/BlogHome.module.scss';

//Assets
import Blog_title from '@assets/GeneralUse/Logos/Blog_logo.svg';

//Components
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import PostsTable from '@components/UsedInSpecificRoutes/Blog/BlogTable/PostsTable';
import ButtonUp from '@components/GeneralUseComponents/ButtonUp/ButtonUp';

const BlogHome = () => {
  return (
    <>
      <Head>
        <title>Blog | Campus Canvas</title>
        <meta name='Blog' content='Blog dedicado a la vida estudiantil' />
        {/* Prevents horizontal scroll due to animations on phone */}
        <meta
          name='viewport'
          content='width=device-width, height=device-height, initial-scale=1.0'
        />
      </Head>

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
