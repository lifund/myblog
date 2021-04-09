function btoa(str) {
    var buffer;

    if (str instanceof Buffer) {
        buffer = str;
    } else {
        buffer = Buffer.from(str.toString(), 'binary');
    }

    return buffer.toString('base64');
}
const a = import('data:text/javascript;base64,'+btoa('import React from "react"; function hello(){ console.log("asdf");} export default hello'))
.then((appstring)=>{
    appstring.default()
})
console.log(a);