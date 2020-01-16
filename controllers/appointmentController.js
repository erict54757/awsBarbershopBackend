const db = require("../models");
const moment = require("moment");
module.exports = {
  create: async function (req, res) {

    something = req.body.time.split(",")

    checkIfAppointment = await db.Appointment.findOne({ where: { slot: { $in: something }, date: req.body.date, EmployeeId: req.body.employeeId } })

    if (!checkIfAppointment) {
      mappedAppointments = something.map(x => {
        return { date: req.body.date, slot: x, EmployeeId: req.body.employeeId, CustomerId: customerExists.id }
      })
      Appointment = await db.Appointment.bulkCreate
        (mappedAppointments)

      return res.json({ status: "success", email: req.body.email })
    } else { return res.json({ status: "error", email: req.body.email }) }
  },
  findAll: async function (req, res) {
    var dates = {}
    for (let i = -7; i < 39; i++) {
      dates[moment().add(i, 'days').format("YYYY-MM-DD")] = []
    }
    findEmp = await db.Employee.findAll({ where: { isAdmin: false } })
    var apptObject = {}
    var newObj = {}
    await findEmp.forEach(element => {
      let id = JSON.parse(element.id)
      apptObject[id] = dates
      newObj = JSON.parse(JSON.stringify(apptObject));

    });
    console.log(apptObject)
    appts = await db.Appointment.findAll({
      include: [
     
        {
          model: db.Customer,
          attributes: ["first_name","last_name","phone","email","id"] 
        }
    ]
    }
    )
    console.log(appts)
    sortAppts = await appts.sort((a, b) => (a.slot - b.slot))

    await sortAppts.forEach(appointment => {

      if (apptObject[appointment.EmployeeId][appointment.date]) {
        // console.log(appointment.EmployeeId, appointment.date)

        newObj[appointment.EmployeeId][appointment.date].push(appointment)
      }
    });
    await res.json(newObj)


  },
  getById: async function (req, res) {
    var dates = {}
    for (let i = -7; i < 39; i++) {
      dates[moment().add(i, 'days').format("YYYY-MM-DD")] = []
    }
    findEmp = await db.Employee.findAll({ where: { isAdmin: false } })
    
    var apptObject = {}
    var newObj = {}
    await findEmp.forEach(element => {
      let id = JSON.parse(element.id)
      apptObject[id] = dates
      newObj = JSON.parse(JSON.stringify(apptObject));

    });
    appts = await db.Appointment.findAll({ where: { EmployeeId: req.params.id }, include: [
     
      {
        model: db.Customer,
        attributes: ["first_name","last_name","phone","email","id"] 
      }
  ] })  
    // appts = await db.Appointment.findAll({
    //   include: [
     
    //     {
    //       model: db.Customer,
    //       attributes: ["first_name","last_name","phone","email","id"] 
    //     }
    // ]
    // }
    // )
    sortAppts = await appts.sort((a, b) => (a.slot - b.slot))
    await sortAppts.forEach(appointment => {

      if (apptObject[appointment.EmployeeId][appointment.date]) {
        // console.log(appointment.EmployeeId, appointment.date)

        newObj[appointment.EmployeeId][appointment.date].push(appointment)
      }
    });
    await res.json(newObj)
  },
  // delete: function (req, res) {
  //   console.log("err0000000r")
  //   db.Appointment.destroy({ where: { id: req.params.id } })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => console.log("err0000000r"));
  // },
  deletePost: function (req, res) {
    console.log(req.body, "helllloooo")
    serviceArray = [...Array(req.body.service).keys()]
    slotValues = serviceArray.map(x => {
      return x + req.body.slot

    })

    db.Appointment.destroy({ where: { CustomerId: req.body.CustomerId, slot: slotValues, date: req.body.date, EmployeeId: req.body.EmployeeId } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },
  update: async function (req, res) {
    console.log(req.body)
    splitArrayTimes = await req.body.update.slot[0].split(",")
    console.log(splitArrayTimes)

    serviceArray = [...Array(req.body.initial.service).keys()]
    console.log("servicea array ", serviceArray)
    serviceInitial = await serviceArray.map(element => {
      return element + req.body.initial.slot
    })
    checkIfAppointment = await db.Appointment.findOne({
      where: {
        slot: { $in: splitArrayTimes }, CustomerId: { $ne: req.body.initial.CustomerId },
        date: req.body.date, EmployeeId: req.body.employeeId ,
      }
    })
    if (!checkIfAppointment) {
      await db.Appointment.destroy({ where: { CustomerId: req.body.initial.CustomerId, slot: serviceInitial } })
      newApptUpdate = await splitArrayTimes.map(x => {
        return {
          date: req.body.update.date,
          slot: parseInt(x),
          service: req.body.update.service,
          CustomerId: req.body.update.CustomerId,
          EmployeeId: req.body.update.EmployeeId
        }

      })
      try {
        makeNewAppt = await db.Appointment.bulkCreate(newApptUpdate)
        return res.json("Success")
      }
      catch (err) { res.json("error") }
    } else {
      return res.json("error")
    }




    //       var promises = [];
    // splitArrayTimes.forEach(function(user,index){
    //    promises.push(db.Appointment.update({slot:user,date:req.body.date},{where : {id:(parseInt(req.params.id)+index)}}))
    // });
    // Promise.all(promises).then(function(){
    //     // success
    // }, function(err){
    //     // error
    // });
  },
};
