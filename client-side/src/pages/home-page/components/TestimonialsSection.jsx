import React, { useState, useEffect } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Calendar,
  Shield,
  Users,
  Clock,
  Award,
  Quote,
} from "lucide-react";

const TestimonialsSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(savedLanguage);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Amit Patel",
      location: "Mumbai",
      rating: 5,
      text: "RealConnect helped me find my dream home in just 2 weeks! The agents were professional and the process was seamless.",
      avatar: "https://images.unsplash.com/photo-1724998711080-61cb01e30a2f",
      propertyType: "3BHK Apartment",
      date: "October 2024",
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Pune",
      rating: 5,
      text: "Excellent service and genuine listings. The team guided me through every step of buying my first home.",
      avatar: "https://images.unsplash.com/photo-1631268088758-3e1fe5346e0c",
      propertyType: "2BHK Villa",
      date: "September 2024",
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      location: "Bangalore",
      rating: 4,
      text: "Great platform with verified properties. Found multiple options within my budget.",
      avatar: "https://images.unsplash.com/photo-1695147518953-1e8c1220332d",
      propertyType: "Independent House",
      date: "August 2024",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      location: "Hyderabad",
      rating: 5,
      text: "The AI chatbot was incredibly helpful in narrowing down my search criteria.",
      avatar: "https://images.unsplash.com/photo-1652396944757-ad27b62b33f6",
      propertyType: "Luxury Apartment",
      date: "October 2024",
    },
    {
      id: 5,
      name: "Vikram Singh",
      location: "Delhi NCR",
      rating: 5,
      text: "Outstanding experience from start to finish. The property documentation process was handled professionally.",
      avatar: "https://images.unsplash.com/photo-1585066047759-3438c34cf676",
      propertyType: "Commercial Space",
      date: "September 2024",
    },
    {
      id: 6,
      name: "Kavya Nair",
      location: "Chennai",
      rating: 4,
      text: "User-friendly platform with detailed property information. The appointment scheduling feature was very helpful.",
      avatar: "https://images.unsplash.com/photo-1664636403936-d4d25230c8c6",
      propertyType: "Penthouse",
      date: "August 2024",
    },
  ];

  const content = {
    en: {
      title: "Client Success Stories",
      subtitle: "Discover why thousands trust us for their property journey",
      verified: "Verified Purchase",
    },
    hi: {
      title: "ग्राहक सफलता की कहानियाँ",
      subtitle:
        "जानिए क्यों हज़ारों लोग अपनी संपत्ति की यात्रा के लिए हम पर भरोसा करते हैं",
      verified: "सत्यापित खरीदारी",
    },
    mr: {
      title: "क्लायंट यशस्वी कथा",
      subtitle:
        "जाणून घ्या का हजारो लोक त्यांच्या मालमत्तेच्या प्रवासासाठी आमच्यावर विश्वास ठेवतात",
      verified: "सत्यापित खरेदी",
    },
  };

  const t = content?.[currentLanguage] || content?.en;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const getVisibleTestimonials = () => {
    const startIndex = currentSlide * 3;
    return testimonials.slice(startIndex, startIndex + 3);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(testimonials.length / 3)) %
        Math.ceil(testimonials.length / 3)
    );
  };

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-sm text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-100 shadow-sm">
            <Quote className="w-3.5 h-3.5 fill-indigo-600/20" />
            Testimonials
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            {t?.title}
          </h2>
          <p className="text-base text-gray-600 font-light max-w-2xl mx-auto">
            {t?.subtitle}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative group">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10 w-12 h-12 bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10 w-12 h-12 bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getVisibleTestimonials().map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white border border-gray-200/60 rounded-md p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
              >
                <Quote className="absolute top-4 right-4 w-16 h-16 text-gray-50 opacity-50 transform rotate-12" />
                
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-6 relative z-10">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 leading-relaxed mb-8 relative z-10 font-medium">
                  "{testimonial.text}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-6 relative z-10">
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-white"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mt-0.5">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Verification */}
                <div className="mt-4 flex items-center justify-between text-xs text-gray-400 font-medium uppercase tracking-wide relative z-10">
                  <div className="flex items-center space-x-1.5 text-emerald-600">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{t?.verified}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-3">
            {Array.from(
              { length: Math.ceil(testimonials.length / 3) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide 
                      ? "w-8 h-2 bg-blue-600" 
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              )
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center border-t border-gray-100 pt-16">
          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield size={24} className="text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-1 text-sm uppercase tracking-wider">
              Verified Properties
            </h4>
            <p className="text-gray-500 text-xs">Authentic & Legal</p>
          </div>

          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users size={24} className="text-emerald-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-1 text-sm uppercase tracking-wider">
              Expert Agents
            </h4>
            <p className="text-gray-500 text-xs">Certified Pros</p>
          </div>

          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-50 to-orange-100 rounded-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock size={24} className="text-orange-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-1 text-sm uppercase tracking-wider">
              24/7 Support
            </h4>
            <p className="text-gray-500 text-xs">Always Available</p>
          </div>

          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-purple-100 rounded-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award size={24} className="text-purple-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-1 text-sm uppercase tracking-wider">
              Award Winning
            </h4>
            <p className="text-gray-500 text-xs">Industry Leader</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
