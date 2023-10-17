let selected = '';

$('.vote-card').on('click', function () {
  if (selected) {
    selected.css('background', '');
    selected.css('color', '');
    selected.find('.hint-img').css('filter', '');
  }
  if ($(this).attr('id') == $(selected).attr('id')) {
    $(this).css('background', '');
    $(this).css('color', '');
    $(this).find('.hint-img').css('filter', '');

    $('#vote-button').prop('disabled', true);
    $('#vote-button').css('background', '');
    $('#vote-button').text('Velg et parti');

    selected = '';
  } else {
    $(this).css('background', $(this).css('background'));
    $(this).css('color', $(this).css('color'));
    $(this).find('.hint-img').css('filter', $(this).find('.hint-img').css('filter'));

    $('#vote-button').prop('disabled', false);
    $('#vote-button').css('background', $(this).css('background'));
    $('#vote-button').text('Stem' + $(this).text());
    $('#vote-button').attr('dbid', $(this).attr('dbid'));
    selected = $(this);
  }
});

$('#vote-button').on('click', function () {
  $(this).attr('disabled', 'true');
  $(this).text('Teller stemme...');
  fetch(`/increment-vote/${$(this).attr('dbid')}`)
    .then((response) => {
      if (response.ok) {
        window.location.href = '/confirmed';
      } else {
        console.error('Request failed with status:', response.status);
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
