const mongoose = require('mongoose');

const mongoDBConnect = () => {
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@bunnyscarrot.dqtmy5q.mongodb.net/test`, {
      dbName: 'carrotDB',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connection Successful'))
    .catch((err) => console.log(err.message));
}

module.exports = mongoDBConnect;