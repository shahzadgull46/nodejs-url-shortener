const { getUser } = require("../service/auth");

async function checkForAuthentication(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return next();
  }
  const user = await getUser(token);
  if (!user) {
    return next();
  }
  req.user = user;
  return next();
}
function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login");
    }
   
    if (!roles.includes(req.user.role)) {
      return res.send("Unauthorized");
    }
    next();
  };
}

async function restrictToLoggedInUserOnly(req, res, next) {
  const token = req.cookies.token;
  const user = await getUser(token);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
  checkForAuthentication,
  restrictTo,
};
