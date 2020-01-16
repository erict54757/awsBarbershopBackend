const router = require("express").Router();
const custRoutesAppt = require("./custRoutesAppt");
const custRoutesDaysOff = require("./custRoutesDaysOff");
const custRoutesEmployee = require("./custRoutesEmployee");
const custRoutesNodeMailer = require("./custRoutesNodeMailer");
const custRoutesCust = require("./custRoutesCust");


router.use("/custNoSign", custRoutesCust);
router.use("/custAppt",  custRoutesAppt);
router.use("/custDaysOff",  custRoutesDaysOff);
router.use("/custEmployee",  custRoutesEmployee);
router.use("/custNodeMailer",  custRoutesNodeMailer);


module.exports = router;