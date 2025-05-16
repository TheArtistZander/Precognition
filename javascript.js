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
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Audio Player Track Selection
    const trackSelector = document.getElementById("track-selector");
    const audioControl = document.getElementById("audio-control");
    const audioSource = document.getElementById("audio-source");

    trackSelector.addEventListener("change", function () {
        const selectedTrack = trackSelector.value;
        audioSource.src = selectedTrack;
        audioControl.load(); // Refresh player to apply the new source
        audioControl.play(); // Start playing automatically
    });

    // Fade-in effect for sections
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transition = "opacity 1.5s ease-in-out";
    });

    window.addEventListener("scroll", function () {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.style.opacity = "1";
            }
        });
    });
});
