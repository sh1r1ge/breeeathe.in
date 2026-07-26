document.addEventListener("DOMContentLoaded", () => {
  const orb = document.querySelector('.orb');
  const menuToggle = document.getElementById('menu-toggle');
  const inhaleControl = document.getElementById('inhale-control');
  const holdInhaleControl = document.getElementById('hold-inhale-control');
  const exhaleControl = document.getElementById('exhale-control');
  const holdExhaleControl = document.getElementById('hold-exhale-control');
  const inhaleDisplay = document.getElementById('inhale-display');
  const holdInhaleDisplay = document.getElementById('hold-inhale-display');
  const exhaleDisplay = document.getElementById('exhale-display');
  const holdExhaleDisplay = document.getElementById('hold-exhale-display');
  const audioToggle = document.getElementById('audio-toggle');
  const speakerIcon = document.getElementById('speaker-icon');

  const backgroundMusic = new Audio('bgmusic.mp3');
  backgroundMusic.loop = true;

  let hasStarted = false;
  let menuOpen = false;

  let durations = {
    inhale: 4000,
    holdInhale: 2000,
    exhale: 4000,
    holdExhale: 2000,
  };

  const isPortrait = () => window.matchMedia("(orientation: portrait)").matches || window.innerWidth <= 600;

  async function animateOrb() {
    while (true) {
      // Inhale
      if (isPortrait()) {
        orb.style.width = '72vw';
        orb.style.height = '72vw';
      } else {
        orb.style.width = '45vw';
        orb.style.height = '45vw';
      }
      await new Promise(resolve => setTimeout(resolve, durations.inhale));

      await new Promise(resolve => setTimeout(resolve, durations.holdInhale));

      // Exhale
      if (isPortrait()) {
        orb.style.width = '22vw';
        orb.style.height = '22vw';
      } else {
        orb.style.width = '12vw';
        orb.style.height = '12vw';
      }
      await new Promise(resolve => setTimeout(resolve, durations.exhale));

      await new Promise(resolve => setTimeout(resolve, durations.holdExhale));
    }
  }

  function updateDurations() {
    durations.inhale = inhaleControl.value * 1000;
    durations.holdInhale = holdInhaleControl.value * 1000;
    durations.exhale = exhaleControl.value * 1000;
    durations.holdExhale = holdExhaleControl.value * 1000;

    inhaleDisplay.textContent = `Breathe in: ${durations.inhale / 1000}s`;
    holdInhaleDisplay.textContent = `Hold: ${durations.holdInhale / 1000}s`;
    exhaleDisplay.textContent = `Breathe out: ${durations.exhale / 1000}s`;
    holdExhaleDisplay.textContent = `Hold: ${durations.holdExhale / 1000}s`;
  }

  function startExperience() {
    if (!hasStarted) {
      hasStarted = true;
      orb.style.animation = 'none';
      animateOrb();
      backgroundMusic.play();
    }
  }

  document.body.addEventListener('click', startExperience);

  updateDurations();

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const sideMenu = document.getElementById('side-menu');
    if (menuOpen) {
      sideMenu.style.right = '-110%';
      sideMenu.classList.remove('open');
    } else {
      sideMenu.style.right = '0';
      sideMenu.classList.add('open');
    }
    menuOpen = !menuOpen;
  });

  document.body.addEventListener('click', (e) => {
    const sideMenu = document.getElementById('side-menu');
    if (menuOpen && !sideMenu.contains(e.target) && e.target !== menuToggle) {
      sideMenu.style.right = '-110%';
      sideMenu.classList.remove('open');
      menuOpen = false;
    }
  });

  audioToggle.addEventListener('click', () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      speakerIcon.src = 'soundon.svg';
    } else {
      backgroundMusic.pause();
      speakerIcon.src = 'soundoff.svg';
    }
  });

  inhaleControl.addEventListener('input', updateDurations);
  holdInhaleControl.addEventListener('input', updateDurations);
  exhaleControl.addEventListener('input', updateDurations);
  holdExhaleControl.addEventListener('input', updateDurations);
});

document.addEventListener("DOMContentLoaded", () => {
  const orb = document.querySelector('.orb');
  const moodRingColorPicker = document.getElementById('mood-ring-color');
  const body = document.body;

  function updateMoodRing() {
    const color = moodRingColorPicker.value;
    orb.style.boxShadow = `
      inset 0 0 2.7em #fff,
      inset 1.25em 0 3.75em ${color},
      inset -1.25em 0 3.75em ${color},
      inset 1.25em 0 18.75em ${color},
      inset -1.25em 0 18.75em ${color},
      0 0 2em #fffceb,
      -0.625em 0 3.75em ${color},
      0.625em 0 3.75em ${color}
    `;
    body.style.background = `radial-gradient(circle, ${color} 0%, black 40%)`;
  }

  moodRingColorPicker.addEventListener('input', updateMoodRing);
});
