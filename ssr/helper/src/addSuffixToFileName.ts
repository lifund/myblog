import * as path from "path";
const addSuffixToFileName = (filename:string,suffix:string) => {
    const result = 
        path.basename(filename).split('.').slice(0,-1).join('.')
        + suffix 
        + path.extname(filename)
    return result
}

export default addSuffixToFileName