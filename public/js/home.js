// Dropdown Function
function toggleDropdown(menu, dropdown) {
    menu.addEventListener("click", () => {
        dropdown.classList.toggle("hidden");
    });

    window.addEventListener("click", (event) => {
        if (!menu.contains(event.target)) {
            dropdown.classList.add("hidden");
        }
    });
};

// Personal dropdown
const personalMenu = document.getElementById("personalMenu");
const personalDropdownMenu = document.getElementById("personalDropdownMenu");
// Burger Dropdown
const burgerMenu = document.getElementById("burgerMenu");
const burgerDropdown = document.getElementById("burgerDropdown");

toggleDropdown(personalMenu, personalDropdownMenu);
toggleDropdown(burgerMenu, burgerDropdown);

