const router = require("express").Router();
const appointmentController = require("../../controllers/appointmentController");

router
  .route("/")
  .post(appointmentController.create)
  .get(appointmentController.findAll)
.put(appointmentController.update)
// "/api/appointments/:id"

router
  .route("/:id")
  // .delete(appointmentController.delete)
  .post(appointmentController.deletePost)
  
  .get(appointmentController.getById);

module.exports = router;
