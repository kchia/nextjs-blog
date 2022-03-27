import Head from "next/head";
import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

// Next.js does code splitting automatically, so each page only loads what’s necessary for that page.
// That means when the homepage is rendered, the code for other pages is not served initially.
// If a certain page throws an error, the rest of the application would still work.

// Pre-rendering: Pre-rendered HTML displayed + JS hydration
// By default, Next.js pre-renders every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.

// Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive (hydration).

// For each page, Next.js offers pre-rendering via static generation or server-side rendering.

// Static Generation is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request (and can be cached and served by a CDN). Used for marketing pages, blog posts, e-commerece product listings, help and documentation

// Server-side Rendering is the pre-rendering method that generates the HTML on each request. Used for dynamic pages that show frequently updated data, and page content that changes on every request. Slower than static generation but ensures up-to-date data.

// If you have private, user-specific pages where SEO is not important (e.g., dashboard), you can use client-side rendering, statically generate parts of the page that do not require external data, and then populate the remaining parts on the client side using external data.

// Static generation with data using `getStaticProps`. When you export a page component, you can also export an async function called getStaticProps.
// getStaticProps runs at build time in production on the server side only
// can only be exported from a page
export async function getStaticProps() {
  // Inside the function, you can fetch external data and send it as props to the page.
  const allPostsData = getSortedPostsData(); // can fetch data from the file system, external API, or even directly from the database
  return {
    props: {
      allPostsData,
    },
  };
}

// for server-side rendering
// called at request time
// TTFB slower than getStaticProps because the server must compute the request on every request and result cannot be cached by CDN (extra config needed)
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     }
//   }
// }
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
