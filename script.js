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
    sendPasswordResetEmail,/* =========================================================
   MOBILESTORE - COMPLETE SYSTEM
   ========================================================= */


/* =========================================================
   STORAGE KEYS
========================================================= */

const USERS_KEY = "mobileStoreUsers";
const ORDERS_KEY = "mobileStoreOrders";
const CURRENT_USER_KEY = "mobileStoreCurrentUser";
const CART_KEY = "mobileStoreCart";
const LAST_EMAIL_KEY = "mobileStoreLastRegisteredEmail";
const PRODUCTS_KEY = "mobileStoreProducts";

const DATA_VERSION_KEY = "mobileStoreDataVersion";

const CURRENT_DATA_VERSION =
    "2026-NEW-PRODUCT-SYSTEM-V1";


/* =========================================================
   ADMIN
========================================================= */

const ADMIN_EMAIL = "admin@mobilestore.com";
const ADMIN_PASSWORD = "admin123";

const WHATSAPP_NUMBER = "917990130683";


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let selectedBrand = "All";
let selectedProduct = null;
let selectedOrderForWhatsApp = null;


/* =========================================================
   ONE-TIME OLD DATA RESET
========================================================= */

function resetOldDataOnce() {

    const currentVersion =
        localStorage.getItem(DATA_VERSION_KEY);

    if (currentVersion !== CURRENT_DATA_VERSION) {

        [
            USERS_KEY,
            ORDERS_KEY,
            CURRENT_USER_KEY,
            CART_KEY,
            LAST_EMAIL_KEY,
            PRODUCTS_KEY
        ].forEach(key => {
            localStorage.removeItem(key);
        });

        localStorage.setItem(
            DATA_VERSION_KEY,
            CURRENT_DATA_VERSION
        );
    }
}


/* =========================================================
   SAFE STORAGE FUNCTIONS
========================================================= */

function getData(key, fallback) {

    try {

        const value =
            localStorage.getItem(key);

        if (!value) {
            return fallback;
        }

        return JSON.parse(value);

    } catch (error) {

        console.error(
            "Storage read error:",
            key,
            error
        );

        return fallback;
    }
}


function saveData(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    } catch (error) {

        console.error(
            "Storage save error:",
            key,
            error
        );
    }
}


/* =========================================================
   INITIAL DATA
========================================================= */

function initializeData() {

    if (!Array.isArray(getData(USERS_KEY, null))) {
        saveData(USERS_KEY, []);
    }

    if (!Array.isArray(getData(ORDERS_KEY, null))) {
        saveData(ORDERS_KEY, []);
    }

    if (!Array.isArray(getData(CART_KEY, null))) {
        saveData(CART_KEY, []);
    }

    if (!Array.isArray(getData(PRODUCTS_KEY, null))) {
        saveData(PRODUCTS_KEY, []);
    }
}


/* =========================================================
   ELEMENTS
========================================================= */

const authPage =
    document.getElementById("authPage");

const storePage =
    document.getElementById("storePage");

const productDetailsPage =
    document.getElementById("productDetailsPage");

const cartPage =
    document.getElementById("cartPage");

const checkoutPage =
    document.getElementById("checkoutPage");

const successPage =
    document.getElementById("successPage");

const adminLoginPage =
    document.getElementById("adminLoginPage");

const adminPage =
    document.getElementById("adminPage");


/* =========================================================
   PAGE SYSTEM
========================================================= */

function hideAllPages() {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active-page"
            );

        });
}


