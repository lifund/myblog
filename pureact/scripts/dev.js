// DEPENDENCIES
// node
import { promises as fs } from "fs";
import path from "path";
// express & websocket
import Express, { json } from "express";
import WebSocket from "ws";
// helpers
import getLocalAddress from "../helpers/getLocalAddress.js";
import { fork } from "child_process";
import chokdar from "chokidar";
// CONSTANTS
const PATH_SRC = path.join(path.resolve(),'src');
const PORT_EXPRESS = process.env.npm_package_config_dev_port_express;
const PORT_WEBSOCKET = process.env.npm_package_config_dev_port_websocket;


const express = Express();
// express.use('/public')

console.log(PATH_SRC);

// // websocket server
// let wssClient = [];
// const wss = new WebSocket.Server({port:PORT_WEBSOCKET});
// wss.on('connection', async (ws)=>{
//     // ping pong
//     wssClient.push(ws);
//     console.log('conn');
//     ws.on('message',(message)=>{
//         if(message==='ping'){
//             ws.send('pong');
//         }
//         if(message==='reload'){
//             wss.clients.forEach((client)=>{
//                 client.send('reload');
//             })
//         }
//     });
// }); 