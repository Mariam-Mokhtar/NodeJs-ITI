var express=require("express");
var router=new express.Router();
const CoursesController=require("../Controllers/courseController")


router.get("/",CoursesController.getAllCourses)
router.post("/create",CoursesController.addNewCourse)
router.get("/:id",CoursesController.getCourseById)
router.put("/:id",CoursesController.updateCourse)
router.delete("/:id",CoursesController.deleteCourse)
module.exports = router;