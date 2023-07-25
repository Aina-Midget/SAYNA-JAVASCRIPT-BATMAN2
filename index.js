function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);
//
//
//
const HDS = function (el = null, options = {}) {
  class slider {
    constructor(options) {
      this.delay = 0; // delay in ms to begin the timer
      this.speed = 5000; // time in ms 'till next slide
      this.transition = 600; // time in ms for animation speed
      this.pagination = true;
      this.navigation = true;

      for (const k in options) {
        this[k] = options[k];
      }

      this.delay = parseInt(this.delay);
      this.speed = parseInt(this.speed);
      this.transition = parseInt(this.transition);
    }
  }

  const $ = {
    VARS: {
      slider: null,
      slides: null,
      options: {},
      timer: null,
      pagination: null,
    },
    init: async function () {
      if (el === null) {
        console.error("pas de quotes");
        return;
      }
      $.VARS.slider = document.querySelector(el);
      $.VARS.options = new slider(options);

      await $.create();
    },
    create: async function () {
      const slides = document.createElement("div");
      slides.classList.add("hds_slides_container");

      const content = $.VARS.slider.innerHTML;
      slides.innerHTML = content;
      $.VARS.slider.innerHTML = "";
      $.VARS.slider.append(slides);
      $.VARS.slider.classList.add("hds_slider");

      $.VARS.slides = $.VARS.slider.getElementsByClassName(
        "hds_slides_container"
      )[0].children;
      for (let i = 0; i < $.VARS.slides.length; i++) {
        $.VARS.slides[i].classList.add("hds_slide");
      }

      $.VARS.slider.style.setProperty(
        "--slide-transition-speed",
        $.VARS.options.transition + "ms"
      );

      if ($.VARS.options.navigation === true) {
        $.navigation();
      }

      if ($.VARS.options.pagination === true) {
        $.pagination();
      }

      $.setActive($.VARS.slides[0]);
      setTimeout($.start, $.VARS.options.delay);
    },
    setActive: function (slide) {
      for (let i = 0; i < $.VARS.slides.length; i++) {
        $.VARS.slides[i].classList.remove("hds_slide_active");
      }
      slide.classList.add("hds_slide_active");

      if ($.VARS.options.pagination === true) {
        let index = 0;
        for (let i = 0; i < $.VARS.slides.length; i++) {
          if ($.VARS.slides[i].classList.contains("hds_slide_active")) {
            index = i;
            break;
          }
        }

        for (let i = 0; i < $.VARS.pagination.length; i++) {
          $.VARS.pagination[i].classList.remove("hds_pagination_item_active");
        }
        $.VARS.pagination[index].classList.add("hds_pagination_item_active");
      }
    },
    start: function () {
      $.VARS.timer = setInterval($.next, $.VARS.options.speed);
    },
    next: function () {
      clearInterval($.VARS.timer);
      const active =
        $.VARS.slider.getElementsByClassName("hds_slide_active")[0];
      if (active.nextElementSibling === null) {
        $.setActive($.VARS.slides[0]);
      } else {
        $.setActive(active.nextElementSibling);
      }
      $.start();
    },
    prev: function () {
      clearInterval($.VARS.timer);

      const active =
        $.VARS.slider.getElementsByClassName("hds_slide_active")[0];
      if (active.previousElementSibling === null) {
        $.setActive($.VARS.slides[$.VARS.slides.length - 1]);
      } else {
        $.setActive(active.previousElementSibling);
      }

      $.start();
    },
    navigation: function () {
      const nav = `<div class = "hds_nav_item hds_prev"><</div><div class = "hds_nav_item hds_next">></div>`;
    },
    pagination: function () {
      let html = '<div class = "hds_pagination">';
      for (let i = 0; i < $.VARS.slides.length; i++) {
        html += `<div class = "hds_pagination_item"></div>`;
      }
      html += "</div>";

      $.VARS.slider.insertAdjacentHTML("beforeend", html);
      $.VARS.pagination = $.VARS.slider.getElementsByClassName(
        "hds_pagination_item"
      );

      for (let i = 0; i < $.VARS.pagination.length; i++) {
        $.VARS.pagination[i].addEventListener("click", function () {
          if (this.classList.contains("hds_pagination_item_active")) {
            return;
          }
          let index = 0;
          for (let i = 0; i < $.VARS.pagination.length; i++) {
            if ($.VARS.pagination[i] === this) {
              index = i;
              break;
            }
          }
          $.setActive($.VARS.slides[index]);
        });
      }
    },
  };

  $.init(el, options);
};
// carousel img
var timeInterval = "3000"; // Time between slides
var carousel = document.querySelector("#slides-items");
var items = document.querySelectorAll(".slide-item");

