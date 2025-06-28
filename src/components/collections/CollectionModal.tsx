import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { useCollections } from '../../hooks/useCollections';

interface CollectionModalProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

const CollectionModal: React.FC<CollectionModalProps> = ({ trigger, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [color, setColor] = useState('#8B5CF6');
  const [icon, setIcon] = useState('📚');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createCollection } = useCollections();

  const colors = [
    '#8B5CF6', '#EC4899', '#EF4444', '#F59E0B',
    '#10B981', '#3B82F6', '#6366F1', '#8B5A2B'
  ];

  const icons = ['📚', '⭐', '🚀', '💡', '🎯', '🔥', '💎', '🌟', '📝', '🎨'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    const success = await createCollection(name, description, isPublic, color, icon);
    
    if (success) {
      setName('');
      setDescription('');
      setIsPublic(false);
      setColor('#8B5CF6');
      setIcon('📚');
      setOpen(false);
      onSuccess?.();
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus size={16} className="mr-2" />
            New Collection
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Collection Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome Resources"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your collection..."
              rows={3}
            />
          </div>

          <div>
            <Label>Choose an Icon</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {icons.map((iconOption) => (
                <button
                  key={iconOption}
                  type="button"
                  onClick={() => setIcon(iconOption)}
                  className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-lg transition-colors ${
                    icon === iconOption
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {iconOption}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Choose a Color</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {colors.map((colorOption) => (
                <button
                  key={colorOption}
                  type="button"
                  onClick={() => setColor(colorOption)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    color === colorOption
                      ? 'border-gray-400 scale-110'
                      : 'border-gray-200 hover:scale-105'
                  }`}
                  style={{ backgroundColor: colorOption }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
            <Label htmlFor="public">Make this collection public</Label>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isSubmitting ? 'Creating...' : 'Create Collection'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionModal;