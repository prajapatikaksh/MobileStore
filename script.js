/* =========================================================
   MOBILESTORE - FIREBASE VERSION
   USER AUTH + FIRESTORE + ADMIN + PRODUCTS + ORDERS
========================================================= */

import {
    initializeApp,
    getApps,
    getApp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
    deleteDoc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    orderBy,
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
   FIREBASE APPS
   Separate User + Admin sessions
========================================================= */

const userApp = initializeApp(firebaseConfig, "MobileStoreUserApp");
const adminApp = initializeApp(firebaseConfig, "MobileStoreAdminApp");

const userAuth = getAuth(userApp);
const adminAuth = getAuth(adminApp);

const db = getFirestore(userApp);
const adminDb = getFirestore(adminApp);


/* =========================================================
   CONSTANTS
========================================================= */

const ADMIN_EMAIL = "admin@mobilestore.com";
const ADMIN_PASSWORD = "admin123";

const CART_KEY = "mobileStoreCart";
const CURRENT_USER_KEY = "mobileStoreCurrentUser";
const LAST_EMAIL_KEY = "mobileStoreLastRegisteredEmail";


/* =========================================================
   ELEMENTS
========================================================= */

const authPage = document.getElementById("authPage");
const storePage = document.getElementById("storePage");
const productPage = document.getElementById("productPage");
const cartPage = document.getElementById("cartPage");
const checkoutPage = document.getElementById("checkoutPage");
const successPage = document.getElementById("successPage");
const adminLoginPage = document.getElementById("adminLoginPage");
const adminPage = document.getElementById("adminPage");


/* =========================================================
   AUTH ELEMENTS
========================================================= */

const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const registerName = document.getElementById("registerName");
const registerPhone = document.getElementById("registerPhone");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");

const showRegisterBtn = document.getElementById("showRegisterBtn");
const showLoginBtn = document.getElementById("showLoginBtn");

const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
const adminAccessBtn = document.getElementById("adminAccessBtn");

const loginPasswordToggle = document.getElementById("loginPasswordToggle");
const registerPasswordToggle = document.getElementById("registerPasswordToggle");


/* =========================================================
   STORE ELEMENTS
========================================================= */

const searchInput = document.getElementById("searchInput");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const profileBtn = document.getElementById("profileBtn");
const userNameNav = document.getElementById("userNameNav");
const logoutBtn = document.getElementById("logoutBtn");

const productGrid = document.getElementById("productGrid");
const productResultText = document.getElementById("productResultText");

const categories = document.querySelectorAll(".category");


/* =========================================================
   PRODUCT ELEMENTS
========================================================= */

const productDetails = document.getElementById("productDetails");
const detailCartCount = document.getElementById("detailCartCount");


/* =========================================================
   CART / CHECKOUT ELEMENTS
========================================================= */

const cartContent = document.getElementById("cartContent");

const checkoutForm = document.getElementById("checkoutForm");
const checkoutName = document.getElementById("checkoutName");
const checkoutPhone = document.getElementById("checkoutPhone");
const checkoutEmail = document.getElementById("checkoutEmail");
const checkoutAddress = document.getElementById("checkoutAddress");
const checkoutSummary = document.getElementById("checkoutSummary");

const successOrderId = document.getElementById("successOrderId");
const successWhatsappBtn = document.getElementById("successWhatsappBtn");


/* =========================================================
   ADMIN ELEMENTS
========================================================= */

const adminLoginForm = document.getElementById("adminLoginForm");
const adminEmail = document.getElementById("adminEmail");
const adminPassword = document.getElementById("adminPassword");
const adminPasswordToggle = document.getElementById("adminPasswordToggle");

const adminLogoutBtn = document.getElementById("adminLogoutBtn");

const totalUsers = document.getElementById("totalUsers");
const totalOrders = document.getElementById("totalOrders");
const totalSales = document.getElementById("totalSales");

const userSearch = document.getElementById("userSearch");
const usersTableBody = document.getElementById("usersTableBody");

const orderSearch = document.getElementById("orderSearch");
const ordersTableBody = document.getElementById("ordersTableBody");


/* =========================================================
   APP STATE
========================================================= */

let products = [];
let selectedBrand = "All";
let selectedProduct = null;

let unsubscribeProducts = null;

let allUsers = [];
let allOrders = [];

let currentWhatsappMessage = "";


/* =========================================================
   BASIC HELPERS
========================================================= */

function money(value) {
    return "₹" + Number(value || 0).toLocaleString("en-IN");
}


function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function showPage(page) {
    [
        authPage,
        storePage,
        productPage,
        cartPage,
        checkoutPage,
        successPage,
        adminLoginPage,
        adminPage
    ].forEach(pageElement => {
        if (pageElement) {
            pageElement.classList.remove("active");
            pageElement.style.display = "none";
        }
    });

    if (page) {
        page.classList.add("active");
        page.style.display = "block";
    }
}


function showAuth() {
    showPage(authPage);

    if (loginBox) loginBox.style.display = "block";
    if (registerBox) registerBox.style.display = "none";
}


function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
        return [];
    }
}


function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}


function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartCount();
}


