$('#name-input').on('keyup', function (e) {
  if ($(this).val()) {
    $('#verify-button').prop('disabled', false);
  } else {
    $('#verify-button').prop('disabled', true);
  }
});

$('#verify-button').on('click', function () {
  if ($('#name-input').val()) {
    localStorage.setItem('name', $('#name-input').val());
    window.location = '/vote';
  }
});
