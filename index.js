const express = require('express');
const app = express();
const port = 3000;
const data = require('./todo.js');
const users = require('./member.js');
app.use(express.json());

//---------------------------------------------------------------------todo
app.get('/', (req, res) => {
    console.log(data)
    res.send('Hello')
});

app.get('/data', (req, res) => {
    res.send(data)
})

app.get('/data/done', (req, res) => {
    const filteredData = data.filter((i) => {
        return i.done === true;
    });
    res.send(filteredData);
});

app.post('/data', (req, res) => {
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

app.get('/data/:id', (req, res) => {
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

app.put('/data/:id', (req, res) => {
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

app.delete('/data/delete/:id', (req, res) => {
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


//---------------------------------------------------------------------member
app.get('/users', (req, res) => {
    res.send(users);
})

app.get('/users/role', (req, res) => {
    const filteredRole = users.filter((i) => {
        return String(i.role) === "admin";
    });
    res.send(filteredRole);
});

app.get('/users/:id', (req, res) => {
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

app.post('/users', (req, res) => {
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

app.post('/users/home', (req, res) => {
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

app.put('/users/:id', (req, res) => {
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

app.delete('/users/delete/:id', (req, res) => {
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


app.listen(port, () => {
    console.log(`서버가 ${port}에서 작동중`)
});