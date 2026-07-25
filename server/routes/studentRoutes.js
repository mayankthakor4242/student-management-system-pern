const express = require("express");

const {
  addStudent,
  getStudents,
  getStudent,
  updateStudentData,
  removeStudent,
} = require("../controllers/studentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addStudent);
router.get("/", protect, getStudents);
router.get("/:id",protect,getStudent);
router.put("/:id",protect,updateStudentData);
router.delete("/:id",protect,removeStudent);

module.exports = router;