// script.js
// the code can output this variable to be redirected after last step's next
// let qs_app_onboarding_next_url = 'https://devel.ca';
let currentStep = 0;

$(document).ready(function () {
  showStep(currentStep);

  // Keyboard navigation / arrows -> prev/next, esc -> skip
  $(document).keydown(function (e) {
    switch (e.which) {
      case 37: // left arrow key
        $("#qs_app_prev_btn").trigger("click");
        break;

      case 39: // right arrow key
        $("#qs_app_next_btn").trigger("click");
        break;

      case 27: // ESC key
        $("#qs_app_skip_button").trigger("click");
        break;

      default:
        return; // exit this handler for other keys
    }

    e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  $("#qs_app_prev_btn").click(function () {
    currentStep--;
    showStep(currentStep);
  });

  $("#qs_app_next_btn").click(function () {
    currentStep++;
    showStep(currentStep);
  });

  $(".qs_app_skip_button, .qs_app_close_button").click(function () {
    // Check if the redirect URL is defined
    if (
      typeof qs_app_onboarding_next_url !== "undefined" &&
      qs_app_onboarding_next_url !== ""
    ) {
      // Redirect to the given URL
      window.location.href = qs_app_onboarding_next_url;
    } else {
      // Hide the modal
      $("#qs_app_onboarding_modal").hide();
    }
  });

  // To initially show the modal
  $("#qs_app_onboarding_modal").show();

  $(".qs_app_step_nav").click(function () {
    let selectedStep = $(this).data("step");
    showStep(selectedStep);
  });

  $(".qs_app_step_nav").click(function () {
    let selectedStep = $(this).data("step");
    showStep(selectedStep);
  });

  // Call this function on initial load and whenever the window is resized
  // adjustModalHeight();
  // $(window).resize(adjustModalHeight);
});

function showStep(n) {
  let steps = $(".qs_app_step");
  let stepNavs = $(".qs_app_step_nav");

  console.log("showStep: " + n);

  // Make 'Previous' button invisible if on the first step
  if (n <= 0) {
    n = 0;
    $("#qs_app_prev_btn").css("visibility", "hidden");
  } else {
    $("#qs_app_prev_btn").css("visibility", "visible");
  }

  // Check if it's the last step
  if (n >= steps.length) {
    // Optional: Close the modal if it's the last step
    // Check if the redirect URL is defined
    if (
      typeof qs_app_onboarding_next_url !== "undefined" &&
      qs_app_onboarding_next_url !== ""
    ) {
      // Redirect to the given URL
      window.location.href = qs_app_onboarding_next_url;
    } else {
      // Hide the modal if it's the last step
      $("#qs_app_onboarding_modal").hide();
    }

    n = steps.length;
    return;
  }

  // Update steps and navigation indicators
  steps.removeClass("active").eq(n).addClass("active");
  stepNavs.removeClass("active").eq(n).addClass("active");

  currentStep = n;

  // Scroll to the top of the modal body
  $(".qs_app_modal_body").scrollTop(0);
}

function adjustModalHeight() {
  let maxHeight = 0;

  $(".qs_app_step").each(function () {
    maxHeight = Math.max(maxHeight, $(this).outerHeight());
  });

  // at least 100px height
  maxHeight = maxHeight <= 100 ? 100 : maxHeight;

  $(".qs_app_modal_body").css("min-height", maxHeight + "px");
}
