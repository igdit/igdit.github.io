$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, e) {
          e.preventDefault();
          $form.hide();
          $('#contactFormSuccess').html('<div class="alert alert-info"><i class="fa fa-cog fa-spin"></i>Sending your inquiry...</div>');
          setTimeout(function() {
            $.ajax({
              method: "POST",
              url: "http://formspree.io/contact@igdit.com",
              data: $form.serialize(),
              dataType: "json",
              success: function() {
                  $('#contactFormSuccess').html("<div class='alert alert-success'><i class='fa fa-smile-o'></i>Thanks! We'll be in touch with you shortly.");
              },
              error: function(jqxhr, status, errorThrown) {
                  $('#contactFormSuccess').html("<div class='alert alert-danger'><i class='fa fa-frown-o'></i>Something went wrong. Please try again later, or reach us directly at <a href='mailto:contact@igdit.com'>contact@igdit.com</a>.</div>");
                  $form.show();
              }
            })
          }, 1000);
        },
        filter: function() {
            return $(this).is(":visible");
        }
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
