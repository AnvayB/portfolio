import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SmoothImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  placeholderClassName?: string;
  fallbackContent?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
}

export const SmoothImage = ({
  src,
  alt,
  className,
  containerClassName,
  placeholderClassName,
  fallbackContent,
  onLoad,
  onError,
}: SmoothImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // If image is already cached/loaded
    if (img.complete && img.naturalHeight !== 0) {
      setIsLoaded(true);
      onLoad?.();
      return;
    }

    const handleLoad = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    const handleError = () => {
      setHasError(true);
      onError?.();
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src, onLoad, onError]);

  const defaultPlaceholder = (
    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 animate-pulse rounded-full flex items-center justify-center">
      <div className="w-1/3 h-1/3 bg-primary/20 rounded-full animate-pulse" />
    </div>
  );

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Hidden image for loading detection */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="absolute inset-0 opacity-0 pointer-events-none"
        loading="eager"
      />

      <AnimatePresence mode="wait">
        {!isLoaded && !hasError && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn("absolute inset-0", placeholderClassName)}
          >
            {fallbackContent || defaultPlaceholder}
          </motion.div>
        )}

        {isLoaded && !hasError && (
          <motion.img
            key="image"
            src={src}
            alt={alt}
            className={cn("w-full h-full object-cover", className)}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.22, 1, 0.36, 1],
              scale: { duration: 0.8 }
            }}
          />
        )}

        {hasError && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "absolute inset-0 bg-muted/50 flex items-center justify-center text-muted-foreground text-sm",
              placeholderClassName
            )}
          >
            {fallbackContent || "Failed to load image"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
