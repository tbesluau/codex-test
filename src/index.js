const { createCounter } = require('./counter');

document.addEventListener('DOMContentLoaded', () => {
  const counterElement = document.getElementById('counter');
  const incrementButton = document.getElementById('increment');
  const decrementButton = document.getElementById('decrement');
  const resetButton = document.getElementById('reset');

  const counter = createCounter();

  const render = () => {
    counterElement.textContent = counter.getValue();
    decrementButton.disabled = counter.getValue() <= -10;
    incrementButton.disabled = counter.getValue() >= 10;
  };

  incrementButton.addEventListener('click', () => {
    counter.increment();
    render();
  });

  decrementButton.addEventListener('click', () => {
    counter.decrement();
    render();
  });

  resetButton.addEventListener('click', () => {
    counter.reset();
    render();
  });

  render();
});
