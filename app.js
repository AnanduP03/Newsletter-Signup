const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const client = require("@mailchimp/mailchimp_marketing");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
client.setConfig({apiKey: "5f65bd92319cea6f6e784545fb040f82-us21",  server: "us21",});

app.post("/",function(req,res){
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;


    const subscribingUser = {
        firstName: firstName, 
        lastName: lastName, 
        email: email
    };
    const run = async () => {
        try{
            const response = await client.lists.addListMember("4caa8b0f45", {
                email_address: subscribingUser.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: subscribingUser.firstName,
                    LNAME: subscribingUser.lastName
                }
            });
            console.log(response); // (optional) 
            res.sendFile(__dirname+"/success.html");
        }
        catch(err){
            console.log(err.status);
            res.sendFile(__dirname+"/failure.html")
        }
    };
    run();
    // console.log(firstName,lastName,email);
});

function load(file){
    document.getElementById('goBack').innerHTML='<object type="text/html" data="signup.html"></object>';
}

// app.get("/failure",function(req,res){
//     res.redirect("signup.html");
// });

// app.use((req, res, next) => {
//     res.status(404).sendFile(__dirname+"/404.html");
// });

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server started");
});


// API KEY
// 5f65bd92319cea6f6e784545fb040f82-us21

// List id
// 4caa8b0f45