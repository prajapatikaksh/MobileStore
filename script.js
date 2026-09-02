/* =========================================================
   MOBILESTORE — FIREBASE + FULL APP
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
    updateDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";


/* =========================================================
   FIREBASE CONFIG
========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyC_A-EmObRGhRFxiaiHrXQ4zb49TzCPJ3w",
    authDomain: "mobilestore-d044c.firebaseapp.com",
    projectId: "mobilestore-d044c",
    storageBucket: "mobilestore-d044c.firebasestorage.app",
    messagingSenderId: "942752515187",
    appId: "1:942752515187:web:779e0e178a4729e5b21606",
    measurementId: "G-XXBFTKTLPH"
};


/* =========================================================
   FIREBASE APPS
========================================================= */

const userApp =
    getApps().find(app => app.name === "MobileStoreUser")
        ? getApp("MobileStoreUser")
        : initializeApp(firebaseConfig, "MobileStoreUser");

const adminApp =
    getApps().find(app => app.name === "MobileStoreAdmin")
        ? getApp("MobileStoreAdmin")
        : initializeApp(firebaseConfig, "MobileStoreAdmin");


const auth = getAuth(userApp);
const db = getFirestore(userApp);

const adminAuth = getAuth(adminApp);
const adminDb = getFirestore(adminApp);


/* =========================================================
   CONSTANTS
========================================================= */

const ADMIN_EMAIL = "admin@mobilestore.com";

/*
   IMPORTANT:
   Aa number tamara real WhatsApp number thi replace kari shako.
   Country code sathe, + vagar.
*/
const WHATSAPP_NUMBER = "917990130683";


/* =========================================================
   DOM HELPER
========================================================= */

const $ = id => document.getElementById(id);


/* =========================================================
   APP STATE
========================================================= */

let currentUser = null;
let currentProduct = null;

let products = [];
let users = [];
let orders = [];

let selectedBrand = "All";

let unsubscribeProducts = null;
let unsubscribeUsers = null;
let unsubscribeOrders = null;


/* =========================================================
   LOCAL CART
========================================================= */

function getCart() {
    try {
        return JSON.parse(
            localStorage.getItem("mobileStoreCart") || "[]"
        );
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(
        "mobileStoreCart",
        JSON.stringify(cart)
    );

    updateCartCount();
}


/* =========================================================
   MONEY
========================================================= */

function money(value) {
    return "₹" + Number(value || 0).toLocaleString("en-IN");
}


/* =========================================================
   TOAST
========================================================= */

function toast(message) {

    const box = $("toast");
    const text = $("toastMessage");

    if (!box || !text) {
        alert(message);
        return;
    }

    text.textContent = message;

    box.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        box.classList.remove("show");
    }, 2800);
}


/* =========================================================
   PAGE SYSTEM
========================================================= */

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
        page.classList.remove("active");
    });

    const page = $(pageId);

    if (!page) return;

    page.classList.remove("hidden");
    page.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (pageId === "storePage") {
        renderProducts();
        updateCartCount();
    }


    if (pageId === "cartPage") {
        renderCart();
    }


    if (pageId === "checkoutPage") {
        prepareCheckout();
    }


    if (pageId === "adminPage") {
        startAdminListeners();
    }
}


/* =========================================================
   PASSWORD TOGGLE
========================================================= */

function setupPasswordToggle(buttonId, inputId) {

    const button = $(buttonId);
    const input = $(inputId);

    if (!button || !input) return;

    button.addEventListener("click", () => {

        if (input.type === "password") {

            input.type = "text";
            button.textContent = "Hide";

        } else {

            input.type = "password";
            button.textContent = "Show";

        }

    });
}


setupPasswordToggle(
    "loginPasswordToggle",
    "loginPassword"
);

setupPasswordToggle(
    "registerPasswordToggle",
    "registerPassword"
);

setupPasswordToggle(
    "adminPasswordToggle",
    "adminPassword"
);


/* =========================================================
   REGISTER
========================================================= */

$("registerForm")?.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        const name = $("registerName").value.trim();
        const phone = $("registerPhone").value.trim();
        const email = $("registerEmail").value.trim();
        const password = $("registerPassword").value;


        if (!name || !phone || !email || !password) {
            toast("Please fill all fields.");
            return;
        }


        if (password.length < 6) {
            toast("Password must contain at least 6 characters.");
            return;
        }


        try {

            const result =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user = result.user;


            await setDoc(
                doc(db, "users", user.uid),
                {
                    uid: user.uid,
                    name: name,
                    phone: phone,
                    email: email,
                    registrationDate:
                        new Date().toISOString()
                }
            );


            localStorage.setItem(
                "mobileStoreLastRegisteredEmail",
                email
            );


            toast("Account created successfully.");


            $("registerForm").reset();


            setTimeout(() => {
                showPage("storePage");
            }, 700);

        } catch (error) {

            console.error(error);

            toast(firebaseError(error));

        }

    }
);


