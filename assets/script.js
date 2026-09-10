document.addEventListener("DOMContentLoaded", function () {
  var mobileNav = document.querySelector(".nav-mobile");
  if (!mobileNav) return;

  var links = mobileNav.querySelectorAll("a");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      mobileNav.removeAttribute("open");
    });
  });
});
