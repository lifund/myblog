import React from "react"
import ReactDOM from "react-dom"
import ReactDOMServer from "react-dom/server.js"
import { JSDOM } from "jsdom"
const window = new JSDOM(`<!DOCTYPE html><div id="root"></div>`).window;
const document = window.document;


const e = React.createElement;
const Header = e('header',{key:1},'this is header');
const Footer = e('footer',{key:2},'this is footer');

class App extends React.Component {
    render() {
        return e('div', {className:'root'},[
            Header,
            Footer
        ]);
    }
}


const renderedApp = ReactDOMServer.renderToString(new App().render())
console.log(renderedApp);