function showPage(id) {

    hideAllPages();

    const page =
        document.getElementById(id);

    if (page) {

        page.classList.add(
            "active-page"
        );

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   MONEY
========================================================= */

function money(value) {

    const amount =
        Number(value) || 0;

    return "₹" +
        amount.toLocaleString("en-IN");
}


/* =========================================================
   DATE
========================================================= */

function formatDate(dateValue) {

    if (!dateValue) {
        return "-";
    }

    const date =
        new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleString(
        "en-IN",
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );
}


/* =========================================================
   ID GENERATOR
========================================================= */

function createId(prefix) {

    return (
        prefix +
        "-" +
        Date.now().toString(36) +
        "-" +
        Math.random()
            .toString(36)
            .substring(2, 7)
    ).toUpperCase();
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   IMAGE ERROR HANDLER
========================================================= */

function imageFallback(img) {

    img.onerror = null;

    img.src =
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="500"
                 height="500"
                 viewBox="0 0 500 500">

                <rect width="500"
                      height="500"
                      fill="#111827"/>

                <text
                    x="250"
                    y="245"
                    text-anchor="middle"
                    fill="#94a3b8"
                    font-size="28"
                    font-family="Arial">
                    Image Not Available
                </text>

                <text
                    x="250"
                    y="285"
                    text-anchor="middle"
                    fill="#64748b"
                    font-size="18"
                    font-family="Arial">
                    Check Image URL
                </text>

            </svg>
        `);
}


/* =========================================================
   LOGIN / REGISTER ELEMENTS
========================================================= */

const loginBox =
    document.getElementById("loginBox");

const registerBox =
    document.getElementById("registerBox");

const loginEmail =
    document.getElementById("loginEmail");

const loginPassword =
    document.getElementById("loginPassword");

const registerName =
    document.getElementById("registerName");

const registerPhone =
    document.getElementById("registerPhone");

const registerEmail =
    document.getElementById("registerEmail");

const registerPassword =
    document.getElementById("registerPassword");


/* =========================================================
   SHOW LOGIN / REGISTER
========================================================= */

document
    .getElementById("showRegisterBtn")
    .addEventListener("click", () => {

        loginBox.classList.add("hidden");
        registerBox.classList.remove("hidden");

    });


document
    .getElementById("showLoginBtn")
    .addEventListener("click", () => {

        registerBox.classList.add("hidden");
        loginBox.classList.remove("hidden");

        const lastEmail =
            localStorage.getItem(
                LAST_EMAIL_KEY
            );

        if (lastEmail) {
            loginEmail.value = lastEmail;
        }

    });


/* =========================================================
   PASSWORD TOGGLE
========================================================= */

function setupPasswordToggle(
    inputId,
    buttonId
) {

    const input =
        document.getElementById(inputId);

    const button =
        document.getElementById(buttonId);

    if (!input || !button) {
        return;
    }

    button.addEventListener(
        "click",
        () => {

            if (input.type === "password") {

                input.type = "text";
                button.textContent = "Hide";

            } else {

                input.type = "password";
                button.textContent = "Show";

            }

        }
    );
}


setupPasswordToggle(
    "loginPassword",
    "loginPasswordToggle"
);

setupPasswordToggle(
    "registerPassword",
    "registerPasswordToggle"
);

setupPasswordToggle(
    "adminPassword",
    "adminPasswordToggle"
);


/* =========================================================
   REGISTER
========================================================= */

document
    .getElementById("registerBtn")
    .addEventListener("click", () => {

        const name =
            registerName.value.trim();

        const phone =
            registerPhone.value.trim();

        const email =
            registerEmail.value
                .trim()
                .toLowerCase();

        const password =
            registerPassword.value;

        if (!name ||
            !phone ||
            !email ||
            !password) {

            alert(
                "Please fill all fields."
            );

            return;
        }

        if (password.length < 6) {

            alert(
                "Password must be at least 6 characters."
            );

            return;
        }


        const users =
            getData(
                USERS_KEY,
                []
            );

        const existingUser =
            users.find(
                user =>
                    String(user.email)
                        .toLowerCase() === email
            );


        if (existingUser) {

            alert(
                "This email is already registered."
            );

            return;
        }


        const newUser = {

            id: createId("USR"),

            name: name,

            phone: phone,

            email: email,

            password: password,

            registeredAt:
                new Date().toISOString()

        };


        users.push(newUser);

        saveData(
            USERS_KEY,
            users
        );


        localStorage.setItem(
            LAST_EMAIL_KEY,
            email
        );


        alert(
            "Registration successful!"
        );


        registerName.value = "";
        registerPhone.value = "";
        registerEmail.value = "";
        registerPassword.value = "";


        registerBox.classList.add(
            "hidden"
        );

        loginBox.classList.remove(
            "hidden"
        );

        loginEmail.value = email;

        loginPassword.focus();

    });


/* =========================================================
   LOGIN
========================================================= */

document
    .getElementById("loginBtn")
    .addEventListener("click", loginUser);


loginPassword.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            loginUser();
        }

    }
);


function loginUser() {

    const email =
        loginEmail.value
            .trim()
            .toLowerCase();

    const password =
        loginPassword.value;


    if (!email || !password) {

        alert(
            "Enter email and password."
        );

        return;
    }


    const users =
        getData(
            USERS_KEY,
            []
        );


    const user =
        users.find(
            item =>
                String(item.email)
                    .toLowerCase() === email &&
                String(item.password) === password
        );


    if (!user) {

        alert(
            "Invalid email or password."
        );

        return;
    }


    /*
       IMPORTANT:

       Current user is stored in localStorage.
       Therefore login remains active until
       user manually clicks Logout.
    */

    saveData(
        CURRENT_USER_KEY,
        user
    );


    openStore();
}


/* =========================================================
   OPEN STORE
========================================================= */

function openStore() {

    const currentUser =
        getData(
            CURRENT_USER_KEY,
            null
        );


    if (!currentUser) {

        showPage("authPage");

        return;
    }


    const userNameNav =
        document.getElementById(
            "userNameNav"
        );


    userNameNav.textContent =
        String(
            currentUser.name || "User"
        );


    showPage("storePage");

    renderProducts();

    updateCartCount();

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

document
    .getElementById("forgotPasswordBtn")
    .addEventListener("click", () => {

        const email =
            prompt(
                "Enter your registered email:"
            );


        if (!email) {
            return;
        }


        const users =
            getData(
                USERS_KEY,
                []
            );


        const index =
            users.findIndex(
                user =>
                    String(user.email)
                        .toLowerCase() ===
                    email.trim().toLowerCase()
            );


        if (index === -1) {

            alert(
                "Email not found."
            );

            return;
        }


        const newPassword =
            prompt(
                "Enter your new password:"
            );


        if (!newPassword) {
            return;
        }


        if (newPassword.length < 6) {

            alert(
                "Password must be at least 6 characters."
            );

            return;
        }


        users[index].password =
            newPassword;

        saveData(
            USERS_KEY,
            users
        );


        alert(
            "Password changed successfully."
        );

    });


/* =========================================================
   LOGOUT
========================================================= */

document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        /*
           Only current login is removed.

           Cart is NOT removed.
           User/order/product data is NOT removed.
        */

        localStorage.removeItem(
            CURRENT_USER_KEY
        );


        loginPassword.value = "";

        showPage("authPage");

    });


/* =========================================================
   BRAND FILTER
========================================================= */

document
    .querySelectorAll(".brand-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".brand-btn")
                    .forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );


                button.classList.add(
                    "active"
                );


                selectedBrand =
                    button.dataset.brand;


                renderProducts();

            }
        );

    });


/* =========================================================
   SEARCH
========================================================= */

document
    .getElementById("searchBtn")
    .addEventListener(
        "click",
        renderProducts
    );


document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        renderProducts
    );


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const grid =
        document.getElementById(
            "productsGrid"
        );

    const count =
        document.getElementById(
            "productCount"
        );


    const products =
        getData(
            PRODUCTS_KEY,
            []
        );


    const search =
        document
            .getElementById("searchInput")
            .value
            .trim()
            .toLowerCase();


    let filtered =
        products.filter(
            product => {

                const brand =
                    String(
                        product.brand || ""
                    );

                const name =
                    String(
                        product.name || ""
                    );


                const brandMatch =
                    selectedBrand === "All" ||
                    brand === selectedBrand;


                const searchMatch =
                    !search ||
                    name.toLowerCase()
                        .includes(search) ||
                    brand.toLowerCase()
                        .includes(search);


                return (
                    brandMatch &&
                    searchMatch
                );

            }
        );


    count.textContent =
        `${filtered.length} Product${filtered.length !== 1 ? "s" : ""}`;


    if (filtered.length === 0) {

        grid.innerHTML = `

            <div class="empty-products">

                <div class="empty-icon">
                    📱
                </div>

                <h3>No Products Found</h3>

                <p>
                    ${
                        products.length === 0
                            ? "Admin has not added any product yet."
                            : "Try another brand or search."
                    }
                </p>

            </div>

        `;

        return;
    }


    grid.innerHTML =
        filtered.map(
            product =>
                productCardHTML(product)
        ).join("");


    grid
        .querySelectorAll(
            "[data-product-id]"
        )
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    const id =
                        card.dataset.productId;

                    openProductDetails(id);

                }
            );

        });

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function productCardHTML(product) {

    const id =
        escapeHTML(product.id);

    const name =
        escapeHTML(product.name);

    const brand =
        escapeHTML(product.brand);

    const image =
        escapeHTML(product.image);

    const price =
        money(product.price);

    const oldPrice =
        Number(product.oldPrice) > 0
            ? money(product.oldPrice)
            : "";


    return `

        <article
            class="product-card"
            data-product-id="${id}"
        >

            <div class="product-image-wrap">

                <img
                    src="${image}"
                    alt="${name}"
                    loading="lazy"
                    onerror="imageFallback(this)"
                >

                ${
                    oldPrice
                        ? `<span class="discount-badge">
                                OFFER
                           </span>`
                        : ""
                }

            </div>


            <div class="product-info">

                <span class="product-brand">
                    ${brand}
                </span>

                <h3>
                    ${name}
                </h3>


                <div class="price-row">

                    <strong>
                        ${price}
                    </strong>

                    ${
                        oldPrice
                            ? `<del>${oldPrice}</del>`
                            : ""
                    }

                </div>


                <div class="spec-mini">

                    <span>
                        ${escapeHTML(product.ram || "-")}
                    </span>

                    <span>
                        ${escapeHTML(product.storage || "-")}
                    </span>

                    <span>
                        ${escapeHTML(product.camera || "-")}
                    </span>

                </div>


                <button
                    class="view-product-btn"
                    type="button"
                >
                    View Details
                </button>

            </div>

        </article>

    `;
}


/* =========================================================
   PRODUCT DETAILS
========================================================= */

function openProductDetails(productId) {

    const products =
        getData(
            PRODUCTS_KEY,
            []
        );


    selectedProduct =
        products.find(
            product =>
                String(product.id) ===
                String(productId)
        );


    if (!selectedProduct) {

        alert(
            "Product not found."
        );

        return;
    }


    renderProductDetails();

    showPage(
        "productDetailsPage"
    );

    updateCartCount();

}


function renderProductDetails() {

    const container =
        document.getElementById(
            "productDetails"
        );


    if (!selectedProduct) {
        return;
    }


    const p =
        selectedProduct;


    container.innerHTML = `

        <div class="details-image-card">

            <img
                src="${escapeHTML(p.image)}"
                alt="${escapeHTML(p.name)}"
                onerror="imageFallback(this)"
            >

        </div>


        <div class="details-info">

            <span class="product-brand">
                ${escapeHTML(p.brand)}
            </span>

            <h1>
                ${escapeHTML(p.name)}
            </h1>


            <div class="details-price">

                <strong>
                    ${money(p.price)}
                </strong>

                ${
                    Number(p.oldPrice) > 0
                        ? `<del>${money(p.oldPrice)}</del>`
                        : ""
                }

            </div>


            <div class="spec-grid">

                <div>
                    <span>RAM</span>
                    <strong>${escapeHTML(p.ram || "-")}</strong>
                </div>

                <div>
                    <span>Storage</span>
                    <strong>${escapeHTML(p.storage || "-")}</strong>
                </div>

                <div>
                    <span>Camera</span>
                    <strong>${escapeHTML(p.camera || "-")}</strong>
                </div>

                <div>
                    <span>Battery</span>
                    <strong>${escapeHTML(p.battery || "-")}</strong>
                </div>

                <div>
                    <span>Processor</span>
                    <strong>${escapeHTML(p.processor || "-")}</strong>
                </div>

            </div>


            <div class="details-actions">

                <button
                    id="detailsAddCartBtn"
                    class="secondary-btn"
                >
                    Add to Cart
                </button>

                <button
                    id="detailsBuyBtn"
                    class="primary-btn"
                >
                    Buy Now
                </button>

            </div>

        </div>

    `;


    document
        .getElementById("detailsAddCartBtn")
        .addEventListener(
            "click",
            () => {

                addToCart(
                    selectedProduct.id
                );

            }
        );


    document
        .getElementById("detailsBuyBtn")
        .addEventListener(
            "click",
            () => {

                addToCart(
                    selectedProduct.id,
                    1,
                    true
                );

            }
        );

}


/* =========================================================
   CART
========================================================= */

function getCart() {

    const cart =
        getData(
            CART_KEY,
            []
        );

    return Array.isArray(cart)
        ? cart
        : [];
}


function saveCart(cart) {

    saveData(
        CART_KEY,
        cart
    );

    updateCartCount();
}


function addToCart(
    productId,
    quantity = 1,
    goCheckout = false
) {

    const products =
        getData(
            PRODUCTS_KEY,
            []
        );


    const product =
        products.find(
            item =>
                String(item.id) ===
                String(productId)
        );


    if (!product) {

        alert(
            "Product not found."
        );

        return;
    }


    const cart =
        getCart();


    const existing =
        cart.find(
            item =>
                String(item.productId) ===
                String(productId)
        );


    if (existing) {

        existing.quantity =
            Number(existing.quantity || 0) +
            Number(quantity);

    } else {

        cart.push({

            productId:
                product.id,

            quantity:
                Number(quantity)

        });

    }


    saveCart(cart);


    if (goCheckout) {

        openCheckout();

    } else {

        alert(
            `${product.name} added to cart.`
        );

    }

}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    const cart =
        getCart();


    const count =
        cart.reduce(
            (total, item) =>
                total +
                Number(item.quantity || 0),
            0
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );

    const detailsCartCount =
        document.getElementById(
            "detailsCartCount"
        );


    if (cartCount) {
        cartCount.textContent =
            count;
    }


    if (detailsCartCount) {
        detailsCartCount.textContent =
            count;
    }

}


/* =========================================================
   CART PAGE
========================================================= */

document
    .getElementById("cartBtn")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("detailsCartBtn")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("backFromCartBtn")
    .addEventListener(
        "click",
        openStore
    );


function openCart() {

    renderCart();

    showPage(
        "cartPage"
    );

}


function renderCart() {

    const container =
        document.getElementById(
            "cartContainer"
        );


    const cart =
        getCart();


    const products =
        getData(
            PRODUCTS_KEY,
            []
        );


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div class="empty-icon">
                    🛒
                </div>

                <h2>Your cart is empty</h2>

                <p>
                    Add some smartphones to your cart.
                </p>

                <button
                    class="primary-btn"
                    onclick="openStore()"
                >
                    Shop Now
                </button>

            </div>

        `;

        return;
    }


    let total = 0;


    const validItems =
        cart.map(item => {

            const product =
                products.find(
                    p =>
                        String(p.id) ===
                        String(item.productId)
                );


            if (!product) {
                return null;
            }


            const quantity =
                Number(item.quantity || 1);


            const itemTotal =
                Number(product.price || 0) *
                quantity;


            total += itemTotal;


            return {
                item,
                product,
                quantity,
                itemTotal
            };

        }).filter(Boolean);


    if (validItems.length === 0) {

        saveCart([]);

        container.innerHTML = `

            <div class="empty-cart">

                <h2>No valid products in cart</h2>

                <button
                    class="primary-btn"
                    onclick="openStore()"
                >
                    Shop Now
                </button>

            </div>

        `;

        return;
    }


    container.innerHTML = `

        <div class="cart-list">

            ${
                validItems.map(
                    data =>
                        cartItemHTML(data)
                ).join("")
            }

        </div>


        <div class="cart-summary">

            <span>Total Amount</span>

            <strong>
                ${money(total)}
            </strong>

            <button
                id="cartCheckoutBtn"
                class="primary-btn"
            >
                Proceed to Checkout
            </button>

        </div>

    `;


    container
        .querySelectorAll(
            ".quantity-minus"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeQuantity(
                        button.dataset.id,
                        -1
                    );

                }
            );

        });


    container
        .querySelectorAll(
            ".quantity-plus"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeQuantity(
                        button.dataset.id,
                        1
                    );

                }
            );

        });


    container
        .querySelectorAll(
            ".remove-cart-item"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    removeFromCart(
                        button.dataset.id
                    );

                }
            );

        });


    document
        .getElementById(
            "cartCheckoutBtn"
        )
        .addEventListener(
            "click",
            openCheckout
        );

}


