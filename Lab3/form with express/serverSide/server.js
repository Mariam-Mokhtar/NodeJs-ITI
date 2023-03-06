const express = require("express");
const path = require("path")
const app = express();
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var profileHTML;
function fullPath(urPath) {
    return path.join(__dirname, urPath);
}
let PORT = process.env.PORT || "7003";


app.get("/main.html", (req, res) => {
    res.sendFile(fullPath("../clientSide/main.html"));
});
app.get("/script.js", (req, res) => {
    res.sendFile(fullPath("../clientSide/script.js"));
});
app.get("/style.css", (req, res) => {
    res.sendFile(fullPath("../clientSide/style.css"));
});

app.get("/welcome.html", (req, res) => {
    res.sendFile(fullPath("../clientSide/welcome.html"));
});

app.get("/allUser.js", (req, res) => {
    res.sendFile(fullPath("../clientSide/allUser.js"));
});
app.get("/Files/users.json", (req, res) => {
    res.sendFile(fullPath("../Files/users.json"));
});
app.get("/images/favicon.ico", (req, res) => {
    res.send(fullPath("../images/favicon.ico"));
});
app.all('*',(req,res)=>{
    res.send('<h1>Error 404 : Page Not Found</h1>')
});
app.post("/welcome.html", (req, res,next) => {
    var user = {
        username: decodeURIComponent(req.body.username.replaceAll("+", " ")),
        email: decodeURIComponent(req.body.email.replaceAll("+", " ")),
        telephone: decodeURIComponent(req.body.telephone.replaceAll("+", " ")),
        address: decodeURIComponent(req.body.address.replaceAll("+", " "))
    }
    profileHTML = fs.readFileSync("../clientSide/welcome.html").toString();
    profileHTML = profileHTML.replace("{username}", user.username).
        replace("{email}", user.email).
        replace("{telephone}", user.telephone).
        replace("{address}", user.address);

    var readData = fs.readFileSync('../Files/users.json');
    var users_arr = JSON.parse(readData);
    users_arr.push(user);
    // write new user
    fs.writeFileSync('../Files/users.json', JSON.stringify(users_arr));
    next();

},(req,res)=>{
    res.send(profileHTML);
});

/*Bootstrap Links */
app.get("/bootstrap-5.3.0-alpha1-dist/bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css", (req, res) => {
    res.sendFile(fullPath("../bootstrap-5.3.0-alpha1-dist/bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css"));
});
app.get("/bootstrap-5.3.0-alpha1-dist/bootstrap-5.3.0-alpha1-dist/js/bootstrap.min.js", (req, res) => {
    res.sendFile(fullPath("../bootstrap-5.3.0-alpha1-dist/bootstrap-5.3.0-alpha1-dist/js/bootstrap.min.js"));
});
app.get("/bootstrap-icons-1.3.0/bootstrap-icons-1.3.0/bootstrap-icons.css", (req, res) => {
    res.sendFile(fullPath("../bootstrap-icons-1.3.0/bootstrap-icons-1.3.0/bootstrap-icons.css"));
});
app.get("/bootstrap-icons-1.3.0/bootstrap-icons-1.3.0/fonts/bootstrap-icons.woff2?4601c71fb26c9277391ec80789bfde9c", (req, res) => {
    res.sendFile(fullPath("../bootstrap-icons-1.3.0/bootstrap-icons-1.3.0/fonts/bootstrap-icons.woff2"));
});
app.get("/bootstrap-icons-1.3.0/bootstrap-icons-1.3.0/fonts/bootstrap-icons.woff", (req, res) => {
    res.sendFile(fullPath("../bootstrap-icons-1.3.0/bootstrap-icons-1.3.0/fonts/bootstrap-icons.woff"));
});

app.listen(PORT, () => { console.log("http://localhost:" + PORT) })