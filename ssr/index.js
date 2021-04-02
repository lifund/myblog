// NEW THINGS
// - nodejs module cache busting (https://ar.al/2021/02/22/cache-busting-in-node.js-dynamic-esm-imports/)
// - react error boundary as component (https://reactjs.org/docs/error-boundaries.html)
// - typescript syntax (https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
// - websocket protocol (https://datatracker.ietf.org/doc/html/rfc6455#section-5.1) (https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#exchanging_data_frames)

// DEPENDENCY VERSIONS
// - node@14.16.0 (fs,path,es6 import)
// - npm@6.14.11
// - react@17.0.2 
// - react-dom@17.0.2
// - express@4.17.1 
// - uglify-js@3.13.2 
// - ws@7.4.4 (https://github.com/websockets/ws)
// - chokidar@3.5.1 (https://www.npmjs.com/package/chokidar)

// DEPENDENCIES
// node
import fspackage from "fs";
const fs = fspackage.promises;
import path from "path";
// express & webSocket
import Express from "express";
import WebSocket from 'ws';
// helpers
import chokidar from "chokidar";
import { exec } from 'child_process';
import util from 'util';
const execPromise = util.promisify(exec)
// CONSTANTS
const COMPONENT_PATH = path.join(path.resolve(),'src/components');
const PORT_EXPRESS = 50505;
const PORT_WEBSOCKET = 50506;
// require stack
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

/*========== bundle components/*(compress) and dehydrated index.html ==========*/
// declare global indexHTML & classString
var indexHTML;
var classString;
var appClass;
const bundleComponents = async () =>{
    // initiate indexHTML & classString 
    indexHTML = '';
    classString = '';
    const {stdout,stderr} = await execPromise(`node ${path.resolve('./bundle.js')}`)
    const result = JSON.parse(stdout.toString());
    indexHTML = result.indexHTML
    classString = result.classString
}
await bundleComponents();



/*========== EXPRESS SETTINGS ==========*/
const express = Express();
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
express.listen(PORT_EXPRESS,()=>{console.log('[myblog:ssr]',PORT_EXPRESS);})




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





    // [dev env]  

/*========== hot reload ==========*/
// client websocket script
const websocketClientScript = `
let pingpong;
let webSocket = new WebSocket('ws://localhost:${PORT_WEBSOCKET}')
webSocket.onopen = function() {
    console.log("websocket open")
    pingpong = setInterval(() => {
        webSocket.send('ping');
    }, 1000);
}
webSocket.onclose = function (evt) {
    console.log("websocket reconnection in 1sec...");
    clearInterval(pingpong);
    setTimeout(function(){
        window.location.href = window.location.href
    },500)
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
// websocket server
const wss = new WebSocket.Server({port:PORT_WEBSOCKET});
wss.on('connection', async (ws)=>{
    // ping pong
    ws.on('message',(message)=>{
        if(message==='ping'){
            ws.send('pong');
        }
        if(message==='reload'){
            wss.clients.forEach((client)=>{
                client.send('reload');
            })
        }
    });
}); 

// make directory watcher (on components/*)
const watcher = chokidar.watch(COMPONENT_PATH,{
    atomic: true
});

// websocket client : sends reload message on watch events
const ws = new WebSocket('http://localhost:50506')
watcher.on('change', async (ev)=>{
    // process.exit();
    // re-render components !! memory leaking !!
    await bundleComponents(COMPONENT_PATH);
    // memory check & reload script process itself on threshold (25mb)
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`memory usage : ${Math.round(used * 100) / 100} MB`);
    if(used>25) process.exit();
    // reload signal
    ws.send('reload');
})


    // [dev env]  
