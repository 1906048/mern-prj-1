require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT || 8000
require("./db/conn")
const path = require("path")
const hbs = require("hbs")
const Reg = require("./models/registers")
const { log } = require("console")
const bcrypt = require("bcryptjs");

const static_path = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path))
app.set("view engine", "hbs")
app.set("views", template_path)
hbs.registerPartials(partials_path)

app.get("/", (req,res)=>{
       res.render("index")
})

app.get("/login", (req,res)=>{
    res.render("login")
})

app.get("/register", (req,res)=>{
    res.render("register")
})

app.post("/register", async (req,res)=>{
    try{
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        if(password === confirmpassword){
                
            const regData = new Reg({
                firstname : req.body.firstname, lastname:req.body.lastname , email:req.body.email, gender:req.body.gender ,
                phone: req.body.phone, password:req.body.password , confirmpassword:req.body.confirmpassword 
            })

            const token = await regData.generateAuthToken();
           
            const regDb = await regData.save();
            console.log("the page part "+ regData)
            res.status(201).render("index")
        }else{
            res.send("Passwords are not matching");
        }
    }catch(err){
          res.status(400).send(err)
    }
})
//login validation
app.post("/login", async (req,res)=>{
    try{
       const email = req.body.email;
       const password = req.body.password;



       const useremail = await Reg.findOne({email:email})
       const isMatch = bcrypt.compare(password, useremail.password)

       const token = await regData.generateAuthToken();
       
       if(isMatch){
           res.status(201).render("index")
       }
       else{
           res.send("Invalid details")
       }
    }catch(err){
        res.status(400).send("Invalid details")
    }
})


/*
const bcrypt = require("bcryptjs");
const securePassword = async (password) =>{
    const passwordHash =await bcrypt.hash(password,10)
    console.log(passwordHash)
    
    const passwordMatch =await bcrypt.compare(password,passwordHash)
    console.log(passwordMatch)

}

securePassword("thapa@123") */
app.listen(port,()=>{

})