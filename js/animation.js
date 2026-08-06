/*==========================================
        HEALIX HOSPITAL ANIMATION ENGINE
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px"

    });

    document.querySelectorAll(

        ".fade-up, .fade-down, .fade-left, .fade-right, .zoom-in"

    ).forEach(el => observer.observe(el));

});