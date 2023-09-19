$('#vote-button').on('click', function () {
  fetch(`/increment-vote/${$(this).attr('dbid')}`)
    .then((response) => response.text())
    .then((data) => {
      console.log(data); // Output: "Incrementing data for ID: 123"
    })
    .catch((error) => {
      console.error(error);
    });
  window.location.href = '/confirmed';
});
