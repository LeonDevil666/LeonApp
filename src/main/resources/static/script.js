console.log("JS запущен ✅");

// Навигация
function openLogin() {
    hideAll();
    document.getElementById("login").classList.remove("hidden");
}

function openRegister() {
    hideAll();
    document.getElementById("register").classList.remove("hidden");
}

function goHome() {
    hideAll();
    document.getElementById("main").classList.remove("hidden");
}

function hideAll() {
    document.getElementById("main").classList.add("hidden");
    document.getElementById("login").classList.add("hidden");
    document.getElementById("register").classList.add("hidden");
}

// ✅ LOGIN
function login() {
    document.getElementById("loginLoader").classList.remove("hidden");

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
    .then(async res => {
        const text = await res.text();

        if (!res.ok) throw new Error(text);

        let result;
        try {
            result = JSON.parse(text);
        } catch {
            result = { message: text };
        }

        localStorage.setItem("user", JSON.stringify(result));
        window.location.href = "dashboard.html";
    })
    .catch(err => {
        alert("Ошибка входа: " + err.message);
    })
    .finally(() => {
        document.getElementById("loginLoader").classList.add("hidden");
    });
}

// ✅ REGISTER
function register() {
    document.getElementById("registerLoader").classList.remove("hidden");

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
    .then(async res => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);

        alert("User was successfully registered");

        // ✅ ОЧИСТКА ВСЕХ ПОЛЕЙ ПОСЛЕ РЕГИСТРАЦИИ
        document.getElementById("name").value = "";
        document.getElementById("surname").value = "";
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("phoneNumber").value = "";

        // ✅ ВОЗВРАТ В МЕНЮ
        goHome();
    })
    .catch(err => {
        alert("Sign Up Error: " + err.message);
    })
    .finally(() => {
        document.getElementById("registerLoader").classList.add("hidden");
    });
}
