import React, { useState, useEffect, useRef } from 'react';
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const EventsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  //only two keywords allowed
  // Enhanced events data
  const eventOBJ = [
    {
      id: 1,
      name: "Tech Innovation Summit 2025",
      bannerPath: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&auto=format",
      keyWords: ["Innovation", "Technology"],
      date: "August 15, 2025",
      featured: true
    },
    {
      id: 2,
      name: "Social Impact Workshop",
      bannerPath: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop&auto=format",
      keyWords: ["Impact", "Community"],
      date: "August 22, 2025",
      featured: false
    },
    {
      id: 3,
      name: "Leadership Bootcamp",
      bannerPath: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format",
      keyWords: ["Leadership", "Growth"],
      date: "September 5, 2025",
      featured: false
    },
    {
      id: 4,
      name: "Clean Campus Initiative",
      bannerPath: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format",
      keyWords: ["Environment", "Campus"],
      date: "September 20, 2025",
      featured: false
    },
    {
      id: 5,
      name: "Mental Health Awareness",
      bannerPath: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop&auto=format",
      keyWords: ["Health", "Awareness"],
      date: "October 10, 2025",
      featured: false
    }
  ];

  // Visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % eventOBJ.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + eventOBJ.length) % eventOBJ.length);
  };

  const getVisibleEvents = () => {
    const events = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % eventOBJ.length;
      events.push({ ...eventOBJ[index], displayIndex: i });
    }
    return events;
  };

  const handleEventClick = (eventId) => {
    console.log(`Navigate to event: ${eventId}`);
  };

  return (
    <div 
      ref={sectionRef}
      className="events-section"
    >
      <style>
      {`
        .events-section {
          min-height: 70vh;
          padding: 3rem 2rem;
          scroll-margin-top: 90px;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.97) 0%,
            rgba(15, 15, 15, 0.94) 65%,
            rgba(255, 69, 0, 0.12) 100%
          );
          backdrop-filter: blur(14px);


          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .events-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 20%, rgba(255, 107, 53, 0.15) 0%, transparent 50%), 
                      radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .events-title {
          font-size: clamp(2.5rem, 6vw, 3.5rem);
          font-weight: 900;
          text-align: center;
          margin-bottom: 1rem;
          position: relative;
          z-index: 2;
          opacity: ${isVisible ? 1 : 0};
          transform: translateY(${isVisible ? 0 : 30}px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .title-text {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #fbbf24 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          animation: ${isVisible ? 'titleGlow 3s ease-in-out infinite alternate' : 'none'};
        }

        .events-subtitle {
          text-align: center;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2.5rem;
          max-width: 600px;
          opacity: ${isVisible ? 1 : 0};
          transform: translateY(${isVisible ? 0 : 20}px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        }

        .slider-container {
          position: relative;
          width: 100%;
          max-width: 1200px;
          opacity: ${isVisible ? 1 : 0};
          transform: translateY(${isVisible ? 0 : 40}px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;
        }

        .events-slider {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          align-items: center;
          perspective: 1200px;
          transform-style: preserve-3d;
          position: relative;
          z-index: 1;
          padding: 0 4rem;
        }

        .slider-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 107, 53, 0.9);
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .slider-btn:hover {
          background: rgba(255, 107, 53, 1);
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
        }

        .slider-btn.prev {
          left: 0;
        }

        .slider-btn.next {
          right: 0;
        }

        .event-card {
          width: 300px;
          height: 350px;
          position: relative;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
        }

        .event-card:nth-child(1) {
          transform: scale(0.9) translateX(-20px) rotateY(15deg);
          z-index: 1;
        }

        .event-card:nth-child(2) {
          transform: scale(1) translateX(0) rotateY(0deg);
          z-index: 3;
        }

        .event-card:nth-child(3) {
          transform: scale(0.9) translateX(20px) rotateY(-15deg);
          z-index: 1;
        }

        .event-card:hover {
          transform: scale(1.05) translateY(-10px) rotateY(0deg) !important;
          z-index: 10 !important;
        }

        .card-container {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .event-card:hover .card-container {
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 107, 53, 0.3);
          border-color: rgba(255, 107, 53, 0.4);
        }

        .card-image {
          width: 100%;
          height: 50%;
          position: relative;
          overflow: hidden;
        }

        .banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          filter: brightness(0.9) contrast(1.1);
        }

        .event-card:hover .banner-image {
          transform: scale(1.1) rotate(1deg);
          filter: brightness(1) contrast(1.2);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, transparent 0%, transparent 60%, rgba(0, 0, 0, 0.8) 100%);
          opacity: 0.6;
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #1a1a2e;
          padding: 0.4rem 0.8rem;
          border-radius: 15px;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          z-index: 3;
          animation: badgePulse 2s infinite;
        }

        .card-content {
          padding: 1.2rem;
          height: 40%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .event-keywords {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 0.8rem;
          flex-wrap: wrap;
        }

        .keyword {
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          color: white;
          padding: 0.3rem 0.7rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          position: relative;
          overflow: hidden;
        }

        .keyword::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.6s;
        }

        .event-card:hover .keyword::before {
          left: 100%;
        }

        .event-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .event-description {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .view-event-btn {
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 15px;
          font-weight: 600;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          align-self: flex-start;
        }

        .view-event-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .view-event-btn:hover::before {
          left: 100%;
        }

        .view-event-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 107, 53, 0.4);
        }

        .btn-icon {
          transition: transform 0.3s ease;
        }

        .view-event-btn:hover .btn-icon {
          transform: translateX(2px);
        }

        .slide-indicators {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #ff6b35;
          transform: scale(1.2);
        }

        @keyframes titleGlow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(255, 107, 53, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.8));
          }
        }

        @keyframes badgePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .events-slider {
            padding: 0 3rem;
          }
          
          .event-card {
            width: 280px;
            height: 360px;
          }
        }

        @media (max-width: 768px) {
          .events-section {
            padding: 2rem 1rem;
            min-height: 60vh;
          }

          .events-slider {
            padding: 0 2rem;
            gap: 1rem;
          }

          .event-card {
            width: 250px;
            height: 340px;
          }

          .event-card:nth-child(1),
          .event-card:nth-child(3) {
            display: none;
          }

          .event-card:nth-child(2) {
            transform: scale(1) translateX(0) rotateY(0deg);
          }

          .slider-btn {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 480px) {
          .events-section {
            padding: 1.5rem 0.5rem;
          }

          .events-slider {
            padding: 0 1rem;
          }

          .event-card {
            width: 280px;
            height: 320px;
          }
        }
      `}
      </style>

      <div className="events-title">
        <span className="title-text">Events</span>
      </div>
      
      <div className="events-subtitle">
        Discover the impactful events that bring our VITERA community together
      </div>

      <div className="slider-container">
        <button className="slider-btn prev" onClick={prevSlide}>
          <ChevronLeft size={24} color="white" />
        </button>

        <div className="events-slider">
          {getVisibleEvents().map((event, index) => (
            <div
              key={`${event.id}-${currentIndex}`}
              className="event-card"
              onClick={() => handleEventClick(event.id)}
            >
              <div className="card-container">
                {event.featured && (
                  <div className="featured-badge">
                    <Star size={10} />
                    Featured
                  </div>
                )}
                
                <div className="card-image">
                  <img
                    className="banner-image"
                    src={event.bannerPath}
                    alt={event.name}
                    loading="lazy"
                  />
                  <div className="image-overlay" />
                </div>
                
                <div className="card-content">
                  <div>
                    <div className="event-keywords">
                      {event.keyWords.map((keyword, idx) => (
                        <div key={idx} className="keyword">
                          {keyword}
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="event-name">{event.name}</h3>
                    <p className="event-description">{event.description}</p>
                  </div>
                  
                  <button className="view-event-btn">
                    View Event
                    <ArrowRight size={12} className="btn-icon" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-btn next" onClick={nextSlide}>
          <ChevronRight size={24} color="white" />
        </button>

        <div className="slide-indicators">
          {eventOBJ.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsSection;