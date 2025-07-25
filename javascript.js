document.addEventListener("DOMContentLoaded", function () {
    console.log("Precognition website loaded!");

    // Scroll to top on page refresh
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 50);

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

    // Audio player: dynamic source switching with .mp3 and .m4a fallback
    const trackSelector = document.getElementById("track-selector");
    const audioControl = document.getElementById("audio-control");

    if (trackSelector && audioControl) {
        trackSelector.addEventListener("change", function () {
            const baseName = this.value.replace(/\.(mp3|m4a)$/i, "");

            audioControl.innerHTML = "";

            const mp3Source = document.createElement("source");
            mp3Source.src = `${baseName}.mp3`;
            mp3Source.type = "audio/mpeg";
            audioControl.appendChild(mp3Source);

            const m4aSource = document.createElement("source");
            m4aSource.src = `${baseName}.m4a`;
            m4aSource.type = "audio/mp4";
            audioControl.appendChild(m4aSource);

            audioControl.pause();
            audioControl.load();
            audioControl.play().catch(err => {
                console.warn("Autoplay might be blocked:", err);
            });
        });
    }

    // Fade-in animations for sections, images, and gallery
    const animatedElements = [
        ...document.querySelectorAll("section"),
        document.querySelector(".bio-image"),
        document.querySelector(".band-image"),
        document.querySelector("#gallery")
    ];

    animatedElements.forEach(el => {
        if (el) {
            el.style.opacity = "0";
            el.style.transition = "opacity 1.5s ease-in-out";
        }
    });

    const revealOnScroll = () => {
        animatedElements.forEach(el => {
            if (el) {
                const elTop = el.getBoundingClientRect().top;
                if (elTop < window.innerHeight - 100) {
                    el.style.opacity = "1";
                }
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger on load for visible elements
});
