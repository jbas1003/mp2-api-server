import { List, Tasks, User } from './resources/Utils/queries.js';

import express from 'express';

import cors from 'cors';
import bodyParser from "body-parser";

const api = express();

const newUser = new User;
const newList = new List;
const newTask = new Tasks;

api.listen(3000, () => {
    console.log('API up and running!');
});


api.use(cors())
api.use(bodyParser.urlencoded({
    extended: true
}));
api.use(bodyParser.json());


api.post('/login', (req, res) => {
    newUser.signInUser(req, res)
});

// START: USERS API
api.post('/addUser', (req, res) => {   
    newUser.createUser(req, res)
});

api.get('/showUsers', (req, res) =>{
    newUser.showUsers(req, res)
})

api.post('/updateUser', (req, res) => {
    newUser.updateUser(req, res)
})

api.post('/deleteUser', (req, res) => {
    newUser.deleteUser(req, res)
})
// END: USERS API

// START: LIST API

api.post('/addList', (req, res) => {
    newList.createList(req, res)
})

api.get('/showList', (req, res) => {
    newList.showList(req, res)
})

api.post('/updateList', (req, res) => {
    newList.showList(req, res)
})

api.post('/deleteList', (req, res) => {
    newList.deleteList(req, res)
})

// END: LIST API

// START: TASK API

api.get('/showTasks', (req, res) => {
    newTask.showTasks(req, res)
})

api.post('/addTasks', (req, res) => {
    newTask.createTask(req, res)
})

api.post('/updateTask', (req, res) => {
    newTask.updateTask(req, res)
})

api.post('/deleteTask', (req, res) => {
    newTask.deleteTask(req, res)
})

// END: TASK API