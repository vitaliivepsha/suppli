// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('./assets/templates/layouts/index.html');
    require('./assets/templates/layouts/faq.html');
    require('./assets/templates/layouts/blog.html');
    require('./assets/templates/layouts/article.html');
    require('./assets/templates/layouts/product.html');
    require('./assets/templates/layouts/policy.html');
    require('./assets/templates/layouts/terms.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var Slider = require('_modules/slider');
var Popup = require('_modules/popup');
var Fancy_select = require('_modules/fancyselect');
var Jscrollpane = require('_modules/jscrollpane');
var LightGallery = require('_modules/lightgallery');
var Jslider = require('_modules/jslider');
var Fancybox = require('_modules/fancybox');
require('_modules/succinct/succinct');
require('../node_modules/sumoselect/jquery.sumoselect.min.js');

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function () {
    new Forms();
    new Popup();
    new Fancy_select();
    new Jscrollpane();
    new LightGallery();
    new Slider();
    new Jslider();
    new Fancybox();

    // fixed header
    var header = $('.header'),
        scrollPrev = 0;

    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 100) {
            header.addClass('fixed');
        } else {
            header.removeClass('fixed');
        }
        scrollPrev = scrolled;
    });

    // languages

    $('.header-lang__curr').click(function () {
        $(this).closest('.header-lang').toggleClass('active');
    });

    $(document).click(function () {
        $('.header-lang').removeClass('active');
    });

    $(document).on('click', '.header-lang__curr', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.header-lang__list', function (e) {
        e.stopPropagation();
    });

    // mobile menu

    var touch = $('.mobile-menu__btn');

    var toggles = document.querySelectorAll('.mobile-menu__btn');

    for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
    }

    function toggleHandler(toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
        });
    }

    $(touch).click(function (e) {
        e.preventDefault();
        $('body').toggleClass('menu-opened').removeClass('login-menu__show');
        return false;
    });

    $(document).on('click', '.mobile-menu__btn', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.mobile-menu__wrapper', function (e) {
        e.stopPropagation();
    });

    // faq

    $('.faq-main__header').click(function () {
        $(this).closest('.faq-main__item').find('.faq-main__body').slideToggle()
            .closest('.faq-main__item').toggleClass('active').siblings().removeClass('active').find('.faq-main__body').slideUp();
    });



    // select

    $('.select').SumoSelect({
        forceCustomRendering: true
    });

    $('.video__inner').on('click', function (e) {
        $(this).find('img').hide();
        $(this).find('svg').hide();
        $(this).find('iframe').show();
        $(this).find('iframe')[0].src += '?autoplay=1';
        e.preventDefault();
    });

    // faq
    if ($('.acc')) {
        $('.acc .acc__content').css('display', 'none');
        $('.acc .acc__title').click(function () {
            $(this).toggleClass('active').next().slideToggle();
            $('.acc .acc__title').not(this).removeClass('active').next().slideUp();
        });
    }

    // crop text

    if ($('.werden-txt').length) {
        $('.werden-txt').each(function () {
            var text = $(this).text();
            if ($(this).text().replace(/\s+/g, '').length > 320) {
                $(this).succinct({
                    size: 320,
                    ignore: false
                });
                $('.werden__text-more').show();
            }
            else {
                $('.werden__text-more').hide();
            }
            $('.werden__text-more').click(function () {
                $(this).hide();
                $('.werden-txt').html(text);
            });
        });
    }

    if ($('.sie-item__text').length) {
        $('.sie-item__text').each(function () {
            var text = $(this).text();
            if ($(this).text().replace(/\s+/g, '').length > 110) {
                $(this).succinct({
                    size: 110,
                    ignore: false
                });
                $(this).next('.sie-btn__more').show();
            }
            else {
                $(this).next('.sie-btn__more').hide();
            }
            $(this).next('.sie-btn__more').click(function () {
                $(this).hide();
                $(this).closest('.sie-item__inner').find('.sie-item__text').html(text);
            });
        });
    }

    if ($('.produkts-slide__text').length) {
        $('.produkts-slide__text').each(function () {
            var text = $(this).text();
            if ($(this).text().replace(/\s+/g, '').length > 110) {
                $(this).succinct({
                    size: 110,
                    ignore: false
                });
                $(this).next('.produkts-slide__more').show();
            }
            else {
                $(this).next('.produkts-slide__more').hide();
            }
            $(this).next('.produkts-slide__more').click(function () {
                $(this).hide();
                $(this).closest('.produkts-slide__about').find('.produkts-slide__text').html(text);
            });
        });
    }
});
