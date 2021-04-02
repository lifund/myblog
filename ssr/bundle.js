// node
import fspackage from "fs";
const fs = fspackage.promises;
import path from "path";

import ReactDOMServer from "react-dom/server.js";
import React from "react";
import getFileName_recursive from "./helper/dist/getFileName_recursive.js";
import UglifyJS from "uglify-js";
const COMPONENT_PATH = path.join(path.resolve(),'src/components');
const INDEXHTML_PATH = path.join(path.resolve(),'src/index.html');
const ENTRYFILE_NAME = 'App.js'

const bundle = async () =>{
    // initiate indexHTML & classString
    let indexHTML = '';
    let classString = '';
    let appClass = null;
    // get file paths
    const fileNameArr = await getFileName_recursive(COMPONENT_PATH,'.js');
    // loop over file paths
    for await (const fileName of fileNameArr) {
        // if app.js, get index.html
        if(path.basename(fileName)===ENTRYFILE_NAME){
            indexHTML = await fs.readFile(INDEXHTML_PATH,'utf-8')
        }
        // !! memory will leak !!
        const cacheBustingModulePath = `${fileName}?update=${Date.now()}`
        await import(cacheBustingModulePath)
        .then((fileContents)=>{
            // bundle Component Classes
            classString+=fileContents.default.toString()+'\n';
            // render index.html
            if(path.basename(fileName)===ENTRYFILE_NAME){
                appClass = fileContents.default
                indexHTML=indexHTML.replace(
                    '<div id="root"></div>',
                    `<div id="root">${      
                        ReactDOMServer.renderToString(
                            React.createElement(fileContents.default)
                        )    
                    }</div>`
                )
            }    
        })
    }
    classString = UglifyJS.minify(classString+'export default App').code

    console.log(JSON.stringify({indexHTML:indexHTML,classString:classString}))
    return
}
bundle();