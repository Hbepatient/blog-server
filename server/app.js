// 引入模块
const Koa = require('koa');
const Router = require('koa-router');
const requireDirectory = require("require-directory");
const koajwt = require("koa-jwt");
const bodyParser = require('koa-bodyparser')
const mongoDB = require('./db/dbConfig');


// 实例化模块
const router = new Router();
const app = new Koa();
const defaultRouters = requireDirectory(module, "./api");

// 自动注册路由
for(let defaultRouterName in defaultRouters){
    if(defaultRouters[defaultRouterName] instanceof Router){
        router.use('/api',defaultRouters[defaultRouterName].routes()).use(router.allowedMethods());
    }
}

// token验证异常时处理
app.use(async(ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401){
            ctx.status = 401;
            ctx.body = '您无权访问此资源，请登录！';
        }else{
            throw err;
        }
    })
})

// 路由权限鉴定
app.use(koajwt({
    secret: 'MYSECRET'
  }).unless({ // 配置白名单
    path: [/\/api\/login/, /\/api\/article/]
}))

// 使用请求体解析
app.use(bodyParser());

router.get('/',async ctx => {
    ctx.body = 'hello Koa';
})

app.use(router.routes());



// 数据库连接
mongoDB
.then(()=>{
    console.log('连接数据库成功');
})
.catch(err => {
    console.log('数据库连接异常', err);
})

// 端口开启 5000
const port = process.env.port || 5000;
app.listen(port);
console.log('服务器启动在端口' + port);