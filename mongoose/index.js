const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    // if (process.env.NODE_ENV !== "production") {
    //   mongoose.set("debug", true);
    // }
    mongoose.connect(
      "mongodb://localhost:27017/admin",
      {
        dbName: "nodejs",
      },
      (error) => {
        if (error) {
          console.log("mongo error", error);
        } else {
          console.log("mongoDB success");
        }
      }
    );
  };

  connect();
  mongoose.connection.on("error", (error) => {
    console.log("mongose connect error", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.error("mongoose cut and try again");
    connect();
  });
  require("../mongoose/User/user");
  require("../mongoose/Diary/diary");
  require("../mongoose/Diary/comment");
};
