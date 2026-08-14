/* =========================================
   MOBILESTORE - FIREBASE AUTH
========================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";


import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";


import {
    getFirestore,
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";



/* =========================================
   FIREBASE CONFIG
========================================= */

const firebaseConfig = {

    apiKey:
        "AIzaSyC_A-EmObRGhRFxiaiHrXQ4zb49TzCPJ3w",

    authDomain:
        "mobilestore-d044c.firebaseapp.com",

    projectId:
        "mobilestore-d044c",

    storageBucket:
        "mobilestore-d044c.firebasestorage.app",

    messagingSenderId:
        "942752515187",

    appId:
        "1:942752515187:web:779e0e178a4729e5b21606",

    measurementId:
        "G-XXBFTKTLPH"
};



/* =========================================
   INITIALIZE FIREBASE
========================================= */

const app =
    initializeApp(firebaseConfig);


const auth =
    getAuth(app);


const db =
    getFirestore(app);



/* =========================================
   SHOW REGISTER
========================================= */

function showRegister() {

    const loginBox =
        document.getElementById("loginBox");

    const registerBox =
        document.getElementById("registerBox");


    if (!loginBox || !registerBox) {
        return;
    }


    loginBox.classList.add("hidden");

    registerBox.classList.remove("hidden");


    const title =
        document.getElementById("authTitle");

    const subtitle =
        document.getElementById("authSubtitle");


    if (title) {

        title.textContent =
            "Create Account";
    }


    if (subtitle) {

        subtitle.textContent =
            "Join MobileStore today";
    }


    const message =
        document.getElementById("registerMessage");


    if (message) {

        message.textContent = "";
    }
}



/* =========================================
   SHOW LOGIN
========================================= */

function showLogin() {

    const loginBox =
        document.getElementById("loginBox");

    const registerBox =
        document.getElementById("registerBox");


    if (!loginBox || !registerBox) {
        return;
    }


    registerBox.classList.add("hidden");

    loginBox.classList.remove("hidden");


    const title =
        document.getElementById("authTitle");

    const subtitle =
        document.getElementById("authSubtitle");


    if (title) {

        title.textContent =
            "Welcome Back";
    }


    if (subtitle) {

        subtitle.textContent =
            "Login to your MobileStore account";
    }


    const message =
        document.getElementById("loginMessage");


    if (message) {

        message.textContent = "";
    }
}



/* =========================================
   PASSWORD SHOW / HIDE
========================================= */

function togglePassword(
    inputId,
    button
) {

    const input =
        document.getElementById(inputId);


    if (!input) {
        return;
    }


    if (input.type === "password") {

        input.type = "text";

        button.textContent = "🙈";

    } else {

        input.type = "password";

        button.textContent = "👁";
    }
}



/* =========================================
   REGISTER
========================================= */

