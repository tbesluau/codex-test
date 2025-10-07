function createCounter(initialValue = 0) {
  if (!Number.isFinite(initialValue)) {
    throw new TypeError('Initial value must be a finite number.');
  }

  let value = Math.round(initialValue);

  const getValue = () => value;
  const increment = (step = 1) => {
    if (!Number.isFinite(step)) {
      throw new TypeError('Step must be a finite number.');
    }

    value += Math.round(step);
    return value;
  };

  const decrement = (step = 1) => increment(-step);
  const reset = (next = 0) => {
    if (!Number.isFinite(next)) {
      throw new TypeError('Reset value must be a finite number.');
    }

    value = Math.round(next);
    return value;
  };

  return Object.freeze({ getValue, increment, decrement, reset });
}

module.exports = { createCounter };
