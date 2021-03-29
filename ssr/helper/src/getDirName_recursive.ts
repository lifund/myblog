import * as fspack from "fs";
const fs = fspack.promises;
import * as path from "path";

const getDirName_recursive = async (dirname:string) => {
    let dirNameArr:string[] = [dirname];
    const direntArr = await fs.readdir(dirname,'utf-8')
    for await (const dirent of direntArr) {
        if((await fs.lstat(path.join(dirname,dirent))).isDirectory()){
            dirNameArr.push(path.join(dirname,dirent))
            dirNameArr.concat(await getDirName_recursive(path.join(dirname,dirent)))
        }
    }
    return dirNameArr;
};

export default getDirName_recursive