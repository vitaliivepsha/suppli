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
  require('./assets/templates/layouts/login.html');
  require('./assets/templates/layouts/signup.html');
  require('./assets/templates/layouts/pricing.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Slider = require('_modules/slider');

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function() {
  new Slider();

  // fixed header

  var header = $('.header'),
    scrollPrev = 0;

  $(window).scroll(function() {
    var scrolled = $(window).scrollTop();
    if (scrolled > 10) {
      header.addClass('fixed');
    } else {
      header.removeClass('fixed');
    }
    scrollPrev = scrolled;
  });

  // languages

  $('.header-lang__curr').click(function() {
    $(this).closest('.header-lang').toggleClass('active');
  });

  $(document).click(function() {
    $('.header-lang').removeClass('active');
  });

  $(document).on('click', '.header-lang__curr', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.header-lang__list', function(e) {
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
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
    });
  }

  $(touch).click(function(e) {
    e.preventDefault();
    $('body').toggleClass('menu-opened').removeClass('login-menu__show');
    return false;
  });

  $(document).on('click', '.mobile-menu__btn', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.mobile-menu__wrapper', function(e) {
    e.stopPropagation();
  });

  // faq

  $('.faq-main__header').click(function() {
    $(this).closest('.faq-main__item').find('.faq-main__body').slideToggle()
            .closest('.faq-main__item').toggleClass('active').siblings().removeClass('active').find('.faq-main__body').slideUp();
  });

  // show/hide password

  $('#show-password').on('click', function() {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active').next('label').html('Hide password').closest('form').find('input[name="password"]').attr('type', 'text');
    }
    else {
      $(this).removeClass('active').next('label').html('Show password').closest('form').find('input[name="password"]').attr('type', 'password');
    }
  });
});
