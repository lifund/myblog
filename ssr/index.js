import React from "react"
import ReactDOMServer from "react-dom/server.js"
import App from "./public/src/App.js"
console.log(App)
import path from "path"	
const __dirname = path.resolve(path.dirname(''));
import express from "express"
const app = express()
app.use('/public', express.static(path.join(__dirname, 'public')))
import fs from "fs"

const renderedApp = ReactDOMServer.renderToString(React.createElement(App))
console.log(renderedApp);

const renderedHTML = fs.readFileSync(
		path.join(__dirname, 'public/index.html'),
		'utf-8'
	).replace(
		"<div id='root'></div>",
		`<div id='root'>${renderedApp}</div>`
	)
console.log(renderedHTML)

app.get('/',(req,res)=>{
	res.send(renderedHTML);
})

app.listen(50505,()=>console.log('50505'))
