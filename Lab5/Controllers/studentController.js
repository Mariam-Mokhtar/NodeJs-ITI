const stdVaildation = require("../Utils/studentVaildation");
const studentModel = require("../Model/studentModel");

async function getAllStudents(req, res) {
    var AllData = await studentModel.find({});
    res.json(AllData);
}
function addNewStudent(req, res) {
    var newStudent = req.body;
    var vaild = stdVaildation(newStudent);
    if (vaild) {
        newStudent = new studentModel(newStudent)
        newStudent.save();
        res.send("Add Sucessfully")
    }
    else {
        res.send("Not Comptaible data")
    }
}
async function getStudentById(req, res) {
    var id = req.params.id;
    var student= await studentModel.findById(id);
    res.json(student)
}
async function updateStudent(req, res) {
    var std_id = req.params.id;
    var student = req.body;
    var vaild = stdVaildation(student);
    if (vaild) {
        student["_id"]=std_id;
        student = new studentModel(student);
        await studentModel.replaceOne({_id:std_id},student);
        res.send("updated Sucessfully")
    }
    else {
        res.send("Not Comptaible data")

    }
}
async function deleteStudent(req, res) {
    var id = req.params.id;
    await studentModel.findByIdAndDelete(id);
    res.send("removed Sucessfully")
}

module.exports = {
    getAllStudents,
    addNewStudent,
    getStudentById,
    updateStudent,
    deleteStudent
}