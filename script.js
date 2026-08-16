/* =========================================================
   MOBILESTORE
   FRONTEND VERSION
   Firebase will be connected later.
========================================================= */


/* =========================================================
   PRODUCTS
========================================================= */

const products = [

    {
        id: 1,
        brand: "Apple",
        name: "iPhone 17 Pro",
        price: 129999,
        oldPrice: 139999,
        image: "https://www.myg.in/images/thumbnails/300/300/detailed/118/Apple-iphone-17-pro-cosmic-orange-256gb-Back-View.png.png",
        ram: "8 GB",
        storage: "256 GB",
        camera: "48 MP",
        battery: "3274 mAh",
        processor: "A19 Pro"
    },

    {
        id: 2,
        brand: "Samsung",
        name: "Galaxy S26 Ultra",
        price: 119999,
        oldPrice: 134999,
        image: "https://m.media-amazon.com/images/I/71xHws+eI5L._AC_UF1000,1000_QL80_.jpg",
        ram: "12 GB",
        storage: "256 GB",
        camera: "200 MP",
        battery: "5000 mAh",
        processor: "Snapdragon"
    },

    {
        id: 3,
        brand: "OnePlus",
        name: "OnePlus 14",
        price: 69999,
        oldPrice: 74999,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeZlp6ugKfaQKGDaAhHaWjEj65K0wppO4JRlboaUj_08RIkHEK6FtMSsw&s=10",
        ram: "12 GB",
        storage: "256 GB",
        camera: "50 MP",
        battery: "6000 mAh",
        processor: "Snapdragon"
    },

    {
        id: 4,
        brand: "Google",
        name: "Pixel 10 Pro",
        price: 89999,
        oldPrice: 94999,
        image: "https://media-ik.croma.com/Croma%20Assets/Communication/Mobiles/Images/318412_0_Eg0Rpp5y9.png?updatedAt=1755710322103",
        ram: "12 GB",
        storage: "256 GB",
        camera: "50 MP",
        battery: "5000 mAh",
        processor: "Google Tensor"
    },

    {
        id: 5,
        brand: "Xiaomi",
        name: "Xiaomi 16 Ultra",
        price: 64999,
        oldPrice: 69999,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp-7Geb7pB0WqKzbZhFkh12-1dzbcP_wed2MeURmJ33VVtPjQykldCkI8I&s=10",
        ram: "12 GB",
        storage: "512 GB",
        camera: "108 MP",
        battery: "5500 mAh",
        processor: "Snapdragon"
    },

    {
        id: 6,
        brand: "Samsung",
        name: "Galaxy A57",
        price: 42999,
        oldPrice: 46999,
        image: "https://m.media-amazon.com/images/I/61PGsFatV2L.jpg",
        ram: "8 GB",
        storage: "128 GB",
        camera: "50 MP",
        battery: "5000 mAh",
        processor: "Exynos"
    },

    {
        id: 7,
        brand: "OnePlus",
        name: "OnePlus Nord 6",
        price: 32999,
        oldPrice: 36999,
        image: "https://backend.paiinternational.in/media/images/l_hO4pWaS.webp",
        ram: "8 GB",
        storage: "128 GB",
        camera: "50 MP",
        battery: "5500 mAh",
        processor: "Dimensity"
    },

    {
        id: 8,
        brand: "Xiaomi",
        name: "Redmi Note 15 Pro",
        price: 24999,
        oldPrice: 27999,
        image: "https://m.media-amazon.com/images/I/81UgjzCNSrL.jpg",
        ram: "8 GB",
        storage: "256 GB",
        camera: "200 MP",
        battery: "5100 mAh",
        processor: "MediaTek"
    },
	
	 {
        id: 9,
        brand: "Realme",
        name: "Realme 16 5g",
        price: 31399,
        oldPrice: 27999,
        image: "https://media-ik.croma.com/Croma%20Assets/Communication/Mobiles/Images/325278_0_o7yG0RjeH.png?updatedAt=1786454539274",
        ram: "4 GB",
        storage: "128 GB",
        camera: "50 MP",
        battery: "7000 mAh",
        processor: "MediaTek Dimensity 6300"
    },
	{
        id: 10,
        brand: "Realme",
        name: "Realme C100x",
        price: 26999,
        oldPrice: 28999,
        image: "https://img-prd-pim.poorvika.com/cdn-cgi/image/format=auto,quality=75/product/Realme-C100x-Golden-Coast-4GB-64GB-front-back-view.webp",
        ram: "8 GB",
        storage: "256 GB",
        camera: "50 MP",
        battery: "8000 mAh",
        processor: "Unisoc T7250"
    },
	{
        id: 11,
        brand: "Motorola",
        name: "Motorola Moto G Max",
        price: 26999,
        oldPrice: 31999,
        image: "https://cdn.beebom.com/mobile/moto-g-max-back-front-1.png",
        ram: "8 GB",
        storage: "128 GB",
        camera: "50 MP",
        battery: "7000 mAh",
        processor: "Snapdragon 6s Gen 4"
    },
	{
        id: 12,
        brand: "Motorola",
        name: "Motorola Edge 70 Fusion",
        price: 26999,
        oldPrice: 29999,
        image: "https://safg.in/wp-content/uploads/2026/03/motorola-edge-70-fusion-pdp-ecom-render-06-color5-4zlgawe8.png",
        ram: "8 GB",
        storage: "128 GB",
        camera: "50 MP + 13 MP",
        battery: "7000 mAh",
        processor: "Qualcomm Snapdragon 7s Gen 4"
    },
	{
        id: 13,
        brand: "Nothing",
        name: "Nothing Phone (4b)",
        price: 34999,
        oldPrice: 54999,
        image: "https://cdn.shopify.com/s/files/1/0586/3270/0077/files/product-thumbnail-white.webp?v=1783318425",
        ram: "8 GB",
        storage: "128 GB",
        camera: "50 MP + 8 MP",
        battery: "6000 mAh",
        processor: "Snapdragon 6 Gen 4"
    },
	{
        id: 14,
        brand: "Nothing",
        name: "Nothing Phone (4a)",
        price: 29999,
        oldPrice: 32999,
        image: "https://media-ik.croma.com/Croma%20Assets/Communication/Mobiles/Images/321837_0_ainw3fQLA.png?updatedAt=1772794585033",
        ram: "8 GB",
        storage: "128 GB",
        camera: "50 MP + 50 MP",
        battery: "5000 mAh",
        processor: "Snapdragon 7s Gen 4"
    },
	{
        id: 15,
        brand: "Poco",
        name: "POCO X8 Pro Max",
        price: 39999,
        oldPrice: 44999,
        image: "https://i05.appmifile.com/585_item_uk/11/03/2026/f2d83039dbe588e6be7b0db93b44df99.png?thumb=1&q=85",
        ram: "12 GB",
        storage: "256 GB",
        camera: "50 MP + 8 MP",
        battery: "8500 mAh",
        processor: "MediaTek Dimensity 9500s"
    },
	{
        id: 16,
        brand: "Poco",
        name: "POCO X8 Pro",
        price: 32999,
        oldPrice: 36999,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYpwIP_DC_oPUD_Zaq_QljI2ua8WeDeGynhKwUH9JEvIvfhpDyBIUVE0qQ&s=10",
        ram: "8 GB",
        storage: "256 GB",
        camera: "50 MP + 8 MP",
        battery: "6500 mAh",
        processor: "MediaTek Dimensity 8500 Ultra"
    },

];


