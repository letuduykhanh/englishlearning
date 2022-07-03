// Entry point for the build script in your package.json
import '@hotwired/turbo-rails';
import './controllers';
import * as bootstrap from 'bootstrap';
// import * as bootstrap from 'bootstrap';
// import '@fortawesome/fontawesome-free/js/all.min'

import './navbar';
import './player';
import './videos';
import './search';
import './render-async';
import LazyLoad from 'vanilla-lazyload';

// document.addEventListener('DOMContentLoaded', () => {});

document.addEventListener('turbo:load', () => {
  lazyLoadInstance = new LazyLoad();
  lazyLoadInstance.update();

  const placeHolders = document.querySelectorAll('.videos-index .placeholder');
  Array.from(placeHolders, (element) =>
    element.classList.remove('placeholder')
  );

  const toolTips = document.querySelectorAll("[data-bs-toggle='tooltip']");
  toolTips.forEach((element) => new bootstrap.Tooltip(element));
});