function cartItemHTML(data) {

    const p =
        data.product;


    return `

        <div class="cart-item">

            <div class="cart-product-image">

                <img
                    src="${escapeHTML(p.image)}"
                    alt="${escapeHTML(p.name)}"
                    onerror="imageFallback(this)"
                >

            </div>


            <div class="cart-product-info">

                <span>
                    ${escapeHTML(p.brand)}
                </span>

                <h3>
                    ${escapeHTML(p.name)}
                </h3>

                <strong>
                    ${money(p.price)}
                </strong>

            </div>


            <div class="quantity-control">

                <button
                    class="quantity-minus"
                    data-id="${escapeHTML(p.id)}"
                >
                    −
                </button>

                <b>
                    ${data.quantity}
                </b>

                <button
                    class="quantity-plus"
                    data-id="${escapeHTML(p.id)}"
                >
                    +
                </button>

            </div>


            <div class="cart-item-total">

                ${money(data.itemTotal)}

            </div>


            <button
                class="remove-cart-item"
                data-id="${escapeHTML(p.id)}"
            >
                Delete
            </button>

        </div>

    `;

}


function changeQuantity(
    productId,
    amount
) {

    const cart =
        getCart();


    const item =
        cart.find(
            x =>
                String(x.productId) ===
                String(productId)
        );


    if (!item) {
        return;
    }


    item.quantity =
        Number(item.quantity || 0) +
        Number(amount);


    if (item.quantity <= 0) {

        const index =
            cart.indexOf(item);

        cart.splice(index, 1);

    }


    saveCart(cart);

    renderCart();

}


