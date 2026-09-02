/* =========================================================
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