$(document).ready(function () {
  if (
    $(".nav-fixed[scroll-active]").length &&
    $(".nav-fixed").attr("scroll-active") === "true"
  )
    $(document).on("scroll", onScroll);
  $('.nav-fixed a[href*="#"]').on("click", function () {
    var e = $(this).attr("href");
    var h = $(".nav-fixed").outerHeight();
    var b = $(e).length ? $(e).offset().top : 0;
    $("html, body").animate(
      {
        scrollTop: b + 1 - h,
      },
      500
    );
  });
});

function onScroll() {
  var scroll = $(window).scrollTop();
  var header = $(".nav-fixed").outerHeight();
  $('.nav-fixed a[href^="#"]').each(function () {
    var el = $(this).attr("href");
    var offset = $(el).length ? $(el).offset().top : 0;
    if ($(this).find("img").length) {
      var _src_ = $(this).find("img").attr("src");
      _src_ = _src_.replace(/^(.*?)_on\.(.*)$/, "$1.$2");
      $(this).find("img").attr("src", _src_);
    }
    if (
      scroll + header >= offset &&
      $(el).outerHeight() + offset > scroll + header
    ) {
      $('.nav-fixed a[href^="#"]').removeClass("active");
      $(".nav-fixed a[href]").removeClass("active");
      $(this).addClass("active");
      if ($(this).find("img").length) {
        $('.nav-fixed a[href^="#"] img').addClass("btn");
        $(this).find("img").removeClass("btn");
        $('.nav-fixed a[href^="#"] img').each(function () {
          var src = $(this).attr("src");
          var newSrc = src.replace("_on", "");
          $(this).attr("src", newSrc);
        });

        $(this)
          .find("img")
          .attr("src")
          .match(/^(.*)(\.{1}.*)/g);
        var newSrc = RegExp.$1 + "_on" + RegExp.$2;

        $(this).find("img").attr("src", newSrc); // update src
      }
      // $(this).find('img').trigger('mouseout').trigger('mouseover')
    } else {
      // $(this).removeClass('active');
    }
  });
  //hamburger
  var headerSP = $(".hamburger1").outerHeight();
  $('#menu_toggle_mb ul a[href^="#"]').each(function () {
    var el = $(this).attr("href");
    var offset = $(el).length ? $(el).offset().top : 0;
    if ($(this).find("img").length) {
      var _src_ = $(this).find("img").attr("src");
      _src_ = _src_.replace(/^(.*?)_on\.(.*)$/, "$1.$2");
      $(this).find("img").attr("src", _src_);
    }
    if (
      scroll + headerSP >= offset &&
      $(el).outerHeight() + offset > scroll + headerSP
    ) {
      $('#menu_toggle_mb ul a[href^="#"]').removeClass("active");
      $("#menu_toggle_mb ul a[href]").removeClass("active");
      $(this).addClass("active");
      if ($(this).find("img").length) {
        $('#menu_toggle_mb ul a[href^="#"] img').addClass("btn");
        $(this).find("img").removeClass("btn");
        $('#menu_toggle_mb ul a[href^="#"] img').each(function () {
          var src = $(this).attr("src");
          var newSrc = src.replace("_on", "");
          $(this).attr("src", newSrc);
        });

        $(this)
          .find("img")
          .attr("src")
          .match(/^(.*)(\.{1}.*)/g);
        var newSrc = RegExp.$1 + "_on" + RegExp.$2;

        $(this).find("img").attr("src", newSrc); // update src
      }
      // $(this).find('img').trigger('mouseout').trigger('mouseover')
    } else {
      $(this).removeClass("active");
    }
  });
}

var lastScrollTop = 0;

$(window).scroll(function () {
  var st = $(this).scrollTop();
  if (lastScrollTop != 0) {
    if (st < lastScrollTop) {
      $("#pagetop").addClass("visible");
      if (st < 10) {
        $("#pagetop").removeClass("visible");
      }
    } else if (st > lastScrollTop) {
      $("#pagetop").removeClass("visible");
    }
  }
  lastScrollTop = st;
});

$("body").on("click", "#pagetop", function () {
  if (!$(this).hasClass("in-scroll")) {
    $(this).addClass("in-scroll");

    var $scrollDuration =
      $.inArray($(this).attr("data-duration"), ["slow", "normal", "fast"]) >=
        0 || parseInt($(this).attr("data-duration")) > 0
        ? $(this).attr("data-duration")
        : "slow";

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: 0,
        },
        $scrollDuration,
        function () {
          $("#pagetop").removeClass("in-scroll");
          $("#pagetop").removeClass("visible");
        }
      );
  }
});
// END: scroll to top

