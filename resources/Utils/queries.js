import { response } from "express";
import { tblLists, tblTasks, tblUsers } from "./db.js";

// START: USER CLASS
export class User {
    constructor(req, res){
        this.reqBody = req;
        this.res = res;
    }

    signInUser(req, res) {
        let retVal = {success: false};
        
        tblUsers.findOne({
            where: {
                uname: req.body.username
            }
        })
        .then(result => {
            if (result) {
                return result.dataValues;
            }else{
                retVal.success = false;
                retVal.message = 'User does not exist!'
            }
        })
        .then(result => {
            if (result.pword === req.body.password) {
                retVal.success = true;
                delete result.pword;
                delete result.userId;
                retVal.userData = result;
                return true;
            }else{
                retVal.success = false;
                retVal.message = 'Invalid Password!';
                throw new Error('Invalid password');
            }
        })
        .finally(() => {
            res.send(retVal)
        })
        .catch((error) => {
            console.log('Error: ', error)
        })
    }

    createUser(req, res) {
        let retVal = {success: false};
    
        tblUsers.findOne({
            where: {
                uname: req.body.userName
            }
        })
        .then((result)=>{
            if(result){
                retVal.success = false;
                retVal.message = 'Username is already taken';
                res.send(retVal);
            }else{
                tblUsers.create({
                    fname: req.body.firstName,
                    lname: req.body.lastName,
                    mname: req.body.middleName,
                    email: req.body.email,
                    uname: req.body.userName,
                    pword: req.body.passWord,
                }).then(result=>{
                    if(result.dataValues){
                        retVal.success = true;
                        retVal.message = 'Successfully Created User.';
                        res.send(retVal)
                    }else{
                        retVal.message = 'Failed to create User.';
                    }
                })
            }
        })
        .catch((error)=>{
            res.send('Error: ', error)
        })

    }

    showUsers(req, res) {
        let retVal = {success: false};

        tblUsers.findAll()
            .then((result)=>{
                const stringRes = JSON.stringify(result)
                const parsedRes = JSON.parse(stringRes)

                res.send(parsedRes)
            })
            .finally((result)=>{
                res.send(result)
            })
            .catch((error)=>{
                // console.log('No data to show')
            })
    }

    updateUser(req, res) {
        let retVal = {success: false};

        tblUsers.update({
            fname: req.body.firstName,
            lname: req.body.lastName,
            mname: req.body.middleName,
            email: req.body.email,
            uname: req.body.userName,
            pword: req.body.passWord,
        }, {
            where: {
                userId: req.body.userId
            }
        }).then(result=>{
            if(result.length > 0){
                retVal.success = true;
                retVal.message = 'Successfully Updated User.';
                res.send(retVal);
            }else{
                retVal.message = 'Failed to update User.';
            }
        })
        .catch((error)=>{
            res.send('Update User Error: ', error);
        })
    }

    deleteUser(req, res) {
        let retVal = {success: false};

        tblUsers.destroy({
            where: {
                userId: req.body.userId
            }
        })
        .then(result=>{
            if(result.length > 0){
                retVal.success = true;
                retVal.message = 'Successfully Deleted User.';
                res.send(retVal);
            }else{
                retVal.message = 'Failed to delete User.';
            }
        })
        .catch((error)=>{
            res.send('Delete Error: ', error)
        })
    }
}
// END: USER CLASS

// START: LIST CLASS
export class List {
    constructor(req, res) {
        this.reqBody = req;
        this.res = res;
    }

    createList(req, res) {
        let retVal = {success: false};

        // console.log(req.body.listName)
        tblLists.create({
            listName: req.body.listName
        }).then(result => {
            if(result.dataValues) {
                retVal.success = true;
                retVal.message = 'Successfully created list.';
            }else{
                retVal.messsage = 'Failed to create list.';
            }
            res.send(retVal);
        }).catch((error) => {
            res.send('Create List Error: ', error);
        })
    }

    showList(req, res) {
        let retVal = {success: false};

        tblLists.findAll()
            .then((result) => {
                const stringRes = JSON.stringify(result);
                const parsedRes = JSON.parse(stringRes);

                res.send(parsedRes)
            })
            .catch((error) => {
                res.send('Show list Error: ', error);
            })
    }

    updateList(req, res) {
        let retVal = {success: false};

        tblLists.update({
            listName: req.body.listName
        })
        .then((result) => {
            if (res.dataValues) {
                retVal.success = true;
                retVal.message = 'Successfully updated list.'
                res.send(retVal);

            }else{
                retVal.message = 'Failed to update list.'
            }
        })
        .catch((result) => {
            res.send('Update List Error: ', error)
        })
    }

    deleteList(req, res) {
        let retVal = {success: flase};

        tblLists.destroy({
            where: {
                listId: req.body.listId
            }
        })
        .then(result => {
            if (result.dataValues) {
                retVal.success = true;
                retVal.message = 'Successfully Deleted List.';
            }else{
                retVal.message = 'Failed to delete list.';
            }

            res.send(retVal);
        })
        .catch((error) => {
            res.send('Delete Error: ', error)
        })
    }
}
// END: LIST CLASS

// START: TASKS CLASS

export class Tasks {
    constructor(req, res) {
        this.reqBody = req;
        this.res = res;
    }

    createTask(req, res) {
        let retVal = {success: false};
        
        tblTasks.create({
            taskName: req.body.taskName,
            taskDescription: req.body.taskDescription,
            requestor: req.body.requestor,
            workNumber: req.body.workNumber,
            mobile: req.body.mobile,
            email: req.body.email,
        })
        .then(result => {
            if (result.dataValues) {
                retVal.success = true;
                retVal.message = 'Successfully created task.';
            }else{
                retVal.message = 'Failed to create task.';
            }
    
            res.send(retVal)
        })
        .catch((error) => {
            res.send('Creat Task Error: ', error);
        })
    }

    showTasks(req, res) {
        let retVal = {success: false};

        tblTasks.findAll()
        .then((result)=>{
            const stringRes = JSON.stringify(result)
            const parsedRes = JSON.parse(stringRes)

            res.send(parsedRes)
        })
        .finally((result)=>{
            res.send(result)
        })
        .catch((error)=>{
            // console.log('No data to show')
        })
    }

    updateTask(req, res) {
        let retVal = {success: false};
        
        console.log(`${req.body.taskId}, ${req.body.taskName}, ${req.body.taskDescription}, ${req.body.requestor}, ${req.body.workNumber}, ${req.body.mobile}, ${req.body.email}`)

        tblTasks.update({
            taskName: req.body.taskName,
            taskDescription: req.body.taskDescription,
            requestor: req.body.requestor,
            workNumber: req.body.workNumber,
            mobile: req.body.mobile,
            email: req.body.email,
        }, {
            where: {
                taskId: req.body.taskId
            }
        })
        .then(result => {
            if (result.length > 0) {
                retVal.success = true;
                retVal.message = 'Successfully updated task!';
            }else{
                retVal.message = 'Failed to update task.';
            }
            console.log(retVal)
            res.send(retVal);
        })
        .catch((error) => {
            res.send('Update List Error: ', error);
        })
    }

    deleteTask(req, res) {
        let retVal = {success: false};

        tblTasks.destroy({
            where: {
                taskId: req.body.taskId
            }
        })
        .then(result => {
            if (result.dataValues) {
                retVal.success = true;
                retVal.message = 'Successufully deleted task.';
            }else{
                retVal.message = 'Failed to delete task.';
            }

            res.send(retVal);
        })
        .catch((error) => {
            res.send('Delete Error: ', error)
        })
    }
}

// END: TASKS CLASS