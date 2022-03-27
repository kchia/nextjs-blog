// req = HTTP incoming message, res = HTTP server response
// can be deployed as a lambda

// Good use cases for API routes: saving incoming data to a database, securely communicating with a third-party API, previewing draft content from CMS

// You should not fetch an API Route from getStaticProps or getStaticPaths, since these methods don't run on the client. Instead, write your server-side code directly in getStaticProps or getStaticPaths (or call a helper function).

// can be accessed at localhost:3000/api/hello
export default function handler(req, res) {
  // req is an instance of http.IncomingMessage, plus some pre-built middlewares.
  // res is an instance of http.ServerResponse, plus some helper functions.
  res.status(200).json({ text: "Hello" });
}
