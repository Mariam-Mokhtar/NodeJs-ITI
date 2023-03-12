const courseVaildation = require("../Utils/coursesVaildation");
const courseModel = require("../Model/coursesModel");

async function getAllCourses(req, res) {
    var AllData = await courseModel.find({});
    res.json(AllData);
}
function addNewCourse(req, res) {
    var newCourse = req.body;
    var vaild = courseVaildation(newCourse);
    if (vaild) {
        newCourse = new courseModel(newCourse)
        newCourse.save();
        res.send("Add Sucessfully")
    }
    else {
        res.send("Not Comptaible data")
    }
}
async function getCourseById(req, res) {
    var id = req.params.id;
    var course= await courseModel.findById(id);
    res.json(course)
}
async function updateCourse(req, res) {
    var c_id = req.params.id;
    var course = req.body;
    var vaild = courseVaildation(course);
    if (vaild) {
        course["_id"]=c_id;
        course = new courseModel(course);
        await courseModel.replaceOne({_id:c_id},course);
        res.send("updated Sucessfully")
    }
    else {
        res.send("Not Comptaible data")

    }
}
async function deleteCourse(req, res) {
    var id = req.params.id;
    await courseModel.findByIdAndDelete(id);
    res.send("removed Sucessfully")
}

module.exports = {
    getAllCourses,
    addNewCourse,
    getCourseById,
    updateCourse,
    deleteCourse
}