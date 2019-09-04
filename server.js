const express = require("express");
const server = express();
server.use(express.json());

// import data from db

const Posts = require("./data/db.js");

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
// GET ID

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
          message: "There was an error while saving the post to the database"
        });
      });
  } else {
    res.status(400).json({
      message: "Please provide a title and some content for the post."
    });
  }
});

// ADD COMMENT 	/api/posts/:id/comments

server.post("	/api/posts/:id/comments", (req, res) => {
  const rePost = req.body;
});

// METHOD UPDATE/PUT

// server.put("/api/users/:id", (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   Posts.update(id, changes)
//     .then(post => {
//       if (post) {
//         res.status(200).json(post);
//       } else {
//         res
//           .status(404)
//           .json({ message: "The post with the specified ID does not exist." });
//       }
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ message: "Please provide a title and contents for the post" });
//     });
// });

module.exports = server;

//  method update
// server.put("/api/posts/:id", (req, res) => {
//     const id = req.params.id:
//     const update = req.body;
//    Posts.update(id, update).then(updated => {
//        if (updated) {
//            Posts.findById(id)
//            .then(post => {
//                res.status(200).json({ message: "update working", post })
//            })
//            .catch(err => {
//                res.send(500).json({ error: "user info not modded"})
//            })
//        } else {
//            res.status(404).json({ message: "the users with specified id does not exist"})
//        }
//    })
//    .catch(err => {
//        res.status(500).json({ message: "the users info couldn't be modded"})
//    })
// })
