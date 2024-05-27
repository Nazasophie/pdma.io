(function($) {
    $(window).on('load', function() {
        $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: !0,
            layoutMode: 'masonry'
        })
    });
    $(function() {
        $('.navbar-collapse').removeClass('collapsing').addClass('collapse in');
        let btSlider1 = $(".bt-slide-1");
        if (btSlider1.length) {
            btSlider1.each(function() {
                $(this).owlCarousel({
                    dots: !0,
                    nav: !0,
                    autoplay: !0,
                    navText: ['<i class="icofont-thin-left"></i>', '<i class="icofont-thin-right"></i>'],
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 1
                        },
                        991: {
                            items: 1
                        }
                    }
                })
            })
        }
        var action = !1,
            clicked = !1;
        var Owl = {
            init: function() {
                Owl.carousel()
            },
            carousel: function() {
                var owl;
                $(document).ready(function() {
                    owl = $('.btImageDots').owlCarousel({
                        items: 1,
                        center: !0,
                        dots: !0,
                        loop: !0,
                        dotsContainer: '.image-dots',
                        navText: ['prev', 'next'],
                    });
                    $('.image-dots-wrap').on('click', 'li', function(e) {
                        owl.trigger('to.owl.carousel', [$(this).index(), 300])
                    })
                })
            }
        };
        Owl.init();
        let btSlider2 = $(".bt-slide-2");
        if (btSlider2.length) {
            btSlider2.each(function() {
                $(this).owlCarousel({
                    dots: !1,
                    nav: !0,
                    autoplay: !0,
                    navText: ["<i class='icofont-thin-left'></i>", "<i class='icofont-thin-right'></i>"],
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 2
                        },
                        991: {
                            items: 3
                        }
                    }
                })
            })
        }
        var showChar = frontend_object.trimcharacter;
        var ellipsestext = "...";
        var moretext = frontend_object.show_more;
        var lesstext = frontend_object.show_less;
        $('.biz-review-more').each(function() {
            var content = $(this).html();
            if (content.length > showChar) {
                var c = content.substr(0, showChar);
                var h = content.substr(showChar, content.length - showChar);
                var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
                $(this).html(html)
            }
        });
        $(".morelink").click(function() {
            if ($(this).hasClass("less")) {
                $(this).removeClass("less");
                $(this).html(moretext)
            } else {
                $(this).addClass("less");
                $(this).html(lesstext)
            }
            $(this).parent().prev().toggle();
            $(this).prev().toggle();
            return !1
        })
    })
})(jQuery)