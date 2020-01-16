const router = require("express").Router();
const nodeMailerController = require("../../controllers/nodeMailerController");

router
  .route("/incoming")
  .post(nodeMailerController.incoming)

// "/api/nodeMailers/:id"
router
  .route("/confirmation")
  .post(nodeMailerController.confirmation)
  router
  .route("/confirmation/SignedIn")
  .post(nodeMailerController.confirmationSignedIn)


  router
  .route("/cancellation")
  .post(nodeMailerController.cancellation)
  

module.exports = router;
