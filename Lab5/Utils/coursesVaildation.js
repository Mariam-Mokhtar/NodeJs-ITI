const Ajv=require("ajv")
const ajv = new Ajv()

const coursesSchema = {
    type: "object",
    properties: {
        name:{type:"string",pattern:"^[a-zA-Z]+$"},
        grade:{type:"string", enum:["EX","VG","G","P","F"]}
    },
    required: ["name","grade"],
    additionalProperties: false
}

var courseVaildation=ajv.compile(coursesSchema);

module.exports=courseVaildation;