import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag, Clock, Users, Globe, DollarSign, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { categories } from '../data/resources';
import PageHeader from '../components/layout/PageHeader';
import ContentContainer from '../components/layout/ContentContainer';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useAnalytics } from '../hooks/useAnalytics';

const ResourceDetail: React.FC = () => {
  const { resourceId } = useParams<{ resourceId: string }>();
  const { trackResourceView } = useAnalytics();
  const [viewStartTime] = useState(Date.now());
  
  // Find the resource across all categories
  let resource = null;
  let categoryId = '';
  
  for (const category of categories) {
    const found = category.resources.find(r => r.id === resourceId);
    if (found) {
      resource = found;
      categoryId = category.id;
      break;
    }
  }

  useEffect(() => {
    if (resource && categoryId) {
      // Track the resource view
      trackResourceView(resource.id, categoryId);
      
      // Track view duration when component unmounts
      return () => {
        const duration = Math.floor((Date.now() - viewStartTime) / 1000);
        trackResourceView(resource.id, categoryId, duration);
      };
    }
  }, [resource, categoryId, trackResourceView, viewStartTime]);

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Resource not found</h1>
          <p className="text-gray-600 mb-4">
            The resource you're looking for doesn't exist.
          </p>
          <Link to="/resources">
            <Button>
              <ArrowLeft className="mr-2" size={16} />
              Back to Resources
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find(cat => cat.id === categoryId);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={resource.name}
        subtitle={resource.description}
        gradient={category?.gradient || 'from-purple-600 to-pink-600'}
      >
        <Link
          to={`/resources/${categoryId}`}
          className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to {category?.title}
        </Link>
      </PageHeader>

      <ContentContainer>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Resource Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                      {resource.name}
                    </CardTitle>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {resource.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                          ⭐ Featured
                        </Badge>
                      )}
                      {resource.difficulty && (
                        <Badge variant="secondary">
                          {resource.difficulty}
                        </Badge>
                      )}
                      {resource.type && (
                        <Badge variant="outline">
                          {resource.type}
                        </Badge>
                      )}
                      {resource.isFree && (
                        <Badge className="bg-green-100 text-green-800">
                          Free
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {resource.detailedDescription || resource.description}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 mb-6">
                  <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={18} className="mr-2" />
                      Visit Resource
                    </a>
                  </Button>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Topics & Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                      >
                        <Tag size={14} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            {resource.features && resource.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 text-purple-600" size={20} />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {resource.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pricing */}
            {resource.pricing && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-2 text-green-600" size={20} />
                    Pricing Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resource.pricing.free && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Free Tier</h4>
                        <p className="text-green-700">{resource.pricing.free}</p>
                      </div>
                    )}
                    
                    {resource.pricing.paid && resource.pricing.paid.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Paid Plans</h4>
                        {resource.pricing.paid.map((plan, index) => (
                          <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-blue-800">{plan}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            {resource.requirements && resource.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="mr-2 text-orange-600" size={20} />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {resource.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Alternatives */}
            {resource.alternatives && resource.alternatives.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Similar Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {resource.alternatives.map((alternative, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {alternative}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resource.dateAdded && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    Added {new Date(resource.dateAdded).toLocaleDateString()}
                  </div>
                )}
                
                <div className="flex items-center text-sm text-gray-600">
                  <Tag size={16} className="mr-2" />
                  {category?.title}
                </div>

                {resource.location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Globe size={16} className="mr-2" />
                    {resource.location}
                  </div>
                )}

                {resource.difficulty && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Users size={16} className="mr-2" />
                    {resource.difficulty} level
                  </div>
                )}

                {resource.type && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-2" />
                    {resource.type}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Related Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Related Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category?.resources
                    .filter(r => r.id !== resource.id)
                    .slice(0, 3)
                    .map((relatedResource) => (
                      <Link
                        key={relatedResource.id}
                        to={`/resource/${relatedResource.id}`}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors border"
                      >
                        <h4 className="font-medium text-gray-900 mb-1">
                          {relatedResource.name}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {relatedResource.description}
                        </p>
                      </Link>
                    ))}
                </div>
                
                <Separator className="my-4" />
                
                <Link
                  to={`/resources/${categoryId}`}
                  className="block text-center text-purple-600 hover:text-purple-700 font-medium"
                >
                  View all in {category?.title}
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full"
                >
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" />
                    Open Resource
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default ResourceDetail;