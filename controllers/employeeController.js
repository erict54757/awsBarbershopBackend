const db = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  create: function (req, res) {
    bcrypt.hash(req.body.account_key, saltRounds, function (err, hash) {
      req.body.account_key = hash
      db.Employee.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.json(err))
    });
  },
  findAll: async function (req, res) {
    try {
      employee = await db.Employee.findAll({ where: { isAdmin: false } })

      res.json(employee)
    } catch (err) { res.json(err) }
  },
  findAllCust: async function (req, res) {
    try {
      employees = await db.Employee.findAll({
        attributes: {exclude: ['phone',"account_key","street","city","zip","state","email"]}})
       employee= employees.filter(employee=>employee.isAdmin===false)

      res.json(employee)
    } catch (err) { res.json(err) }
  },
  findOne: function (req, res) {
    db.Employee.findOne({ where: { id: req.params.id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },
  delete: function (req, res) {

    db.Employee.destroy({ where: { id: req.params.id } })
      .then(dbModel => console.log(dbModel))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },
  update: async function (req, res) {
    // console.log(req.body)
    try{
    update =await db.Employee.update(req.body, { where: { id: req.params.id } })
    respond= await db.Employee.findOne({where:{id:req.params.id}})
    .then(dbModel=> res.json(dbModel))}
    catch (err){
      console.log(err)
    }
  },
};
