$(document).ready(function () {
  $(".js-ajax-test").on("click", function (a) {
    a.preventDefault(),
      $.ajax({
        url: ajax_data.ajax_admin,
        type: "post",
        data: { action: "ajax_action", security: ajax_data.security },
        success: function (a) {
          $(".ajax-load-box").append(a.data.message),
            1 == a.success || a.success;
        },
      });
  });
});
