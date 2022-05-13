const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const { auth, authAdmin } = require("../middleware/auth");
const {
  register,
  login,
  changePassword,
  logout,
  readUsers,
  readUser,
  deleteUser,
  updateUser,
} = require("../controller/user");
const {
  readAllCountry,
  readDetailCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} = require("../controller/country");

// authentication routes
router.post("/admin/register", register);
router.post("/admin/login", login);
router.post("/admin/logout", logout);
router.post("/admin/change-password", changePassword);

// user routes
router.get("/user/:id", auth, readUser);
router.delete("/user/:id", auth, deleteUser);
router.get("/users", auth, readUsers);
router.patch("/user/:id", auth, fileUpload(), updateUser);

// routing country
router.get("/country", readAllCountry);
router.get("/country/:id", readDetailCountry);
router.post("/country", authAdmin, createCountry);
router.patch("/country/:id", authAdmin, updateCountry);
router.delete("/country/:id", authAdmin, deleteCountry);

module.exports = router;
