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
        console.log("🔍 Google Profile ID:", profile.id);
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("No email found in Google profile"), null);
        }

        // 1. Check for existing user by googleId OR email
        let user = await User.findOne({ 
          $or: [{ googleId: profile.id }, { email: email }] 
        });

        if (user) {
          console.log("✅ Existing user found:", user.email);
          // Update googleId if they previously signed up via email only
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
          return done(null, user);
        }

        // 2. Create new user - MATCHING your User.js schema fields
        console.log("🆕 Creating new user for:", email);
        user = await User.create({
          googleId: profile.id,
          displayName: profile.displayName || "Google User", // CHANGED FROM 'name'
          email: email,
          image: profile.photos?.[0]?.value // Match the 'image' field in your model
        });
        
        return done(null, user);
      } catch (err) {
        // Detailed error log to catch validation or duplicate key issues
        console.error("❌ Passport Strategy Error:", err.message);
        return done(err, null);
      }
    }
  )
);

// Session logic
passport.serializeUser((user, done) => {
  // Convert _id to string for MongoDB session compatibility
  done(null, user._id.toString()); 
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