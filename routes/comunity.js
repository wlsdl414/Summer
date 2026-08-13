const express = require('express');
const router = express.Router();
const posts = require('../data/post.js');

router.get('/', (req, res) => {
    res.send(posts);
});

router.get('/:id', (req, res) => {
    const search = req.params.id;
    const foundid = posts.find((i) => {
        return i.id ===Number(search);
    });

    if (foundid) {
        res.send(foundid);
    } else {
        res.send('해당 아이디의 게시글은 없음');
    }
});

router.get('/category/:category', (req, res) => {
    const search = req.params.category;
    const filteredCategory = posts.filter((i) => {
        return i.category === search;
    });
    res.send(filteredCategory)
})

router.post('/', (req, res) => {
    const newId = req.body.id;
    const newTitle = req.body.title;
    const newContent = req.body.content;
    const newCategory = req.body.category;
    const newViews = req.body.views;
    const newCreatedAt = req.body.createdAt;

    const newpost = {
        id: newId,
        title: newTitle,
        content: newContent,
        category: newCategory,
        views: newViews,
        createdAt: newCreatedAt
    };

    posts.push(newpost);
    res.send(newpost);
});

router.put('/:id', (req, res) => {
    const target = Number(req.params.id);
    const newTitle = req.body.title;
    const newContent = req.body.content;
    const newCategory = req.body.category;

    const foundid = posts.find((i) => {
        return i.id === target;
    });

    if (foundid) {
        foundid.title = newTitle;
        foundid.content = newContent;
        foundid.category = newCategory;
        res.send(foundid);
    } else {
        res.send("해당 아이디의 게시글은 없음.");
    };
});

router.put('/view/:id', (req, res) => {
    const target = Number(req.params.id);
    const foundid = posts.find((i) => {
        return i.id === target;
    })
    if (foundid) {
        foundid.views += 1;
        res.send(foundid)
    }
})

router.delete('/delete/:id', (req, res) => {
    const target = Number(req.params.id);
    const foundid = posts.findIndex((i) => {
        return i.id === target;
    });

    if (foundid != -1) {
        posts.splice(foundid, 1);
        res.send(`${target}번째 게시글 삭제됨.`)
    } else {
        res.send("해당 아이디의 게시글은 없음.")
    }
});

module.exports = router;