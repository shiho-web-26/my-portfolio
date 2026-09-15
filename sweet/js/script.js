const cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
    const itemList = document.getElementById("item-list");

    for (let i = 0; i < products.length; i++) {
        const id = products[i].id;
        const img = `images/products-no-bg/${id}.webp`

        const name = products[i].name;
        const priceMin = Object.values(products[i].sizePrices)[0];

        itemList.innerHTML += `
            <article>
                <img src="${img}" alt="${name}の写真">
                <div class="item-list-sent">
                    <h2>${name}</h2>
                    <p><strong>${priceMin.toLocaleString()}</strong><span>yen~</span></p>
                    <a class="more-link" href="product.html?id=${id}">more</a>
                </div>
            </article>
            `

        if (i !== products.length - 1) {
            itemList.innerHTML += `<div class="line"></div>`
        }
    }

}

function displayProductDetail(id) {
    const productPage = document.getElementById("product-page");

    const img = `images/products/${id}.webp`;
    const product = products.find((product) => product.id === id);
    const name = product.name;
    const description = product.description;

    let priceId = 4;
    const price = product.sizePrices[priceId];
    const sizeNum = Object.keys(product.sizePrices).find(key => product.sizePrices[key] === price);
    let size;
    if (priceId !== "slice") {
        size = `${sizeNum}号`;
    } else {
        size = `1カット`;
    }

    productPage.innerHTML = `
    <section class="left">
        <div id="product-image">
            <img src="${img}" alt="${name}の写真">
        </div>
        <div>
            ※写真はイメージです<br>
            <div id="whole-cake">
                ※4号サイズ、直径約12cm、2~3人分です<br>
                ※5号サイズ、直径約15cm、4~6人分です<br>
                ※6号サイズ、直径約18cm、6~8人分です<br>
            </div>        
        </div>
    </section>

    <section class="right">
        <h2>${name}<span id="size">${size}</span></h2>
        <p>${description}</p>
        <p class="product-price" id="price">￥${price.toLocaleString()}<span>（税込）</span></p>


        <form class="product-form" id="product-form">
            <div class="product-button">
                <div class="qty">
                    <button type="button" id="minusBtn">-</button>
                    <span id="qtyBtn">1</span>
                    <button type="button" id="plusBtn">+</button>
                </div>

                <select id="sizeSelect">
                    <option value="4">4号</option>
                    <option value="5">5号</option>
                    <option value="6">6号</option>
                    <option value="slice">1 カット</option>
                </select>
            </div>

            <div class="product-select">
                <label>受け取り日時</label><br>
                <div class="date-box">
                    <input id="date-label" type="date" required>
                    <p id="date-msg">※受取日は、ご注文日から3日後以降をご指定いただけます。</p>
                </div>
                <div class="time-box">
                    <select id="time-label" required>
                        <option value="">受取時間を選択してください</option>
                    </select>
                </div>
            </div>

            <div class="option-group message-plate">
                <span>メッセージプレート</span>
                <label>
                    <input type="radio" name="message-plate" value="不要" checked>
                    不要
                </label>
                <label>
                    <input type="radio" name="message-plate" value="必要">
                    必要
                </label>
                <div id="message-plate-detail"></div>
           </div>

            <div class="option-group">
                <span>ローソク</span>
                <label>
                    <input type="radio" name="candles" value="不要" checked>
                    不要
                </label>
                <label>
                    <input type="radio" name="candles" value="必要">
                    必要
                </label>
                <div id="candles-detail"></div>
            </div>

            <button class="add-btn" id="add-btn" type="submit">Add to Cart⇀</button>
        </form>
    </section>
    `;

    //個数変更
    const minusBtn = document.getElementById("minusBtn");
    const plusBtn = document.getElementById("plusBtn");
    const qtyBtn = document.getElementById("qtyBtn");

    plusBtn.addEventListener("click", () => {
        const quantity = Number(qtyBtn.textContent);

        if (quantity < 99) {
            qtyBtn.textContent = quantity + 1;
        }
    });

    minusBtn.addEventListener("click", () => {
        const quantity = Number(qtyBtn.textContent);

        if (quantity > 1) {
            qtyBtn.textContent = quantity - 1;
        }
    });

    //サイズ変更
    const sizeSelect = document.getElementById("sizeSelect");
    const priceElement = document.getElementById("price");
    const sizeElement = document.getElementById("size");
    const imgElement = document.getElementById("product-imgage");

    sizeSelect.addEventListener("change", () => {

        priceId = sizeSelect.value;

        const price = product.sizePrices[priceId];
        const wholeCake = document.getElementById("whole-cake");

        let size;

        if (priceId !== "slice") {
            size = `${priceId}号`;
            imgElement.innerHTML = `
            <img id="img" src="images/products/${id}.webp" alt="${name}の写真">
            `
            wholeCake.classList.remove("hide");
        } else {
            size = "1カット";
            imgElement.innerHTML = `
            <img id="img" src="images/products/${id}-slice.webp" alt="${name}の写真">
            `
            wholeCake.classList.add("hide");
        }

        priceElement.innerHTML = `
        ￥${price.toLocaleString()}<span>（税込）</span>
    `;

        sizeElement.textContent = size;
    });

    //日付　3日後から選択可能
    const dateLabel = document.getElementById("date-label");

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 3);

    const year = minDate.getFullYear();
    const month = String(minDate.getMonth() + 1).padStart(2, "0");
    const day = String(minDate.getDate()).padStart(2, "0");

    dateLabel.min = `${year}-${month}-${day}`;

    //時間　30分毎
    const timeSelect = document.getElementById("time-label");

    for (let hour = 11; hour <= 19; hour++) {
        const times = hour === 19 ? ["00"] : ["00", "30"];

        times.forEach((minute) => {
            const time = `${String(hour).padStart(2, "0")}:${minute}`;

            const option = document.createElement("option");
            option.value = time;
            option.textContent = time;

            timeSelect.appendChild(option);
        });
    }

    //ラベル
    const messagePlateRadios = document.querySelectorAll(
        'input[name="message-plate"]'
    );
    const messagePlate = document.getElementById("message-plate-detail");

    messagePlateRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
            const selected = document.querySelector(
                'input[name="message-plate"]:checked'
            );

            if (selected.value === "必要") {
                messagePlate.innerHTML = `
                <label class="option-detail" for="message">
                    <span>
                        <strong>
                            メッセージプレートをご希望の方は、
                            メッセージ内容をご記入ください。
                        </strong><br>
                        ※不要の場合は「不要」とお書きください。
                    </span>

                    <textarea
                        rows="1"
                        placeholder="例）Happy Birthday ◯◯"
                        id="message"
                        maxlength="20"
                        required
                    ></textarea>
                </label>
                `;
            } else {
                messagePlate.innerHTML = ``;
            }

        })
    });

    const candlesRadios = document.querySelectorAll(
        'input[name="candles"]'
    );
    const candles = document.getElementById("candles-detail");

    candlesRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
            const selected = document.querySelector(
                'input[name="candles"]:checked'
            );

            if (selected.value === "必要") {
                candles.innerHTML = `
                <label class="option-detail" for="candle">
                    <span>
                        <strong>
                            ローソクをご希望の方は、長さ（長or短）とご希望の本数をご記入ください。
                        </strong><br>
                        ※不要の場合は「不要」とお書きください。
                    </span>

                    <textarea 
                        rows="1" 
                        placeholder="例）長3本と短2本" 
                        id="candle"
                        maxlength="10" 
                        required
                    ></textarea>
                </label>
                `;
            } else {
                candles.innerHTML = ``;
            }

        })
    });

    //カートに入れる
    const productForm = document.getElementById("product-form");

    productForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const productId = id;
        const size = document.getElementById("sizeSelect").value;
        const price = product.sizePrices[size];
        const quantity = Number(
            document.getElementById("qtyBtn").textContent
        );

        const pickupDate = document.getElementById("date-label").value;
        const pickupTime = document.getElementById("time-label").value;

        const messagePlateSelected = document.querySelector(
            'input[name="message-plate"]:checked'
        ).value;
        let message = "不要";
        if (messagePlateSelected === "必要") {
            message = document.getElementById("message").value;
        }
        const candlesSelected = document.querySelector(
            'input[name="candles"]:checked'
        ).value;
        let candles = "不要";
        if (candlesSelected === "必要") {
            candles = document.getElementById("candle").value;
        }

        const cartItem = {
            productId: productId,
            size: size,
            price: price,
            quantity: quantity,

            pickupDate: pickupDate,
            pickupTime: pickupTime,

            message: message,
            candles: candles
        };

        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));

        alert("カートに追加しました。");
        window.location.reload();
    });
}

