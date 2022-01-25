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

// Profile DOM
const name = document.querySelector(".profile .title");
const job_role = document.querySelector(".profile .subtitle");
const social = document.querySelector(".profile .social");
const about_me = document.querySelector(".about-me");
const cv = document.querySelector(".cv");
const service = document.querySelector(".service-items");
const fun_fact = document.querySelector(".fuct-items");

// Resume DOM
const experience = document.querySelector(".experience");
const education = document.querySelector(".education");
const skills = document.querySelector(".skills-item");

// Contact DOM
const email = document.querySelector(".email");
const address = document.querySelectorAll(".address");
const freelance = document.querySelectorAll(".freelance");
const phone = document.querySelector(".phone");
const age = document.querySelector(".age");
const residence = document.querySelector(".residence");

(function () {
  /* PROFILE */
  fetch("http://vadhel-portfolio.herokuapp.com/profile")
    .then((res) => res.json())
    .then((data) => {
      //Basic Info
      name.innerHTML = data.basic_info.name;
      job_role.innerHTML = data.basic_info.job_role;
      about_me.innerHTML = data.basic_info.about_me;
      email.innerHTML = data.basic_info.email;
      address.forEach((item) => {
        item.innerHTML = data.basic_info.address;
      });
      freelance.forEach((item) => {
        if (data.basic_info.freelance) {
          item.innerHTML = "Available";
        } else {
          item.innerHTML = "Not Available";
        }
      });
      phone.innerHTML = data.basic_info.phone;
      age.innerHTML = data.basic_info.age;
      residence.innerHTML = data.basic_info.residence;

      // Social Media
      const markupSocial = data.social_media.map(
        (item) => `
      <a
        rel="noreferrer"
        target="_blank"
        href="${item.url}"
        ><span class="ion ${item.icon}"></span
      ></a>`
      );
      markupSocial.map((item) => (social.innerHTML += item));

      //CV
      cv.href = data.cv_url;

      //Services
      const markupService = data.my_services.map(
        (item) => `
      <div class="col col-d-6 col-t-6 col-m-12 border-line-h">
        <div class="service-item">
          <div class="icon">
            <span class="ion ${item.icon}"></span>
          </div>
          <div class="name">${item.title}</div>
          <p>
            ${item.description}
          </p>
        </div>
      </div>`
      );
      markupService.map((item) => (service.innerHTML += item));

      //Fun Fact
      const markupFunFact = data.fun_fact.map(
        (item) => `
      <div class="col col-d-3 col-t-3 col-m-6 border-line-v">
        <div class="fuct-item">
          <div class="icon">
            <span class="ion ${item.icon}"></span>
          </div>
          <div class="name">${item.title}</div>
        </div>
      </div>`
      );
      markupFunFact.map((item) => (fun_fact.innerHTML += item));

      //Theme DOM
      let dark;
      let light;

      // Photo Profile
      themeChanger.addEventListener("click", () => toggleTheme());

      function setTheme(themeName) {
        localStorage.setItem("theme", themeName);
        document.documentElement.className = themeName;
      }

      // function to toggle between light and dark theme
      function toggleTheme() {
        if (localStorage.getItem("theme") === "theme-dark") {
          setTheme("theme-light");
          light = document.querySelector(".theme-light");
          backProfile.innerHTML = `<img class="lazyload" data-src="${data.photo.bg_light.formats.small.url}" alt="" />`;
          theme.innerHTML = "Light";
          themeIcon.classList.remove("ion-ios-moon");
          themeIcon.classList.add("ion-android-sunny");
          profile.innerHTML = `<img class="lazyload" data-src="${data.photo.dp_light.formats.thumbnail.url}" alt="" />`;
          light.style.setProperty(
            "--color-theme",
            data.Theme_Color.light_primary_color
          );
          light.style.setProperty(
            "--secondary-color",
            data.Theme_Color.light_secondary_color
          );
          light.style.setProperty(
            "--third-color",
            data.Theme_Color.light_third_color
          );
        } else {
          setTheme("theme-dark");
          dark = document.querySelector(".theme-dark");
          backProfile.innerHTML = `<img class="lazyload" data-src="${data.photo.bg_dark.formats.small.url}" alt="" />`;
          theme.innerHTML = "Dark";
          themeIcon.classList.remove("ion-android-sunny");
          themeIcon.classList.add("ion-ios-moon");
          profile.innerHTML = `<img class="lazyload" data-src="${data.photo.dp_dark.formats.thumbnail.url}" alt="" />`;
          dark.style.setProperty(
            "--color-theme",
            data.Theme_Color.dark_primary_color
          );
          dark.style.setProperty(
            "--secondary-color",
            data.Theme_Color.dark_secondary_color
          );
          dark.style.setProperty(
            "--third-color",
            data.Theme_Color.dark_third_color
          );
        }
      }

      if (localStorage.getItem("theme") === "theme-light") {
        setTheme("theme-light");
        light = document.querySelector(".theme-light");
        backProfile.innerHTML = `<img class="lazyload" data-src="${data.photo.bg_light.formats.small.url}" alt="" />`;
        themeIcon.classList.add("ion-android-sunny");
        theme.innerHTML = "Light";
        profile.innerHTML = `<img class="lazyload" data-src="${data.photo.dp_light.formats.thumbnail.url}" alt="" />`;
        light.style.setProperty(
          "--color-theme",
          data.Theme_Color.light_primary_color
        );
        light.style.setProperty(
          "--secondary-color",
          data.Theme_Color.light_secondary_color
        );
        light.style.setProperty(
          "--third-color",
          data.Theme_Color.light_third_color
        );
      } else {
        setTheme("theme-dark");
        dark = document.querySelector(".theme-dark");
        backProfile.innerHTML = `<img class="lazyload" data-src="${data.photo.bg_dark.formats.small.url}" alt="" />`;
        themeIcon.classList.add("ion-ios-moon");
        theme.innerHTML = "Dark";
        profile.innerHTML = `<img class="lazyload" data-src="${data.photo.dp_dark.formats.thumbnail.url}" alt="" />`;
        dark.style.setProperty(
          "--color-theme",
          data.Theme_Color.dark_primary_color
        );
        dark.style.setProperty(
          "--secondary-color",
          data.Theme_Color.dark_secondary_color
        );
        dark.style.setProperty(
          "--third-color",
          data.Theme_Color.dark_third_color
        );
      }

      // Testimonies
      const markupTestimonies = data.testimonies.map((item) => {
        return `
        <div class="item">
          <div class="revs-item">
            <div class="text">
              ${item.description}
            </div>
            <div class="user">
              <div class="img">
                <img
                  class="lazyload"
                  data-src="${item.image.formats.thumbnail.url}"
                  alt=""
                />
              </div>
              <div class="info">
                <div class="name">${item.name}</div>
                <div class="company">${item.role}</div>
              </div>
            </div>
          </div>
        </div>
        `;
      });
      let markupT = "";
      markupTestimonies.forEach((item) => (markupT += item));
      testimoniesDOM.innerHTML = `
      <div class="revs-carousel default-revs">
        <div class="owl-carousel testimonies">
          ${markupT}
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
    })
    .catch((err) => console.log(err));

  /* RESUME */
  fetch("http://vadhel-portfolio.herokuapp.com/resume")
    .then((res) => res.json())
    .then((data) => {
      // Experience
      const markupExp = data.Experience.map(
        (item, index) => `
      <div class="resume-item border-line-h ${index === 0 && "active"}">
        <div class="date">${item.year}</div>
        <div class="name">${item.title}</div>
        <div class="company">${item.company}</div>
        <p>
          ${item.description}
        </p>
      </div>`
      );
      markupExp.map((item) => (experience.innerHTML += item));

      //Education
      const markupEdu = data.Education.map(
        (item) => `
      <div class="resume-item border-line-h ">
        <div class="date">${item.year}</div>
        <div class="name">${item.title}</div>
        <div class="company">${item.institution}</div>
        <p>
          ${item.description}
        </p>
      </div>`
      );
      markupEdu.map((item) => (education.innerHTML += item));

      //Skills
      const markupSkills = data.Skills.map((item) => {
        let style = "";
        switch (item.graph_style) {
          case "Bar":
            style = "";
            break;
          case "Dot":
            style = "dotted";
            break;
          case "Circle":
            style = "circles";
            break;
          case "Checklist":
            style = "list";
            break;
          default:
            style = "";
        }

        let markupSkillItem = "";

        const skillItem = item.skills_item.map(
          (skill) =>
            `<li ${
              style !== "circles" && style !== "list"
                ? `class="border-line-h"`
                : ""
            }>
              <div class="name">${skill.name}</div>
              ${
                style !== "list"
                  ? `<div class="progress p${skill.percentage_value}">
                ${
                  style !== "circles"
                    ? `<div class="percentage" style="width: ${skill.percentage_value}%;"></div>`
                    : `<span>${skill.percentage_value}%</span>`
                }
              </div>`
                  : ""
              }
            </li>`
        );

        skillItem.map((markup) => (markupSkillItem += markup));

        return `<div class="col col-d-6 col-t-6 col-m-12 border-line-v">
                  <div class="skills-list ${style}">
                    <div class="skill-title border-line-h">
                      <div class="icon"><i class="ion ${item.icon}"></i></div>
                      <div class="name">${item.name}</div>
                    </div>
                    <ul>
                      ${markupSkillItem}
                    </ul>
                  </div>
                </div>`;
      });

      markupSkills.map((item) => (skills.innerHTML += item));
    })
    .then(() => {
      /*Dotted Skills Line*/

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

      /*Circle Skills Line*/
      var skills_circles = $(".skills-list.circles .progress");
      if (skills_circles.length) {
        skills_circles.append(
          '<div class="slice"><div class="bar"></div><div class="fill"></div></div>'
        );
      }
    })
    .catch((err) => console.log(err));

  /* PROJECTS */
  fetch("http://vadhel-portfolio.herokuapp.com/projects")
    .then((response) => response.json())
    .then((data) => {
      let markup = data.map((project) => {
        let images = project.image.map((image) => {
          return `
            <div class="item">
              <a target="_blank" href="${image.url}">
                <img src="${image.url}" style="width:100%">
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
                      ${marked(project.description)}
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
    })
    .catch((err) => console.log(err));
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
