const mongoose = require("mongoose");
const mongoURI =
  "mongodb://saikumar2063:chandu1996@ac-9ssacti-shard-00-00.qul2skp.mongodb.net:27017,ac-9ssacti-shard-00-01.qul2skp.mongodb.net:27017,ac-9ssacti-shard-00-02.qul2skp.mongodb.net:27017/foodmunchmern?ssl=true&replicaSet=atlas-ls93u7-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
const mongoDB = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("connected successfully");

      const fetchedData = mongoose.connection.db.collection("food_items");
      fetchedData
        .find({})
        .toArray()
        .then((data) => {
          const foodCategory =
            mongoose.connection.db.collection("food_category");
          foodCategory
            .find({})
            .toArray()
            .then((catData) => {
              global.food_items = data;
              global.foodCategory = catData;
            })
            .catch((err) => {
              console.log(err);
            });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoDB;
