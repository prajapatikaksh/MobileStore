/* =====================================================
   MOBILESTORE FINAL MOBILE.JS
===================================================== */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";


/* =====================================================
   FIREBASE
===================================================== */

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


const firebaseApp =
    initializeApp(
        firebaseConfig
    );

const auth =
    getAuth(
        firebaseApp
    );


/* =====================================================
   LOGIN PROTECTION
===================================================== */

onAuthStateChanged(
    auth,
    function(user) {

        if (!user) {

            window.location.href =
                "index.html";

            return;

        }


        const userName =
            document.getElementById(
                "userName"
            );

        const userEmail =
            document.getElementById(
                "userEmail"
            );


        if (userName) {

            userName.innerText =
                user.displayName ||
                "MobileStore User";

        }


        if (userEmail) {

            userEmail.innerText =
                user.email || "";

        }

    }
);


/* =====================================================
   MOBILE DATA
===================================================== */

const mobiles = [

    {
        company: "Apple",
        name: "iPhone 16 Pro Max",
        price: 144900,
        ram: "8 GB RAM",
        storage: "256 GB",
        camera: "48 MP Camera",
        network: "5G",
        image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg"
    },

    {
        company: "Apple",
        name: "iPhone 16",
        price: 79900,
        ram: "8 GB RAM",
        storage: "128 GB",
        camera: "48 MP Camera",
        network: "5G",
        image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg"
    },

    {
        company: "Samsung",
        name: "Galaxy S25 Ultra",
        price: 129999,
        ram: "12 GB RAM",
        storage: "256 GB",
        camera: "200 MP Camera",
        network: "5G",
        image: "https://rukminim2.flixcart.com/image/1396/1396/xif0q/mobile/a/v/f/-original-imahggetwfkp5but.jpeg?q=90"
    },

    {
        company: "Samsung",
        name: "Galaxy S25",
        price: 80999,
        ram: "12 GB RAM",
        storage: "256 GB",
        camera: "50 MP Camera",
        network: "5G",
        image: "https://rukminim2.flixcart.com/image/1396/1396/xif0q/mobile/k/k/g/-original-imah8pdgqmc2mg26.jpeg?q=90"
    },

    {
        company: "OnePlus",
        name: "OnePlus 13",
        price: 69999,
        ram: "12 GB RAM",
        storage: "256 GB",
        camera: "50 MP Camera",
        network: "5G",
        image: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-13.jpg"
    },

    {
        company: "OnePlus",
        name: "OnePlus 13R",
        price: 42999,
        ram: "12 GB RAM",
        storage: "256 GB",
        camera: "50 MP Camera",
        network: "5G",
        image: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-13r.jpg"
    },

    {
        company: "Vivo",
        name: "Vivo X200 Pro",
        price: 94999,
        ram: "16 GB RAM",
        storage: "512 GB",
        camera: "50 MP Camera",
        network: "5G",
        image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-x200-pro.jpg"
    },

    {
        company: "Vivo",
        name: "Vivo V50",
        price: 34999,
        ram: "8 GB RAM",
        storage: "128 GB",
        camera: "50 MP Camera",
        network: "5G",
        image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-v50.jpg"
    },

    {
        company: "Oppo",
        name: "Oppo Find X8 Pro",
        price: 99999,
        ram: "16 GB RAM",
        storage: "512 GB",
        camera: "50 MP Camera",
        network: "5G",
        image: "https://fdn2.gsmarena.com/vv/bigpic/oppo-find-x8-pro.jpg"
    },

    {
        company: "Realme",
        name: "Realme GT 7 Pro",
        price: 59999,
        ram: "12 GB RAM",
        storage: "256 GB",
        camera: "50 MP Camera",
        network: "5G",
        image: "https://rukminim2.flixcart.com/image/1396/1396/xif0q/mobile/u/w/h/gt-7-pro-gt-7-pro-realme-original-imah6yfa7pytgfzp.jpeg?q=90"
    },

    {
        company: "Xiaomi",
        name: "Xiaomi 15",
        price: 64999,
        ram: "12 GB RAM",
        storage: "512 GB",
        camera: "50 MP Camera",
        network: "5G",
        image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-15.jpg"
    },

    {
        company: "Motorola",
        name: "Motorola Edge 50 Pro",
        price: 31999,
        ram: "8 GB RAM",
        storage: "256 GB",
        camera: "50 MP Camera",
        network: "5G",
        image: "https://fdn2.gsmarena.com/vv/bigpic/motorola-edge-50-pro.jpg"
    },

    {
        company: "Google",
        name: "Google Pixel 9 Pro",
        price: 109999,
        ram: "16 GB RAM",
        storage: "256 GB",
        camera: "50 MP Camera",
        network: "5G",
        image: "https://rukminim2.flixcart.com/image/1396/1396/xif0q/mobile/0/m/t/-original-imahggevg3kpzazr.jpeg?q=90"
    },

    {
        company: "Nothing",
        name: "Nothing Phone (3)",
        price: 59999,
        ram: "12 GB RAM",
        storage: "256 GB",
        camera: "50 MP Camera",
        network: "5G",
        image: "https://fdn2.gsmarena.com/vv/bigpic/nothing-phone-3.jpg"
    }

];


