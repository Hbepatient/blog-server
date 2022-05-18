const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 创建User集合模板
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    pub_date: {
        type: Date,
        default: Date.now
    }
});

// 创建User集合对象
const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;