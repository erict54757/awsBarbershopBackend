const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");

// "/api/employees"
router
  .route("/")
  .post(employeeController.create)
  .get(employeeController.findAll);

// "/api/employees/:id"
router
  .route("/:id")
  .get(employeeController.findOne)
  .delete(employeeController.delete)
  .put(employeeController.update);

module.exports = router;
