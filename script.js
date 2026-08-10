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
   REGISTER
========================= */

function register() {

    const name =
        document.getElementById(
            "registerName"
        ).value.trim();

    const email =
        document.getElementById(
            "registerEmail"
        ).value.trim().toLowerCase();

    const password =
        document.getElementById(
            "registerPassword"
        ).value;

    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        ).value;

    const message =
        document.getElementById(
            "registerMessage"
        );


    /* Check Empty */

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


    /* Password Check */

    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        return;
    }


    /* Password Length */

    if (password.length < 6) {

        message.textContent =
            "Password must be at least 6 characters.";

        return;
    }


    /* Create User */

    const user = {

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(
        "registeredUser",
        JSON.stringify(user)
    );


    message.style.color = "green";

    message.textContent =
        "Registration successful!";


    /* Clear */

    document.getElementById(
        "registerName"
    ).value = "";

    document.getElementById(
        "registerEmail"
    ).value = "";

    document.getElementById(
        "registerPassword"
    ).value = "";

    document.getElementById(
        "confirmPassword"
    ).value = "";


    /* Go Login */

    setTimeout(
        function () {

            showLogin();

            document.getElementById(
                "loginEmail"
            ).value = email;

        },
        1000
    );

}


/* =========================
   LOGIN
========================= */

function login() {

    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim().toLowerCase();

    const password =
        document.getElementById(
            "loginPassword"
        ).value;

    const message =
        document.getElementById(
            "loginMessage"
        );


    /* Get User */

    const savedUser =
        localStorage.getItem(
            "registeredUser"
        );


    /* No Registration */

    if (!savedUser) {

        message.textContent =
            "Please register first.";

        return;
    }


    const user =
        JSON.parse(savedUser);


    /* Check Login */

    if (
        email === user.email &&
        password === user.password
    ) {

        message.style.color = "green";

        message.textContent =
            "Login successful!";


        /*
            IMPORTANT:
            Login successful થયા પછી
            mobile.html open થશે.
        */

        setTimeout(
            function () {

                window.location.href =
                    "mobile.html";

            },
            500
        );


    } else {

        message.style.color = "red";

        message.textContent =
            "Wrong email or password.";

    }

}