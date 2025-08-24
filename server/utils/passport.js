import bcryptjs from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/User.js";
import { Family } from "../models/Family.js";
import dotenv from "dotenv";
// Load environment variables
dotenv.config();    
// Configure Passport.js to use the local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    }, async (email, password, done) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }
        // Check if the password is correct
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }
        // If the user is found and the password is correct, return the user
        return done(null, user);
    } catch (error) {
        return done(error);
    }   
}));
// Serialize user into the sessions 
passport.serializeUser((user, done) => {
    done(null, user.id);
});
// Deserialize user from the sessions
passport.deserializeUser(async (id, done) => {  
    try {
        const user = await User.findById(id).populate('family');
        done(null, user);
    } catch (error) {
        done(error);
    } 
}); 
// Export the configured passport instance
const configuredPassport = passport;
export default configuredPassport;