function getCurrentUserData() {
    try {
        return JSON.parse(
            localStorage.getItem(CURRENT_USER_KEY)
        ) || null;
    } catch {
        return null;
    }
}


function saveCurrentUserData(user) {
    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(user)
    );
}


function clearCurrentUserData() {
    localStorage.removeItem(CURRENT_USER_KEY);
}


function updateCartCount() {
    const cart = getCart();

    const count = cart.reduce(
        (total, item) => total + Number(item.quantity || 1),
        0
    );

    if (cartCount) {
        cartCount.textContent = count;
    }

    if (detailCartCount) {
        detailCartCount.textContent = count;
    }
}


/* =========================================================
   AUTH UI
========================================================= */

if (showRegisterBtn) {
    showRegisterBtn.addEventListener("click", () => {
        if (loginBox) loginBox.style.display = "none";
        if (registerBox) registerBox.style.display = "block";
    });
}


if (showLoginBtn) {
    showLoginBtn.addEventListener("click", () => {
        if (registerBox) registerBox.style.display = "none";
        if (loginBox) loginBox.style.display = "block";
    });
}


/* =========================================================
   PASSWORD TOGGLES
========================================================= */

function setupPasswordToggle(button, input) {

    if (!button || !input) return;

    button.addEventListener("click", () => {

        if (input.type === "password") {
            input.type = "text";
            button.textContent = "🙈";
        } else {
            input.type = "password";
            button.textContent = "👁️";
        }

    });
}


setupPasswordToggle(
    loginPasswordToggle,
    loginPassword
);

setupPasswordToggle(
    registerPasswordToggle,
    registerPassword
);

setupPasswordToggle(
    adminPasswordToggle,
    adminPassword
);


/* =========================================================
   REGISTER
========================================================= */

if (registerForm) {

    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = registerName?.value.trim();
        const phone = registerPhone?.value.trim();
        const email = registerEmail?.value.trim().toLowerCase();
        const password = registerPassword?.value;

        if (!name || !phone || !email || !password) {
            alert("Please fill all fields.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        try {

            const credential =
                await createUserWithEmailAndPassword(
                    userAuth,
                    email,
                    password
                );

            const uid = credential.user.uid;

            await setDoc(
                doc(db, "users", uid),
                {
                    uid: uid,
                    name: name,
                    phone: phone,
                    email: email,
                    registrationDate: serverTimestamp()
                }
            );

            localStorage.setItem(
                LAST_EMAIL_KEY,
                email
            );

            alert("Registration successful. Please login.");

            registerForm.reset();

            if (registerBox) {
                registerBox.style.display = "none";
            }

            if (loginBox) {
                loginBox.style.display = "block";
            }

            if (loginEmail) {
                loginEmail.value = email;
            }

            await signOut(userAuth);

        } catch (error) {

            console.error(error);

            if (error.code === "auth/email-already-in-use") {
                alert("This email is already registered.");
            } else if (error.code === "auth/invalid-email") {
                alert("Invalid email address.");
            } else if (error.code === "auth/weak-password") {
                alert("Password is too weak.");
            } else {
                alert(error.message);
            }
        }

    });

}


/* =========================================================
   LOGIN
========================================================= */

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email =
            loginEmail?.value.trim().toLowerCase();

        const password =
            loginPassword?.value;

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        try {

            const credential =
                await signInWithEmailAndPassword(
                    userAuth,
                    email,
                    password
                );

            const user = credential.user;

            let userData = {
                uid: user.uid,
                email: user.email,
                name: user.email.split("@")[0],
                phone: ""
            };

            try {

                const userDoc =
                    await getDoc(
                        doc(db, "users", user.uid)
                    );

                if (userDoc.exists()) {
                    userData = {
                        ...userData,
                        ...userDoc.data()
                    };
                }

            } catch (firestoreError) {
                console.warn(
                    "User profile read failed:",
                    firestoreError
                );
            }

            saveCurrentUserData(userData);

            openStore();

        } catch (error) {

            console.error(error);

            if (
                error.code === "auth/invalid-credential" ||
                error.code === "auth/wrong-password" ||
                error.code === "auth/user-not-found"
            ) {
                alert("Wrong email or password.");
            } else if (error.code === "auth/too-many-requests") {
                alert("Too many attempts. Please try again later.");
            } else {
                alert(error.message);
            }
        }

    });

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

if (forgotPasswordBtn) {

    forgotPasswordBtn.addEventListener("click", async () => {

        const email =
            loginEmail?.value.trim().toLowerCase();

        if (!email) {
            alert("Please enter your email first.");
            loginEmail?.focus();
            return;
        }

        try {

            await sendPasswordResetEmail(
                userAuth,
                email
            );

            alert(
                "Password reset email sent. Please check your inbox."
            );

        } catch (error) {

            console.error(error);

            if (error.code === "auth/user-not-found") {
                alert("No account found with this email.");
            } else {
                alert(error.message);
            }
        }

    });

}


/* =========================================================
   USER AUTH STATE
========================================================= */

