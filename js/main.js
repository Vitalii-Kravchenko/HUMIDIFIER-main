$(document).ready(function() {


  // Зацикливание галлереи fancybox

  $("[data-fancybox]").fancybox({
    loop: true
  });


  // Плавный скролл
  
  if ($(window).width() > 992) {
    $('.smooth-scroll').on('click', function (e) {
      e.preventDefault();
      smoothScroll('product-card', 120);
    });
  } else {
    $('.smooth-scroll').on('click', function (e) {
      e.preventDefault();
      smoothScroll('product-form', ($(window).height() - 300));
    });
  }

  function smoothScroll(classOfName, topSmooth) {
    $('html, body').animate({
      scrollTop: $("." + classOfName).offset().top - topSmooth
    }, 1500);
  }


  // Добавление нуля, если число < 10

  function addZero(num) {
    return (num > 9) ? num : '0' + num;
  }


  // Динамическая дата, от сегодняшней + 2 дня с добавлением нулей, если день или месяц меньше 10

  function addDays(days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }

  function removeDays(days) {
    var result = new Date();
    result.setDate(result.getDate() - days);
    return result;
  }

  $('.date-from').text(addZero(removeDays(2).getDate()) + '.' + (addZero(removeDays(2).getMonth() + 1)) + '.' + (removeDays(2).getFullYear()));

  $('.date-to').text(addZero(addDays(2).getDate()) + '.' + (addZero(addDays(2).getMonth() + 1)) + '.' + (addDays(2).getFullYear()));


  // Скрытие модалки с отзывом, после нажатия кнопки отправить

  $.fancybox.defaults.closeExisting = true;


  // Отключение возвращения fancybox картинки при выходе

  $.fancybox.defaults.backFocus = false;


  // Инициальизация библиотеки с анимацияи

  // AOS.init();


  // Добавление видео ри клике на кноку Play в секции 'about'

  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  $('.about-video').on('click', function onYouTubeIframeAPIReady() {
    var dataVideo = $(this).data("video");
    player = new YT.Player('player', {
      videoId: dataVideo,
      events: {
        'onReady': videoPlay,
      }
    });
  });

  function videoPlay(e) {
    e.target.playVideo();
  }
  

  // Ховер эффект в секции 'about' -video

  $('.about-video').on('mouseenter', function() {
    $('.about-video__button-play').addClass('about-video__button-play--active');

    $('.about-video').addClass('about-video--active');
  });

  $('.about-video').on('mouseleave', function() {
    $('.about-video__button-play').removeClass('about-video__button-play--active');

    $('.about-video').removeClass('about-video--active');
  });


  // Слайдер в секции 'gallery'

  const gallerySwiper = new Swiper('.gallery-swiper', {
    loop: true,
    spaceBetween: 15,
    slidesPerView: 'auto',
    centeredSlides: true,
  });


  // Ховер эффект в секции 'gallary'

  $('.gallery-swiper__slide').on('mouseenter', function() {
    $(this).addClass('gallery-swiper__slide--active');
    $(this).children('.gallery-swiper__slide-loupe').addClass('gallery-swiper__slide-loupe--active');
  });

  $('.gallery-swiper__slide').on('mouseleave', function() {
    $(this).removeClass('gallery-swiper__slide--active');
    $(this).children('.gallery-swiper__slide-loupe').removeClass('gallery-swiper__slide-loupe--active');
  });


  // Слайдер в секции 'product'

  const prodcutSwiper = new Swiper('.product-swiper', {
    loop: true,
    spaceBetween: 50,

    pagination: {
      el: '.product-swiper__pagination',
      clickable: true,
    },
  });


  // Переключение цветов в секции 'product'

  $('.product-card__color').on('click', function() {
    const color = $(this).attr('data-color');

    $(this).parents('.product-card__colors').find('.product-card__color-check').each(function(i, key) {
      $(key).removeClass('product-card__color-check--active');
      
      if ($(key).attr('data-color') == color) {      
        $(key).addClass('product-card__color-check--active');
      }
    });

    $('.product-swiper').each(function(i, key) {
      $(key).addClass('product-swiper--hidden');

      if($(key).attr('data-color') == color) {
        $(key).removeClass('product-swiper--hidden');
      }
    });

    $('.product-form').attr('data-color', color);
  });

  setTimeout(function() {
    $('.product-swiper--position').addClass('product-swiper--hidden');
    $('.product-swiper--position').removeClass('product-swiper--position');
  }, 300);


  // Слайдер в секции 'feedback'

  const feedbackSwiper = new Swiper('.feedback-swiper', {
    loop: true,
    spaceBetween: 50,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 500,
    effect: 'coverflow',
    autoHeight: true,
    coverflowEffect: {
      rotate: 0,
      slideShadows: false,
    },
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 'auto',
      },
      992: {
        slidesPerView: 1,
      }
    }

  });
});