/* =========================================================
   LOGIN
========================================================= */

$("loginForm")?.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        const email =
            $("loginEmail").value.trim();

        const password =
            $("loginPassword").value;


        if (!email || !password) {
            toast("Enter email and password.");
            return;
        }


        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            toast("Login successful.");

        } catch (error) {

            console.error(error);

            toast(firebaseError(error));

        }

    }
);


/* =========================================================
   FORGOT PASSWORD
========================================================= */

$("forgotPasswordBtn")?.addEventListener(
    "click",
    async () => {

        const email =
            $("loginEmail").value.trim();


        if (!email) {
            toast("First enter your email.");
            return;
        }


        try {

            await sendPasswordResetEmail(
                auth,
                email
            );

            toast(
                "Password reset email sent. Check your inbox."
            );

        } catch (error) {

            console.error(error);

            toast(firebaseError(error));

        }

    }
);


/* =========================================================
   SHOW REGISTER
========================================================= */

$("showRegisterBtn")?.addEventListener(
    "click",
    () => {

        $("loginBox")?.classList.add("hidden");
        $("registerBox")?.classList.remove("hidden");

    }
);


/* =========================================================
   SHOW LOGIN
========================================================= */

$("showLoginBtn")?.addEventListener(
    "click",
    () => {

        $("registerBox")?.classList.add("hidden");
        $("loginBox")?.classList.remove("hidden");

    }
);


/* =========================================================
   LOAD LAST REGISTERED EMAIL
========================================================= */

const lastEmail =
    localStorage.getItem(
        "mobileStoreLastRegisteredEmail"
    );

if (lastEmail && $("loginEmail")) {
    $("loginEmail").value = lastEmail;
}


/* =========================================================
   USER AUTH STATE
========================================================= */

onAuthStateChanged(
    auth,
    async user => {

        currentUser = user;


        if (user) {

            try {

                const profile =
                    await getUserProfile(user.uid);


                if ($("userNameNav")) {

                    $("userNameNav").textContent =
                        profile?.name ||
                        user.email?.split("@")[0] ||
                        "User";

                }


                fillCheckoutUser(
                    profile,
                    user
                );


                listenProducts();

                showPage("storePage");

            } catch (error) {

                console.error(error);

                listenProducts();

                showPage("storePage");
            }

        } else {

            showPage("authPage");

        }

    }
);


/* =========================================================
   GET USER PROFILE
========================================================= */

async function getUserProfile(uid) {

    return new Promise(resolve => {

        let finished = false;

        const unsubscribe =
            onSnapshot(
                doc(db, "users", uid),

                snapshot => {

                    if (finished) return;

                    finished = true;

                    unsubscribe();

                    resolve(
                        snapshot.exists()
                            ? snapshot.data()
                            : null
                    );

                },

                error => {

                    console.error(error);

                    if (finished) return;

                    finished = true;

                    unsubscribe();

                    resolve(null);

                }
            );

    });

}


/* =========================================================
   FILL CHECKOUT USER
========================================================= */

function fillCheckoutUser(profile, user) {

    if ($("checkoutName")) {

        $("checkoutName").value =
            profile?.name || "";

    }

    if ($("checkoutPhone")) {

        $("checkoutPhone").value =
            profile?.phone || "";

    }

    if ($("checkoutEmail")) {

        $("checkoutEmail").value =
            user?.email || "";

    }
}


/* =========================================================
   LOGOUT
========================================================= */

$("logoutBtn")?.addEventListener(
    "click",
    async () => {

        try {

            await signOut(auth);

            toast("Logged out.");

        } catch (error) {

            console.error(error);

        }

    }
);


/* =========================================================
   PRODUCT LISTENER
========================================================= */

function listenProducts() {

    if (unsubscribeProducts) {
        unsubscribeProducts();
    }


    const productQuery =
        query(
            collection(db, "products"),
            orderBy("createdAt", "desc")
        );


    unsubscribeProducts =
        onSnapshot(
            productQuery,

            snapshot => {

                products =
                    snapshot.docs.map(
                        item => ({
                            id: item.id,
                            ...item.data()
                        })
                    );


                renderProducts();
                renderAdminProducts();

            },

            error => {

                console.error(
                    "Products error:",
                    error
                );

                /*
                   If createdAt ordering causes a problem
                   because old docs don't have createdAt,
                   use simple collection listener.
                */

                fallbackProductListener();

            }
        );

}


/* =========================================================
   FALLBACK PRODUCT LISTENER
========================================================= */

function fallbackProductListener() {

    if (unsubscribeProducts) {
        unsubscribeProducts();
    }


    unsubscribeProducts =
        onSnapshot(
            collection(db, "products"),

            snapshot => {

                products =
                    snapshot.docs.map(
                        item => ({
                            id: item.id,
                            ...item.data()
                        })
                    );


                products.sort(
                    (a, b) =>
                        Number(b.createdAtMs || 0) -
                        Number(a.createdAtMs || 0)
                );


                renderProducts();
                renderAdminProducts();

            },

            error => {

                console.error(error);

                toast(
                    "Cannot load products. Check Firestore rules."
                );

            }
        );

}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function getFilteredProducts() {

    const search =
        ($("searchInput")?.value || "")
            .trim()
            .toLowerCase();


    return products.filter(product => {

        const brandMatch =
            selectedBrand === "All" ||
            String(product.brand || "")
                .toLowerCase() ===
            selectedBrand.toLowerCase();


        const text =
            `${product.name || ""} ${product.brand || ""}`
                .toLowerCase();


        const searchMatch =
            !search ||
            text.includes(search);


        return brandMatch && searchMatch;

    });

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const grid = $("productGrid");

    if (!grid) return;


    const filtered =
        getFilteredProducts();


    if ($("productResultText")) {

        $("productResultText").textContent =
            `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`;

    }


    if (!products.length) {

        grid.innerHTML = `
            <div class="empty-state">
                <h3>No Products Yet</h3>
                <p>
                    Products added by the admin will appear here.
                </p>
            </div>
        `;

        return;

    }


    if (!filtered.length) {

        grid.innerHTML = `
            <div class="empty-state">
                <h3>No Matching Products</h3>
                <p>
                    Try another search or brand.
                </p>
            </div>
        `;

        return;

    }


    grid.innerHTML =
        filtered.map(product => {

            const oldPrice =
                Number(product.oldPrice || 0);


            return `
                <article
                    class="product-card"
                    data-product-id="${escapeHtml(product.id)}"
                >

                    <div class="product-image">

                        <img
                            src="${escapeHtml(product.image || "")}"
                            alt="${escapeHtml(product.name || "Product")}"
                            loading="lazy"
                            onerror="this.src='https://via.placeholder.com/500x500?text=Mobile'"
                        >

                    </div>


                    <div class="product-info">

                        <div class="product-brand">
                            ${escapeHtml(product.brand || "Mobile")}
                        </div>


                        <h3 class="product-name">
                            ${escapeHtml(product.name || "Unnamed Product")}
                        </h3>


                        <div class="product-price">

                            <strong>
                                ${money(product.price)}
                            </strong>

                            ${
                                oldPrice > Number(product.price || 0)
                                    ? `<del>${money(oldPrice)}</del>`
                                    : ""
                            }

                        </div>


                        <div class="product-actions">

                            <button
                                type="button"
                                class="view-btn"
                                data-action="viewProduct"
                                data-id="${escapeHtml(product.id)}"
                            >
                                View
                            </button>


                            <button
                                type="button"
                                class="add-btn"
                                data-action="addCart"
                                data-id="${escapeHtml(product.id)}"
                            >
                                Add to Cart
                            </button>

                        </div>

                    </div>

                </article>
            `;

        }).join("");

}


/* =========================================================
   SEARCH
========================================================= */

$("searchInput")?.addEventListener(
    "input",
    () => {
        renderProducts();
    }
);


/* =========================================================
   BRAND FILTER
========================================================= */

document.querySelectorAll(".category").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".category")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                button.classList.add("active");


                selectedBrand =
                    button.dataset.brand || "All";


                renderProducts();

            }
        );

    }
);


/* =========================================================
   VIEW PRODUCT
========================================================= */

function viewProduct(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) {
        toast("Product not found.");
        return;
    }


    currentProduct = product;


    renderProductDetails();

    showPage("productPage");

}


/* =========================================================
   PRODUCT DETAILS
========================================================= */

function renderProductDetails() {

    const box = $("productDetails");

    if (!box || !currentProduct) return;


    const p = currentProduct;


    box.innerHTML = `

        <div class="details-card">

            <div class="details-image">

                <img
                    src="${escapeHtml(p.image || "")}"
                    alt="${escapeHtml(p.name || "Product")}"
                    onerror="this.src='https://via.placeholder.com/500x500?text=Mobile'"
                >

            </div>


            <div class="details-info">

                <div class="product-brand">
                    ${escapeHtml(p.brand || "Mobile")}
                </div>


                <h1>
                    ${escapeHtml(p.name || "Unnamed Product")}
                </h1>


                <div class="detail-price">
                    ${money(p.price)}
                </div>


                <p>
                    Premium smartphone with powerful
                    performance and modern features.
                </p>


                <div class="spec-grid">

                    ${spec("RAM", p.ram)}
                    ${spec("Storage", p.storage)}
                    ${spec("Camera", p.camera)}
                    ${spec("Battery", p.battery)}
                    ${spec("Processor", p.processor)}

                </div>


                <button
                    type="button"
                    class="primary-btn"
                    data-action="addCartDetails"
                >
                    Add to Cart
                </button>


                <button
                    type="button"
                    class="secondary-btn"
                    data-action="buyNow"
                >
                    Buy Now
                </button>

            </div>

        </div>

    `;

}