onAuthStateChanged(userAuth, async (user) => {

    if (user) {

        if (user.email === ADMIN_EMAIL) {
            return;
        }

        let userData = {
            uid: user.uid,
            email: user.email,
            name: user.email?.split("@")[0] || "User",
            phone: ""
        };

        try {

            const snapshot =
                await getDoc(
                    doc(db, "users", user.uid)
                );

            if (snapshot.exists()) {
                userData = {
                    ...userData,
                    ...snapshot.data()
                };
            }

        } catch (error) {
            console.warn(error);
        }

        saveCurrentUserData(userData);

        openStore();

    } else {

        const existingUser =
            getCurrentUserData();

        if (!existingUser) {
            showAuth();
        }
    }

});


/* =========================================================
   OPEN STORE
========================================================= */

function openStore() {

    showPage(storePage);

    const user =
        getCurrentUserData();

    if (userNameNav) {
        userNameNav.textContent =
            user?.name || "User";
    }

    updateCartCount();

    startProductsListener();
}


window.openStore = openStore;


/* =========================================================
   LOGOUT
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        try {

            await signOut(userAuth);

            clearCurrentUserData();

            showAuth();

        } catch (error) {

            console.error(error);
            alert(error.message);

        }

    });

}


/* =========================================================
   ADMIN ACCESS
========================================================= */

if (adminAccessBtn) {

    adminAccessBtn.addEventListener("click", () => {

        showPage(adminLoginPage);

        if (adminEmail) {
            adminEmail.value = ADMIN_EMAIL;
        }

    });

}


/* =========================================================
   ADMIN LOGIN
========================================================= */

if (adminLoginForm) {

    adminLoginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email =
            adminEmail?.value.trim().toLowerCase();

        const password =
            adminPassword?.value;

        if (!email || !password) {
            alert("Enter admin email and password.");
            return;
        }

        if (email !== ADMIN_EMAIL) {
            alert("Invalid admin account.");
            return;
        }

        try {

            await signInWithEmailAndPassword(
                adminAuth,
                email,
                password
            );

            openAdmin();

        } catch (error) {

            console.error(error);

            if (
                error.code === "auth/invalid-credential" ||
                error.code === "auth/wrong-password" ||
                error.code === "auth/user-not-found"
            ) {
                alert("Invalid admin email or password.");
            } else {
                alert(error.message);
            }
        }

    });

}


/* =========================================================
   OPEN ADMIN
========================================================= */

async function openAdmin() {

    showPage(adminPage);

    await createAdminProductPanel();

    loadAdminUsers();
    loadAdminOrders();
    startAdminProductsListener();

}


window.openAdmin = openAdmin;


/* =========================================================
   ADMIN AUTH STATE
========================================================= */

onAuthStateChanged(adminAuth, (user) => {

    if (!user) return;

    if (user.email === ADMIN_EMAIL) {
        openAdmin();
    }

});


/* =========================================================
   ADMIN LOGOUT
========================================================= */

if (adminLogoutBtn) {

    adminLogoutBtn.addEventListener("click", async () => {

        try {

            await signOut(adminAuth);

            showPage(authPage);

            if (loginBox) {
                loginBox.style.display = "block";
            }

            if (registerBox) {
                registerBox.style.display = "none";
            }

        } catch (error) {

            console.error(error);
            alert(error.message);

        }

    });

}


/* =========================================================
   FIRESTORE PRODUCTS
   IMPORTANT:
   No old hard-coded products.
   Only admin-added products appear.
========================================================= */

function startProductsListener() {

    if (unsubscribeProducts) {
        unsubscribeProducts();
        unsubscribeProducts = null;
    }

    const productsRef =
        collection(db, "products");

    unsubscribeProducts =
        onSnapshot(
            query(
                productsRef,
                orderBy("createdAt", "desc")
            ),
            (snapshot) => {

                products =
                    snapshot.docs.map(item => ({
                        id: item.id,
                        ...item.data()
                    }));

                renderProducts();

            },
            (error) => {

                console.error(
                    "Products listener error:",
                    error
                );

                /*
                 If createdAt/orderBy causes an index issue,
                 this fallback loads products without ordering.
                */

                loadProductsFallback();

            }
        );

}


async function loadProductsFallback() {

    try {

        const snapshot =
            await getDocs(
                collection(db, "products")
            );

        products =
            snapshot.docs.map(item => ({
                id: item.id,
                ...item.data()
            }));

        products.sort((a, b) => {

            const aTime =
                a.createdAt?.seconds || 0;

            const bTime =
                b.createdAt?.seconds || 0;

            return bTime - aTime;

        });

        renderProducts();

    } catch (error) {

        console.error(error);

        if (productGrid) {
            productGrid.innerHTML = `
                <div class="empty-state">
                    <h3>Unable to load products</h3>
                    <p>${escapeHTML(error.message)}</p>
                </div>
            `;
        }
    }

}


/* =========================================================
   PRODUCT FILTER
========================================================= */

