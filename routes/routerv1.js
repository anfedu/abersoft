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
  changeStatusCustomer,
  createWorker,
  deleteWorker,
  changeStatusWorker,
} = require("../controller/customer");

// authentication routes
router.post("/admin/auth/register", register);
router.post("/admin/auth/login", login);
router.post("/admin/auth/logout", logout);
router.post("/admin/auth/change-password", changePassword);
router.get("/admin/auth/profile/:id", readUser);

// routing customer
router.post("/admin/customer/add", auth, createCustomer);
router.get("/admin/customer", auth, readAllCustomer);
router.get("/admin/customer/:id", auth, readDetailCustomer);
router.post("/admin/customer/change-status", auth, changeStatusCustomer);
router.delete("/admin/customer/:id", auth, deleteCustomer);

// routing worker
router.post("/admin/customer/worker/add", auth, createWorker);
router.post("/admin/customer/worker/change-status", auth, changeStatusWorker);
router.delete("/admin/customer/worker/delete", auth, deleteWorker);

module.exports = router;
