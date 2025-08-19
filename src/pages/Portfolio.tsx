import { HeroSection } from '../components/HeroSection';
import { Navigation } from '../components/Navigation';
import { PortfolioSection } from '../components/PortfolioSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { EducationSection } from '../components/EducationSection';
import { ContactSection } from '../components/ContactSection';

const Portfolio = () => {
  return (
    <div className="relative">
      <Navigation />
      <main>
        <HeroSection />
        <PortfolioSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Portfolio;