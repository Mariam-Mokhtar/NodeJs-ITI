const Ajv=require("ajv")
const ajv = new Ajv()

const studentSchema = {
    type: "object",
    properties: {
        name:{type:"string",pattern:"^[a-zA-Z]+$"},
        dept:{type:"string", enum:["SD","UI","SW","AI"]}
    },
    required: ["name","dept"],
    additionalProperties: false
}

var stdVaildation=ajv.compile(studentSchema);

module.exports=stdVaildation;