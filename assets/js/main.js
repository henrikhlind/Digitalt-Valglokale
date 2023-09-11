let selected = '';

$('.vote-card').on('click', function () {
  if (!selected && $(this).text() != selected) {
    selected = $(this).text();

    $(this).css('background', $(this).css('background'));
    $(this).css('color', $(this).css('color'));
    $(this).find('.hint-img').css('filter', $(this).find('.hint-img').css('filter'));

    $('#vote-button').prop('disabled', false);
    $('#vote-button').css('background', $(this).css('background'));
    $('#vote-button').text('Stem' + $(this).text());
  } else if ($(this).text() == selected) {
    selected = '';

    $(this).css('background', '');
    $(this).css('color', '');
    $(this).find('.hint-img').css('filter', '');

    $('#vote-button').prop('disabled', true);
    $('#vote-button').css('background', '');
    $('#vote-button').text('Velg et parti');
  }
});

$('#vote-button').on('click', function () {
  window.location.href = './confirmed.html';
});

$('.redirect-button').on('click', function () {
  window.location.href = $(this).attr('loc');
});