function getFilteredProducts() {

    const search =
        searchInput?.value
            .trim()
            .toLowerCase() || "";

    return products.filter(product => {

        const brand =
            String(product.brand || "")
                .toLowerCase();

        const name =
            String(product.name || "")
                .toLowerCase();

        const matchesBrand =
            selectedBrand === "All" ||
            brand === selectedBrand.toLowerCase();

        const matchesSearch =
            !search ||
            name.includes(search) ||
            brand.includes(search);

        return matchesBrand && matchesSearch;

    });

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    if (!productGrid) return;

    const filtered =
        getFilteredProducts();

    if (productResultText) {
        productResultText.textContent =
            `${filtered.length} Product${filtered.length !== 1 ? "s" : ""} Found`;
    }

    if (!filtered.length) {

        productGrid.innerHTML = `
            <div class="empty-state">
                <h3>No products found</h3>
                <p>Admin has not added matching products yet.</p>
            </div>
        `;

        return;
    }

    productGrid.innerHTML =
        filtered.map(product => {

            const discount =
                product.oldPrice &&
                Number(product.oldPrice) > Number(product.price)
                    ? Math.round(
                        (
                            (Number(product.oldPrice) -
                                Number(product.price))
                            /
                            Number(product.oldPrice)
                        ) * 100
                    )
                    : 0;

            return `
                <div class="product-card">

                    <div
                        class="product-image"
                        onclick="openProduct('${escapeHTML(product.id)}')"
                    >
                        <img
                            src="${escapeHTML(product.image || "")}"
                            alt="${escapeHTML(product.name)}"
                            loading="lazy"
                        >
                    </div>

                    <div class="product-info">

                        <div class="product-brand">
                            ${escapeHTML(product.brand || "")}
                        </div>

                        <h3>
                            ${escapeHTML(product.name || "Product")}
                        </h3>

                        <div class="product-price">
                            <strong>
                                ${money(product.price)}
                            </strong>

                            ${
                                product.oldPrice
                                ? `
                                    <span class="old-price">
                                        ${money(product.oldPrice)}
                                    </span>
                                `
                                : ""
                            }

                            ${
                                discount > 0
                                ? `
                                    <span class="discount">
                                        ${discount}% OFF
                                    </span>
                                `
                                : ""
                            }
                        </div>

                        <div class="product-specs">

                            ${
                                product.ram
                                ? `<span>${escapeHTML(product.ram)} RAM</span>`
                                : ""
                            }

                            ${
                                product.storage
                                ? `<span>${escapeHTML(product.storage)}</span>`
                                : ""
                            }

                            ${
                                product.camera
                                ? `<span>${escapeHTML(product.camera)}</span>`
                                : ""
                            }

                        </div>

                        <div class="product-actions">

                            <button
                                type="button"
                                onclick="openProduct('${escapeHTML(product.id)}')"
                            >
                                View Details
                            </button>

                            <button
                                type="button"
                                onclick="addToCart('${escapeHTML(product.id)}')"
                            >
                                Add to Cart
                            </button>

                        </div>

                    </div>

                </div>
            `;

        }).join("");

}


/* =========================================================
   CATEGORY FILTER
========================================================= */

categories.forEach(category => {

    category.addEventListener("click", () => {

        categories.forEach(item => {
            item.classList.remove("active");
        });

        category.classList.add("active");

        selectedBrand =
            category.dataset.brand || "All";

        renderProducts();

    });

});


/* =========================================================
   SEARCH
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        renderProducts
    );

}


/* =========================================================
   PRODUCT DETAILS
========================================================= */

function openProduct(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) {
        alert("Product not found.");
        return;
    }

    selectedProduct = product;

    if (!productDetails) return;

    productDetails.innerHTML = `

        <div class="detail-image">
            <img
                src="${escapeHTML(product.image || "")}"
                alt="${escapeHTML(product.name)}"
            >
        </div>

        <div class="detail-info">

            <div class="product-brand">
                ${escapeHTML(product.brand || "")}
            </div>

            <h1>
                ${escapeHTML(product.name || "")}
            </h1>

            <div class="detail-price">
                <strong>
                    ${money(product.price)}
                </strong>

                ${
                    product.oldPrice
                    ? `
                        <span class="old-price">
                            ${money(product.oldPrice)}
                        </span>
                    `
                    : ""
                }
            </div>

            <div class="detail-specs">

                <div>
                    <b>RAM</b>
                    <span>${escapeHTML(product.ram || "-")}</span>
                </div>

                <div>
                    <b>Storage</b>
                    <span>${escapeHTML(product.storage || "-")}</span>
                </div>

                <div>
                    <b>Camera</b>
                    <span>${escapeHTML(product.camera || "-")}</span>
                </div>

                <div>
                    <b>Battery</b>
                    <span>${escapeHTML(product.battery || "-")}</span>
                </div>

                <div>
                    <b>Processor</b>
                    <span>${escapeHTML(product.processor || "-")}</span>
                </div>

            </div>

            <div class="detail-actions">

                <button
                    type="button"
                    onclick="addToCart('${escapeHTML(product.id)}')"
                >
                    Add to Cart
                </button>

                <button
                    type="button"
                    onclick="buyNow('${escapeHTML(product.id)}')"
                >
                    Buy Now
                </button>

            </div>

        </div>
    `;

    updateCartCount();

    showPage(productPage);

}


window.openProduct = openProduct;


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) {
        alert("Product not found.");
        return;
    }

    let cart = getCart();

    const existing =
        cart.find(
            item => item.id === productId
        );

    if (existing) {

        existing.quantity =
            Number(existing.quantity || 1) + 1;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: Number(product.price || 0),
            oldPrice: Number(product.oldPrice || 0),
            image: product.image,
            quantity: 1
        });

    }

    saveCart(cart);

    alert(`${product.name} added to cart.`);

}


