//Importing Pkg
//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
// Intialising app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //Express Static

//Get Req
app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

//Post 
app.post("/", function (req,res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/bd8a59474b";
  const options = {
    method: "POST",
    auth: "subhasri:f8c2efa1fe7d1f111e85589f201144d9-us21"
  }
  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      }
      else{
        res.sendFile(__dirname +"/failure.html");
      }
    })
  })

  request.write(jsonData);
  request.end();
})

app.post("/failure",function (req, res) {
  res.sendFile(__dirname + "/signup.html");
})

// Server Starting
app.listen(3000, function(){
  console.log("Server running at port 3000");
});


//API Key
//f8c2efa1fe7d1f111e85589f201144d9-us21
//bd8a59474b