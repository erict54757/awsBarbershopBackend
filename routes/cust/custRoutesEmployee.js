const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");

// "/api/employees"
router
  .route("/")

  .get(employeeController.findAllCust);



module.exports = router;
