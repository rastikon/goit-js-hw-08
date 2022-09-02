import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on('timeupdate', throttle(pause, 1000));

function pause(timeupdate) {
  let timeStoped = timeupdate.seconds;

  localStorage.setItem('videoplayer-current-time', timeStoped);
}

setCurrentTime();

function setCurrentTime() {
  const currentTime = localStorage.getItem('videoplayer-current-time');

  if (currentTime) {
    player
      .setCurrentTime(currentTime)
      .then(function (seconds) {
        let round = Math.floor(seconds);
        console.log('Відео починається з ' + round + '-ї секунди'); // seconds = the actual time that the player seeked to
      })
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

          default:
            // some other error occurred
            break;
        }
      });
  }
}
