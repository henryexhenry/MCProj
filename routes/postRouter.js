const express = require('express');
const bodyParser = require('body-parser');

const postRouter = express.Router();
const Posts = require('../models/posts');
const cors = require('./cors');
const authenticate = require('../authenticate');

postRouter.use(bodyParser.json());

postRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Posts.find(/*{"category": "drink"}*/req.query)
        .populate('user')
            .then((posts) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(posts);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post(cors.corsWithOptions, authenticate.verifyUser,  (req, res, next) => {
        Posts.create(req.body)
        .populate('user')
            .then((post) => {
                console.log('Success: ', post);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(post);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put(cors.corsWithOptions,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /posts');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, /*authenticate.verifyAdmin,*/ (req, res, next) => {
        Posts.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

//########################################################################################

postRouter.route('/:postId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Posts.findById(req.params.postId)
        .populate('user')
            .then((post) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(post);
            }, (err) => { next(err) })
            .catch((err) => { next(err) })
    })
    .post(cors.corsWithOptions, authenticate.verifyUser,/* authenticate.verifyAdmin,*/ (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /posts/' + req.params.postId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser,/* authenticate.verifyAdmin,*/ (req, res, next) => {
        Posts.findByIdAndUpdate(req.params.postId, {
            $set: req.body
        }, { new: true })
        .populate('user')
            .then((post) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(post);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, /* authenticate.verifyAdmin,*/ (req, res, next) => {
        Posts.findByIdAndRemove(req.params.postId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => { next(err) })
            .catch((err) => { next(err) })
    });



module.exports = postRouter;