// массив продуктов
const products = [
    {
        id: 1,
        name: "Рассыпчатая фиксирующая пудра Essence fix & last 14h",
        brand: "Essence",
        category: "Пудра",
        image: "../assets/images/essence_fixandlast14h.jpg",
        type: ["жирная", "нормальная", "комбинированная"],
        ingredients: "zea mays (corn) starch, mica, tapioca starch, magnesium stearate, ci 77891 (titanium dioxide)",
        description: "Рассыпчатая пудра fix & LAST 14h обеспечивает водостойкий эффект и фиксацию макияжа сроком до 14 часов."
    },
    {
        id: 2,
        name: "Тональный cc-крем для лица spf10 Luxvisage active complex",
        brand: "Luxvisage",
        category: "Тональный крем",
        image: "../assets/images/luxvisage_activecomplex.jpg",
        type: ["нормальная", "комбинированная"],
        ingredients: "Aqua, Glycerin, Ethylhexyl Methoxycinnamate, Cyclopentasiloxane, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Propylene Glycol Dicaprylate/Dicaprate, Octyldodecanol, C13-15 Alkane, Cyclohexasiloxane, Acetamidoethoxyethanol, Octyldodecyl Xyloside, PEG-30 Dipolyhydroxystearate, Dimethicone, Dimethicone Crosspolymer, Cetyl Dimethicone, Methyl Methacrylate Crosspolymer, Polyacrylate-13, Polyisobutene, Triethoxycaprylylsilane, Tocopheryl Acetate, Polysorbate 20, Phenoxyethanol, Methylparaben, Propylparaben, Ethylparaben, Parfum, Dimethyl Phenethyl Acetate",
        description: "Идеально подстраивается под тон кожи, улучшает её естественный оттенок, обеспечивает максимальную цветокоррекцию."
    },
    {
        id: 3,
        name: "Матовый консилер Essence camouflage+ matt",
        brand: "Essence",
        category: "Консилер",
        image: "../assets/images/essence_camouflagematt.jpg",
        type: ["жирная", "нормальная", "комбинированная"],
        ingredients: "Aqua (Water), Talc, Dicaprylyl Ether, Isononyl Isononanoate, Glycerin, Isododecane, Polyglyceryl-3 Polyricinoleate, Tocopherol, Polyglyceryl-3 Diisostearate, Disteardimonium Hectorite, Potassium Cetyl Phosphate, Sodium Chloride, Synthetic Beeswax, Ethylhexylglycerin, Xanthan Gum, Lecithin, Tetrasodium Glutamate Diacetate, Ascorbyl Palmitate, Citric Acid, Phenoxyethanol, Parfum (Fragrance), CI 77491 (Iron Oxides), CI 77492 (Iron Oxides), CI 77499 (Iron Oxides), CI 77891 (Titanium Dioxide)",
        description: "Жидкий матовый консилер с очень высокой степенью покрытия — универсальное средство для эффективной маскировки заметных несовершенств кожи."
    },
    {
        id: 4,
        name: "Кремовая губная помада-стик Love Generationpure kaif",
        brand: "Love Generation",
        category: "Помада",
        image: "../assets/images/lovegeneration_kaif.jpg",
        type: ["нормальные", "увлажнённые"],
        ingredients: "Ricinus communis (castor) oil, cera microcrystallina, isopropyl myristate, phenyl trimethicone, bis-diglyceryl-polyacyladipate-2, paraffin, caprylic/capric triglycerides, octyldodecanol, ethylhexyl palmitate, isononyl isononanoate, copernicia cerifera cera, synthetic fluorphlogopite, silica dimethyl silylate, helianthus annuus seed cera, montan acid wax, hydrogenated styrene/methyl styrene/indene copolymer, shorea robusta resin, ascorbyl palmitate, tocopherol, methylparaben, propylparaben, внт, aluminum hydroxide, triethoxycaprylylsilane, aroma, benzyl alcohol, benzyl benzoate, citral, eugenol",
        description: "Продукт с кремовой пигментированной текстурой равномерно прокрашивает губы и оставляет комфортный глянцевый финиш."
    },
    {
        id: 5,
        name: "Ультрастойкая подводка для глаз Eveline Precise Brush",
        brand: "Eveline",
        category: "Подводка",
        image: "../assets/images/eveline_precisebrush.jpg",
        type: ["нормальные", "средние"],
        ingredients: "Aqua (Water), Styrene/Acrylates Copolymer, Butylene Glycol, Peg-40 Hydrogenated Castor Oil, Phenoxyethanol, Capryl Glycol, Acrylates Copolymer, Betaine, Sodium Dehydroacetate, Glycerin, Hydroxyethylcellulose, Etylhexylglicerin, Panthenol, Biotinoyl Tripeptide-1, CI 77499",
        description: "Новая подводка для глаз заканчивается точной, мягкой кисточкой, благодаря которой нарисовать стрелки легко и просто."
    }
];

