const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
require("./authService/UserModel");
const userRoute = require("./authService/AuthRoute");
const helmet = require("helmet");
const compression = require("compression");

//database connection
const mongoURI = `mongodb+srv://mohammedgehad:${
  process.env.MongoPassword || config.get("MongoPassword")
}@cluster0-gbxsd.mongodb.net/auth-service?retryWrites=true&w=majority`;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log("connected to DB"))
  .catch((e) => console.log(e));
//

app.use(helmet());
app.use(compression());
app.use("/user", userRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening at ", port));

if (process.env.NODE_ENV !== "production") {
  const ngrok = require("ngrok");
  const ngrokConnect = async () => {
    const url = await ngrok.connect(port);
    console.log(url);
  };
  ngrokConnect();
}
