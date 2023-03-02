const http = require("http");
const fs = require('fs');

let icons = fs.readFileSync("../bootstrap-icons-1.3.0/bootstrap-icons-1.3.0/bootstrap-icons.css").toString();
let icons_fonts = fs.readFileSync("../bootstrap-icons-1.3.0/bootstrap-icons-1.3.0/fonts/bootstrap-icons.woff2");
let icons_fonts2 = fs.readFileSync("../bootstrap-icons-1.3.0/bootstrap-icons-1.3.0/fonts/bootstrap-icons.woff");

let myIcon = fs.readFileSync("../images/favicon.ico");

let MainFileHTML = fs.readFileSync("../clientSide/Main.html").toString();
let MainFileCSS = fs.readFileSync("../clientSide/style.css").toString();
let MainBootstrapCss = fs.readFileSync("../bootstrap-5.3.0-alpha1-dist/bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css").toString();
let MainFileJS = fs.readFileSync("../clientSide/script.js").toString();
let MainBootstrapJs = fs.readFileSync("../bootstrap-5.3.0-alpha1-dist/bootstrap-5.3.0-alpha1-dist/js/bootstrap.min.js").toString();
let profileHTML;
let profile_all_user_js = fs.readFileSync("../clientSide/allUser.js").toString();
let file;
let users_arr = [];
http.createServer((req, res) => {
    if (req.method == "GET") {
        console.log(req.url);
        switch (req.url) {
            //#region main
            case "/main.html":
                res.writeHead(200, "Ok", { "content-type": "text/html" })
                res.write(MainFileHTML)
                break

            case "/welcome.html":
                res.writeHead(200, "Ok", { "content-type": "text/html" })
                res.write(profileHTML);
                break;

            case "/style.css":
                res.writeHead(200, "Ok", { "content-type": "text/css" })
                res.write(MainFileCSS)
                break

            case "/bootstrap-5.3.0-alpha1-dist/bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css":
                res.writeHead(200, "Ok", { "content-type": "text/css" })
                res.write(MainBootstrapCss)
                break
            case "/bootstrap-icons-1.3.0/bootstrap-icons-1.3.0/fonts/bootstrap-icons.woff2?4601c71fb26c9277391ec80789bfde9c":
                res.writeHead(200, "Ok", { "content-type": "font/woff2" })
                res.write(icons_fonts)
                break
            case "/bootstrap-icons-1.3.0/bootstrap-icons-1.3.0/fonts/bootstrap-icons.woff?4601c71fb26c9277391ec80789bfde9c":
                res.writeHead(200, "Ok", { "content-type": "font/woff" })
                res.write(icons_fonts2)
                break
            case "/script.js":
                res.writeHead(200, "Ok", { "content-type": "text/javascript" })
                res.write(MainFileJS)
                break

            case "/bootstrap-5.3.0-alpha1-dist/bootstrap-5.3.0-alpha1-dist/js/bootstrap.min.js":
                res.writeHead(200, "Ok", { "content-type": "text/javascript" })
                res.write(MainBootstrapJs)
                break
            case "/bootstrap-icons-1.3.0/bootstrap-icons-1.3.0/bootstrap-icons.css":
                res.writeHead(200, "Ok", { "content-type": "text/css" })
                res.write(icons)
                break
            case "/allUser.js":
                res.writeHead(200, "Ok", { "content-type": "text/javascript" })
                res.write(profile_all_user_js)
                break
            case "/Files/users.json":
                res.writeHead(200, "ok", { "content-type": "application/json" })
                res.write(file)
                break;
            case "/favicon.ico":
                res.writeHead(200, "ok", { "content-type": "image/vnd.microsoft.icon" })
                res.write(myIcon)
                break;
            default:
                res.write("<h1>No Page Found</h1>")
                break;
            //#endregion 
        }
        res.end()
    }
    else if (req.method == "POST") {//url
        var user = {};
        req.on("data", (info) => {
            console.log(info.toString());
            var data = info.toString().split("&");
            for (let item of data) {
                var temp = item.split("=");
                if (temp[0] == "password" || temp[0] == "repeatedPassword") {
                    continue;
                }
                user[temp[0]] = decodeURIComponent(temp[1].replaceAll("+", " "))
            }
        })
        req.on("end", () => {
            profileHTML = fs.readFileSync("../clientSide/welcome.html").toString();
            profileHTML = profileHTML.replace("{username}", user.username).
                replace("{email}", user.email).
                replace("{telephone}", user.telephone).
                replace("{address}", user.address);
            //read array of users from a file 
            let readData = fs.readFileSync('../Files/users.json');
            users_arr = JSON.parse(readData);
            users_arr.push(user);
            // write new user
            fs.writeFileSync('../Files/users.json', JSON.stringify(users_arr));
            file = fs.readFileSync("../Files/users.json").toString();
            res.write(profileHTML);
            res.end();
        })
    }
})
    .listen("7000",
        () => {
            console.log("Lisining on Port 7000")
        }
    )
