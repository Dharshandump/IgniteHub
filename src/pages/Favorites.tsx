import React from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import PageHeader from '../components/layout/PageHeader';
import ContentContainer from '../components/layout/ContentContainer';
import GradientButton from '../components/ui/GradientButton';

const FavoritesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Favorites Feature"
        subtitle="Save your favorite resources for easy access"
        gradient="from-red-500 to-pink-600"
      >
        <Link
          to="/"
          className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Home
        </Link>
      </PageHeader>

      <ContentContainer>
        <div className="text-center py-12">
          <Heart size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Bookmark Your Favorite Resources
          </h3>
          <p className="text-gray-600 mb-6">
            Discover amazing resources and keep track of the ones you love most!
          </p>
          <Link to="/resources">
            <GradientButton>
              Explore Resources
            </GradientButton>
          </Link>
        </div>
      </ContentContainer>
    </div>
  );
};

export default FavoritesPage;