/* =========================================================
   MOBILESTORE - FIREBASE AUTH SYSTEM
   ========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";


/* =========================================================
   FIREBASE CONFIG
   ========================================================= */

const firebaseConfig = {

    apiKey: "AIzaSyC_C-EmObRGhRFxiaiHrXQ4zb49TzCPJ3w",

    authDomain: "mobilestore-d044c.firebaseapp.com",

    projectId: "mobilestore-d044c",

    storageBucket: "mobilestore-d044c.firebasestorage.app",

    messagingSenderId: "942752515187",

    appId: "1:942752515187:web:779e0e178a4729e5b21606",

    measurementId: "G-XXBFTKTLPH"

};


/* =========================================================
   INITIALIZE FIREBASE
   ========================================================= */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


/* =========================================================
   HELPER
   ========================================================= */

function getElement(id) {

    return document.getElementById(id);

}


/* =========================================================
   SHOW REGISTER
   ========================================================= */

function showRegister() {

    const loginBox = getElement("loginBox");
    const registerBox = getElement("registerBox");
    const title = getElement("authTitle");
    const subtitle = getElement("authSubtitle");

    if (loginBox) {
        loginBox.classList.add("hidden");
    }

    if (registerBox) {
        registerBox.classList.remove("hidden");
    }

    if (title) {
        title.textContent = "Create your account";
    }

    if (subtitle) {
        subtitle.textContent =
            "Join MobileStore and start shopping";
    }

    clearMessages();

}


/* =========================================================
   SHOW LOGIN
   ========================================================= */

function showLogin() {

    const loginBox = getElement("loginBox");
    const registerBox = getElement("registerBox");
    const title = getElement("authTitle");
    const subtitle = getElement("authSubtitle");

    if (registerBox) {
        registerBox.classList.add("hidden");
    }

    if (loginBox) {
        loginBox.classList.remove("hidden");
    }

    if (title) {
        title.textContent = "Welcome back";
    }

    if (subtitle) {
        subtitle.textContent =
            "Login to continue to MobileStore";
    }

    clearMessages();

}


/* =========================================================
   CLEAR MESSAGES
   ========================================================= */

function clearMessages() {

    const loginMessage = getElement("loginMessage");
    const registerMessage = getElement("registerMessage");

    if (loginMessage) {
        loginMessage.textContent = "";
    }

    if (registerMessage) {
        registerMessage.textContent = "";
    }

}


/* =========================================================
   PASSWORD TOGGLE
   ========================================================= */

function togglePassword(inputId, button) {

    const input = getElement(inputId);

    if (!input) {
        return;
    }

    if (input.type === "password") {

        input.type = "text";

        if (button) {
            button.textContent = "🙈";
        }

    } else {

        input.type = "password";

        if (button) {
            button.textContent = "👁";
        }

    }

}


/* =========================================================
   REGISTER
   ========================================================= */

async function register() {

    const nameInput = getElement("registerName");
    const emailInput = getElement("registerEmail");
    const passwordInput = getElement("registerPassword");
    const confirmInput = getElement("confirmPassword");
    const message = getElement("registerMessage");

    if (
        !nameInput ||
        !emailInput ||
        !passwordInput ||
        !confirmInput
    ) {

        console.error(
            "Registration form elements are missing."
        );

        return;

    }


    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim().toLowerCase();

    const password =
        passwordInput.value;

    const confirmPassword =
        confirmInput.value;


    if (message) {
        message.style.color = "#dc2626";
    }


    /* -------------------------------------------------------
       VALIDATION
    ------------------------------------------------------- */

    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        if (message) {
            message.textContent =
                "Please fill in all fields.";
        }

        return;

    }


    if (name.length < 2) {

        if (message) {
            message.textContent =
                "Please enter your full name.";
        }

        return;

    }


    if (password.length < 6) {

        if (message) {
            message.textContent =
                "Password must be at least 6 characters.";
        }

        return;

    }


    if (password !== confirmPassword) {

        if (message) {
            message.textContent =
                "Passwords do not match.";
        }

        return;

    }


    try {

        /* ---------------------------------------------------
           CREATE FIREBASE ACCOUNT
        --------------------------------------------------- */

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;


        /* ---------------------------------------------------
           SAVE DISPLAY NAME
        --------------------------------------------------- */

        await updateProfile(
            user,
            {
                displayName: name
            }
        );


        /* ---------------------------------------------------
           SAVE USER IN FIRESTORE
        --------------------------------------------------- */

        await setDoc(
            doc(db, "users", user.uid),
            {

                uid: user.uid,

                name: name,

                email: email,

                createdAt: serverTimestamp(),

                lastLogin: serverTimestamp()

            }
        );


        /* ---------------------------------------------------
           SAVE LOCAL USER INFO
        --------------------------------------------------- */

        localStorage.setItem(
            "mobileStoreUser",
            JSON.stringify({

                uid: user.uid,

                name: name,

                email: email

            })
        );


        /* ---------------------------------------------------
           SUCCESS
        --------------------------------------------------- */

        if (message) {

            message.style.color = "#22c55e";

            message.textContent =
                "✓ Account created successfully!";

        }


        /* ---------------------------------------------------
           GO TO LOGIN
        --------------------------------------------------- */

        setTimeout(() => {

            showLogin();

            const loginEmail =
                getElement("loginEmail");

            if (loginEmail) {
                loginEmail.value = email;
            }

        }, 1200);


    } catch (error) {

        console.error(
            "Registration Error:",
            error
        );


        if (!message) {
            return;
        }


        message.style.color = "#dc2626";


        switch (error.code) {

            case "auth/email-already-in-use":

                message.textContent =
                    "This email is already registered.";

                break;


            case "auth/invalid-email":

                message.textContent =
                    "Please enter a valid email.";

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

                break;

        }

    }

}


