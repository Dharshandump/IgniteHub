export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.warn(`Element with ID "${elementId}" not found.`);
  }
};

export const isActiveRoute = (currentPath: string, targetPath: string): boolean => {
  if (!currentPath || !targetPath) return false;
  return currentPath === targetPath;
};
