const router = require("express").Router();
const daysOffController = require("../../controllers/daysOffController");

router
  .route("/")
  .post(daysOffController.create)
  .get(daysOffController.findAll)

// "/api/daysOffs/:id"
router
  .route("/:id")
  .delete(daysOffController.delete)
  .put(daysOffController.update)
  

module.exports = router;
