import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config(); 

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      proxy: true 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Profile received from Google:", profile.id);

        let user = await User.findOne({ 
          $or: [{ googleId: profile.id }, { email: profile.emails?.[0]?.value }] 
        });

        if (user) {
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
          return done(null, user);
        }

        // IMPORTANT: Ensure your User.js model has 'name' or 'displayName'
        // If your model uses 'displayName', change 'name:' to 'displayName:' below
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName || profile.name?.givenName || "Google User", 
          email: profile.emails?.[0]?.value
        });
        
        console.log("New User Created successfully");
        return done(null, user);
      } catch (err) {
        console.error("❌ Passport Strategy Error:", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id); 
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    console.error("❌ Deserialization Error:", err);
    done(err, null);
  }
});

export default passport;