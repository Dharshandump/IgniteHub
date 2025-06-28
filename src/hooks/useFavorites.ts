import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface FavoriteResource {
  id: string;
  resourceId: string;
  categoryId: string;
  addedAt: Date;
  notes?: string;
  tags?: string[];
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('igniteHub_favorites');
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        setFavorites(parsed.map((fav: any) => ({
          ...fav,
          addedAt: new Date(fav.addedAt)
        })));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('igniteHub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = async (resourceId: string, categoryId: string, notes?: string) => {
    setIsLoading(true);
    try {
      const newFavorite: FavoriteResource = {
        id: `fav-${Date.now()}`,
        resourceId,
        categoryId,
        addedAt: new Date(),
        notes
      };

      setFavorites(prev => [...prev, newFavorite]);
      toast.success('Added to favorites');
    } catch (error) {
      toast.error('Failed to add to favorites');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromFavorites = async (resourceId: string) => {
    setIsLoading(true);
    try {
      setFavorites(prev => prev.filter(fav => fav.resourceId !== resourceId));
      toast.success('Removed from favorites');
    } catch (error) {
      toast.error('Failed to remove from favorites');
    } finally {
      setIsLoading(false);
    }
  };

  const isFavorite = (resourceId: string): boolean => {
    return favorites.some(fav => fav.resourceId === resourceId);
  };

  const exportFavorites = () => {
    const data = {
      favorites,
      exportedAt: new Date()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ignitehub-favorites-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Favorites exported successfully');
  };

  const importFavorites = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (data.favorites && Array.isArray(data.favorites)) {
        setFavorites(data.favorites.map((fav: any) => ({
          ...fav,
          addedAt: new Date(fav.addedAt)
        })));
        toast.success('Favorites imported successfully');
      }
    } catch (error) {
      toast.error('Failed to import favorites');
    }
  };

  return {
    favorites,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    exportFavorites,
    importFavorites
  };
};