function spec(title, value) {

    return `
        <div class="spec-item">

            <span>
                ${escapeHtml(title)}
            </span>

            <strong>
                ${escapeHtml(value || "—")}
            </strong>

        </div>
    `;

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) {
        toast("Product not found.");
        return;
    }


    const cart = getCart();


    const exists =
        cart.find(
            item => item.id === id
        );


    if (exists) {

        toast("Product is already in cart.");
        return;

    }


    cart.push({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: Number(product.price || 0),
        image: product.image || "",
        quantity: 1
    });


    saveCart(cart);


    toast("Added to cart.");

}


/* =========================================================
   BUY NOW
========================================================= */

function buyNow() {

    if (!currentProduct) return;


    addToCart(currentProduct.id);

    showPage("checkoutPage");

}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    const cart = getCart();

    const count =
        cart.reduce(
            (sum, item) =>
                sum + Number(item.quantity || 1),
            0
        );


    if ($("cartCount")) {
        $("cartCount").textContent = count;
    }

    if ($("detailCartCount")) {
        $("detailCartCount").textContent = count;
    }

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    const box = $("cartContent");

    if (!box) return;


    const cart = getCart();


    if (!cart.length) {

        box.innerHTML = `
            <div class="empty-state">

                <h3>Your Cart is Empty</h3>

                <p>
                    Add some smartphones to continue.
                </p>

                <button
                    type="button"
                    class="primary-btn"
                    data-page="storePage"
                    style="max-width:220px;margin:20px auto 0;"
                >
                    Browse Phones
                </button>

            </div>
        `;

        return;

    }


    const subtotal =
        cart.reduce(
            (sum, item) =>
                sum +
                Number(item.price || 0) *
                Number(item.quantity || 1),
            0
        );


    box.innerHTML = `

        <div class="cart-layout">

            <div class="cart-items">

                ${cart.map(item => `

                    <div class="cart-item">

                        <div class="cart-item-image">

                            <img
                                src="${escapeHtml(item.image || "")}"
                                alt="${escapeHtml(item.name || "Product")}"
                            >

                        </div>


                        <div class="cart-item-info">

                            <h3>
                                ${escapeHtml(item.name || "")}
                            </h3>

                            <p>
                                ${escapeHtml(item.brand || "")}
                            </p>

                            <div class="cart-item-price">
                                ${money(item.price)}
                            </div>

                        </div>


                        <div>

                            <button
                                type="button"
                                class="remove-cart-btn"
                                data-action="removeCart"
                                data-id="${escapeHtml(item.id)}"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                `).join("")}

            </div>


            <aside class="cart-summary">

                <h3>
                    Order Summary
                </h3>


                <div class="summary-row">

                    <span>
                        Items
                    </span>

                    <span>
                        ${cart.length}
                    </span>

                </div>


                <div class="summary-row">

                    <span>
                        Subtotal
                    </span>

                    <span>
                        ${money(subtotal)}
                    </span>

                </div>


                <div class="summary-row">

                    <span>
                        Delivery
                    </span>

                    <span>
                        FREE
                    </span>

                </div>


                <div class="summary-total">

                    <span>
                        Total
                    </span>

                    <strong>
                        ${money(subtotal)}
                    </strong>

                </div>


                <button
                    type="button"
                    class="primary-btn"
                    data-page="checkoutPage"
                    style="margin-top:18px;"
                >
                    Proceed to Checkout
                </button>

            </aside>

        </div>

    `;

}


/* =========================================================
   REMOVE CART
========================================================= */

function removeFromCart(id) {

    const cart =
        getCart().filter(
            item => item.id !== id
        );


    saveCart(cart);

    renderCart();

    toast("Product removed.");

}


/* =========================================================
   CHECKOUT
========================================================= */

function prepareCheckout() {

    const cart = getCart();

    if (!cart.length) {

        showPage("cartPage");

        toast("Your cart is empty.");

        return;

    }


    renderCheckoutSummary();

    updateCartCount();

}


