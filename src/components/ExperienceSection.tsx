import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, MapPin, Building } from 'lucide-react';
import { data } from '../data.ts';

const experiences = data.experiences;

export const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 bg-mesh"
      id="experience"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 sm:mb-6">
            <span className="text-foreground">Professional </span>
            <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto px-2">
          ROI: Return on Innovation – Measured in impact, delivered through experience
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-3 sm:left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-primary transform md:-translate-x-1/2" />

          {/* Experience Items */}
          <div className="space-y-12 sm:space-y-16">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-3 sm:left-4 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-primary rounded-full transform -translate-x-1/2 border-2 sm:border-4 border-background z-10" />

                {/* Content Card */}
                <div className={`w-full md:w-1/2 ml-8 sm:ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <Card className="glass border-border/50 hover:glow-primary transition-all duration-500">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-0">
                          {experience.title}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20 w-fit text-xs sm:text-sm"
                        >
                          {experience.period}
                        </Badge>
                      </div>

                      <div className="flex flex-col gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                          <Building className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="font-medium">{experience.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{experience.location}</span>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                        {experience.description}
                      </p>

                      {experience.achievements?.length > 0 && (
                        <div className="mb-4 sm:mb-6">
                          <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-3">Key Achievements:</h4>
                          <ul className="space-y-1.5 sm:space-y-2">
                            {experience.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {experience.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};