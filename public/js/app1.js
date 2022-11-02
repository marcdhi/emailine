// const { name } = require("ejs")

// const { name } = require("ejs")

const feedbackForm = document.querySelector(".feedback-form")
let name = document.getElementById("name")
let email = document.getElementById("email")
let subject = document.getElementById("subject")
let message = document.getElementById("message")
let rate = document.getElementById("rate")



feedbackForm.addEventListener("submit", function(e) {
    e.preventDefault()

    let formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
        rate: rate.value
    }

    let xhr = new XMLHttpRequest()
    xhr.open("POST", "/feedback")
    xhr.setRequestHeader("content-type", "application/json")
    xhr.onload = function() {
        console.log(xhr.responseText);
        if (xhr.responseText == "Message Successfully Sent!") {
            alert("Email Sent, Click on Check Status to check status!")
            name.value = ''
            email.value = ''
            subject.value = ''
            message.value = ''
            rate.value = ''



        } else {
            console.log("Something went wrong");
        }
    }

    xhr.send(JSON.stringify(formData))


})


// myapp