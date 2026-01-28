'use client';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Target, ShieldCheck, TrendingUp } from 'lucide-react';
import { AnimatedButton } from '@/components/AnimatedButton';

import { containerVariants, itemVariants } from '@/lib/animations';

export default function Home() {

  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full py-5 md:py-5 lg:py-5 bg-white border-b border-gray-100 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-50 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-indigo-50 rounded-full blur-[120px]"
          />
        </div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center space-y-12 text-center"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest border border-blue-100 mb-4 cursor-default">
              <Sparkles className="w-3 h-3" />
              Revolutionizing Startup Growth
            </motion.div>

            <div className="space-y-6 max-w-5xl">
              <motion.h1
                variants={itemVariants}
                className="text-5xl font-black text-gray-900 tracking-tight sm:text-7xl md:text-8xl lg:text-9xl leading-[1.05]"
              >
                Scale Your Startup with <br className="hidden md:block" />
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Premium Deals</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.2, duration: 1, ease: "circOut" }}
                    className="absolute bottom-4 left-0 h-4 bg-blue-100 -z-10 rounded-full"
                  />
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="mx-auto max-w-[800px] text-gray-500 text-lg md:text-2xl lg:text-3xl font-medium leading-relaxed px-4"
              >
                Connect with world-class partners and unlock exclusive offers designed to accelerate your growth journey.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto px-4 pt-4">
              <Link href="/deals" className="w-full sm:w-auto">
                <AnimatedButton className="w-full group inline-flex h-16 items-center justify-center rounded-2xl bg-blue-600 px-12 text-xl font-black text-white shadow-2xl shadow-blue-200 transition-all text-center">
                  Explore Deals
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </AnimatedButton>
              </Link>
              <Link href="/register" className="w-full sm:w-auto">
                <AnimatedButton className="w-full inline-flex h-16 items-center justify-center rounded-2xl border-2 border-gray-100 bg-white px-12 text-xl font-black text-gray-900 transition-all hover:bg-gray-50 text-center">
                  Join Now
                </AnimatedButton>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="pt-12 flex flex-col items-center gap-6"
            >
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, scale: 1.1, zIndex: 10 }}
                    className="h-12 w-12 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg cursor-pointer"
                  >
                    <div className="h-full w-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center text-[10px] font-black text-blue-600">
                      U{i}
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-[0.2em]">
                Trusted by <span className="text-gray-900">10,000+</span> Early Stage Founders
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-24 md:py-32 bg-gray-50 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Savings Generated", value: "$10M+", icon: <TrendingUp className="w-6 h-6" /> },
              { label: "Active Partners", value: "150+", icon: <Zap className="w-6 h-6" /> },
              { label: "Exclusive Deals", value: "500+", icon: <Target className="w-6 h-6" /> },
              { label: "Elite Access", value: "Security", icon: <ShieldCheck className="w-6 h-6" /> }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center space-y-4 p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm transition-shadow hover:shadow-2xl hover:shadow-blue-100/50"
              >
                <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                  {stat.icon}
                </div>
                <span className="text-5xl font-black text-gray-900 tabular-nums">{stat.value}</span>
                <span className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
