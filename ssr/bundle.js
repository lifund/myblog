// node
import fspackage from "fs";
const fs = fspackage.promises;
import path from "path";
// react
import ReactDOMServer from "react-dom/server.js";
import React from "react";
// helpers
import getFileName_recursive from "./helper/dist/getFileName_recursive.js";
import UglifyJS from "uglify-js";
import getLocalAddress from "./helper/dist/getLocalAddress.js";
// constants
const COMPONENT_PATH = path.join(path.resolve(),'src/components');
const INDEXHTML_PATH = path.join(path.resolve(),'src/index.html');
const INDEXCSS_PATH = path.join(path.resolve(),'src/index.css');
const ENTRYFILE_NAME = 'App.js'
const LOCAL_ADDRESS = process.argv[2];
const LOCAL_PORT = process.argv[3];
const SEARCH_PORT = '8080';
if(!LOCAL_ADDRESS){
    throw new Error('LOCAL_ADDRESS is not defined')
}

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
            classString+=fileContents.default.toString()
            .replace('$LOCAL_ADDRESS$',LOCAL_ADDRESS)
            .replace('$SEARCH_PORT$',SEARCH_PORT)
            .replace('$LOCAL_PORT$',LOCAL_PORT)+'\n';
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
                .replace(
                    '$LOCAL_ADDRESS$',
                    LOCAL_ADDRESS
                )
                .replace(
                    '$LOCAL_PORT$',
                    LOCAL_PORT
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