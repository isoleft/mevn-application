const express = require('express')
const router = express.Router()
const Post = require('../models/post-model')

router.post('/posts', (req, res) => {
    const post = new Post({
      Name: req.body.Name,
      Author: req.body.Author,
      Pages: req.body.Pages,
      Spec: req.body.Spec,
      Date_in: req.body.Date_in,
      Image: req.body.Image
    })
    post.save((err, data) => {
      if (err) {
        console.log(err)
      } else {
        res.send({
          success: true,
          message: `Post with ID_${data._id} saved successfully!`
        })
      }
    })
  })

  router.get('/posts', (req, res) => {
    if(req) {
    var sort = { [req.query.sortBy] : req.query.sortOrder}
    console.log(req.query) 
    Post.find({}, (err, posts) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({ posts: posts })
      }
    }).sort(sort)
  }
  })

  router.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send(post)
      }
    })
  })

  router.put('/posts/:id', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        console.log(err)
      } else {
        if (req.body.Name) {
          post.Name = req.body.Name
        }
        if (req.body.Author) {
          post.Author = req.body.Author
        }
        if (req.body.Pages) {
          post.Pages = req.body.Pages
        }
        if (req.body.Spec) {
          post.Spec = req.body.Spec
        }
        if (req.body.Date_in) {
          post.Date_in = req.body.Date_in
        }
        if (req.body.Image) {
          post.Image = req.body.Image
        }
        post.save(err => {
          if (err) {
            res.sendStatus(500)
          } else {
            res.sendStatus(200)
          }
        })
      }
    })
  })

  router.delete('/posts/:id', (req, res) => {
    Post.remove({ _id: req.params.id }, err => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.sendStatus(200)
      }
    })
  })

module.exports = router;
