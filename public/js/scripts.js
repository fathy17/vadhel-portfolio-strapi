/*
	Preloader
*/

$(window).on("load", function () {
  var preload = $(".preloader");
  preload.find(".spinner").fadeOut(function () {
    preload.fadeOut();
  });
});

$(function () {
  "use strict";

  /*
		Vars
	*/

  var width = $(window).width();
  var height = $(window).height();

  /*
		Header Menu Desktop
	*/

  var container = $(".container");
  var card_items = $(".card-inner");
  var animation_in = container.data("animation-in");
  var animation_out = container.data("animation-out");

  $(".top-menu").on("click", "a", function () {
    /* vars */
    var width = $(window).width();
    var id = $(this).attr("href");
    var h = parseFloat($(id).offset().top);
    var card_item = $(id);
    var menu_items = $(".top-menu li");
    var menu_item = $(this).closest("li");
    var d_lnk = $(".lnks .lnk.discover");

    if (width >= 1024) {
      /* if desktop */
      if (
        !menu_item.hasClass("active") &
        (width > 1023) &
        $("#home-card").length
      ) {
        /* close card items */
        menu_items.removeClass("active");
        container.find(card_items).removeClass("animated " + animation_in);

        if ($(container).hasClass("opened")) {
          container.find(card_items).addClass("animated " + animation_out);
        }

        /* open card item */
        menu_item.addClass("active");
        container.addClass("opened");
        container.find(card_item).removeClass("animated " + animation_out);
        container.find(card_item).addClass("animated " + animation_in);

        $(card_items).addClass("hidden");

        $(card_item).removeClass("hidden");
        $(card_item).addClass("active");
      }
    }
    /* if mobile */
    if ((width < 1024) & $("#home-card").length) {
      /* scroll to section */
      $("body,html").animate(
        {
          scrollTop: h - 76,
        },
        800
      );
    }
    return false;
  });

  $(window).on("resize", function () {
    var width = $(window).width();
    var height = $(window).height();

    if (width < 1024) {
      $(".card-inner").removeClass("hidden");
      $(".card-inner").removeClass("fadeOutLeft");
      $(".card-inner").removeClass("rotateOutUpLeft");
      $(".card-inner").removeClass("rollOut");
      $(".card-inner").removeClass("jackOutTheBox");
      $(".card-inner").removeClass("fadeOut");
      $(".card-inner").removeClass("fadeOutUp");
      $(".card-inner").removeClass("animated");

      /* $(window).on("scroll", function () {
        var scrollPos = $(window).scrollTop();
        $(".top-menu ul li a").each(function () {
          var currLink = $(this);
          var refElement = $(currLink.attr("href"));
          if (refElement.offset().top - 76 <= scrollPos) {
            $(".top-menu ul li").removeClass("active");
            currLink.closest("li").addClass("active");
          }
        });
      }); */

      $(".card-inner .card-wrap").slimScroll({ destroy: true });
      $(".card-inner .card-wrap").attr("style", "");
    } else {
      $($(".top-menu li.active a").attr("href")).addClass("active");
      if (!$(".page").hasClass("new-skin") && width > 1024) {
        $(".card-inner .card-wrap").slimScroll({
          height: "570px",
        });
      }
    }
  });

  /*
		slimScroll
	*/

  if (!$(".page").hasClass("new-skin") && width > 1024) {
    $(".card-inner .card-wrap").slimScroll({
      height: "570px",
    });
  }

  /*
		Hire Button
	*/

  $(".lnks").on("click", ".lnk.discover", function () {
    $('.top-menu a[href="#contacts-card"]').trigger("click");
  });

  /*Tesimonials Carousel*/
  var revs_slider = $(".revs-carousel.default-revs .owl-carousel");

  revs_slider.owlCarousel({
    margin: 0,
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    loop: true,
    rewind: false,
    nav: false,
    dots: true,
  });

  /*
		New JS
	*/

  $(window).on("resize", function () {
    /*
			Dotted Skills Line On Resize Window
		*/

    var skills_dotted = $(".skills-list.dotted .progress");
    var skills_dotted_w = skills_dotted.width();
    if (skills_dotted.length) {
      skills_dotted.find(".percentage .da").css({ width: skills_dotted_w + 1 });
    }

    /*
			Testimonials Carousel On Resize Window
		*/

    var revs_slider = $(".revs-carousel .owl-carousel");
    revs_slider.find(".revs-item").css({ "max-width": revs_slider.width() });
  });

  /*
		Dotted Skills Line
	*/

  function skills() {
    var skills_dotted = $(".skills-list.dotted .progress");
    var skills_dotted_w = skills_dotted.width();
    if (skills_dotted.length) {
      skills_dotted.append(
        '<span class="dg"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>'
      );
      skills_dotted
        .find(".percentage")
        .append(
          '<span class="da"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>'
        );
      skills_dotted.find(".percentage .da").css({ width: skills_dotted_w });
    }
  }
  setTimeout(skills, 1000);

  /*
		Circle Skills Line
	*/

  var skills_circles = $(".skills-list.circles .progress");
  if (skills_circles.length) {
    skills_circles.append(
      '<div class="slice"><div class="bar"></div><div class="fill"></div></div>'
    );
  }

  /*
		Wrap First Title Word
	*/

  $(".content .title").each(function (index) {
    var title = $(this).text().split(" ");
    if (title.length > 1) {
      var firstWord = title[0];
      var replaceWord = '<span class="first-letter">' + firstWord + "</span>";
      var newString = $(this).html().replace(firstWord, replaceWord);
      $(this).html(newString);
    } else {
      $(this).html('<div class="first-letter">' + $(this).html() + "</div>");
    }
  });

  /* SEND EMAIL */

  /* Validate Contact Form */

  $("#cform").validate({
    ignore: ".ignore",
    rules: {
      name: {
        required: true,
      },
      message: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      hiddenRecaptcha: {
        required: function () {
          if (grecaptcha.getResponse() == "") {
            return true;
          } else {
            return false;
          }
        },
      },
    },
    success: "valid",
    submitHandler: function () {
      $.ajax({
        url: "/email",
        type: "post",
        dataType: "json",
        data:
          "name=" +
          $("#cform").find('input[name="name"]').val() +
          "&email=" +
          $("#cform").find('input[name="email"]').val() +
          "&message=" +
          $("#cform").find('textarea[name="message"]').val(),
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
          $("#cform").fadeOut();
          $(".alert-success").delay(1000).fadeIn();
        },
      });
    },
  });
});

