const express = require('express');
const router = express.Router();
const users = require('../data/member.js');
const todos = require('../data/todo.js');

router.get('/', (req, res) => {
    res.send(users)
})

module.exports = router;
