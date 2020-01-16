const router = require("express").Router();
const daysOffController = require("../../controllers/daysOffController");

router
  .route("/")
// Customers can get days off only
  .get(daysOffController.findAll)


  

module.exports = router;
