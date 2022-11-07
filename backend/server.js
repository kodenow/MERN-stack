require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout");

const app = express();

//adding middleware,it's a fancy name for us getting a request from the server and sending a response
//these functions will fire on every request that comes in
app.use(express.json()); //this looks if the request has some body and it passes it to the req object
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next(); //using next so it can to the next middlewares you defined examples: router.get("/"...)
});

//routes
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
