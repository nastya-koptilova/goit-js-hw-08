import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import localStorageService from './localstorage.js';

const player = new Player('vimeo-player', {
  id: 'vimeo-player',
});

const onPlay = function (data) {
  const { seconds } = data;
  localStorageService.save('videoplayer-current-time', seconds);
};

const onPause = () => localStorageService.load('videoplayer-current-time');

player.setCurrentTime(onPause());

player.on('timeupdate', throttle(onPlay, 1000));
