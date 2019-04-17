$(document).ready(function () {
  $('#textAreaMain').on('input', function () {
    var value = $(this).val().length
    $(this).siblings('.counter').text(140 - value);

    if ($(this).val().length > 140) {
      $(this).siblings('.counter').addClass('redText');
    } else {
      $(this).siblings('.counter').removeClass('redText');
    }
  })
});
