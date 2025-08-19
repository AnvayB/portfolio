import { Canvas } from '@react-three/fiber';
import { Float, Text3D, OrbitControls, Sparkles } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // ⬅️ added AnimatePresence
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';

// 3D Text Component with floating animation
function FloatingText() {
  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      floatingRange={[0, 0.5]}
    >
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={1.5}
        height={0.2}
        curveSegments={12}
        position={[-3, 0, 0]}
      >
        PORTFOLIO
        <meshStandardMaterial color="#00bcd4" />
      </Text3D>
    </Float>
  );
}

// Particle system component
function ParticleField() {
  return (
    <Sparkles
      count={100}
      scale={[20, 20, 10]}
      size={2}
      speed={0.3}
      opacity={0.6}
      color="#00bcd4"
    />
  );
}

export const HeroSection = () => {
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

  const scrollToNext = () => {
    const nextSection = document.getElementById('portfolio');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const roles = [
    { first: 'Data', second: 'Analyst' },
    { first: 'Data', second: 'Engineer' },
    { first: 'Full-Stack', second: 'Developer' }
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
  //   }, 3200); // ⬅️ slightly longer cycle to allow full out/in animations
  //   return () => clearInterval(interval);
  // }, [roles.length]);

  // this one is slightly less snappy
  useEffect(() => {
    const id = setInterval(() =>
      setCurrentRoleIndex(i => (i + 1) % roles.length), 3200);
    return () => clearInterval(id);
  }, [roles.length]);


  // Variants for smooth crossfade + slight vertical drift and blur
  const roleVariants = {
    initial: { opacity: 0, y: 8, filter: 'blur(4px)' },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } // easeOutExpo-like
    },
    exit: {
      opacity: 0,
      y: -8,
      filter: 'blur(4px)',
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center gap-8 bg-mesh overflow-hidden"
      id="hero"
    >

      {/* Profile Image */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >

        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/20 glow-primary mx-auto mt-8">
          <img
            src="/src/images/face-left.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <FloatingText />
          <ParticleField />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>


      {/* Content Overlay */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            <br />
            {/* ⬇️ Smooth crossfade between roles */}
            <div className="inline-grid align-top">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
                  className="col-start-1 row-start-1 whitespace-nowrap"
                >
                  <span className="text-gradient">{roles[currentRoleIndex].first}</span>{' '}
                  <span className="text-foreground">{roles[currentRoleIndex].second}</span>
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            I don’t just work with data; I design experiences around it.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          >
            <Button
              variant="default"
              size="lg"
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity px-8 py-4 text-lg font-semibold glow-primary"
              onClick={scrollToNext}
            >
              Explore Work
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="cursor-pointer"
          onClick={scrollToNext}
        >
          <ArrowDown className="w-6 h-6 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};
