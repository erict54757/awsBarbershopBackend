const router = require("express").Router();
const customerRoutes = require("./customer");
const employeeRoutes = require("./employee");
const appointmentRoutes = require("./appointment");
const nodeMailerRoutes = require("./nodeMailer");
const daysOffRoutes = require("./daysOff");

router.use("/customers",  customerRoutes);
router.use("/employees",  employeeRoutes);
router.use("/appointments",  appointmentRoutes);
router.use("/sendEmail",  nodeMailerRoutes);
router.use("/daysOff",  daysOffRoutes);

module.exports = router;
