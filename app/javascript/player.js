var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
tag.setAttribute('data-turbo-track', 'reload');
tag.setAttribute('defer', 'defer');

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const videoId = document.getElementById('youtube')?.dataset.videoid;

const timeToSeconds = (time) => {
  const [hours, minutes, seconds] = time.split(':');
  return +hours * 60 * 60 + +minutes * 60 + +seconds;
};

var innterval = {};
var video = {};
var player = {};
var states = {};
var stateCallBacks = [];
var callBacks = [];

var start;
var end;
var isRepeat = false;

window.onYouTubeIframeAPIReady = () => {
  player = new YT.Player('youtube', {
    videoId: videoId,
    host: 'https://www.youtube-nocookie.com',
    playerVars: {
      modestbranding: 1,
      playsinline: 1,
      // autoplay: 1,
      fs: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });

  updateStatus();
};

const onPlayerReady = (event) => {
  target = event.target;
  target.mute();
  // target.playVideo();
  // target.unMute();
};

const onPlayerStateChange = (event) => {
  const state = event.data;

  if (state === states.PLAYING) {
    updateProgress();
  }

  if (state === states.PAUSED || state === states.ENDED) {
    clearInterval(innterval);
  }

  stateCallBacks.forEach((callBack) => {
    callBack(state);
  });
};

const currentTime = () => {
  return player.getCurrentTime();
};

const play = () => {
  player.playVideo();
};

const pause = () => {
  player.pauseVideo();
};

const stop = () => {
  player.stopVideo();
};

const seekTo = (seconds) => {
  player.seekTo(seconds, true);

  if (player.getPlayerState() !== states.PLAYING) player.playVideo();
};

const repeat = (startSecond, endSecond) => {
  if (currentTime() > endSecond) {
    seekTo(startSecond);
  }
};

const toggleRepeat = () => {
  isRepeat = !isRepeat;
  updateStatus();

  return isRepeat;
};

const setCallBacks = (functions, state) => {
  if (state === 'state') {
    stateCallBacks.push(functions);
  } else {
    callBacks.push(functions);
  }
};

const setTime = (startSecond, endSecond) => {
  start = startSecond;
  end = endSecond;

  updateStatus();
};

const updateProgress = () => {
  innterval = setInterval(() => {
    if (isRepeat) {
      repeat(start, end);
    }

    callBacks.forEach((callBack) => {
      callBack({ isRepeat });
    });
  });
};

const resetInterval = () => {
  clearInterval(innterval);
};

const getPlayerState = () => {
  return player.getPlayerState();
};

const updateStatus = () => {
  player = player;

  states = {
    CUED: YT.PlayerState.CUED,
    BUFFERING: YT.PlayerState.BUFFERING,
    UNSTARTED: YT.PlayerState.UNSTARTED,
    PLAYING: YT.PlayerState.PLAYING,
    ENDED: YT.PlayerState.ENDED,
    PAUSED: YT.PlayerState.PAUSED,
    REPEAT: isRepeat,
  };

  video = {
    info: { startSecond: start, endSecond: end },
    states,
    getPlayerState,
    updateStatus,
    setCallBacks,
    setTime,
    currentTime,
    play,
    pause,
    stop,
    seekTo,
    repeat,
    toggleRepeat,
    resetInterval,
  };
};

export { timeToSeconds, video };
