const { createPulse, RED, GREEN } = require('./pulse');

const BACKGROUND_COLOR = '#000000';
const COLOR_MAP = {
  [RED]: '#e03131',
  [GREEN]: '#2f9e44',
};

const setupCanvas = (canvas) => {
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Canvas 2D context is unavailable.');
  }

  const pulse = createPulse();
  let displayWidth = window.innerWidth;
  let displayHeight = window.innerHeight;
  let pulseTimer = null;

  const colorForState = () => COLOR_MAP[pulse.getColor()];

  const drawScene = () => {
    context.clearRect(0, 0, displayWidth, displayHeight);
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, displayWidth, displayHeight);

    const radius = Math.min(displayWidth, displayHeight) / 6;
    const centerX = displayWidth / 2;
    const centerY = displayHeight / 2;

    context.save();
    context.shadowColor = colorForState();
    context.shadowBlur = radius / 2;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.fillStyle = colorForState();
    context.fill();
    context.restore();
  };

  const resizeCanvas = () => {
    displayWidth = window.innerWidth;
    displayHeight = window.innerHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;

    canvas.width = displayWidth * devicePixelRatio;
    canvas.height = displayHeight * devicePixelRatio;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(devicePixelRatio, devicePixelRatio);

    drawScene();
  };

  const startPulse = () => {
    if (pulseTimer) {
      clearInterval(pulseTimer);
    }

    pulseTimer = setInterval(() => {
      pulse.toggle();
      drawScene();
    }, pulse.getInterval());
  };

  window.addEventListener('resize', resizeCanvas);

  resizeCanvas();
  startPulse();
};

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('status-canvas');

  if (!canvas) {
    return;
  }

  setupCanvas(canvas);
});
