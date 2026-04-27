const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    mobileMenu.hidden = isOpen;
  });
}

document.querySelectorAll("[data-form]").forEach((form) => {
  const status = form.querySelector(".form-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = [...form.querySelectorAll("input[required], textarea[required]")];
    let firstInvalid = null;

    fields.forEach((field) => {
      const valid = field.type === "checkbox" ? field.checked : field.checkValidity();
      field.setAttribute("aria-invalid", String(!valid));
      if (!valid && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      if (status) status.textContent = "Please complete the required fields before sending.";
      firstInvalid.focus();
      return;
    }

    if (status) status.textContent = "Thank you. Your inquiry has been prepared for follow-up.";
    form.reset();
    fields.forEach((field) => field.removeAttribute("aria-invalid"));
  });
});
