import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Building2, Coins, Rocket, Gift, AlertCircle, Users } from 'lucide-react';

const futureFeatures = [
  {
    icon: <Wallet className="h-6 w-6" />,
    title: "Smart Wallet Integration",
    description: "Connect your wallet to monitor spending patterns and receive real-time alerts for potentially harmful spending habits",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Loan Applications",
    description: "Streamlined loan application process with AI-powered approval predictions and personalized rate recommendations",
    color: "from-emerald-500 to-green-500"
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Business Suite",
    description: "Comprehensive business financial management including payroll, AI accounting advisor, fund management, and more",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "And More Coming Soon",
    description: "We're constantly innovating and adding new features to help you achieve your financial goals",
    color: "from-purple-500 to-pink-500"
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

export default function ComingSoon() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-100/20 to-transparent dark:from-indigo-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">
            Coming Soon
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            The Future of{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              FinanceGPT
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're building the most comprehensive AI-powered financial platform. Here's what's coming next.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {futureFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 rounded-2xl blur-xl transition-all duration-300 group-hover:scale-105" />
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Early Adopter Benefit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-3xl blur-xl" />
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-indigo-200/50 dark:border-indigo-800/50 shadow-xl">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
                  <Gift className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Exclusive Early Adopter Benefit
                  </h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200">
                    <Users className="h-3 w-3 mr-1" />
                    First 50 Users Only
                  </span>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Be one of the first 50 subscribers and get <span className="font-semibold text-indigo-600 dark:text-indigo-400">lifetime access to all future features at no additional cost</span>. As an early supporter, you'll be grandfathered into every new feature we release, forever.
                </p>
                <div className="flex items-start space-x-2 text-amber-600 dark:text-amber-400">
                  <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    This exclusive offer is strictly limited to our first 50 subscribers during our initial launch phase. Once these spots are filled, this lifetime access offer will never be available again.
                  </p>
                </div>
                <motion.a
                  href="#/signup"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 inline-flex items-center px-6 py-3 rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Secure Your Spot Now
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="ml-2"
                  >
                    →
                  </motion.span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}