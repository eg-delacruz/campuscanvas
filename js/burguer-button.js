const menu = document.querySelector(".menu");
const burgerButton = document.querySelector("#burger-menu");
// Access to MQ 767
const MQ767 = window.matchMedia("screen and (max-width: 767px)");
MQ767.addListener(validation);
// Esta última pone un lístener cuando el MQ 767 es vigente y activa
// la función "validation"
function validation(event) {
  if (event.matches) {
    burgerButton.addEventListener("click", hideShow);
    menu.addEventListener("click", hideMenu);
  } else {
    burgerButton.removeEventListener("click", hideShow);
    menu.removeEventListener("click", hideMenu);
  }
}

validation(MQ767);

function hideShow() {
  if (menu.classList.contains("is-active")) {
    menu.classList.remove("is-active");
  } else {
    {
      menu.classList.add("is-active");
    }
  }
}

function hideMenu() {
  menu.classList.remove("is-active");
}
