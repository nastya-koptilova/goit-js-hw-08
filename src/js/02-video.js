import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player', {
  id: 'vimeo-player',
});

const onPlay = function (data) {
  const { seconds } = data;
  try {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(seconds));
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const onPause = () => {
  try {
    const stopTime = localStorage.getItem('videoplayer-current-time');

    return stopTime === null ? undefined : JSON.parse(stopTime);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

player.setCurrentTime(onPause());

player.on('timeupdate', throttle(onPlay, 1000));
