const express = require("express");
const bodyParser = require("body-parser");
//const request = require("request");
const https= require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); // used to include local image and css link to globalize for server use

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req,res){
  const name1=req.body.n1;
  const name2=req.body.n2;
  const email=req.body.n3;

  const data={
    members:[
      {// aray of object
        email_address:email,   //these are the data need to dend to the api from user in string format...same like n1 and email and all
        status:"subscribed",
        merge_fields:{
          FNAME:name1,
          LNAME:name2
        }
      }
    ]
  }
  const jsondata = JSON.stringify(data);
/////////////////////url section///////////////////////
  const url = "https://us20.api.mailchimp.com/3.0/lists/04a707dd1a";
  const options = {
    method:"POST",
    auth:"AkashJ:731d81c595d2e24bf1184ea34f9488ee-us20" // from https document
  }
//////////////////////////DATA REWRITING HERE/////////////////////
const request = https.request(url, options,function(response){
   var status= response.statusCode;
   console.log(status);
   if(status===200){
       res.sendFile(__dirname + "/success.html");
   }else{
     res.sendFile(__dirname + "/failure.html");
   }
    response.on("data", function(data) {
    console.log(JSON.parse(data));
    });
                                                 //https request function instead of getting from an url sending to api
});
request.write(jsondata);
request.end();

});

//failed case retry button logic/////

app.post("/failure.html",function(req,res){
res.redirect("/");
});

app.post("/success.html",function(req,res){
res.redirect("/");
});

app.listen(process.env.PORT||3000,function(){
  console.log("Started Server in Port 3000");

});