/* =========================================================
   STORAGE
========================================================= */

let users =
    JSON.parse(
        localStorage.getItem(
            "mobileStoreUsers"
        )
    ) || [];


let orders =
    JSON.parse(
        localStorage.getItem(
            "mobileStoreOrders"
        )
    ) || [];


let currentUser =
    JSON.parse(
        localStorage.getItem(
            "mobileStoreCurrentUser"
        )
    ) || null;


let cart =
    JSON.parse(
        localStorage.getItem(
            "mobileStoreCart"
        )
    ) || [];


let selectedBrand = "All";

let selectedProduct = null;


/* =========================================================
   PAGE ELEMENTS
========================================================= */

const authPage =
    document.getElementById("authPage");

const storePage =
    document.getElementById("storePage");

const productPage =
    document.getElementById("productPage");

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

const footer =
    document.getElementById("mainFooter");


/* =========================================================
   HELPERS
========================================================= */

function money(value) {

    return "₹" +
        Number(value)
            .toLocaleString("en-IN");

}


function saveData() {

    localStorage.setItem(
        "mobileStoreUsers",
        JSON.stringify(users)
    );

    localStorage.setItem(
        "mobileStoreOrders",
        JSON.stringify(orders)
    );

    localStorage.setItem(
        "mobileStoreCart",
        JSON.stringify(cart)
    );

}


