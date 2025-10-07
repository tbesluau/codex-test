const { createCounter } = require('./counter');

describe('createCounter', () => {
  it('starts at zero by default', () => {
    const counter = createCounter();
    expect(counter.getValue()).toBe(0);
  });

  it('supports a custom starting value', () => {
    const counter = createCounter(5);
    expect(counter.getValue()).toBe(5);
  });

  it('increments and decrements symmetrically', () => {
    const counter = createCounter(1);
    counter.increment();
    counter.increment();
    counter.decrement();
    expect(counter.getValue()).toBe(2);
  });

  it('resets to zero by default', () => {
    const counter = createCounter(3);
    counter.increment();
    counter.reset();
    expect(counter.getValue()).toBe(0);
  });

  it('throws when provided invalid input', () => {
    expect(() => createCounter(NaN)).toThrow(TypeError);
    const counter = createCounter();
    expect(() => counter.increment(Infinity)).toThrow(TypeError);
    expect(() => counter.reset('foo')).toThrow(TypeError);
  });
});
