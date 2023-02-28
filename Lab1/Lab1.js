const http = require("http");
const fs = require('fs');

http.createServer((req, res) => {
    let content;
    if (req.url != "/favicon.ico") {
        let data = req.url.split("/");
        let invaild = false;
        console.log(data.length)
        if (data.length >= 4) {
            let opt = data[1];
            let numbers = [];
            let result = 0;
            for (let i = 2; i < data.length; i++) {
                numbers.push(parseInt(data[i]));
            }
            if (opt != "" && !numbers.includes("NAN")) {
                switch (opt.toLowerCase()) {
                    case "add":
                        {
                            for (let num of numbers) {
                                result += num;
                            }
                        }
                        break;
                    case "sub":
                        {
                            for (let num of numbers) {
                                result = Math.abs(result - num);
                            }
                        }
                        break;
                    case "mul":
                        {
                            result = 1;
                            for (let num of numbers) {
                                result = result * num;
                            }
                        }
                        break;
                    case "div":
                        {
                            var first_iteration = true;
                            for (let num of numbers) {
                                if (first_iteration) {
                                    result = num / 1;
                                    first_iteration = false;
                                }
                                else {
                                    result = result / num
                                }
                            }
                        }
                        break;
                    default:
                        invaild = true;
                }
            }
            res.writeHead(200, { "content-type": "text/html" })
            if (invaild) {
                content = `<h1>Hello at my Server<h1> 
                please enter a vaild opt add,mul,sub or div`
            } else {
                content = `<h1>Hello at my Server<h1> 
                Result of ${opt} operation is ${result}`;
                fs.appendFile('result.txt', `\nResult of ${opt} operation is ${result}`, err => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("file written successfully");
                    }
                });
            }
        } else {
            content = `<h1>Hello at my Server<h1> 
            please enter url ex:opt/n1/n2/..`
        }
    }
    res.end(content)
})
    .listen("7000",
        () => {
            console.log("Lisining on Port 7000")
        }
    )
