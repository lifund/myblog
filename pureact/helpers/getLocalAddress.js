import { networkInterfaces } from 'os';
const getLocalAddress = () => {
    const netsIntf = networkInterfaces();
    const netsKey = Object.keys(netsIntf);
    let results = []; // Or just '{}', an empty object
    for (let i = 0; i < netsKey.length; i++) {
        let nets = netsIntf[netsKey[i]];
        if (nets) {
            nets.forEach(net => {
                if (net.family === 'IPv4' && !net.internal) {
                    results.push(net.address);
                }
            });
        }
    }
    return results;
};
export default getLocalAddress;