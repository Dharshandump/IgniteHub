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

// Utility to scroll to top of page
export const scrollToTop = (behavior: 'smooth' | 'instant' = 'instant'): void => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior
  });
};

// Utility to restore scroll position
export const restoreScrollPosition = (): void => {
  // Force scroll to top on page load/navigation
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
};