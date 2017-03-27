import { switchToMobilePathname } from '../utils';

it('should return a function', () => {
  expect(typeof switchToMobilePathname).toBe('function');
});

it('should return correct pathname', () => {
  expect(
    switchToMobilePathname({ pathname: '/origin/pathname/' }).pathname,
  ).toBe('/mobile/origin/pathname/');
});
