document.addEventListener("DOMContentLoaded", function () {
    console.log("Precognition website loaded!");

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
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

    // Audio Player Track Selection
    const trackSelector = document.getElementById("track-selector");
    const audioControl = document.getElementById("audio-control");
    const audioSource = document.getElementById("audio-source");

    if (trackSelector && audioControl && audioSource) {
        trackSelector.addEventListener("change", function () {
            const selectedTrack = trackSelector.value;
            audioSource.src = selectedTrack;
            audioControl.load();
            audioControl.play();
        });
    }

    // Fade-in effect for sections and bio image
    const fadeElements = [
        ...document.querySelectorAll("section"),
        document.querySelector(".bio-image")
    ];

    fadeElements.forEach(el => {
        if (el) {
            el.style.opacity = "0";
            el.style.transition = "opacity 1.5s ease-in-out";
        }
    });

    window.addEventListener("scroll", function () {
        fadeElements.forEach(el => {
            if (el) {
                const elTop = el.getBoundingClientRect().top;
                if (elTop < window.innerHeight - 100) {
                    el.style.opacity = "1";
                }
            }
        });
    });
});
