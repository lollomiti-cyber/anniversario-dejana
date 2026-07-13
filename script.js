const messages = [
  { label: "You're my favorite", file: "/audio/message-01.mp3" },
  { label: "I think of you", file: "/audio/message-02.mp3" },
  { label: "You make me smile", file: "/audio/message-03.mp3" },
  { label: "My heart is yours", file: "/audio/message-04.mp3" },
  { label: "I'm grateful for you", file: "/audio/message-05.mp3" },
  { label: "You're my home", file: "/audio/message-06.mp3" },
  { label: "I love your laugh", file: "/audio/message-07.mp3" },
  { label: "Forever with you", file: "/audio/message-08.mp3" },
  { label: "You're beautiful", file: "/audio/message-09.mp3" },
  { label: "I love you", file: "/audio/message-10.mp3" },
];

const heartsContainer = document.getElementById('hearts');
const player = document.getElementById('player');
const nowPlaying = document.getElementById('now-playing');

let activeButton = null;

messages.forEach((msg, index) => {
  const btn = document.createElement('button');
  btn.className = 'heart-btn';
  btn.setAttribute('aria-label', `Play message ${index + 1}: ${msg.label}`);
  btn.textContent = msg.label;

  btn.addEventListener('click', () => {
    const isSame = player.src.endsWith(msg.file) && !player.paused;

    if (isSame) {
      player.pause();
      btn.classList.remove('playing');
      nowPlaying.textContent = '';
      activeButton = null;
      return;
    }

    if (activeButton) {
      activeButton.classList.remove('playing');
    }

    player.src = msg.file;
    player
      .play()
      .catch(() => {
        nowPlaying.textContent = "Couldn't play that one — add the mp3 file to /public/audio/";
      });

    btn.classList.add('playing');
    activeButton = btn;
    nowPlaying.textContent = `♪ ${msg.label}`;
  });

  heartsContainer.appendChild(btn);
});

player.addEventListener('ended', () => {
  if (activeButton) {
    activeButton.classList.remove('playing');
  }
  activeButton = null;
  nowPlaying.textContent = '';
});
