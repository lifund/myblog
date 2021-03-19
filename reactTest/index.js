import React from "react"
import ReactDOMServer from "react-dom/server.js"
import App from "./src/App.js"

const renderedApp = ReactDOMServer.renderToString(App)
console.log(renderedApp);