function hideAllPages() {

    authPage.classList.add("hidden");

    storePage.classList.add("hidden");

    productPage.classList.add("hidden");

    cartPage.classList.add("hidden");

    checkoutPage.classList.add("hidden");

    successPage.classList.add("hidden");

    adminLoginPage.classList.add("hidden");

    adminPage.classList.add("hidden");

    footer.classList.add("hidden");

}


function showPage(page) {

    hideAllPages();

    page.classList.remove("hidden");


    if (
        page === storePage ||
        page === productPage ||
        page === cartPage ||
        page === checkoutPage
    ) {

        footer.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   PASSWORD SHOW / HIDE
========================================================= */

function setupPasswordToggle(
    inputId,
    buttonId
) {

    const input =
        document.getElementById(
            inputId
        );

    const button =
        document.getElementById(
            buttonId
        );


    if (!input || !button) {
        return;
    }


    button.addEventListener(
        "click",
        function() {

            if (
                input.type ===
                "password"
            ) {

                input.type = "text";

                button.innerText =
                    "🙈";

            } else {

                input.type =
                    "password";

                button.innerText =
                    "👁";

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


/* =========================================================
   LOGIN / REGISTER SWITCH
========================================================= */

document
    .getElementById(
        "showRegister"
    )
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "loginBox"
                )
                .classList.add(
                    "hidden"
                );

            document
                .getElementById(
                    "registerBox"
                )
                .classList.remove(
                    "hidden"
                );

        }
    );


document
    .getElementById(
        "showLogin"
    )
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "registerBox"
                )
                .classList.add(
                    "hidden"
                );

            document
                .getElementById(
                    "loginBox"
                )
                .classList.remove(
                    "hidden"
                );

            loadRegisteredEmail();

        }
    );


/* =========================================================
   REGISTER
========================================================= */

document
    .getElementById(
        "registerForm"
    )
    .addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            const name =
                document
                    .getElementById(
                        "registerName"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "registerPhone"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "registerEmail"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "registerPassword"
                    )
                    .value;


            const message =
                document
                    .getElementById(
                        "registerMessage"
                    );


            const existing =
                users.find(
                    user =>
                        user.email
                            .toLowerCase() ===
                        email.toLowerCase()
                );


            if (existing) {

                message.style.color =
                    "red";

                message.innerText =
                    "Email already registered.";

                return;

            }


            const newUser = {

                id: Date.now(),

                name: name,

                phone: phone,

                email: email,

                password: password

            };


            users.push(newUser);


            saveData();


            /*
                Save latest registered email
                so it appears automatically
                on login page.
            */

            localStorage.setItem(
                "mobileStoreLastRegisteredEmail",
                email
            );


            message.style.color =
                "green";

            message.innerText =
                "Account created successfully!";


            setTimeout(
                function() {

                    document
                        .getElementById(
                            "registerForm"
                        )
                        .reset();


                    document
                        .getElementById(
                            "showLogin"
                        )
                        .click();


                    document
                        .getElementById(
                            "loginMessage"
                        )
                        .style.color =
                        "green";


                    document
                        .getElementById(
                            "loginMessage"
                        )
                        .innerText =
                        "Account created. Please login.";


                },
                700
            );

        }
    );


