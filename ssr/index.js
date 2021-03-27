import fs from "fs"
import path from "path"
// bundle index.html
import ReactDOMServer from "react-dom/server.js";
import React from "react";
import App from "./public/AppSSR.js"
// express
import Express from "express";
import UglifyJS from "uglify-js";



(async ()=>{



    /*========== bundle index.html (res from backend) ==========*/
    // render to string 
    const reactString = ReactDOMServer.renderToString(React.createElement(App))
    // get index.js file
    const indexHTML = fs.readFileSync(path.join(path.resolve(),'public/index.html'),'utf-8');
    // replace div to rendered string
    const dehydratedString = indexHTML.replace('<div id="root"></div>',`<div id="root">${reactString}</div>`)



    /*========== bundle App.js (req from frontend) ==========*/
    const COMPONENT_PATH = path.join(path.resolve(),'public/components');
    // get all components' name
    const getFileName_recursive = (dirname) => {
        let fileNameArr = [];
        const direntArr = fs.readdirSync(dirname,'utf-8')
        direntArr.forEach((dirent)=>{
            if(fs.lstatSync(path.join(dirname,dirent)).isDirectory()){
                fileNameArr.push(...getFileName_recursive(path.join(dirname,dirent)))
            }else{
                fileNameArr.push(path.join(dirname,dirent))
            }
        });
        return fileNameArr;
    };
    const fileNameArr = getFileName_recursive(COMPONENT_PATH)
    // import components(class), stringify and merge into single string
    var componentClassString = App.toString();
    const importClasses = (fileNameArr) => new Promise((resolve,rejects)=>{
        for(let i=0; i<fileNameArr.length; i++){
            import(fileNameArr[i])
            .then((file)=>{
                componentClassString += file.default.toString() + '\n';
            })
            .then(()=>{
                if(i==fileNameArr.length-1) {
                    resolve(componentClassString)
                }    
            })
        }
    })
    importClasses(fileNameArr)
    // compress javascript
    .then((result)=>{
        componentClassString = UglifyJS.minify(result+'\nexport default App').code;
    })


    /*========== EXPRESS SETTINGS ==========*/
    const express = Express();
    const PORT = 50505;
    express.use('/public',Express.static(path.join(path.resolve(),'public')))
    express.listen(PORT,()=>{console.log('[myblog:ssr] listening local',PORT);})

    

    /*========== INITIAL PATHS ==========*/

    // send initial redirect
    express.get('/',(req,res)=>{
        res.redirect('/techblog')
    });

    // send dehydrated index.js
    express.get('/techblog',(req,res)=>{
        res.send(dehydratedString)
    });

    // send bundled App.js
    express.get('/app',(req,res)=>{
        res.setHeader('Content-Type','application/javascript');
        res.send(componentClassString);
    });



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
})();