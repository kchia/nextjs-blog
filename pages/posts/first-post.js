import Link from "next/link"; // In a production build of Next.js, whenever Link components appear in the browser’s viewport, Next.js automatically prefetches the code for the linked page in the background. By the time you click the link, the code for the destination page will already be loaded in the background, and the page transition will be near-instant!

import Head from "next/head";
import Script from "next/script"; // next/script is an extension of the HTML <script> element and optimizes when additional scripts are fetched and executed.

import Layout from "../../components/layout";

// Since the page below does not require fetching data, it will be automatically statically generated when the app is built for production
export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload" // load script lazily during browser idle time
        onLoad={() =>
          // run after script has finished loading
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}
