import "../styles/global.css"; // CSS to be loaded by every page

// Top-level component which will be common across all the different pages. Only import global CSS files here
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