function renderCheckoutSummary() {

    const box = $("checkoutSummary");

    if (!box) return;


    const cart = getCart();


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                Number(item.price || 0) *
                Number(item.quantity || 1),
            0
        );


    box.innerHTML = `

        <h3>
            Your Order
        </h3>


        ${cart.map(item => `

            <div class="checkout-product">

                <img
                    src="${escapeHtml(item.image || "")}"
                    alt=""
                >

                <div class="checkout-product-info">

                    <strong>
                        ${escapeHtml(item.name || "")}
                    </strong>

                    <span>
                        Qty: ${item.quantity || 1}
                    </span>

                </div>


                <strong>
                    ${money(
                        Number(item.price || 0) *
                        Number(item.quantity || 1)
                    )}
                </strong>

            </div>

        `).join("")}


        <div class="summary-total">

            <span>
                Total
            </span>

            <strong>
                ${money(total)}
            </strong>

        </div>

    `;

}


/* =========================================================
   PLACE ORDER
========================================================= */

$("checkoutForm")?.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        if (!currentUser) {

            toast("Please login first.");
            showPage("authPage");

            return;

        }


        const cart = getCart();


        if (!cart.length) {

            toast("Your cart is empty.");
            showPage("cartPage");

            return;

        }


        const name =
            $("checkoutName").value.trim();

        const phone =
            $("checkoutPhone").value.trim();

        const email =
            $("checkoutEmail").value.trim();

        const address =
            $("checkoutAddress").value.trim();


        if (!name || !phone || !email || !address) {

            toast("Please fill all delivery details.");

            return;

        }


        const total =
            cart.reduce(
                (sum, item) =>
                    sum +
                    Number(item.price || 0) *
                    Number(item.quantity || 1),
                0
            );


        const orderData = {

            userId: currentUser.uid,

            customer: {
                name,
                phone,
                email,
                address
            },

            items: cart,

            total,

            status: "Pending",

            date: new Date().toISOString(),

            createdAt: serverTimestamp(),

            createdAtMs: Date.now()

        };


        try {

            const orderRef =
                await addDoc(
                    collection(db, "orders"),
                    orderData
                );


            localStorage.setItem(
                "mobileStoreLastOrder",
                JSON.stringify({
                    id: orderRef.id,
                    ...orderData
                })
            );


            localStorage.removeItem(
                "mobileStoreCart"
            );


            $("checkoutForm").reset();


            if (currentUser) {

                try {

                    const profile =
                        await getUserProfile(
                            currentUser.uid
                        );

                    fillCheckoutUser(
                        profile,
                        currentUser
                    );

                } catch {}

            }


            $("successOrderId").textContent =
                orderRef.id;


            setupSuccessWhatsapp(
                orderRef.id,
                orderData
            );


            showPage("successPage");

            toast("Order placed successfully.");

        } catch (error) {

            console.error(error);

            toast(
                "Order failed: " +
                firebaseError(error)
            );

        }

    }
);


/* =========================================================
   WHATSAPP
========================================================= */

function setupSuccessWhatsapp(
    orderId,
    orderData
) {

    const button =
        $("successWhatsappBtn");


    if (!button) return;


    button.onclick = () => {

        const message =
            buildWhatsappMessage(
                orderId,
                orderData
            );


        const url =
            `https://wa.me/${WHATSAPP_NUMBER}?text=` +
            encodeURIComponent(message);


        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    };

}


function buildWhatsappMessage(
    orderId,
    order
) {

    let message =
        `*MobileStore Order*\n\n` +
        `Order ID: ${orderId}\n` +
        `Name: ${order.customer.name}\n` +
        `Phone: ${order.customer.phone}\n` +
        `Email: ${order.customer.email}\n` +
        `Address: ${order.customer.address}\n\n` +
        `*Products:*\n`;


    order.items.forEach(
        (item, index) => {

            message +=
                `${index + 1}. ${item.name}` +
                ` × ${item.quantity || 1}` +
                ` — ${money(
                    Number(item.price || 0) *
                    Number(item.quantity || 1)
                )}\n`;

        }
    );


    message +=
        `\n*Total: ${money(order.total)}*`;


    return message;

}


/* =========================================================
   ADMIN LOGIN
========================================================= */

$("adminAccessBtn")?.addEventListener(
    "click",
    () => {

        showPage("adminLoginPage");

    }
);


/* =========================================================
   ADMIN LOGIN FORM
========================================================= */

$("adminLoginForm")?.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const email =
            $("adminEmail").value.trim();

        const password =
            $("adminPassword").value;


        if (
            email.toLowerCase() !==
            ADMIN_EMAIL
        ) {

            toast("Invalid admin email.");
            return;

        }


        try {

            const result =
                await signInWithEmailAndPassword(
                    adminAuth,
                    email,
                    password
                );


            if (
                result.user.email?.toLowerCase() !==
                ADMIN_EMAIL
            ) {

                await signOut(adminAuth);

                toast("You are not an admin.");

                return;

            }


            toast("Admin login successful.");

            showPage("adminPage");

        } catch (error) {

            console.error(error);

            toast(firebaseError(error));

        }

    }
);


