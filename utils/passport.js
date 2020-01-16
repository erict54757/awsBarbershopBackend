require("dotenv").config();
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const db = require("../models");

passport.use(

  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("token"),
      secretOrKey: process.env.CHAT_JWT_SECRET
    },
    function async (jwt_payload, done) {  
    
   
    
          db.Employee.findOne({ where: { id: jwt_payload.id } }) 
            .then(user => {
              if (!user) return done(null, false);

              return done(null, user);
            })
            .catch(err => done(err, false));
        
      
    }
  )
);

module.exports = passport;
