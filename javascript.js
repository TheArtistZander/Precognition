document.addEventListener("DOMContentLoaded", () => {
  console.log("Precognition website loaded!");

  scrollToTopOnRefresh();
  enableSmoothScroll();
  setupAudioSwitching();
  setupFadeInAnimations();

  const target = document.getElementById("typewriter");
  const message = "Precognition";
  typeWriter(target, message, 75);
});

/* 🔝 Scroll to top on refresh */
function scrollToTopOnRefresh() {
  setTimeout(() => window.scrollTo(0, 0), 50);
}

/* 🎯 Smooth scroll for nav links */
function enableSmoothScroll() {
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const scrollOffset = window.innerWidth < 500 ? 30 : 50;
        window.scrollTo({
          top: targetElement.offsetTop - scrollOffset,
          behavior: "smooth"
        });
      }
    });
  });
}

/* 🎧 Dynamic audio player source switching */
function setupAudioSwitching() {
  const trackSelector = document.getElementById("track-selector");
  const audioControl = document.getElementById("audio-control");

  if (trackSelector && audioControl) {
    trackSelector.addEventListener("change", () => {
      const baseName = trackSelector.value.replace(/\.(mp3|m4a)$/i, "");
      audioControl.innerHTML = "";

      ["mp3", "m4a"].forEach(ext => {
        const source = document.createElement("source");
        source.src = `${baseName}.${ext}`;
        source.type = ext === "mp3" ? "audio/mpeg" : "audio/mp4";
        audioControl.appendChild(source);
      });

      audioControl.pause();
      audioControl.load();
      audioControl.play().catch(err => {
        console.warn("Autoplay might be blocked:", err);
      });
    });
  }
}

/* 🌘 Fade-in effects on scroll */
function setupFadeInAnimations() {
  const animatedElements = [
    ...document.querySelectorAll("section"),
    document.querySelector(".bio-image"),
    document.querySelector(".band-image"),
    document.querySelector("#gallery")
  ].filter(Boolean);

  animatedElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transition = "opacity 1.5s ease-in-out";
  });

  const revealOnScroll = () => {
    animatedElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < window.innerHeight - 100) {
        el.style.opacity = "1";
      }
    });
  };

  window.addEventListener("scroll", debounce(revealOnScroll));
  revealOnScroll();
}

/* ⏳ Debounce scroll for performance */
function debounce(func, delay = 10) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
}

/* 🖋 Typewriter effect */
function typeWriter(element, text, speed = 60, callback) {
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }

  element.textContent = "";
  type();
}
