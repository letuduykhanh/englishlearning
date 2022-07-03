import { timeToSeconds, video } from '../player';
import { classes } from '../classes';
import { disblePrevNextButtons, enableRepeatButton } from './controls';

var isAutoScroll = true;
var isHideCaptions = false;
var isClosed = false;

var videoController;
var mainCaption;

var captionContainer;
var scrollList;

var captionList;
var captions;
var playButtons;
var captionTexts;
var currentButton;

const clearCaptions = () => {
  captions.forEach((caption, index) => {
    caption.classList.remove(...classes.captionBackground);
    playButtons[index].classList.add(classes.circlePlay);
    playButtons[index].classList.remove(...classes.circlePauseInverse);
    captionTexts[index].classList.remove(...classes.captionText);
  });
};

const colorCaption = (caption, text) => {
  clearCaptions();
  caption.classList.add(...classes.captionBackground);
  currentButton.classList.add(...classes.circlePauseInverse);
  currentButton.classList.remove(classes.circlePlay);
  text.classList.add(...classes.captionText);
};

const setMainCaption = (text) => {
  mainCaption.textContent = text;
};

const toggleCaptions = () => {
  isHideCaptions = !isHideCaptions;
  captionList.classList.toggle(classes.noneDisplay);
  mainCaption.classList.toggle(classes.noneDisplay);

  return isHideCaptions;
};

const setCurrentButtonState = (state) => {
  const { PLAYING, PAUSED, ENDED } = video.states;

  if (state === PLAYING) {
    currentButton?.classList.add(classes.circlePause);
    currentButton?.classList.remove(classes.circlePlay);
  }

  if (state === PAUSED || state === ENDED) {
    currentButton?.classList.add(classes.circlePlay);
    currentButton?.classList.remove(classes.circlePause);
  }
};

const scrollToCaption = (caption) => {
  if (!isAutoScroll) return null;

  caption?.previousElementSibling?.scrollIntoView({ behavior: 'smooth' });
};

const selectCaption = (caption, button, captionText) => {
  currentButton = button;

  setMainCaption(captionText.textContent);
  colorCaption(caption, captionText);
  scrollToCaption(caption);
};

const autoSelectCaption = ({ isRepeat }) => {
  if (playButtons.length === 0 || isRepeat || isHideCaptions) return null;

  playButtons.forEach((playButton, index) => {
    var data = playButton.dataset;
    var startSeconds = timeToSeconds(data.start);
    var endSeconds = timeToSeconds(data.end);
    var currentTime = video.currentTime();

    if (
      startSeconds !== video.info.startSecond &&
      currentTime >= startSeconds &&
      currentTime <= endSeconds
    ) {
      currentButton = playButton;

      disblePrevNextButtons(playButtons, currentButton);
      selectCaption(captions[index], currentButton, captionTexts[index]);
      video.setTime(startSeconds, endSeconds);
      enableRepeatButton();
    }
  });
};

document.addEventListener('render_async_load', () => {
  videoController = document.querySelector('.video-controller');
  mainCaption = videoController.querySelector('.card-text');

  captionContainer = document.querySelector('.caption-container');
  scrollList = captionContainer.querySelector('.card-body');

  captionList = scrollList.querySelector('.caption-list');
  captions = captionList.querySelectorAll('.caption');
  playButtons = captionList.querySelectorAll(classes.btnPlay);
  captionTexts = captionList.querySelectorAll('.caption > p');

  video.setCallBacks(autoSelectCaption);
  video.setCallBacks(setCurrentButtonState, 'state');

  playButtons.forEach((playButton) => {
    playButton.addEventListener('click', (event) => {
      if (currentButton === event.currentTarget) {
        return video.getPlayerState() === video.states.PLAYING
          ? video.pause()
          : video.play();
      }

      video.resetInterval();
      currentButton = event.currentTarget;
      const data = currentButton.dataset;
      const startSeconds = timeToSeconds(data.start);
      const endSeconds = timeToSeconds(data.end);

      disblePrevNextButtons(playButtons, currentButton);
      selectCaption(
        currentButton.parentElement,
        currentButton,
        currentButton.nextElementSibling
      );

      video.setTime(startSeconds, endSeconds);
      video.seekTo(startSeconds);
    });
  });

  const autoScroll = document.querySelector('#auto-scroll');
  autoScroll.addEventListener('change', (event) => {
    isAutoScroll = event.currentTarget.checked;
  });

  const captionSlash = document.querySelector(
    `${classes.captionButton} > .fa-slash`
  );
  const btnClose = document.querySelector('.btn-close.caption-box');
  btnClose.addEventListener('click', () => {
    isClosed = !isClosed;
    captionContainer.classList.toggle(classes.noneDisplay);
    captionSlash.classList.toggle(classes.noneDisplay);
  });
});

export { toggleCaptions };

// scrollParentToChild = (parentElement, childElement) => {
//   parentRect = parentElement.getBoundingClientRect()
//   childRect = childElement.getBoundingClientRect()
//   visible = (childRect.top > parentRect.top) && (childRect.bottom <= parentRect.top + parentRect.height)
//   if (!visible) {
//     const scrollTop = Math.abs(childRect.top - parentRect.top)
//     const scrollBot = Math.abs(childRect.bottom - parentRect.bottom)
//     if(scrollTop < scrollBot) {
//       parentElement.scrollTop += scrollTop
//     } else {
//       parentElement.scrollTop += scrollBot
//     }
//   }
// }
// scrollList.animate(
//   {
//     scrollTop:
//       // captionList.scrollTop() +
//       caption.position().top - caption.height(),
//   },
//   { duration: 'medium', easing: 'linear' },
//   scrollList.stop()
// );
