const express = require("express");

const { PostModel } = require("../models/post.model");

const postRouter = express.Router();

postRouter.get("/:id", async (req, res) => {
  const ID = req.params.id;
  const data = await PostModel.find({_id:ID});
  res.send(data);
});

postRouter.post("/create/:id", async (req, res) => {
  const payload = req.body;
  const ID = req.params.id;
  const post = await PostModel.findOne({ _id: ID });
  const userID_in_post = post.userID;
  const userID_making_req = req.body.userID;

  try {
    if (userID_making_req !== userID_in_post) {
      res.send("you are not authorized");
    } else {
      const newpost = new PostModel(payload);
      await newpost.save();
      res.send("new post created");
    }
  } catch (error) {
    console.log(error);
    res.send("error while posting the post");
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const addpost = req.body;
  const ID = req.params.id;
  const post = await PostModel.findOne({ _id: ID });
  const userID_in_post = post.userID;
  const userID_making_req = req.body.userID;

  try {
    if (userID_making_req !== userID_in_post) {
      res.send("you are not authorized");
    } else {
      await PostModel.findByIdAndUpdate({ _id: ID }, addpost);
      res.send({ msg: `Post with id: ${ID} updated successfully` });
    }
  } catch (error) {
    console.log(error);
    res.send("error while updating post");
  }
});

postRouter.delete("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const post = await PostModel.findOne({ _id: ID });
  const userID_in_post = post.userID;
  const userID_making_req = req.body.userID;

  try {
    if (userID_making_req !== userID_in_post) {
      res.send("you are not authorized");
    } else {
      await PostModel.findByIdAndDelete({ _id: ID });
      res.send({ msg: `Post with id: ${ID} was successfully Deleted` });
    }
  } catch (error) {
    console.log(error);
    res.send("error while Deleting post");
  }
});

module.exports = {
  postRouter,
};
