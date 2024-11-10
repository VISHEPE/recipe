module.exports = (req, res, next) => {
  if (req.session && req.session.userId) {
    console.log("User is authenticated:", req.session.userId); // Debug log
    next(); // User is logged in, proceed
  } else {
    console.log("User is not authenticated"); // Debug log
    res.redirect('/auth/login'); // Redirect if not authenticated
  }
};
