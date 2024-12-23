import React from 'react';
import { motion } from 'framer-motion';
import { 
  PiggyBank, 
  TrendingUp, 
  Shield, 
  Clock, 
  Target, 
  LineChart,
  BookMarked,
  StickyNote,
  HeartPulse,
  MessageSquareText,
  Brain,
  Sparkles
} from 'lucide-react';

const benefits = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI-Powered Insights",
    description: "Get personalized financial advice tailored to your unique situation",
    color: "from-violet-500 to-purple-500"
  },
  {
    icon: <HeartPulse className="h-6 w-6" />,
    title: "Financial Health Score",
    description: "Track your financial wellness with real-time health scoring and insights",
    color: "from-emerald-500 to-green-500"
  },
  {
    icon: <BookMarked className="h-6 w-6" />,
    title: "Save Important Advice",
    description: "Bookmark and organize valuable financial insights for future reference",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: <StickyNote className="h-6 w-6" />,
    title: "Smart Note Taking",
    description: "Capture and organize financial thoughts and decisions with intelligent notes",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: <MessageSquareText className="h-6 w-6" />,
    title: "Interactive Chat",
    description: "Have natural conversations about your finances with our AI advisor",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: <PiggyBank className="h-6 w-6" />,
    title: "Smart Savings",
    description: "AI-powered recommendations to help you save more effectively",
    color: "from-cyan-500 to-teal-500"
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Investment Insights",
    description: "Data-driven investment suggestions tailored to your goals",
    color: "from-fuchsia-500 to-purple-500"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Bank-Grade Security",
    description: "Your financial data is protected with enterprise-level encryption",
    color: "from-indigo-500 to-blue-500"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "24/7 Availability",
    description: "Get financial advice whenever you need it, day or night",
    color: "from-rose-500 to-pink-500"
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Goal Tracking",
    description: "Set and monitor your financial goals with real-time progress updates",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: "Advanced Analytics",
    description: "Comprehensive insights into your spending and saving patterns",
    color: "from-orange-500 to-amber-500"
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Voice Interaction",
    description: "Listen to financial advice and interact using voice commands",
    color: "from-teal-500 to-cyan-500"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function Benefits() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-900 dark:to-purple-900 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-blue-200 to-cyan-200 dark:from-blue-900 dark:to-cyan-900 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Transform Your Finances
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the future of personal finance management with our AI-powered platform
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 rounded-2xl blur-xl transition-all duration-300 group-hover:scale-105" />
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <motion.a
            href="#/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 rounded-full text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Financial Journey
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="ml-2"
            >
              →
            </motion.span>
          </motion.a>
          <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              14-day free trial
            </span>
            <span className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              No credit card required
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}