/* =========================================================
   LOAD REGISTERED EMAIL
========================================================= */

function loadRegisteredEmail() {

    const savedEmail =
        localStorage.getItem(
            "mobileStoreLastRegisteredEmail"
        );


    if (savedEmail) {

        document
            .getElementById(
                "loginEmail"
            )
            .value =
            savedEmail;

    }

}


/* =========================================================
   LOGIN
========================================================= */

document
    .getElementById(
        "loginForm"
    )
    .addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            const email =
                document
                    .getElementById(
                        "loginEmail"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "loginPassword"
                    )
                    .value;


            const message =
                document
                    .getElementById(
                        "loginMessage"
                    );


            const user =
                users.find(
                    item =>

                        item.email
                            .toLowerCase() ===
                        email.toLowerCase()

                        &&

                        item.password ===
                        password
                );


            if (!user) {

                message.style.color =
                    "red";

                message.innerText =
                    "Invalid email or password.";

                return;

            }


            currentUser = user;


            localStorage.setItem(
                "mobileStoreCurrentUser",
                JSON.stringify(
                    user
                )
            );


            message.style.color =
                "green";

            message.innerText =
                "Login successful!";


            setTimeout(
                function() {

                    openStore();

                },
                500
            );

        }
    );


/* =========================================================
   FORGOT PASSWORD
========================================================= */

document
    .getElementById(
        "forgotPassword"
    )
    .addEventListener(
        "click",
        function() {

            const emailInput =
                document.getElementById(
                    "loginEmail"
                );


            const email =
                emailInput
                    .value
                    .trim();


            if (!email) {

                alert(
                    "Please enter your registered email first."
                );

                emailInput.focus();

                return;

            }


            const user =
                users.find(
                    item =>
                        item.email
                            .toLowerCase() ===
                        email.toLowerCase()
                );


            if (!user) {

                alert(
                    "This email is not registered."
                );

                return;

            }


            /*
                TEMPORARY FRONTEND DEMO

                Later Firebase Authentication
                will send a real password reset
                email.
            */

            const newPassword =
                prompt(
                    "Enter your new password (minimum 6 characters):"
                );


            if (
                newPassword === null
            ) {

                return;

            }


            if (
                newPassword.length < 6
            ) {

                alert(
                    "Password must be at least 6 characters."
                );

                return;

            }


            user.password =
                newPassword;


            saveData();


            document
                .getElementById(
                    "loginPassword"
                )
                .value =
                "";


            alert(
                "Password changed successfully. You can now login."
            );

        }
    );


/* =========================================================
   STORE
========================================================= */

function openStore() {

    showPage(
        storePage
    );


    document
        .getElementById(
            "userNameNav"
        )
        .innerText =
        currentUser
            ? currentUser.name
            : "User";


    renderProducts();

    updateCartCount();

}


