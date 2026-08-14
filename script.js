import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";


/* =========================
   FIREBASE CONFIG
========================= */

const firebaseConfig = {
    apiKey: "AIzaSyC_A-EmObRGhRFxiaiHrXQ4zb49TzCPJ3w",
    authDomain: "mobilestore-d044c.firebaseapp.com",
    projectId: "mobilestore-d044c",
    storageBucket: "mobilestore-d044c.firebasestorage.app",
    messagingSenderId: "942752515187",
    appId: "1:942752515187:web:779e0e178a4729e5b21606",
    measurementId: "G-XXBFTKTLPH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


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

    const input = document.getElementById(inputId);

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

async function register() {

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document
        .getElementById("registerEmail")
        .value.trim()
        .toLowerCase();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const message =
        document.getElementById("registerMessage");


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


    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


        await updateProfile(
            userCredential.user,
            {
                displayName: name
            }
        );


        message.style.color = "#16a34a";

        message.textContent =
            "Account created successfully!";


        setTimeout(function () {

            showLogin();

            document.getElementById(
                "loginEmail"
            ).value = email;

        }, 1000);


    } catch (error) {

        message.textContent =
            error.message;

    }
}


/* =========================
   LOGIN
========================= */

async function login() {

    const email =
        document
        .getElementById("loginEmail")
        .value.trim()
        .toLowerCase();

    const password =
        document.getElementById("loginPassword").value;

    const message =
        document.getElementById("loginMessage");


    message.style.color = "#dc2626";


    if (email === "" || password === "") {

        message.textContent =
            "Please enter email and password.";

        return;
    }


    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        message.style.color = "#16a34a";

        message.textContent =
            "Login successful!";


        setTimeout(function () {

            window.location.href =
                "mobile.html";

        }, 500);


    } catch (error) {

        message.textContent =
            "Incorrect email or password.";

    }
}


/* =========================
   MAKE FUNCTIONS AVAILABLE
========================= */

window.showRegister = showRegister;
window.showLogin = showLogin;
window.togglePassword = togglePassword;
window.register = register;
window.login = login;
