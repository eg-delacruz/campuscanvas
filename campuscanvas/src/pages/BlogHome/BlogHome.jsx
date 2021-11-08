import React from 'react';

//Styles
import './BlogHome.scoped.scss';

//Assets
import Blog_title from '../../assets/static/Blog_logo.svg';

//Components
import Layout from '../../components/Layout/Layout';
import HelmetLayout from '../../components/HelmetLayout/HelmetLayout';
import PostsTable from '../../components/BlogTable/PostsTable';

const BlogHome = () => {
  return (
    <Layout>
      <HelmetLayout
        title='Blog'
        subtitle='Blog dedicado a la vida estudiantil'
      />
      <div className='Blog__container'>
        <figure className='Blog__title'>
          <img src={Blog_title} alt='Campus Blog' />
        </figure>

        <PostsTable />
      </div>
    </Layout>
  );
};

export default BlogHome;
