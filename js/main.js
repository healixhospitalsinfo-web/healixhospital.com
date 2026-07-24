(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Price carousel
    $(".price-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // Team carousel
    $(".team-carousel, .related-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });


    // Testimonials carousel
    var $testimonialCarousel = $(".testimonial-carousel");
    var testimonialApiUrl = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

    function buildTestimonialSlide(name, rating, message) {
        var stars = '';
        for (var i = 1; i <= 5; i++) {
            stars += '<i class="fas fa-star text-warning me-1' + (i <= rating ? '' : ' text-secondary') + '"></i>';
        }

        var newSlide = $(
            '<div class="testimonial-item">' +
            '  <h3 class="mt-2"></h3>' +
            '  <div class="mb-3 testimonial-stars"></div>' +
            '  <p></p>' +
            '</div>'
        );

        newSlide.find('.testimonial-stars').html(stars);
        newSlide.find('p').text(message);
        newSlide.find('h3').text(name);

        return newSlide;
    }

    function syncTestimonialPlaceholder() {
        var hasReviews = $testimonialCarousel.find('.testimonial-item').length > 0;
        $('.testimonial-placeholder').toggle(!hasReviews);
    }

    function loadTestimonials() {
        if (!testimonialApiUrl || testimonialApiUrl.indexOf('PASTE_') !== -1) {
            return Promise.resolve([]);
        }

        return fetch(testimonialApiUrl)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Unable to load testimonials.');
                }
                return response.json();
            })
            .then(function (data) {
                return Array.isArray(data.reviews) ? data.reviews : [];
            })
            .catch(function () {
                return [];
            });
    }

    $testimonialCarousel.owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: true,
        loop: true,
        items: 2,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            }
        }
    });

    loadTestimonials().then(function (savedTestimonials) {
        $.each(savedTestimonials, function (index, testimonial) {
            var slide = buildTestimonialSlide(testimonial.name, testimonial.rating, testimonial.message);
            $testimonialCarousel.trigger('add.owl.carousel', [slide, 0]).trigger('refresh.owl.carousel');
        });
        syncTestimonialPlaceholder();
    });

    $("#testimonialForm").on("submit", function (e) {
        e.preventDefault();

        var name = $.trim($("#testimonialName").val());
        var rating = $.trim($("#testimonialRating").val());
        var message = $.trim($("#testimonialMessage").val());

        if (!name || !rating || !message) {
            return;
        }

        var parsedRating = parseInt(rating, 10);

        fetch(testimonialApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                rating: parsedRating,
                message: message
            })
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Unable to submit testimonial.');
            }
            return response.json();
        })
        .then(function () {
            var newSlide = buildTestimonialSlide(name, parsedRating, message);
            $testimonialCarousel.trigger('add.owl.carousel', [newSlide, 0]).trigger('refresh.owl.carousel');
            syncTestimonialPlaceholder();
            $testimonialCarousel.trigger('to.owl.carousel', [0, 300]);
            this.reset();
        }.bind(this))
        .catch(function () {
            alert('Review could not be submitted. Please update the Apps Script URL in main.js.');
        });
    });

    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });
    
})(jQuery);

