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


// =========================
// VARIABLES
// =========================

let currentMobiles = mobiles;

let selectedMobile = null;


// =========================
// CART LOAD
// =========================

let cart = JSON.parse(
    localStorage.getItem("mobileStoreCart")
) || [];


// =========================
// ELEMENTS
// =========================

const container =
    document.getElementById("mobileContainer");

const title =
    document.getElementById("companyTitle");

const cartCount =
    document.getElementById("cartCount");


// =========================
// PRICE FORMAT
// =========================

function formatPrice(price) {

    return "₹" + price.toLocaleString("en-IN");

}


// =========================
// DISPLAY MOBILES
// =========================

function displayMobiles(list) {

    currentMobiles = list;

    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML = `
            <p style="grid-column:1/-1;text-align:center;font-size:20px;">
                ❌ Mobile not found
            </p>
        `;

        return;
    }


    list.forEach(function(mobile, index) {

        const card =
            document.createElement("div");

        card.className =
            "mobile-card";


        card.innerHTML = `

            <img
                class="mobile-image"
                src="${mobile.image}"
                alt="${mobile.name}"
                onerror="this.src='https://via.placeholder.com/300x350?text=Mobile'"
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
                    ${formatPrice(mobile.price)}
                </div>

                <button
                    class="details-button"
                    onclick="showDetails(${index})"
                >
                    View Details
                </button>

            </div>
        `;


        container.appendChild(card);

    });

}


// =========================
// COMPANY FILTER
// =========================

function filterCompany(company) {

    if (company === "All") {

        displayMobiles(mobiles);

        title.innerText =
            "All Mobiles";

        return;
    }


    const filtered =
        mobiles.filter(function(mobile) {

            return mobile.company === company;

        });


    displayMobiles(filtered);

    title.innerText =
        company + " Mobiles";

}


// =========================
// SEARCH
// =========================

function searchMobiles() {

    const input =
        document.getElementById("searchInput");

    const search =
        input.value.toLowerCase().trim();


    const result =
        mobiles.filter(function(mobile) {

            return (

                mobile.name
                .toLowerCase()
                .includes(search)

                ||

                mobile.company
                .toLowerCase()
                .includes(search)

            );

        });


    displayMobiles(result);


    title.innerText =
        search ? "Search Results" : "All Mobiles";

}


// =========================
// ENTER SEARCH
// =========================

document
.getElementById("searchInput")
.addEventListener("keyup", function(event) {

    if (event.key === "Enter") {

        searchMobiles();

    }

});


// =========================
// VIEW DETAILS
// =========================

function showDetails(index) {

    const mobile =
        currentMobiles[index];


    if (!mobile) {

        return;

    }


    selectedMobile =
        mobile;


    document
    .getElementById("modalImage")
    .src = mobile.image;


    document
    .getElementById("modalName")
    .innerText =
        mobile.name;


    document
    .getElementById("modalCompany")
    .innerText =
        mobile.company;


    document
    .getElementById("modalRam")
    .innerText =
        "💾 RAM: " + mobile.ram;


    document
    .getElementById("modalStorage")
    .innerText =
        "💽 Storage: " + mobile.storage;


    document
    .getElementById("modalCamera")
    .innerText =
        "📷 Camera: " + mobile.camera;


    document
    .getElementById("modalNetwork")
    .innerText =
        "📶 Network: " + mobile.network;


    document
    .getElementById("modalPrice")
    .innerText =
        formatPrice(mobile.price);


    document
    .getElementById("productModal")
    .style.display =
        "flex";

}


// =========================
// CLOSE PRODUCT MODAL
// =========================

function closeModal() {

    document
    .getElementById("productModal")
    .style.display =
        "none";

}


// =========================
// ADD TO CART
// =========================

function addToCart(mobile) {

    const existing =
        cart.find(function(item) {

            return item.name === mobile.name;

        });


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


// =========================
// ADD MODAL TO CART
// =========================

function addModalToCart() {

    if (!selectedMobile) {

        return;

    }


    addToCart(selectedMobile);


    alert(
        "✅ " +
        selectedMobile.name +
        " added to cart!"
    );

}


// =========================
// OPEN CART
// =========================

function openCart() {

    renderCart();

    document
    .getElementById("cartModal")
    .style.display =
        "flex";

}


// =========================
// CLOSE CART
// =========================

function closeCart() {

    document
    .getElementById("cartModal")
    .style.display =
        "none";

}


// =========================
// RENDER CART
// =========================

function renderCart() {

    const cartItems =
        document.getElementById("cartItems");


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                🛒 Your cart is empty
            </div>
        `;

        updateCartTotal();

        return;
    }


    cart.forEach(function(item, index) {

        const div =
            document.createElement("div");

        div.className =
            "cart-item";


        div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-item-price">
                    ${formatPrice(item.price)}
                </div>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(${index}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${index}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-button"
                onclick="removeFromCart(${index})"
            >
                ❌
            </button>

        `;


        cartItems.appendChild(div);

    });


    updateCartTotal();

}


// =========================
// CHANGE QUANTITY
// =========================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    renderCart();

    updateCartCount();

}


// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(index) {

    cart.splice(index, 1);


    saveCart();

    renderCart();

    updateCartCount();

}


// =========================
// CART TOTAL
// =========================

function updateCartTotal() {

    let total = 0;


    cart.forEach(function(item) {

        total +=
            item.price *
            item.quantity;

    });


    document
    .getElementById("cartTotal")
    .innerText =
        formatPrice(total);

}


// =========================
// CART COUNT
// =========================

function updateCartCount() {

    let count = 0;


    cart.forEach(function(item) {

        count += item.quantity;

    });


    cartCount.innerText =
        count;

}


// =========================
// SAVE CART
// =========================

function saveCart() {

    localStorage.setItem(
        "mobileStoreCart",
        JSON.stringify(cart)
    );

}


// =========================
// BUY NOW
// =========================

function buyMobile() {

    if (!selectedMobile) {
        return;
    }

    const phoneNumber = "917990130683";

    const message =
        "🛒 *MobileStore Order*%0A%0A" +
        "📱 Mobile: " + selectedMobile.name + "%0A" +
        "🏢 Company: " + selectedMobile.company + "%0A" +
        "💰 Price: " + formatPrice(selectedMobile.price) + "%0A" +
        "💾 RAM: " + selectedMobile.ram + "%0A" +
        "💽 Storage: " + selectedMobile.storage + "%0A" +
        "📷 Camera: " + selectedMobile.camera + "%0A" +
        "📶 Network: " + selectedMobile.network + "%0A%0A" +
        "Please confirm my order.";

    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        message;

    window.open(
        whatsappURL,
        "_blank"
    );

}


// =========================
// CHECKOUT
// =========================

function checkout() {

    if (cart.length === 0) {

        alert(
            "🛒 Your cart is empty!"
        );

        return;

    }


    alert(
        "✅ Checkout started!\n\n" +
        "Total: " +
        document.getElementById("cartTotal").innerText
    );

}


// =========================
// START
// =========================

displayMobiles(mobiles);

updateCartCount();