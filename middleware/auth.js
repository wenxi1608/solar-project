module.exports = {
  isAuthenticated: (req, res, next) => {
    if (!req.session.user) {
      res.redirect("/login");
      return;
    }
    next();
  },

  setAuthUser: (req, res, next) => {
    if (req.session.user) {
      res.locals.authUser = req.session.user; // set authUser as a global variable accessible across ejs files
      res.locals.authUserFirstName = req.session.fname;
    } else {
      res.locals.authUser = null;
    }
    next();
  },
};