/* =========================================================
   LOGIN
   ========================================================= */

async function login() {

    const emailInput =
        getElement("loginEmail");

    const passwordInput =
        getElement("loginPassword");

    const message =
        getElement("loginMessage");


    if (
        !emailInput ||
        !passwordInput
    ) {

        console.error(
            "Login form elements are missing."
        );

        return;

    }


    const email =
        emailInput.value.trim().toLowerCase();

    const password =
        passwordInput.value;


    if (message) {
        message.style.color = "#dc2626";
    }


    /* -------------------------------------------------------
       VALIDATION
    ------------------------------------------------------- */

    if (
        email === "" ||
        password === ""
    ) {

        if (message) {
            message.textContent =
                "Please enter email and password.";
        }

        return;

    }


    try {

        /* ---------------------------------------------------
           LOGIN
        --------------------------------------------------- */

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;


        /* ---------------------------------------------------
           GET FIRESTORE USER
        --------------------------------------------------- */

        let userName =
            user.displayName || "Customer";


        try {

            const userDoc =
                await getDoc(
                    doc(db, "users", user.uid)
                );


            if (userDoc.exists()) {

                const data =
                    userDoc.data();


                if (data.name) {

                    userName =
                        data.name;

                }

            }

        } catch (firestoreError) {

            console.warn(
                "Could not load user profile:",
                firestoreError
            );

        }


        /* ---------------------------------------------------
           UPDATE LAST LOGIN
        --------------------------------------------------- */

        try {

            await setDoc(
                doc(db, "users", user.uid),
                {

                    uid: user.uid,

                    name: userName,

                    email: user.email,

                    lastLogin: serverTimestamp()

                },
                {
                    merge: true
                }
            );

        } catch (firestoreError) {

            console.warn(
                "Could not update last login:",
                firestoreError
            );

        }


        /* ---------------------------------------------------
           SAVE LOCAL USER
        --------------------------------------------------- */

        localStorage.setItem(
            "mobileStoreUser",
            JSON.stringify({

                uid: user.uid,

                name: userName,

                email: user.email

            })
        );


        /* ---------------------------------------------------
           SUCCESS
        --------------------------------------------------- */

        if (message) {

            message.style.color = "#22c55e";

            message.textContent =
                "✓ Login successful!";

        }


        /* ---------------------------------------------------
           REDIRECT
        --------------------------------------------------- */

        setTimeout(() => {

            window.location.href =
                "mobile.html";

        }, 700);


    } catch (error) {

        console.error(
            "Login Error:",
            error
        );


        if (!message) {
            return;
        }


        message.style.color = "#dc2626";


        switch (error.code) {

            case "auth/invalid-credential":

                message.textContent =
                    "Incorrect email or password.";

                break;


            case "auth/user-not-found":

                message.textContent =
                    "No account found with this email.";

                break;


            case "auth/wrong-password":

                message.textContent =
                    "Incorrect password.";

                break;


            case "auth/invalid-email":

                message.textContent =
                    "Please enter a valid email.";

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

                break;

        }

    }

}


/* =========================================================
   LOGOUT
   ========================================================= */

async function logout() {

    try {

        await signOut(auth);

        localStorage.removeItem(
            "mobileStoreUser"
        );


        window.location.href =
            "index.html";


    } catch (error) {

        console.error(
            "Logout Error:",
            error
        );

        alert(
            "Logout failed. Please try again."
        );

    }

}


/* =========================================================
   GET CURRENT USER
   ========================================================= */

function getCurrentUser() {

    return auth.currentUser;

}


/* =========================================================
   AUTH STATE
   ========================================================= */

onAuthStateChanged(
    auth,
    async function(user) {

        if (user) {

            console.log(
                "MobileStore user logged in:",
                user.email
            );


            let userName =
                user.displayName || "Customer";


            try {

                const userDoc =
                    await getDoc(
                        doc(db, "users", user.uid)
                    );


                if (userDoc.exists()) {

                    const data =
                        userDoc.data();


                    if (data.name) {

                        userName =
                            data.name;

                    }

                }

            } catch (error) {

                console.warn(
                    "User profile loading failed:",
                    error
                );

            }


            localStorage.setItem(
                "mobileStoreUser",
                JSON.stringify({

                    uid: user.uid,

                    name: userName,

                    email: user.email

                })
            );


            /* ------------------------------------------------
               UPDATE USER NAME IF ELEMENT EXISTS
            ------------------------------------------------ */

            const userNameElements =
                document.querySelectorAll(
                    "[data-user-name]"
                );


            userNameElements.forEach(
                function(element) {

                    element.textContent =
                        userName;

                }
            );


            /* ------------------------------------------------
               UPDATE USER EMAIL
            ------------------------------------------------ */

            const userEmailElements =
                document.querySelectorAll(
                    "[data-user-email]"
                );


            userEmailElements.forEach(
                function(element) {

                    element.textContent =
                        user.email || "";

                }
            );

        }

    }
);


/* =========================================================
   MAKE FUNCTIONS GLOBAL
   ========================================================= */

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

window.logout =
    logout;

window.getCurrentUser =
    getCurrentUser;


/* =========================================================
   FIREBASE READY
   ========================================================= */

console.log(
    "🔥 MobileStore Firebase initialized successfully."
);
