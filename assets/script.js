// Mark JS as available so CSS can enable scroll-reveal animations
// (kept off by default so content stays visible if JS fails to load).
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", function () {
  // Close the mobile nav automatically after a link is clicked.
  var mobileNav = document.querySelector(".nav-mobile");
  if (mobileNav) {
    var links = mobileNav.querySelectorAll("a");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.removeAttribute("open");
      });
    });
  }

  // Fade/slide in elements marked ".reveal" as they enter the viewport.
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
});
