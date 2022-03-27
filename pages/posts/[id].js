import Head from "next/head";

import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

// Note: Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets. pages/posts/[...id].js matches /posts/a, but also /posts/a/b, /posts/a/b/c and so on.
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

// In this function, we need to return a list of possible values for id.
export async function getStaticPaths() {
  const paths = getAllPostIds(); // paths contains the array of known paths returned by getAllPostIds(), which include the params defined by pages/posts/[id].js
  return {
    paths,
    fallback: false, // any paths not returned by getStaticPaths will result in a 404 page. Other values are "blocking" or true. https://nextjs.org/docs/basic-features/data-fetching/overview#the-fallback-key-required
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
