
const scriptURL = 'https://script.google.com/macros/s/AKfycbzA6Zw7KgVPq40DeT2_GJWqI0aMgAQN50HEEFkWVFwF6DmxzeNiDw0VUqmckp4GM230ow/exec';
const form = document.forms['contact-form'];


form.addEventListener('submit', e => {
  e.preventDefault();

 
  document.getElementById('rendering').style.display="block";

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      alert("Thank you! Your response has been submitted Successfully.Click ok to complete");
      window.location.reload(); 
    })
    .catch(error => console.error('Error!', error.message));
});