/* =========================================================
   ADMIN LOGOUT
========================================================= */

$("adminLogoutBtn")?.addEventListener(
    "click",
    async () => {

        try {

            await signOut(adminAuth);

            stopAdminListeners();

            showPage("authPage");

            toast("Admin logged out.");

        } catch (error) {

            console.error(error);

        }

    }
);


/* =========================================================
   ADMIN PRODUCT ADD
========================================================= */

$("productForm")?.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const adminUser =
            adminAuth.currentUser;


        if (!adminUser) {

            toast("Admin login required.");

            showPage("adminLoginPage");

            return;

        }


        if (
            adminUser.email?.toLowerCase() !==
            ADMIN_EMAIL
        ) {

            toast("Unauthorized admin.");

            return;

        }


        const product = {

            name:
                $("productName").value.trim(),

            brand:
                $("productBrand").value.trim(),

            price:
                Number(
                    $("productPrice").value
                ),

            oldPrice:
                Number(
                    $("productOldPrice").value || 0
                ),

            image:
                $("productImage").value.trim(),

            ram:
                $("productRam").value.trim(),

            storage:
                $("productStorage").value.trim(),

            camera:
                $("productCamera").value.trim(),

            battery:
                $("productBattery").value.trim(),

            processor:
                $("productProcessor").value.trim(),

            createdAt:
                serverTimestamp(),

            createdAtMs:
                Date.now()

        };


        if (
            !product.name ||
            !product.brand ||
            !product.price ||
            !product.image
        ) {

            toast(
                "Name, brand, price and image are required."
            );

            return;

        }


        try {

            await addDoc(
                collection(
                    adminDb,
                    "products"
                ),
                product
            );


            $("productForm").reset();

            toast("Product added successfully.");

        } catch (error) {

            console.error(error);

            toast(
                "Could not add product: " +
                firebaseError(error)
            );

        }

    }
);


/* =========================================================
   ADMIN PRODUCTS
========================================================= */

function renderAdminProducts() {

    const grid =
        $("adminProductGrid");


    if (!grid) return;


    const search =
        ($("productSearch")?.value || "")
            .trim()
            .toLowerCase();


    const filtered =
        products.filter(product => {

            const text =
                `${product.name || ""} ${product.brand || ""}`
                    .toLowerCase();

            return !search ||
                text.includes(search);

        });


    if (!filtered.length) {

        grid.innerHTML = `
            <div class="empty-state">
                <h3>No Products</h3>
                <p>
                    Add products from the form above.
                </p>
            </div>
        `;

        return;

    }


    grid.innerHTML =
        filtered.map(product => `

            <div class="admin-product-card">

                <img
                    src="${escapeHtml(product.image || "")}"
                    alt="${escapeHtml(product.name || "")}"
                    onerror="this.src='https://via.placeholder.com/500x500?text=Mobile'"
                >


                <div class="admin-product-info">

                    <h3>
                        ${escapeHtml(product.name || "")}
                    </h3>

                    <p>
                        ${escapeHtml(product.brand || "")}
                    </p>

                    <p>
                        ${money(product.price)}
                    </p>


                    <button
                        type="button"
                        class="delete-product-btn"
                        data-action="deleteProduct"
                        data-id="${escapeHtml(product.id)}"
                    >
                        Delete Product
                    </button>

                </div>

            </div>

        `).join("");

}


/* =========================================================
   PRODUCT SEARCH ADMIN
========================================================= */

$("productSearch")?.addEventListener(
    "input",
    () => {
        renderAdminProducts();
    }
);


/* =========================================================
   DELETE PRODUCT
========================================================= */

async function deleteProduct(id) {

    if (
        !confirm(
            "Are you sure you want to delete this product?"
        )
    ) {
        return;
    }


    try {

        await deleteDoc(
            doc(
                adminDb,
                "products",
                id
            )
        );


        toast("Product deleted.");

    } catch (error) {

        console.error(error);

        toast(
            "Delete failed: " +
            firebaseError(error)
        );

    }

}


/* =========================================================
   ADMIN LISTENERS
========================================================= */

function startAdminListeners() {

    listenAdminProducts();
    listenUsers();
    listenOrders();

}


function stopAdminListeners() {

    if (unsubscribeUsers) {
        unsubscribeUsers();
        unsubscribeUsers = null;
    }

    if (unsubscribeOrders) {
        unsubscribeOrders();
        unsubscribeOrders = null;
    }

}


/* =========================================================
   ADMIN PRODUCT LISTENER
========================================================= */

