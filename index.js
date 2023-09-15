import express from "express";
import bodyParser from "body-parser";
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
// app.set("view engine", "ejs");
var task=["task"];
var completed=[];
app.get("/",(req,res)=>{
   res.render("index.ejs",{task:task,complete:completed});
});

app.post("/addtask",function(req,res){
   var newTask= req.body.newtask;
   task.push(newTask);
   res.redirect("/");
})

app.post("/complete",function(req,res){
    
    var complete=req.body.check;
    if(typeof complete==='string'){
        completed.push(complete);
        task.splice(task.indexOf(complete),1);
    }else if(typeof complete==='object'){
    for(var i=0;i<complete.length;i++){
        completed.push(complete[i]);
    }
    for(var i=0;i<complete.length;i++){
        task.splice(task.indexOf(complete[i]), 1);
    }
    }
    // console.log(complete)
    
    res.redirect("/");
});
app.post("/clear",function(req,res){
    task=[];
    completed=[];
    res.redirect("/");
})


app.listen(3000,()=>{
    console.log("server running on port 3000");
})
