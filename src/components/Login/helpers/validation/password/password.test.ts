import { validatePassword } from './';

describe('validatePassword function', () => {
  it('validates password with 8 digits', () => {
    expect(validatePassword('12345678')).toBe(true);
  });

  it('rejects password with less than 8 digits', () => {
    expect(validatePassword('1234567')).toBe(false);
  });

  it('rejects password with non-digit characters', () => {
    expect(validatePassword('12345abc')).toBe(false);
  });

  it('rejects empty password', () => {
    expect(validatePassword('')).toBe(false);
  });

  it('validates password with more than 8 digits', () => {
    expect(validatePassword('1234567890')).toBe(true);
  });

  it('rejects password with spaces', () => {
    expect(validatePassword('1234 5678')).toBe(false);
  });
});
