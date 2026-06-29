import { SENSEI_PASSWORD } from './constants';

const AUTH_KEY = 'sensei-auth';
const AUTH_TIME_KEY = 'sensei-auth-time';
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

export function verifyPassword(password: string): boolean {
  return password === SENSEI_PASSWORD;
}

export function setAuthSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem(AUTH_TIME_KEY, Date.now().toString());
  }
}

export function checkAuthSession(): boolean {
  if (typeof window === 'undefined') return false;
  const auth = localStorage.getItem(AUTH_KEY);
  const time = localStorage.getItem(AUTH_TIME_KEY);

  if (!auth || !time) return false;

  const elapsed = Date.now() - parseInt(time);
  if (elapsed > SESSION_DURATION) {
    clearAuthSession();
    return false;
  }

  return true;
}

export function clearAuthSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_TIME_KEY);
  }
}