function removeFromCart(productId) {

    const cart =
        getCart()
            .filter(
                item =>
                    String(item.productId) !==
                    String(productId)
            );


    saveCart(cart);

    renderCart();

}


/* =========================================================
   CHECKOUT
========================================================= */

document
    .getElementById(
        "backFromCheckoutBtn"
    )
    .addEventListener(
        "click",
        openCart
    );


function openCheckout() {

    const cart =
        getCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }


    const currentUser =
        getData(
            CURRENT_USER_KEY,
            null
        );


    if (!currentUser) {

        showPage("authPage");

        return;
    }


    document.getElementById(
        "checkoutName"
    ).value =
        currentUser.name || "";


    document.getElementById(
        "checkoutPhone"
    ).value =
        currentUser.phone || "";


    document.getElementById(
        "checkoutEmail"
    ).value =
        currentUser.email || "";


    renderCheckoutSummary();

    showPage(
        "checkoutPage"
    );

}


function renderCheckoutSummary() {

    const summary =
        document.getElementById(
            "checkoutSummary"
        );


    const totalElement =
        document.getElementById(
            "checkoutTotal"
        );


    const cart =
        getCart();


    const products =
        getData(
            PRODUCTS_KEY,
            []
        );


    let total = 0;


    summary.innerHTML =
        cart.map(item => {

            const product =
                products.find(
                    p =>
                        String(p.id) ===
                        String(item.productId)
                );


            if (!product) {
                return "";
            }


            const quantity =
                Number(item.quantity || 1);


            const itemTotal =
                Number(product.price || 0) *
                quantity;


            total += itemTotal;


            return `

                <div class="checkout-item">

                    <span>
                        ${escapeHTML(product.name)}
                        × ${quantity}
                    </span>

                    <strong>
                        ${money(itemTotal)}
                    </strong>

                </div>

            `;

        }).join("");


    totalElement.textContent =
        money(total);

}


