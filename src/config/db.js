const { default: mongoose } = require("mongoose");

const DB = process.env.DB_URL;

const connectedDB = () => {
  mongoose
    .connect(DB)

    .then(() => {
      console.log("IAM connected to DB HAHAHAHHAHAH!");
    })

    .catch((err) => {
      console.log("DB connection failed ME <sad>");
      console.log(err);

      process.exit(1);
    });
};

module.exports = connectedDB;
