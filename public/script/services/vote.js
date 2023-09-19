$('#vote-button').on('click', function () {
  fetch(`/increment-vote/${$(this).attr('dbid')}`).catch((error) => {
    console.error(error);
  });
  window.location.href = '/confirmed';
});
