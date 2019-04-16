const express = require('express');
const bodyParser = require('body-parser');

const messageRouter = express.Router();
const Messages = require('../models/messages');
const cors = require('./cors');
const authenticate = require('../authenticate');

messageRouter.use(bodyParser.json());

messageRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Messages.find(/*{"category": "drink"}*/req.query)
            .then((messages) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(messages);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post(cors.corsWithOptions, /*authenticate.verifyUser,*/  (req, res, next) => {
        Messages.create(req.body)
            .then((message) => {
                console.log('Success: ', message);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(message);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put(cors.corsWithOptions,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /messages');
    })
    .delete(cors.corsWithOptions, /*authenticate.verifyUser, authenticate.verifyAdmin,*/ (req, res, next) => {
        Messages.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

//########################################################################################

messageRouter.route('/:messageId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Messages.findById(req.params.messageId)
            .populate('comments.author')
            .then((message) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(message);
            }, (err) => { next(err) })
            .catch((err) => { next(err) })
    })
    .post(cors.corsWithOptions, /*authenticate.verifyUser, authenticate.verifyAdmin,*/ (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /messages/' + req.params.messageId);
    })
    .put(cors.corsWithOptions, /*authenticate.verifyUser, authenticate.verifyAdmin,*/ (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /messages/' + req.params.messageId);
    })
    .delete(cors.corsWithOptions, /*authenticate.verifyUser, authenticate.verifyAdmin,*/ (req, res, next) => {
        Messages.findByIdAndRemove(req.params.messageId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => { next(err) })
            .catch((err) => { next(err) })
    });



module.exports = messageRouter;