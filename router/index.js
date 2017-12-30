const router = require('koa-router')();
const post = require('../lib/post');

router.get('/', async function(ctx, next){
    
    await ctx.render('index', {});
});

router.post('/proxy', async function(ctx, next){
    const { url, params} = ctx.request.body;
    try{
        return ctx.body = await post(url, params);
    }catch(e){
        return ctx.body={
            data: e,
            status: "failed"
        };
    }
});

module.exports = router