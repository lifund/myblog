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
const INDEXCSS_PATH = path.join(path.resolve(),'src/index.css');
const ENTRYFILE_NAME = 'App.js'

const bundle = async () =>{

    // initiate indexHTML & classString
    let indexHTML = '';
    let indexCSS = '';
    let classString = '';
    let appClass = null;
    
    // get file paths
    const fileNameArr = await getFileName_recursive(COMPONENT_PATH,'.js');
    
    // loop over file paths
    for await (const fileName of fileNameArr) {
    
        // if app.js, get index.html
        if(path.basename(fileName)===ENTRYFILE_NAME){
            indexHTML = await fs.readFile(INDEXHTML_PATH,'utf-8');
            indexCSS = await fs.readFile(INDEXCSS_PATH,'utf-8');
        }
        await import(fileName)
        .then((fileContents)=>{
            // class-string
            classString+=fileContents.default.toString()+'\n';
            // if app.js, bundle index.html with rendered dehydrated-string
            if(path.basename(fileName)===ENTRYFILE_NAME){
                appClass = fileContents.default
                indexHTML=indexHTML
                .replace(
                    '<div id="root"></div>',
                    `<div id="root">${      
                        ReactDOMServer.renderToString(
                            React.createElement(fileContents.default)
                        )    
                    }</div>`
                )
                .replace(
                    '<!--STYLESHEET-->',
                    `<style>
                    ${indexCSS}
                    </style>`
                )
            }    
        })
    }
    // minify class-string
    classString = UglifyJS.minify(classString+'export default App').code
    // stdout
    const result = indexHTML+'_SEPARATOR_'+classString;
    console.log(result);
    return 
}
bundle();