/* =========================================================
   PLACE ORDER
========================================================= */

document
    .getElementById(
        "placeOrderBtn"
    )
    .addEventListener(
        "click",
        placeOrder
    );


function placeOrder() {

    const currentUser =
        getData(
            CURRENT_USER_KEY,
            null
        );


    if (!currentUser) {

        alert(
            "Please login first."
        );

        showPage("authPage");

        return;
    }


    const name =
        document
            .getElementById("checkoutName")
            .value
            .trim();


    const phone =
        document
            .getElementById("checkoutPhone")
            .value
            .trim();


    const email =
        document
            .getElementById("checkoutEmail")
            .value
            .trim();


    const address =
        document
            .getElementById("checkoutAddress")
            .value
            .trim();


    if (!name ||
        !phone ||
        !email ||
        !address) {

        alert(
            "Please fill complete delivery details."
        );

        return;
    }


    const cart =
        getCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }


    const products =
        getData(
            PRODUCTS_KEY,
            []
        );


    const items = [];

    let total = 0;


    cart.forEach(
        cartItem => {

            const product =
                products.find(
                    p =>
                        String(p.id) ===
                        String(cartItem.productId)
                );


            if (!product) {
                return;
            }


            const quantity =
                Number(
                    cartItem.quantity || 1
                );


            const itemTotal =
                Number(product.price || 0) *
                quantity;


            total += itemTotal;


            items.push({

                productId:
                    product.id,

                productName:
                    product.name,

                brand:
                    product.brand,

                price:
                    Number(product.price || 0),

                quantity:
                    quantity,

                itemTotal:
                    itemTotal

            });

        }
    );


    if (items.length === 0) {

        alert(
            "Products in cart are no longer available."
        );

        saveCart([]);

        return;
    }


    const order = {

        id:
            createId("ORD"),

        userId:
            currentUser.id,

        customerName:
            name,

        customerPhone:
            phone,

        customerEmail:
            email,

        address:
            address,

        items:
            items,

        total:
            total,

        orderDate:
            new Date().toISOString(),

        status:
            "Pending"

    };


    const orders =
        getData(
            ORDERS_KEY,
            []
        );


    orders.push(order);


    saveData(
        ORDERS_KEY,
        orders
    );


    selectedOrderForWhatsApp =
        order;


    saveCart([]);


    document.getElementById(
        "checkoutAddress"
    ).value = "";


    document.getElementById(
        "successOrderInfo"
    ).innerHTML = `

        <div>
            <span>Order ID</span>
            <strong>
                ${escapeHTML(order.id)}
            </strong>
        </div>

        <div>
            <span>Amount</span>
            <strong>
                ${money(order.total)}
            </strong>
        </div>

        <div>
            <span>Status</span>
            <strong>
                ${escapeHTML(order.status)}
            </strong>
        </div>

    `;


    showPage(
        "successPage"
    );

}


/* =========================================================
   WHATSAPP
========================================================= */

document
    .getElementById(
        "whatsappBtn"
    )
    .addEventListener(
        "click",
        sendOrderWhatsApp
    );