// CHANGE THEME

const themeChanger = document.querySelector(".theme-changer");
const backProfile = document.querySelector(".slide");
const theme = document.querySelector(".theme-changer>a>.link");
const themeIcon = document.querySelector(".theme-changer>a>.icon");
const profile = document.querySelector(".profile>.image");

/* VIDEO CONTROL */

const video = document.querySelector("#video-item-1");
const closeModal = document.querySelector(".close-modal");

function pauseVideo() {
  video.pause();
}

/* FETCH DATA STRAPI */

const projectsDOM = document.querySelector(".projects");
const testimoniesDOM = document.querySelector(".testimonies");
const cv = document.querySelector(".cv");

(function () {
  /* PROJECTS */
  fetch("/projects")
    .then((response) => response.json())
    .then((data) => {
      let markup = data.map((project) => {
        let images = project.image.map((image) => {
          return `
            <div class="item">
              <a target="_blank" href="${image.formats.large.url}">
                <img src="${image.formats.small.url}" style="width:100%">
              </a>
            </div>`;
        });
        let test = "";
        images.forEach((item) => (test += item));
        return `<div
          class="col col-d-6 col-t-6 col-m-12 grid-item ${project.type.toLowerCase()} border-line-h"
        >
          <div class="box-item" onclick="modalHashtag()">
            <div class="image">
              <a href="#popup-${project.id}" class="has-popup-media">
                <img
                  src="${project.image[0].formats.thumbnail.url}"
                  alt=""
                />
                <span popup="slides-${project.id}" class="info">
                  <span class="ion ion-images"></span>
                </span>
              </a>
            </div>
            <div class="desc">
              <a popup="slides-${project.id}" href="#popup-${
          project.id
        }" class="name has-popup-media"
                >${project.name}</a
              >
              <div class="category">${project.type}</div>
            </div>
            <div id="popup-${project.id}" class="popup-box mfp-fade mfp-hide">
              <div class="content">
              <div class="owl-carousel revs-carousel slide-carousel">
  
                ${test}
              
              </div>
                <div class="desc">
                  <div class="post-box">
                    <h1>${project.name}</h1>
                    <div class="blog-detail">${project.type}</div>
                    <div class="blog-content">
                      ${project.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      });
      return markup;
    })
    .then((html) => html.forEach((item) => (projectsDOM.innerHTML += item)))
    .then(() => {
      /* Project Carousel */
      var revs_carousel = $(".content .owl-carousel");

      revs_carousel.owlCarousel({
        margin: 0,
        items: 1,
        autoplay: true,
        autoplayTimeout: 7000,
        autoplayHoverPause: true,
        loop: true,
        rewind: false,
        nav: true,
        dots: true,
        lazyLoad: true,
        autoHeight: true,
      });

      /*Initialize Portfolio*/
      var $container = $(".grid-items");
      $container.imagesLoaded(function () {
        $container.isotope({
          percentPosition: true,
          itemSelector: ".grid-item",
        });
      });

      /*Filter items on button click*/
      $(".filter-button-group").on("click", ".f_btn", function () {
        var filterValue = $(this).find("input").val();
        $container.isotope({ filter: "." + filterValue });
        $(".filter-button-group .f_btn").removeClass("active");
        $(this).addClass("active");
      });

      /*Media popup*/
      $(".has-popup-media").magnificPopup({
        type: "inline",
        overflowY: "auto",
        closeBtnInside: true,
        mainClass: "mfp-fade popup-box-inline",
      });

      /*Image popup*/
      $(".has-popup-image").magnificPopup({
        type: "image",
        closeOnContentClick: true,
        mainClass: "mfp-fade",
        image: {
          verticalFit: true,
        },
      });
    });

  /* TESTIMONIES */
  fetch("/testimonies")
    .then((res) => res.json())
    .then((data) => {
      let markup = data.map((testimony) => {
        return `
        <div class="item">
          <div class="revs-item">
            <div class="text">
              ${testimony.description}
            </div>
            <div class="user">
              <div class="img">
                <img
                  class="lazyload"
                  data-src="${testimony.image.formats.thumbnail.url}"
                  alt=""
                />
              </div>
              <div class="info">
                <div class="name">${testimony.name}</div>
                <div class="company">${testimony.role}</div>
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        `;
      });
      return markup;
    })
    .then((html) => {
      let markup = "";
      html.forEach((item) => (markup += item));
      testimoniesDOM.innerHTML = `
      <div class="revs-carousel default-revs">
        <div class="owl-carousel testimonies">
          ${markup}
        </div>
      </div>`;
    })
    .then(() => {
      var revs_slider = $(".revs-carousel.default-revs .owl-carousel");

      revs_slider.owlCarousel({
        margin: 0,
        items: 1,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        loop: true,
        rewind: false,
        nav: false,
        dots: true,
      });
    });

  /* UPLOAD CV */
  fetch("/cv")
    .then((res) => res.json())
    .then((data) => (cv.href = data.URL));

  /* PROFILE PHOTO */
  fetch("/photo-profile")
    .then((res) => res.json())
    .then((data) => {
      themeChanger.addEventListener("click", () => toggleTheme());

      function setTheme(themeName) {
        localStorage.setItem("theme", themeName);
        document.documentElement.className = themeName;
      }

      // function to toggle between light and dark theme
      function toggleTheme() {
        if (localStorage.getItem("theme") === "theme-dark") {
          setTheme("theme-light");
          backProfile.innerHTML = `<img class="lazyload" data-src="${data.bg_light.formats.small.url}" alt="" />`;
          theme.innerHTML = "Light";
          themeIcon.classList.remove("ion-ios-moon");
          themeIcon.classList.add("ion-android-sunny");
          profile.innerHTML = `<img class="lazyload" data-src="${data.dp_light.formats.thumbnail.url}" alt="" />`;
        } else {
          setTheme("theme-dark");
          backProfile.innerHTML = `<img class="lazyload" data-src="${data.bg_dark.formats.small.url}" alt="" />`;
          theme.innerHTML = "Dark";
          themeIcon.classList.remove("ion-android-sunny");
          themeIcon.classList.add("ion-ios-moon");
          profile.innerHTML = `<img class="lazyload" data-src="${data.dp_light.formats.thumbnail.url}" alt="" />`;
        }
      }

      if (localStorage.getItem("theme") === "theme-light") {
        setTheme("theme-light");
        backProfile.innerHTML = `<img class="lazyload" data-src="${data.bg_light.formats.small.url}" alt="" />`;
        themeIcon.classList.add("ion-android-sunny");
        theme.innerHTML = "Light";
        profile.innerHTML = `<img class="lazyload" data-src="${data.dp_light.formats.thumbnail.url}" alt="" />`;
      } else {
        setTheme("theme-dark");
        backProfile.innerHTML = `<img class="lazyload" data-src="${data.bg_dark.formats.small.url}" alt="" />`;
        themeIcon.classList.add("ion-ios-moon");
        theme.innerHTML = "Dark";
        profile.innerHTML = `<img class="lazyload" data-src="${data.dp_light.formats.thumbnail.url}" alt="" />`;
      }
    });
})();

const closeButton = document.querySelector(".mfp-close");

function modalHashtag() {
  window.location.hash = "#modal";
}

window.onhashchange = function () {
  if (window.location.hash === "") {
    $.magnificPopup.close();
  }
};
