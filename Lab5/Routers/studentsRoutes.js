var express=require("express");
var router=new express.Router();
const StudentsController=require("../Controllers/studentController")


// get all students
router.get("/",StudentsController.getAllStudents)
// create student
router.post("/create",StudentsController.addNewStudent)
// get a student with id
router.get("/:id",StudentsController.getStudentById)
//update student
router.put("/:id",StudentsController.updateStudent)
//delete student
router.delete("/:id",StudentsController.deleteStudent)
module.exports = router;