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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t?.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t?.subtitle}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 leading-relaxed mb-4">
                  "{testimonial.text}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Verification */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{t?.verified}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from(
              { length: Math.ceil(testimonials.length / 3) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              )
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Shield size={24} className="text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1 text-sm">
              Verified Properties
            </h4>
            <p className="text-gray-600 text-xs">Authentic listings</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Users size={24} className="text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1 text-sm">
              Expert Agents
            </h4>
            <p className="text-gray-600 text-xs">Certified professionals</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <Clock size={24} className="text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1 text-sm">
              24/7 Support
            </h4>
            <p className="text-gray-600 text-xs">Always available</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <Award size={24} className="text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1 text-sm">
              Award Winning
            </h4>
            <p className="text-gray-600 text-xs">Industry excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
