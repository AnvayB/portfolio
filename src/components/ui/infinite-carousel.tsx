import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface InfiniteCarouselProps {
  items: React.ReactNode[];
  itemsToShow?: number;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  className?: string;
  itemClassName?: string;
}

export const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({
  items,
  itemsToShow = 1,
  autoPlay = false,
  autoPlayDelay = 3000,
  className,
  itemClassName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Create extended items array for seamless looping
  const extendedItems = [
    ...items.slice(-itemsToShow),
    ...items,
    ...items.slice(0, itemsToShow),
  ];

  const totalExtendedItems = extendedItems.length;
  const actualItemsLength = items.length;

  const goToNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Handle seamless looping
  useEffect(() => {
    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      
      // If we're at the end (showing duplicated items), jump to the real beginning
      if (currentIndex >= actualItemsLength + itemsToShow) {
        setCurrentIndex(itemsToShow);
      }
      // If we're at the beginning (showing duplicated items), jump to the real end
      else if (currentIndex <= itemsToShow - 1) {
        setCurrentIndex(actualItemsLength + itemsToShow - 1);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('transitionend', handleTransitionEnd);
      return () => carousel.removeEventListener('transitionend', handleTransitionEnd);
    }
  }, [currentIndex, actualItemsLength, itemsToShow]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, autoPlayDelay);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [autoPlay, autoPlayDelay, isTransitioning]);

  // Calculate transform based on current index
  const translateX = -(currentIndex * (100 / itemsToShow));

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        ref={carouselRef}
        className={cn(
          'flex transition-transform duration-300 ease-in-out',
          isTransitioning ? 'transition-transform' : ''
        )}
        style={{
          transform: `translateX(${translateX}%)`,
          width: `${(totalExtendedItems / itemsToShow) * 100}%`,
          transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none',
        }}
      >
        {extendedItems.map((item, index) => (
          <div
            key={index}
            className={cn(
              'flex-shrink-0',
              itemClassName
            )}
            style={{ width: `${100 / totalExtendedItems * itemsToShow}%` }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goToPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 border border-border rounded-full flex items-center justify-center hover:bg-background transition-colors z-10"
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

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 border border-border rounded-full flex items-center justify-center hover:bg-background transition-colors z-10"
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

      {/* Indicators */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index + itemsToShow);
              }
            }}
            className={cn(
              'w-2 h-2 rounded-full transition-colors',
              index === ((currentIndex - itemsToShow + actualItemsLength) % actualItemsLength)
                ? 'bg-primary'
                : 'bg-muted-foreground/30'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};