const path = require('path');

/*========== EXPRESS SETTINGS ==========*/
const Express = require('express');
const express = Express();
const PORT = 50507;
express.listen(PORT,()=>{console.log(`[myblog:article] ${PORT}`);})
express.use('/public',Express.static(path.join(path.resolve(),'public')))
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