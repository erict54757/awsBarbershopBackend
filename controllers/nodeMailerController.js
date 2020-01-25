const nodemailer = require("nodemailer");
const moment = require("moment");


module.exports = {
  incoming: function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    // console.log("hello", res.header)
    nodemailer.createTestAccount((err, account) => {
      const htmlEmail = `
      
      <img src="https://mighty-cliffs-91335.herokuapp.com/static/media/background2.3d0ad4b3.jpg">
        <h3 style={color:white}>Contact Details<h3>
        <ul>
        <li>${req.body.email}</li>
        <li>${req.body.subject}</li>
        <li>${req.body.phoneNumber}</li>
        </ul>
        <p>${req.body.message}</p>
        `
        // console.log(res.header)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'barbershoptesting@gmail.com',
          pass: 'qhpbeshyuawgyxcl'
        }
      });

      const mailOptions = {
        from: req.body.email, // sender address
        to: 'barbershoptesting@gmail.com', // list of receivers
        subject: 'req.body.subject', // Subject line
        text: "req.body.message",
        html: htmlEmail// plain text body
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log(err)
        }
      })

    })
    //  res.header("Access-Control-Allow-Origin", "*");  
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // console.log(res.header)
    return  res.json("success email incoming");
    // res.header("Access-Control-Allow-Origin", "*");  
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    
    },
  confirmation: function (req, res) {
    console.log(req.body,"emaillllll",req.body.slot[req.body.service-1])
    nodemailer.createTestAccount((err, account) => {
      const htmlEmail =
        `
      
        <img src="https://mighty-cliffs-91335.herokuapp.com/static/media/background2.3d0ad4b3.jpg">
        <h3 style={color:white}> <h3>Barber and Beard Appointment Confirmation<h3>
        
            <ul>

            <li>We have you booked on ${req.body.date} at the time of  ${moment().hour(9).minute(0).add(req.body.slot[0] / 4, 'hours').format('h:mm A')} to
            ${ moment().hour(9).minute(0).add((req.body.slot[req.body.service-1]/ 4)+.25 , 'hours').format('h:mm A')}.</li>

            <li>Visit us again at https://master.d1xorfpsynb8u9.amplifyapp.com/.</li>
          
            </ul>
            `
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'barbershoptesting@gmail.com',
          pass: 'qhpbeshyuawgyxcl'
        }
      });

      const mailOptions = {
        from: 'barbershoptesting@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Appointment Confirmation', // Subject line
        text: "confirmation",
        html: htmlEmail// plain text body
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log(err)
        }
      })
    })
    return
    //  res.json({status:"success",email:req.body.email})
  },
  confirmationSignedIn: function (req, res) {
    console.log(req.body)
    nodemailer.createTestAccount((err, account) => {
      const htmlEmail =
        `
        
        <img src="https://mighty-cliffs-91335.herokuapp.com/static/media/background2.3d0ad4b3.jpg">
        
        <h3>Barber and Beard Appointment Confirmation<h3>
            <ul>

            <li>We have you booked on ${req.body.date} at the time of  ${moment().hour(9).minute(0).add(req.body.slot[0] / 4, 'hours').format('h:mm A')} to
            ${ moment().hour(9).minute(0).add((req.body.slot[req.body.service-1]/ 4)+.25 , 'hours').format('h:mm A')}.</li>

            <li>Visit us again at https://master.d1xorfpsynb8u9.amplifyapp.com/.</li>
          
            </ul>
            `
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'barbershoptesting@gmail.com',
          pass: 'qhpbeshyuawgyxcl'
        }
      });

      const mailOptions = {
        from: 'barbershoptesting@gmail.com', // sender address
        to: "erict54757@gmail.com", // list of receivers
        subject: 'Appointment Confirmation', // Subject line
        text: "confirmation",
        html: htmlEmail// plain text body
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log(err)
        }
      })
    })
    return res.json({ status: "success", email: req.body.email })
  },

  cancellation: function (req, res) {
    console.log(req.body)
    nodemailer.createTestAccount((err, account) => {
      const htmlEmail = `
      
      <img src="https://mighty-cliffs-91335.herokuapp.com/static/media/background2.3d0ad4b3.jpg">

      
          <h3>Barber and Beard Appointment Cancellation<h3>
          <ul>
          <li>Your appointment on ${req.body.date} at the time of  ${req.body.time} to
          ${ moment(req.body.time, 'h:mm A').add((.25*req.body.service), 'hours').format('h:mm A')} has been cancelled. Book another appointment any time at https://mighty-cliffs-91335.herokuapp.com/</li>       
          </ul>
       
          `
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'barbershoptesting@gmail.com',
          pass: 'qhpbeshyuawgyxcl'
        }
      });
      console.log(req.body.email);

      const mailOptions = {
        from: 'barbershoptesting@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Appointment Cancellation', // Subject line
        text: "confirmation",
        html: htmlEmail// plain text body
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log(err)
        }
      })
    })
    return res.json("success email cancellation")
  }


}
