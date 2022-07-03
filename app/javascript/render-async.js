document.addEventListener('render_async_load', (event) => {
  const placeHolders = document.querySelectorAll('.placeholder');
  Array.from(placeHolders, (element) =>
    element.classList.remove('placeholder')
  );

  const disabled = document.querySelectorAll('.disabled');
  disabled.forEach((element) => element.classList.remove('disabled'));

  console.log(
    'Async partial loaded in this container:',
    event.container
  );
});
