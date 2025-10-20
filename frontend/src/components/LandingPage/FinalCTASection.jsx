import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, Zap, Users, TrendingUp, Award } from "lucide-react";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const testimonials = [
    {
      quote: "AI InterviewPrez helped me land my dream job at Google. The mock interviews were incredibly realistic and the feedback was spot-on!",
      author: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      rating: 5,
      achievement: "Got offer in 3 weeks"
    },
    {
      quote: "The resume analysis feature caught issues I never would have noticed. My response rate increased by 3x after implementing the suggestions.",
      author: "Michael Rodriguez",
      role: "Frontend Developer",
      company: "Meta",
      rating: 5,
      achievement: "3x more interviews"
    },
    {
      quote: "As a career switcher, the personalized coaching gave me the confidence to ace technical interviews. Landed a job in 2 months!",
      author: "Jessica Wang",
      role: "Data Scientist",
      company: "Amazon",
      rating: 5,
      achievement: "Career switch success"
    },
    {
      quote: "The AI interviewer's questions were tougher than my actual interviews. When I faced the real thing, I was completely prepared.",
      author: "David Kim",
      role: "Full Stack Developer",
      company: "Microsoft",
      rating: 5,
      achievement: "Perfect interview score"
    },
    {
      quote: "From resume optimization to behavioral questions, this platform covered everything. Worth every penny for the career boost.",
      author: "Alex Thompson",
      role: "Product Manager",
      company: "Apple",
      rating: 5,
      achievement: "30% salary increase"
    },
    {
      quote: "The real-time feedback during practice interviews helped me eliminate my bad habits. My communication skills improved dramatically.",
      author: "Maria Garcia",
      role: "DevOps Engineer",
      company: "Netflix",
      rating: 5,
      achievement: "Multiple offers"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const stats = [
    { icon: Users, number: "10K+", label: "Successful Placements" },
    { icon: TrendingUp, number: "89%", label: "Interview Success Rate" },
    { icon: Award, number: "4.9/5", label: "User Rating" },
    { icon: Zap, number: "2.5x", label: "More Interview Calls" }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-25 blur-xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm mb-6"
          >
            <Award className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-700">2025 Top Rated Interview Platform</span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Success Stories from{" "}
            <span className="relative">
              Our Users
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
          
          <motion.div 
            className="flex items-center justify-center space-x-2 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
            <span className="text-gray-600 ml-2 text-lg font-medium">4.9/5 from 2,000+ reviews</span>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-500 group cursor-pointer relative overflow-hidden"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <Quote className="w-16 h-16 text-blue-600" />
              </div>

              {/* Achievement badge */}
              <div className="inline-flex items-center gap-1 bg-gradient-to-r from-green-50 to-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium mb-4">
                <TrendingUp className="w-3 h-3" />
                {testimonial.achievement}
              </div>

              {/* Stars */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + i * 0.1 }}
                  >
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-900 mb-6 font-medium leading-relaxed relative z-10">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm truncate">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-600 text-sm truncate">
                    {testimonial.role}
                    {testimonial.company && (
                      <span className="text-blue-600 font-medium"> @ {testimonial.company}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.p 
            className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Join 10,000+ job seekers who transformed their careers with AI InterviewPrez
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Your Success Story</span>
              <Zap size={20} className="animate-pulse" />
            </motion.button>
            <motion.button 
              className="bg-white text-gray-700 hover:bg-gray-50 font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2 border border-gray-300 shadow-sm hover:shadow-md"
              whileHover={{ x: 5 }}
            >
              <span>Read More Reviews</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}