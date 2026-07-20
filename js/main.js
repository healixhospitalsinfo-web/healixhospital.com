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
        var profession = $.trim($("#testimonialProfession").val());
        var message = $.trim($("#testimonialMessage").val());

        if (!name || !profession || !message) {
            return;
        }

        var newSlide = $(
            '<div class="testimonial-item text-center">' +
            '  <div class="position-relative mb-5">' +
            '    <img class="img-fluid rounded-circle mx-auto" src="img/user.jpg" alt="">' +
            '    <div class="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle" style="width: 60px; height: 60px;">' +
            '      <i class="fa fa-quote-left fa-2x text-primary"></i>' +
            '    </div>' +
            '  </div>' +
            '  <p class="fs-4 fw-normal"></p>' +
            '  <hr class="w-25 mx-auto">' +
            '  <h3></h3>' +
            '  <h6 class="fw-normal text-primary mb-3"></h6>' +
            '</div>'
        );

        newSlide.find('p').text(message);
        newSlide.find('h3').text(name);
        newSlide.find('h6').text(profession);

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

