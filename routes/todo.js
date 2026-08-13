const express = require('express');
const router = express.Router();
const data = require('../data/todo.js');

router.get('/', (req, res) => {
    console.log(data)
    res.send('Hello')
});

router.get('/', (req, res) => {
    res.send(data)
})

router.get('/done', (req, res) => {
    const filteredData = data.filter((i) => {
        return i.done === true;
    });
    res.send(filteredData);
});

router.post('/', (req, res) => {
    const newTodoId = req.body.id;
    const newTodoTitle = req.body.title;
    const newTodoDone = req.body.done;    

    const newTodolist = {
        id: newTodoId,
        title: newTodoTitle,
        done: newTodoDone
    };
    data.push(newTodolist);
    res.send(newTodolist);
})

router.get('/:id', (req, res) => {
    const search = req.params.id;
    const foundid = data.find((i) => {
        return i.id === Number(search)
    });

    if (foundid) {
        res.send(foundid);
    } else {
        res.send('해당 아이디의 리스트는 없음')
    }
})

router.put('/:id', (req, res) => {
    const target = Number(req.params.id);
    const newDone = req.body.done;
    const foundTargetId = data.find((i) => {
        return i.id === target;
    });

    if (foundTargetId) {
        foundTargetId.done = newDone;
        res.send(foundTargetId);
    } else {
        res.send("해당 아이디의 리스트는 없음.")
    }
})

router.delete('/delete/:id', (req, res) => {
    const target = Number(req.params.id);
    const targetIndex = data.findIndex((i) => {
        return i.id === target;
    });

    if (targetIndex != -1) {
        data.splice(targetIndex, 1);
        res.send(`${target}번 리스트 삭제됨.`)
    } else {
        res.send('해당 아이디의 리스트는 없음.')
    }
})

module.exports = router;