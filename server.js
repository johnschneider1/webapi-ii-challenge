const express = require("express");
const server = express();

// import data from db

const Posts = require("./data/db.js");
postId = 11;

// Sanity test for Mr. Hernandez
server.get("/", (req, res) => {
  res.status(200).json({ api: "up...up and away" });
});

// GET find() Posts /api/posts

server.get("/api/posts", (req, res) => {
  Posts.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The post information could not be retrieved." });
    });
});

// GET comments

server.get("/api/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  Posts.findPostComments(postId)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The comment with the specified ID does not exist"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "err retriving comment" });
    });
});
// GET findById()

server.get("/api/posts/:id", (req, res) => {
  const postId = req.params.id;

  Posts.findById(postId)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "err retriving post" });
    });
});

// Method DELETE Remove
server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  Posts.remove(id)
    .then(post => {
      if (post) {
        res.status(200).json({ message: "post deleted" });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

// POST posts creates new posts to /api/posts

server.post("/api/posts", (req, res) => {
  const rePost = req.body;
  rePost.id = postId++;
  Posts.insert(rePost)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "error listing the new post" });
    });
});

// METHOD UPDATE/PUT

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Posts.update(id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Please provide a title and contents for the post" });
    });
});

module.exports = server;
