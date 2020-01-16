const router = require("express").Router();
const customerController = require("../../controllers/customerController");

router
  .route("/")
  .post(customerController.create)
  .get(customerController.findAll);
  router
  .route("/noSign")
  .post(customerController.createNoSign)
  
  router
  .route("/where/findCustComments/:id")
  .get(customerController.findCustComments)
  .put(customerController.saveCustComments);
  

  router
  .route("/where/:id")
  .get(customerController.findOne);
  router
  .route("/all/where")
  .post(customerController.findAllWhere);

router.route("/:id").put(customerController.update);
module.exports = router;