function listenAdminProducts() {

    /*
       User product listener already uses same
       Firestore project and updates admin grid.
    */

    if (!unsubscribeProducts) {
        listenProducts();
    }

}


/* =========================================================
   USERS LISTENER
========================================================= */

function listenUsers() {

    if (unsubscribeUsers) {
        unsubscribeUsers();
    }


    unsubscribeUsers =
        onSnapshot(
            collection(adminDb, "users"),

            snapshot => {

                users =
                    snapshot.docs.map(
                        item => ({
                            id: item.id,
                            ...item.data()
                        })
                    );


                renderUsers();
                updateAdminStats();

            },

            error => {

                console.error(error);

                toast(
                    "Cannot load users. Check Firestore rules."
                );

            }
        );

}


/* =========================================================
   RENDER USERS
========================================================= */

function renderUsers() {

    const tbody =
        $("usersTableBody");


    if (!tbody) return;


    const search =
        ($("userSearch")?.value || "")
            .trim()
            .toLowerCase();


    const filtered =
        users.filter(user => {

            const text =
                `${user.name || ""} ${user.email || ""} ${user.phone || ""}`
                    .toLowerCase();

            return !search ||
                text.includes(search);

        });


    if (!filtered.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="4">
                    No users found.
                </td>
            </tr>
        `;

        return;

    }


    tbody.innerHTML =
        filtered.map(user => `

            <tr>

                <td>
                    ${escapeHtml(user.name || "—")}
                </td>

                <td>
                    ${escapeHtml(user.phone || "—")}
                </td>

                <td>
                    ${escapeHtml(user.email || "—")}
                </td>

                <td>
                    ${formatDate(
                        user.registrationDate
                    )}
                </td>

            </tr>

        `).join("");

}


/* =========================================================
   USER SEARCH
========================================================= */

$("userSearch")?.addEventListener(
    "input",
    () => {
        renderUsers();
    }
);


/* =========================================================
   ORDERS LISTENER
========================================================= */

function listenOrders() {

    if (unsubscribeOrders) {
        unsubscribeOrders();
    }


    unsubscribeOrders =
        onSnapshot(
            collection(adminDb, "orders"),

            snapshot => {

                orders =
                    snapshot.docs.map(
                        item => ({
                            id: item.id,
                            ...item.data()
                        })
                    );


                orders.sort(
                    (a, b) =>
                        Number(b.createdAtMs || 0) -
                        Number(a.createdAtMs || 0)
                );


                renderOrders();
                updateAdminStats();

            },

            error => {

                console.error(error);

                toast(
                    "Cannot load orders. Check Firestore rules."
                );

            }
        );

}


/* =========================================================
   RENDER ORDERS
========================================================= */

function renderOrders() {

    const tbody =
        $("ordersTableBody");


    if (!tbody) return;


    const search =
        ($("orderSearch")?.value || "")
            .trim()
            .toLowerCase();


    const filtered =
        orders.filter(order => {

            const customer =
                order.customer || {};


            const text =
                `${order.id || ""} ` +
                `${customer.name || ""} ` +
                `${customer.email || ""} ` +
                `${customer.phone || ""}`
                    .toLowerCase();


            return !search ||
                text.includes(search);

        });


    if (!filtered.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6">
                    No orders found.
                </td>
            </tr>
        `;

        return;

    }


    tbody.innerHTML =
        filtered.map(order => {

            const customer =
                order.customer || {};


            const itemCount =
                (order.items || []).reduce(
                    (sum, item) =>
                        sum +
                        Number(item.quantity || 1),
                    0
                );


            return `

                <tr>

                    <td>
                        <strong>
                            ${escapeHtml(
                                order.id
                            )}
                        </strong>
                    </td>


                    <td>
                        ${escapeHtml(
                            customer.name || "—"
                        )}
                    </td>


                    <td>
                        ${itemCount}
                    </td>


                    <td>
                        ${money(order.total)}
                    </td>


                    <td>

                        <select
                            class="status-select"
                            data-action="orderStatus"
                            data-id="${escapeHtml(order.id)}"
                        >

                            ${statusOption(
                                "Pending",
                                order.status
                            )}

                            ${statusOption(
                                "Confirmed",
                                order.status
                            )}

                            ${statusOption(
                                "Shipped",
                                order.status
                            )}

                            ${statusOption(
                                "Delivered",
                                order.status
                            )}

                            ${statusOption(
                                "Cancelled",
                                order.status
                            )}

                        </select>

                    </td>


                    <td>
                        ${formatDate(
                            order.date
                        )}
                    </td>

                </tr>

            `;

        }).join("");

}


/* =========================================================
   STATUS OPTION
========================================================= */

function statusOption(value, current) {

    return `
        <option
            value="${value}"
            ${value === current ? "selected" : ""}
        >
            ${value}
        </option>
    `;

}