window.addToCart = addToCart;


/* =========================================================
   BUY NOW
========================================================= */

function buyNow(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) {
        alert("Product not found.");
        return;
    }

    const cart = [{
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: Number(product.price || 0),
        oldPrice: Number(product.oldPrice || 0),
        image: product.image,
        quantity: 1
    }];

    saveCart(cart);

    openCheckout();

}


window.buyNow = buyNow;


/* =========================================================
   CART PAGE
========================================================= */

if (cartBtn) {

    cartBtn.addEventListener("click", () => {
        openCart();
    });

}


function openCart() {

    showPage(cartPage);

    renderCart();

}


window.openCart = openCart;


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    if (!cartContent) return;

    const cart = getCart();

    if (!cart.length) {

        cartContent.innerHTML = `
            <div class="empty-state">
                <h3>Your cart is empty</h3>
                <p>Add some products to continue.</p>
            </div>
        `;

        return;
    }

    let total = 0;

    cart.forEach(item => {
        total +=
            Number(item.price || 0) *
            Number(item.quantity || 1);
    });

    cartContent.innerHTML = `

        <div class="cart-items">

            ${cart.map(item => `

                <div class="cart-item">

                    <div class="cart-item-image">
                        <img
                            src="${escapeHTML(item.image || "")}"
                            alt="${escapeHTML(item.name)}"
                        >
                    </div>

                    <div class="cart-item-info">

                        <h3>
                            ${escapeHTML(item.name)}
                        </h3>

                        <p>
                            ${escapeHTML(item.brand || "")}
                        </p>

                        <strong>
                            ${money(item.price)}
                        </strong>

                        <div class="quantity-controls">

                            <button
                                type="button"
                                onclick="changeQuantity('${escapeHTML(item.id)}', -1)"
                            >
                                −
                            </button>

                            <span>
                                ${Number(item.quantity || 1)}
                            </span>

                            <button
                                type="button"
                                onclick="changeQuantity('${escapeHTML(item.id)}', 1)"
                            >
                                +
                            </button>

                        </div>

                        <button
                            type="button"
                            onclick="removeFromCart('${escapeHTML(item.id)}')"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            `).join("")}

        </div>

        <div class="cart-summary">

            <h2>
                Cart Total
            </h2>

            <h2>
                ${money(total)}
            </h2>

            <button
                type="button"
                onclick="openCheckout()"
            >
                Proceed to Checkout
            </button>

        </div>
    `;

    updateCartCount();

}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(productId, change) {

    let cart = getCart();

    const item =
        cart.find(
            product => product.id === productId
        );

    if (!item) return;

    item.quantity =
        Number(item.quantity || 1) + change;

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product => product.id !== productId
            );
    }

    saveCart(cart);

    renderCart();

}


window.changeQuantity = changeQuantity;


/* =========================================================
   REMOVE FROM CART
========================================================= */

function removeFromCart(productId) {

    let cart = getCart();

    cart =
        cart.filter(
            item => item.id !== productId
        );

    saveCart(cart);

    renderCart();

}


window.removeFromCart = removeFromCart;


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout() {

    const cart = getCart();

    if (!cart.length) {
        alert("Your cart is empty.");
        return;
    }

    const user =
        getCurrentUserData();

    if (checkoutName) {
        checkoutName.value =
            user?.name || "";
    }

    if (checkoutPhone) {
        checkoutPhone.value =
            user?.phone || "";
    }

    if (checkoutEmail) {
        checkoutEmail.value =
            user?.email || "";
    }

    renderCheckoutSummary();

    showPage(checkoutPage);

}


window.openCheckout = openCheckout;


/* =========================================================
   CHECKOUT SUMMARY
========================================================= */

function renderCheckoutSummary() {

    if (!checkoutSummary) return;

    const cart = getCart();

    let total = 0;

    checkoutSummary.innerHTML =
        cart.map(item => {

            const itemTotal =
                Number(item.price || 0) *
                Number(item.quantity || 1);

            total += itemTotal;

            return `
                <div class="checkout-item">

                    <span>
                        ${escapeHTML(item.name)}
                        × ${Number(item.quantity || 1)}
                    </span>

                    <strong>
                        ${money(itemTotal)}
                    </strong>

                </div>
            `;

        }).join("") +
        `
            <div class="checkout-total">

                <span>Total</span>

                <strong>
                    ${money(total)}
                </strong>

            </div>
        `;

}


