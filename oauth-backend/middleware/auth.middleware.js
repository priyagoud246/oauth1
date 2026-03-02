
export const isAuthenticated = (req, res, next) => {
  // Passport.js automatically adds the .isAuthenticated() method to the request
  if (req.isAuthenticated()) {
    return next();
  }
  
  // If the user is not logged in, send a 401 error
  res.status(401).json({ 
    success: false, 
    message: "Unauthorized: Please login with Google first" 
  });
};