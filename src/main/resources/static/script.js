function showLogin() {
    document.getElementById("mainMenu").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
}

function showRegister() {
    document.getElementById("mainMenu").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
}

function back() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("mainMenu").classList.remove("hidden");
}


// ✅ LOGIN
function login() {
    const data = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
    };

    fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        alert("Successful login!");
        console.log(result);
    })
    .catch(err => {
        alert("Login error");
    });
}


// ✅ REGISTER
function register() {
    const data = {
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        phoneNumber: document.getElementById("phoneNumber").value
    };

    fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        alert("Registration successful!");
        console.log(result);
        back();
    })
    .catch(err => {
        alert("Error, User already exists");
    });
}
