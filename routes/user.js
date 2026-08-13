const express = require('express');
const router = express.Router();
const users = require('../data/member.js'); 

router.get('/', (req, res) => {
    res.send(users);
})

router.get('/role', (req, res) => {
    const filteredRole = users.filter((i) => {
        return String(i.role) === "admin";
    });
    res.send(filteredRole);
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const foundidId = users.find((i) => {
        return i.id === Number(userId)
    });

    if (foundidId) {
        res.send(foundidId);
    } else {
        res.send(`${userId}에 해당하는 회원은 없음.`);
    }
})

router.post('/', (req, res) => {
    const newId = req.body.id;
    const newName = req.body.name;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const newRole = req.body.role;
    const newIsActive = req.body.isActive;

    const isEmail = users.find((i) => {
        return i.email === newEmail;
    });
    if (isEmail) {
        res.send('이미 존재하는 이메일. 등록 불가능.');
    } else {
        const newUser = {
            id: newId,
            name: newName,
            email: newEmail,
            password: newPassword,
            role: newRole,
            isActive: newIsActive
        };
    users.push(newUser);
    res.send(newUser);
    };
});

router.post('/home', (req, res) => {
    const putEmail = req.body.email;
    const putPassword = req.body.password;

    const foundUser = users.find((i) => {
        return i.email === putEmail && i.password === putPassword;
    });

    if (foundUser) {
        res.send('로그인 성공');
    } else {
        res.send('로그인 실패');
    }
});

router.put('/:id', (req, res) => {
    const target = Number(req.params.id);
    const newName = req.body.name;
    const newEmail = req.body.email;
    const foundTargetId = users.find((i) => {
        return i.id === target;
    })

    if (foundTargetId) {
        foundTargetId.name = newName;
        res.send(foundTargetId);
    } else if (foundTargetId) {
        foundTargetId.email = newEmail;
        res.send(foundTargetId);
    } else {
        res.send('해당 아이디의 회원은 없음.')
    }
});

router.delete('/delete/:id', (req, res) => {
    const target = Number(req.params.id);
    const targetIndex = users.findIndex((i) => {
        return i.id === target;
    });

    if (targetIndex != -1) {
        users.splice(targetIndex, 1);
        res.send(users)
    } else {
        res.send('해당 아이디의 회원은 없음.')
    }
});

module.exports = router;