/* =========================================================
   PLACE ORDER
========================================================= */

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const firebaseUser =
                userAuth.currentUser;

            if (!firebaseUser) {
                alert("Please login first.");
                showAuth();
                return;
            }

            const cart = getCart();

            if (!cart.length) {
                alert("Your cart is empty.");
                return;
            }

            const name =
                checkoutName?.value.trim();

            const phone =
                checkoutPhone?.value.trim();

            const email =
                checkoutEmail?.value.trim();

            const address =
                checkoutAddress?.value.trim();

            if (!name || !phone || !email || !address) {
                alert("Please fill all checkout details.");
                return;
            }

            let total = 0;

            cart.forEach(item => {

                total +=
                    Number(item.price || 0) *
                    Number(item.quantity || 1);

            });

            try {

                const orderData = {

                    userId: firebaseUser.uid,

                    customer: {
                        name: name,
                        phone: phone,
                        email: email,
                        address: address
                    },

                    items: cart.map(item => ({
                        id: item.id,
                        name: item.name,
                        brand: item.brand || "",
                        price: Number(item.price || 0),
                        quantity: Number(item.quantity || 1),
                        image: item.image || ""
                    })),

                    total: total,

                    status: "Pending",

                    date: serverTimestamp()

                };

                const orderRef =
                    await addDoc(
                        collection(db, "orders"),
                        orderData
                    );

                const orderId =
                    orderRef.id;

                clearCart();

                if (successOrderId) {
                    successOrderId.textContent =
                        orderId;
                }

                currentWhatsappMessage =
                    createWhatsappMessage(
                        orderId,
                        orderData
                    );

                showPage(successPage);

            } catch (error) {

                console.error(error);

                alert(
                    "Order could not be placed: " +
                    error.message
                );

            }

        }
    );

}


/* =========================================================
   WHATSAPP ORDER MESSAGE
========================================================= */

function createWhatsappMessage(
    orderId,
    order
) {

    let message =
        `Hello MobileStore,%0A%0A`;

    message +=
        `Order ID: ${orderId}%0A`;

    message +=
        `Customer: ${encodeURIComponent(order.customer.name)}%0A`;

    message +=
        `Phone: ${encodeURIComponent(order.customer.phone)}%0A`;

    message +=
        `Email: ${encodeURIComponent(order.customer.email)}%0A`;

    message +=
        `Address: ${encodeURIComponent(order.customer.address)}%0A%0A`;

    message += `Products:%0A`;

    order.items.forEach(item => {

        message +=
            `• ${encodeURIComponent(item.name)} × ${item.quantity} = ${money(item.price * item.quantity)}%0A`;

    });

    message +=
        `%0ATotal: ${money(order.total)}%0A`;

    return message;

}


/* =========================================================
   WHATSAPP BUTTON
========================================================= */

if (successWhatsappBtn) {

    successWhatsappBtn.addEventListener(
        "click",
        () => {

            /*
              CHANGE THIS NUMBER TO YOUR
              MOBILESTORE WHATSAPP NUMBER.
              
              Example:
              919876543210
            */

            const whatsappNumber =
                "91XXXXXXXXXX";

            const url =
                `https://wa.me/${whatsappNumber}?text=${currentWhatsappMessage}`;

            window.open(
                url,
                "_blank"
            );

        }
    );

}


/* =========================================================
   ADMIN PRODUCT MANAGEMENT UI
========================================================= */

async function createAdminProductPanel() {

    if (!adminPage) return;

    let panel =
        document.getElementById(
            "firebaseAdminProductsPanel"
        );

    if (panel) return;

    panel =
        document.createElement("section");

    panel.id =
        "firebaseAdminProductsPanel";

    panel.innerHTML = `

        <div class="admin-product-manager">

            <div class="admin-product-header">

                <div>
                    <h2>Product Management</h2>
                    <p>
                        Add products here. Every logged-in user
                        will see these products.
                    </p>
                </div>

            </div>

            <form id="firebaseProductForm">

                <div class="admin-product-grid">

                    <input
                        id="productBrand"
                        type="text"
                        placeholder="Brand"
                        required
                    >

                    <input
                        id="productName"
                        type="text"
                        placeholder="Product Name"
                        required
                    >

                    <input
                        id="productPrice"
                        type="number"
                        placeholder="Price"
                        min="0"
                        required
                    >

                    <input
                        id="productOldPrice"
                        type="number"
                        placeholder="Old Price"
                        min="0"
                    >

                    <input
                        id="productRam"
                        type="text"
                        placeholder="RAM e.g. 8GB"
                    >

                    <input
                        id="productStorage"
                        type="text"
                        placeholder="Storage e.g. 256GB"
                    >

                    <input
                        id="productCamera"
                        type="text"
                        placeholder="Camera e.g. 50MP"
                    >

                    <input
                        id="productBattery"
                        type="text"
                        placeholder="Battery e.g. 5000mAh"
                    >

                    <input
                        id="productProcessor"
                        type="text"
                        placeholder="Processor"
                    >

                    <input
                        id="productImage"
                        type="url"
                        placeholder="Product Image URL"
                        required
                    >

                </div>

                <button
                    type="submit"
                    id="addFirebaseProductBtn"
                >
                    + Add Product
                </button>

            </form>

            <div
                id="firebaseAdminProductList"
                class="admin-product-list"
            ></div>

        </div>
    `;

    const possibleContainers = [
        adminPage.querySelector(".admin-main"),
        adminPage.querySelector(".admin-content"),
        adminPage.querySelector(".admin-container"),
        adminPage
    ];

    const container =
        possibleContainers.find(
            element => element
        );

    if (container) {
        container.prepend(panel);
    }

    const form =
        document.getElementById(
            "firebaseProductForm"
        );

    if (form) {

        form.addEventListener(
            "submit",
            addFirebaseProduct
        );

    }

}


