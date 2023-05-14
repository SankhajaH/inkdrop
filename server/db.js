const {MongoClient} = require('mongodb');
let dbConnection;
let uri =
    'mongodb+srv://sankhaja:test123@cluster0.l5t7xgk.mongodb.net/inkdrop?retryWrites=true&w=majority';

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
            .then((client) => {
                dbConnection = client.db();
                return cb();
            })
            .catch((err) => {
                console.log(err);
                return cb(err);
            });
    },
    getDb: () => dbConnection,
};
