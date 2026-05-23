import { useState, useRef, useCallback } from 'react';
import { Camera } from 'lucide-react';

export default function PhotoCarousel({ photos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.firstChild?.offsetWidth || 280;
    const gap = 12;
    const idx = Math.round(scrollLeft / (itemWidth + gap));
    setCurrentIndex(Math.min(idx, photos.length - 1));
  }, [photos.length]);

  const scrollTo = (index) => {
    const container = scrollRef.current;
    if (!container) return;
    const itemWidth = container.firstChild?.offsetWidth || 280;
    const gap = 12;
    container.scrollTo({ left: index * (itemWidth + gap), behavior: 'smooth' });
  };

  if (!photos || photos.length === 0) return null;

  return (
    <div className="photo-carousel">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingBottom: 'var(--space-2)',
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{
              minWidth: 280,
              width: 280,
              height: 200,
              borderRadius: 'var(--border-radius-md)',
              background: photo.gradient,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              scrollSnapAlign: 'start',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            {/* Camera icon overlay */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.3,
                color: 'white',
              }}
            >
              <Camera size={40} />
            </div>

            {/* Caption overlay */}
            {photo.caption && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'linear-gradient(transparent, hsla(0, 0%, 0%, 0.6))',
                  fontSize: 'var(--text-xs)',
                  color: 'white',
                  fontWeight: 500,
                }}
              >
                {photo.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      {photos.length > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-1)',
            marginTop: 'var(--space-2)',
          }}
        >
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              style={{
                width: i === currentIndex ? 20 : 8,
                height: 8,
                borderRadius: 'var(--border-radius-full)',
                background: i === currentIndex
                  ? 'var(--primary-400)'
                  : 'var(--surface-600)',
                transition: 'all var(--transition-fast)',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