// избранное
// localStorage — встроенное хранилище браузера, cохраняет данные между сессиями
function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function toggleFavorite(productId) {
    let favorites = getFavorites();
    const id = Number(productId);

    if (favorites.includes(id)) {
        favorites = favorites.filter(fav => fav !== id);
    } else {
        favorites.push(id);
    }

    saveFavorites(favorites);
    updateFavoritesCount();
    return favorites.includes(id);
}

function updateFavoritesCount() {
    const count = getFavorites().length;
    document.querySelectorAll("#favoritesCount, .favorites-count").forEach(el => {
        el.textContent = `(${count})`;
    });
}


// ========================================
// 3. РЕНДЕР КАРТОЧЕК
// ========================================

function createProductCard(product) {
    const isFav = getFavorites().includes(product.id);

    return `
        <article class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            <span class="product-brand">${product.brand}</span>
            <h3>${product.name}</h3>
            <span class="product-category">${product.category}</span>
            <p class="product-price">${product.price} ₽</p>
            <p class="product-rating">★ ${product.rating}</p>
            <div class="product-actions">
                <a href="product.html?id=${product.id}" class="btn-details">Подробнее</a>
                <button class="btn-favorite ${isFav ? 'active' : ''}" data-id="${product.id}">
                    ${isFav ? '♥' : '♡'}
                </button>
            </div>
        </article>
    `;
}

function renderProducts(list, containerId = "catalog") {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = "";
        const emptyMsg = document.getElementById("catalogEmpty");
        if (emptyMsg) emptyMsg.style.display = "block";
        return;
    }

    const emptyMsg = document.getElementById("catalogEmpty");
    if (emptyMsg) emptyMsg.style.display = "none";

    container.innerHTML = list.map(createProductCard).join("");
}


// ========================================
// 4. КАТАЛОГ — ПОИСК И ФИЛЬТР
// ========================================

function initCatalog() {
    const catalog = document.getElementById("catalog");
    if (!catalog) return;

    const searchInput = document.getElementById("search");
    const categoryFilter = document.getElementById("filterCategory");

    function applyFilters() {
        const query = (searchInput?.value || "").toLowerCase().trim();
        const category = categoryFilter?.value || "";

        const filtered = products.filter(p => {
            const matchesSearch = !query || p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query);
            const matchesCategory = !category || p.category === category;
            return matchesSearch && matchesCategory;
        });

        renderProducts(filtered);
    }

    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (categoryFilter) categoryFilter.addEventListener("change", applyFilters);

    renderProducts(products);
}


// ========================================
// 5. ИЗБРАННОЕ — СТРАНИЦА
// ========================================

function initFavoritesPage() {
    const container = document.getElementById("favorites");
    if (!container) return;

    const favorites = getFavorites();
    const favoriteProducts = products.filter(p => favorites.includes(p.id));

    const emptyMsg = document.getElementById("favoritesEmpty");

    if (favoriteProducts.length === 0) {
        container.innerHTML = "";
        if (emptyMsg) emptyMsg.style.display = "block";
    } else {
        if (emptyMsg) emptyMsg.style.display = "none";
        container.innerHTML = favoriteProducts.map(createProductCard).join("");
    }
}


// ========================================
// 6. СТРАНИЦА ТОВАРА
// ========================================

function initProductPage() {
    const container = document.getElementById("productDetail");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id"));

    let product = products.find(p => p.id === productId);
    if (!product) product = products[0];

    const isFav = getFavorites().includes(product.id);

    container.innerHTML = `
        <h1>${product.name}</h1>
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
        <p><strong>Категория:</strong> ${product.category}</p>
        <p><strong>Бренд:</strong> ${product.brand}</p>
        <p><strong>Тип:</strong> ${product.type.join(", ")}</p>
        <p>${product.description}</p>
        <p><strong>Состав:</strong> ${product.ingredients}</p>
        <button type="button" class="btn-favorite ${isFav ? 'active' : ''}" data-id="${product.id}">
            ${isFav ? '♥ Удалить из избранного' : '♡ Добавить в избранное'}
        </button>
        <a href="catalog.html" class="btn-secondary">← Назад в каталог</a>
    `;
}


// ========================================
// 7. WIZARD В QUIZ
// ========================================

let currentStep = 1;
const totalSteps = 3;

function showStep(step) {
    document.querySelectorAll(".quiz-step").forEach(el => {
        el.style.display = "none";
    });
    const current = document.querySelector(`.quiz-step[data-step="${step}"]`);
    if (current) current.style.display = "block";
    currentStep = step;
}

