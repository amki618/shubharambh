document.addEventListener("DOMContentLoaded", function () {

    const favButtons = document.querySelectorAll(".fav-btn");
    const favPanel = document.getElementById("fav-items");
    const favGrid = document.getElementById("favorites-grid");

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    /* ======================
       FAVORITE BUTTON SYSTEM
    ====================== */

    favButtons.forEach(btn => {

        const imgSrc = btn.previousElementSibling.src;

        // restore active hearts
        if (favorites.includes(imgSrc)) {
            btn.classList.add("active");
            btn.textContent = "❤️";
        }

        btn.addEventListener("click", () => {

            if (favorites.includes(imgSrc)) {

                favorites = favorites.filter(item => item !== imgSrc);
                btn.classList.remove("active");
                btn.textContent = "♡";

            } else {

                favorites.push(imgSrc);
                btn.classList.add("active");
                btn.textContent = "❤️";

                // heart animation
                btn.classList.remove("pop");
                void btn.offsetWidth;
                btn.classList.add("pop");
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));

            renderFavPanel();
        });

    });

    /* ======================
       FAVORITES SIDE PANEL
    ====================== */

    function renderFavPanel() {

        if (!favPanel) return;

        favPanel.innerHTML = "";

        favorites.forEach(src => {

            const img = document.createElement("img");
            img.src = src;

            favPanel.appendChild(img);
        });
    }

    renderFavPanel();

    /* ======================
       FAVORITES PAGE
    ====================== */

    function renderFavoritesPage() {

        if (!favGrid) return;

        favGrid.innerHTML = "";

        if (favorites.length === 0) {
            favGrid.innerHTML = "<p>No favorites yet ❤️</p>";
            return;
        }

        favorites.forEach((src, index) => {

            const card = document.createElement("div");
            card.className = "card";

            const img = document.createElement("img");
            img.src = src;

            const removeBtn = document.createElement("button");
            removeBtn.className = "remove-fav-btn";
            removeBtn.innerHTML = "❤️ Remove";

            removeBtn.addEventListener("click", () => {

                favorites.splice(index, 1);

                localStorage.setItem("favorites", JSON.stringify(favorites));

                renderFavoritesPage();
                renderFavPanel();
            });

            card.appendChild(img);
            card.appendChild(removeBtn);

            favGrid.appendChild(card);

        });
    }

    renderFavoritesPage();

});