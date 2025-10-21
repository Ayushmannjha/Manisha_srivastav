import { useRef, useState, useEffect } from 'react';
import { MapPin, Clock, Ticket } from 'lucide-react';
import { Button } from './ui/button';

export function TourSection() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const events = [
    {
      date: 'Nov 15, 2024',
      time: '7:00 PM',
      title: 'Eternal Melodies Live',
      venue: 'Royal Opera House',
      city: 'Mumbai',
      status: 'Available',
    },
    {
      date: 'Nov 28, 2024',
      time: '8:00 PM',
      title: 'Classical Fusion Night',
      venue: 'Siri Fort Auditorium',
      city: 'New Delhi',
      status: 'Available',
    },
    {
      date: 'Dec 12, 2024',
      time: '6:30 PM',
      title: 'Acoustic Evening',
      venue: 'Chowdiah Memorial Hall',
      city: 'Bangalore',
      status: 'Selling Fast',
    },
    {
      date: 'Dec 20, 2024',
      time: '7:30 PM',
      title: 'New Year Special Concert',
      venue: 'Music Academy',
      city: 'Chennai',
      status: 'Available',
    },
    {
      date: 'Jan 10, 2025',
      time: '8:00 PM',
      title: 'Voice of the Heart Tour',
      venue: 'Ravindra Natya Mandir',
      city: 'Mumbai',
      status: 'Coming Soon',
    },
  ];

  return (
    <section
      id="tour"
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden"
    >
      {/* Stage spotlight effects */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-0 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 mb-4">
            Upcoming Events
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 mx-auto mb-6 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join me for unforgettable live performances across India
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {events.map((event, index) => (
            <div
              key={event.title + event.date}
              className={`group relative transition-all duration-500 hover:translate-x-2 ${
                isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
              style={{ transitionDelay: `${100 + index * 100}ms` }}
            >
              {/* Stage light beam effect on hover */}
              <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {/* Left spotlight */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-amber-500/30 via-amber-500/10 to-transparent blur-xl" />
                {/* Right spotlight */}
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-purple-500/30 via-purple-500/10 to-transparent blur-xl" />
                {/* Top spotlight beam */}
                <div className="absolute left-0 right-0 top-0 h-full bg-gradient-to-b from-pink-500/20 via-transparent to-transparent blur-2xl" />
              </div>

              {/* Glow effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-purple-600 to-pink-600 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity" />
              
              <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-amber-500/20 group-hover:border-amber-500/70 rounded-xl p-6 backdrop-blur-sm transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_40px_rgba(251,191,36,0.4)]">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Date Section with stage light effect */}
                  <div className="flex-shrink-0 text-center md:text-left relative">
                    {/* Stage light glow behind date */}
                    <div className="absolute -inset-2 bg-gradient-to-br from-amber-500/40 to-purple-500/40 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative inline-block bg-gradient-to-br from-amber-600 to-purple-600 rounded-lg p-4 min-w-[120px] shadow-[0_0_20px_rgba(251,191,36,0.3)] group-hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all">
                      <div className="text-white/90 text-sm mb-1">
                        {event.date.split(',')[0]}
                      </div>
                      <div className="text-2xl text-white font-serif">
                        {event.date.split(' ')[1]}
                      </div>
                      <div className="text-white/90 text-sm mt-1">
                        {event.date.split(',')[1]}
                      </div>

                      {/* Corner stage lights */}
                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-amber-300 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-300 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-grow">
                    <h3 className="text-xl text-white mb-2 group-hover:text-amber-300 transition-colors">{event.title}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span>{event.venue}, {event.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                        <Clock className="w-4 h-4 text-purple-400" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Section */}
                  <div className="flex-shrink-0 flex flex-col items-stretch md:items-end gap-3">
                    <div
                      className={`px-4 py-1 rounded-full text-sm text-center border ${
                        event.status === 'Selling Fast'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                          : event.status === 'Coming Soon'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                          : 'bg-green-500/20 text-green-300 border-green-500/30'
                      }`}
                    >
                      {event.status}
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-700 hover:to-purple-700 text-white shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all hover:scale-105 active:scale-95 border border-amber-400/50"
                      disabled={event.status === 'Coming Soon'}
                    >
                      <Ticket className="w-4 h-4 mr-2" />
                      {event.status === 'Coming Soon' ? 'Notify Me' : 'Get Tickets'}
                    </Button>
                  </div>
                </div>

                {/* Bottom spotlight line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-700 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-gray-400 mb-6">
            Want to bring Manisha to your city?
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-amber-600/30 via-purple-600/30 to-pink-600/30 hover:from-amber-600/50 hover:via-purple-600/50 hover:to-pink-600/50 border-2 border-amber-500/50 hover:border-amber-400 rounded-full text-amber-300 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
            Book for Events
          </button>
        </div>
      </div>
    </section>
  );
}
