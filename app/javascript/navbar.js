import { classes } from './classes';

document.addEventListener('turbo:load', () => {
  const search = document.querySelector("input[type='search']");
  const dropdownMenu = document.querySelector('.search .dropdown-menu');

  search.addEventListener('focusin', () => {
    dropdownMenu?.classList?.add('show');
    document.body.insertAdjacentHTML('beforeend', `<div class='${classes.modalBackdrop} fade show'></div>`);
  });

  search.addEventListener('focusout', () => {
    dropdownMenu?.classList?.remove('show');
    document.getElementsByClassName(classes.modalBackdrop)[0]?.remove()
  });
});