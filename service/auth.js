const User = require("../models/user");

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
function setUser(user) {
  const payload = {
    id: user._id,
    role: user.role
  };
  return jwt.sign(payload, secret);
}
async function getUser(token) {
    if (!token) return null;
    try {
      const payload = jwt.verify(token, secret);
     const user = await User.findById(payload.id);
  return user;
  } catch (error) {
    return null
  }
 
}

module.exports = {
  getUser,
  setUser,
};
