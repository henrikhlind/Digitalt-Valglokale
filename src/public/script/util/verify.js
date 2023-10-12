$('#verify-button').on('click', function () {
  $(this).attr('disabled', 'true');
  window.location.replace('/auth/facebook');
});
