const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Registration1", {
    useCreateIndex:true ,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection successful ")
}).catch((err)=>{
    console.log(err)
})