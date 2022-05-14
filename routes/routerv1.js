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
  readAllCustomer,
  readDetailCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controller/customer");

// authentication routes
router.post("/admin/auth/register", register);
router.post("/admin/auth/login", login);
router.post("/admin/auth/logout", logout);
router.post("/admin/auth/change-password", changePassword);
router.get("/admin/auth/profile/:id", readUser);

// routing country
router.post("/admin/customer", auth, createCustomer);
router.get("/admin/customer", readAllCustomer);
router.get("/admin/customer/:id", readDetailCustomer);
router.patch("/admin/customer/:id", auth, updateCustomer);
router.delete("/admin/customer/:id", auth, deleteCustomer);

module.exports = router;