function sendOrderWhatsApp() {

    if (!selectedOrderForWhatsApp) {

        alert(
            "Order information not found."
        );

        return;
    }


    const order =
        selectedOrderForWhatsApp;


    let message =
        `*MobileStore Order*%0A%0A`;


    message +=
        `*Order ID:* ${order.id}%0A`;

    message +=
        `*Customer:* ${order.customerName}%0A`;

    message +=
        `*Phone:* ${order.customerPhone}%0A`;

    message +=
        `*Email:* ${order.customerEmail}%0A`;

    message +=
        `*Address:* ${order.address}%0A%0A`;


    message +=
        `*Products:*%0A`;


    order.items.forEach(
        item => {

            message +=
                `• ${item.productName} × ${item.quantity} = ${money(item.itemTotal)}%0A`;

        }
    );


    message +=
        `%0A*Total:* ${money(order.total)}`;


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =========================================================
   CONTINUE SHOPPING
========================================================= */

document
    .getElementById(
        "continueShoppingBtn"
    )
    .addEventListener(
        "click",
        openStore
    );


/* =========================================================
   ADMIN LOGIN
========================================================= */

document
    .getElementById(
        "adminAccessBtn"
    )
    .addEventListener(
        "click",
        () => {

            showPage(
                "adminLoginPage"
            );

        }
    );


document
    .getElementById(
        "backToUserLoginBtn"
    )
    .addEventListener(
        "click",
        () => {

            showPage(
                "authPage"
            );

        }
    );


document
    .getElementById(
        "adminLoginBtn"
    )
    .addEventListener(
        "click",
        adminLogin
    );


function adminLogin() {

    const email =
        document
            .getElementById(
                "adminEmail"
            )
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById(
                "adminPassword"
            )
            .value;


    if (
        email === ADMIN_EMAIL &&
        password === ADMIN_PASSWORD
    ) {

        openAdmin();

    } else {

        alert(
            "Invalid admin credentials."
        );

    }

}


/* =========================================================
   ADMIN SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "a"
        ) {

            showPage(
                "adminLoginPage"
            );

        }

    }
);


/* =========================================================
   OPEN ADMIN
========================================================= */

function openAdmin() {

    showPage(
        "adminPage"
    );


    renderAdminDashboard();

}


/* =========================================================
   ADMIN LOGOUT
========================================================= */

document
    .getElementById(
        "adminLogoutBtn"
    )
    .addEventListener(
        "click",
        () => {

            showPage(
                "adminLoginPage"
            );

        }
    );


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function renderAdminDashboard() {

    renderAdminStats();

    renderProductsTable();

    renderUsersTable();

    renderOrdersTable();

}


/* =========================================================
   ADMIN STATS
========================================================= */

function renderAdminStats() {

    const users =
        getData(
            USERS_KEY,
            []
        );


    const orders =
        getData(
            ORDERS_KEY,
            []
        );


    const products =
        getData(
            PRODUCTS_KEY,
            []
        );


    const totalSales =
        orders.reduce(
            (sum, order) =>
                sum +
                Number(
                    order.total || 0
                ),
            0
        );


    document.getElementById(
        "totalUsers"
    ).textContent =
        users.length;


    document.getElementById(
        "totalOrders"
    ).textContent =
        orders.length;


    document.getElementById(
        "totalSales"
    ).textContent =
        money(totalSales);


    document.getElementById(
        "totalProducts"
    ).textContent =
        products.length;

}


/* =========================================================
   PRODUCT FORM ELEMENTS
========================================================= */

const editingProductId =
    document.getElementById(
        "editingProductId"
    );

const productName =
    document.getElementById(
        "productName"
    );

const productBrand =
    document.getElementById(
        "productBrand"
    );

const productPrice =
    document.getElementById(
        "productPrice"
    );

const productOldPrice =
    document.getElementById(
        "productOldPrice"
    );

const productImage =
    document.getElementById(
        "productImage"
    );

const productRam =
    document.getElementById(
        "productRam"
    );

const productStorage =
    document.getElementById(
        "productStorage"
    );

const productCamera =
    document.getElementById(
        "productCamera"
    );

const productBattery =
    document.getElementById(
        "productBattery"
    );

const productProcessor =
    document.getElementById(
        "productProcessor"
    );

const saveProductBtn =
    document.getElementById(
        "saveProductBtn"
    );

const productFormTitle =
    document.getElementById(
        "productFormTitle"
    );

const cancelProductEditBtn =
    document.getElementById(
        "cancelProductEditBtn"
    );


/* =========================================================
   SAVE PRODUCT
========================================================= */

saveProductBtn.addEventListener(
    "click",
    saveProduct
);


function saveProduct() {

    const name =
        productName.value.trim();

    const brand =
        productBrand.value.trim();

    const price =
        Number(productPrice.value);

    const oldPrice =
        Number(productOldPrice.value) || 0;

    const image =
        productImage.value.trim();

    const ram =
        productRam.value.trim();

    const storage =
        productStorage.value.trim();

    const camera =
        productCamera.value.trim();

    const battery =
        productBattery.value.trim();

    const processor =
        productProcessor.value.trim();


    if (!name ||
        !brand ||
        !price ||
        !image) {

        alert(
            "Product Name, Brand, Price and Image URL are required."
        );

        return;
    }


    const products =
        getData(
            PRODUCTS_KEY,
            []
        );


    const editId =
        editingProductId.value.trim();


    if (editId) {

        const index =
            products.findIndex(
                product =>
                    String(product.id) ===
                    String(editId)
            );


        if (index === -1) {

            alert(
                "Product not found."
            );

            return;
        }


        products[index] = {

            ...products[index],

            name,
            brand,
            price,
            oldPrice,
            image,
            ram,
            storage,
            camera,
            battery,
            processor

        };


        saveData(
            PRODUCTS_KEY,
            products
        );


        alert(
            "Product updated successfully."
        );

    } else {

        const newProduct = {

            id:
                createId("PRD"),

            name,
            brand,
            price,
            oldPrice,
            image,
            ram,
            storage,
            camera,
            battery,
            processor,

            createdAt:
                new Date().toISOString()

        };


        products.push(
            newProduct
        );


        saveData(
            PRODUCTS_KEY,
            products
        );


        alert(
            "Product added successfully."
        );

    }


    clearProductForm();

    renderAdminDashboard();

    renderProducts();

}


/* =========================================================
   EDIT PRODUCT
========================================================= */

function editProduct(productId) {

    const products =
        getData(
            PRODUCTS_KEY,
            []
        );


    const product =
        products.find(
            item =>
                String(item.id) ===
                String(productId)
        );


    if (!product) {

        alert(
            "Product not found."
        );

        return;
    }


    editingProductId.value =
        product.id;


    productName.value =
        product.name || "";


    productBrand.value =
        product.brand || "";


    productPrice.value =
        product.price || "";


    productOldPrice.value =
        product.oldPrice || "";


    productImage.value =
        product.image || "";


    productRam.value =
        product.ram || "";


    productStorage.value =
        product.storage || "";


    productCamera.value =
        product.camera || "";


    productBattery.value =
        product.battery || "";


    productProcessor.value =
        product.processor || "";


    productFormTitle.textContent =
        "Edit Product";


    saveProductBtn.textContent =
        "Update Product";


    cancelProductEditBtn.classList.remove(
        "hidden"
    );


    document
        .getElementById(
            "productFormTitle"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================================
   DELETE PRODUCT
========================================================= */

function deleteProduct(productId) {

    const products =
        getData(
            PRODUCTS_KEY,
            []
        );


    const product =
        products.find(
            item =>
                String(item.id) ===
                String(productId)
        );


    if (!product) {
        return;
    }


    const confirmDelete =
        confirm(
            `Delete "${product.name}"?`
        );


    if (!confirmDelete) {
        return;
    }


    const updatedProducts =
        products.filter(
            item =>
                String(item.id) !==
                String(productId)
        );


    saveData(
        PRODUCTS_KEY,
        updatedProducts
    );


    /*
       If product is deleted,
       remove it from every user's cart.
    */

    const cart =
        getCart()
            .filter(
                item =>
                    String(item.productId) !==
                    String(productId)
            );


    saveCart(cart);


    /*
       If currently editing this product,
       clear form.
    */

    if (
        String(editingProductId.value) ===
        String(productId)
    ) {

        clearProductForm();

    }


    renderAdminDashboard();

    renderProducts();


    alert(
        "Product deleted successfully."
    );

}


/* =========================================================
   CLEAR PRODUCT FORM
========================================================= */

function clearProductForm() {

    editingProductId.value = "";

    productName.value = "";
    productBrand.value = "";
    productPrice.value = "";
    productOldPrice.value = "";
    productImage.value = "";
    productRam.value = "";
    productStorage.value = "";
    productCamera.value = "";
    productBattery.value = "";
    productProcessor.value = "";


    productFormTitle.textContent =
        "Add New Product";


    saveProductBtn.textContent =
        "Add Product";


    cancelProductEditBtn.classList.add(
        "hidden"
    );

}


cancelProductEditBtn.addEventListener(
    "click",
    clearProductForm
);


/* =========================================================
   PRODUCT TABLE
========================================================= */

function renderProductsTable() {

    const tbody =
        document.getElementById(
            "productsTableBody"
        );


    const products =
        getData(
            PRODUCTS_KEY,
            []
        );


    if (products.length === 0) {

        tbody.innerHTML = `

            <tr>
                <td
                    colspan="5"
                    class="empty-table"
                >
                    No products added yet.
                </td>
            </tr>

        `;

        return;
    }


    tbody.innerHTML =
        products.map(
            product => `

                <tr>

                    <td>

                        <img
                            class="table-product-image"
                            src="${escapeHTML(product.image)}"
                            alt="${escapeHTML(product.name)}"
                            onerror="imageFallback(this)"
                        >

                    </td>


                    <td>
                        <strong>
                            ${escapeHTML(product.name)}
                        </strong>
                    </td>


                    <td>
                        ${escapeHTML(product.brand)}
                    </td>


                    <td>
                        ${money(product.price)}
                    </td>


                    <td>

                        <div class="table-actions">

                            <button
                                class="edit-btn"
                                data-edit-product="${escapeHTML(product.id)}"
                            >
                                Edit
                            </button>

                            <button
                                class="delete-btn"
                                data-delete-product="${escapeHTML(product.id)}"
                            >
                                Delete
                            </button>

                        </div>

                    </td>

                </tr>

            `
        ).join("");


    tbody
        .querySelectorAll(
            "[data-edit-product]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editProduct(
                        button.dataset.editProduct
                    );

                }
            );

        });


    tbody
        .querySelectorAll(
            "[data-delete-product]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteProduct(
                        button.dataset.deleteProduct
                    );

                }
            );

        });

}


