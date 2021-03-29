// DEPENDENCY VERSIONS
// - node@14.16.0 (fs,path,es6 import)
// - npm@6.14.11
// - react@17.0.2 
// - react-dom@17.0.2
// - express@4.17.1 
// - uglify-js@3.13.2
// node
import fspackage from "fs"
const fs = fspackage.promises;
import path from "path"
// react
import ReactDOMServer from "react-dom/server.js";
import React from "react";
// express
import Express from "express";
import UglifyJS from "uglify-js";
// CONSTANTS
const COMPONENT_PATH = path.join(path.resolve(),'public/components');
// helpers
import getDirName_recursive from "./helper/dist/getDirName_recursive.js"
import getFileName_recursive from "./helper/dist/getFileName_recursive.js"
import addSuffixToFileName from "./helper/dist/addSuffixToFileName.js"



/*========== bundle index.js ==========*/
const bundleIndexJS = async () =>{

}
const bundleSSR = async () => {
    let componentClassStringBundle = '';
    let dehydratedString = '';
    const componentPathArr = getFileName_recursive(COMPONENT_PATH,'.js');
    // get index.html
    fs.readFile(path.join(path.resolve(),'public/index.html'),'utf-8',(err,indexHTML)=>{
        for(let i=0; i<componentPathArr.length; i++){
            // make symlink of a Component file
            fs.symlink(componentPathArr[i],addSuffixToFileName(componentPathArr[i],'_symlink'),(err)=>{
                // import defult module from a Component file's symlink
                import(addSuffixToFileName(componentPathArr[i],'_symlink'))
                .then((file)=>{
                    // destroy symlink
                    fs.unlink(addSuffixToFileName(componentPathArr[i],'_symlink'),(err)=>{
                        // with App.js, make index.html
                        if(path.basename(componentPathArr[i])==='App.js'){
                            const renderedApp = ReactDOMServer.renderToString(React.createElement(file.default))
                            dehydratedString = indexHTML.replace('<div id="root"></div>',`<div id="root">${renderedApp}</div>`)
                        }
                        // with <any>.js, stringify class and concat
                        if(file.default){
                            componentClassStringBundle += file.default.toString() + '\n';
                        } 
                        // once all files bundled, resolve promise
                        if(i==componentPathArr.length-1) {
                            resolve({
                                dehydratedString: dehydratedString,
                                // compress js
                                componentClassStringBundle: UglifyJS.minify(componentClassStringBundle+'\nexport default App').code
                            })
                        }   
                    });
                })
            })
        }
    });
}
/*========== bundle components/* ==========*/
const bundleComponents = async () =>{

}
// ready indexHTML & classString
var indexHTML = '';
var classString = '';
// bundleSSR().then((result)=>{
//     indexHTML = result.dehydratedString;
//     classString = result.componentClassStringBundle;
// })



/*========== EXPRESS SETTINGS ==========*/
const express = Express();
const PORT = 50505;
express.use('/public',Express.static(path.join(path.resolve(),'public')))


/*========== EXPRESS PATHS ==========*/
// send initial redirect
express.get('/',(req,res)=>{
    // DEV_ENV
    res.status(101);
    res.setHeader('Upgrade','websocket');
    res.setHeader('Connection','Upgrade');
    // DEV_ENV
    res.redirect('/techblog')
});
// send dehydrated index.js
express.get('/techblog',async (req,res)=>{
    res.send(indexHTML)
});
// send bundled App.js
express.get('/app',async (req,res)=>{
    res.setHeader('Content-Type','application/javascript');
    res.send(classString+websocketClientScript);
});

express.listen(PORT,()=>{console.log('[myblog:ssr] listening local',PORT);})




/*========== API ==========*/
// article
express.get('/article',(req,res)=>{
    if(req.query.featured==='true'){
        res.setHeader('Content-Type','application/json')
        res.send({
            card_data : [
                {
                    title: 't1',
                    date: 'd1',
                    tags: ['t1a','t1b']
                },
                {
                    title: 't2',
                    date: 'd2',
                    tags: ['t2a','t2b']
                }
            ]
        })
    }
    else{
        res.status(404)
        res.send('Page Not Found')
    }
});






/*========== hot reload ==========*/
// client websocket script
const websocketClientScript = `
let pingpong;
let webSocket = new WebSocket('ws://localhost:50506')
webSocket.onopen = function() {
    console.log("websocket open")
    pingpong = setInterval(() => {
        webSocket.send('ping');
    }, 1000);
}
webSocket.onclose = function (evt) {
    console.log("websocket close, reloading in 1sec...");
    clearInterval(pingpong);
    setTimeout(function(){
        window.location.href = window.location.href
    },1000)
};
webSocket.onmessage = function (evt) {
    if(evt.data=='reload'){
        console.log('reload signal!')
        window.location.href = window.location.href
    }
};
webSocket.onerror = function (evt) {
    console.log(evt);
    clearInterval(pingpong);
};
`
// server websocket
import WebSocket from 'ws';
const wss = new WebSocket.Server({port:50506});
wss.on('connection', (ws)=>{
    // ping pong
    ws.on('message',(message)=>{
        if(message==='ping'){
            ws.send('pong');
        }
    });
    // get directories
    const dirNameArr = getDirName_recursive(COMPONENT_PATH);
    var watcherArr = [];
    dirNameArr.forEach((dirName)=>{
        watcherArr.push(fs.watch(dirName));
    });
    // emit webSocket message on watcher event
    watcherArr.forEach((watcher)=>{
        watcher.on('change', async (ev)=>{
            console.log(ev);
        });
    });
}); 