function renderProducts() {

    const grid =
        document.getElementById(
            "productGrid"
        );


    const search =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .toLowerCase()
            .trim();


    const filtered =
        products.filter(
            product => {

                const brandMatch =
                    selectedBrand ===
                    "All"

                    ||

                    product.brand ===
                    selectedBrand;


                const searchMatch =

                    product.name
                        .toLowerCase()
                        .includes(
                            search
                        )

                    ||

                    product.brand
                        .toLowerCase()
                        .includes(
                            search
                        );


                return (
                    brandMatch &&
                    searchMatch
                );

            }
        );


    grid.innerHTML = "";


    document
        .getElementById(
            "productResult"
        )
        .innerText =
        `${filtered.length} products`;


    if (!filtered.length) {

        grid.innerHTML = `

            <div class="empty-cart">

                <div>
                    🔍
                </div>

                <h2>
                    No mobiles found
                </h2>

                <p>
                    Try another search.
                </p>

            </div>

        `;

        return;

    }


    filtered.forEach(
        product => {

            const discount =
                Math.round(
                    (
                        (
                            product.oldPrice -
                            product.price
                        )
                        /
                        product.oldPrice
                    )
                    * 100
                );


            grid.innerHTML += `

                <div class="product-card">

                    <img
                        class="product-image"
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <div class="product-brand">
                        ${product.brand}
                    </div>

                    <h3>
                        ${product.name}
                    </h3>

                    <div class="spec-line">
                        ${product.ram} RAM •
                        ${product.storage}
                    </div>

                    <div class="spec-line">
                        ${product.camera} Camera •
                        ${product.battery}
                    </div>

                    <div class="price">
                        ${money(product.price)}

                        <span class="old-price">
                            ${money(product.oldPrice)}
                        </span>
                    </div>

                    <div class="discount">
                        ${discount}% OFF
                    </div>

                    <div class="product-actions">

                        <button
                            class="details-btn"
                            onclick="openProduct(${product.id})"
                        >
                            Details
                        </button>

                        <button
                            class="buy-btn"
                            onclick="buyNow(${product.id})"
                        >
                            Buy Now
                        </button>

                    </div>

                </div>

            `;

        }
    );

}


/* =========================================================
   SEARCH
========================================================= */

document
    .getElementById(
        "searchInput"
    )
    .addEventListener(
        "input",
        renderProducts
    );


/* =========================================================
   BRAND FILTER
========================================================= */