/* =========================================================
   USERS TABLE
========================================================= */

document
    .getElementById(
        "userSearch"
    )
    .addEventListener(
        "input",
        renderUsersTable
    );


function renderUsersTable() {

    const tbody =
        document.getElementById(
            "usersTableBody"
        );


    const users =
        getData(
            USERS_KEY,
            []
        );


    const orders =
        getData(
            ORDERS_KEY,
            []
        );


    const search =
        document
            .getElementById(
                "userSearch"
            )
            .value
            .trim()
            .toLowerCase();


    const filtered =
        users.filter(
            user => {

                const id =
                    String(
                        user.id || ""
                    ).toLowerCase();

                const name =
                    String(
                        user.name || ""
                    ).toLowerCase();

                const email =
                    String(
                        user.email || ""
                    ).toLowerCase();

                const phone =
                    String(
                        user.phone || ""
                    ).toLowerCase();


                return (
                    !search ||
                    id.includes(search) ||
                    name.includes(search) ||
                    email.includes(search) ||
                    phone.includes(search)
                );

            }
        );


    if (filtered.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="empty-table"
                >
                    No users found.
                </td>

            </tr>

        `;

        return;
    }


    tbody.innerHTML =
        filtered.map(
            user => {

                const userOrders =
                    orders.filter(
                        order =>
                            String(
                                order.userId || ""
                            ) ===
                            String(
                                user.id || ""
                            )
                    );


                const spent =
                    userOrders.reduce(
                        (sum, order) =>
                            sum +
                            Number(
                                order.total || 0
                            ),
                        0
                    );


                return `

                    <tr>

                        <td>
                            ${escapeHTML(
                                user.name || "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                user.email || "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                user.phone || "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                user.id || "-"
                            )}
                        </td>

                        <td>
                            ${userOrders.length}
                        </td>

                        <td>
                            ${money(spent)}
                        </td>

                        <td>
                            ${formatDate(
                                user.registeredAt
                            )}
                        </td>

                    </tr>

                `;

            }
        ).join("");

}


/* =========================================================
   ORDER SEARCH
========================================================= */

document
    .getElementById(
        "orderSearch"
    )
    .addEventListener(
        "input",
        renderOrdersTable
    );


/* =========================================================
   ORDERS TABLE
========================================================= */

function renderOrdersTable() {

    const tbody =
        document.getElementById(
            "ordersTableBody"
        );


    const orders =
        getData(
            ORDERS_KEY,
            []
        );


    const search =
        document
            .getElementById(
                "orderSearch"
            )
            .value
            .trim()
            .toLowerCase();


    const filtered =
        orders.filter(
            order => {

                const items =
                    Array.isArray(
                        order.items
                    )
                        ? order.items
                        : [];


                const productsText =
                    items
                        .map(
                            item =>
                                String(
                                    item.productName ||
                                    ""
                                )
                        )
                        .join(" ")
                        .toLowerCase();


                const orderId =
                    String(
                        order.id || ""
                    ).toLowerCase();


                const customer =
                    String(
                        order.customerName || ""
                    ).toLowerCase();


                const phone =
                    String(
                        order.customerPhone || ""
                    ).toLowerCase();


                const email =
                    String(
                        order.customerEmail || ""
                    ).toLowerCase();


                return (
                    !search ||
                    orderId.includes(search) ||
                    customer.includes(search) ||
                    phone.includes(search) ||
                    email.includes(search) ||
                    productsText.includes(search)
                );

            }
        );


    if (filtered.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="10"
                    class="empty-table"
                >
                    No orders found.
                </td>

            </tr>

        `;

        return;
    }


    tbody.innerHTML =
        filtered.map(
            order => {

                const items =
                    Array.isArray(
                        order.items
                    )
                        ? order.items
                        : [];


                const productText =
                    items.length
                        ? items
                            .map(
                                item =>
                                    `${escapeHTML(
                                        item.productName || "-"
                                    )}`
                            )
                            .join("<br>")
                        : "-";


                const quantityText =
                    items.length
                        ? items
                            .map(
                                item =>
                                    Number(
                                        item.quantity || 0
                                    )
                            )
                            .join("<br>")
                        : "-";


                const currentStatus =
                    String(
                        order.status ||
                        "Pending"
                    );


                return `

                    <tr>

                        <td>
                            ${escapeHTML(
                                order.id || "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                order.customerName || "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                order.customerPhone || "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                order.customerEmail || "-"
                            )}
                        </td>

                        <td class="address-cell">
                            ${escapeHTML(
                                order.address || "-"
                            )}
                        </td>

                        <td>
                            ${productText}
                        </td>

                        <td>
                            ${quantityText}
                        </td>

                        <td>
                            ${money(
                                order.total || 0
                            )}
                        </td>

                        <td>
                            ${formatDate(
                                order.orderDate
                            )}
                        </td>

                        <td>

                            <select
                                class="status-select"
                                data-order-id="${escapeHTML(order.id)}"
                            >

                                <option
                                    value="Pending"
                                    ${currentStatus === "Pending" ? "selected" : ""}
                                >
                                    Pending
                                </option>

                                <option
                                    value="Confirmed"
                                    ${currentStatus === "Confirmed" ? "selected" : ""}
                                >
                                    Confirmed
                                </option>

                                <option
                                    value="Shipped"
                                    ${currentStatus === "Shipped" ? "selected" : ""}
                                >
                                    Shipped
                                </option>

                                <option
                                    value="Delivered"
                                    ${currentStatus === "Delivered" ? "selected" : ""}
                                >
                                    Delivered
                                </option>

                                <option
                                    value="Cancelled"
                                    ${currentStatus === "Cancelled" ? "selected" : ""}
                                >
                                    Cancelled
                                </option>

                            </select>

                        </td>

                    </tr>

                `;

            }
        ).join("");


    tbody
        .querySelectorAll(
            ".status-select"
        )
        .forEach(select => {

            select.addEventListener(
                "change",
                () => {

                    updateOrderStatus(
                        select.dataset.orderId,
                        select.value
                    );

                }
            );

        });

}
/* =========================================================
   UPDATE ORDER STATUS
========================================================= */

