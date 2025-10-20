import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { ArrowRight, Bot, FileText, Users, MessageCircle, Star, Zap } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Mock Interviews",
      description: "Practice with realistic AI interviews that adapt to your responses",
      details: [
        "Smart AI Interviewer - Conversational AI that asks relevant technical questions",
        "Real-time Feedback - Get instant feedback on your answers and communication skills",
        "Multiple Domains - Practice for software engineering, data science, product management roles",
        "Progress Tracking - Track your improvement with detailed analytics and scores"
      ],
      color: "blue"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Resume Analysis",
      description: "Get AI-powered insights to optimize your resume for ATS and recruiters",
      details: [
        "ATS Optimization - Ensure your resume passes through applicant tracking systems",
        "Content Scoring - Get detailed scores on content, structure, and keyword optimization",
        "Industry Templates - Access proven resume templates for different tech roles",
        "Real-time Suggestions - Get instant recommendations for improvement as you type"
      ],
      color: "green"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Personalized Coaching",
      description: "Receive tailored guidance to improve your interview performance",
      details: [
        "Personalized Roadmap - Get custom learning paths based on your target roles",
        "Skill Gap Analysis - Identify and work on your specific technical weaknesses",
        "Behavioral Training - Practice common behavioral questions with AI feedback",
        "Confidence Building - Build interview confidence through repeated practice"
      ],
      color: "purple"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-50",
        icon: "text-blue-600",
        button: "text-blue-600 hover:text-blue-700",
        gradient: "from-blue-500 to-blue-600",
        light: "bg-blue-100"
      },
      green: {
        bg: "bg-green-50",
        icon: "text-green-600",
        button: "text-green-600 hover:text-green-700",
        gradient: "from-green-500 to-green-600",
        light: "bg-green-100"
      },
      purple: {
        bg: "bg-purple-50",
        icon: "text-purple-600",
        button: "text-purple-600 hover:text-purple-700",
        gradient: "from-purple-500 to-purple-600",
        light: "bg-purple-100"
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-30 blur-lg"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-green-200 rounded-full opacity-25 blur-lg"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything You Need to{" "}
            <span className="relative">
              Ace Your Interview
              <svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 300 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 8 Q150 2 295 8"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Comprehensive tools and AI-powered guidance to help you land your dream tech job
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="space-y-24">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            const isEven = index % 2 === 0;
            
            return (
              <motion.div 
                key={index}
                className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
              >
                {/* Content */}
                <motion.div 
                  className={`${!isEven ? 'lg:order-2' : ''}`}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                >
                  <motion.div 
                    className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-6 group hover:scale-110 transition-transform duration-300`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={colors.icon}>
                      {feature.icon}
                    </div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-3xl font-bold text-gray-900 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-lg text-gray-600 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                  >
                    {feature.description}
                  </motion.p>
                  
                  <motion.div 
                    className="space-y-4 mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                  >
                    {feature.details.map((detail, detailIndex) => {
                      const [title, description] = detail.split(' - ');
                      return (
                        <motion.div 
                          key={detailIndex}
                          className="flex items-start space-x-4 group cursor-pointer"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <motion.div 
                            className={`w-3 h-3 ${colors.icon} rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200`}
                            whileHover={{ scale: 1.2 }}
                          ></motion.div>
                          <div>
                            <span className="font-semibold text-gray-900">{title}</span>
                            {description && <span className="text-gray-600"> - {description}</span>}
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.7 }}
                  >
                    <motion.button 
                      className={`bg-gradient-to-r ${colors.gradient} hover:shadow-xl text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center space-x-2`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Try It Free</span>
                      <Zap size={18} className="animate-pulse" />
                    </motion.button>
                    <motion.a 
                      href="#" 
                      className={`${colors.button} font-medium inline-flex items-center space-x-2 px-6 py-4 rounded-lg border border-transparent hover:border-gray-300 transition-all duration-300`}
                      whileHover={{ x: 5 }}
                    >
                      <span>Learn More</span>
                      <ArrowRight size={16} />
                    </motion.a>
                  </motion.div>
                </motion.div>
                
                {/* Visual/Demo */}
                <motion.div 
                  className={`${!isEven ? 'lg:order-1' : ''}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                >
                  <motion.div 
                    className={`${colors.bg} rounded-2xl p-8 aspect-square flex items-center justify-center relative overflow-hidden group hover:shadow-2xl transition-all duration-500`}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Animated background elements */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 ${colors.light} rounded-full opacity-30 group-hover:scale-150 transition-transform duration-700`}></div>
                    <div className={`absolute -bottom-8 -left-8 w-24 h-24 ${colors.light} rounded-full opacity-20 group-hover:scale-125 transition-transform duration-700`}></div>
                    
                    <div className="text-center relative z-10">
                      <motion.div 
                        className={`w-20 h-20 ${colors.icon} mx-auto mb-6`}
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                      <motion.p 
                        className="text-gray-700 font-medium text-lg mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                      >
                        {feature.title} Preview
                      </motion.p>
                      <motion.div 
                        className="flex justify-center space-x-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.7 }}
                      >
                        {[1, 2, 3].map((dot) => (
                          <motion.div
                            key={dot}
                            className={`w-2 h-2 ${colors.light} rounded-full`}
                            animate={{ 
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                              duration: 1.5,
                              repeat: Infinity,
                              delay: dot * 0.2
                            }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}