Element.prototype.isNodeList = function() {
    return !1
};
NodeList.prototype.isNodeList = HTMLCollection.prototype.isNodeList = function() {
    return !0
};
if (void 0 === Trustindex) var Trustindex = function() {
    return {
        loaded_css: [],
        resizerTimeoutPointer: null,
        script: document.currentScript,
        activePopups: [],
        getDefaultAvatarUrl: function() {
            let a = Math.floor(10 * Math.random()) + 1;
            return Trustindex.getCDNUrl() + "assets/default-avatar/noprofile-" + (10 > a ? "0" : "") + a + ".svg"
        },
        getWidgetUrl: function(a) {
            return "undefined" === typeof a ? !1 : Trustindex.getCDNUrl() + "widgets/" + a.substring(0, 2) + "/" + a + "/"
        },
        init: function() {
            if (document.body) {
                var a = document.querySelectorAll(Trustindex.getScriptSelector("loader"));
                for (let c = 0; c < a.length; c++) {
                    let e = "src";
                    a[c].getAttribute("data-src") && (e = "data-src");
                    let d = a[c],
                        f = a[c].getAttribute(e).split("?");
                    if (2 > f.length) continue;
                    f = f[f.length - 1].split("&")[0];
                    if (!f || -1 !== f.search("=")) continue;
                    if (d.getAttribute("data-ti-loaded")) continue;
                    if (d.closest("head")) continue;
                    let g = document.createElement("div");
                    d.setAttribute("data-ti-loaded", !0);
                    let h = new XMLHttpRequest;
                    h.open("GET", Trustindex.getWidgetUrl(f) + "content.html");
                    h.send();
                    h.onload = function() {
                        if (4 === h.readyState && 200 ===
                            h.status)
                            if (d.after(g), h.responseText) {
                                var k = h.responseText; - 1 !== location.href.indexOf(Trustindex.getCDNUrl() + "amp-widget") && (k = k.replace(/<img/g, '<img crossorigin="anonymus"'));
                                k = Trustindex.createElementFromHTML(k);
                                var l = k[0];
                                l.setAttribute("data-no-translation", !0); - 1 !== [17, 21, 52, 53].indexOf(parseInt(l.getAttribute("data-layout-id"))) && document.body.appendChild(g);
                                g.replaceWith(l);
                                for (let n = 0; n < k.length; n++) k[n].innerHTML && l.after(k[n]);
                                Trustindex.init_widget(l);
                                if (!l.getAttribute("style") || -1 ===
                                    l.getAttribute("style").indexOf("border: 4px dashed red")) {
                                    l.style.display = "none";
                                    if (!l.layout_id) return l.innerHTML = "Layout id not found!";
                                    if (!l.container) return l.innerHTML = "Container id not found!";
                                    k = null;
                                    l.set_id && (k = Trustindex.getCDNUrl() + "assets/widget-presetted-css/" + l.layout_id + "-" + l.set_id + ".css");
                                    k && -1 === Trustindex.loaded_css.indexOf(k) ? (Trustindex.addCSS(k, function() {
                                        l.style.display = "";
                                        Trustindex.resize_widget(l);
                                        Trustindex.init_pager(l)
                                    }), Trustindex.loaded_css.push(k)) : (l.style.display =
                                        "", Trustindex.resize_widget(l), Trustindex.init_pager(l));
                                    Trustindex.formatReviews();
                                    Trustindex.replaceErrorImages();
                                    (k = l.getAttribute("data-rich-snippet") || l.getAttribute("data-rich-snippet-url")) && 0 === document.querySelectorAll('script[src*=".trustindex.io/assets/js/richsnippet.js"], script[type="application/ld+json"][data-trustindex="1"]').length && Trustindex.addJS(Trustindex.getCDNUrl() + "assets/js/richsnippet.js?" + k.replace(/(?:companies\/[^\/]{2}\/)?([^\/]+).*/, "$1"))
                                }
                            } else k = document.createComment("Trustindex widget (" +
                                f + ") is empty here."), g.replaceWith(k);
                        else d.nextSibling.innerHTML = 'Widget not found! Probably it is already deleted or there is typo in its ID. We suggest that you log in to the <a href="https://admin.trustindex.io/" target="_blank">Trustindex system</a> and follow the widget configuration instructions. Or, if you don\'t have an account, create one for free at <a href="www.trustindex.io?a=sys&c=widget-not-found" target="_blank">www.trustindex.io</a>'
                    }
                }
                Trustindex.formatReviews();
                Trustindex.replaceErrorImages();
                var b = document.body.offsetWidth;
                window.addEventListener("resize", function() {
                    document.body.offsetWidth !== b && (b = document.body.offsetWidth, clearTimeout(Trustindex.resizerTimeoutPointer), Trustindex.resizerTimeoutPointer = setTimeout(Trustindex.resize_widgets, 1E3))
                });
                window.addEventListener("load", function() {
                    Trustindex.removePopupEvents();
                    setTimeout(Trustindex.resize_widgets, 40)
                });
                window.addEventListener("scroll", Trustindex.removePopupEvents);
                setTimeout(Trustindex.removePopupEvents, 2500);
                setTimeout(Trustindex.resize_widgets,
                    1E3);
                window.addEventListener("click", function(c) {
                    !Trustindex.activePopups.length || c.target.closest(".ti-dropdown-widget-inner") || c.target.closest(".ti-popup-widget") || c.target.closest(".ti-widget-container") || (c.preventDefault(), Trustindex.activePopups.forEach(e => {
                        e.classList.remove("active");
                        (e = e.closest(".ti-widget").querySelector("a.ti-popup-header[href], a.ti-header[href]")) && e.classList.remove("active")
                    }), Trustindex.activePopups = [])
                });
                return !0
            }
            window.onload = Trustindex.init
        },
        init_widget: function(a) {
            a.layout_id =
                a.getAttribute("data-layout-id");
            a.set_id = a.getAttribute("data-set-id");
            a.pid = a.getAttribute("data-pid");
            a.layout_id && (a.layout_id = parseInt(a.layout_id));
            a.container = a.querySelector(".ti-widget-container");
            a.reviews_container = a.querySelector(".ti-reviews-container");
            a.reviews_container_wrapper = a.querySelector(".ti-reviews-container-wrapper");
            a.pager_autoplay_timeout = a.getAttribute("data-pager-autoplay-timeout");
            a.rotate_to = a.getAttribute("data-rotate-to");
            a.rotate_to || (a.rotate_to = "right");
            a.slider_loop =
                a.getAttribute("data-slider-loop");
            a.mouse_over = !1;
            return !0
        },
        init_dots: function(a) {
            let b = a.querySelector(".ti-controls-dots");
            if (b) {
                var c = Trustindex.getReviewNum(a);
                let e = Trustindex.getVisibleReviewNum(a),
                    d = "",
                    f = 1 + c - e;
                a.slider_loop && c != e && (f = Trustindex.getReviewNum(a));
                for (c = 0; c < f; c++) d += '<div class="dot" data-pager-state="' + c + '"></div> ';
                b.innerHTML = d;
                (a = b.querySelector('.dot[data-pager-state="' + (a.pager_state || 0) + '"]')) && a.classList.add("active")
            }
            return !0
        },
        init_line: function(a) {
            var b = a.querySelector(".ti-controls-line");
            if (b) {
                var c = Trustindex.getReviewNum(a);
                let e = Trustindex.getVisibleReviewNum(a),
                    d = 1 + c - e;
                a.slider_loop && c != e && (d = Trustindex.getReviewNum(a));
                if (c = b.querySelector(".dot")) b = parseInt(b.offsetWidth / d), 1 > b && (b = 1), c.style.width = b + "px", c.style.left = Math.ceil(a.pager_state_line / d * 100) + "%"
            }
            return !0
        },
        init_pager: function(a) {
            if (window.jQuery && a instanceof jQuery) a.each(function() {
                Trustindex.init_pager(this)
            });
            else if (void 0 !== a.isNodeList && a.isNodeList()) a.forEach(function(b) {
                Trustindex.init_pager(b)
            });
            else if (!a.classList.contains("ti-certificate") &&
                !a.getAttribute("data-pager-inited")) {
                a.setAttribute("data-pager-inited", !0);
                void 0 === a.layout_id && Trustindex.init_widget(a);
                0 < a.getAttribute("class").split(" ").filter(b => -1 === ["ti-widget", "desktop", "mobile", "table"].indexOf(b)).length && Trustindex.resize_widget(a);
                Trustindex.setAiSummary(a);
                Trustindex.setLoadMore(a);
                Trustindex.init_dots(a);
                Trustindex.init_line(a);
                Trustindex.setClickableParts(a);
                Trustindex.setReadMore(a);
                Trustindex.handleSubContents(a);
                Trustindex.initHeaderNav(a);
                Trustindex.registerHeaderEvents(a);
                if (null !== a.pager_autoplay_timeout) {
                    a.pager_state = 0;
                    a.pager_state_line = 0;
                    a.pager_moving = !1;
                    a.pager_autoplay_direction = "next";
                    a.pager_position = "0px";
                    a.pager_autoplay_timeout = parseInt(a.pager_autoplay_timeout);
                    "left" === a.rotate_to && (a.pager_state = Trustindex.getMaximumPagerState(a) - 1, a.slider_loop && a.querySelector(".ti-controls-dots") && "none" !== window.getComputedStyle(a.querySelector(".ti-controls-dots")).display && (a.pager_state = Trustindex.getReviewNum(a) - 2), a.pager_state_line = a.pager_state, Trustindex.moverBtnClicked(a,
                        "next" === a.pager_autoplay_direction, "auto", 1), a.slider_loop && (a.pager_autoplay_direction = "prev"));
                    Trustindex.controlsShowHide(a);
                    a.querySelectorAll(".ti-review-item").forEach(m => m.style.position = "relative");
                    a.container.addEventListener("mouseenter", m => a.mouse_over = !0);
                    a.container.addEventListener("mouseleave", m => a.mouse_over = !1);
                    a.addEventListener("click", function(m) {
                        if (m.target.matches(".ti-controls .ti-next") || m.target.matches(".ti-controls .ti-prev")) m.preventDefault(), Trustindex.moverBtnClicked(a,
                            m.target.classList.contains("ti-next"), "manual", 500)
                    }, !1);
                    Trustindex.setAutoplay(a);
                    let b, c, e, d, f, g = null,
                        h = !1,
                        k = !1,
                        l = function(m) {
                            b = m.touches[0].pageX;
                            e = m.touches[0].pageY;
                            f = d = c = null;
                            g = a.reviews_container_wrapper.querySelector('.ti-review-item:not([style*="display: none"])').offsetWidth;
                            h = k = !1;
                            a.mouse_over = !0
                        },
                        n = function(m) {
                            if (a.pager_moving) return !1;
                            c = m.touches[0].pageX;
                            d = m.touches[0].pageY;
                            m = c - b;
                            10 < Math.abs(d - e) && !k && (h = !0);
                            if (!h && (10 < Math.abs(m) || k)) {
                                let p = parseInt(a.pager_position);
                                f = p + m;
                                Trustindex.animateReviews(a,
                                    p + "px", f + "px", 0, !1);
                                a.slider_loop && (m = b > c, Trustindex.addClonedReviews(a, a.pager_state + (m ? 1 : -1) * Math.ceil(Math.abs(c - b) / g), m));
                                k = !0
                            }
                        },
                        r = function(m) {
                            if (k && !h)
                                if (b && c && 25 < Math.abs(b - c)) {
                                    let q = b > c;
                                    a.querySelectorAll(".ti-review-content").forEach(t => t.scrollTop = 0);
                                    if (q && a.isNext || !q && a.isPrev) {
                                        a.pager_position = f + "px";
                                        m = Math.ceil(Math.abs(c - b) / g);
                                        var p = -1 * (a.pager_state + m * (q ? 1 : -1)) * a.reviews_container_wrapper.offsetWidth / Trustindex.getVisibleReviewNum(a);
                                        p = parseInt(Math.abs(p - f));
                                        p = parseInt(p / g * 300);
                                        Trustindex.moverBtnClicked(a,
                                            q, "manual", p, m)
                                    } else Trustindex.animateReviews(a, f + "px", parseInt(a.pager_position) + "px", 120, !1), setTimeout(() => {
                                        Trustindex.moverBtnClicked(a, q, "manual", 400, Math.ceil(Math.abs(c - b) / g))
                                    }, 120)
                                } else f && f !== parseInt(a.pager_position) && Trustindex.animateReviews(a, f + "px", parseInt(a.pager_position) + "px", 120, !1);
                            f = c = b = null;
                            h = k = !1;
                            return a.mouse_over = !1
                        };
                    a.reviews_container.removeEventListener("touchstart", l, {
                        passive: !0
                    });
                    a.reviews_container.addEventListener("touchstart", l, {
                        passive: !0
                    });
                    a.reviews_container.removeEventListener("touchmove",
                        n, {
                            passive: !0
                        });
                    a.reviews_container.addEventListener("touchmove", n, {
                        passive: !0
                    });
                    a.reviews_container.removeEventListener("touchend", r, {
                        passive: !0
                    });
                    a.reviews_container.addEventListener("touchend", r, {
                        passive: !0
                    })
                }
                if ("admin.trustindex.io" !== location.hostname || 53 == a.layout_id) a.addEventListener("click", function(b) {
                    b.target.matches(".disable-widget") ? (b.preventDefault(), a.classList.add("ti-disabled"), -1 === location.href.indexOf("widget/select_layout") && (document.querySelectorAll('.ti-widget:not(.ti-feed-widget):not([data-layout-id="53"])').forEach(c =>
                        c.classList.add("ti-disabled")), 53 != a.layout_id && Trustindex.setCookie("ti-widget-disabled", 1, 10, "/", location.hostname)), a.querySelector(".ti-enable-widget") || a.remove()) : b.target.matches(".ti-enable-widget") && (b.preventDefault(), a.classList.remove("ti-disabled"), Trustindex.setReadMore(a, 10), -1 === location.href.indexOf("widget/select_layout") && (document.querySelectorAll('.ti-widget:not(.ti-feed-widget):not([data-layout-id="53"])').forEach(function(c) {
                        c.classList.remove("ti-disabled");
                        Trustindex.setReadMore(c,
                            10)
                    }), 53 != a.layout_id && Trustindex.removeCookie("ti-widget-disabled", "/", location.hostname)))
                }), Trustindex.getCookie("ti-widget-disabled") && document.querySelectorAll(".ti-widget:not(.ti-feed-widget)").forEach(b => b.classList.add("ti-disabled"));
                a.removeEventListener("click", Trustindex.popupHandler);
                a.addEventListener("click", Trustindex.popupHandler);
                a.removeEventListener("click", Trustindex.popupCloseHandler);
                a.addEventListener("click", Trustindex.popupCloseHandler);
                a.removeEventListener("click", Trustindex.readMoreHandler);
                a.addEventListener("click", Trustindex.readMoreHandler);
                a.removeEventListener("click", Trustindex.clickEventHandler);
                a.addEventListener("click", Trustindex.clickEventHandler);
                return !0
            }
        },
        removePopupEvents: function() {
            document.querySelectorAll('.ti-widget:not(.ti-feed-widget) a[href="#popup"], .ti-widget:not(.ti-feed-widget) a[href="#dropdown"]').forEach(function(a) {
                let b = a.cloneNode(!0);
                a.parentNode.replaceChild(b, a);
                a = b.closest(".ti-widget");
                Trustindex.handleSubContents(a)
            });
            return window.removeEventListener("scroll",
                Trustindex.removePopupEvents)
        },
        setAutoplay: function(a, b) {
            void 0 !== b && (a.pager_autoplay_timeout = b);
            void 0 !== a.intervalPointer && clearInterval(a.intervalPointer);
            0 < a.pager_autoplay_timeout && (a.intervalPointer = setInterval(function() {
                Trustindex.moverBtnClicked(a, "next" === a.pager_autoplay_direction, "auto", 1E3)
            }, 1E3 * a.pager_autoplay_timeout));
            return !0
        },
        moverBtnClicked: function(a, b, c, e, d) {
            void 0 === d && (d = 1);
            if ("manual" === c && (b && !a.isNext || !b && !a.isPrev)) return Trustindex.noReviewsAnimation(a, b);
            if (a.pager_moving ||
                a.mouse_over && "auto" === c) return !1;
            let f = a.querySelectorAll('.ti-review-item:not([style*="display: none"])').length,
                g = Trustindex.getVisibleReviewNum(a);
            return f <= g ? !1 : Trustindex.moveReviews(a, a.pager_state + d * (b ? 1 : -1), c, e, b)
        },
        moveReviews: function(a, b, c, e, d) {
            if (!a.clientHeight) return !1;
            let f = Trustindex.getMaximumPagerState(a);
            if (a.slider_loop) {
                let g = Trustindex.getReviewNum(a);
                Trustindex.addClonedReviews(a, b, d);
                b < a.pager_state && setTimeout(function() {
                    let h = ".ti-review-item.ti-cloned.ti-cloned--end";
                    b >
                        f && (h += ":last-child");
                    a.reviews_container_wrapper.querySelectorAll(h).forEach(function(k) {
                        k.remove()
                    })
                }, e);
                0 > b && !1 === d && setTimeout(function() {
                    a.reviews_container_wrapper.querySelectorAll(".ti-review-item.ti-cloned--dragging").forEach(h => h.classList.remove("ti-cloned--dragging"));
                    a.reviews_container_wrapper.scrollLeft = 0;
                    Trustindex.resetPager(a)
                }, e);
                if (!0 === d) {
                    let h = b - a.pager_state;
                    setTimeout(function() {
                        for (let k = 0; k < h; k++) {
                            let l = a.reviews_container_wrapper.querySelector(".ti-review-item.ti-cloned.ti-cloned--start:first-child");
                            l && (l.remove(), Trustindex.resetPager(a))
                        }
                    }, e)
                }!0 === d ? (a.pager_state_line++, a.pager_state_line > g - 1 && (a.pager_state_line = 0)) : !1 === d ? (a.pager_state_line--, 0 > a.pager_state_line && (a.pager_state_line = g - 1)) : a.pager_state_line = b
            } else 0 > b ? b = 0 : b > f && (b = f), a.pager_state_line = b;
            a.pager_state = b;
            a.pager_moving = !0;
            Trustindex.controlsShowHide(a);
            Trustindex.slideReviews(a, e);
            "auto" !== c && void 0 !== a.intervalPointer && (clearInterval(a.intervalPointer), delete a.intervalPointer);
            return !0
        },
        addClonedReviews: function(a, b, c) {
            var e =
                Trustindex.getMaximumPagerState(a),
                d = Trustindex.getReviewNum(a);
            if (b > e && (a.pager_state < b || "resize" === c)) {
                var f = a.reviews_container_wrapper.querySelectorAll(".ti-review-item.ti-cloned.ti-cloned--end").length;
                e = b - e - f;
                f >= d && (f -= parseInt(f / d) * d);
                for (var g = 0; g < e; g++) {
                    let h = a.reviews_container_wrapper.querySelectorAll('.ti-review-item:not(.ti-cloned):not([style*="display: none"])')[f + g].cloneNode(!0);
                    h.classList.add("ti-cloned", "ti-cloned--end");
                    a.reviews_container_wrapper.appendChild(h)
                }
            }
            if (0 > b && !1 ===
                c)
                for (e = a.reviews_container_wrapper.querySelectorAll(".ti-review-item.ti-cloned.ti-cloned--start.ti-cloned--dragging").length, c = a.reviews_container_wrapper.querySelectorAll(".ti-review-item.ti-cloned.ti-cloned--start").length, b = Math.abs(b - a.pager_state) - e, d = d - 1 - c % d, c = a.reviews_container_wrapper.offsetWidth / Trustindex.getVisibleReviewNum(a), e = parseInt(a.reviews_container_wrapper.scrollLeft / c), f = 0; f < b; f++) g = a.reviews_container_wrapper.querySelectorAll('.ti-review-item:not(.ti-cloned):not([style*="display: none"])')[d -
                    f].cloneNode(!0), g.classList.add("ti-cloned", "ti-cloned--start", "ti-cloned--dragging"), a.reviews_container_wrapper.insertBefore(g, a.reviews_container_wrapper.firstChild), a.reviews_container_wrapper.scrollLeft = parseInt((f + 1 + e) * c)
        },
        slideReviews: function(a, b) {
            if (void 0 !== a.pager_position) {
                void 0 === b && (b = 1E3);
                var c = Trustindex.getVisibleReviewNum(a);
                c = -1 * a.pager_state * a.reviews_container_wrapper.offsetWidth / c + "px";
                Trustindex.animateReviews(a, a.pager_position, c, b);
                a.pager_position = c;
                setTimeout(function() {
                    a.pager_moving = !1
                }, b);
                return !0
            }
        },
        noReviewsAnimation: function(a, b) {
            a.pager_moving = !0;
            let c = parseInt(a.pager_position),
                e = b ? -1 : 1,
                d = function(h, k, l, n) {
                    setTimeout(function() {
                        Trustindex.animateReviews(a, h + "px", k + "px", l, !1)
                    }, n)
                },
                f = 0,
                g = 0;
            [{
                pos: 30,
                speed: 100
            }, {
                pos: -30,
                speed: 80
            }, {
                pos: 15,
                speed: 60
            }, {
                pos: -15,
                speed: 50
            }].forEach(function(h, k) {
                0 === k ? f = c + h.pos * e : (c = f, f += h.pos * e);
                d(c, f, h.speed, g);
                g += h.speed
            });
            return setTimeout(() => a.pager_moving = !1, g)
        },
        animateReviews: function(a, b, c, e, d) {
            void 0 === d && (d = !0);
            a.querySelectorAll(".ti-review-item").forEach(function(f) {
                f.animate({
                    left: [b,
                        c
                    ]
                }, {
                    duration: e,
                    fill: "both",
                    easing: "ease-in-out"
                });
                d && setTimeout(() => {
                    if (!Trustindex.isReviewVisible(f)) {
                        let g = f.querySelector(".ti-read-more .ti-read-more-collapse");
                        g && g.click()
                    }
                }, e)
            })
        },
        setClickableParts: function(a) {
            if ("undefined" === typeof a.clickable_parts_setted) {
                a.clickable_parts_setted = !0;
                var b = a.querySelector("a[href]:not(.ti-write-btn-dropdown-item):not(.ti-header-write-btn)");
                b && "#" !== b.getAttribute("href") && (a = b.closest(".ti-header:not(a), .ti-footer:not(a), .ti-popup-header:not(a)")) &&
                    a.querySelector(".ti-large-logo, .ti-profile-img, .ti-profile-details, .ti-logo-stars-flex") && (a.classList.add("ti-clickable-link"), a.addEventListener("click", function(c) {
                        if ("A" === c.target.nodeName) return !1;
                        Trustindex.openWindow(b.getAttribute("href"));
                        c.preventDefault()
                    }));
                return !0
            }
        },
        setReadMore: function(a, b) {
            if (!a) return !1;
            "undefined" === typeof b && (b = 500);
            setTimeout(function() {
                let c = a.querySelectorAll(".ti-review-item:not(.ti-hide) .ti-read-more");
                c && c.forEach(function(e) {
                    let d = e.closest(".ti-review-item").querySelector(e.getAttribute("data-container"));
                    d || = e.closest(".ti-review-content").querySelector(".ti-inner");
                    let f = 10;
                    d.getAttribute("style") && -1 !== d.getAttribute("style").indexOf("height") && (f = 500);
                    d.setAttribute("style", "");
                    e.setAttribute("style", "");
                    setTimeout(() => {
                        var g = d.scrollHeight > d.offsetHeight;
                        if (d.closest(".ti-popup-widget")) {
                            g = parseFloat(window.getComputedStyle(d, null).getPropertyValue("font-size"));
                            let h = parseInt(window.getComputedStyle(d, null).getPropertyValue("-webkit-line-clamp"));
                            parseFloat(window.getComputedStyle(d, null).getPropertyValue("max-height"));
                            g = parseInt(1.44 * g * h);
                            g = d.scrollHeight > g
                        }
                        g && "block" !== window.getComputedStyle(e, null).getPropertyValue("display") && (g = !1);
                        g ? (d.style.setProperty("height", d.offsetHeight + "px", "important"), d.setAttribute("data-initial-height", d.offsetHeight), d.parentNode.classList.contains("ti-review-content") && (d.parentNode.style.display = "block", d.parentNode.style.setProperty("-webkit-line-clamp", "unset", "important")), 0 < parseInt(window.getComputedStyle(d, null).getPropertyValue("max-height")) && d.style.setProperty("max-height",
                                "unset", "important"), e.getAttribute("data-open-text") ? e.innerHTML = '<span class="ti-read-more-active">' + e.getAttribute("data-open-text") + "</span>" : e.innerHTML = '<span class="ti-read-more-active">' + e.innerText + "</span>", e.setAttribute("style", "")) : e.getAttribute("data-container") ? (e.innerHTML = "<span>&nbsp;</span>", e.style.opacity = 0, e.style.pointerEvents = "none", c.length === a.reviews_container.querySelectorAll('.ti-read-more[style*="opacity: 0"]').length && c.forEach(h => h.style.display = "none")) : e.style.display =
                            "none"
                    }, f)
                });
                setTimeout(() => Trustindex.verticalPositionElements(a), 10);
                setTimeout(() => Trustindex.verticalPositionElements(a), 500)
            }, b);
            return !0
        },
        readMoreHandler: function(a) {
            if (a.target.matches(".ti-read-more-active")) {
                a.preventDefault();
                a = a.target;
                let b = a.closest(".ti-review-item").querySelector(a.parentNode.getAttribute("data-container"));
                b || = a.closest(".ti-review-content").querySelector(".ti-inner");
                a.classList.contains("ti-read-more-collapse") ? (b.style.setProperty("-webkit-line-clamp", ""), b.style.setProperty("height",
                    b.getAttribute("data-initial-height") + "px", "important"), a.innerHTML = a.parentNode.getAttribute("data-open-text"), a.classList.remove("ti-read-more-collapse")) : (b.style.setProperty("-webkit-line-clamp", "unset", "important"), b.style.setProperty("height", b.scrollHeight + "px", "important"), a.innerHTML = a.parentNode.getAttribute("data-collapse-text"), a.classList.add("ti-read-more-collapse"), a.innerHTML || (a.parentNode.style.display = "none"))
            }
            return !0
        },
        handleSubContents: function(a) {
            a.querySelectorAll("a[data-subcontent]").forEach(function(b) {
                let c =
                    b.getAttribute("data-subcontent"),
                    e = a.querySelector(b.getAttribute("data-subcontent-target"));
                if (e) {
                    if ("" !== e.innerHTML.trim()) return b.setAttribute("data-subcontent-loaded", !0);
                    "undefined" !== typeof a.pid && a.pid && b.addEventListener("click", function() {
                        if (!b.getAttribute("data-subcontent-loaded")) {
                            b.classList.add("ti-loading");
                            setTimeout(() => b.setAttribute("data-subcontent-loaded", !0), 50);
                            let d = new XMLHttpRequest;
                            d.open("GET", Trustindex.getWidgetUrl(a.pid) + "_subcontent-" + c + ".html");
                            d.send();
                            d.onload =
                                function() {
                                    4 === d.readyState && 200 === d.status && (e.innerHTML = d.responseText, Trustindex.init_widget(a), b.dispatchEvent(new Event("subcontent-loaded")), b.classList.remove("ti-loading"), Trustindex.formatReviews(), Trustindex.replaceErrorImages(), Trustindex.setAiSummary(a))
                                }
                        }
                    })
                }
            });
            return !0
        },
        formatReviews: function(a) {
            let b = document;
            void 0 !== a && (b = a);
            let c = b.querySelectorAll(".ti-widget:not(.ti-feed-widget) .ti-review-content, .ti-widget:not(.ti-feed-widget) .ti-inner .ti-review-text");
            c.forEach(function(e) {
                var d =
                    e.querySelector(".ti-inner");
                d && (e = d);
                d = e.querySelectorAll("svg");
                0 === d.length && (d = e.innerHTML, d = d.replace(/<img.+class="emoji" alt="\u263a" src="[^'"]+">/gm, '<svg style="display: inline-block; vertical-align: sub;fill: #0ab21b;position:relative;top:-2px" viewBox="0 0 128 128"><path d="M64 8a56 56 0 1 0 56 56A56 56 0 0 0 64 8zm0 104a48 48 0 1 1 48-48 48 48 0 0 1-48 48zM44 64a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm48-8a8 8 0 1 1-8-8 8 8 0 0 1 8 8zm-4.8 21.6a4 4 0 0 1 .6 3.6A24.3 24.3 0 0 1 64 97c-9.7 0-15.7-4.2-19-7.8a22.7 22.7 0 0 1-4.8-8A4 4 0 0 1 44 76h40a4 4 0 0 1 3.2 1.6z"></path></svg>&nbsp;&middot;&nbsp;'),
                    d = d.replace(/<img.+class="emoji" alt="\u2639" src="[^'"]+">/gm, '<svg style="display: inline-block; vertical-align: sub;fill: #383838;margin-top: -1px;position:relative;top:-2px" viewBox="0 0 128 128"><path d="M64 8a56 56 0 1 0 56 56A56 56 0 0 0 64 8zm0 104a48 48 0 1 1 48-48 48 48 0 0 1-48 48zM44 64a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm48-8a8 8 0 1 1-8-8 8 8 0 0 1 8 8zm-5.2 30.2a4 4 0 1 1-5.6 5.6c-10.5-10.4-24-10.4-34.4 0a4 4 0 0 1-5.6-5.6c13.6-13.7 32-13.7 45.6 0z"></path></svg>&nbsp;&middot;&nbsp;'), d = d.replace("\u263a",
                        '<svg style="display: inline-block; vertical-align: sub;fill: #0ab21b;position:relative;top:-2px" viewBox="0 0 128 128"><path d="M64 8a56 56 0 1 0 56 56A56 56 0 0 0 64 8zm0 104a48 48 0 1 1 48-48 48 48 0 0 1-48 48zM44 64a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm48-8a8 8 0 1 1-8-8 8 8 0 0 1 8 8zm-4.8 21.6a4 4 0 0 1 .6 3.6A24.3 24.3 0 0 1 64 97c-9.7 0-15.7-4.2-19-7.8a22.7 22.7 0 0 1-4.8-8A4 4 0 0 1 44 76h40a4 4 0 0 1 3.2 1.6z"></path></svg>&nbsp;&middot;&nbsp;').replace("\u2639", '<svg style="display: inline-block; vertical-align: sub;fill: #383838;margin-top: -1px;position:relative;top:-2px" viewBox="0 0 128 128"><path d="M64 8a56 56 0 1 0 56 56A56 56 0 0 0 64 8zm0 104a48 48 0 1 1 48-48 48 48 0 0 1-48 48zM44 64a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm48-8a8 8 0 1 1-8-8 8 8 0 0 1 8 8zm-5.2 30.2a4 4 0 1 1-5.6 5.6c-10.5-10.4-24-10.4-34.4 0a4 4 0 0 1-5.6-5.6c13.6-13.7 32-13.7 45.6 0z"></path></svg>&nbsp;&middot;&nbsp;'),
                    d = d.replace(/\n/g, "<br />"), e.innerHTML = d, d = e.querySelectorAll("svg"));
                if (d.length) {
                    let g = .95 * parseInt(e.style.fontSize || 14);
                    d.forEach(function(h) {
                        h.style.width = g + "px";
                        h.style.height = g + "px"
                    })
                }
                e.innerHTML = Trustindex.decodeHtml(e.innerHTML);
                let f = e.closest(".ti-review-item");
                f && setTimeout(() => Trustindex.loadSpriteImage(f.querySelector(".ti-profile-img-sprite")), 50)
            });
            setTimeout(() => {
                    b.querySelectorAll(".ti-widget:not(.ti-feed-widget) .ti-company-sprite-profile-image").forEach(Trustindex.loadSpriteImage)
                },
                50);
            void 0 === a && (c = document.querySelectorAll(".ti-widget:not(.ti-feed-widget) .ti-review-item[data-platform-page-url]"), c.forEach(function(e) {
                let d = e.querySelector(".ti-name"),
                    f = e.getAttribute("data-platform-page-url");
                d.style.cursor = "pointer";
                d.addEventListener("click", g => Trustindex.openWindow(f))
            }), c = document.querySelectorAll(".ti-widget:not(.ti-feed-widget) .ti-review-item[data-time]"), c.forEach(function(e) {
                let d = e.querySelector(".ti-date:not(.ti-date-comment)");
                if (d) {
                    let f = parseInt(e.getAttribute("data-time"));
                    d.innerHTML = Trustindex.getRelativeTime(f, e.closest(".ti-widget").getAttribute("data-time-locale"))
                }
            }));
            return !0
        },
        replaceErrorImages: function() {
            let a = document.querySelectorAll(".ti-widget:not(.ti-feed-widget) .ti-review-item .ti-profile-img img");
            a && a.forEach(function(b) {
                if (!b.complete || void 0 !== b.naturalWidth && 0 !== b.naturalWidth) {
                    let c = function(e) {
                        e = e.target || e;
                        e.setAttribute("src", Trustindex.getDefaultAvatarUrl());
                        e.removeEventListener("error", c)
                    };
                    b.removeEventListener("error", c);
                    b.addEventListener("error",
                        c)
                } else b.setAttribute("src", Trustindex.getDefaultAvatarUrl())
            });
            return !0
        },
        controlsShowHide: function(a) {
            var b = Trustindex.getReviewNum(a);
            let c = Trustindex.getVisibleReviewNum(a);
            a.isPrev = !0;
            a.isNext = !0;
            a.slider_loop ? b == c ? (Trustindex.toggleElement(a.querySelector(".ti-prev"), "hide"), Trustindex.toggleElement(a.querySelector(".ti-next"), "hide"), a.isPrev = !1, a.isNext = !1) : (Trustindex.toggleElement(a.querySelector(".ti-prev")), Trustindex.toggleElement(a.querySelector(".ti-next"))) : (0 == a.pager_state ? (Trustindex.toggleElement(a.querySelector(".ti-prev"),
                "hide"), a.pager_autoplay_direction = "next", a.isPrev = !1) : Trustindex.toggleElement(a.querySelector(".ti-prev")), a.pager_state >= b - c ? (Trustindex.toggleElement(a.querySelector(".ti-next"), "hide"), a.pager_autoplay_direction = "prev", a.isNext = !1) : Trustindex.toggleElement(a.querySelector(".ti-next")));
            a.querySelectorAll(".ti-controls-dots .dot").forEach(e => e.classList.remove("active"));
            (b = a.querySelector('.ti-controls-dots .dot[data-pager-state="' + a.pager_state_line + '"]')) && b.classList.add("active");
            return Trustindex.init_line(a)
        },
        initHeaderNav: function(a) {
            if (a = a.querySelector(".ti-widget-header .ti-platform-tabs"))
                if (a.querySelector(".ti-platform-tab-items").scrollWidth > a.offsetWidth) {
                    let b = a.querySelector(".ti-tab-active");
                    b.previousElementSibling ? a.querySelector(".ti-arrow-prev").style.display = "inline-block" : a.querySelector(".ti-arrow-prev").style.display = "";
                    b.nextElementSibling ? a.querySelector(".ti-arrow-next").style.display = "inline-block" : a.querySelector(".ti-arrow-next").style.display = ""
                } else a.querySelector(".ti-arrow-prev").style.display =
                    "", a.querySelector(".ti-arrow-next").style.display = "";
            return !0
        },
        registerHeaderEvents: function(a) {
            a.addEventListener("click", function(c) {
                if (c.target.matches('.ti-header-write-btn-container .ti-header-write-btn[href=""]')) {
                    c.preventDefault();
                    let e = c.target.closest(".ti-header-write-btn-container").querySelector(".ti-write-btn-dropdown");
                    e.classList.contains("ti-active") || (e.classList.add("ti-active"), setTimeout(() => {
                        document.addEventListener("click", () => e.classList.remove("ti-active"), {
                            once: !0
                        })
                    }, 50))
                }
            }, !1);
            let b = a.querySelector(".ti-widget-header");
            if (!b) return !1;
            b.addEventListener("click", function(c) {
                if (c.target.matches(".ti-platform-tab-items .ti-tab-item")) {
                    c.preventDefault();
                    var e = c.target;
                    let d = c.target.closest(".ti-platform-tab-items"),
                        f = e.getAttribute("data-source");
                    d.querySelectorAll(".ti-tab-item").forEach(k => k.classList.remove("ti-tab-active"));
                    e.classList.add("ti-tab-active");
                    let g = a.querySelector(".ti-widget-header .ti-header-content.ti-active"),
                        h = a.querySelector(".ti-widget-header .ti-header-content.source-" +
                            f);
                    g && g.classList.remove("ti-active");
                    h && h.classList.add("ti-active");
                    a.querySelectorAll(".ti-review-item.ti-cloned").forEach(k => k.remove());
                    "all" === f ? a.querySelectorAll(".ti-review-item").forEach(k => k.style.display = "") : (a.querySelectorAll(".ti-review-item").forEach(k => k.style.display = "none"), a.querySelectorAll(".ti-review-item.source-" + f).forEach(k => k.style.display = ""));
                    d.scroll({
                        left: e.offsetLeft - 28,
                        behavior: "smooth"
                    });
                    Trustindex.initHeaderNav(a);
                    Trustindex.moveReviews(a, 0, "auto", 0, "resize");
                    Trustindex.vertical_separate_reviews(a);
                    Trustindex.setLoadMore(a)
                }
                c.target.matches(".ti-platform-tab-nav .ti-arrow-prev") && (e = c.target.closest(".ti-platform-tabs").querySelector(".ti-tab-active")) && e.previousElementSibling && e.previousElementSibling.click();
                c.target.matches(".ti-platform-tab-nav .ti-arrow-next") && (c = c.target.closest(".ti-platform-tabs").querySelector(".ti-tab-active")) && c.nextElementSibling && c.nextElementSibling.click()
            }, !1);
            return !0
        },
        setLoadMore: function(a) {
            let b = a.querySelector(".ti-load-more-reviews-button");
            if (b) {
                let e =
                    Trustindex.getLoadMoreLimit(a);
                b.style.display = "";
                a.querySelectorAll(".ti-review-item").forEach(f => f.classList.remove("ti-hide"));
                let d = function(f) {
                    f.forEach((g, h) => {
                        h > e - 1 && g.classList.add("ti-hide")
                    })
                };
                var c = a.querySelectorAll('.ti-review-item:not([style*="display: none"])');
                if (c.length > e) {
                    if (a.getAttribute("data-column-vertical-separate")) {
                        c = Trustindex.getColCount(a);
                        a = a.reviews_container_wrapper.querySelectorAll(".ti-column");
                        e /= c;
                        for (let f = 0; f < a.length; f++) c = a[f].querySelectorAll('.ti-review-item:not([style*="display: none"])'),
                            d(c)
                    } else d(c);
                    b.removeEventListener("click", Trustindex.loadMoreHandle);
                    b.addEventListener("click", Trustindex.loadMoreHandle)
                } else b.style.display = "none"
            }
        },
        loadMoreHandle: function(a) {
            a.preventDefault();
            a = a.target;
            let b = a.closest(".ti-widget"),
                c = Trustindex.getLoadMoreLimit(b),
                e = function(f) {
                    for (let g = 0; g < f.length && !(g >= c); g++) f[g].classList.remove("ti-hide")
                };
            if (b.getAttribute("data-column-vertical-separate")) {
                var d = Trustindex.getColCount(b);
                let f = b.reviews_container_wrapper.querySelectorAll(".ti-column");
                c /= d;
                for (d = 0; d < f.length; d++) e(f[d].querySelectorAll(".ti-review-item.ti-hide"))
            } else e(b.querySelectorAll(".ti-review-item.ti-hide"));
            0 === b.querySelectorAll(".ti-review-item.ti-hide").length && (a.style.display = "none");
            Trustindex.setReadMore(b, 10)
        },
        setAiSummary: function(a) {
            var b = a.querySelector('script.ti-ai-summary[type="application/ld+json"]');
            if (b) {
                let d = JSON.parse(b.innerHTML).summary;
                var c = a.querySelector(".ti-reviews-container-wrapper .ti-review-item");
                if (c) {
                    b.remove();
                    b = c.cloneNode(!0);
                    b.setAttribute("class",
                        "ti-ai-summary-item " + b.getAttribute("class").replace(/source-[^\s]+/, "").trim() + (-1 !== d.text.indexOf("<li>") ? " ti-with-checklist" : ""));
                    if (c = b.querySelector(".ti-profile-details .ti-name")) c.innerHTML = d.title;
                    if (c = b.querySelector(".ti-profile-img")) {
                        let f = c.querySelector("img");
                        f || (f = document.createElement("img"), c.innerHTML = "", c.appendChild(f));
                        if (0 < d.images.length) {
                            for (var e = 0; e < d.images.length; e++) {
                                let g = f.cloneNode(!0);
                                g.src = d.images[e];
                                c.appendChild(g)
                            }
                            e = f.cloneNode(!0);
                            e.src = Trustindex.getCDNUrl() +
                                "assets/img/ai-profile-image.svg";
                            c.appendChild(e);
                            f.remove()
                        } else f.src = Trustindex.getCDNUrl() + "assets/img/ai-profile-image.svg", f.setAttribute("alt", ""), f.classList.add("ti-ai-profile-img")
                    }(c = b.querySelector(".ti-stars")) && c.remove();
                    if (c = b.querySelector(".ti-profile-details .ti-date")) c.innerHTML = d.comment;
                    if (c = b.querySelector(".ti-review-text-container")) c.innerHTML = d.text;
                    a.querySelector(".ti-reviews-container-wrapper").insertBefore(b, a.querySelector(".ti-reviews-container-wrapper").firstChild)
                }
            }
        },
        resize_widget: function(a) {
            void 0 !== a.container && a.container || Trustindex.init_widget(a);
            a.style.width = "";
            var b = a.offsetWidth;
            a.style.display = "none";
            var c = window.getComputedStyle(a, null).getPropertyValue("width");
            let e = a;
            var d = 0;
            do {
                e = e.parentNode;
                if (!e || "HTML" === e.nodeName) break;
                e.clientWidth && (d = window.getComputedStyle(e, null), d = e.clientWidth - parseFloat(d.paddingLeft) - parseFloat(d.paddingRight))
            } while (100 > d);
            "100%" === c && b > d && d && (a.style.width = d + "px");
            a.style.display = "";
            "undefined" === typeof a.original_cols &&
                (-1 === a.container.classList.toString().indexOf("ti-col-") ? a.original_cols = 1 : a.original_cols = Trustindex.getColCount(a));
            if (1 >= a.original_cols) return Trustindex.initHeaderNav(a);
            a.container.setAttribute("class", "ti-widget-container ti-col-" + a.original_cols);
            Trustindex.vertical_separate_reviews(a);
            c = (b = a.container.offsetWidth > a.reviews_container.offsetWidth) ? 275 : 300;
            c = parseInt(a.getAttribute("data-review-target-width") || c);
            c = Math.floor(a.reviews_container.offsetWidth / c);
            1 < c && 44 === a.layout_id && c--;
            b ?
                (350 > a.reviews_container.offsetWidth && (c = 0), a.container.setAttribute("class", "ti-widget-container ti-col-" + (c + 1))) : (1 > c && (c = 1), a.container.setAttribute("class", "ti-widget-container ti-col-" + c));
            Trustindex.vertical_separate_reviews(a);
            Trustindex.verticalPositionElements(a);
            Trustindex.init_dots(a);
            Trustindex.init_line(a);
            Trustindex.moveReviews(a, a.pager_state, "auto", 0, "resize");
            Trustindex.initHeaderNav(a);
            Trustindex.setLoadMore(a);
            setTimeout(() => Trustindex.init_pager(a), 2E3);
            return !0
        },
        resize_widgets: function() {
            return document.querySelectorAll(".ti-widget:not(.ti-certificate):not(.ti-feed-widget)").forEach(function(a) {
                Trustindex.isVisible(a) ?
                    Trustindex.resize_widget(a) : a.visibleInterval = setInterval(function() {
                        Trustindex.isVisible(a) && (Trustindex.resize_widget(a), clearInterval(a.visibleInterval))
                    }, 250)
            })
        },
        vertical_separate_reviews: function(a) {
            let b = Trustindex.getColCount(a);
            if (a.getAttribute("data-column-vertical-separate") || 31 == a.layout_id) {
                let d = a.container.querySelectorAll('.ti-review-item:not([style*="display: none"])'),
                    f = a.container.querySelectorAll('.ti-review-item[style*="display: none"]');
                a.reviews_container_wrapper.innerHTML =
                    "";
                for (var c = 0, e = []; c < b; c++) e[c] = document.createElement("div"), e[c].setAttribute("class", "ti-column"), a.reviews_container_wrapper.appendChild(e[c]);
                Array.from(d).sort(function(g, h) {
                    g = g.getAttribute("data-index") ? parseInt(g.getAttribute("data-index")) : 0;
                    h = h.getAttribute("data-index") ? parseInt(h.getAttribute("data-index")) : 1;
                    return g - h
                }).forEach(function(g, h) {
                    e[h % b].appendChild(g)
                });
                f.forEach(g => e[0].appendChild(g))
            }
            return !0
        },
        verticalPositionElements: function(a) {
            a.container.style.alignItems = "";
            let b =
                a.container.querySelector(".ti-footer"),
                c = a.querySelector(".ti-controls");
            if (0 < a.querySelectorAll('.ti-read-more:not([style*="opacity: 0"]):not([style*="display: none"])').length) {
                let e = a.reviews_container.querySelectorAll(".ti-read-more .ti-read-more-collapse");
                e.forEach(d => {
                    d.textContainer = d.closest(".ti-review-item").querySelector(d.parentNode.getAttribute("data-container") || ".ti-review-content .ti-inner");
                    d.textContainer && (d.textContainer.style.transition = "unset");
                    d.click()
                });
                if (b && a.container.offsetWidth >
                    a.reviews_container.offsetWidth) {
                    let d = (a.container.offsetHeight - b.offsetHeight) / 2;
                    a.container.style.alignItems = "flex-start";
                    b.style.marginTop = d + "px"
                }
                c && -1 !== [4, 5, 13, 14, 34, 44].indexOf(a.layout_id) && (c.style.top = a.reviews_container.offsetHeight / 2 + "px");
                e.forEach(d => {
                    d.click();
                    d.textContainer && setTimeout(() => d.textContainer.style.transition = "", 1)
                })
            } else b && (b.style.marginTop = ""), c && (c.style.top = "");
            return !0
        },
        createElementFromHTML: function(a) {
            let b = document.createElement("div");
            b.innerHTML = a.trim();
            return b.childNodes
        },
        decodeHtml: function(a) {
            let b = document.createElement("textarea");
            b.innerHTML = a;
            return b.value
        },
        toggleElement: function(a, b) {
            void 0 === b && (b = "show");
            a && (a.style.display = "show" === b ? "block" : "none");
            return !0
        },
        getVisibleReviewNum: function(a) {
            let b = Trustindex.getColCount(a);
            a.container.offsetWidth > a.reviews_container.offsetWidth && --b;
            "46" != a.dataset.layoutId && "47" != a.dataset.layoutId || --b;
            let c = b;
            if (a.reviews_container.querySelector(".ti-review-item")) {
                let e = a.reviews_container.querySelector('.ti-review-item:not([style*="display: none"])');
                e && (c = Math.floor(a.reviews_container.offsetWidth / e.offsetWidth))
            }
            return Math.max(b, c, 1)
        },
        getReviewNum: function(a) {
            return a.querySelectorAll('.ti-review-item:not(.ti-cloned):not([style*="display: none"])').length
        },
        getMaximumPagerState: function(a) {
            let b = Trustindex.getReviewNum(a);
            a = Trustindex.getVisibleReviewNum(a);
            return Math.max(b - a, 0)
        },
        resetPager: function(a) {
            a.pager_position = 0;
            a.pager_state = 0;
            return a.reviews_container_wrapper.querySelectorAll(".ti-review-item").forEach(b => b.animate({
                left: 0
            }, {
                fill: "both"
            }))
        },
        addCSS: function(a, b) {
            let c = document.createElement("link");
            c.type = "text/css";
            c.rel = "stylesheet";
            c.href = a;
            document.head.appendChild(c);
            b && c.addEventListener("load", b);
            return !0
        },
        addJS: function(a, b) {
            let c = document.createElement("script");
            c.type = "text/javascript";
            c.src = a;
            document.head.appendChild(c);
            b && c.addEventListener("load", b);
            return !0
        },
        popupHandler: function(a) {
            let b = a.target,
                c = function() {
                    b.classList.toggle("active");
                    let e = b.closest(".ti-widget");
                    e && (e.querySelectorAll(".ti-dropdown-widget, .ti-popup-widget").forEach(d => {
                        d.classList.toggle("active");
                        d.classList.contains("active") ? Trustindex.activePopups.push(d) : (d = Trustindex.activePopups.indexOf(d), -1 !== d && Trustindex.activePopups.splice(d, 1))
                    }), Trustindex.setReadMore(e, 10));
                    b.removeEventListener("subcontent-loaded", c)
                };
            if (b.matches('a[href="#dropdown"]') || b.matches('a[href="#popup"]')) b.getAttribute("data-subcontent-loaded") ? c() : b.addEventListener("subcontent-loaded", c), a.preventDefault();
            return !0
        },
        popupCloseHandler: function(a) {
            if (a.target.matches(".ti-header .ti-close-lg") ||
                a.target.matches(".ti-popup-header .ti-close-lg") || a.target.matches(".ti-popup-widget.active")) a.preventDefault(), (a = a.target.closest(".ti-widget")) && (a = a.querySelector("a.ti-popup-header[href], a.ti-header[href]")) && a.click();
            return !0
        },
        clickEventHandler: function(a) {
            if (a.target.matches(".ti-show-original-text")) {
                a.preventDefault();
                a = a.target;
                var b = JSON.parse(a.parentNode.querySelector('script[type="application/ld+json"]').innerHTML);
                b = b.text || b;
                let c = a.parentNode,
                    e = a.closest(".ti-review-item");
                a.parentNode.innerHTML =
                    b;
                Trustindex.formatReviews(e);
                c.getAttribute("data-initial-height") && parseInt(c.style.height) !== parseInt(c.getAttribute("data-initial-height")) ? (c.style.setProperty("height", "auto", "important"), c.style.setProperty("height", c.scrollHeight + "px", "important")) : (a = e.closest(".ti-widget"), (b = a.querySelector(".ti-read-more .ti-read-more-collapse")) && b.click(), Trustindex.setReadMore(a, 0))
            }
            return !0
        },
        openWindow: function(a) {
            let b = document.createElement("a");
            b.href = a;
            b.target = "_blank";
            b.rel = "noopener noreferrer nofollow";
            return b.click()
        },
        isVisible: function(a) {
            return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length)
        },
        isReviewVisible: function(a) {
            let b = a.closest(".ti-reviews-container-wrapper");
            if (!b) return !1;
            let c = a.offsetLeft - b.offsetLeft;
            a = c + a.offsetWidth;
            return c >= b.scrollLeft && a <= b.scrollLeft + b.offsetWidth
        },
        getRelativeTime: function(a, b) {
            b = b.split("|");
            let c = b.shift();
            var e = b.shift(),
                d = [86400, 604800, 2419200, 31536E3];
            let f = (new Date).getTime() / 1E3 - a;
            for (a = d.length - 1; 0 <= a; a--)
                if (f >= d[a]) return e = Math.floor(f /
                    d[a]), d = 2 * a, 1 < e && d++, c.replace("%d", e).replace("%s", b[d]);
            return e
        },
        getScriptSelector: function(a) {
            return 'div[src*=".trustindex."][src*="' + a + '.js"],div[data-src*=".trustindex."][data-src*="' + a + '.js"],script[src*=".trustindex."][src*="' + a + '.js"]'
        },
        getCDNUrl: function() {
            var a = "https://cdn.trustindex.io/";
            Trustindex.script && Trustindex.script.src && (a = Trustindex.script.src.split("/"), a.pop(), a = a.join("/") + "/"); - 1 === a.indexOf("trustindex.") && (a = "https://cdn.trustindex.io/");
            return a
        },
        getLoadMoreLimit: function(a) {
            return -1 ===
                a.container.classList.toString().indexOf("ti-col-") || 81 == a.layout_id ? 5 : 3 * Trustindex.getColCount(a)
        },
        getColCount: function(a) {
            return parseInt(a.container.classList.toString().replace(/^.*ti-col-(\d+).*$/, "$1"))
        },
        getStarHtml: function(a) {
            a = parseFloat(a);
            let b = "",
                c;
            for (c = 1; c <= a; c++) b += '<span class="ti-star f"></span>';
            a -= Math.floor(a);
            .25 <= a && (b = .75 > a ? b + '<span class="ti-star h"></span>' : b + '<span class="ti-star f"></span>', c++);
            for (; 5 >= c; c++) b += '<span class="ti-star e"></span>';
            return b
        },
        loadSpriteImage: function(a) {
            if (!a) return !1;
            var b = a.closest(".ti-widget");
            let c = Trustindex.getWidgetUrl(b.getAttribute("data-pid")) + "sprite.jpg",
                e = 0,
                d = 0,
                f = 0;
            if (!a.classList.contains("ti-company-sprite-profile-image")) {
                let h = a.closest(".ti-review-item"),
                    k = getComputedStyle(a);
                if ("auto" === k.height) return setTimeout(() => Trustindex.loadSpriteImage(a), 100);
                e = h.getAttribute("data-index") ? parseInt(h.getAttribute("data-index")) : [].indexOf.call(h.parentNode.children, h) - h.parentNode.querySelectorAll(".ti-ai-summary-item").length;
                d = parseInt(k.height ||
                    "0");
                if (!d || isNaN(d)) d = 40;
                if (b = b.querySelector(".ti-company-sprite-profile-image"))
                    if (k = getComputedStyle(b), f = parseInt(k.height || "0"), !f || isNaN(f)) f = 65
            }
            let g = function() {
                a.style.background = 'url("' + c + '") 0 ' + (e * d * -1 - f) + "px"
            };
            a.getAttribute("data-webp") ? Trustindex.isWebpSupported("lossy", h => {
                h && (c = c.replace(".jpg", ".webp"));
                g()
            }) : g()
        },
        cacheWebpSupported: {},
        isWebpSupported: function(a, b) {
            if ("undefined" !== typeof Trustindex.cacheWebpSupported[a]) return b(Trustindex.cacheWebpSupported[a]);
            let c = new Image;
            c.onload = () => {
                var e = 0 < c.width && 0 < c.height;
                Trustindex.cacheWebpSupported[a] = e;
                return b(e)
            };
            c.onerror = () => {
                Trustindex.cacheWebpSupported[a] = !1;
                return b(!1)
            };
            c.src = "data:image/webp;base64," + {
                lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
                lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
                alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
                animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
            }[a]
        },
        getCookie: function(a) {
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
        },
        setCookie: function(a, b, c, e, d) {
            let f = new Date;
            f.setDate(f.getDate() + c);
            c = null == c ? "" : "; expires=" + f.toUTCString();
            document.cookie = encodeURIComponent(a) + "=" + encodeURIComponent(b) + c + (d ? "; domain=" + d : "") + (e ? "; path=" + e : "");
            return !0
        },
        removeCookie: function(a, b, c) {
            if (!a || null === Trustindex.getCookie(a)) return !1;
            document.cookie = encodeURIComponent(a) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (c ? "; domain=" + c : "") + (b ? "; path=" + b : "");
            return !0
        }
    }
}();
Trustindex.init();