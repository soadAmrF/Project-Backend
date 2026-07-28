const mongoose = require('mongoose');

const DB = process.env.DB_URL;

const connectedDB = () => {
  mongoose
    .connect(DB)

    .then(() => {
      console.log("DB connected");
    })
    
    .catch((err) => {
      console.log("DB connection failed");
      console.log(err);

      process.exit(1);
    });
};

module.exports = connectedDB;
