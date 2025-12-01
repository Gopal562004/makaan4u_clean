import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import Footer from "../../pages/home-page/components/Footer";
import FloatingChat from "../../components/ui/FloatingChat";
import {
  Building2,
  Users,
  Target,
  Globe,
  Award,
  Shield,
  Heart,
  MapPin,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Rocket,
  TargetIcon,
  Lightbulb,
  Zap,
  Star,
  Gem,
  Crown,
} from "lucide-react";

const About = () => {
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
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

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const handleBrowse = () => {
    window.location.href = "/property-listings";
  };

  return (
    <>
      <Helmet>
        <title>About Makaan4U - Redefining Real Estate in India</title>
        <meta
          name="description"
          content="Discover how Makaan4U is transforming property discovery with technology, transparency, and trust. Learn about our mission, values, and commitment to revolutionizing real estate."
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-white shadow-sm border-b border-gray-200"
              : "bg-white"
          }`}
        >
          <Header
            user={user}
            notificationCount={3}
            onLogout={handleLogout}
            onSearch={handleSearch}
          />
        </div>

        <main className="pt-16">
          {/* Hero Section */}
          <section className="relative bg-white py-12 md:py-24 border-b border-gray-100 overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 md:top-20 md:left-20 w-20 h-20 md:w-32 md:h-32 bg-blue-50 rounded-full blur-2xl md:blur-3xl opacity-60"></div>
              <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-24 h-24 md:w-40 md:h-40 bg-indigo-50 rounded-full blur-2xl md:blur-3xl opacity-40"></div>
              <div className="absolute top-1/2 left-1/4 md:left-1/3 w-16 h-16 md:w-24 md:h-24 bg-green-50 rounded-full blur-2xl md:blur-3xl opacity-50"></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
              {/* Premium Badge */}
              <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 text-sm md:text-lg font-semibold mb-6 md:mb-8 shadow-sm">
                <Gem className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-blue-600" />
                <span className="text-xs md:text-base">
                  The Future of Property Discovery is Here
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Redefining
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-2">
                  Real Estate in India
                </span>
              </h1>

              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6 md:mb-8"></div>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
                Where cutting-edge technology meets human expertise to create
                <span className="font-semibold text-gray-900">
                  {" "}
                  meaningful connections
                </span>{" "}
                between people and their perfect spaces
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    50K+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    Properties
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    10K+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    Happy Families
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    25+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">Cities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    99%
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    Success Rate
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
                {/* Mission */}
                <div className="text-center lg:text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-4 md:mb-6">
                    <TargetIcon className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                    Our Purpose
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                    To democratize property discovery by making it
                    <span className="font-semibold text-gray-900">
                      {" "}
                      transparent, accessible, and human-centric
                    </span>
                    for every Indian seeking their perfect space. We believe
                    everyone deserves a
                    <span className="text-blue-600 font-semibold">
                      {" "}
                      stress-free journey
                    </span>{" "}
                    to finding their dream property.
                  </p>
                </div>

                {/* Vision */}
                <div className="text-center lg:text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-4 md:mb-6">
                    <Rocket className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                    Our Ambition
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                    To build India's most
                    <span className="font-semibold text-gray-900">
                      {" "}
                      intelligent property platform
                    </span>{" "}
                    that anticipates needs, eliminates friction, and creates
                    <span className="text-purple-600 font-semibold">
                      {" "}
                      meaningful connections
                    </span>{" "}
                    between people and spaces.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 md:mb-16">
                <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 bg-gray-900 text-white rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  OUR EVOLUTION
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                  From Vision to Reality
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                  Born from a vision to transform the chaotic Indian real estate
                  landscape, Makaan4U has evolved from a disruptive startup to a
                  trusted platform shaping how India finds homes.
                </p>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical line - hidden on mobile, visible on medium+ */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

                <div className="space-y-8 md:space-y-12">
                  {[
                    {
                      year: "2020",
                      event: "Vision Born",
                      highlight:
                        "Founded with mission to transform real estate",
                      icon: Sparkles,
                    },
                    {
                      year: "2021",
                      event: "First Milestone",
                      highlight: "10,000+ properties verified and listed",
                      icon: Target,
                    },
                    {
                      year: "2022",
                      event: "National Expansion",
                      highlight: "Expanded operations to 15+ major cities",
                      icon: MapPin,
                    },
                    {
                      year: "2023",
                      event: "Community Growth",
                      highlight: "50,000+ families found their dream homes",
                      icon: Users,
                    },
                    {
                      year: "2024",
                      event: "Innovation Era",
                      highlight: "AI-powered recommendations and virtual tours",
                      icon: Zap,
                    },
                  ].map((milestone, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row md:items-center"
                    >
                      {/* Mobile layout */}
                      <div className="md:hidden flex items-center mb-4">
                        <div className="w-8 h-8 bg-white border-4 border-blue-500 rounded-full z-10 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <div className="ml-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {milestone.year}
                          </div>
                        </div>
                      </div>

                      {/* Desktop layout */}
                      <div className="hidden md:flex w-1/2 px-4 md:px-8">
                        {index % 2 === 0 && (
                          <div className="w-full text-right">
                            <div className="p-6 md:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                              <div className="flex items-center mb-4 justify-end">
                                <milestone.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600 ml-3 md:ml-4" />
                                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                                  {milestone.year}
                                </div>
                              </div>
                              <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                                {milestone.event}
                              </h4>
                              <p className="text-gray-600 text-sm md:text-base">
                                {milestone.highlight}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Center dot for desktop */}
                      <div className="hidden md:flex w-8 h-8 bg-white border-4 border-blue-500 rounded-full z-10 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>

                      {/* Right side for desktop */}
                      <div className="hidden md:flex w-1/2 px-4 md:px-8">
                        {index % 2 !== 0 && (
                          <div className="w-full text-left">
                            <div className="p-6 md:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                              <div className="flex items-center mb-4">
                                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                                  {milestone.year}
                                </div>
                                <milestone.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mr-3 md:mr-4" />
                              </div>
                              <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                                {milestone.event}
                              </h4>
                              <p className="text-gray-600 text-sm md:text-base">
                                {milestone.highlight}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content for mobile */}
                      <div className="md:hidden bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-all duration-300">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {milestone.event}
                        </h4>
                        <p className="text-gray-600">{milestone.highlight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 md:mb-16">
                <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 bg-white text-gray-900 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6 shadow-sm">
                  <Crown className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  OUR DNA
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                  The Principles That Guide Us
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {[
                  {
                    icon: Shield,
                    title: "Radical Transparency",
                    description:
                      "No hidden costs, no surprises. Every detail disclosed upfront.",
                    color: "blue",
                  },
                  {
                    icon: Heart,
                    title: "Human-Centered Design",
                    description:
                      "Technology that serves people, not replaces relationships.",
                    color: "pink",
                  },
                  {
                    icon: Zap,
                    title: "Relentless Innovation",
                    description:
                      "Constantly evolving to solve real problems with smart solutions.",
                    color: "yellow",
                  },
                  {
                    icon: Users,
                    title: "Community First",
                    description:
                      "Building trust through genuine connections and shared success.",
                    color: "green",
                  },
                ].map((value, index) => (
                  <div
                    key={index}
                    className="text-center p-6 md:p-8 bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 group"
                  >
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-${value.color}-100 flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <value.icon
                        className={`w-8 h-8 md:w-10 md:h-10 text-${value.color}-600`}
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Impact Stats */}
          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                  Our Impact in Numbers
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                  Real results that demonstrate our commitment to transforming
                  the real estate experience
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {[
                  {
                    icon: Building2,
                    number: "50,000+",
                    label: "Properties Verified",
                    trend: "+25% this year",
                  },
                  {
                    icon: Users,
                    number: "10,000+",
                    label: "Families Served",
                    trend: "98% satisfaction",
                  },
                  {
                    icon: MapPin,
                    number: "25+",
                    label: "Cities Active",
                    trend: "Pan-India presence",
                  },
                  {
                    icon: Award,
                    number: "99%",
                    label: "Success Rate",
                    trend: "Industry leading",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 sm:p-6 md:p-8 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-sm">
                      <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-1 md:mb-2">
                      {stat.label}
                    </div>
                    <div className="text-xs sm:text-sm text-green-600 font-medium">
                      {stat.trend}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Differentiators */}
          <section className="py-16 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 md:mb-16">
                <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 bg-white bg-opacity-10 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
                  <Star className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  WHY WE'RE DIFFERENT
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 md:mb-6">
                  Beyond Traditional Real Estate
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {[
                  {
                    icon: CheckCircle,
                    title: "Intelligent Matching",
                    description:
                      "AI-powered recommendations that understand your lifestyle and preferences",
                    stat: "3x better matches",
                  },
                  {
                    icon: TrendingUp,
                    title: "Market Intelligence",
                    description:
                      "Real-time insights and predictive analytics for informed decisions",
                    stat: "Live data feeds",
                  },
                  {
                    icon: Clock,
                    title: "Seamless Experience",
                    description:
                      "End-to-end digital journey from discovery to documentation",
                    stat: "70% faster process",
                  },
                  {
                    icon: Lightbulb,
                    title: "Expert Network",
                    description:
                      "Curated community of verified professionals and legal experts",
                    stat: "500+ partners",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-5 rounded-xl md:rounded-2xl p-6 md:p-8 border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white bg-opacity-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-300 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                          {feature.description}
                        </p>
                        <div className="inline-flex items-center px-2 py-1 md:px-3 md:py-1 bg-white bg-opacity-10 rounded-full text-xs md:text-sm">
                          {feature.stat}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Our Promise */}
          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                  Our Commitment to You
                </h2>
                <p className="text-lg sm:text-xl text-gray-600">
                  We stand by these promises to ensure your property journey is
                  exceptional
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  "Zero commission until you find your perfect property",
                  "360° verified listings with complete documentation",
                  "Dedicated relationship manager throughout your journey",
                  "Price protection and negotiation support",
                  "Legal verification and documentation assistance",
                  "Post-purchase support and community integration",
                  "Regular market updates and investment insights",
                  "Lifetime membership with exclusive benefits",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 md:p-4 rounded-lg md:rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300"
                  >
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium text-sm md:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-10 md:py-12 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
              <div className="inline-flex items-center px-2 py-1 md:px-3 md:py-1 bg-white bg-opacity-20 rounded-full text-white text-xs font-medium mb-2 md:mb-3">
                <Rocket className="w-3 h-3 mr-1" />
                READY TO BEGIN?
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 md:mb-3">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-blue-100 mb-3 md:mb-4 max-w-md mx-auto text-sm md:text-base">
                Join the thousands who transformed their property dreams into
                reality with Makaan4U
              </p>

              <button
                onClick={handleBrowse}
                className="px-5 py-2.5 md:px-6 md:py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg flex items-center justify-center mx-auto text-sm md:text-base"
              >
                Start Your Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </section>
        </main>

        <Footer />
        <FloatingChat isOpen={isChatOpen} onToggle={handleChatToggle} />
      </div>
    </>
  );
};

export default About;
