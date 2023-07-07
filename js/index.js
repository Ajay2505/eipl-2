gsap.registerPlugin(ScrollTrigger);
const lineWrappers = document.querySelectorAll(".line_wrapper");

const observer = new IntersectionObserver(playAnimation);
const animations = [];

const animationConfigurations = [
  {
    elementId: "lottie-animation",
    jsonPath: "assets/json-files/pol-tank.json",
  },
  {
    elementId: "lottie-animation-2",
    jsonPath: "assets/json-files/globe-animation.json",
  },
  {
    elementId: "lottie-animation-3",
    jsonPath: "assets/json-files/petrolium-tank.json",
  },
];

animationConfigurations.forEach((config) => {
  const element = document.querySelector(`#${config.elementId}`);
  const animation = lottie.loadAnimation({
    container: element,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: config.jsonPath,
  });
  animations.push({ element, animation });
});
      
function playAnimation(entries, observer) {
  entries.forEach((entry) => {
    animations.forEach((anim) => {
      if (entry.target === anim.element) {
        if (entry.isIntersecting) {
          anim.animation.play();
        } else {
          anim.animation.pause();
        }
      }
    });
  });
}

// Observe all elements with animations
animations.forEach((anim) => {
  observer.observe(anim.element);
});

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


gsap.fromTo(".first_sec_img", {
  clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"
}, {
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  duration: .5, 
  stagger: .1,
  delay: .5,
  ease: "power2.out",
});

document.querySelector(".site-menu-overlay").addEventListener("click", (evt) => {
  setTimeout(() => {
    evt.target.style.display = "none";
  }, 300);
  evt.target.classList.remove("active");
  document.querySelector("body").classList.remove("lock-scroll", "menu-open");
  document.querySelector(".js-toggle-menu").classList.remove("active");
});

// document.querySelector(".toggle-menu").addEventListener("click", (e) => e.stopPropagation())