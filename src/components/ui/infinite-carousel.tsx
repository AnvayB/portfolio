import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface InfiniteCarouselProps {
  items: React.ReactNode[];
  itemsToShow?: number;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  className?: string;
}

export const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({
  items,
  itemsToShow = 1,
  autoPlay = false,
  autoPlayDelay = 3000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(itemsToShow);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Create infinite loop by duplicating items at start and end
  const infiniteItems = [
    ...items.slice(-itemsToShow), // Last items at the start
    ...items,                     // Original items
    ...items.slice(0, itemsToShow) // First items at the end
  ];

  const totalItems = infiniteItems.length;
  const itemWidth = 100 / itemsToShow;

  const goToSlide = (index: number, withTransition = true) => {
    if (isTransitioning) return;
    
    setIsTransitioning(withTransition);
    setCurrentIndex(index);

    if (withTransition) {
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    
    const nextIndex = currentIndex + 1;
    goToSlide(nextIndex);

    // If we're at the duplicated end items, reset to real beginning without animation
    if (nextIndex >= totalItems - itemsToShow) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(itemsToShow);
      }, 300);
    }
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    const prevIndex = currentIndex - 1;
    goToSlide(prevIndex);

    // If we're at the duplicated start items, reset to real end without animation
    if (prevIndex < itemsToShow) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalItems - itemsToShow * 2);
      }, 300);
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        nextSlide();
      }, autoPlayDelay);

      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayDelay, currentIndex]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Calculate transform value
  const translateX = -(currentIndex * itemWidth);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full glass hover:glow-primary transition-all duration-300"
        onClick={prevSlide}
        disabled={isTransitioning}
      >
        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full glass hover:glow-primary transition-all duration-300"
        onClick={nextSlide}
        disabled={isTransitioning}
      >
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
      </Button>

      {/* Carousel Container */}
      <div className="overflow-hidden px-6 sm:px-8">
        <div
          ref={carouselRef}
          className={`flex ${isTransitioning ? 'transition-transform duration-300 ease-out' : ''}`}
          style={{
            transform: `translateX(${translateX}%)`,
            width: `${(totalItems / itemsToShow) * 100}%`,
          }}
        >
          {infiniteItems.map((item, index) => (
            <div
              key={`${index}-${Math.random()}`}
              className="flex-shrink-0"
              style={{ width: `${100 / totalItems}%` }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator - only show for original items */}
      <div className="flex justify-center gap-1 mt-3">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              (currentIndex - itemsToShow) === index || 
              (currentIndex - itemsToShow === items.length && index === 0) ||
              (currentIndex - itemsToShow < 0 && index === items.length - 1)
                ? 'bg-primary' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            onClick={() => goToSlide(index + itemsToShow)}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  );
};