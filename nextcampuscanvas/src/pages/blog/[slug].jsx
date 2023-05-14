import { useRouter } from "next/router";

//Styles
import styles from "@pagestyles/Blog/BlogPost.module.scss";

//Components
import PostTemplate from "@components/UsedInSpecificRoutes/Blog/PostTemplate/PostTemplate";
import Layout from "@components/GeneralUseComponents/Layout/Layout";
import SEOHeader from "@components/GeneralUseComponents/SEO_Header/SEOHeader";

//Services
import dateFormat from "@services/dateFormat";

//Contentful client
import { contentful_client } from "@services/contentful/client";

//TODO: Erase post assets when everything comes from Contentful (and has been tested in production)
const BlogPost = ({ post }) => {
  const router = useRouter();

  return (
    <>
      {router.isFallback ? (
        //TODO: Create a loading skeleton component
        <h1>Loading...</h1>
      ) : (
        <>
          {" "}
          <SEOHeader
            tabTitle={"Post"}
            metaName={"Post"}
            description={post?.fields?.titulo}
          />
          <Layout>
            <div className={styles.PostContainer}>
              <PostTemplate
                Author={post?.fields?.autor.fields.autor}
                AuthorURL={
                  post?.fields?.autor.fields.authorUrl.content[0].content[1]
                    .data.uri
                }
                Content={post?.fields?.contenido}
                Title={post?.fields?.titulo}
                LargeImage={`https:${post?.fields?.imagenDePortada?.fields?.file?.url}`}
                SmallImage={`https:${post?.fields?.imagenMiniatura?.fields?.file?.url}`}
                PubDate={dateFormat.SlashDate(
                  new Date(post?.fields?.fechaDePublicacin)
                )}
              />
            </div>
          </Layout>
        </>
      )}
    </>
  );
};

export async function getStaticProps({ params }) {
  //Optional chaining, since params.slug can be undefined
  const slug = params?.slug;

  //We need the slug to be a string
  if (typeof slug !== "string") {
    return {
      notFound: true,
    };
  }

  const response = await contentful_client.getEntries({
    content_type: "post",
    //We get the post that matches the slug
    "fields.slug": slug,
  });

  if (!response?.items?.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: response?.items[0],
    },
  };
}

export async function getStaticPaths() {
  const response = await contentful_client.getEntries({
    content_type: "post",
  });

  const paths = response.items.map((item) => {
    return {
      params: {
        slug: item.fields.slug,
      },
    };
  });

  return {
    paths,
    // true | false | blocking
    // true: Si no fue pre-renderizado en getStaticPaths, lo renderiza en el client, con lo cual podemos mostrar un estado de carga en el cliente con router.isFallback (lo cual vendría siendo como un estado de cargando)
    // false: Si no fue pre-renderizado en getStaticPaths, muestra un 404
    // blocking: Si no fue pre-renderizado en getStaticPaths, renderiza en el server
    fallback: true,
  };
}

export default BlogPost;
