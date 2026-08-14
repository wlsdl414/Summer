const express = require('express');
const router = express.Router();
const users = require('../data/member.js');
const todos = require('../data/todo.js');

// 
// router.get('/:id', (req, res) => {
//     const search =Number( req.params.id);
//     const foundedUser = users.find(i => i.id === search);
//     console.log(foundedUser)
//     return res.send(foundedUser);
// })

router.get('/:userId', (req, res) => {
    const search = Number(req.params.userId);  //
    const id = todos.find(i => i.id === search);
    return res.send(id);
});

// done = true
router.get('/users/:id/todos', (req, res) => {
    const id = Number(req.params.id)
    const {done} = req.query;  

    const userId = users.find(u => u.id === id)
    const todoId = todos.filter(t => t.userId === id)

    if(done){
        const doneTrue = todoId.filter(d => d.done === true)
        return res.send(doneTrue)
    }

    return res.json(todoId)
});

//특정 회원 todo post
router.post('/users/:id/todos', (req, res) => {
    const id = Number(req.params.id)

    const userId = users.find(i => i.id === id)
    const todoId = todos.find(i => i.id === id)

    const {title, done} = req.body
    const newTodo = {
        id: todos.length+1,
        userId: id,
        title: title,
        done: done
    }

    todos.push(newTodo)
    res.send(newTodo)
})

//회원 삭제 시 관련 todo도 같이 삭제
router.delete('/:id/delete', (req, res) => {
    const id = Number(req.params.id)

    const remainUser = users.filter(u => u.id !== id)  
    
    const userTodo = todolist.filter(t => t.userId === id)

    const remainTodo = todolist.filter(f => f.userId !== id)
    const todoCount = remainTodo.length

    res.json({
        users: remainUser,
        deletedTodoCount: todoCount
    })
})

router.get('/users/:id/todos/status', (req, res) => {
    const id = Number(req.params.id);
    const {total, done, notDone} = req.query

    const total1 = todos.filter(t => t.userId === id)
    const doneTrue = todos.filter(d => d.done === true)
    const donFalse = todos.filter(f => f.done === false)

    res.json({
        total: total1.length,
        done: doneTrue.length,
        notDone: donFalse.length
    })
})


module.exports = router;
