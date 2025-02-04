import { validateEmail } from "./";

describe("validateEmail function", () => {
  it('validates correct email format', () => {
    expect(validateEmail("test@example.com")).toBe(true);
  });

  it('rejects email without @ symbol', () => {
    expect(validateEmail("testexample.com")).toBe(false);
  });

  it('rejects email without domain', () => {
    expect(validateEmail("test@.com")).toBe(false);
  });

  it('rejects email with special characters', () => {
    expect(validateEmail("test@exam!ple.com")).toBe(false);
  });

  it('validates email with subdomain', () => {
    expect(validateEmail("test@sub.example.com")).toBe(true);
  });

  it('rejects empty email string', () => {
    expect(validateEmail("")).toBe(false);
  });

  it('rejects email with spaces', () => {
    expect(validateEmail("test @example.com")).toBe(false);
  });
});