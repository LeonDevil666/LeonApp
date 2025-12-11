console.log("JS запущен ✅");

// ==================== Навигация ====================

function openLogin() {
    hideAll();
    document.getElementById("login").classList.remove("hidden");
}

function openRegister() {
    hideAll();
    document.getElementById("register").classList.remove("hidden");
}

function openVerify() {
    hideAll();
    document.getElementById("verify").classList.remove("hidden");
}

function goHome() {
    hideAll();
    document.getElementById("main").classList.remove("hidden");
}

function hideAll() {
    document.getElementById("main").classList.add("hidden");
    document.getElementById("login").classList.add("hidden");
    document.getElementById("register").classList.add("hidden");
    document.getElementById("verify").classList.add("hidden");
}

// ==================== LOGIN ====================

function login() {
    document.getElementById("loginLoader").classList.remove("hidden");

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const data = { email, password };

    fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(async res => {
            const text = await res.text();

            // ❌ Если email не подтвержден
            if (text.includes("EMAIL_NOT_VERIFIED")) {
                window.currentVerifyEmail = email; // сохраняем email
                openVerify();
                alert("Please verify your email first.");
                throw new Error("Email not verified");
            }

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
            if (!err.message.includes("Email not verified")) {
                alert("Ошибка входа: " + err.message);
            }
        })
        .finally(() => {
            document.getElementById("loginLoader").classList.add("hidden");
        });
}

// ==================== REGISTER (открывает Verify) ====================

function register() {
    document.getElementById("registerLoader").classList.remove("hidden");

    const email = document.getElementById("email").value;

    const data = {
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        username: document.getElementById("username").value,
        email: email,
        password: document.getElementById("password").value,
        phoneNumber: document.getElementById("phoneNumber").value
    };

    fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(async res => {
            const text = await res.text();
            if (!res.ok) throw new Error(text);

            alert("Verification code sent to your email");

            // сохраняем email для verify()
            window.currentVerifyEmail = email;

            openVerify();
        })
        .catch(err => {
            alert("Registration error: " + err.message);
        })
        .finally(() => {
            document.getElementById("registerLoader").classList.add("hidden");
        });
}

// ==================== VERIFY CODE ====================

function verifyCode() {
    const code = document.getElementById("verifyCode").value;
    const email = window.currentVerifyEmail;

    if (!email) {
        alert("Email not found. Try registration or login again.");
        return;
    }

    const params = new URLSearchParams();
    params.append("email", email);
    params.append("code", code);

    fetch("http://localhost:8080/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
    })
        .then(async res => {
            const text = await res.text();
            if (!res.ok) throw new Error(text);

            alert("Email verified successfully!");
            goHome();
        })
        .catch(err => {
            alert("Verification error: " + err.message);
        });
}
