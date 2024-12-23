import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Shield, Brain, MessageSquareText, BookMarked, StickyNote, HeartPulse, Clock, Zap } from 'lucide-react';

const features = [
  {
    icon: <Brain className="h-5 w-5" />,
    title: "AI-Powered Financial Advice",
    description: "Get personalized recommendations and insights"
  },
  {
    icon: <HeartPulse className="h-5 w-5" />,
    title: "Financial Health Monitoring",
    description: "Track your financial wellness score"
  },
  {
    icon: <BookMarked className="h-5 w-5" />,
    title: "Unlimited Advice Storage",
    description: "Save and organize financial insights"
  },
  {
    icon: <StickyNote className="h-5 w-5" />,
    title: "Smart Note Taking",
    description: "Capture and organize financial decisions"
  },
  {
    icon: <MessageSquareText className="h-5 w-5" />,
    title: "24/7 AI Chat Support",
    description: "Get answers whenever you need them"
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Enterprise Security",
    description: "Bank-grade encryption for your data"
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
      duration: 0.5
    }
  }
};

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const monthlyPrice = 20;
  const annualDiscount = 0.35; // 35% off
  const annualPrice = monthlyPrice * (1 - annualDiscount);

  return (
    <section className="py-24 relative overflow-hidden" id="pricing">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">
            Simple Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Start your financial journey today
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Try FinanceGPT free for 14 days, no credit card required
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isAnnual ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
              Monthly billing
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm flex items-center ${isAnnual ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
              Annual billing
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200">
                <Zap className="h-3 w-3 mr-1" />
                Save 35%
              </span>
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[2.5rem] blur-xl opacity-30 dark:opacity-40 animate-pulse" />
            
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-[2rem] border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              <div className="p-8 lg:p-12">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                      Pro Plan
                    </h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        ${isAnnual ? annualPrice.toFixed(2) : monthlyPrice}
                      </span>
                      <span className="ml-2 text-xl text-gray-500 dark:text-gray-400">
                        /month
                      </span>
                      {isAnnual && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200">
                          Billed annually
                        </span>
                      )}
                    </div>
                    {isAnnual && (
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        ${(annualPrice * 12).toFixed(2)} billed once
                      </p>
                    )}
                  </div>
                  <Sparkles className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                </div>

                <motion.div
                  variants={containerVariants}
                  className="grid gap-6 mb-8"
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 p-2.5 text-white">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          {feature.title}
                        </h4>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div className="space-y-4">
                  <motion.a
                    href="#/signup"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full text-center px-8 py-4 rounded-xl text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="flex items-center justify-center">
                      Start 14-Day Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </motion.a>

                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
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
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}