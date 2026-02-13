'use client'

import { Button } from '@/components/retroui/Button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import FloatingStar from './floating-star'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const
    }
  })
}

export default function HeroSection() {
  const headlineWords = ['Turn', 'Your', 'Aspirations', 'Into', 'Reality']

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Floating Stars - Decorative */}
      <FloatingStar 
        size={60} 
        color="#ffda5c" 
        className="absolute top-[10%] left-[5%] hidden lg:block"
        animationClass="animate-float"
      />
      <FloatingStar 
        size={45} 
        color="#ea435f" 
        className="absolute top-[20%] right-[8%] hidden lg:block"
        animationClass="animate-float-delayed"
      />
      <FloatingStar 
        size={55} 
        color="#ceebfc" 
        className="absolute bottom-[15%] left-[10%] hidden md:block"
        animationClass="animate-float-slow"
      />
      <FloatingStar 
        size={40} 
        color="#c4ff83" 
        className="absolute bottom-[25%] right-[12%] hidden lg:block"
        animationClass="animate-float"
      />
      <FloatingStar 
        size={35} 
        color="#5f4fe6" 
        className="absolute top-[50%] left-[3%] hidden xl:block"
        animationClass="animate-float-delayed"
      />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        {/* Animated Headline */}
        <motion.h1 className="font-head text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {headlineWords.map((word, index) => (
            <motion.span
              key={word}
              custom={index}
              variants={wordVariants}
              className="inline-block mr-3 md:mr-4"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto"
        >
          Track, organize, and achieve your goals with a playful twist
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button size="lg" variant="default" asChild>
            <Link href="/register">
              Get Started Free
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="secondary" 
            asChild
          >
            <a href="#features">
              See How It Works
            </a>
          </Button>
        </motion.div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
            <FloatingStar 
              size={80} 
              color="#5f4fe6" 
              className="relative"
              animationClass="animate-float-slow"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
