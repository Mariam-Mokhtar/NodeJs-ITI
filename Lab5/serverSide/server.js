
const express = require("express");
const app = express();
const path = require("path")
const StudentsRoutes = require("../Routers/studentsRoutes");
const CoursesRoutes = require("../Routers/coursesRoutes");
const generalMiddleware = require("../MiddleWare/logging");
let PORT = process.env.PORT || "7003";

//Middle Wares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//general middlw ware

app.use("*",generalMiddleware);
app.use("/api/students", StudentsRoutes);
app.use("/api/courses", CoursesRoutes);


app.listen(PORT, () => { console.log("http://localhost:" + PORT) })