import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { InfiniteCarousel } from './ui/infinite-carousel';
import { Mail, Phone, MapPin, Linkedin, Github, Coffee, Camera, Music, Code, Book } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { data } from '../data.ts';
import emailjs from '@emailjs/browser';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// Import hobby images
import hobbyCoffeeImg from '../images/hobby-coffee.jpg';
import hobbyPhotographyImg from '../images/hobby-photography.jpg';
import hobbyMusicImg from '../images/hobby-music.jpg';
import hobbyCodingImg from '../images/hobby-coding.jpg';
import hobbyReadingImg from '../images/hobby-reading.jpg';
import profile from '../images/face-left.jpg';

// 3D Background Component
function ContactBackground() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 1, 4]} intensity={0.8} />
      <Float
        speed={2}
        rotationIntensity={0.1}
        floatIntensity={0.2}
      >
        <Sphere args={[1, 100, 200]} scale={2.5} position={[-3, 0, 0]}>
          <MeshDistortMaterial
            color="#00bcd4"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.4}
            transparent
            opacity={0.1}
          />
        </Sphere>
      </Float>
      
      <Float
        speed={1.5}
        rotationIntensity={0.2}
        floatIntensity={0.3}
      >
        <Sphere args={[0.8, 100, 200]} scale={2} position={[3, 1, -1]}>
          <MeshDistortMaterial
            color="#9c27b0"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.3}
            transparent
            opacity={0.08}
          />
        </Sphere>
      </Float>
    </>
  );
}

const contactInfo = data.contactInfo.map(item => ({
  ...item,
  icon: {
    Mail,
    Phone,
    MapPin
  }[item.icon]
}));

const socialLinks = [
  {
    icon: Linkedin,
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/AnvayB',
  },
  {
    icon: Github,
    name: 'GitHub',
    href: 'https://github.com/AnvayB',
  }
];

const hobbies = [
  {
    id: 1,
    image: hobbyCoffeeImg,
    title: 'Coffee Enthusiast',
    description: 'Third-wave coffee explorer'
  },
  {
    id: 2,
    image: hobbyPhotographyImg,
    title: 'Photography',
    description: 'Capturing moments & landscapes'
  },
  {
    id: 3,
    image: hobbyMusicImg,
    title: 'Music Production',
    description: 'Electronic & ambient sounds'
  },
  {
    id: 4,
    image: hobbyCodingImg,
    title: 'Open Source',
    description: 'Contributing to community'
  },
  {
    id: 5,
    image: hobbyReadingImg,
    title: 'Reading',
    description: 'Sci-fi & tech philosophy'
  }
];

// Convert hobbies to React nodes for the carousel
const hobbyItems = hobbies.map((hobby) => (
  <motion.div
    key={hobby.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    className="px-2"
  >
    <Card className="glass border-border/50 hover:glow-primary transition-all duration-300 h-full">
      <CardContent className="p-3 text-center">
        <div className="w-full h-24 sm:h-28 mb-3 rounded-lg overflow-hidden">
          <img
            src={hobby.image}
            alt={hobby.title}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="text-sm font-semibold text-foreground mb-1 leading-tight">
          {hobby.title}
        </h4>
        <p className="text-xs text-muted-foreground leading-tight line-clamp-2">
          {hobby.description}
        </p>
      </CardContent>
    </Card>
  </motion.div>
));

// Custom Left Arrow
const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute -left-3 top-1/3 -translate-y-1/2 w-8 h-8 bg-background/80 border border-border rounded-full flex items-center justify-center hover:bg-background transition-colors z-10 overflow-visible"
      aria-label="Previous"
    >
      <svg
        className="w-4 h-4 text-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
};

// Custom Right Arrow
const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute -right-3 top-1/3 -translate-y-1/2 w-8 h-8 bg-background/80 border border-border rounded-full flex items-center justify-center hover:bg-background transition-colors z-10 overflow-visible"
      aria-label="Next"
    >
      <svg
        className="w-4 h-4 text-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};


