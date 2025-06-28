import { useState, useEffect } from 'react';
import { supabase, UserCollection, CollectionItem, isSupabaseConfigured } from '../lib/supabase';
import { toast } from 'sonner';

export const useCollections = () => {
  const [collections, setCollections] = useState<UserCollection[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch user's collections
  const fetchCollections = async () => {
    if (!isSupabaseConfigured()) {
      console.log('Collections feature requires Supabase configuration');
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_collections')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCollections(data || []);
    } catch (error) {
      console.error('Error fetching collections:', error);
      toast.error('Failed to load collections');
    } finally {
      setLoading(false);
    }
  };

  // Create a new collection
  const createCollection = async (
    name: string,
    description?: string,
    isPublic: boolean = false,
    color: string = '#8B5CF6',
    icon: string = '📚'
  ) => {
    if (!isSupabaseConfigured()) {
      toast.error('Collections feature requires Supabase configuration');
      return false;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to create collections');
        return false;
      }

      const { error } = await supabase
        .from('user_collections')
        .insert({
          user_id: user.id,
          name,
          description,
          is_public: isPublic,
          color,
          icon
        });

      if (error) throw error;

      toast.success('Collection created successfully!');
      await fetchCollections();
      return true;
    } catch (error) {
      console.error('Error creating collection:', error);
      toast.error('Failed to create collection');
      return false;
    }
  };

  // Add resource to collection
  const addToCollection = async (
    collectionId: string,
    resourceId: string,
    categoryId: string,
    notes?: string
  ) => {
    if (!isSupabaseConfigured()) {
      toast.error('Collections feature requires Supabase configuration');
      return false;
    }

    try {
      const { error } = await supabase
        .from('collection_items')
        .insert({
          collection_id: collectionId,
          resource_id: resourceId,
          category_id: categoryId,
          notes
        });

      if (error) throw error;

      toast.success('Added to collection!');
      await fetchCollections();
      return true;
    } catch (error) {
      console.error('Error adding to collection:', error);
      toast.error('Failed to add to collection');
      return false;
    }
  };

  // Remove resource from collection
  const removeFromCollection = async (collectionId: string, resourceId: string) => {
    if (!isSupabaseConfigured()) {
      toast.error('Collections feature requires Supabase configuration');
      return false;
    }

    try {
      const { error } = await supabase
        .from('collection_items')
        .delete()
        .eq('collection_id', collectionId)
        .eq('resource_id', resourceId);

      if (error) throw error;

      toast.success('Removed from collection');
      await fetchCollections();
      return true;
    } catch (error) {
      console.error('Error removing from collection:', error);
      toast.error('Failed to remove from collection');
      return false;
    }
  };

  // Get collection items
  const getCollectionItems = async (collectionId: string): Promise<CollectionItem[]> => {
    if (!isSupabaseConfigured()) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('collection_items')
        .select('*')
        .eq('collection_id', collectionId)
        .order('added_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching collection items:', error);
      return [];
    }
  };

  // Check if resource is in any collection
  const isInCollection = async (resourceId: string): Promise<string[]> => {
    if (!isSupabaseConfigured()) {
      return [];
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('collection_items')
        .select('collection_id')
        .eq('resource_id', resourceId)
        .in('collection_id', collections.map(c => c.id));

      if (error) throw error;
      return data?.map(item => item.collection_id) || [];
    } catch (error) {
      console.error('Error checking collection membership:', error);
      return [];
    }
  };

  useEffect(() => {
    if (isSupabaseConfigured()) {
      fetchCollections();
    }
  }, []);

  return {
    collections,
    loading,
    createCollection,
    addToCollection,
    removeFromCollection,
    getCollectionItems,
    isInCollection,
    fetchCollections
  };
};