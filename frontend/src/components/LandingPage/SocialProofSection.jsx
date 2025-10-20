import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Zap, TrendingUp, Globe, Users, DollarSign, Play, ArrowRight } from "lucide-react";

export default function SocialProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    { number: "10K+", label: "Users are helped to analyse resume", icon: Globe },
    { number: "10M+", label: "Interview Takers love it", icon: Users },
    { number: "$1B+", label: "Created there resume using us", icon: DollarSign },
    { number: "95%", label: "Interview Success Rate", icon: TrendingUp }
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

  const numberVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-purple-200 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-green-200 rounded-full opacity-25 blur-lg"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats Grid */}
        <motion.div 
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.div 
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
                  variants={numberVariants}
                >
                  {stat.number}
                </motion.div>
                
                <div className="text-gray-600 font-medium text-sm md:text-base">
                  {stat.label}
                </div>

                {/* Animated underline on hover */}
                <motion.div 
                  className="h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 w-0 mx-auto mt-4 group-hover:w-16 transition-all duration-500"
                  whileHover={{ width: "4rem" }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div 
          className="bg-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Background decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-purple-100 rounded-full opacity-20 group-hover:scale-125 transition-transform duration-700"></div>
          
          {/* Quote icon */}
          <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
            <Quote className="w-16 h-16 text-blue-600" />
          </div>

          <div className="relative z-10">
            {/* Avatar */}
            <motion.div 
              className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-8 flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              AKS
            </motion.div>
            
            {/* Main Quote */}
            <motion.blockquote 
              className="text-xl md:text-2xl lg:text-3xl text-gray-900 mb-8 font-bold leading-tight text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              "I recommend using the tools here to master Interviews"
            </motion.blockquote>
            
            {/* Detailed Quote */}
            <motion.p 
              className="text-gray-600 mb-8 max-w-3xl mx-auto text-lg leading-relaxed text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              "We're constantly helping job seekers discover what works in interviews. Once we identify successful strategies, we optimize them across our platform—but we're always innovating the next breakthrough."
            </motion.p>
            
            {/* Author Info */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                  AKS
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900 text-lg">Ankit Swain</div>
                  <div className="text-gray-600">Co-Founder, AI InterviewPrez</div>
                </div>
              </div>
            </motion.div>
            
            {/* CTA Link */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.a 
                href="https://github.com/AnkitAKS02" 
                target="_blank"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold text-lg group/link"
                whileHover={{ x: 5 }}
              >
                <span>Visit his Github</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.p 
            className="text-gray-600 mb-8 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            Join thousands of successful Interview Takers using AI InterviewPrez
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <motion.button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Free Trial</span>
              <Zap size={20} className="animate-pulse" />
            </motion.button>
            <motion.button 
              className="bg-white text-gray-700 hover:bg-gray-50 font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2 border border-gray-300 shadow-sm hover:shadow-md"
              whileHover={{ x: 5 }}
            >
              <Play size={20} className="text-blue-600" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}