/* =========================================================
   ADMIN ADD PRODUCT
========================================================= */

async function addFirebaseProduct(event) {

    event.preventDefault();

    const brand =
        document.getElementById("productBrand")
            ?.value.trim();

    const name =
        document.getElementById("productName")
            ?.value.trim();

    const price =
        Number(
            document.getElementById("productPrice")
                ?.value
        );

    const oldPrice =
        Number(
            document.getElementById("productOldPrice")
                ?.value || 0
        );

    const ram =
        document.getElementById("productRam")
            ?.value.trim();

    const storage =
        document.getElementById("productStorage")
            ?.value.trim();

    const camera =
        document.getElementById("productCamera")
            ?.value.trim();

    const battery =
        document.getElementById("productBattery")
            ?.value.trim();

    const processor =
        document.getElementById("productProcessor")
            ?.value.trim();

    const image =
        document.getElementById("productImage")
            ?.value.trim();

    if (!brand || !name || !price || !image) {
        alert(
            "Brand, Product Name, Price and Image URL are required."
        );
        return;
    }

    try {

        await addDoc(
            collection(
                adminDb,
                "products"
            ),
            {

                brand: brand,
                name: name,

                price: price,
                oldPrice: oldPrice,

                ram: ram,
                storage: storage,
                camera: camera,
                battery: battery,
                processor: processor,

                image: image,

                createdAt:
                    serverTimestamp(),

                createdBy:
                    ADMIN_EMAIL

            }
        );

        alert(
            "Product added successfully."
        );

        document
            .getElementById(
                "firebaseProductForm"
            )
            ?.reset();

    } catch (error) {

        console.error(error);

        alert(
            "Product could not be added: " +
            error.message
        );

    }

}


/* =========================================================
   ADMIN PRODUCTS LIST
========================================================= */

let unsubscribeAdminProducts = null;


function startAdminProductsListener() {

    if (unsubscribeAdminProducts) {
        unsubscribeAdminProducts();
    }

    const list =
        document.getElementById(
            "firebaseAdminProductList"
        );

    if (!list) return;

    unsubscribeAdminProducts =
        onSnapshot(
            collection(
                adminDb,
                "products"
            ),
            snapshot => {

                const adminProducts =
                    snapshot.docs.map(item => ({
                        id: item.id,
                        ...item.data()
                    }));

                adminProducts.sort(
                    (a, b) =>
                        (b.createdAt?.seconds || 0) -
                        (a.createdAt?.seconds || 0)
                );

                if (!adminProducts.length) {

                    list.innerHTML = `
                        <div class="empty-state">
                            <h3>No Products Added</h3>
                            <p>
                                Add your first product above.
                            </p>
                        </div>
                    `;

                    return;
                }

                list.innerHTML =
                    adminProducts.map(product => `

                        <div class="admin-product-row">

                            <img
                                src="${escapeHTML(product.image || "")}"
                                alt="${escapeHTML(product.name)}"
                            >

                            <div>

                                <strong>
                                    ${escapeHTML(product.name)}
                                </strong>

                                <span>
                                    ${escapeHTML(product.brand || "")}
                                </span>

                                <b>
                                    ${money(product.price)}
                                </b>

                            </div>

                            <button
                                type="button"
                                onclick="deleteFirebaseProduct('${escapeHTML(product.id)}')"
                            >
                                Delete
                            </button>

                        </div>

                    `).join("");

            },
            error => {

                console.error(
                    "Admin products error:",
                    error
                );

            }
        );

}


/* =========================================================
   ADMIN DELETE PRODUCT
========================================================= */

async function deleteFirebaseProduct(productId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this product?"
        );

    if (!confirmDelete) return;

    try {

        await deleteDoc(
            doc(
                adminDb,
                "products",
                productId
            )
        );

        alert(
            "Product deleted successfully."
        );

    } catch (error) {

        console.error(error);

        alert(
            "Product could not be deleted: " +
            error.message
        );

    }

}


window.deleteFirebaseProduct =
    deleteFirebaseProduct;


/* =========================================================
   ADMIN LOAD USERS
========================================================= */

async function loadAdminUsers() {

    if (!usersTableBody) return;

    try {

        const snapshot =
            await getDocs(
                collection(
                    adminDb,
                    "users"
                )
            );

        allUsers =
            snapshot.docs.map(item => ({
                id: item.id,
                ...item.data()
            }));

        renderAdminUsers();

        if (totalUsers) {
            totalUsers.textContent =
                allUsers.length;
        }

    } catch (error) {

        console.error(error);

        usersTableBody.innerHTML = `
            <tr>
                <td colspan="10">
                    ${escapeHTML(error.message)}
                </td>
            </tr>
        `;

    }

}


/* =========================================================
   RENDER ADMIN USERS
========================================================= */

