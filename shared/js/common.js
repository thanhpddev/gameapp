$(document).ready(function () {
  // BEGIN: tabs - switch
  if ($(".tabs-switch").length) {
    $(".tabs-switch").each(function () {
      var $tabsSwitch = $(this),
        $tabLink = $tabsSwitch.find(".tab-link"),
        $tabContent = $tabsSwitch.find(".tab-content");

      $tabLink.children().each(function () {
        if (
          $(this).find("img").length > 0 &&
          $(this).find("img").hasClass("btn")
        ) {
          $(this).data("src", $(this).find("img").attr("src"));

          $(this)
            .find("img")
            .attr("src")
            .match(/^(.*)(\.{1}.*)/g);
          $(this).data("active", RegExp.$1 + "_on" + RegExp.$2);
        }
      });

      $tabContent.children().hide();

      if (!$tabsSwitch.hasClass("stop")) {
        $tabLink.each(function () {
          // TODO: active by [data-active]
          var hash = window.location.hash || location.hash;
          if (hash) {
            if ($(this).children("[data-tab-anchor='" + hash + "']").length)
              $(this)
                .children("[data-tab-anchor='" + hash + "']")
                .addClass("active");
            else $(this).children().first().addClass("active");
          } else if (!$(this).children(".active").length) $(this).children().first().addClass("active");

          $(this)
            .children(".active")
            .find("img")
            .attr("src", $(this).children(".active").data("active"))
            .removeClass("btn");
        });

        if ($tabLink.children(".active").hasClass("all"))
          $tabContent.children().show();
        else
          $tabContent
            .children()
            .eq($tabLink.children(".active").index())
            .show();
      }

      if ($(".bx-wrapper").length > 0) $(window).trigger("resize");
    });

    $("body").on("click", ".tabs-switch-close", function () {
      var $content = $(this).parents(".tab-content").first(),
        $switch = $(this).parents(".tabs-switch").first();

      if ($content.length > 0 && $switch.length > 0) {
        var $tabMode =
            $.inArray($switch.attr("data"), ["fade", "slide", "block"]) >= 0
              ? $switch.attr("data")
              : "block",
          $tabDuration = $switch.attr("data-duration")
            ? parseInt($switch.attr("data-duration"))
            : 300;

        if ($tabMode == "fade")
          $content.children().stop().fadeOut($tabDuration);
        else if ($tabMode == "slide")
          $content.children().stop().slideUp($tabDuration);
        else $content.children().stop().hide($tabDuration);
      }
    });

    $("body").on("click", ".tab-link .tab-item, .tab-link > *", function () {
      var $itemMode = $(this).hasClass("tab-item"),
        $this = $itemMode ? $(this, ".tab-item") : $(this),
        $idxAll =
          $this.parents(".tab-link").first().children(".all").length > 0
            ? $this.parents(".tab-link").first().children(".all").index()
            : false,
        $idx = $itemMode
          ? $this.parents(".tab-link").first().find(".tab-item").index($this)
          : $this.parents(".tab-link").first().children().index($this),
        $act = $itemMode
          ? $this.parents(".tab-link").first().find(".tab-item.active")
          : $this.parents(".tab-link").first().children(".active"),
        $tabMode =
          $.inArray($this.parents(".tabs-switch").first().attr("data"), [
            "fade",
            "slide",
            "block",
          ]) >= 0
            ? $this.parents(".tabs-switch").first().attr("data")
            : "block",
        $tabDuration = $this
          .parents(".tabs-switch")
          .first()
          .attr("data-duration")
          ? parseInt(
              $this.parents(".tabs-switch").first().attr("data-duration")
            )
          : 300,
        $tabContent = $this
          .parents(".tabs-switch")
          .first()
          .children(".tab-content"),
        $tabIdx = $this.attr("data-active") ? $this.attr("data-active") : false,
        $autoScroll =
          $.inArray($this.parents(".tabs-switch").first().attr("data-scroll"), [
            "true",
            "on",
            "enable",
            "enabled",
            "1",
          ]) >= 0
            ? true
            : false,
        $itself =
          $.inArray($this.parents(".tabs-switch").first().attr("data-toggle"), [
            "true",
            "on",
            "enable",
            "enabled",
            "1",
          ]) >= 0 && $this.hasClass("active")
            ? true
            : false,
        $itHide = $tabContent.children().eq($idx).is(":hidden");

      if ($tabIdx) {
        $this
          .parents(".tabs-switch")
          .first()
          .find(".tab-link")
          .each(function () {
            var $tabBtn = $itemMode
                ? $(this).find(".tab-item[data-active='" + $tabIdx + "']")
                : $(this).children("[data-active='" + $tabIdx + "']"),
              $elmActive = $itemMode
                ? $(this).find(".tab-item.active")
                : $(this).children(".active");

            $elmActive.find("img").attr("src", $elmActive.data("src"));
            $elmActive.removeClass("active");

            if ($itself) {
              if ($itHide) $tabBtn.addClass("active");
              else $tabBtn.removeClass("active");
            } else $tabBtn.addClass("active");

            // if (!$tabBtn.find("img").hasClass("active")) $tabBtn.find("img").attr("src", $tabBtn.data("active"));
            if ($tabBtn.find("img").hasClass("btn"))
              $tabBtn
                .find("img")
                .attr("src", $tabBtn.data("active"))
                .removeClass("btn");
          });
      } else {
        if (/^(.*?)_on\.(.*?)$/.test($act.find("img").attr("src")))
          $act.find("img").addClass("btn");

        $act.find("img").attr("src", $act.data("src"));
        $act.removeClass("active");

        if ($itself) {
          if ($itHide) $this.addClass("active");
          else $this.removeClass("active");
        } else $this.addClass("active");

        // if (!$this.find("img").hasClass("active")) $this.find("img").attr("src", $this.data("active"));
        if ($this.find("img").hasClass("btn"))
          $this
            .find("img")
            .attr("src", $this.data("active"))
            .removeClass("btn");
      }

      if (!$this.parents(".tab-link").first().hasClass("clicked")) {
        $this.parents(".tab-link").first().addClass("clicked");

        if ($this.hasClass("all")) {
          if ($tabMode == "fade") {
            $tabContent
              .children()
              .stop()
              .fadeIn($tabDuration, function () {
                $(this).removeAttr("style").show();

                if ($(this).find("[class*=heightLine]").length) heightLine();

                if ($this.children("a").length) $this.children("a").click();

                $tabContent.css({
                  minHeight: "",
                });

                $(window).trigger("resize");

                $this.parents(".tab-link").first().removeClass("clicked");
              });
          } else if ($tabMode == "slide") {
            $tabContent.children().slideDown($tabDuration, function () {
              $(this).removeAttr("style").show();

              if ($(this).find("[class*=heightLine]").length) heightLine();

              if ($this.children("a").length) $this.children("a").click();

              $(window).trigger("resize");

              $this.parents(".tab-link").first().removeClass("clicked");
            });
          } else {
            $tabDuration = $(this)
              .parents(".tabs-switch")
              .first()
              .attr("data-duration")
              ? parseInt(
                  $(this).parents(".tabs-switch").first().attr("data-duration")
                )
              : 0;

            $tabContent
              .children()
              .stop()
              .show($tabDuration, function () {
                $(this).removeAttr("style").show();

                if ($(this).find("[class*=heightLine]").length) heightLine();

                if ($this.children("a").length) $this.children("a").click();

                $(window).trigger("resize");

                $this.parents(".tab-link").first().removeClass("clicked");
              });
          }
        } else {
          if ($idxAll !== false && $idxAll >= 0 && $idx >= $idxAll) $idx -= 1;

          if ($tabMode == "fade") {
            if ($itself) {
              $tabContent
                .children()
                .eq($idx)
                .stop()
                .fadeToggle($tabDuration, function () {
                  if ($itHide) $(this).removeAttr("style").show();
                  else $(this).removeAttr("style").hide();

                  if ($(this).find("[class*=heightLine]").length) heightLine();

                  if ($this.children("a").length) $this.children("a").click();

                  $tabContent.css({
                    minHeight: "",
                  });

                  $(window).trigger("resize");

                  $this.parents(".tab-link").first().removeClass("clicked");
                });
            } else {
              $tabContent.css({
                minHeight: $tabContent.outerHeight(),
              });

              $tabContent
                .children()
                .stop()
                .fadeOut($tabDuration, function () {
                  $(this).removeAttr("style").hide();
                });
              $tabContent
                .children()
                .eq($idx)
                .stop()
                .delay($tabDuration)
                .fadeIn($tabDuration, function () {
                  $(this).removeAttr("style").show();

                  if ($(this).find("[class*=heightLine]").length) heightLine();

                  if ($this.children("a").length) $this.children("a").click();

                  $tabContent.css({
                    minHeight: "",
                  });

                  $(window).trigger("resize");

                  $this.parents(".tab-link").first().removeClass("clicked");
                });
            }
          } else if ($tabMode == "slide") {
            if ($itself) {
              $tabContent
                .children()
                .eq($idx)
                .stop()
                .slideToggle($tabDuration, function () {
                  if ($itHide) $(this).removeAttr("style").show();
                  else $(this).removeAttr("style").hide();

                  if ($(this).find("[class*=heightLine]").length) heightLine();

                  if ($this.children("a").length) $this.children("a").click();

                  $(window).trigger("resize");

                  $this.parents(".tab-link").first().removeClass("clicked");
                });
            } else {
              $tabContent
                .children()
                .stop()
                .slideUp($tabDuration, function () {
                  $(this).removeAttr("style").hide();
                })
                .siblings()
                .eq($idx)
                .stop()
                .slideDown($tabDuration, function () {
                  $(this).removeAttr("style").show();

                  if ($(this).find("[class*=heightLine]").length) heightLine();

                  if ($this.children("a").length) $this.children("a").click();

                  $(window).trigger("resize");

                  $this.parents(".tab-link").first().removeClass("clicked");
                });
            }
          } else {
            $tabDuration = $this
              .parents(".tabs-switch")
              .first()
              .attr("data-duration")
              ? parseInt(
                  $this.parents(".tabs-switch").first().attr("data-duration")
                )
              : 0;

            if ($itself) {
              $tabContent
                .children()
                .eq($idx)
                .stop()
                .toggle($tabDuration, function () {
                  if ($itHide) $(this).removeAttr("style").show();
                  else $(this).removeAttr("style").hide();

                  if ($(this).find("[class*=heightLine]").length) heightLine();

                  if ($this.children("a").length) $this.children("a").click();

                  $(window).trigger("resize");

                  $this.parents(".tab-link").first().removeClass("clicked");
                });
            } else {
              $tabContent
                .children()
                .stop()
                .hide($tabDuration, function () {
                  $(this).removeAttr("style").hide();
                })
                .siblings()
                .eq($idx)
                .stop()
                .show($tabDuration, function () {
                  $(this).removeAttr("style").show();

                  if ($(this).find("[class*=heightLine]").length) heightLine();

                  if ($this.children("a").length) $this.children("a").click();

                  $(window).trigger("resize");

                  $this.parents(".tab-link").first().removeClass("clicked");
                });
            }
          }
        }

        setTimeout(function () {
          $this.parents(".tab-link").first().removeClass("clicked");
        }, $tabDuration);

        if ($(".slick-slider").length > 0) {
          $(window).trigger("resize");
        }

        if ($(".bx-wrapper").length > 0) {
          setTimeout(function () {
            $(window).trigger("resize");
          }, 1);
        }

        if ($autoScroll) {
          var $offsetY = $tabContent.offset().top,
            $navOffset = 0;

          if ($(".nav-fixed").length)
            $navOffset =
              typeof $(".nav-fixed").attr("data-height") != "undefined"
                ? parseInt($(".nav-fixed").attr("data-height"))
                : $(".nav-fixed").outerHeight() - 1;

          if ($(".nav-target").length) {
            if ($(".nav-fixed").length)
              $navOffset =
                typeof $(".nav-fixed").attr("data-height") != "undefined"
                  ? parseInt($(".nav-fixed").attr("data-height"))
                  : $(".nav-fixed").outerHeight() - 1;

            $("html, body")
              .stop()
              .animate(
                {
                  scrollTop: $offsetY - $navOffset + 1,
                },
                500
              );
          } else {
            $("html, body")
              .stop()
              .animate(
                {
                  scrollTop: $offsetY - $navOffset + 1,
                },
                500
              );
          }
        }
      }
    });
  }
  // END: tabs - switch

  $("body").on(
    "click",
    "a[href*='#']:not([href='#']), a[xlink\\:href*='#']:not([xlink\\:href='#'])",
    function (e) {
      var parseURL = function (url) {
          var tag = document.createElement("a");
          tag.href = url;

          return tag;
        },
        parser = null;

      if ($(this).attr("href")) parser = parseURL($(this).attr("href"));
      else if ($(this).attr("xlink:href"))
        parser = parseURL($(this).attr("xlink:href"));

      // .nav-fixed: elm sẽ cố định
      // .nav-target: tọa độ sẽ tính
      // .nav-pin: elm sẽ gắn .fixed
      if (
        parser &&
        location.pathname.replace(/^\//, "") ==
          parser.pathname.replace(/^\//, "") &&
        location.hostname == parser.hostname &&
        !$(this).hasClass("unsmooth")
      ) {
        var _hash_ =
            this.hash || $(this).attr("href") || $(this).attr("xlink:href"),
          ptnHash = /([;?%&,+*~\':"!^$[\]()=>|\/@])/g, // [storage] FCBase.regex.trimHash
          trimHash = _hash_.replace(ptnHash, "\\$1"),
          $anchor = $(trimHash);

        $anchor =
          $anchor.length > 0 ? $anchor : $("[name=" + trimHash.slice(1) + "]");

        if ($anchor.length) {
          e.preventDefault();

          if ($anchor.parents(".tab-content").first().length > 0)
            $anchor = $anchor.parents(".tab-content").first();

          var $offsetY = $anchor.offset().top,
            $navOffset = 0;

          if ($(".nav-fixed").length)
            $navOffset =
              typeof $(".nav-fixed").attr("data-height") != "undefined"
                ? parseInt($(".nav-fixed").attr("data-height"))
                : $(".nav-fixed").outerHeight() - 1;

          if ($(".tabs-switch").length) {
            $(".tabs-switch").each(function () {
              var $tabsSwitch = $(this),
                $tabLink = $tabsSwitch.children(".tab-link");

              if (
                $tabLink.children("[data-tab-anchor='" + trimHash + "']").length
              )
                $tabLink
                  .children("[data-tab-anchor='" + trimHash + "']")
                  .click(); // trigger for set active tab
            });
          }

          if ($(".nav-target").length) {
            // $("html, body").stop().animate({
            // scrollTop: $(".nav-target").offset().top + 10
            // }, 100, function() {
            if ($(".nav-fixed").length)
              $navOffset =
                typeof $(".nav-fixed").attr("data-height") != "undefined"
                  ? parseInt($(".nav-fixed").attr("data-height"))
                  : $(".nav-fixed").outerHeight() - 1;

            $("html, body")
              .stop()
              .animate(
                {
                  scrollTop: $offsetY - $navOffset + 1,
                },
                500
              );
            // });
          } else {
            $("html, body")
              .stop()
              .animate(
                {
                  scrollTop: $offsetY - $navOffset + 1,
                },
                500
              );
          }

          // window.location.hash = trimHash; // update location

          return false;
        } else console.log("[smooth-scroll] Anchor element not found");
      }
    }
  );

  /* fix smoothscroll on IE - jumpy fixed background */

  if (
    navigator.userAgent.match(/MSIE 10/i) ||
    navigator.userAgent.match(/Trident\/7\./) ||
    navigator.userAgent.match(/Edge\/12\./)
  ) {
    $("body.ie-smoothscroll").on("mousewheel", function (e) {
      if (event.preventDefault) event.preventDefault();
      else event.returnValue = false;

      var delta = null,
        offsetX =
          window.scrollX ||
          window.pageXOffset ||
          window.document.documentElement.scrollLeft,
        offsetY =
          window.scrollY ||
          window.pageYOffset ||
          window.document.documentElement.scrollTop;

      if (e.wheelDelta) delta = e.wheelDelta;
      else if (e.originalEvent) {
        if (e.originalEvent.wheelDelta) delta = e.originalEvent.wheelDelta;
        else if (e.originalEvent.deltaY) delta = 0 - e.originalEvent.deltaY;
        else if (e.originalEvent.detail) delta = e.originalEvent.detail * -40;
      } else if (event.originalEvent) {
        if (event.originalEvent.wheelDelta)
          delta = event.originalEvent.wheelDelta;
        else if (event.originalEvent.deltaY)
          delta = 0 - event.originalEvent.deltaY;
        else if (event.originalEvent.detail)
          delta = event.originalEvent.detail * -40;
      }

      if (delta !== null) window.scrollTo(0, offsetY - delta);
    });
  }

  // BEGIN: .pagination
});

$(window).on("scroll resize", function () {
  if ($(".nav-fixed").length) {
    var $navPinY = $(".nav-target").length
      ? $(".nav-target").offset().top - ($(".nav-fixed").outerHeight() - 1) - 1
      : $(".nav-fixed").offset().top;
    if (
      $(this).scrollTop() > $navPinY ||
      ($navPinY < 0 && $(this).scrollTop() > 0)
    ) {
      if ($(".nav-pin").length) $(".nav-pin").addClass("fixed");
      else $(".nav-fixed").addClass("fixed");
    } else {
      if ($(".nav-pin").length) $(".nav-pin").removeClass("fixed");
      else $(".nav-fixed").removeClass("fixed");
    }
  }
});
