const mongoose = require('mongoose');
const dbURi = 'mongodb://localhost:27017/blog_content'

module.exports = mongoose.connect(dbURi);
