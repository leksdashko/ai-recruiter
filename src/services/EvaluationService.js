export const evaluateResponse = (response) => {
  if (response.includes('years of experience')) {
    return 'Good experience level.';
  }
  return 'Needs more experience.';
};