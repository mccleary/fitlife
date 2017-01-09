jQuery(document).ready(function($) {
"use strict";

  // Slicknav
  $('.header nav').slicknav({
    label: 'Menu',
    duration: 200,
    closedSymbol: '&#9658;',
    openedSymbol: '&#9660;',
    closeOnClick: false
  });

  // FlexSlider Main Slider
  $('.slider .container').flexslider({
    animation: 'fade',
    controlNav: true,
    directionNav: false,
    slideshowSpeed: 3600,
    animationSpeed: 2000
  });

  // FlexSlider Quote Slider
  $('.quote .container').flexslider({
    animation: 'fade',
    controlNav: true,
    directionNav: false,
    slideshowSpeed: 3600,
    animationSpeed: 1200
  });

  // FlexSlider Team Members Slider
  $('.team').flexslider({
    animation: 'slide',
    controlNav: true,
    directionNav: false,
    slideshowSpeed: 3000,
    animationSpeed: 1800,
    easing: 'easeOutBack'
  });

  // Menu Scroll
  $('.header nav a').click(function(e) {
    $('.header nav a').removeClass('active');
    $(this).addClass('active');
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 2000);
    e.preventDefault();
  });

  // Scroll to top link
  $('.back-to-top').click(function(e) {
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 1000);
    e.preventDefault();
  });

  // Init Isotope
  var $container = $('.isotope').isotope({
    itemSelector: '.element-item',
    masonry: {
      columnWidth: '.grid-sizer'
    }
  });

  // Change size of item by toggling .gigante
  $container.on( 'click', '.element-item img', function() {
    $(this).parent().toggleClass('gigante');
    $container.isotope('layout');
  });

  // filter functions
  var filterFns = {
  };

  // Bind filter button click
  $('#filters').on( 'click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $container.isotope({ filter: filterValue });
  });

  // Change is-checked class on buttons
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );

    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });

  });

  $('.element-item div a').click(function(e) {
    //console.log('clicked');
    $(this).children().toggleClass('fa-rotate-180');
    $(this).next().slideToggle();

    e.preventDefault();
  });

});
