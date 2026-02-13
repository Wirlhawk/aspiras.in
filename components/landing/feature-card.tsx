'use client'

import { Card } from '@/components/retroui/Card'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  index: number
}

export default function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        delay: index * 0.2, 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="h-full"
    >
      <Card className="h-full p-6 hover:shadow-lg transition-shadow cursor-pointer group">
        <Card.Content className="flex flex-col items-center text-center gap-4 p-0">
          <motion.div
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -10, 10, -10, 0]
            }}
            transition={{ duration: 0.5 }}
            className="bg-primary text-primary-foreground p-4 rounded-full border-2 border-black shadow-md"
          >
            <Icon size={32} />
          </motion.div>
          <div>
            <h3 className="font-head text-xl sm:text-2xl font-bold mb-2">{title}</h3>
            <p className="font-sans text-muted-foreground text-sm sm:text-base">
              {description}
            </p>
          </div>
        </Card.Content>
      </Card>
    </motion.div>
  )
}
