const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.routes")
const { authenticate } = require("./middlewares/authenticate.middleware")

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to Social Media App");
});

app.use("/users", userRouter);
app.use(authenticate)
app.use("/posts", postRouter);

app.listen(1999, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (error) {
    console.log(error, "unable to connect to DB");
  }
});
