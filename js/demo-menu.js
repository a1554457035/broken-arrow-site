const dropdowns = document.querySelectorAll(".menu-dropdown");
const submenus = document.querySelectorAll(".menu-submenu");
const compactNavigation = window.matchMedia("(hover: none), (max-width: 620px)");

function setSubmenu(submenu, open) {
    const trigger = submenu.querySelector(".menu-submenu-trigger");
    submenu.classList.toggle("is-open", open);
    trigger.setAttribute("aria-expanded", String(open));
}

function setDropdown(dropdown, open) {
    const button = dropdown.querySelector(".menu-dropdown-toggle");
    dropdown.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));

    if (!open) {
        dropdown.querySelectorAll(".menu-submenu").forEach((submenu) => {
            setSubmenu(submenu, false);
        });
    }
}

dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".menu-dropdown-toggle");
    button.addEventListener("click", () => {
        const next = !dropdown.classList.contains("is-open");
        dropdowns.forEach((item) => setDropdown(item, item === dropdown && next));
    });

    dropdown.querySelectorAll(".menu-panel a:not(.menu-submenu-trigger)").forEach((link) => {
        link.addEventListener("click", () => setDropdown(dropdown, false));
    });
});

submenus.forEach((submenu) => {
    const trigger = submenu.querySelector(".menu-submenu-trigger");

    submenu.addEventListener("mouseenter", () => {
        if (!compactNavigation.matches) {
            setSubmenu(submenu, true);
        }
    });

    submenu.addEventListener("mouseleave", () => {
        if (!compactNavigation.matches) {
            setSubmenu(submenu, submenu.contains(document.activeElement));
        }
    });

    trigger.addEventListener("focus", () => {
        if (!compactNavigation.matches) {
            setSubmenu(submenu, true);
        }
    });

    submenu.addEventListener("focusout", (event) => {
        if (!submenu.contains(event.relatedTarget)) {
            setSubmenu(submenu, false);
        }
    });

    trigger.addEventListener("click", (event) => {
        if (compactNavigation.matches && !submenu.classList.contains("is-open")) {
            event.preventDefault();
            submenus.forEach((item) => setSubmenu(item, item === submenu));
        }
    });
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".menu-dropdown")) {
        dropdowns.forEach((item) => setDropdown(item, false));
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        dropdowns.forEach((item) => setDropdown(item, false));
    }
});
