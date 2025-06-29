import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import ResourcesGrid from '../components/sections/ResourcesGrid';
import CallToActionSection from '../components/sections/CallToActionSection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <ResourcesGrid />
      <CallToActionSection />
    </div>
  );
};

export default HomePage;