/* =========================================================
   UPDATE ORDER STATUS
========================================================= */

async function updateOrderStatus(
    orderId,
    status
) {

    try {

        await updateDoc(
            doc(
                adminDb,
                "orders",
                orderId
            ),
            {
                status: status
            }
        );


        toast(
            `Order status changed to ${status}.`
        );

    } catch (error) {

        console.error(error);

        toast(
            "Could not update order status."
        );

    }

}


/* =========================================================
   ORDER SEARCH
========================================================= */

$("orderSearch")?.addEventListener(
    "input",
    () => {
        renderOrders();
    }
);


/* =========================================================
   ADMIN STATS
========================================================= */

function updateAdminStats() {

    if ($("totalUsers")) {

        $("totalUsers").textContent =
            users.length;

    }


    if ($("totalOrders")) {

        $("totalOrders").textContent =
            orders.length;

    }


    if ($("totalSales")) {

        const sales =
            orders
                .filter(
                    order =>
                        order.status !==
                        "Cancelled"
                )
                .reduce(
                    (sum, order) =>
                        sum +
                        Number(order.total || 0),
                    0
                );


        $("totalSales").textContent =
            money(sales);

    }

}


/* =========================================================
   GLOBAL EVENT DELEGATION
   THIS FIXES MODULE + BUTTON PROBLEMS
========================================================= */

document.addEventListener(
    "click",
    event => {

        const pageButton =
            event.target.closest(
                "[data-page]"
            );


        if (
            pageButton &&
            !event.target.closest(
                ".product-card"
            )
        ) {

            const pageId =
                pageButton.dataset.page;

            if (pageId) {
                showPage(pageId);
                return;
            }

        }


        const actionButton =
            event.target.closest(
                "[data-action]"
            );


        if (!actionButton) return;


        const action =
            actionButton.dataset.action;

        const id =
            actionButton.dataset.id;


        switch (action) {

            case "viewProduct":

                viewProduct(id);

                break;


            case "addCart":

                addToCart(id);

                break;


            case "addCartDetails":

                if (currentProduct) {
                    addToCart(
                        currentProduct.id
                    );
                }

                break;


            case "buyNow":

                buyNow();

                break;


            case "removeCart":

                removeFromCart(id);

                break;


            case "deleteProduct":

                deleteProduct(id);

                break;


            case "scrollProducts":

                $("productsSection")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

                break;

        }

    }
);


/* =========================================================
   CHANGE EVENTS
========================================================= */

document.addEventListener(
    "change",
    event => {

        const element =
            event.target.closest(
                "[data-action]"
            );


        if (!element) return;


        if (
            element.dataset.action ===
            "orderStatus"
        ) {

            updateOrderStatus(
                element.dataset.id,
                element.value
            );

        }

    }
);


/* =========================================================
   PROFILE BUTTON
========================================================= */

$("profileBtn")?.addEventListener(
    "click",
    () => {

        if (!currentUser) {
            showPage("authPage");
            return;
        }


        const name =
            $("userNameNav")?.textContent ||
            "User";


        toast(
            `${name} • ${currentUser.email}`
        );

    }
);


/* =========================================================
   CART BUTTON
========================================================= */

$("cartBtn")?.addEventListener(
    "click",
    () => {

        showPage("cartPage");

    }
);


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(value) {

    if (!value) return "—";


    try {

        let date;


        if (
            typeof value === "object" &&
            value.seconds
        ) {

            date =
                new Date(
                    value.seconds * 1000
                );

        } else {

            date =
                new Date(value);

        }


        if (Number.isNaN(date.getTime())) {
            return "—";
        }


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    } catch {

        return "—";

    }

}


/* =========================================================
   FIREBASE ERROR
========================================================= */

function firebaseError(error) {

    const code =
        error?.code || "";


    const messages = {

        "auth/email-already-in-use":
            "This email is already registered.",

        "auth/invalid-email":
            "Invalid email address.",

        "auth/weak-password":
            "Password is too weak.",

        "auth/user-not-found":
            "No account found with this email.",

        "auth/wrong-password":
            "Incorrect password.",

        "auth/invalid-credential":
            "Incorrect email or password.",

        "auth/too-many-requests":
            "Too many attempts. Try again later.",

        "auth/network-request-failed":
            "Network error. Check your internet.",

        "permission-denied":
            "Permission denied. Check Firestore rules."

    };


    return (
        messages[code] ||
        error?.message ||
        "Something went wrong."
    );

}


/* =========================================================
   INITIAL CART
========================================================= */

updateCartCount();


/* =========================================================
   INITIAL PRODUCT LISTENER
========================================================= */

listenProducts();


console.log(
    "MobileStore Firebase App Loaded Successfully"
);
