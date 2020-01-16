const router = require("express").Router();
const customerController = require("../../controllers/customerController");


  router
  .route("/noSign")
  .post(customerController.createNoSign)
  



module.exports = router;
