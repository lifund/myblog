const articleCards = [
    {
        id:'19kw39d2',
        featured: true,
        title: 'Building simple markdown editor with vanilla js utilizing shadow DOM.',
        date: '2021.03.26',
        tags: ['t1a221343','t1b2021.03.26','t1b2021.03.26','t2bs']
    },
    {
        id:'sasjhdfi',
        featured: true,
        title: 'Building simple markdown editor with vanilla js utilizing shadow DOM. Building simp asdf',
        date: '2021.03.26',
        tags: ['t2aasdf','t2bs','t2bs']
    },
    {
        id:'20dj39di',
        featured: false,
        title: 'Building simple markdown editor with vanilla js utilizing shadow DOM.',
        date: '2021.03.26',
        tags: ['tsdf3a','t3basdfe']
    },
    {
        id:'10djc83j',
        featured: false,
        title: 'Building simple markdown editor with vanilla js utilizing shadow DOM.',
        date: '2021.03.26',
        tags: ['tasdf4a','t4web']
    },
    {
        id:'30sl39dd',
        featured: false,
        title: 'Building simple markdown editor with vanilla js utilizing shadow DOM. Building simple markdown editor with vanilla js utilizing shadow DOM.',
        date: '2021.03.26',
        tags: ['t5as','t5feab']
    },
    {
        id:'30sl38cj',
        featured: false,
        title: 'Building simple markdown editor with vanilla js utilizing shadow DOM.',
        date: '2021.03.26',
        tags: ['t6asdfa','tasdf6b']
    }
]

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
import Express, { json } from "express";
import WebSocket from 'ws';
// helpers
import chokidar from "chokidar";
import { fork } from 'child_process';
import util from 'util';
import getLocalAddress from "./helper/dist/getLocalAddress.js";
// CONSTANTS
const WATCH_PATH = path.join(path.resolve(),'src');
const PORT_EXPRESS = 50505;
const PORT_WEBSOCKET = 50506;
const LOCAL_ADDRESS = getLocalAddress()[0];




/*========== bundle components/*(compress) and dehydrated index.html ==========*/
// declare global indexHTML & classString
var indexHTML;
var classString;
const bundleComponents = async (ACTIVE_PATH='',ACTIVE_QUERY='',ACTIVE_TITLE='',STATE_REPLACEMENTS={}) =>{
    console.log(ACTIVE_PATH,ACTIVE_QUERY,ACTIVE_TITLE);
    // initiate indexHTML & classString 
    let resultString = '';
    indexHTML = '';
    classString = '';
    const childProcess = fork(path.resolve('./bundle.js'),
    [
        LOCAL_ADDRESS,
        PORT_EXPRESS,
        ACTIVE_PATH,
        ACTIVE_QUERY,
        ACTIVE_TITLE,
        JSON.stringify(STATE_REPLACEMENTS)
    ]);
    childProcess.on('message',(msg)=>{
        resultString += msg;
    })
    childProcess.send()
    await childProcess.once('close',()=>{       
        indexHTML = resultString.split('_SEPARATOR_')[0];
        classString = resultString.split('_SEPARATOR_')[1];
    })


}


/*========== EXPRESS SETTINGS ==========*/
const express = Express();
express.use('/public',Express.static(path.join(path.resolve(),'public')));

