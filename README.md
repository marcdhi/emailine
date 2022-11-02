
# Emailine - The Feedback Form

The only interface you need when it comes to sending emails..!!


## Setup

Step - 1 : Get into the CLI and..

```bash
 cd yourprojectDirectory/
```
Step - 2 : Now run npm init

```bash
npm init -y

```

Step - 3 : Install all the dependencies before starting the project

```bash
npm install express body-parser ejs mongoose nodemailer 
```

Step - 4 : Now create an javascript mail file

```bash
touch app.js
```

Step -5 : Setup a .env file

```bash
npm i dotenv
touch .env
```

Step - 6 : Start requiring all the installed dependencies

```bash
require("dotenv").config()

const express = require("express")

const bodyParser = require("body-parser")

const ejs = require("ejs")

const mongoose = require('mongoose')

const path = require("path")

```

Step - 7 : Start the express server

```bash
const app = express()
```

Step - 8 : Set/Use the following

```bash
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json())
```

Step - 9 : Listen on port 3000

```bash

app.listen(3000, function() {
    console.log("Server is running");
})

```


## Nodemailer

#### require nodemailer inside app.js

```bash
  const nodeMailer = require("nodemailer")
```




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`GMAIL_USER`

`PASSWORD`


## Demo


Emailine demo video: https://drive.google.com/file/d/1hDVnDgO0_lv1J56nGEysldC0EFzdgteB/view?usp=sharing

or

Youtube Link: https://youtu.be/1qZlITp2-r0


## Features

- Create Personalized Form 
- Check Status of the email
- Personal Dashboard 



