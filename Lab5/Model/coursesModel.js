const mongoose=require("mongoose");
var DB_url="mongodb://localhost:27017/NodeJs";
mongoose.connect(DB_url,{useNewUrlParser:true});

var courseSchema = new mongoose.Schema({
        name:{type: String, pattern:"^[a-zA-Z]+$",required:true},
        grade:{type: String, enum:["EX","VG","G","P","F"],required:true}
});

module.exports = mongoose.model("courses",courseSchema);