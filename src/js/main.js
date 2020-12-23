$(document).ready(function () {
  new fullpage('#fullPage', {
    autoScrolling: true,
    anchors: ['section1', 'section2', 'section3'],
    setMouseWheelScrolling: false,
  });

  $(".slider").slick({
    arrows: true,
  });
});