document
    .querySelectorAll(
        ".category"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                function() {

                    document
                        .querySelectorAll(
                            ".category"
                        )
                        .forEach(
                            btn =>
                                btn.classList
                                    .remove(
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

        }
    );


/* =========================================================
   PRODUCT DETAILS
========================================================= */

function openProduct(id) {

    selectedProduct =
        products.find(
            product =>
                product.id === id
        );


    if (!selectedProduct) {
        return;
    }


    showPage(
        productPage
    );


    const p =
        selectedProduct;


    document
        .getElementById(
            "productDetails"
        )
        .innerHTML = `

            <div>

                <img
                    src="${p.image}"
                    class="details-image"
                    alt="${p.name}"
                >

            </div>


            <div class="details-info">

                <div class="details-brand">
                    ${p.brand}
                </div>

                <h1>
                    ${p.name}
                </h1>

                <p>
                    Premium smartphone with
                    powerful performance and
                    modern features.
                </p>

                <div class="details-price">
                    ${money(p.price)}
                </div>

                <div class="details-specs">

                    <div class="spec-box">
                        <strong>
                            RAM
                        </strong>

                        <br>

                        ${p.ram}
                    </div>

                    <div class="spec-box">
                        <strong>
                            Storage
                        </strong>

                        <br>

                        ${p.storage}
                    </div>

                    <div class="spec-box">
                        <strong>
                            Camera
                        </strong>

                        <br>

                        ${p.camera}
                    </div>

                    <div class="spec-box">
                        <strong>
                            Battery
                        </strong>

                        <br>

                        ${p.battery}
                    </div>

                    <div class="spec-box">
                        <strong>
                            Processor
                        </strong>

                        <br>

                        ${p.processor}
                    </div>

                </div>


                <div class="details-buttons">

                    <button
                        class="details-btn"
                        onclick="addToCart(${p.id})"
                    >
                        🛒 Add to Cart
                    </button>


                    <button
                        class="buy-btn"
                        onclick="buyNow(${p.id})"
                    >
                        Buy Now
                    </button>

                </div>

            </div>

        `;

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(id) {

    const product =
        products.find(
            p =>
                p.id === id
        );


    if (!product) {
        return;
    }


    const existing =
        cart.find(
            item =>
                item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveData();

    updateCartCount();


    alert(
        product.name +
        " added to your cart."
    );

}


function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total +
                item.quantity,
            0
        );


    document
        .getElementById(
            "cartCount"
        )
        .innerText =
        count;

}


/* =========================================================
   BUY NOW
========================================================= */

function buyNow(id) {

    const product =
        products.find(
            p =>
                p.id === id
        );


    if (!product) {
        return;
    }


    selectedProduct =
        product;


    showCheckout(
        [
            {
                ...product,
                quantity: 1
            }
        ]
    );

}


/* =========================================================
   CART
========================================================= */

function openCart() {

    showPage(
        cartPage
    );

    renderCart();

}


function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    const summary =
        document.getElementById(
            "cartSummary"
        );


    if (!cart.length) {

        container.innerHTML = `

            <div class="empty-cart">

                <div>
                    🛒
                </div>

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add some mobiles to your cart.
                </p>

            </div>

        `;


        summary.innerHTML = "";

        return;

    }


    container.innerHTML = "";


    cart.forEach(
        item => {

            container.innerHTML += `

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        class="cart-image"
                    >


                    <div class="cart-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ${money(item.price)}
                        </p>


                        <div
                            class="quantity-controls"
                        >

                            <button
                                onclick="changeQuantity(
                                    ${item.id},
                                    -1
                                )"
                            >
                                −
                            </button>


                            <strong>
                                ${item.quantity}
                            </strong>


                            <button
                                onclick="changeQuantity(
                                    ${item.id},
                                    1
                                )"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <strong>
                        ${money(
                            item.price *
                            item.quantity
                        )}
                    </strong>


                    <button
                        class="remove-btn"
                        onclick="removeFromCart(
                            ${item.id}
                        )"
                    >
                        Remove
                    </button>

                </div>

            `;

        }
    );


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    summary.innerHTML = `

        <div class="cart-total">
            Total: ${money(total)}
        </div>


        <button
            class="primary-btn"
            onclick="checkoutCart()"
        >
            Proceed to Checkout
        </button>

    `;

}


function changeQuantity(
    id,
    change
) {

    const item =
        cart.find(
            product =>
                product.id === id
        );


    if (!item) {
        return;
    }


    item.quantity += change;


    if (
        item.quantity <= 0
    ) {

        cart =
            cart.filter(
                product =>
                    product.id !== id
            );

    }


    saveData();

    updateCartCount();

    renderCart();

}


function removeFromCart(id) {

    cart =
        cart.filter(
            item =>
                item.id !== id
        );


    saveData();

    updateCartCount();

    renderCart();

}


function checkoutCart() {

    if (!cart.length) {
        return;
    }


    showCheckout(
        cart
    );

}


/* =========================================================
   CHECKOUT
========================================================= */

function showCheckout(
    items
) {

    showPage(
        checkoutPage
    );


    const total =
        items.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    document
        .getElementById(
            "orderName"
        )
        .value =
        currentUser
            ? currentUser.name
            : "";


    document
        .getElementById(
            "orderPhone"
        )
        .value =
        currentUser
            ? currentUser.phone
            : "";


    document
        .getElementById(
            "orderEmail"
        )
        .value =
        currentUser
            ? currentUser.email
            : "";


    document
        .getElementById(
            "checkoutSummary"
        )
        .innerHTML = `

            <h3>
                Order Summary
            </h3>


            ${items.map(
                item => `

                    <p
                        style="margin-bottom:12px"
                    >

                        <strong>
                            ${item.name}
                        </strong>

                        <br>

                        Qty:
                        ${item.quantity}

                        <br>

                        ${money(
                            item.price *
                            item.quantity
                        )}

                    </p>

                `
            ).join("")}


            <hr>


            <h2
                style="margin-top:15px"
            >
                Total:
                ${money(total)}
            </h2>

        `;


    checkoutPage.dataset.items =
        JSON.stringify(
            items
        );

}


/* =========================================================
   PLACE ORDER
========================================================= */

document
    .getElementById(
        "checkoutForm"
    )
    .addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            const items =
                JSON.parse(
                    checkoutPage
                        .dataset
                        .items
                );


            const name =
                document
                    .getElementById(
                        "orderName"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "orderPhone"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "orderEmail"
                    )
                    .value
                    .trim();


            const address =
                document
                    .getElementById(
                        "orderAddress"
                    )
                    .value
                    .trim();


            const total =
                items.reduce(
                    (sum, item) =>
                        sum +
                        item.price *
                        item.quantity,
                    0
                );


            const order = {

                id:
                    "MS" +
                    Date.now(),

                userId:
                    currentUser
                        ? currentUser.id
                        : null,

                customer: {

                    name,

                    phone,

                    email,

                    address

                },

                items,

                total,

                status:
                    "Pending",

                date:
                    new Date()
                        .toLocaleString(
                            "en-IN"
                        )

            };


            orders.push(
                order
            );


            cart = [];


            saveData();

            updateCartCount();


            showOrderSuccess(
                order
            );

        }
    );