export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thanks, setThanks] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Map EmailJS field names to state field names
    const fieldMap: { [key: string]: string } = {
      'user_name': 'name',
      'user_email': 'email',
      'subject': 'subject',
      'message': 'message'
    };
    
    const stateField = fieldMap[name] || name;
    setFormData(prev => ({
      ...prev,
      [stateField]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        'service_d61vlcw',
        'template_2q6uc8b',
        formRef.current!,
        { publicKey: 'SZctaaxt7KKpSXd4C' }
      );

      console.log(result.text);
      setThanks(true);
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        variant: "default",
        className: "bg-[#a987f4]] text-white"
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset thanks message after 3 seconds
      setTimeout(() => setThanks(false), 3000);
      
    } catch (error) {
      console.log((error as Error).message);
      toast({
        title: "Failed to send message",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 sm:py-20 px-4 sm:px-6 bg-mesh overflow-hidden"
      id="contact"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <ContactBackground />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 sm:mb-6">
            <span className="text-foreground">Let's </span>
            <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Ready to collaborate on your next project? <br />Let's discuss how we can bring your ideas to life!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:h-auto">
          {/* Contact Information */}
          <motion.div
            className="flex flex-col space-y-6 sm:space-y-8 h-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-0">Get in Touch</h3>
                <div className="flex gap-3 sm:gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-12 sm:h-12 glass rounded-lg flex items-center justify-center hover:glow-primary transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </motion.a>
                  ))}
                </div>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                I'm always interested in hearing about new opportunities, 
                interesting projects, and creative collaborations. Whether you're a 
                startup looking to build something amazing or an established company 
                needing technical expertise, let's talk! When I'm not coding, you'll 
                find me exploring third-wave coffee, capturing landscapes through photography, 
                producing ambient music, or diving into sci-fi philosophy.
              </p>

              {/* Portrait and Hobbies Carousel */}
              <motion.div
                className="mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  {/* Portrait */}
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={profile}
                      alt="Portrait"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full border-4 border-primary/20 shadow-lg glow-primary"
                    />
                  </motion.div>

                  {/* Hobbies Carousel */}
                  <div className="flex-1 w-full">
                    <Carousel
                      responsive={{
                        superLargeDesktop: {
                          breakpoint: { max: 4000, min: 3000 },
                          items: 1
                        },
                        desktop: {
                          breakpoint: { max: 3000, min: 1024 },
                          items: 1
                        },
                        tablet: {
                          breakpoint: { max: 1024, min: 464 },
                          items: 1
                        },
                        mobile: {
                          breakpoint: { max: 464, min: 0 },
                          items: 1
                        }
                      }}
                      customLeftArrow={<CustomLeftArrow onClick={() => {}} />}
                      customRightArrow={<CustomRightArrow onClick={() => {}} />}
                      autoPlay={true}
                      autoPlaySpeed={4000}
                      infinite={true}
                      className="max-w-48 sm:max-w-60 mx-auto"
                    >
                      {hobbyItems}
                    </Carousel>
                  </div>
                </div>
              </motion.div>

              {/* Contact Info Grid - Email and Location side by side, Phone below */}
              <div className="space-y-3 sm:space-y-4">
                {/* Email and Location Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {contactInfo.filter(item => item.label === 'Email' || item.label === 'Location').map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 p-3 sm:p-4 glass rounded-lg hover:glow-primary transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-foreground">{item.label}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{item.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Phone Row */}
                {contactInfo.filter(item => item.label === 'Phone').map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 p-3 sm:p-4 glass rounded-lg hover:glow-primary transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-foreground">{item.label}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="flex flex-col h-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-border/50 flex-1 flex flex-col">
              <CardContent className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col">
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col h-full">
                  <div className="flex-1 space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm sm:text-base text-foreground">Name</Label>
                        <Input
                          id="name"
                          name="user_name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-input/50 border-border focus:border-primary text-sm sm:text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm sm:text-base text-foreground">Email</Label>
                        <Input
                          id="email"
                          name="user_email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-input/50 border-border focus:border-primary text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm sm:text-base text-foreground">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-input/50 border-border focus:border-primary text-sm sm:text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm sm:text-base text-foreground">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="bg-input/50 border-border focus:border-primary resize-none text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 py-4 sm:py-6 text-base sm:text-lg font-semibold glow-primary disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                  
                  {/* {thanks && (
                    <div className="text-center mt-4">
                      <span className="text-primary font-semibold text-lg">
                        Thanks for the message!
                      </span>
                    </div>
                  )} */}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};