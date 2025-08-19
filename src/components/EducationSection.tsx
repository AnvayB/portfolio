import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import educationData from '../data.json';

const education = educationData.education;

const certifications = [
  {
    id: 1,
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023',
    icon: '☁️',
  },
  {
    id: 2,
    name: 'Google Cloud Professional Data Engineer',
    issuer: 'Google Cloud',
    date: '2022',
    icon: '🔧',
  },
  {
    id: 3,
    name: 'Certified Kubernetes Administrator',
    issuer: 'Cloud Native Computing Foundation',
    date: '2022',
    icon: '⚙️',
  },
  {
    id: 4,
    name: 'TensorFlow Developer Certificate',
    issuer: 'TensorFlow',
    date: '2021',
    icon: '🧠',
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
      className="min-h-screen py-20 px-6 bg-background"
      id="education"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="text-gradient">Education</span>
            <span className="text-foreground"> & Certifications</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Continuous learning and academic excellence in computer science and data science
          </p>
        </motion.div>

        {/* Education Section */}
        <div className="mb-16">
          <motion.h3
            className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <GraduationCap className="w-8 h-8 text-primary" />
            Academic Background
          </motion.h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="glass border-border/50 hover:glow-primary transition-all duration-500 h-full">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-foreground mb-2">
                          {edu.degree}
                        </h4>
                        <p className="text-primary font-semibold mb-1">
                          {edu.institution}
                        </p>
                        <p className="text-muted-foreground text-sm mb-2">
                          {edu.location} • {edu.period}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        GPA: {edu.gpa}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {edu.description}
                    </p>

                    <div className="mb-4">
                      <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        Achievements
                      </h5>
                      <ul className="space-y-1">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        Key Coursework
                      </h5>
                      <div className="flex flex-wrap gap-2">
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
            className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Award className="w-8 h-8 text-primary" />
            Professional Certifications
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{cert.icon}</div>
                    <h4 className="font-bold text-foreground mb-2 text-sm leading-tight">
                      {cert.name}
                    </h4>
                    <p className="text-muted-foreground text-xs mb-2">
                      {cert.issuer}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20"
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