$('#phone-input').on('keyup', function (e) {
  if (window.libphonenumber.isValidNumber($(this).val(), 'NO')) {
    $('#verify-button').prop('disabled', false);
  } else {
    $('#verify-button').prop('disabled', true);
  }
});
