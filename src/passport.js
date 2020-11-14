const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "banger_co",
});


function initialize(passport){
    const authenticateUser = (email, password, done) => {
        const user = getUserByEmail(email)
        if(user == null){
            return done(null, false, {message: "No user with that email"})
        }

        try{
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            }
            else{
                return done(null, false, {message: "Password Incorrect"})
            }
        }catch(e){
            return donr(e)
        }
    }

    passport.use(new localStrategy({ usernameField: 'email'}),
    authenticateUser)
    
    passport.serializeUser((user, done) => {})
    passport.deserializeUser((id, done) => {})
}

module.exports = initialize