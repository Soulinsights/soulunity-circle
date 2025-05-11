
document.addEventListener("DOMContentLoaded", () => {
    const cards = Array.from(document.querySelectorAll(".journal-card"));
    const paginationButtons = document.querySelectorAll(".pagination-link");
    const searchInput = document.querySelector("input[type='text']");
    const tagButtons = document.querySelectorAll(".journal-tag");

    let currentPage = 1;
    const itemsPerPage = 6;

    function paginate(entries) {
        entries.forEach((el, i) => {
            el.style.display = (i >= (currentPage - 1) * itemsPerPage && i < currentPage * itemsPerPage) ? "" : "none";
        });
    }

    function updatePaginationActive(index) {
        paginationButtons.forEach(btn => btn.classList.remove("active"));
        paginationButtons[index - 1].classList.add("active");
    }

    function filterCards() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeTags = Array.from(document.querySelectorAll(".journal-tag.active")).map(el => el.textContent.trim().toLowerCase());
        const filtered = cards.filter(card => {
            const text = card.innerText.toLowerCase();
            const tags = Array.from(card.querySelectorAll(".journal-tag")).map(tag => tag.textContent.trim().toLowerCase());
            const matchesSearch = text.includes(searchTerm);
            const matchesTags = activeTags.length === 0 || activeTags.every(tag => tags.includes(tag));
            return matchesSearch && matchesTags;
        });
        cards.forEach(card => card.style.display = "none");
        filtered.forEach(card => card.style.display = "");
        return filtered;
    }

    paginationButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            currentPage = index + 1;
            updatePaginationActive(currentPage);
            paginate(cards);
        });
    });

    searchInput.addEventListener("input", () => {
        currentPage = 1;
        updatePaginationActive(currentPage);
        paginate(filterCards());
    });

    tagButtons.forEach(tag => {
        tag.addEventListener("click", () => {
            tag.classList.toggle("active");
            currentPage = 1;
            updatePaginationActive(currentPage);
            paginate(filterCards());
        });
    });

    paginate(cards);
    updatePaginationActive(currentPage);
});
