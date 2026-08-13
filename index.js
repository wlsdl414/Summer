const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const todoRouter = require('./routes/todo.js');
const userRouter = require('./routes/user.js');
const comunityRouter = require('./routes/comunity.js');
const productRouter = require('./routes/product.js');
const userTodoRouter = require('./routes/userTodo.js');

app.use('/todo', todoRouter);    
app.use('/user', userRouter);    
app.use('/comunity', comunityRouter);
app.use('/product', productRouter);
app.use('/userTodo', userTodoRouter);

app.listen(port, () => {
    console.log(`서버가 ${port}에서 작동중`)
});