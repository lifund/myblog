import * as fspack from "fs";
const fs = fspack.promises;
import * as path from "path";


const getFileName_recursive = async (dirname:string,ext='') => {

    let fileNameArr:string[] = [];

    const direntArr:string[] = await fs.readdir(dirname,'utf-8');
    for await (const dirent of direntArr) {
        if((await fs.lstat(path.join(dirname,dirent))).isDirectory()){
            fileNameArr = fileNameArr.concat(await getFileName_recursive(path.join(dirname,dirent),ext))
        } else { 
            if(ext!==''){
                if(path.extname(path.join(dirname,dirent))===ext){
                    fileNameArr.push(path.join(dirname,dirent))
                }
            }else{
                fileNameArr.push(path.join(dirname,dirent))
            }
        }
    }
    return fileNameArr
};

export default getFileName_recursive