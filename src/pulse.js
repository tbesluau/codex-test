const RED = 'red';
const GREEN = 'green';
const DEFAULT_INTERVAL_MS = 1000;

const validateInterval = (intervalMs) => {
  if (!Number.isFinite(intervalMs) || intervalMs <= 0) {
    throw new Error('Pulse interval must be a positive number of milliseconds.');
  }
};

const validateColor = (color) => {
  if (color !== RED && color !== GREEN) {
    throw new Error('Pulse color must be "red" or "green".');
  }
};

const createPulse = ({ initialColor = RED, intervalMs = DEFAULT_INTERVAL_MS } = {}) => {
  validateColor(initialColor);
  validateInterval(intervalMs);

  let color = initialColor;

  return {
    getColor: () => color,
    getInterval: () => intervalMs,
    toggle: () => {
      color = color === RED ? GREEN : RED;
      return color;
    },
  };
};

module.exports = {
  createPulse,
  RED,
  GREEN,
  DEFAULT_INTERVAL_MS,
};