if (
  carousel !== undefined &&
  items !== undefined &&
  carousel !== null &&
  items !== null
) {
  var itemscount = items.length;
  var btnprev = document.querySelector(".slides-prev");
  var btnnext = document.querySelector(".slides-next");
  var btnplaypause = document.querySelector(".slides-playpause");
  var btnplaypausepath = document.querySelector(".playpause");

  if (itemscount > 1) {
    // Create Dots
    var dotbox = document.createElement("div");
    dotbox.classList.add("slides-dots");
    // carousel.after(dotbox); Not supported by Edge => see next line
    carousel.parentNode.insertBefore(dotbox, carousel.nextSibling);
    for (var i = 0; i < itemscount; i++) {
      dotbox.insertAdjacentHTML(
        "beforeend",
        '<button aria-controls="slide-' +
          (i + 1) +
          '" aria-label="Slide number ' +
          (i + 1) +
          '" aria-selected="' +
          (document
            .querySelector(".slideactive")
            .getAttribute("id")
            .slice(-1) ==
          i + 1
            ? "true"
            : "false") +
          '"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32" role="img"><circle cx="16" cy="16" r="13" /></svg></button>'
      );
    }

    var dots = document.querySelectorAll(".slides-dots button");
    var playpause = null;

    function slideprev() {
      var itemcurrent = document.querySelector(".slideactive");
      var dotcurrent = document.querySelector(
        '.slides-dots button[aria-selected="true"]'
      );
      var prevslide = itemcurrent.previousElementSibling;
      var prevdot = dotcurrent.previousElementSibling;
      if (prevslide === null) {
        prevslide = items[itemscount - 1];
        prevdot = dots[itemscount - 1];
      }
      // Remove current
      itemcurrent.classList.remove("slideactive");
      dotcurrent.setAttribute("aria-selected", "false");

      // Add Next
      prevslide.classList.add("slideactive");
      prevdot.setAttribute("aria-selected", "true");
    }

    function slidenext() {
      var itemcurrent = document.querySelector(".slideactive");
      var dotcurrent = document.querySelector(
        '.slides-dots button[aria-selected="true"]'
      );
      var nextslide = itemcurrent.nextElementSibling;
      var nextdot = dotcurrent.nextElementSibling;
      if (nextslide === null) {
        nextslide = items[0];
        nextdot = dots[0];
      }
      // Remove current
      itemcurrent.classList.remove("slideactive");
      dotcurrent.setAttribute("aria-selected", "false");

      // Add Next
      nextslide.classList.add("slideactive");
      nextdot.setAttribute("aria-selected", "true");
    }

    function slidepause() {
      clearInterval(playpause);
      playpause = null;
      btnplaypause.setAttribute("aria-label", "Play Carousel");
      btnplaypausepath.classList.add("paused");
      carousel.setAttribute("aria-live", "polite");
    }
    function slideplay() {
      playpause = setInterval(slidenext, timeInterval);
      btnplaypause.setAttribute("aria-label", "Stop Carousel");
      btnplaypausepath.classList.remove("paused");
      carousel.removeAttribute("aria-live");
    }
    function slideplaypause() {
      if (playpause !== null) {
        slidepause();
        carousel.classList.add("btnpressed");
      } else {
        slideplay();
        carousel.classList.remove("btnpressed");
      }
    }

    // Dots Navigate
    [].map.call(
      dots,
      function (dot) {
        dot.addEventListener(
          "click",
          function (e) {
            var itemcurrent = document.querySelector(".slideactive");
            var dotcurrent = document.querySelector(
              '.slides-dots button[aria-selected="true"]'
            );
            var dotclick = dot.getAttribute("aria-controls");
            var targetslide = document.querySelector("#" + dotclick + "");
            var targetdot = document.querySelector(
              'button[aria-controls="' + dotclick + '"]'
            );

            // Remove current
            itemcurrent.classList.remove("slideactive");
            dotcurrent.setAttribute("aria-selected", "false");

            // Add Target
            targetslide.classList.add("slideactive");
            targetdot.setAttribute("aria-selected", "true");

            e.preventDefault();
          },
          false
        );
      },
      false
    );

    // Navigate
    btnprev.addEventListener("click", slideprev);
    btnnext.addEventListener("click", slidenext);
    btnplaypause.addEventListener("click", slideplaypause);

    // Keyboard Navigate
    carousel.addEventListener("keydown", keyHandler);
    function keyHandler(e) {
      // Left Arrow
      if (e.keyCode === 37 || (e.ctrlKey && e.keyCode === 37)) {
        e.preventDefault();
        slideprev();
      }
      // Right Arrow
      if (e.keyCode === 39 || (e.ctrlKey && e.keyCode === 39)) {
        e.preventDefault();
        slidenext();
      }
      // Space
      if (e.keyCode === 32) {
        e.preventDefault();
        slideplaypause();
      }
    }

    // Animate Slides
    playpause = setInterval(slidenext, timeInterval);

    // Stop Carousel on keyboard/mouse focus only when Carousel auto-rotating
    function slidefocusstop() {
      if (!carousel.classList.contains("btnpressed")) {
        slidepause();
      }
    }
    function slidefocusplay() {
      if (!carousel.classList.contains("btnpressed")) {
        slideplay();
      }
    }
    carousel.addEventListener("focusin", slidefocusstop);
    carousel.addEventListener("focusout", slidefocusplay);
    carousel.addEventListener("mouseover", slidefocusstop);
    carousel.addEventListener("mouseout", slidefocusplay);
  } else {
    // End itemscount > 1 => Remove buttons controls
    btnprev.parentNode.removeChild(btnprev);
    btnnext.parentNode.removeChild(btnnext);
    btnplaypause.parentNode.removeChild(btnplaypause);
  }
} // End if test
