const { createPulse, RED, GREEN, DEFAULT_INTERVAL_MS } = require('./pulse');

describe('createPulse', () => {
  test('starts with red by default and toggles to green', () => {
    const pulse = createPulse();

    expect(pulse.getColor()).toBe(RED);
    expect(pulse.toggle()).toBe(GREEN);
    expect(pulse.getColor()).toBe(GREEN);
    expect(pulse.toggle()).toBe(RED);
  });

  test('accepts a green starting color', () => {
    const pulse = createPulse({ initialColor: GREEN });

    expect(pulse.getColor()).toBe(GREEN);
    expect(pulse.toggle()).toBe(RED);
  });

  test('returns the configured interval', () => {
    const customInterval = 1500;
    const pulse = createPulse({ intervalMs: customInterval });

    expect(pulse.getInterval()).toBe(customInterval);
  });

  test('rejects invalid colors', () => {
    expect(() => createPulse({ initialColor: 'blue' })).toThrow(
      'Pulse color must be "red" or "green".'
    );
  });

  test('rejects invalid intervals', () => {
    expect(() => createPulse({ intervalMs: 0 })).toThrow(
      'Pulse interval must be a positive number of milliseconds.'
    );
  });

  test('uses default interval when not specified', () => {
    const pulse = createPulse();

    expect(pulse.getInterval()).toBe(DEFAULT_INTERVAL_MS);
  });
});
