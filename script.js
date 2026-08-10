/* =========================
   SHOW REGISTER
========================= */

function showRegister() {

    document
        .getElementById("loginBox")
        .classList.add("hidden");

    document
        .getElementById("registerBox")
        .classList.remove("hidden");

}


/* =========================
   SHOW LOGIN
========================= */

function showLogin() {

    document
        .getElementById("registerBox")
        .classList.add("hidden");

    document
        .getElementById("loginBox")
        .classList.remove("hidden");

}


/* =========================
   SHOW / HIDE PASSWORD
========================= */

function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);


    if (input.type === "password") {

        input.type = "text";

        button.textContent = "🙈";

    } else {

        input.type = "password";

        button.textContent = "👁️";

    }

}


/* =========================
   REGISTER
========================= */

function register() {

    const name =
        document
        .getElementById("registerName")
        .value.trim();


    const email =
        document
        .getElementById("registerEmail")
        .value.trim()
        .toLowerCase();


    const password =
        document
        .getElementById("registerPassword")
        .value;


    const confirmPassword =
        document
        .getElementById("confirmPassword")
        .value;


    const message =
        document.getElementById(
            "registerMessage"
        );


    message.style.color = "#dc2626";


    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        message.textContent =
            "Please fill all fields.";

        return;

    }


    if (password.length < 6) {

        message.textContent =
            "Password must be at least 6 characters.";

        return;

    }


    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        return;

    }


    const user = {

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(
        "registeredUser",
        JSON.stringify(user)
    );


    message.style.color = "#16a34a";

    message.textContent =
        "Account created successfully!";


    setTimeout(function() {

        showLogin();

        document.getElementById(
            "loginEmail"
        ).value = email;

    }, 1000);

}


/* =========================
   LOGIN
========================= */

function login() {

    const email =
        document
        .getElementById("loginEmail")
        .value.trim()
        .toLowerCase();


    const password =
        document
        .getElementById("loginPassword")
        .value;


    const message =
        document.getElementById(
            "loginMessage"
        );


    const savedUser =
        localStorage.getItem(
            "registeredUser"
        );


    message.style.color = "#dc2626";


    if (!savedUser) {

        message.textContent =
            "Please create an account first.";

        return;

    }


    const user =
        JSON.parse(savedUser);


    if (
        email === user.email &&
        password === user.password
    ) {

        message.style.color =
            "#16a34a";

        message.textContent =
            "Login successful!";


        setTimeout(function() {

            window.location.href =
                "mobile.html";

        }, 500);


    } else {

        message.textContent =
            "Incorrect email or password.";

    }

}