function displayProducts() {
    const itemList = document.getElementById("item_list");

    for (let i = 0; i < products.length; i++) {
        const id = products[i].id;
        const img = `images/products_no_bg/${id}.png`

        const name = products[i].name;
        const priceMin = products[i].sizePrices.slice;

        itemList.innerHTML += `
            <article>
                <img src="${img}" alt="${name}の写真">
                <div class="item_list_sent">
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

    const img = `images/products/${id}.png`;
    const product = products.find((product) => product.id === id);
    const name = product.name;
    const description = product.description;

    let priceId = 5;
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
        <div id="img"><img id="img" src="${img}" alt="${name}の写真"></div>
        <p>
            ※写真はイメージです<br>
            ※4号サイズ、直径約12cm、2~3人分です<br>
            ※5号サイズ、直径約15cm、4~6人分です<br>
            ※6号サイズ、直径約18cm、6~8人分です<br>
        </p>
    </section>

    <section>
        <h2>${name}<span id="size">${size}</span></h2>
        <p>${description}</p>
        <p class="product_price" id="price">￥${price.toLocaleString()}<span>（税込）</span></p>


        <form class="form_sent">
            <div class="product_button">
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

            <dis class="product_select">
                <script id="date_time"></script>
                <label>受け取り日時</label><br>
                <div class="date_box">
                    <input type="date" required id="dateLabel">
                    <p id="dateMsg"></p>
                </div>
                <div class="time_box">
                    <input required id="timeLabel" type="time" min="11:00" max="19:00" step="1800">
                    <p id="timeMsg"></p>
                </div>
            </dis>

            <label class="product_form" for="message">
                <span>
                    <strong>メッセージプレートをご希望の方は、メッセージ内容をご記入ください。</strong><br>
                    ※不要の場合は「不要」とお書きください。
                </span>
                <textarea type="message" rows="1" placeholder="例）Happy Birthday ◯◯" id="message"
                    required></textarea>
            </label>
            <label class="product_form" for="candle">
                <span>
                    <strong>ローソクをご希望の方は、長さ（長or短）とご希望の本数をご記入ください。</strong><br>
                    ※不要の場合は「不要」とお書きください。
                </span>
                <textarea type="message" rows="1" placeholder="例）長3本と短2本" id="candle" required></textarea>
            </label>

            <button class="button_add" id="addBtn" type="button">Add to Cart⇀</button>
        </form>
    </section>
    `;

    const sizeSelect = document.getElementById("sizeSelect");
    const priceElement = document.getElementById("price");
    const sizeElement = document.getElementById("size");
    const imgElement = document.getElementById("img");

    sizeSelect.addEventListener("change", () => {

        priceId = sizeSelect.value;

        const price = product.sizePrices[priceId];

        let size;

        if (priceId !== "slice") {
            size = `${priceId}号`;
            imgElement.innerHTML = `
            <img id="img" src="images/products/${id}.png" alt="${name}の写真">
            `
        } else {
            size = "1カット";
            imgElement.innerHTML = `
            <img id="img" src="images/products/${id}_slice.png" alt="${name}の写真">
            `
        }

        priceElement.innerHTML = `
        ￥${price.toLocaleString()}<span>（税込）</span>
    `;

        sizeElement.textContent = size;
    });
}