/*========== EXPRESS PATHS ==========*/
// send initial redirect
express.get('/',(req,res)=>{
    // DEV_ENV
    res.status(101);
    res.setHeader('Upgrade','websocket');
    res.setHeader('Connection','Upgrade');
    // DEV_ENV
    res.redirect('/about')
});
// send dehydrated index.js
express.get('/about',async (req,res)=>{
    // bundle.js
    await bundleComponents('/about', '', 'About');
    res.send(indexHTML)
});
express.get('/techblog',async (req,res)=>{

    await bundleComponents(
        '/techblog', 
        '?asdf=asdf', 
        'Techblog', 
        {
            "_FEATURED_CARD_CONTENTS_"
            :
            articleCards.filter((card)=>{
                if(card.featured===true){
                    return card
                }
            })
        }
    );
    res.send(indexHTML)
});
express.get('/portfolio',async (req,res)=>{
    await bundleComponents('/portfolio', '', 'Portfolio');
    res.send(indexHTML)
});
express.get('/shop',async (req,res)=>{
    await bundleComponents('/shop', '', 'Shop');
    res.send(indexHTML)
});
express.get('/search',async (req,res)=>{
    await bundleComponents('/search', '', 'Search');
    res.send(indexHTML)
});
express.get('/article',async (req,res)=>{
    await bundleComponents('/article', '', 'Article');
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

express.get('/articleAPI',(req,res)=>{
    console.log('featured: '+req.query.featured);
    console.log('tag: '+req.query.tag);
    console.log('keyword: '+req.query.keyword);
    res.setHeader('Content-Type','application/json');
    if(req.query.featured==='true'){
        res.send(JSON.stringify(
        {
            card_data : articleCards.filter((card)=>{
                if(card.featured===true) return card
            })
        }));
    }
    if(req.query.featured==='false'||!req.query.featured){
        res.send(JSON.stringify(
        {
            card_data : articleCards
        }));
    }
});

// portfolio
const portfolioCards = [
    {
        id:'19kw39d2',
        featured: true,
        thumbnail: 'd22jed89',
        title: 'CODIO',
        description: 'portfolioCards',
        date: '2019',
        tags: ['t1a221343','t1b2021.03.26','t1b2021.03.26','t2bs']
    },
    {
        id:'19kw39d2',
        featured: true,
        thumbnail: 'd22jed89',
        title: 'CODIO',
        description: 'portfolioCards',
        date: '2019',
        tags: ['t1a221343','t1b2021.03.26','t1b2021.03.26','t2bs']
    },
    {
        id:'19kw39d2',
        featured: false,
        thumbnail: 'd22jed89',
        title: 'CODIO',
        description: 'portfolioCards',
        date: '2019',
        tags: ['t1a221343','t1b2021.03.26','t1b2021.03.26','t2bs']
    },
    {
        id:'19kw39d2',
        featured: false,
        thumbnail: 'd22jed89',
        title: 'CODIO',
        description: 'portfolioCards',
        date: '2019',
        tags: ['t1a221343','t1b2021.03.26','t1b2021.03.26','t2bs']
    },
    {
        id:'19kw39d2',
        featured: false,
        thumbnail: 'd22jed89',
        title: 'CODIO',
        description: 'portfolioCards',
        date: '2019',
        tags: ['t1a221343','t1b2021.03.26','t1b2021.03.26','t2bs']
    },
    {
        id:'19kw39d2',
        featured: false,
        thumbnail: 'd22jed89',
        title: 'CODIO',
        description: 'portfolioCards',
        date: '2019',
        tags: ['t1a221343','t1b2021.03.26','t1b2021.03.26','t2bs']
    },
]
express.get('/portfolioAPI',(req,res)=>{
    console.log('featured: '+req.query.featured);
    console.log('tag: '+req.query.tag);
    console.log('keyword: '+req.query.keyword);
    if(req.query.featured==='true'){
        res.send(JSON.stringify(
        {
            card_data : portfolioCards.filter((card)=>{
                if(card.featured===true) return card
            })
        }));
    }
    if(req.query.featured==='false'||!req.query.featured){
        res.send(JSON.stringify(
        {
            card_data : portfolioCards
        }));
    }
});
    

express.get('/shopAPI',(req,res)=>{
    console.log('best: '+req.query.best);
    console.log('tag: '+req.query.tag);
    console.log('keyword: '+req.query.keyword);
});




/*========== hot reload ==========*/
// client websocket script
const websocketClientScript = `
let pingpong;
let webSocket = new WebSocket('ws://${LOCAL_ADDRESS}:${PORT_WEBSOCKET}')
webSocket.onopen = function() {
    console.log("websocket open")
    pingpong = setInterval(() => {
        webSocket.send('ping');
    }, 1000);
}
webSocket.onclose = function (evt) {
    console.log("websocket reconnection in 1sec...");
    clearInterval(pingpong);
    setInterval(function(){
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
    console.log("websocket reconnection in 1sec...");
    clearInterval(pingpong);
    setInterval(function(){
        window.location.href = window.location.href
    },1000)
};
`
// websocket server
let wssClient = [];
const wss = new WebSocket.Server({port:PORT_WEBSOCKET});
wss.on('connection', async (ws)=>{
    // ping pong
    wssClient.push(ws);
    console.log('conn');
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

// watcher (on components/*)
const watcher = chokidar.watch(WATCH_PATH,{
    atomic: true
});

// websocket client : sends reload message on watch events
const ws = new WebSocket('http://localhost:'+PORT_WEBSOCKET)

// on watcher event
watcher.on('change', async (ev)=>{
    // memory check
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`memory usage : ${Math.round(used * 100) / 100} MB`);
    // reload signal
    ws.send('reload');
})
