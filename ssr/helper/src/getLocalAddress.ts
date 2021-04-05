

import { networkInterfaces } from 'os'

const getLocalAddress = () => {
    const netsIntf = networkInterfaces();
    const netsKey = Object.keys(netsIntf);
    let results:Array<String> = []; // Or just '{}', an empty object
    
    
    for (let i = 0; i < netsKey.length; i++) {
        let nets = netsIntf[netsKey[i]]
        if(nets){
            nets.forEach(net => {
                if (net.family === 'IPv4' && !net.internal) {
                    results.push(net.address);
                }
            });
        }
    }
    return results
}

export default getLocalAddress


// const nets = networkInterfaces();
// const results = Object.create(null); // Or just '{}', an empty object

// for (const name of Object.keys(nets)) {
//     for (const net of nets[name]) {
//         // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
//         if (net.family === 'IPv4' && !net.internal) {
//             if (!results[name]) {
//                 results[name] = [];
//             }
//             results[name].push(net.address);
//         }
//     }
// }