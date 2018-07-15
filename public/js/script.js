$(function () {
    // activate tooltip
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
    // simple date
    $('.simple-date').each((idx, e) => {
        var date = new Date(e.innerHTML);
        e.innerHTML = date.toDateString();
    });
    // home carousel
    $('.slick-carousel').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    // product carousel
    $('.product-slide').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slide-nav',
        adaptiveHeight: true
    });
    $('.slide-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.product-slide',
        centerMode: true,
        focusOnSelect: true
    });
});

function onLogout(){
    localStorage.clear();
}