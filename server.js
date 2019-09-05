const express = require("express");
const server = express();

const helmet = require("helmet");

// import data from db

const Posts = require("./data/db.js");
server.use(express.json());
server.use(helmet());

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
      console.log(err);
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
      if (post.length > 0) {
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

// get comments follow

// GET ID destructure to return an object and not an array

server.get("/api/posts/:id", (req, res) => {
  const postId = req.params.id;

  Posts.findById(postId)
    .then(post => {
      if (post.length > 0) {
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

// follow get id

// server.get("api.posts/:id", (req, res) => {
//   const { id } = req.params;

//   Posts.findById(id).then(([post]) => {
//     console.log(post);
//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).json({ error: "post with id does not exist" });
//     }
//   });
// });

// methond delete
server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  Posts.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ message: "deleted" });
      } else {
        res
          .status(404)
          .json({ message: " the post with the spicfied id does not exist" });
      }
    })
    .catch(err => {
      res.send(500).json({ error: "the post could not be removed" });
    });
});

// POST posts creates new posts to /api/posts

server.post("/api/posts", (req, res) => {
  const rePost = req.body;
  const { title, contents } = req.body;
  if (title && contents) {
    Posts.insert(rePost)
      .then(post => {
        res.status(201).json(rePost);
      })
      .catch(err => {
        res.status(500).json({
          message: "there was an error while saving the post to the database"
        });
      });
  } else {
    res.status(400).json({
      message: "please provide a title and contents for the post"
    });
  }
});

// ADD COMMENT 	/api/posts/:id/comments

server.post("/api/posts/:id/comments", (req, res) => {
  const rePost = req.body;
  rePost.post_id = req.params.id;
  if (rePost) {
    Posts.insertComment(rePost)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "no luck" });
      });
  }
});

// method put update follow
// server.put("/api/users/:id", (req, res))

// METHOD UPDATE/PUT

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (changes.title && changes.contents) {
    Posts.update(id, changes)
      .then(updated => {
        if (updated) {
          res.status(200).json(changes);
        } else {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "There was an error updating the post" });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide a title and contents for the post" });
  }
});

module.exports = server;
