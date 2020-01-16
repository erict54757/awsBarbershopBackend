const db = require("../models");
const mailer = require("./nodeMailerController")
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  create: function (req, res) {
    bcrypt.hash(req.body.account_key, saltRounds, function (err, hash) {
      req.body.account_key = hash

      db.Customer.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.json(err));
    });
  },
  createNoSign: async function (req, res) {


    customerExists = await db.Customer.findOne({ where: { phone: req.body.phoneNumber } })

    if (!customerExists) {
      try {

        hashPass = await bcrypt.hash(req.body.account_key, saltRounds, async function (err, hash) {
          req.body.account_key = hash
          customer = await db.Customer.create
            ({ first_name: req.body.firstName, last_name:req.body.lastName,email: req.body.email, phone: req.body.phoneNumber, account_key: hash })
          slotValuesArray = req.body.time.split(",")
          // console.log(slotValuesArray.length + "checkcheck")

          // console.log(slotValuesArray + "in the loop")
          checkIfAppointment = await db.Appointment.findOne({ where: { slot: { $in: slotValuesArray }, date: req.body.date, EmployeeId: req.body.employeeId } })
          // console.log(checkIfAppointment, "checkinnnnnnnnn")
          // console.log("36000000000")
          if (!checkIfAppointment) {
            mappedAppointments = slotValuesArray.map(x => {
              return { date: req.body.date, slot: parseInt(x), service: req.body.service, EmployeeId: req.body.employeeId, CustomerId: customer.id }
            })
            // console.log(mappedAppointments)
            Appointment = await db.Appointment.bulkCreate(mappedAppointments)


            mailConfirmation = await mailer.confirmation({
              body: {
                email: req.body.email,
                date: req.body.date,
                service: req.body.service,
                slot: slotValuesArray,
                CustomerId: customer.id,
                EmployeeId: req.body.employeeId
              }
            })
            apptCust=[]
            gatheredAppt=await Appointment.forEach(appt => {
             
                // var appt =Object.assign(appt,customer)
                appt2 = JSON.parse(JSON.stringify(appt));
                appt2["Customer"]=JSON.parse(JSON.stringify(customer))
                apptCust.push(appt2)
                // let id = JSON.parse(element.id)
                // apptObject[id] = dates
                // newObj = JSON.parse(JSON.stringify(apptObject));
            
       
      })
            return res.json({ status: "success", email: req.body.email, apptCust})
          } else { return res.json({ status: "error", email: req.body.email }) }
        })

      }
      catch (err) {
        return res.json(err)
      }

    } else {

      slotValuesArray = req.body.time.split(",")
      // console.log(slotValuesArray.length + "check456")

      // console.log(slotValuesArray + "in the loop")
      checkIfAppointment = await db.Appointment.findOne({ where: { slot: { $in: slotValuesArray }, date: req.body.date, EmployeeId: req.body.employeeId } })
      console.log(checkIfAppointment, "checkinjkjklkjjjn")
      // console.log("36")
      // console.log(customerExists, "cust exist")
      if (!checkIfAppointment) {
        mappedAppointments =  slotValuesArray.map(x => {
          return { date: req.body.date, slot: x, service: req.body.service, EmployeeId: req.body.employeeId, CustomerId: customerExists.id }
        })
        // console.log(mappedAppointments)
        try{
        Appointment = await db.Appointment.bulkCreate(mappedAppointments);
}catch(err){res.json("error ")}
try{
        mailConfirmation = await mailer.confirmation({
          body: {
            email: req.body.email,
            service: req.body.service,
            date: req.body.date,
            slot: slotValuesArray,
            CustomerId: customerExists.id,
            EmployeeId: req.body.employeeId
          }
        })
      }catch(err){res.json("error")}
      // let apptReturn= Appointment["customer"]=customer
      apptCust=[]
     gatheredAppt=await Appointment.forEach(appt => {
      
      // var appt =Object.assign(appt,customerExists)
      appt2 = JSON.parse(JSON.stringify(appt));
      appt2["Customer"]=JSON.parse(JSON.stringify(customerExists))
      apptCust.push(appt2)
      
 
})
    //  let gatheredAppt= Object.assign(Appointment, {Customer: customerExists});
        return res.json({ status: "success", email: req.body.email,apptCust})
      } else { return res.json({ status: "error", email: req.body.email }) }

    }

  },
  findAll: function (req, res) {
    db.Customer.findAll()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },
  findAllWhere: function (req, res) {
    db.Customer.findAll({ where: { id: req.body } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },
  findCustComments: function (req, res) {
    db.Customer.findOne({ where: { id: req.params.id } })
      .then(dbModel => res.json(dbModel.comments))
      .catch(err => res.json(err));
  },
  saveCustComments: function (req, res) {
    db.Customer.update(req.body, { where: { id: req.params.id } })
      .then(dbModel => res.json("success"))
      .catch(err => res.json("error"));
  },
  findOne: function (req, res) {
    db.Customer.findOne({ where: { id: req.params.id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },
  delete: function (req, res) {
    db.Customer.destroy({ where: { id: req.params.id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },
  update: function (req, res) {
    db.Customer.update(req.body, { where: { id: req.params.id } })
      .then(dbModel => res.json("success"))
      .catch(err => res.json("error"));
  }
};
