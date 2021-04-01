const express = require('express')
const ejs = require('ejs')
const session = require('express-session')
const cookies = require('cookie-parser')
const app = express()

// set middleware
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:'your secret key.',
    resave:true,
    saveUninitialized:true
}))
app.use(cookies());

const userdata = {
    name:"",
    password:""
}
app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/form',(req,res)=>{
    res.render('form')
})

app.post('/form',(req,res)=>{
    const {username,password} = req.body
    req.session.name = username

    userdata.name = username;
    userdata.password = password;

    res.cookie('userdata',userdata)
    console.log(username);
    res.redirect('/dashboard')
})

app.get('/dashboard',(req,res)=>{
    
    res.send(req.cookies)
    // if (req.session.name) {
    //     res.render('dashboard',{
    //         username:req.session.name,
    //         userdata:res.cookie('userdata')
    //     })
    // }else{
    //     res.redirect('/form')
    // }
})

app.get('/logout',(req,res)=>{
    req.session.destroy()
    res.clearCookie('userdata')
    res.redirect('/')
})

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('server started...');
})
