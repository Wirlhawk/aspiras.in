'use client'

import { Button } from '@/components/retroui/Button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import FloatingStar from './floating-star'

export default function CTASection() {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Stars */}
      <FloatingStar 
        size={50} 
        color="#ea435f" 
        className="absolute top-[10%] left-[5%] hidden md:block"
        animationClass="animate-float"
      />
      <FloatingStar 
        size={45} 
        color="#c4ff83" 
        className="absolute bottom-[15%] right-[8%] hidden md:block"
        animationClass="animate-float-delayed"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <div className="bg-accent/30 border-2 border-black rounded-none shadow-xl p-8 sm:p-12 md:p-16">
          <h2 className="font-head text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to start your journey?
          </h2>
          <p className="font-sans text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of achievers turning their aspirations into reality
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" variant="default" className="text-lg" asChild>
              <Link href="/register">
                Create Your First Aspiration
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