/* =========================================================
   ORDER SUCCESS
========================================================= */

function showOrderSuccess(
    order
) {

    showPage(
        successPage
    );


    document
        .getElementById(
            "orderSuccessDetails"
        )
        .innerHTML = `

            <strong>
                Order ID:
            </strong>

            ${order.id}

            <br>

            <strong>
                Customer:
            </strong>

            ${order.customer.name}

            <br>

            <strong>
                Mobile:
            </strong>

            ${order.customer.phone}

            <br>

            <strong>
                Total:
            </strong>

            ${money(order.total)}

            <br>

            <strong>
                Status:
            </strong>

            ${order.status}

        `;


    document
        .getElementById(
            "whatsappBtn"
        )
        .onclick =
        function() {

            sendWhatsApp(
                order
            );

        };

}


/* =========================================================
   WHATSAPP
========================================================= */

function sendWhatsApp(
    order
) {

    /*
        Later replace this number
        with your actual WhatsApp number.
    */

    const whatsappNumber =
        "919999999999";


    const productsText =
        order.items
            .map(
                item =>
                    `${item.name} x ${item.quantity}`
            )
            .join("\n");


    const message =

`🛍️ *New MobileStore Order*

Order ID: ${order.id}

Customer: ${order.customer.name}

Mobile: ${order.customer.phone}

Email: ${order.customer.email}

Address: ${order.customer.address}

Products:
${productsText}

Total: ${money(order.total)}

Status: ${order.status}`;


    const url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        url,
        "_blank"
    );

}


/* =========================================================
   LOGOUT
========================================================= */

document
    .getElementById(
        "logoutButton"
    )
    .addEventListener(
        "click",
        function() {

            currentUser = null;


            localStorage.removeItem(
                "mobileStoreCurrentUser"
            );


            showPage(
                authPage
            );


            loadRegisteredEmail();

        }
    );


/* =========================================================
   BUTTONS
========================================================= */

document
    .getElementById(
        "cartButton"
    )
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById(
        "detailsCartBtn"
    )
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById(
        "backStoreBtn"
    )
    .addEventListener(
        "click",
        openStore
    );


document
    .getElementById(
        "backCartStore"
    )
    .addEventListener(
        "click",
        openStore
    );


document
    .getElementById(
        "backCheckoutCart"
    )
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById(
        "successHomeBtn"
    )
    .addEventListener(
        "click",
        openStore
    );


document
    .getElementById(
        "shopNowBtn"
    )
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "productGrid"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* =========================================================
   PROFILE
========================================================= */

document
    .getElementById(
        "profileButton"
    )
    .addEventListener(
        "click",
        function() {

            if (!currentUser) {
                return;
            }


            alert(

                "👤 My Profile\n\n" +

                "Name: " +
                currentUser.name +

                "\nEmail: " +
                currentUser.email +

                "\nPhone: " +
                currentUser.phone

            );

        }
    );