function renderAdminUsers() {

    if (!usersTableBody) return;

    const search =
        userSearch?.value
            .trim()
            .toLowerCase() || "";

    const filtered =
        allUsers.filter(user => {

            return (
                String(user.name || "")
                    .toLowerCase()
                    .includes(search) ||

                String(user.email || "")
                    .toLowerCase()
                    .includes(search) ||

                String(user.phone || "")
                    .toLowerCase()
                    .includes(search)
            );

        });

    if (!filtered.length) {

        usersTableBody.innerHTML = `
            <tr>
                <td colspan="10">
                    No users found.
                </td>
            </tr>
        `;

        return;
    }

    usersTableBody.innerHTML =
        filtered.map(user => {

            let date = "-";

            if (user.registrationDate?.toDate) {
                date =
                    user.registrationDate
                        .toDate()
                        .toLocaleString("en-IN");
            }

            return `
                <tr>

                    <td>
                        ${escapeHTML(user.name || "-")}
                    </td>

                    <td>
                        ${escapeHTML(user.email || "-")}
                    </td>

                    <td>
                        ${escapeHTML(user.phone || "-")}
                    </td>

                    <td>
                        ${escapeHTML(date)}
                    </td>

                </tr>
            `;

        }).join("");

}


if (userSearch) {

    userSearch.addEventListener(
        "input",
        renderAdminUsers
    );

}


/* =========================================================
   ADMIN LOAD ORDERS
========================================================= */

async function loadAdminOrders() {

    if (!ordersTableBody) return;

    try {

        const snapshot =
            await getDocs(
                collection(
                    adminDb,
                    "orders"
                )
            );

        allOrders =
            snapshot.docs.map(item => ({
                id: item.id,
                ...item.data()
            }));

        allOrders.sort(
            (a, b) =>
                (b.date?.seconds || 0) -
                (a.date?.seconds || 0)
        );

        renderAdminOrders();

        updateAdminStats();

    } catch (error) {

        console.error(error);

        ordersTableBody.innerHTML = `
            <tr>
                <td colspan="10">
                    ${escapeHTML(error.message)}
                </td>
            </tr>
        `;

    }

}


/* =========================================================
   RENDER ADMIN ORDERS
========================================================= */

function renderAdminOrders() {

    if (!ordersTableBody) return;

    const search =
        orderSearch?.value
            .trim()
            .toLowerCase() || "";

    const filtered =
        allOrders.filter(order => {

            const customer =
                order.customer || {};

            return (

                order.id
                    .toLowerCase()
                    .includes(search) ||

                String(customer.name || "")
                    .toLowerCase()
                    .includes(search) ||

                String(customer.email || "")
                    .toLowerCase()
                    .includes(search) ||

                String(customer.phone || "")
                    .toLowerCase()
                    .includes(search)

            );

        });

    if (!filtered.length) {

        ordersTableBody.innerHTML = `
            <tr>
                <td colspan="10">
                    No orders found.
                </td>
            </tr>
        `;

        return;
    }

    ordersTableBody.innerHTML =
        filtered.map(order => {

            const customer =
                order.customer || {};

            const items =
                order.items || [];

            const itemText =
                items.map(
                    item =>
                        `${escapeHTML(item.name)} × ${item.quantity}`
                ).join(", ");

            let date = "-";

            if (order.date?.toDate) {

                date =
                    order.date
                        .toDate()
                        .toLocaleString("en-IN");

            }

            return `
                <tr>

                    <td>
                        ${escapeHTML(order.id)}
                    </td>

                    <td>
                        ${escapeHTML(customer.name || "-")}
                    </td>

                    <td>
                        ${escapeHTML(customer.phone || "-")}
                    </td>

                    <td>
                        ${escapeHTML(itemText)}
                    </td>

                    <td>
                        ${money(order.total)}
                    </td>

                    <td>
                        ${escapeHTML(order.status || "Pending")}
                    </td>

                    <td>
                        ${escapeHTML(date)}
                    </td>

                </tr>
            `;

        }).join("");

}


if (orderSearch) {

    orderSearch.addEventListener(
        "input",
        renderAdminOrders
    );

}


/* =========================================================
   ADMIN STATS
========================================================= */

function updateAdminStats() {

    if (totalOrders) {
        totalOrders.textContent =
            allOrders.length;
    }

    const sales =
        allOrders.reduce(
            (sum, order) =>
                sum + Number(order.total || 0),
            0
        );

    if (totalSales) {
        totalSales.textContent =
            money(sales);
    }

}


/* =========================================================
   PROFILE BUTTON
========================================================= */

if (profileBtn) {

    profileBtn.addEventListener(
        "click",
        () => {

            const user =
                getCurrentUserData();

            if (!user) return;

            alert(
                `Name: ${user.name}\n` +
                `Email: ${user.email}\n` +
                `Phone: ${user.phone || "-"}`
            );

        }
    );

}


/* =========================================================
   INITIAL UI
========================================================= */

updateCartCount();

const lastRegisteredEmail =
    localStorage.getItem(
        LAST_EMAIL_KEY
    );

if (loginEmail && lastRegisteredEmail) {
    loginEmail.value =
        lastRegisteredEmail;
}


/* =========================================================
   BACK BUTTON HELPERS
========================================================= */

window.goToStore = function () {
    openStore();
};


window.goToCart = function () {
    openCart();
};


window.goToLogin = function () {
    showAuth();
};


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "MobileStore Firebase system loaded successfully."
);
console.log(
    "Project:",
    firebaseConfig.projectId
);
console.log(
    "Admin:",
    ADMIN_EMAIL
);
