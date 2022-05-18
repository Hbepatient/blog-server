const User = require('../models/User')
const Router = require('koa-router');
const crypto = require('crypto');
const Token = require('../utils/Token')

const getToken = new Token();
const router = new Router();

router.post('/login', async(ctx, next)=>{
    const userInfo = ctx.request.body;
    const user = {
        username: userInfo.username,
        password: crypto.createHash('md5').update(userInfo.password).digest('hex')
    }
    await User.find({...user})
    .then(res => {
        if(res.length){
            const token = getToken(user, 3600)
            ctx.body = {
                code: '00001',
                msg: '登录成功！',
                token
            }
        }else{
            ctx.body = {
                code: '00004',
                msg: '用户名或密码错误'
            }
        }
    })
})

router.get('/register', async(ctx, next)=>{
    const userInfo = {
        username: 'admin',
        password: 'admin',
    }
    let checkUser = null;
    await User.find({username: userInfo.username})
    .then(res => {
       checkUser = res
    })
    if (checkUser) {
      ctx.body = {
        code: '00003',
        msg: "该用户名已存在"
      }
    }else{
        const user = {
            username: userInfo.username,
            password: crypto.createHash('md5').update(userInfo.password).digest('hex')
        }
        await User.insertMany(user).then(res => {
            ctx.body = {
                code:'00002',
                msg: '注册成功'
            }
        })
    }
})

module.exports = router;