/* =========================================================
   ADMIN LOGIN
========================================================= */

function openAdminLogin() {

    showPage(
        adminLoginPage
    );

}


document
    .getElementById(
        "adminLoginForm"
    )
    .addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            const email =
                document
                    .getElementById(
                        "adminEmail"
                    )
                    .value;


            const password =
                document
                    .getElementById(
                        "adminPassword"
                    )
                    .value;


            /*
                TEMPORARY ADMIN LOGIN

                Firebase Authentication
                will replace this later.
            */

            if (

                email ===
                "admin@mobilestore.com"

                &&

                password ===
                "admin123"

            ) {

                openAdmin();

            } else {

                document
                    .getElementById(
                        "adminMessage"
                    )
                    .innerText =
                    "Invalid admin credentials.";


                document
                    .getElementById(
                        "adminMessage"
                    )
                    .style.color =
                    "red";

            }

        }
    );


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function openAdmin() {

    showPage(
        adminPage
    );

    renderAdmin();

}


function renderAdmin() {

    document
        .getElementById(
            "totalUsers"
        )
        .innerText =
        users.length;


    document
        .getElementById(
            "totalOrders"
        )
        .innerText =
        orders.length;


    const sales =
        orders.reduce(
            (sum, order) =>
                sum +
                order.total,
            0
        );


    document
        .getElementById(
            "totalSales"
        )
        .innerText =
        money(sales);


    const usersTable =
        document.getElementById(
            "usersTable"
        );


    usersTable.innerHTML = "";


    users.forEach(
        user => {

            usersTable.innerHTML += `

                <tr>

                    <td>
                        ${user.name}
                    </td>

                    <td>
                        ${user.email}
                    </td>

                    <td>
                        ${user.phone}
                    </td>

                </tr>

            `;

        }
    );


    const ordersTable =
        document.getElementById(
            "ordersTable"
        );


    ordersTable.innerHTML = "";


    orders.forEach(
        order => {

            const productNames =
                order.items
                    .map(
                        item =>
                            item.name
                    )
                    .join(", ");


            ordersTable.innerHTML += `

                <tr>

                    <td>
                        ${order.customer.name}
                    </td>

                    <td>
                        ${productNames}
                    </td>

                    <td>
                        ${order.items.reduce(
                            (sum, item) =>
                                sum +
                                item.quantity,
                            0
                        )}
                    </td>

                    <td>
                        ${money(
                            order.total
                        )}
                    </td>

                    <td>
                        ${order.status}
                    </td>

                </tr>

            `;

        }
    );

}


/* =========================================================
   ADMIN BUTTONS
========================================================= */

document
    .getElementById(
        "adminLogout"
    )
    .addEventListener(
        "click",
        function() {

            showPage(
                authPage
            );

            loadRegisteredEmail();

        }
    );


document
    .getElementById(
        "adminBackStore"
    )
    .addEventListener(
        "click",
        function() {

            if (currentUser) {

                openStore();

            } else {

                showPage(
                    authPage
                );

            }

        }
    );


document
    .getElementById(
        "backFromAdmin"
    )
    .addEventListener(
        "click",
        function() {

            if (currentUser) {

                openStore();

            } else {

                showPage(
                    authPage
                );

            }

        }
    );


/* =========================================================
   ADMIN SHORTCUT
   CTRL + SHIFT + A
========================================================= */

document.addEventListener(
    "keydown",
    function(e) {

        if (

            e.ctrlKey &&

            e.shiftKey &&

            e.key.toLowerCase() === "a"

        ) {

            openAdminLogin();

        }

    }
);


/* =========================================================
   INITIAL LOAD
========================================================= */

if (currentUser) {

    openStore();

} else {

    showPage(
        authPage
    );

    loadRegisteredEmail();

}