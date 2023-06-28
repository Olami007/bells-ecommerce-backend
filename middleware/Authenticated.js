const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");

let verifyToken = async function middle(req, res, next) {
  let token = req.headers.token;
  if (!token) {
    // return res.status(404).json({ message: "Please login" });
    return res.status(404).json({ message: "Unauthorized" });
  } else {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await UserModel.findOne({ _id: decoded.id });

    try {
      if (user) {
        req.user = user;
        next();
        return;
      }
      //  else {
      //   return res.status(501).json({ message: "Unauthorized" });
      // }
    } catch (error) {
      return res.send(error);
    }
  }
};

module.exports = verifyToken;
