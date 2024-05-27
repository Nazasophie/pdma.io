(function($) {
    "use strict";
    $(window).on("elementor/frontend/init", function() {
        elementorFrontend.hooks.addAction("frontend/element_ready/bwdhsx-hero-style3.default", function() {
            $('.bwdhs_video_icon').magnificPopup({
                type: 'iframe'
            })
        })
    })
})(jQuery)