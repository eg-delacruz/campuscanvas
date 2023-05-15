import Image from "next/image";

//Styles
import styles from "@pagestyles/Blog/BlogHome.module.scss";

//Assets
import Blog_title from "@assets/GeneralUse/Logos/Blog_logo.svg";

//Components
import Layout from "@components/GeneralUseComponents/Layout/Layout";
import PostsTable from "@components/UsedInSpecificRoutes/Blog/BlogTable/PostsTable";
import ButtonUp from "@components/GeneralUseComponents/ButtonUp/ButtonUp";
import SEOHeader from "@components/GeneralUseComponents/SEO_Header/SEOHeader";

//Contentful client
import { contentful_client } from "@services/contentful/client";

//TODO: quitar el revalidate time
const BlogHome = ({ posts }) => {
  if (posts) {
    return (
      <>
        <SEOHeader
          tabTitle={"Blog"}
          metaName={"Blog"}
          description={"Blog dedicado a la vida estudiantil"}
        />

        <Layout>
          <ButtonUp />
          <div className={styles.Blog__container}>
            <figure className={styles.Blog__title}>
              <Image src={Blog_title} alt="Campus Blog" />
            </figure>

            <PostsTable posts={posts} />
          </div>
        </Layout>
      </>
    );
  }
};

export async function getStaticProps() {
  const response = await contentful_client.getEntries({
    content_type: "post",
  });

  return {
    props: {
      posts: response.items,
    },
    revalidate: 60,
  };
}

export default BlogHome;
