import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  gradient: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, gradient, children }) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