async function register() {

    const nameInput =
        document.getElementById(
            "registerName"
        );


    const emailInput =
        document.getElementById(
            "registerEmail"
        );


    const passwordInput =
        document.getElementById(
            "registerPassword"
        );


    const confirmInput =
        document.getElementById(
            "confirmPassword"
        );


    const message =
        document.getElementById(
            "registerMessage"
        );


    const name =
        nameInput.value.trim();


    const email =
        emailInput.value
            .trim()
            .toLowerCase();


    const password =
        passwordInput.value;


    const confirmPassword =
        confirmInput.value;


    /* CLEAR MESSAGE */

    message.textContent = "";



    /* =====================================
       VALIDATION
    ===================================== */

    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        message.style.color =
            "#ef4444";

        message.textContent =
            "Please fill all fields.";

        return;
    }


    /* EMAIL CHECK */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        message.style.color =
            "#ef4444";

        message.textContent =
            "Please enter a valid email.";

        return;
    }


    /* PASSWORD LENGTH */

    if (password.length < 6) {

        message.style.color =
            "#ef4444";

        message.textContent =
            "Password must be at least 6 characters.";

        return;
    }


    /* CONFIRM PASSWORD */

    if (
        password !== confirmPassword
    ) {

        message.style.color =
            "#ef4444";

        message.textContent =
            "Passwords do not match.";

        return;
    }



    /* =====================================
       FIREBASE REGISTER
    ===================================== */

    try {

        message.style.color =
            "#a78bfa";

        message.textContent =
            "Creating your account...";


        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;



        /* =================================
           SAVE DISPLAY NAME
        ================================= */

        await updateProfile(
            user,
            {
                displayName: name
            }
        );



        /* =================================
           SAVE USER TO FIRESTORE
        ================================= */

        await setDoc(
            doc(
                db,
                "users",
                user.uid
            ),
            {

                uid:
                    user.uid,

                name:
                    name,

                email:
                    email,

                createdAt:
                    serverTimestamp()
            }
        );



        /* =================================
           SUCCESS
        ================================= */

        message.style.color =
            "#22c55e";

        message.textContent =
            "✓ Account created successfully!";


        /* CLEAR PASSWORDS */

        passwordInput.value = "";

        confirmInput.value = "";



        /* GO TO LOGIN */

        setTimeout(
            function () {

                showLogin();


                document.getElementById(
                    "loginEmail"
                ).value = email;

            },
            1200
        );


    } catch (error) {

        console.error(
            "Registration Error:",
            error
        );


        message.style.color =
            "#ef4444";


        /* FIREBASE ERRORS */

        switch (error.code) {


            case "auth/email-already-in-use":

                message.textContent =
                    "This email is already registered.";

                break;


            case "auth/invalid-email":

                message.textContent =
                    "Invalid email address.";

                break;


            case "auth/weak-password":

                message.textContent =
                    "Password is too weak.";

                break;


            case "auth/network-request-failed":

                message.textContent =
                    "Network error. Check your internet.";

                break;


            default:

                message.textContent =
                    "Registration failed. Please try again.";

        }
    }
}



/* =========================================
   LOGIN
========================================= */

async function login() {

    const emailInput =
        document.getElementById(
            "loginEmail"
        );


    const passwordInput =
        document.getElementById(
            "loginPassword"
        );


    const message =
        document.getElementById(
            "loginMessage"
        );


    const email =
        emailInput.value
            .trim()
            .toLowerCase();


    const password =
        passwordInput.value;


    /* CLEAR MESSAGE */

    message.textContent = "";



    /* =====================================
       VALIDATION
    ===================================== */

    if (
        email === "" ||
        password === ""
    ) {

        message.style.color =
            "#ef4444";

        message.textContent =
            "Please enter email and password.";

        return;
    }



    /* =====================================
       FIREBASE LOGIN
    ===================================== */

    try {

        message.style.color =
            "#a78bfa";

        message.textContent =
            "Logging in...";


        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );



        /* =================================
           SUCCESS
        ================================= */

        message.style.color =
            "#22c55e";

        message.textContent =
            "✓ Login successful!";


        /* =================================
           GO TO MOBILE PAGE
        ================================= */

        setTimeout(
            function () {

                window.location.href =
                    "mobile.html";

            },
            700
        );


    } catch (error) {

        console.error(
            "Login Error:",
            error
        );


        message.style.color =
            "#ef4444";


        switch (error.code) {


            case "auth/invalid-credential":

                message.textContent =
                    "Incorrect email or password.";

                break;


            case "auth/user-not-found":

                message.textContent =
                    "Account not found.";

                break;


            case "auth/wrong-password":

                message.textContent =
                    "Incorrect password.";

                break;


            case "auth/invalid-email":

                message.textContent =
                    "Invalid email address.";

                break;


            case "auth/too-many-requests":

                message.textContent =
                    "Too many attempts. Try again later.";

                break;


            case "auth/network-request-failed":

                message.textContent =
                    "Network error. Check your internet.";

                break;


            default:

                message.textContent =
                    "Login failed. Please try again.";
        }
    }
}



/* =========================================
   GLOBAL FUNCTIONS
========================================= */

/*
   HTML માં onclick="" છે,
   તેથી functions window પર રાખવા જરૂરી છે.
*/


window.showRegister =
    showRegister;


window.showLogin =
    showLogin;


window.togglePassword =
    togglePassword;


window.register =
    register;


window.login =
    login;



/* =========================================
   READY MESSAGE
========================================= */

console.log(
    "✅ MobileStore Firebase initialized successfully"
);
