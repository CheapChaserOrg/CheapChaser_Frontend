
import React, { useRef, useEffect } from 'react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    alt: 'Mountain landscape in Sri Lanka',
    size: 'large'
  },
  {
    url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
    alt: 'Ocean wave at beach in Sri Lanka',
    size: 'small'
  },
  {
    url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
    alt: 'Forest in Sri Lanka',
    size: 'small'
  },
  {
    url: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151',
    alt: 'Desert landscape in Sri Lanka',
    size: 'small'
  },
  {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    alt: 'Lake surrounded by trees in Sri Lanka',
    size: 'small'
  },
  {
    url: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3',
    alt: 'Rocky mountain during daytime in Sri Lanka',
    size: 'large'
  }
];

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleRef.current?.classList.add('animate-slide-up');
          galleryRef.current?.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 md:px-12 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Visual Journey
          </span>
          <h2 
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold mb-6 opacity-0 transform translate-y-8"
          >
            Sri Lanka <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A visual showcase of Sri Lanka's breathtaking landscapes, vibrant culture,
            and unforgettable experiences.
          </p>
        </div>

        <div 
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-0"
        >
          {images.map((image, index) => (
            <div 
              key={index}
              className={`relative rounded-xl overflow-hidden image-shine-effect shadow-md ${
                image.size === 'large' ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-gray-900" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
          >
            <span>View all photos</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6" 
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
