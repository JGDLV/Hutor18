// let headerHeight = $('.header').innerHeight();

// function footerFix() {
// headerHeight = $('.header').innerHeight();
// let footerHeight = $('.footer').innerHeight();
// $('body').css('padding-bottom', footerHeight + 'px');
// }

// $(window).on('load resize', footerFix);

$(document).ready(function () {

  $('form').each(function () {
    const form = $(this);
    const fileInput = $(this).find('input[type="file"]');
    const fileSpan = $(this).find('input[type="file"] ~ span');
    const fileText = 'Прикрепить файл';
    const phone = $(this).find('input[name*="phone"]');
    const privacyLabel = $(this).find('label[class*="privacy"]');
    const privacyInput = privacyLabel.find('input');

    privacyLabel.on('click', function () {
      if (privacyInput.attr('type') == 'checkbox') {
        privacyInput.is(':checked')
          ? privacyLabel.addClass('active')
          : privacyLabel.removeClass('active');
      } else if (privacyInput.attr('type') == 'radio') {
        privacyInput.is(':checked')
          ? (privacyLabel.siblings().removeClass('active'), privacyLabel.addClass('active'))
          : privacyLabel.removeClass('active');
      }
    });

    phone.each(function () {
      $(this).inputmask("+7 (999) 999-99-99");
    });

    fileInput.on('change', function () {
      const fileVal = $(this).val().replace(/.+[\\\/]/, '');
      fileVal !== '' ? fileSpan.text(fileVal) : fileSpan.text(fileText);
    });

    form.on('submit', function () {
      fileSpan.text(fileText);
      privacyLabel.removeClass('active');
    });
  });

  $(window).scroll(function () {
    $(this).scrollTop() > 600
      ? $('#top').addClass('active')
      : $('#top').removeClass('active');
  });

  $('#top').click(function () {
    $('body, html').animate({ scrollTop: 0 }, 500);
  });

  $('a[href="#callback"], a[href="#excursion"]').magnificPopup({
    type: 'inline',
    removalDelay: 300,
    mainClass: 'mfp-fade',
  });

  $('.photos .tabs__content').each(function () {
    $(this).magnificPopup({
      delegate: 'a',
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-fade',
      gallery: {
        enabled: true
      }
    });
  });

  $(document).on('click', '.goto', function (event) {
    event.preventDefault();
    let id = $(this).attr('href');
    let top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 500);
  });

  $(".tabs").each(function () {
    let tabs = $(this);
    let tabsControls = tabs.find('.tabs__control');
    let tabsContents = tabs.find('.tabs__content');
    $(tabsContents).not(tabsContents[0]).css('display', 'none');
    $(tabsControls[0]).addClass('active');
    $(tabsControls).click(function (event) {
      event.preventDefault();
      tabsControls.removeClass('active');
      $(this).addClass('active');
      let index = $(this).index();
      tabsContents.css('display', 'none');
      tabsContents.eq(index).fadeIn(400);
    });
  });

  $('.accordion').each(function () {
    const $this = $(this);
    const head = $this.find('*[class*="head"]');
    const body = $this.find('*[class*="body"]');

    head.on('click', function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).next(body).slideUp(200);
      } else {
        head.removeClass('active');
        body.slideUp(200);
        $(this).addClass('active');
        $(this).next(body).slideDown(200);
      }
    });
  });

  // $('.menu').append('<div class="menu__hover"></div>');

  $('.menu__item').on('mouseover', function () {
    let pseudoWidth = $(this).innerWidth();
    let pseudoHeight = $(this).innerHeight();
    let pseudoOffsetLeft = $(this).position().left;
    let pseudoOffsetTop = $(this).position().top;
    $('.menu__hover').css({
      'width': pseudoWidth + 'px',
      'height': pseudoHeight + 'px',
      'left': pseudoOffsetLeft + 'px',
      'top': pseudoOffsetTop + 'px',
      'opacity': 1,
    });
  });

  $('.menu__item').on('mouseout', function () {
    $('.menu__hover').css('opacity', '0');
  });

  $('.reviews-items').owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    navText: ["<i class='fas fa-chevron-left'>", "<i class='fas fa-chevron-right'>"],
    dots: false,
    items: 2,
    responsive: {
      0: {
        items: 1,
        autoHeight: true
      },
      880: {
        items: 2,
      }
    }
  });

  // wow = new WOW(
  //   {
  //     boxClass: 'wow',
  //     animateClass: 'animated',
  //     offset: 0,
  //     mobile: true,
  //     live: true
  //   }
  // );
  // wow.init();

  const mobileMenu = `
    <div class="menu-toggle">
      <i class="icon-toggle">
        <span></span>
        <span></span>
        <span></span>
      </i>
    </div>`

  $(window).on('load resize', function () {
    if ($(window).width() < 768 && $('.menu-toggle').length === 0) {
      $('.header-top__inner').append(mobileMenu);
    } else if ($(window).width() > 768 && $('.menu-toggle').length === 1) {
      $('.menu-toggle').remove();
    }

    $(window).width() < 768
      ? $('body').addClass('mobile')
      : $('body').removeClass('mobile');
  });

  $(document).on('click', '.menu-toggle .icon-toggle', function () {
    $(this).toggleClass('active');
    $('.menu').toggleClass('active');
  });

});
