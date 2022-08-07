module.exports = {
  isAuthenticated: (req, res, next) => {
    if (!req.session.user) {
      res.redirect("/users/login");
      return;
    }

    next();
  },
};
