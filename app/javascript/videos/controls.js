import { timeToSeconds, video } from './../player';
import { classes } from '../classes';
import { toggleCaptions } from './caption';
import { removeAllPopover } from '../search'

const captionContainer = document.querySelector('.caption-container');
const btnCaption = document.querySelector(classes.captionButton);
const captionSlash = btnCaption?.querySelector('.fa-slash');
const btnPlay = document.querySelector('.btn-play');
const width = 768;

if (window.outerWidth >= width) {
  captionSlash?.classList.add(classes.noneDisplay);
} else {
  captionSlash?.classList.remove(classes.noneDisplay);
  captionContainer?.classList.add(classes.noneDisplay);
}

const setCurrentState = (state) => {
  const { PLAYING, PAUSED, ENDED } = video.states;

  if (state === PLAYING) {
    btnPlay.classList.add(classes.circlePause);
    btnPlay.classList.remove(classes.circlePlay);
  }

  if (state === PAUSED || state === ENDED) {
    btnPlay.classList.add(classes.circlePlay);
    btnPlay.classList.remove(classes.circlePause);
  }
};

const setCaptionContainerHeight = () => {
  if (captionContainer === null) return;

  const navbar = document.querySelector('.menu-bar')
  const main = document.querySelector('.main');
  const videoContainer = document.querySelector('.video-container');

  captionContainer.style.height =
    main.clientHeight -
    parseFloat(window.getComputedStyle(navbar).height) -
    parseFloat(window.getComputedStyle(main).marginTop) -
    videoContainer.clientHeight +
    'px';

  // if (['', '0px'].includes(captionContainer.style.height)) {
  //   captionContainer.classList.remove(classes.noneDisplay);
  //   captionContainer.style.height =
  //     main.clientHeight -
  //     parseFloat(window.getComputedStyle(main).marginTop) -
  //     videoContainer.clientHeight +
  //     'px';
  // } else {
  //   captionContainer.style.height = 0;
  // }
};

document.addEventListener('render_async_load', () => {
  video.setCallBacks(setCurrentState, 'state');
});

document.addEventListener('DOMContentLoaded', () => {
  setCaptionContainerHeight();
});

const btnRepeat = document.querySelector('.btn-repeat');
btnRepeat?.addEventListener('click', (event) => {
  const target = event.currentTarget;
  if (target.classList.contains(classes.disabledGray)) return;

  target.querySelector('.fa-1').classList.toggle(classes.noneDisplay);
  video.toggleRepeat();
});

const btnPrev = document.querySelector('.btn-prev');
btnPrev?.addEventListener('click', (event) => {
  const target = event.currentTarget;
  if (target.classList.contains(classes.disabledGray)) return;

  const prev =
    document.querySelector('.caption.current').previousElementSibling;
  const data = prev.querySelector(classes.btnPlay).dataset;
  const startSeconds = timeToSeconds(data.start);
  video.seekTo(startSeconds);
});

btnPlay?.addEventListener('click', (event) => {
  const target = event.currentTarget;
  if (target.classList.contains(classes.disabled)) return;

  btnPlay.classList.toggle(classes.circlePause);
  btnPlay.classList.toggle(classes.circlePlay);

  if (btnPlay.classList.contains(classes.circlePlay)) {
    video.pause();
  } else {
    video.play();
  }
});

const btnNext = document.querySelector('.btn-next');
btnNext?.addEventListener('click', (event) => {
  const target = event.currentTarget;
  if (target.classList.contains(classes.disabledGray)) return;

  const next = document.querySelector('.caption.current').nextElementSibling;
  const data = next.querySelector(classes.btnPlay).dataset;
  const startSeconds = timeToSeconds(data.start);
  video.seekTo(startSeconds);
});

const btnCaptionToggle = document.querySelector('.btn-caption-toggle');
btnCaptionToggle?.addEventListener('click', (event) => {
  const target = event.currentTarget;
  if (target.classList.contains(classes.disabled)) return;

  target.querySelector('.fa-slash').classList.toggle(classes.noneDisplay);
  toggleCaptions();
});

btnCaption?.addEventListener('click', (event) => {
  const target = event.currentTarget;
  if (target.classList.contains(classes.disabled) || captionContainer === null)
    return;

  captionContainer.classList.toggle(classes.noneDisplay);
  captionSlash.classList.toggle(classes.noneDisplay);
  removeAllPopover();
  // if (window.outerWidth < width) {
  //   setCaptionContainerHeight();
  // } else {
  //   captionContainer.classList.toggle(classes.noneDisplay);
  // }
});

const btnChevronDown = document.querySelector('.btn-chevron-down');
btnChevronDown?.addEventListener('click', () => {
  captionContainer.classList.toggle(classes.noneDisplay);
  captionSlash.classList.toggle(classes.noneDisplay);
  removeAllPopover()
  // captionContainer.style.height = 0;
});

// (document).on('click', '.btn-more', (event) => {
//   const target = (event.target);
//   if (target.hasClass(classes.disabled)) return;

//   console.log('.more-btn');
// });

// (document).on('click', '.btn-speed', (event) => {
//   if ((event.target).hasClass(classes.disabled)) return;

//   console.log('.speed-btn');
// });

const disblePrevNextButtons = (buttons, button) => {
  first = buttons[0];
  last = buttons[buttons.length - 1];

  const btnPrev = document.querySelector('.btn-prev');
  if (button === first) {
    btnPrev.classList.add(classes.disabledGray);
  } else {
    btnPrev.classList.remove(classes.disabledGray);
  }

  const btnNext = document.querySelector('.btn-next');
  if (button === last) {
    btnNext.classList.add(classes.disabledGray);
  } else {
    btnNext.classList.remove(classes.disabledGray);
  }
};

const enableRepeatButton = () => {
  if (btnRepeat.classList.contains(classes.disabledGray)) {
    btnRepeat.classList.remove(classes.disabledGray);
    document.querySelector('.fa-repeat').classList.remove(classes.disabledGray);
  }
};

window.addEventListener('resize', () => {
  if (captionContainer === null) return;

  if (window.outerWidth >= width) {
    captionContainer.style.height = 'auto';
    // captionContainer.classList.remove(classes.noneDisplay);
    // captionSlash.classList.add(classes.noneDisplay);
  } else {
    setCaptionContainerHeight();
    // captionContainer.style.height = 0;
    // captionContainer.classList.add(classes.noneDisplay);
    // captionSlash.classList.remove(classes.noneDisplay);
  }
});

export { disblePrevNextButtons, enableRepeatButton };
