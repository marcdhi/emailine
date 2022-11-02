//******************************FH******************************//


require("dotenv").config()
const express = require("express")
const nodeMailer = require("nodemailer")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require('mongoose')
const path = require("path")



const app = express()

app.set("view engine", "ejs")


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/feedDB")


const itemsSchema = {
    username: String,
    email: String,
    subject: String,
    message: String,
    rate: Number
}

const Item = new mongoose.model("Item", itemsSchema)




app.get("/", function(req, res) {
    res.render("index")
})


app.get("/feedback", function(req, res) {
    res.sendFile(__dirname + "/public/feedback1.html")
})


app.post("/", function(req, res) {

    res.redirect("/feedback")
})





app.post("/feedback", async function(req, res, next) {



    const { yourname, youremail, yoursubject, yourmessage, yourrate } = req.body





    async function mainMail(name, email, subject, message, rate) {

        const transporter = await nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.PASSWORD
            }
        })
        const mailOption = {
            from: req.body.email,
            to: process.env.GMAIL_USER,
            cc: req.body.email,
            subject: req.body.subject,
            html: `
            
            <p>You got a message from </p>
       <h3>Email : ${req.body.email}, </h3>
       <p>Name: ${req.body.name}, </p>
       <p>Message: ${req.body.message} </p>
       <p>Rating: ${req.body.rate} </p>
      
         
        `
        }


        // ***********CREATING A NEW MONGOOSE ITEM***************// 

        const item = new Item({
            username: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
            rate: req.body.rate
        })

        item.save(function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);


            }
        })






        // ***********************************************

        try {
            await transporter.sendMail(mailOption)
            return Promise.resolve("Message Sent Successfully!!")



        } catch (error) {
            return Promise.reject(error)
        }



    }






    try {
        await mainMail(yourname, youremail, yoursubject, yourmessage, yourrate)
        res.send("Message Successfully Sent!")


    } catch (error) {
        res.send("Message could not be sent")
        console.log(error);
    }









})






app.post("/dashboard", function(req, res) {

    // console.log(req.body.email);

    Item.findOne({}, function(err, foundName) {
        if (!err) {
            res.render("dashboard", { theirName: foundName.email, subject: foundName.subject, message: foundName.message, rating: foundName.rate })

        } else {
            console.log(err);
        }
    }).sort({ _id: -1 })


})







app.listen(3000, function() {
    console.log("Server is running");
})