function updateOrderStatus(
    orderId,
    status
) {

    const orders =
        getData(
            ORDERS_KEY,
            []
        );


    const order =
        orders.find(
            item =>
                String(item.id) ===
                String(orderId)
        );


    if (!order) {
        return;
    }


    order.status =
        status;


    saveData(
        ORDERS_KEY,
        orders
    );


    renderAdminStats();

}


/* =========================================================
   PROFILE BUTTON
========================================================= */

document
    .getElementById(
        "profileBtn"
    )
    .addEventListener(
        "click",
        () => {

            const user =
                getData(
                    CURRENT_USER_KEY,
                    null
                );


            if (!user) {
                return;
            }


            alert(
                `Name: ${user.name}\n` +
                `Email: ${user.email}\n` +
                `Phone: ${user.phone}\n` +
                `User ID: ${user.id}`
            );

        }
    );


/* =========================================================
   MOBILE MENU
========================================================= */

document
    .getElementById(
        "mobileMenuBtn"
    )
    .addEventListener(
        "click",
        () => {

            document
                .querySelector(".sidebar")
                .classList.toggle(
                    "sidebar-open"
                );

        }
    );


/* =========================================================
   BACK TO STORE
========================================================= */

document
    .getElementById(
        "backToStoreBtn"
    )
    .addEventListener(
        "click",
        openStore
    );


/* =========================================================
   INITIAL STARTUP
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
           First:
           Remove old website data once.
        */

        resetOldDataOnce();


        /*
           Create empty storage arrays.
        */

        initializeData();


        /*
           Check whether user was already logged in.

           Because CURRENT_USER_KEY is stored in
           localStorage, refresh/browser close will
           NOT logout the user.
        */

        const currentUser =
            getData(
                CURRENT_USER_KEY,
                null
            );


        if (currentUser) {

            openStore();

        } else {

            const lastEmail =
                localStorage.getItem(
                    LAST_EMAIL_KEY
                );


            if (lastEmail) {

                loginEmail.value =
                    lastEmail;

            }


            showPage(
                "authPage"
            );

        }

    }
);
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
