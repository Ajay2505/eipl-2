// gsap.to(".wrapper_pent", {
//     top: "-10%",
//     scrollTrigger: {
//       trigger: ".p_img_wrapper",
//       start: "top 70%",
//       end: "bottom 20%",
//       scrub: .7,
//     //   markers: true,
//     },
//   });

var swiper = new Swiper(".mySwiper", {
  loop: true,
  pagination: {
    el: ".swiper_pagination",
    clickable: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  slidesPerView: 2,
  spaceBetween: 40,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const lineWrappers = document.querySelectorAll(".line_wrapper");


lineWrappers.forEach(line => {
  gsap.to(line.querySelector(".line_anime"), {
    width: "250px",
    scrollTrigger: {
      trigger: line,  
      start: "top 70%",
      end: "center 20%",
      scrub: true,
      // markers: true,
    },
  });
});