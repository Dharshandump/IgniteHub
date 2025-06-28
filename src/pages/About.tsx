import { Lightbulb, Target, Users, Heart } from 'lucide-react';

import PageHeader from '../components/layout/PageHeader';
import ContentContainer from '../components/layout/ContentContainer';
import GradientButton from '../components/ui/GradientButton';

const companyValues = [
  {
    icon: <Lightbulb className="text-yellow-500" size={32} />,
    title: 'Innovation First',
    description:
      'We believe in the power of young minds to create groundbreaking solutions and change the world.'
  },
  {
    icon: <Target className="text-purple-500" size={32} />,
    title: 'Curated Quality',
    description:
      'Every resource is carefully selected and vetted to ensure it provides real value to young innovators.'
  },
  {
    icon: <Users className="text-blue-500" size={32} />,
    title: 'Community Driven',
    description:
      'Built by young innovators, for young innovators. We understand the challenges because we face them too.'
  },
  {
    icon: <Heart className="text-red-500" size={32} />,
    title: 'Accessible to All',
    description:
      'Innovation should not be limited by resources. We prioritize free and accessible tools and opportunities.'
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="The Only Mission"
        subtitle="Empowering the next generation of innovators with the tools, knowledge, and opportunities they need to build the future."
        gradient="from-purple-600 to-pink-600"
      />

      <section className="py-16 bg-white">
        <ContentContainer className="max-w-4xl">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Why IgniteHub Exists
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700">
              <p>
                In today's rapidly evolving world, young innovators aged 16–30 face an overwhelming challenge:
                finding the right resources, tools, and opportunities to bring their ideas to life. The internet
                is full of information, but quality, relevant resources are scattered and hard to discover.
              </p>
              <p>
                <strong>IgniteHub</strong> was born from this frustration. I recognized that brilliant young minds
                often waste precious time searching for tools, funding, learning materials, and communities instead
                of focusing on what they do best: innovating and creating.
              </p>
              <p>
                This mission is simple: to be the ultimate launchpad for young innovators by curating the best
                resources across AI & tech tools, hackathons, funding opportunities, learning platforms,
                communities, and open-source projects.
              </p>
            </div>
          </div>
        </ContentContainer>
      </section>

      <section className="py-16 bg-gray-50">
        <ContentContainer>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Driven by Passion</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {companyValues.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </ContentContainer>
      </section>

      <section className="py-16 bg-white">
        <ContentContainer className="max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Built by Innovators, for Innovators</h2>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
            <p className="text-lg text-gray-700 mb-6">
              IgniteHub is built to support young innovators who face the challenges of turning ideas into reality. By bringing together high-quality resources in one place, it helps make the journey of creating, learning, and building much easier.
            </p>
            <p className="text-gray-600">
              New tools, fresh opportunities, and valuable resources are added regularly ~ so there’s always something new to explore. The goal is to help innovators stay inspired, keep learning, and connect with a growing creative community.
            </p>
          </div>
        </ContentContainer>
      </section>

      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <ContentContainer className="max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Innovation Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Every idea deserves the right support ~ that’s why IgniteHub is bringing together carefully curated resources to empower young innovators at every stage of their journey.
          </p>
          <GradientButton variant="secondary" size="large" href="/">
            Explore Resources
          </GradientButton>
        </ContentContainer>
      </section>
    </div>
  );
};

export default AboutPage;