//Custom by yyyyyyyyyyyyyyyyyyyyyyy
$(function () {
  $("body").removeClass("navOpen");
  // $(".hamburger1").click(function () {
  //   if ($('body').hasClass('navOpen')) {
  //     $('body').addClass('navClose');
  //     $('body').removeClass('navOpen');
  //     $(".hamburger1").removeClass('is-active');

  //   } else {
  //     $('body').addClass('navOpen');
  //     $('body').removeClass('navClose');

  //     $(".hamburger1").addClass('is-active');
  //   }
  // });

  $(".hamburger1").click(function () {
    if ($("body").hasClass("navOpen")) {
      $("body").addClass("navClose");
      $("body").removeClass("navOpen");
      $("body").css("position", "static");
      $(window).scrollTop(offsetY);
      $(".hamburger1").removeClass("is-active");
    } else {
      $("body").addClass("navOpen");
      $("body").removeClass("navClose");
      offsetY = window.pageYOffset;
      // $('body').css({
      //     position: 'fixed',
      //     width: '100%',
      //     'top': -offsetY + 'px'
      // });
      $(".hamburger1").addClass("is-active");
      return false;
    }
  });

  $(".close_btn,#menu_toggle_mb a").click(function () {
    $("body").removeClass("navOpen");
    $("body").addClass("navClose");
    $("body").css("position", "static");
    $(window).scrollTop(offsetY);
    $(".hamburger1").removeClass("is-active");
  });
});
//fix scroll ios
// var overflowIsHidden = function(node) {
//   var style = getComputedStyle(node);
//   return style.overflow === "hidden" || style.overflowX === "hidden" || style.overflowY === "hidden";
// }
// var isItScrollableWithoutVisibleScrollbars = function(el) {
//   if (el === null) return false;
//   var isScrollable = false,
//       hasScrollbars = false;
//   isScrollable = el.scrollHeight > el.offsetHeight ? true : false; // first, lets find out if it has scrollable content
//   // isScrollable = el.scrollHeight + 1 > el.clientHeight ? true : false; // first, lets find out if it has scrollable content
//   if (isScrollable) hasScrollbars = (el.offsetWidth > el.scrollWidth) ? true : false; // if it's scrollable, let's see if it likely has scrollbars
//   // if (isScrollable) hasScrollbars = (el.offsetWidth > el.scrollWidth - 1) ? true : false; // if it's scrollable, let's see if it likely has scrollbars
//   if (isScrollable && !hasScrollbars && !overflowIsHidden(el)) return true;
//   else return false;
// };
// document.addEventListener("touchmove", function(e) {
//   if (document.body.classList.contains("navOpen") && !isItScrollableWithoutVisibleScrollbars(document.getElementById("menu_toggle"))) e.preventDefault();
// }, {
//   passive: false
// });

// function onScrollSP(event) {
//   var scrollPos = $(document).scrollTop();
//   $('#menu_toggle_mb a').each(function () {
//     var currLink = $(this),
//       tagHrefSharp = currLink.attr("href").replace(/^(.*\..+?)(\#.*?)$/, "$2"),
//       tagHref = currLink.attr("href").replace(/^(.*\..+?)(\#.*?)$/, "$1"),
//       pageHref = location.pathname.replace(/^(.*\/)(.*\..*)$/, "$2"),
//       hrefPage = location.hash;
//     if (tagHref == pageHref || tagHref == "" || tagHref != pageHref) { // inpage
//       if (tagHrefSharp != "" && tagHrefSharp.substr(0, 1) == "#") {
//         var refElement = $(tagHrefSharp),
//           posElement = refElement.offset().top;
//         if (posElement - ($("#menu_toggle_mb").outerHeight() + 1) <= scrollPos && posElement + refElement.outerHeight() - $("#menu_toggle_mb").outerHeight() > scrollPos) {
//           event.preventDefault();
//           $('#menu_toggle_mb a').removeClass("active");
//           currLink.addClass("active");

//         } else if (posElement + refElement.height() - $("#menu_toggle_mb").outerHeight() < scrollPos) {
//           $('#menu_toggle_mb a').removeClass("active");

//         } else {

//         }
//       }
//     }
//   });
// }

//$(window).scroll(function (e) {
//  onScroll(e);
//  onScrollSP(e);
//})

$(document).ready(function () {
  var TargetPos = $("section.block").offset().top;
  $(window).scroll(function () {
    ////console.log(TargetPos);
    var ScrollPos = $(window).scrollTop() + 100;
    if (ScrollPos > TargetPos) {
      // console.log("aaaaaaaaaa");
      $("body").addClass("has_nav");
    } else {
      $("body").removeClass("has_nav");
    }
  });
});

//pagetop
$(document).ready(function () {
  $(window).resize(function () {
    $("#pagetop").css({ bottom: $("#ft_fixed").outerHeight() + 20 });
  });
});

//addclass active navfix and hamburger scroll anchorlink
var navfixActive = $(".nav-fixed a.active");
var hamburgerActiveSP = $("#menu_toggle_mb a.active");
var sliderPos = $(".slider-h").outerHeight();
$(window).scroll(function () {
  if (!$(".nav-fixed").hasClass("fixed")) {
    $(".nav-fixed ul li a").removeClass("active");
    navfixActive.addClass("active");
  }
  //sp
  if (
    $(this).scrollTop() <= sliderPos &&
    !hamburgerActiveSP.hasClass("active") &&
    !$("#menu_toggle_mb a").hasClass("active")
  ) {
    $("#menu_toggle_mb a").removeClass("active");
    hamburgerActiveSP.addClass("active");
  }
});

/*footer copy all */
// $(document).ready(function(){
//   var $copyUl = $('footer .row-ot .menu-ul').clone();
//   $('footer .row-1 .menu-ul-cp').html($copyUl);
// });