function displayPickUp() {
    const pickUpBox = document.getElementById("pick-up-box");

    for (let i = 2; i >= 0; i--) {
        const product = products[i];
        const img = `images/products/${product.id}.webp`;
        const imgMobile = `images/products-no-bg/${product.id}.webp`;
        const name = product.name;
        const priceMin = Object.values(product.sizePrices)[0];

        pickUpBox.innerHTML += `
            <article>
                <a href="product.html?id=${product.id}">
                    <picture>
                        <source
                            media="(max-width: 768px)"
                            srcset="${imgMobile}"
                        >
                        <img src="${img}" alt="${name}の写真">
                    </picture>                    <p class="title">${name}</p>
                    <p class="price"><strong>${priceMin.toLocaleString()}</strong><span>yen~</span></p>
                </a>
            </article>
        `;
    }
}

function displayCartPage() {
    const cartPageEmp = document.getElementById("cart-page-emp");
    const cartPage = document.getElementById("cart-page");

    for (let i = 0; i < cart.length; i++) {

        for (let j = i + 1; j < cart.length; j++) {

            const isSame =
                cart[i].productId === cart[j].productId &&
                cart[i].size === cart[j].size &&
                cart[i].price === cart[j].price &&
                cart[i].pickupDate === cart[j].pickupDate &&
                cart[i].pickupTime === cart[j].pickupTime &&
                cart[i].message === cart[j].message &&
                cart[i].candles === cart[j].candles;

            if (isSame) {
                cart[i].quantity += cart[j].quantity;

                cart.splice(j, 1);

                j--;
            }
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    if (cart.length === 0) {
        cartPage.classList.add("hide");
        cartPageEmp.classList.remove("hide");
    } else {
        cartPageEmp.classList.add("hide");
        cartPage.classList.remove("hide");

        const cartArea = document.getElementById("cart-area");

        let totalPrice = 0;

        for (let i = 0; i < cart.length; i++) {
            const product = products.find((product) => product.id === cart[i].productId);
            const name = product.name;
            const size = cart[i].size === "slice" ? "1カット" : `${cart[i].size}号`;
            const qty = cart[i].quantity;
            const price = cart[i].price;
            const subtotal = price * qty;

            const date = cart[i].pickupDate;
            const time = cart[i].pickupTime;
            const message = cart[i].message;
            const candles = cart[i].candles;

            cartArea.innerHTML += `
    <div class="cart-area-product">
        <div class="order-detail">
            <strong>${name}</strong>
            <p>${size}</p>
            <p>
                <button
                    type="button"
                    data-action="minus"
                    data-index="${i}"
                >
                    -
                </button>

                <span>${qty}</span>

                <button
                    type="button"
                    data-action="plus"
                    data-index="${i}"
                >
                    +
                </button>
            </p>
            <p>￥${price.toLocaleString()}</p>
            <p>￥${subtotal.toLocaleString()}</p>
            <p class="cart-del">
                <button
                    type="button"
                    data-action="remove"
                    data-index="${i}"
                >
                    削除
                </button>
            </p>
        </div>

        <details class="cart-detail">
            <summary>
                <span class="detail-icon">▼</span>
                注文内容
            </summary>

            <div class="cart-detail-content">
                <p>
                    <strong>受取日時</strong>
                    <span>${date} ${time}</span>
                </p>
                <p>
                    <strong>メッセージプレート</strong>
                    <span>
                        ${cart[i].message === "不要"
                    ? "不要"
                    : `メッセージ：${message}`
                }
                    </span>
                </p>
                <p>
                    <strong>ローソク</strong>
                    <span>
                        ${cart[i].candles === "不要"
                    ? "不要"
                    : `本数：${candles}`
                }
                    </span>
                </p>
            </div>
        </details>
    </div>
`;

            totalPrice += subtotal;
        }

        cartArea.addEventListener("click", (event) => {
            const button = event.target.closest("button");

            if (!button) {
                return;
            }

            const action = button.dataset.action;
            const index = Number(button.dataset.index);

            if (action === "plus") {
                if (cart[index].quantity < 99) {
                    cart[index].quantity++;
                }
            }

            if (action === "minus") {
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                }
            }

            if (action === "remove") {
                cart.splice(index, 1);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.reload();
        });

        const total = document.getElementById("total");
        total.textContent = totalPrice.toLocaleString();

        const orderBtn = document.getElementById("order-btn");
        orderBtn.addEventListener("click", () => {
            const pay = document.querySelector('input[name="paytype"]:checked');
            if (!pay) {
                alert("お支払い方法を選択してください。");
                return;
            }

            alert("お支払いが完了しました。（ダミー）");
            localStorage.removeItem("cart");
            window.location.reload();
        });

    }
}

function displayNews() {
    const newsPageTopicks = document.getElementById("news-page-topicks");

    const page = window.location.pathname.split("/").pop();
    const isIndex = page === "" || page === "index.html";

    for (let i = news.length - 1; i >= 0; i--) {
        const id = news[i].id;
        const img = `images/news/${id}.webp`;
        const title = news[i].title;
        const date = news[i].date;

        newsPageTopicks.innerHTML += `
            <article class="${isIndex ? "news-box-index" : "news-box"}">
                    <a href="article.html?id=${id}">
                    <img src="${img}" alt="${title}">
                    <p>
                        ${title}<br>
                        <span>${date}</span>
                    </p>
                </a>
            </article>
        `;
    }
}

function displayNewsDetail(id) {
    const article = news.find((news) => news.id === id);

    const title = article.title;
    const date = article.date;
    const description = article.description;

    const newsArticle = document.getElementById("news-article");

    newsArticle.innerHTML = `
        <h2>${title}</h2>
        <div class="line-02"></div>
        <div class="news-sent">
            <span>${date}</span>
            <p>${description}</p>
        </div>
        <div class="line"></div>
        <button class="back-btn" id="back-btn">↼Back</button>
    `;
}