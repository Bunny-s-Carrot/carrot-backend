const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@bunnyscarrot.dqtmy5q.mongodb.net/test`, {
    dbName: 'carrotDB',
}, (error) => {
    if (error) {
        console.log('연결 에러')
    } else {
        console.log('연결 성공')
    }
});
}

module.exports = connect;