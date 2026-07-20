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
    $testimonialCarousel.owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });

    $("#testimonialForm").on("submit", function (e) {
        e.preventDefault();

        var name = $.trim($("#testimonialName").val());
        var rating = $.trim($("#testimonialRating").val());
        var message = $.trim($("#testimonialMessage").val());

        if (!name || !rating || !message) {
            return;
        }

        var stars = '';
        for (var i = 1; i <= 5; i++) {
            stars += '<i class="fas fa-star text-warning me-1' + (i <= rating ? '' : ' text-secondary') + '"></i>';
        }

        var newSlide = $(
            '<div class="testimonial-item text-center">' +
            '  <div class="mb-4 testimonial-stars"></div>' +
            '  <p class="fs-4 fw-normal"></p>' +
            '  <hr class="w-25 mx-auto">' +
            '  <h3 class="mt-3"></h3>' +
            '</div>'
        );

        newSlide.find('.testimonial-stars').html(stars);
        newSlide.find('p').text(message);
        newSlide.find('h3').text(name);

        $testimonialCarousel.trigger('add.owl.carousel', [newSlide, 0]).trigger('refresh.owl.carousel');
        $testimonialCarousel.trigger('to.owl.carousel', [0, 300]);
        $(this).trigger('reset');
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

