$(document).ready(function () {
//completely unnecessary dropdown weirdness in about
  shakeToCorrect = (theSelect) => {
    triggerReally = () => {
      $(theSelect).prop('disabled', 'disabled');
      strikes = 0;
      outs++;
      switch (outs) {
        case 1:
          break;
        case 2:
          $(".really").addClass("secondDegree").text("really?!");
          break;
        case 3:
          $(".really").addClass("thirdDegree").text("REALLy?!!!!");
          outs = 0;
          break;
      }
      reallyOpacity = new TimelineLite();
      reallyOpacity.to('.really', 1.5, { opacity: 1 });
      reallyOpacity.to('.really', .5, { opacity: 0 });
    }
    theScale = strikes * 24;
    tl = new TimelineLite();
    tl.to(".infoSection", .1, { "left": theScale + "px" });
    tl.to(".infoSection", .1, { "left": "-" + theScale + "px" });
    tl.to(".infoSection", .1, { "left": "0px", onComplete: function () { $(theSelect).val("correct"); $(theSelect).css({ 'background-color': 'green', "color": "black" }); } });
    if (strikes === 3) {
      triggerReally();
    }

  }
  strikes = 0;
  outs = 0;
  $(".infoSection select").change(function () {
    let theVal = $(this).val();
    if (theVal === "correct") {
      $(this).css("background-color", "green");
    } else {
      strikes++;
      $(this).css("background-color", "red");
      shakeToCorrect(this);
    }
  });

//experience revealables
  $(".revealToggle").click(function () {
    if (!$(".revealableSections").hasClass("activated")) {
      function adjustOtherRevealables() {
        $(".revealableSections").addClass("activated").css("display", "block");
        $(".revealableButtons").css("margin-right", "0%");
      }
      revealableTl = new TimelineLite();
      revealableTl.to(".revealableButtons", .3, { "margin-left": "0%", onComplete: adjustOtherRevealables });
    }
      $(".revealable").removeClass("active");
      dataToggle = $(this).data("toggle");
      $("." + dataToggle).addClass("active");
  });
//anchor animation from top
  $(".nav-link").click(function () {
    theId = $(this).data("anchor");
    TweenLite.to(window, .2, { scrollTo: { y: theId, offsetY: 58 } });
    if($(".navbar-collapse").hasClass("show")){
      $('#navbarSupportedContent').collapse('hide');
    }
  });

});
