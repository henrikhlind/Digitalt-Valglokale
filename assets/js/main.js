$('.vote-card').on('click', function () {
  $(this).css('background', $(this).css('background'));
  $(this).css('color', $(this).css('color'));
  $(this).find('.hint-img').css('filter', $(this).find('.hint-img').css('filter'));

  $('#vote-button').prop('disabled', false);
  $('#vote-button').css('background', $(this).css('background'));
  $('#vote-button').text('Stem' + $(this).text());
});
