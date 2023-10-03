$(".slider-h").slick({
  dots: false,
  arrows: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 1000,
  fade: true,
  pauseOnHover: false,
});
$(".slider-popup").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  swipe: false,
  asNavFor: ".slider-dots",
});
$(".slider-dots").slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  appendDots: $(".appendDots"),
  asNavFor: ".slider-popup",
  swipe: false,
  dots: true,
  arrows: true,
  centerMode: true,
  focusOnSelect: true,
  initialSlide: 2,
});

$("#collection .row-04 .slider-fade").click(() => {
  $(".slider-dots").slick("refresh");
});

$(".slider-h").on("touchstart", function () {
  $(this).slick("slickPlay");
});
$(function () {
  $("footer input.email").bind("input", function () {
    $(this).val(function (_, v) {
      return v.replace(/\s+/g, "");
    });
  });
});
$("footer p.submit").click(() => {
  if (!$("footer input.email").val()) {
    $("footer .required:not(.disable-email)").removeClass("disable");
  } else {
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (!testEmail.test($("footer input.email").val())) {
      $("footer .required.disable-email").removeClass("disable");
      return;
    }
    alert("Subscribe success");
    $("footer input.email").val("");
    $("footer .required").addClass("disable");
  }
});
$("footer input.email").blur(function () {
  $("footer .required").addClass("disable");
});

var quantity = +$("#popup p.btn-quantity .total").text();
$("#popup p.btn-quantity .minus").click(() => {
  if (quantity <= 1) return;
  $("#popup p.btn-quantity .total").html(--quantity);
});
$("#popup p.btn-quantity .plus").click(() => {
  $("#popup p.btn-quantity .total").html(++quantity);
});
$("#popup .btn-buy").click((e) => {
  e.preventDefault();
  alert("Order success");
});
