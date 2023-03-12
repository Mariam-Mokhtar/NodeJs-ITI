const mongoose=require("mongoose");
var DB_url="mongodb://localhost:27017/NodeJs";
mongoose.connect(DB_url,{useNewUrlParser:true});

var studentSchema = new mongoose.Schema({
        name:{type: String, pattern:"^[a-zA-Z]+$",required:true},
        dept:{type: String, enum:["SD","UI","SW","AI"],required:true}
});

module.exports = mongoose.model("students",studentSchema);