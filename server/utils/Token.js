module.exports = function(){
    const jwt = require("jsonwebtoken");
    const secret = 'MYSECRET';
    const generateToken = function(userInfo, expireTime){
        const token = jwt.sign({...userInfo}, secret, {expiresIn: expireTime});
        return token;
    }
    
    const getToken = function(userInfo, expireTime){
        return generateToken(userInfo, expireTime);
    }
    return getToken
};