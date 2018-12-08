const slides = document.querySelectorAll(".slider-content");
const menuBtn = document.querySelector(".button-container");
const collapseNav = document.querySelector(".menu");
const pageNav = document.querySelectorAll(".navigator.dot");

function onScroll(e) {
  e.preventDefault();

  if (e.wheelDelta < 0) {
    if (e.target.nextElementSibling != null) {
      e.target.classList.add("prev");
      e.target.classList.remove("current");
      e.target.nextElementSibling.classList.add("current");
      e.target.nextElementSibling.classList.remove("next");
      let nesID = e.target.nextElementSibling.getAttribute("id");
      pageNav.forEach(item =>
        item.getAttribute("data-key") === nesID
          ? item.classList.add("selected")
          : item.classList.remove("selected")
      );
      if (e.target.nextElementSibling.nextElementSibling === null) {
        document.getElementById("footerWrapper").classList.add("last-slide");
        document.getElementById("footerNav").classList.add("last-slide");
        document.getElementById("arrowIcon").classList.add("last-slide");
      }
    }
  } else {
    if (e.target.previousElementSibling != null) {
      e.target.classList.add("next");
      e.target.classList.remove("current");
      e.target.previousElementSibling.classList.add("current");
      e.target.previousElementSibling.classList.remove("prev");
      document.getElementById("footerWrapper").classList.remove("last-slide");
      document.getElementById("footerNav").classList.remove("last-slide");
      document.getElementById("arrowIcon").classList.remove("last-slide");
      let pesID = e.target.previousElementSibling.getAttribute("id");
      pageNav.forEach(item =>
        item.getAttribute("data-key") === pesID
          ? item.classList.add("selected")
          : item.classList.remove("selected")
      );
    }
  }
}

function navMenu() {
  menuBtn.classList.contains("active")
    ? (menuBtn.classList.remove("active"), collapseNav.classList.remove("open"))
    : (menuBtn.classList.add("active"), collapseNav.classList.add("open"));
}

function clickNav(e) {
  let key = e.target.getAttribute("data-key");

  slides.forEach(slide => {
    if (slide.id === key) {
      e.target.classList.add("selected");
      slide.classList.add("current");
      slide.classList.remove("next");
      slide.classList.remove("prev");
      slide.nextElementSibling != null
        ? (slide.nextElementSibling.classList.add("next"),
          slide.nextElementSibling.classList.remove("current"),
          document
            .getElementById("footerWrapper")
            .classList.remove("last-slide"),
          document.getElementById("arrowIcon").classList.remove("last-slide"),
          document.getElementById("footerNav").classList.remove("last-slide"))
        : (document.getElementById("footerWrapper").classList.add("last-slide"),
          document.getElementById("arrowIcon").classList.add("last-slide"),
          document.getElementById("footerNav").classList.add("last-slide"));

      if (slide.previousElementSibling) {
        slide.previousElementSibling.classList.add("prev");
        slide.previousElementSibling.classList.remove("current");
      }
    } else {
      slide.classList.remove("current");
      pageNav.forEach(dot => {
        if (dot.getAttribute("data-key") === slide.id) {
          dot.classList.remove("selected");
        }
      });
    }
  });
}

window.addEventListener("wheel", onScroll);
menuBtn.addEventListener("click", navMenu);
pageNav.forEach(item => item.addEventListener("click", clickNav));
