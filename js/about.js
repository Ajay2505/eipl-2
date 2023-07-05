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
    slidesPerView: 2,
    spaceBetween: 40,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});