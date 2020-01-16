const db = require("../models");
const moment = require("moment");

module.exports = {
  create: async function (req,res) {

  
    slotBegin = parseInt(req.body.slotBegin)
    slotEnd = parseInt(req.body.slotEnd)
    appointmentsAlready = await db.Appointment.findAll({ where: { date: req.body.date, EmployeeId: req.body.EmployeeId } })
    // console.log("appointmentAlready", appointmentsAlready[0].dataValues)
    let count = 1

    if (appointmentsAlready.length) {
      try {
        occupiedAppointments = await appointmentsAlready.map(appointment => {
          // console.log(appointment,count,appointment.service)
          if (count === 1) {
            count++
            if (count - 1 == appointment.service) { count = 1 }
            return {
              id:appointment.id,
              slot: appointment.slot,
              date: appointment.date,
              service: appointment.service,
              CustomerId: appointment.CustomerId,
              EmployeeId: appointment.EmployeeId
            }
          } else {
            if (count === appointment.service) { count = 1 }
            else { count++ } return null
          }

        })
        appointmentsWithin = await occupiedAppointments.reduce(function (accumulator, appointment) {
          console.log(appointment)
          if (appointment !== null && appointment.slot >= req.body.slotBegin && appointment.slot <= req.body.slotEnd) {
            accumulator.push(appointment)
          } return accumulator
        }, []);
        console.log("accum", appointmentsWithin[0])
        if (appointmentsWithin[0]!==undefined) {
          console.log("occupied", appointmentsWithin[0])
          return res.json(appointmentsWithin)
        }
        else {
  console.log("eles")
            await db.daysOff.create(req.body)
            return res.json(true)
    
        }
      } catch (err) { res.json("error 222222") }
    } else {
      try {
        await db.daysOff.create(req.body)
        return res.json(true)
      } catch (err) { res.json("error 1111") }
    }
  },

  findAll: async function (req, res) {
    try {
      daysOff = await db.daysOff.findAll()
      sorted = await daysOff.sort((a, b) => new Date(a.date) - new Date(b.date))

      return res.json(sorted)
    }
    catch (err) {
      res.json(err)
    }
  },

  delete: function (req, res) {
    db.daysOff.destroy({ where: { id: req.params.id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },
  update: function (req, res) {
    db.daysOff
      .update(req.body, { where: { id: req.params.id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
