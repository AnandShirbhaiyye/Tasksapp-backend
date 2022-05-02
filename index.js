const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const app = express();

app.use(express.json());

const PORT = 7000;

mongoose.connect('mongodb+srv://suraj:suraj@cluster0.gfb4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>{
    console.log('connected to mongo DB database...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

 app.get('/', (req, res) => {
    res.send('Hello RTC>>>>');
     });

     app.post('/add/user', (req, res) => {
        const user = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }
        const newUser = new User(user);
        newUser.save((err, data) => {
            if (err) {
                console.log(err);
            } else {
                // res.send(data);
                res.send({
                    status:'success',
                });
            }
        });
    });

    app.get('/get/user', async (req,res)=>{
        const users = await User.find();
        res.send({
            status:"success",
            data:users
        })
    })

    app.post('/get/user/', async (req,res)=>{
        const user = await User.findOne({name: req.body.name});
        res.send({
            status:"success",
            data:user
        })
    })

    app.post('/update/user/', async (req,res)=>{
        const user = await User.updateOne(
            {name: req.body.name},
            {$set:{name: req.body.name, email: req.body.email}});
    
            if(user){
                res.send({
                    status:"success",
                    data:user
                })
            }
    });

    app.post('/delete/user/', async (req,res)=>{
        const user = await User.deleteOne({email: req.body.email});
            res.send({
                status:"success",
                data:user
            })
    })
    

    //Task

    app.post('/add/task', (req, res) => {
        const task = {
            roll : req.body.roll,
            title : req.body.title,
            discription : req.body.discription,
            status : req.body.status
        }
        const newTask = new Task(task);
        newTask.save((err, data) => {
            if (err) {
                console.log(err);
            } else {
                // res.send(data);
                res.send({
                    status:'success',
                });
            }
        });
    });

    app.get('/get/task', async (req,res)=>{
        const tasks = await Task.find();
        res.send({
            status:"success",
            data:tasks
        })
    })

    app.post('/get/task/', async (req,res)=>{
        const task = await Task.findOne({roll: req.body.roll});
        res.send({
            status:"success",
            data:task
        })
    })

    app.post('/update/task/', async (req,res)=>{
        const task = await Task.updateOne(
            {roll: req.body.roll},
            {$set:{title: req.body.title, status: req.body.status, discription: req.body.discription}});
    
            if(task){
                res.send({
                    status:"success",
                    data:task
                })
            }
    });

    app.post('/delete/task/', async (req,res)=>{
        const task = await Task.deleteOne({roll: req.body.roll});
            res.send({
                status:" deleted successfully",
                data:task
            })
    })