/* =====================================================
   VARIABLES
===================================================== */

let currentMobiles =
    mobiles;

let selectedMobile =
    null;


/* =====================================================
   CART
===================================================== */

let cart = [];


try {

    cart =
        JSON.parse(
            localStorage.getItem(
                "mobileStoreCart"
            )
        ) || [];

} catch {

    cart = [];

}


/* =====================================================
   ELEMENTS
===================================================== */

const container =
    document.getElementById(
        "mobileContainer"
    );

const title =
    document.getElementById(
        "companyTitle"
    );

const cartCount =
    document.getElementById(
        "cartCount"
    );


/* =====================================================
   PRICE
===================================================== */

function formatPrice(price) {

    return (
        "₹" +
        Number(
            price
        ).toLocaleString(
            "en-IN"
        )
    );

}


/* =====================================================
   DISPLAY
===================================================== */

function displayMobiles(list) {

    currentMobiles =
        list;

    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    if (
        !list ||
        list.length === 0
    ) {

        container.innerHTML = `

            <div
                style="
                    grid-column:1/-1;
                    text-align:center;
                    padding:60px 20px;
                "
            >

                <div
                    style="
                        font-size:50px;
                        margin-bottom:15px;
                    "
                >
                    📱
                </div>

                <h3>
                    Mobile not found
                </h3>

                <p
                    style="
                        color:#777486;
                        margin-top:8px;
                        font-size:11px;
                    "
                >
                    Try another mobile or brand.
                </p>

            </div>

        `;

        return;

    }


    list.forEach(
        function(
            mobile,
            index
        ) {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "mobile-card";


            card.innerHTML = `

                <img
                    class="mobile-image"
                    src="${mobile.image}"
                    alt="${mobile.name}"
                    onerror="
                        this.onerror=null;
                        this.src='https://via.placeholder.com/300x350?text=Mobile';
                    "
                >

                <div class="mobile-info">

                    <span class="company">
                        ${mobile.company}
                    </span>

                    <h3>
                        ${mobile.name}
                    </h3>

                    <div class="specs">

                        ${mobile.ram}<br>
                        ${mobile.storage}<br>
                        ${mobile.camera}<br>
                        ${mobile.network}

                    </div>

                    <div class="price">
                        ${formatPrice(
                            mobile.price
                        )}
                    </div>

                    <button
                        type="button"
                        class="details-button"
                        onclick="showDetails(${index})"
                    >
                        View Details
                    </button>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   FILTER
===================================================== */

function filterCompany(
    company
) {

    document
        .querySelectorAll(
            ".company-filter"
        )
        .forEach(
            function(button) {

                button.classList.remove(
                    "active"
                );


                if (
                    button.textContent
                        .trim()
                        .includes(
                            company
                        )
                ) {

                    button.classList.add(
                        "active"
                    );

                }

            }
        );


    if (
        company ===
        "All"
    ) {

        displayMobiles(
            mobiles
        );

        title.innerText =
            "All Mobiles";

        return;

    }


    const filtered =
        mobiles.filter(
            function(mobile) {

                return (
                    mobile.company ===
                    company
                );

            }
        );


    displayMobiles(
        filtered
    );


    title.innerText =
        company +
        " Mobiles";

}


/* =====================================================
   SEARCH
===================================================== */

function searchMobiles() {

    const input =
        document.getElementById(
            "searchInput"
        );


    if (!input) {
        return;
    }


    const search =
        input.value
            .toLowerCase()
            .trim();


    if (!search) {

        displayMobiles(
            mobiles
        );

        title.innerText =
            "All Mobiles";

        return;

    }


    const result =
        mobiles.filter(
            function(mobile) {

                return (

                    mobile.name
                        .toLowerCase()
                        .includes(
                            search
                        )

                    ||

                    mobile.company
                        .toLowerCase()
                        .includes(
                            search
                        )

                );

            }
        );


    displayMobiles(
        result
    );


    title.innerText =
        "Search Results";

}


/* =====================================================
   ENTER SEARCH
===================================================== */

document
    .getElementById(
        "searchInput"
    )
    ?.addEventListener(
        "keyup",
        function(event) {

            if (
                event.key ===
                "Enter"
            ) {

                searchMobiles();

            }

        }
    );


/* =====================================================
   DETAILS
===================================================== */

function showDetails(
    index
) {

    const mobile =
        currentMobiles[
            index
        ];


    if (!mobile) {
        return;
    }


    selectedMobile =
        mobile;


    document
        .getElementById(
            "modalImage"
        )
        .src =
        mobile.image;


    document
        .getElementById(
            "modalName"
        )
        .innerText =
        mobile.name;


    document
        .getElementById(
            "modalCompany"
        )
        .innerText =
        mobile.company;


    document
        .getElementById(
            "modalRam"
        )
        .innerText =
        "💾 RAM: " +
        mobile.ram;


    document
        .getElementById(
            "modalStorage"
        )
        .innerText =
        "💽 Storage: " +
        mobile.storage;


    document
        .getElementById(
            "modalCamera"
        )
        .innerText =
        "📷 Camera: " +
        mobile.camera;


    document
        .getElementById(
            "modalNetwork"
        )
        .innerText =
        "📶 Network: " +
        mobile.network;


    document
        .getElementById(
            "modalPrice"
        )
        .innerText =
        formatPrice(
            mobile.price
        );


    document
        .getElementById(
            "productModal"
        )
        .style.display =
        "flex";


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeModal() {

    document
        .getElementById(
            "productModal"
        )
        .style.display =
        "none";


    document.body.style.overflow =
        "";

}


/* =====================================================
   CART
===================================================== */

function addToCart(
    mobile
) {

    if (!mobile) {
        return;
    }


    const existing =
        cart.find(
            function(item) {

                return (
                    item.name ===
                    mobile.name
                );

            }
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...mobile,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

}


function addModalToCart() {

    if (!selectedMobile) {
        return;
    }


    addToCart(
        selectedMobile
    );


    alert(
        "✅ " +
        selectedMobile.name +
        " added to cart!"
    );

}


function openCart() {

    renderCart();


    document
        .getElementById(
            "cartModal"
        )
        .style.display =
        "flex";


    document.body.style.overflow =
        "hidden";

}


function closeCart() {

    document
        .getElementById(
            "cartModal"
        )
        .style.display =
        "none";


    document.body.style.overflow =
        "";

}


/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    if (!cartItems) {
        return;
    }


    cartItems.innerHTML =
        "";


    if (
        cart.length === 0
    ) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div
                    style="
                        font-size:42px;
                        margin-bottom:12px;
                    "
                >
                    🛒
                </div>

                Your cart is empty

            </div>

        `;

        updateCartTotal();

        return;

    }


    cart.forEach(
        function(
            item,
            index
        ) {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "cart-item";


            div.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    onerror="
                        this.onerror=null;
                        this.src='https://via.placeholder.com/100x120?text=Mobile';
                    "
                >

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <div class="cart-item-price">
                        ${formatPrice(
                            item.price
                        )}
                    </div>

                    <div class="quantity">

                        <button
                            type="button"
                            onclick="changeQuantity(${index}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            type="button"
                            onclick="changeQuantity(${index}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    type="button"
                    class="remove-button"
                    onclick="removeFromCart(${index})"
                >
                    ❌
                </button>

            `;


            cartItems.appendChild(
                div
            );

        }
    );


    updateCartTotal();

}


/* =====================================================
   QUANTITY
===================================================== */

function changeQuantity(
    index,
    amount
) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity +=
        amount;


    if (
        cart[index].quantity <=
        0
    ) {

        cart.splice(
            index,
            1
        );

    }


    saveCart();

    renderCart();

    updateCartCount();

}


/* =====================================================
   REMOVE
===================================================== */

function removeFromCart(
    index
) {

    if (!cart[index]) {
        return;
    }


    cart.splice(
        index,
        1
    );


    saveCart();

    renderCart();

    updateCartCount();

}


/* =====================================================
   TOTAL
===================================================== */

function getCartTotal() {

    return cart.reduce(
        function(
            total,
            item
        ) {

            return (
                total +
                Number(
                    item.price
                ) *
                Number(
                    item.quantity
                )
            );

        },
        0
    );

}


function updateCartTotal() {

    const element =
        document.getElementById(
            "cartTotal"
        );


    if (element) {

        element.innerText =
            formatPrice(
                getCartTotal()
            );

    }

}


function updateCartCount() {

    const count =
        cart.reduce(
            function(
                total,
                item
            ) {

                return (
                    total +
                    Number(
                        item.quantity
                    )
                );

            },
            0
        );


    if (cartCount) {

        cartCount.innerText =
            count;

    }

}


/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "mobileStoreCart",
        JSON.stringify(
            cart
        )
    );

}


/* =====================================================
   BUY NOW
===================================================== */

function buyMobile() {

    if (!selectedMobile) {
        return;
    }


    const phoneNumber =
        "917990130683";


    const message =
        "🛒 MobileStore Order\n\n" +

        "📱 Mobile: " +
        selectedMobile.name +
        "\n" +

        "🏢 Company: " +
        selectedMobile.company +
        "\n" +

        "💰 Price: " +
        formatPrice(
            selectedMobile.price
        ) +
        "\n" +

        "💾 RAM: " +
        selectedMobile.ram +
        "\n" +

        "💽 Storage: " +
        selectedMobile.storage +
        "\n" +

        "📷 Camera: " +
        selectedMobile.camera +
        "\n" +

        "📶 Network: " +
        selectedMobile.network +
        "\n\n" +

        "Please confirm my order.";


    const url =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   CHECKOUT
===================================================== */

function checkout() {

    if (
        cart.length === 0
    ) {

        alert(
            "🛒 Your cart is empty!"
        );

        return;

    }


    document
        .getElementById(
            "cartModal"
        )
        .style.display =
        "none";


    document
        .getElementById(
            "checkoutTotal"
        )
        .innerText =
        formatPrice(
            getCartTotal()
        );


    document
        .getElementById(
            "checkoutModal"
        )
        .style.display =
        "flex";

}


function closeCheckout() {

    document
        .getElementById(
            "checkoutModal"
        )
        .style.display =
        "none";


    document.body.style.overflow =
        "";

}


/* =====================================================
   PLACE ORDER
===================================================== */

function placeOrder() {

    const name =
        document
            .getElementById(
                "checkoutName"
            )
            .value
            .trim();


    const phone =
        document
            .getElementById(
                "checkoutPhone"
            )
            .value
            .trim();


    const address =
        document
            .getElementById(
                "checkoutAddress"
            )
            .value
            .trim();


    const city =
        document
            .getElementById(
                "checkoutCity"
            )
            .value
            .trim();


    const pincode =
        document
            .getElementById(
                "checkoutPincode"
            )
            .value
            .trim();


    const messageBox =
        document.getElementById(
            "checkoutMessage"
        );


    messageBox.innerText =
        "";


    if (
        !name ||
        !phone ||
        !address ||
        !city ||
        !pincode
    ) {

        messageBox.innerText =
            "Please fill in all delivery details.";

        return;

    }


    if (
        !/^[0-9]{10}$/.test(
            phone
        )
    ) {

        messageBox.innerText =
            "Please enter a valid 10 digit mobile number.";

        return;

    }


    if (
        !/^[0-9]{6}$/.test(
            pincode
        )
    ) {

        messageBox.innerText =
            "Please enter a valid 6 digit pincode.";

        return;

    }


    let order =
        "🛍️ MobileStore Order\n\n";


    order +=
        "👤 Customer: " +
        name +
        "\n";


    order +=
        "📞 Phone: " +
        phone +
        "\n";


    order +=
        "📍 Address: " +
        address +
        "\n";


    order +=
        "🏙️ City: " +
        city +
        "\n";


    order +=
        "📮 Pincode: " +
        pincode +
        "\n\n";


    order +=
        "📱 ORDER ITEMS\n";


    cart.forEach(
        function(item) {

            order +=
                item.name +
                " × " +
                item.quantity +
                " = " +
                formatPrice(
                    item.price *
                    item.quantity
                ) +
                "\n";

        }
    );


    order +=
        "\n💰 TOTAL: " +
        formatPrice(
            getCartTotal()
        );


    order +=
        "\n\nPlease confirm my order.";


    const url =
        "https://wa.me/917990130683?text=" +
        encodeURIComponent(
            order
        );


    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   LOGOUT
===================================================== */

async function logoutUser() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {
        return;
    }


    try {

        await signOut(
            auth
        );


        localStorage.removeItem(
            "mobileStoreCart"
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


/* =====================================================
   MODAL BACKGROUND
===================================================== */

window.addEventListener(
    "click",
    function(event) {

        const productModal =
            document.getElementById(
                "productModal"
            );

        const cartModal =
            document.getElementById(
                "cartModal"
            );

        const checkoutModal =
            document.getElementById(
                "checkoutModal"
            );


        if (
            event.target ===
            productModal
        ) {

            closeModal();

        }


        if (
            event.target ===
            cartModal
        ) {

            closeCart();

        }


        if (
            event.target ===
            checkoutModal
        ) {

            closeCheckout();

        }

    }
);


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "Escape"
        ) {

            closeModal();

            closeCart();

            closeCheckout();

        }

    }
);


/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.filterCompany =
    filterCompany;

window.searchMobiles =
    searchMobiles;

window.showDetails =
    showDetails;

window.closeModal =
    closeModal;

window.addToCart =
    addToCart;

window.addModalToCart =
    addModalToCart;

window.openCart =
    openCart;

window.closeCart =
    closeCart;

window.changeQuantity =
    changeQuantity;

window.removeFromCart =
    removeFromCart;

window.buyMobile =
    buyMobile;

window.checkout =
    checkout;

window.closeCheckout =
    closeCheckout;

window.placeOrder =
    placeOrder;

window.logoutUser =
    logoutUser;


/* =====================================================
   START
===================================================== */

displayMobiles(
    mobiles
);

updateCartCount();
