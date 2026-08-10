/* =========================
   CHECK LOGIN
========================= */

const savedUser = localStorage.getItem("registeredUser");

if (!savedUser) {
    window.location.href = "index.html";
}


/* =========================
   USER NAME
========================= */

if (savedUser) {

    const user = JSON.parse(savedUser);

    document.getElementById("welcomeUser").textContent =
        "Hello, " + user.name;
}


/* =========================
   MOBILE PRODUCTS
========================= */

const mobileProducts = [

    {
        name: "iPhone 16",
        brand: "Apple",
        price: "₹69,900",
        image:
        "https://m.media-amazon.com/images/I/712SuRmHG4L._SX679_.jpg"
    },

    {
        name: "Galaxy S25",
        brand: "Samsung",
        price: "₹74,999",
        image:
        "https://static.androidworld.nl/orca/products/24604/samsung-galaxy-s25.png"
    },

    {
        name: "OnePlus 13",
        brand: "OnePlus",
        price: "₹69,999",
        image:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ8Jm1lt-5_LOfKVxWFZfeRDB7TzZ1103OoUm7PEeJIe2SB399iKkYdKKFWDQYYeQt0Cljhbf-OQYwSvea8iTI__y1ASF8oKCLbPHQ_96g"
    },

    {
        name: "Pixel 9",
        brand: "Google",
        price: "₹64,999",
        image:
        "https://rukminim1.flixcart.com/image/1396/1396/xif0q/mobile/n/o/b/-original-imahfjsftzhymazf.jpeg?q=90"
    },

    {
        name: "Redmi Note 14 Pro 5G",
        brand: "Redmi",
        price: "₹23,999",
        image:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSytDinYK3-vzPorHEH5tHxTkZh1Kh4VryqacPRRhcweEfNw18aGk8eSzuzcqo20I05qLlQ2045_5g5ZADGEJmCTGwKQWHR"
    },

    {
        name: "realme GT 7",
        brand: "realme",
        price: "₹42,999",
        image:
        "https://rukminim1.flixcart.com/image/1396/1396/xif0q/mobile/8/l/f/-original-imahjrpe4r7cfwu3.jpeg?q=90"
    },

    {
        name: "Vivo V50",
        brand: "Vivo",
        price: "₹34,999",
        image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRt9hfNEbaeCW0Rv-y5ndfWLb8lAROhns9YvrXdanl8W_iWtxnKxNKBY61VH9q6cbbmrLIKou3-EMXwZ2tgx3ygp4wMRhRP"
    },

    {
        name: "OPPO Reno13 5G",
        brand: "OPPO",
        price: "₹37,999",
        image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcReqp_UTJrRKBFhLfSfMDWWXh30SdTDKGVXfzURA0gAUx8DKqhidYgAzNqxpvc6_N6Xp92Td_lOXwDRevr9awfihNMWFRV1"
    }

];


/* =========================
   SHOW PRODUCTS
========================= */

function showProducts() {

    const search =
        document
        .getElementById("search")
        .value
        .toLowerCase();

    const productsDiv =
        document.getElementById("products");


    const filtered =
        mobileProducts.filter(function(product) {

            return (
                product.name
                .toLowerCase()
                .includes(search)

                ||

                product.brand
                .toLowerCase()
                .includes(search)
            );

        });


    productsDiv.innerHTML = "";


    filtered.forEach(function(product) {

        productsDiv.innerHTML += `

            <div class="card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.src='https://placehold.co/500x600/ffffff/111827?text=Image+Not+Available'"
                >

                <div class="info">

                    <div class="brand">
                        ${product.brand}
                    </div>

                    <h3>
                        ${product.name}
                    </h3>

                    <div class="price">
                        ${product.price}
                    </div>

                    <button
                        class="buy"
                        onclick="buyMobile('${product.name}')"
                    >
                        Buy Now
                    </button>

                </div>

            </div>

        `;

    });

}


/* =========================
   BUY NOW
========================= */

function buyMobile(name) {

    alert(
        "You selected " +
        name +
        " 📱"
    );

}


/* =========================
   LOGOUT
========================= */

function logout() {

    window.location.href =
        "index.html";

}


/* =========================
   FIRST LOAD
========================= */

showProducts();