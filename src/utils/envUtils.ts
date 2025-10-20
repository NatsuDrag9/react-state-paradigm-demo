// disabled since more exports will be added here in future

export const isDevMode = (): boolean =>
  !import.meta.env.MODE || import.meta.env.MODE === 'development';
