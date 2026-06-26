import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import FloatingChat from "../../components/ui/FloatingChat";
import {
  Building2,
  Users,
  Target,
  MapPin,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Rocket,
  Shield,
  Heart,
  Zap,
  Globe,
  Award,
} from "lucide-react";

const About = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "buyer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    };
    setUser(mockUser);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>About Makaan4U - Premium Real Estate Platform</title>
        <meta
          name="description"
          content="Discover how Makaan4U is transforming property discovery with technology, transparency, and trust."
        />
      </Helmet>

      <div className="min-h-screen bg-white flex flex-col font-sans">
        {/* Header */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? "bg-white shadow-md border-b border-gray-200" : "bg-transparent"
          }`}
        >
          <Header
            user={user}
            notificationCount={3}
            onLogout={() => {
              setUser(null);
              localStorage.removeItem("user");
            }}
            onSearch={() => {}}
            isTransparent={!isScrolled}
          />
        </div>

        <main className="flex-grow pb-16 lg:pb-24">
          {/* 1. HERO SECTION (Light Theme, High Density) */}
          <section className="relative flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 bg-white border-b border-gray-100">
            {/* Subtle Gradient Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10 transform translate-x-1/3 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50 -z-10 transform -translate-x-1/3 translate-y-1/2"></div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                The Future of Property
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
                Redefining{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
                  Real Estate
                </span>{" "}
                in India
              </h1>

              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                Where cutting-edge technology meets human expertise to create meaningful connections between people and their perfect spaces.
              </p>
            </div>
          </section>

          {/* 2. DENSE MISSION & VALUES GRID */}
          <section className="py-12 md:py-16 bg-white max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              
              {/* Mission/Vision Combo Column */}
              <div className="lg:col-span-1 space-y-8">
                <div className="bg-gray-50 border border-gray-200 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded flex items-center justify-center">
                      <Target className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">Our Purpose</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium">
                    To democratize property discovery by making it transparent, accessible, and human-centric. We believe everyone deserves a stress-free journey to finding their dream property.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded flex items-center justify-center">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">Our Ambition</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium">
                    To build India's most intelligent property platform that anticipates needs, eliminates friction, and creates meaningful connections between people and spaces seamlessly.
                  </p>
                </div>
              </div>

              {/* Core Values Grid (Dense 2x2) */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-600" /> The Principles That Guide Us
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Shield, title: "Radical Transparency", desc: "No hidden costs, no surprises. Every detail disclosed upfront." },
                    { icon: Heart, title: "Human-Centered Design", desc: "Technology that serves people, not replaces relationships." },
                    { icon: Zap, title: "Relentless Innovation", desc: "Constantly evolving to solve real problems with smart solutions." },
                    { icon: Globe, title: "Community First", desc: "Building trust through genuine connections and shared success." },
                  ].map((val, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-md p-5 shadow-sm hover:shadow-md transition-all group flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <val.icon className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-gray-900 mb-1">{val.title}</h4>
                        <p className="text-gray-500 text-xs font-medium leading-relaxed">{val.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* 3. HORIZONTAL TIMELINE (High Density) */}
          <section className="py-12 bg-gray-50 border-y border-gray-200 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center tracking-tight">Our Evolution</h2>
              
              {/* Horizontal Scroll Container */}
              <div className="flex space-x-6 overflow-x-auto pb-6 no-scrollbar snap-x">
                {[
                  { year: "2020", title: "Vision Born", desc: "Founded with mission to transform real estate." },
                  { year: "2021", title: "First Milestone", desc: "10,000+ properties verified and listed." },
                  { year: "2022", title: "Expansion", desc: "Expanded operations to 15+ major cities." },
                  { year: "2023", title: "Growth", desc: "50,000+ families found their dream homes." },
                  { year: "2024", title: "Innovation", desc: "AI-powered recommendations launched." },
                ].map((step, idx) => (
                  <div key={idx} className="flex-shrink-0 w-64 snap-center relative">
                    {/* Connecting Line */}
                    {idx !== 4 && <div className="absolute top-5 left-8 w-full h-[2px] bg-gray-200 z-0 hidden sm:block"></div>}
                    
                    <div className="relative z-10 flex flex-col items-start bg-white p-5 rounded-md border border-gray-200 shadow-sm h-full">
                      <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm mb-4 ring-4 ring-white">
                        {step.year}
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h4>
                      <p className="text-xs text-gray-600 font-medium">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. COMPACT DIFFERENTIATORS & CTA (Split Layout) */}
          <section className="py-16 md:py-24 bg-white max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Differentiators Grid */}
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">Beyond Traditional Real Estate</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: CheckCircle, title: "Intelligent Matching", desc: "AI recommendations." },
                    { icon: TrendingUp, title: "Market Intelligence", desc: "Real-time analytics." },
                    { icon: Clock, title: "Seamless Experience", desc: "End-to-end digital journey." },
                    { icon: Shield, title: "Expert Network", desc: "Verified professionals." },
                  ].map((feature, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-md p-4 border border-gray-100 flex items-start gap-3">
                      <div className="mt-0.5 text-emerald-500"><feature.icon className="w-5 h-5" /></div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-xs text-gray-600 font-medium">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bold Immersive CTA Card */}
              <div className="relative overflow-hidden rounded-lg bg-gray-900 text-white shadow-2xl p-8 md:p-12 text-center lg:text-left">
                {/* Background Accent */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-500 rounded-full blur-[80px] opacity-40"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-emerald-500 rounded-full blur-[80px] opacity-40"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight">Ready to Write Your Success Story?</h3>
                  <p className="text-gray-300 font-medium text-sm md:text-base mb-8 max-w-md mx-auto lg:mx-0">
                    Join the thousands who transformed their property dreams into reality with Makaan4U.
                  </p>
                  <ul className="text-left space-y-3 mb-8">
                    {["Zero commission finding", "360° verified listings", "Legal & price negotiation support"].map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-300 font-medium">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/property-listings"
                    className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors tracking-wide text-sm"
                  >
                    Start Your Journey
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>

            </div>
          </section>

        </main>

        <Footer />
        <FloatingChat isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
      </div>
    </>
  );
};

export default About;
