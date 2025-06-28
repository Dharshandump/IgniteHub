import { categories } from '../data/resources';

export const filterBySearchTerm = (items: typeof categories, searchTerm: string) => {
  if (!searchTerm.trim()) {
    return items;
  }

  const term = searchTerm.toLowerCase();
  return items.filter(item => 
    item.title.toLowerCase().includes(term) ||
    item.description.toLowerCase().includes(term) ||
    item.tags?.some(tag => tag.toLowerCase().includes(term))
  );
};

export const sortItems = (items: typeof categories, sortBy: string) => {
  const sortedItems = [...items];

  switch (sortBy) {
    case 'name':
      return sortedItems.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return sortedItems.sort((a, b) => b.title.localeCompare(a.title));
    case 'resources':
      return sortedItems.sort((a, b) => b.resources.length - a.resources.length);
    case 'resources-asc':
      return sortedItems.sort((a, b) => a.resources.length - b.resources.length);
    default:
      return sortedItems;
  }
};