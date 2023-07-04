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
  // Add more animation configurations as needed
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
