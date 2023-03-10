var inputs = document.getElementsByClassName("form-control required");
var nameAlert = document.getElementById("nameAlert");
var show_pass = document.querySelectorAll(".show_pass i");
var regex;
var vaildForm = false;
var form = document.querySelector("form");
var inputsArray = Object.values(inputs);
var usersArray;

console.log(inputs)
var patterns = {
    username: /^[a-z\d]{5,12}$/i,
    email: /^([\w\.-]+)@([a-z\d]+)\.([a-z]{3,5})(\.[a-z]{2,5})?$/, //yourname @ domain.com(.uk)
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[@!#%&_])[\w@!#%&]{8,}$/,
    telephone:/^(\+\d{2}\s)?\(?\d{3}\)?([\s])?\d{3}([\s])?\d{4}$/
}

function validate(field, pattern) {
    var text = document.querySelector(`#${field.parentElement.id}+div`);
    if (pattern.test(field.value)) {
        text.classList.add("d-none");
        field.classList.remove("is-invalid")
        field.classList.add("is-valid")
        if (field.id === "password") {
            document.getElementById("repeatedPassword").disabled = false;
        }
    }
    else {
        text.classList.remove("d-none");
        field.classList.add("is-invalid")
        field.classList.remove("is-valid")
        if (field.id === "password") {
            document.getElementById("repeatedPassword").disabled = true;
        }
    }
}

for (var input of inputs) {
    input.addEventListener('keyup', (e) => {
        if (e.target.attributes.name.value == "repeatedPassword") {
            validate(e.target, regex);
        } else {
            validate(e.target, patterns[e.target.attributes.name.value]);
            if (e.target.attributes.name.value == "password") {
                vaildatePassStyle(e.target.value)
                regex = new RegExp(`${e.target.value}`);
            }
        }
    });
}

// show password 
for (var show_elem of show_pass) {
    show_elem.addEventListener('click', (e) => {
        var pass = e.target.parentElement.previousElementSibling
        if (pass.type === "password") {
            e.target.classList.replace("bi-eye-slash-fill", "bi-eye-fill")
            pass.type = "text";
        } else {
            e.target.classList.replace("bi-eye-fill", "bi-eye-slash-fill")
            pass.type = "password";
        }
    });
}
function vaildatePassStyle(pass) {
    if (containsUppercase(pass)) {
        replace(".big-letter", true)
    }
    else {
        replace(".big-letter", false)
    }
    if (containsSpecialChar(pass)) {
        replace(".special-char", true)
    } else {
        replace(".special-char", false)
    }
    if (containsDigit(pass)) {
        replace(".num", true)
    } else {
        replace(".num", false)
    }
    if (pass.length >= 8) {
        replace(".leng", true)
    }
    else {
        replace(".leng", false)
    }
}
function containsUppercase(str) {
    return /[A-Z]/.test(str);
}
function containsSpecialChar(str) {
    return /[@!#%&_]/.test(str);
}
function containsDigit(str) {
    return /[\d]/.test(str);
}
function replace(elementClass, vaild) {
    var icon = document.querySelector(`${elementClass} i`);
    var text = document.querySelector(elementClass);
    if (vaild) {
        icon.classList.replace("bi-x-circle", "bi-check-circle")
        text.classList.replace("text-danger", "text-success")
    }
    else {
        icon.classList.replace("bi-check-circle","bi-x-circle")
        text.classList.replace("text-success", "text-danger")
    }
}
form.addEventListener("submit", (e) => {
    if (!inputsArray.every(checkVaildate)) {
        e.preventDefault();
    }
})
function checkVaildate(element) {
    return element.classList.contains("is-valid");
}