function buildStep2(category) {
    const fieldset = document.getElementById("featureQuestion");
    const label = document.getElementById("featureLabel");
    if (!fieldset || !label) return;

    let question = "";
    let options = [];

    const eyeCategories = ["Тушь", "Тени для век", "Подводка", "Карандаш для глаз"];
    const faceCategories = ["Тональный крем", "Пудра", "Консилер", "Праймер"];
    const toneCategories = ["Румяна", "Хайлайтер", "Бронзер"];
    const lipCategories = ["Помада", "Блеск для губ", "Карандаш для губ", "Тинт"];

    if (eyeCategories.includes(category)) {
        question = "Насколько чувствительны ваши глаза?";
        options = [
            { value: "high", label: "Очень чувствительные" },
            { value: "medium", label: "Средние" },
            { value: "low", label: "Не чувствительные" }
        ];
    } else if (faceCategories.includes(category)) {
        question = "Какой у вас тип кожи?";
        options = [
            { value: "dry", label: "Сухая" },
            { value: "oily", label: "Жирная" },
            { value: "normal", label: "Нормальная" },
            { value: "combination", label: "Комбинированная" }
        ];
    } else if (toneCategories.includes(category)) {
        question = "Какой у вас тон кожи?";
        options = [
            { value: "light", label: "Светлый" },
            { value: "medium", label: "Средний" },
            { value: "dark", label: "Тёмный" }
        ];
    } else if (lipCategories.includes(category)) {
        question = "Насколько чувствительны ваши губы?";
        options = [
            { value: "high", label: "Очень чувствительные" },
            { value: "medium", label: "Средние" },
            { value: "low", label: "Не чувствительные" }
        ];
    }

    label.textContent = question;

    // Удаляем старые radio
    fieldset.querySelectorAll("label").forEach(el => el.remove());

    options.forEach(opt => {
        const labelEl = document.createElement("label");
        labelEl.innerHTML = `<input type="radio" name="step2Answer" value="${opt.value}" required> ${opt.label}`;
        fieldset.appendChild(labelEl);
    });
}

function initQuiz() {
    const form = document.getElementById("quizForm");
    if (!form) return;

    const categorySelect = document.getElementById("quizCategory");
    const nextButtons = document.querySelectorAll(".button-next");
    const prevButtons = document.querySelectorAll(".button-prev");

    nextButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Валидация текущего шага
            const stepEl = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
            const requiredFields = stepEl.querySelectorAll("[required]");
            let valid = true;

            requiredFields.forEach(field => {
                if (field.type === "radio") {
                    const name = field.name;
                    const checked = stepEl.querySelector(`input[name="${name}"]:checked`);
                    if (!checked) valid = false;
                } else if (!field.value) {
                    valid = false;
                }
            });

            if (!valid) {
                alert("Пожалуйста, заполните все поля");
                return;
            }

            // Если уходим со шага 1 — строим шаг 2
            if (currentStep === 1) {
                buildStep2(categorySelect.value);
            }

            if (currentStep < totalSteps) {
                showStep(currentStep + 1);
            }
        });
    });

    prevButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentStep > 1) showStep(currentStep - 1);
        });
    });

    // Submit — финальный шаг
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const category = categorySelect.value;
        const step2 = document.querySelector('input[name="step2Answer"]:checked');
        const allergies = Array.from(form.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

        // Фильтрация товаров
        let matched = products.filter(p => p.category === category);
        if (matched.length === 0) matched = products;

        // Показываем результат
        const result = document.getElementById("quizResult");
        result.innerHTML = `
            <h2>Мы подобрали для вас:</h2>
            <div class="catalog-grid">
                ${matched.slice(0, 4).map(createProductCard).join("")}
            </div>
        `;

        // Скрываем форму
        form.style.display = "none";
    });
}


// ========================================
// 8. ИМЯ НА ГЛАВНОЙ
// ========================================

function initMainPage() {
    const input = document.getElementById("userName");
    if (!input) return;

    const savedName = localStorage.getItem("userName");
    if (savedName) {
        input.value = savedName;
    }

    input.addEventListener("input", () => {
        localStorage.setItem("userName", input.value);
    });
}


// ========================================
// 9. КЛИКИ НА КНОПКИ ИЗБРАННОГО
// ========================================

document.addEventListener("click", (e) => {
    const favBtn = e.target.closest(".btn-favorite");
    if (!favBtn) return;
    e.preventDefault();

    const id = favBtn.dataset.id;
    if (!id) return;

    const isNowFav = toggleFavorite(id);

    // Обновляем текст кнопки — 3 случая
    if (favBtn.tagName === "BUTTON") {
        const text = favBtn.textContent.trim();

        if (text.includes("Добавить")) {
            // Был "Добавить в избранное" → теперь "Удалить из избранного"
            favBtn.textContent = "♥ Удалить из избранного";
        } else if (text.includes("Удалить")) {
            // Был "Удалить из избранного" → теперь "Добавить в избранное"
            favBtn.textContent = "♡ Добавить в избранное";
        } else {
            // Короткая версия для карточек (только символ)
            favBtn.textContent = isNowFav ? "♥" : "♡";
        }
    }

    favBtn.classList.toggle("active", isNowFav);

    // Если на странице избранного — перерисовать
    const favContainer = document.getElementById("favorites");
    if (favContainer) initFavoritesPage();
});


// ========================================
// 10. ИНИЦИАЛИЗАЦИЯ
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    initMainPage();
    initCatalog();
    initFavoritesPage();
    initProductPage();
    initQuiz();
    updateFavoritesCount();
});