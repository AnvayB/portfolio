import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { data } from '../data.ts';

const education = data.education;

const certifications = [
  {
    id: 1,
    name: 'Apache PySpark by Example',
    issuer: 'LinkedIn Learning',
    date: '2025',
    logo: '/src/images/pyspark.jpg',
  },
  {
    id: 2,
    name: 'Docker for Data Engineers',
    issuer: 'LinkedIn Learning',
    date: '2025',
    logo: '/images/docker-for-data-engineers.png',
  },
  {
    id: 3,
    name: 'MERN Essential Training',
    issuer: 'LinkedIn Learning',
    date: '2024',
    logo: '/images/mern-essential-training.png',
  },
  {
    id: 4,
    name: 'Cloud Computing Core Concepts',
    issuer: 'LinkedIn Learning',
    date: '2024',
    logo: '/images/cloud-computing-core-concepts.png',
  },
];

export const EducationSection = () => {
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
      className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 bg-background"
      id="education"
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
            <span className="text-gradient">Education</span>
            <span className="text-foreground"> & Certifications</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Compiling Curiosity: Transforming learning into lasting expertise.
          </p>
        </motion.div>

        {/* Education Section */}
        <div className="mb-12 sm:mb-16">
          <motion.h3
            className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            Academic Background
          </motion.h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="glass border-border/50 hover:glow-primary transition-all duration-500 h-full">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div className="flex-1 pr-3">
                        <h4 className="text-lg sm:text-xl font-bold text-foreground mb-1 sm:mb-2 leading-tight">
                          {edu.degree}
                        </h4>
                        <p className="text-primary font-semibold mb-1 text-sm sm:text-base">
                          {edu.institution}
                        </p>
                        <p className="text-muted-foreground text-xs sm:text-sm mb-2">
                          {edu.location} • {edu.period}
                        </p>
                      </div>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                        <img 
                          src={edu.logo}
                          alt={`${edu.institution} logo`}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                      {edu.description}
                    </p>

                    <div className="mb-3 sm:mb-4">
                      <h5 className="text-sm sm:text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        Achievements
                      </h5>
                      <ul className="space-y-1">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-sm sm:text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                        <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        Key Coursework
                      </h5>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {edu.coursework.map((course) => (
                          <Badge
                            key={course}
                            variant="outline"
                            className="text-xs border-muted-foreground/30 text-muted-foreground"
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <motion.h3
            className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Award className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            Professional Certifications
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass border-border/50 hover:glow-primary transition-all duration-300 text-center">
                  <CardContent className="p-4 sm:p-6">
                    <img src={cert.logo} alt={cert.name} className="h-12 sm:h-16 w-auto mx-auto mb-3 sm:mb-4" />
                    <h4 className="font-bold text-foreground mb-2 text-xs sm:text-sm leading-tight">
                      {cert.name}
                    </h4>
                    <p className="text-muted-foreground text-xs mb-2">
                      {cert.issuer}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 text-xs"
                    >
                      {cert.date}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};