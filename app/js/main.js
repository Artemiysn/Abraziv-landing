$(document).ready(function () {

  // мобильное меню start
  $('#js-mobile-menu-button').on('click', function (e) {
    e.preventDefault();
    $('#js-mobile-menu-content').toggle('slow');
  });

  $('#js-mobile-menu-content>a').click(function (e) {
    e.preventDefault();
    $("#js-mobile-menu-content").hide('slow');
  });

  $(document).click(function (e) {
    var container = $("#js-mobile-menu-content");
    var topmenu = $('#js-mobile-menu-button');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if (!topmenu.is(e.target) && topmenu.has(e.target).length === 0) {
        $("#js-mobile-menu-content").hide('slow');
      }
    }
  });
  //мобильное меню end

  //навигация с главного меню start

  $('a.page-scroll').bind('click', function (e) {
    e.preventDefault();
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top - 70
    }, 1500, 'easeInOutExpo');
  });

  // $('li>a.page-scroll').click(function (e) {
  //   e.preventDefault();
  //   $('li>a.page-scroll').removeClass('active');
  //   $(this).addClass('active');
  // });

  function ScrollView(element) {
    var win = $(window);
    var winTop = win.scrollTop();
    var winBottom = winTop + win.height();
    var elementTop = element.offset().top;
    var elementBottom = elementTop + element.height();

    if ((elementBottom <= winBottom) && (elementTop >= winTop)) {
      return true;
    }
    return false;
  }

  $(window).scroll(function () {
    $("section").each(function () {
      if (ScrollView($(this))) {
        var id = $(this).attr("id");
        $("li>a.page-scroll").removeClass("active");
        $("li>a.page-scroll[href='#" + id + "']").addClass("active");
      }
    });
  });

  //навигация с главного меню end

  //поп-ап мобильного меню start

  $('#js-subheader-chevron-down').on('click', function (e) {
    e.preventDefault();
    $('#js-subheader-popup-content').toggle('slow');
  });

  $(document).click(function (e) {
    var container = $("#js-subheader-popup-content");
    var topmenu = $('#js-subheader-chevron-down');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if (!topmenu.is(e.target) && topmenu.has(e.target).length === 0) {
        $("#js-subheader-popup-content").hide('slow');
      }
    }
  });

  //поп-ап мобильного меню end

  //анимация прои скролле start

  function onScrollInit(items) {
    items.each(function () {
      var osElement = $(this),
        osAnimationClass = osElement.attr('data-os-animation'),
        osAnimationDelay = osElement.attr('data-os-animation-delay');
      osAnimationDuration = osElement.attr('data-os-animation-duration');
      osElement.css({
        '-webkit-animation-delay': osAnimationDelay,
        '-moz-animation-delay': osAnimationDelay,
        'animation-delay': osAnimationDelay,
        '-webkit-animation-duration': osAnimationDuration,
        '-moz-animation-duration': osAnimationDuration,
        'animation-duration': osAnimationDuration
      });
      osElement.waypoint(function () {
        osElement.addClass('animated').addClass(osAnimationClass);
      }, {
        triggerOnce: true,
        offset: '90%'
      });
    });
  }

  onScrollInit($('.js-os-animation'));
  if (window.innerWidth >= 992) {
    onScrollInit($('.js-os-animation-lg-only'));
  }

  //анимация прои скролле end

  // секция категории start

  $('.js-category-selector').click(function (e) {
    e.preventDefault();
    var categoryData = $(this).data('category');
    var currentActiveLink = $('.js-category-selector.active').first();
    $(this).addClass('active');
    $(currentActiveLink).removeClass('active');
    $('.js-category-content.active').removeClass('active');
    $('.js-category-content[data-category=' + categoryData + ']').addClass('active');
  });



  function detailsSliderInit() {
    if (window.innerWidth <= 992) {
      $('#js-details-slider-md').not('.slick-initialized').slick({
        infinite: true,
        slidesToShow: 2,
        arrows: false,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 550,
          settings: {
            slidesToShow: 1
          }
        }]
      });
    } else {
      $('#js-details-slider-md.slick-initialized').slick('unslick');
    }
  }

  detailsSliderInit();
  $(window).on('resize', detailsSliderInit);

  $('#js-details-slider-prev').click(function (e) {
    e.preventDefault();
    $('#js-details-slider-md').slick('slickPrev');
  });
  $('#js-details-slider-next').click(function (e) {
    e.preventDefault();
    $('#js-details-slider-md').slick('slickNext');
  });

  // секция категории end

  //секция сертификаты start

  $('#js-sertificates-slider').not('.slick-initialized').slick({
    infinite: true,
    slidesToShow: 3,
    arrows: false,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $('#js-sertificates-slider-prev').click(function (e) {
    e.preventDefault();
    $('#js-sertificates-slider').slick('slickPrev');
  });
  $('#js-sertificates-slider-next').click(function (e) {
    e.preventDefault();
    $('#js-sertificates-slider').slick('slickNext');
  });
  //секция сертификаты end


});