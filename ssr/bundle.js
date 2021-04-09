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
// constants-PATH
const COMPONENT_PATH = path.join(path.resolve(),'src/components');
const ENTRYFILE_PATH = path.join(path.resolve(),'src/components/App.js');
const INDEXHTML_PATH = path.join(path.resolve(),'src/index.html');
const INDEXCSS_PATH = path.join(path.resolve(),'src/index.css');
const STYLE_PATH = path.join(path.resolve(),'src/styles');
// constants-DEV-HOTRELOAD-URL
const LOCAL_ADDRESS = process.argv[2];
const LOCAL_PORT = process.argv[3];
const ACTIVE_PATH = process.argv[4];
const ACTIVE_QUERY = process.argv[5];
const ACTIVE_TITLE = process.argv[6];
const STATE_REPLACEMENTS = JSON.parse(process.argv[7]);
// console.error( JSON.stringify(STATE_REPLACEMENTS._FEATURED_CARD_CONTENTS_));
if(!LOCAL_ADDRESS){ '192.168.0.2' }
if(!LOCAL_PORT){ '50505' }
// constants-PRODUCTION-URL
const SEARCH_PORT = '8080';
const PUBLIC_ADDRESS = '';




const bundle = async () =>{

    // initiate strings
    let indexHTML = '';
    let classString = '';
    let styleString = '';


    // get index.html
    indexHTML = await fs.readFile(INDEXHTML_PATH,'utf-8');
    
    
    // css entry
    styleString += await fs.readFile(INDEXCSS_PATH,'utf-8');
    // css directory 
    const stylePathArr = await getFileName_recursive(STYLE_PATH,'.css');
    for await (const stylePath of stylePathArr) {
        styleString += await fs.readFile(stylePath,'utf-8');
    }

    // bundle COMPONENT CLASS and replace
    const componentPathArr = await getFileName_recursive(COMPONENT_PATH,'.js');
    for await (const componentPath of componentPathArr) {
        await import(componentPath)
        .then((fileContents)=>{
            classString+=fileContents.default.toString()
            .replace(new RegExp("_LOCAL_ADDRESS_", "g"),LOCAL_ADDRESS)
            .replace(new RegExp("_LOCAL_PORT_", "g"),LOCAL_PORT)
            +'\n';
        });
    }


    const bundledClassFile =  path.join(path.resolve(),'bunldedClass.js')
    await fs.writeFile(
        bundledClassFile,
        'import React from "react"\n'+classString+'export default App',
        'utf-8'
    );

    
    await import(bundledClassFile)
    .then((bundledImport)=>{
        // let appElement = React.createElement(appString.default)
        indexHTML=indexHTML
        .replace(
            '<div id="root"></div>',
            `<div id="root">${
                ReactDOMServer.renderToString(
                    React.createElement(
                        bundledImport.default,
                        {ssrProps:'ssrProp'}
                    )
                )
            }</div>`)
        .replace('<!--STYLESHEET-->',`<style>${styleString}</style>`)
        .replace(new RegExp("_LOCAL_ADDRESS_", "g"),LOCAL_ADDRESS)
        .replace(new RegExp("_LOCAL_PORT_", "g"),LOCAL_PORT)            
        .replace(new RegExp("_ACTIVE_TITLE_","g"),ACTIVE_TITLE)
    })
    await fs.rm(bundledClassFile);

    // minify class-string
    classString = UglifyJS.minify(classString+'\nexport default App').code
    // stdout
    const result = indexHTML+'_SEPARATOR_'+classString;
    console.log();
    return result
    
    
    
    // console.log(result);

    // function nodebtoa(str) {
    //     var buffer;
    //     if (str instanceof Buffer) {
    //         buffer = str;
    //     } else {
    //         buffer = Buffer.from(str.toString(), 'binary');
    //     }
    //     return buffer.toString('base64');
    // }
    // let b64moduleData = 'data:text/javascript;base64,'



}
bundle(); 