require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const PORT = 9000;
const cors = require('cors');
const fs = require('fs');
const app = express();
const https = require("https");
const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 'pass'
};

const server = https.createServer(options, app);
const socketIo = require("socket.io");
var io =socketIo(server);
const SocketManager= require("./SocketManager")
const db = require("./models");
const passport = require("./utils/passport");
const routes = require("./routes");
const bcrypt = require('bcrypt');

// allow any origin for cors policy
app.use(cors());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  
  res.status(404).send("you got it!");

  

}

// Define middleware here
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.post("/login", async (req, res) => {
  const { email, password, type } = req.body;

  switch (type) {
    case "customer": {
    await  db.Customer.findOne({ where: { email } })
        .then(async user => {
          console.log(user.account_key)
          console.log(password)
         const match = await bcrypt.compare(password, user.account_key); 
         if (!user)
            return res.status(401).json({
              success: false,
              msg: "Authentication failed. Not a User"
            });
            console.log("hello")
            console.log(match)
         if (match) {
            const token = jwt.sign(user.toJSON(), process.env.CHAT_JWT_SECRET);
            res.json({
              success: true,
              token: "CJWT " + token,
              name: user.first_name,
              id: user.id,
              isEmp: false,
              isCust: true
            });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong Password"
            });
          }
        })
        .catch(err => console.log(err));
    }

    case "employee": {
    await  db.Employee.findOne({ where: { email } })
        .then(async user  => {
          const match = await bcrypt.compare(password, user.account_key); 
          if (!user)
            return res.status(401).json({
              success: false,
              msg: "Authentication failed. Not a User"
            });

          if (match) {
            const token = jwt.sign(user.toJSON(), process.env.CHAT_JWT_SECRET);
            res.json({
              success: true,
              token: "EJWT " + token,
              name: user.first_name,
              id: user.id,
              isEmp: true,
              isCust: false
            });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong Password"
            });
          }
        })
        .catch(err => console.log(err));
    }
  }
});
 server.listen(PORT, function() {
      console.log(`🌎 ==> Server now on port ${PORT}!`);
    });
io.on('connection',SocketManager);

// Define API routes here (this is using express.Router)
app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.status(404).send("you got it!");
});


let syncOptions = { force: false };
   
db.sequelize
  .sync(syncOptions)
  .then(() => {
   

 
  })
  .catch(err => console.log(err));