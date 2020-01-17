const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const custRoutes=require("./cust")
const Passport = require("../utils/passport");

// cust routes
router.use("/cust",custRoutes)
// API Routes
router.use("/api", Passport.authenticate('jwt', {session: false}), apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.status(404).send("you got it!")});


module.exports = router;
