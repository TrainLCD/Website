import { createMedia } from '@artsy/fresnel';

const { Media, MediaContextProvider, createMediaStyle } = createMedia({
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 1024,
    xl: 1192,
  },
});

export const mediaQueries = {
  xl: '(min-width: 1192px)',
  lg: '(min-width: 1024px)',
  md: '(min-width: 768px)',
  sm: '(max-width: 768px)',
} as const;

export const mediaStyles = createMediaStyle();

export { Media, MediaContextProvider };
