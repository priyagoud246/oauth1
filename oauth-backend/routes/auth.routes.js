import express from "express";
import passport from "passport";
import { logout, getMe } from "../controllers/authControllers.js";
import { isAuthenticated } from "../middleware/auth.middleware.js"; 

const router = express.Router();

// Fallback to Netlify URL if process.env.CLIENT_URL is missing
const CLIENT_URL = process.env.CLIENT_URL || "https://oauth-fullstack.netlify.app";

router.get("/google", (req, res, next) => {
    console.log("Incoming request to /auth/google...");
    next();
}, passport.authenticate("google", { 
    scope: ["profile", "email"],
    prompt: "select_account"
}));

router.get("/google/callback", (req, res, next) => {
    console.log("🔄 Google redirected back to callback...");
    next();
},
  passport.authenticate("google", { 
    failureRedirect: `${CLIENT_URL}/login`, 
    session: true 
  }),
  (req, res) => {
    try {
        console.log(" Auth Successful! Sending user to Dashboard.");
        // Ensure there are no spaces in the URL
        res.redirect(`${CLIENT_URL}/dashboard`);
    } catch (error) {
        console.error(" Redirect Error:", error);
        res.status(500).send("Internal Server Error during redirect");
    }
  }
);

router.get("/me", isAuthenticated, getMe);

router.get("/logout", logout);

export default router;