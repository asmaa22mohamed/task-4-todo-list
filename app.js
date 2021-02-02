const bodyParser = require('body-parser');
const express = require('express');

const app = express();

require('./models/connection');
const user=require('./models/persons')
console.log(user)
const todo=require('./models/todo')
app.use(express.json());
app.use(bodyParser.urlencoded(({extended : true})));
app.use(express.static('public'));


app.use('/*',function (req, res, next) {
    console.log('Time: %d', Date.now())
    next()
  })


  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

//user register
 app.post('/users/register',(req,res,next)=>{
    const username=req.body.username;
    const password= req.body.password;
    const firstName= req.body.firstName;
   // console.log(req.body.username);
    user.create({username,password,firstName
    },(err,user)=>{
       if(err){
          // console.log(username)
           res.statusCode =422;
           res.send(err)
       }
       else{
           res.send(user)
       }
    })
    
})

//user login
app.post('/users/login',async(req,res,next)=>{
    const username=req.body.username;
    const password= req.body.password;
    
   await user.find({username: username,password:password
    },(err,user)=>{
       if(err){
          
           res.statusCode =404;
           res.send(err)
          
       }
       else{
           res.send(user+'"you are logged in"')
          
       }
    })
    
})
//get user firstName
app.get('/users',(req,res,next)=>{

    user.find({},{firstName:1},(err,user)=>{
        if(err){
           
            res.statusCode =404;
            res.send(err)
           
        }
        else{
            res.send(user)
           
        }
     })
})
//delete user by id
app.delete('/users/:id',(req,res,next)=>{
    user.findByIdAndRemove(req.params.id,(err,user)=>{
        if(err){
           
            res.statusCode =404;
            res.send(err)
           
        }
        else{
            res.send(user)
           
        }
     }) 
})
//update users by id
app.patch('/users/:id',(req,res,next)=>{
    const id = req.params.id;
    user.findByIdAndUpdate(id, req.body, { useFindAndModify: false },(err,user)=>{
        if(err){
           
            res.statusCode =404;
            res.send(err)
           
        }
        else{
            res.send(user)
           
        }
     }) 
})


//using todos
app.post('/todos',(req,res,next)=>{
    const {userId ,body ,title,tags} = req.body;
     req.body['createdAt']=Date.now();

     todo.create({userId:userId,body:body,title:title,tags:tags},(err,todo)=>{
        if(err){
           
            res.statusCode =404;
            res.send(err)
           
        }
        else{
            res.send(todo)
           
        }
     })

})
//get todos by userId
app.get('/todos/:userId',(req,res,next)=>{
    todo.findById(req.params.userId,(err,todo)=>{
        if(err){
           
            res.statusCode =404;
            res.send(err)
           
        }
        else{
            res.send(todo)
           
        }
     }) 
})
//get todos by skip and limit
app.get('/todos/:limit/:skip',async(req,res,next)=>{
    try{
        const todos = await todo.find({}).skip(0).limit(10).exec()
        res.send(todos)
    }catch(err){
        res.statusCode =404;
        res.send(err)
    }
    
})
//patch todo By Id
app.patch('/todos/:id',(req,res,next)=>{
    const id = req.params.id;
    req.body['updatedAt'] = Date.now();
    todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false },(err,todo)=>{
        if(err){
           
            res.statusCode =404;
            res.send(err)
           
        }
        else{
            res.send(todo)
           
        }
     }) 
})
//delete todo by id
app.delete('/todos/:id',(req,res,next)=>{
    todo.findByIdAndRemove(req.params.id,(err,todo)=>{
        if(err){
           
            res.statusCode =404;
            res.send(err)
           
        }
        else{
            res.send(todo)
           
        }
     }) 
})
app.listen(5000,()=>{
    console.log("success server on port 3000");
})