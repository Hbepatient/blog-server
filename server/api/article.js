const Router = require('koa-router');
const Article = require('../models/Article');
const router = new Router();

// 查询所有
router.get('/article', async ctx => {
    let { offset, pageSize} = ctx.query;
    let total = await Article.count();
    await Article.find()
    .sort({'pub_date': 1})
    .skip(offset)
    .limit(pageSize)
    .then(res => {
        const data = {articleList: res, total}
        ctx.body = data;
    })
    .catch(err => {
        ctx.body = {
            code: '00005',
            msg: '查询出错！'
        };
    })
})



module.exports = router;